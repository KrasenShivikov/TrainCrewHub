import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml } from './helpers.js';

let dutiesLookup = [];

export async function loadEmployeeOptions(container) {
  const singleSelect = container.querySelector('#planned-duty-employee');
  const autoSelect = container.querySelector('#planned-duty-auto-employee');
  const { data, error } = await supabase
    .from('employees')
    .select('id, first_name, last_name')
    .order('last_name', { ascending: true })
    .order('first_name', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  const options = (data || [])
    .map((item) => {
      const fullName = `${item.first_name ?? ''} ${item.last_name ?? ''}`.trim() || '-';
      return `<option value="${item.id}">${escapeHtml(fullName)}</option>`;
    })
    .join('');

  const baseOptions = '<option value="">Избери служител</option>' + options;
  singleSelect.innerHTML = baseOptions;
  autoSelect.innerHTML = baseOptions;
}

export async function loadScheduleKeyOptions(container) {
  const singleSelect = container.querySelector('#planned-duty-schedule-key');
  const autoSelect = container.querySelector('#planned-duty-auto-schedule-key');
  const { data, error } = await supabase
    .from('schedule_keys')
    .select('id, name, crew_role')
    .order('name', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  const options = (data || [])
    .map((item) => {
      const roleLabel = getCrewRoleLabel(item.crew_role);
      const label = roleLabel ? `${item.name ?? '-'} (${roleLabel})` : (item.name ?? '-');
      return `<option value="${item.id}">${escapeHtml(label)}</option>`;
    })
    .join('');

  const baseOptions = '<option value="">Избери ключ-график</option>' + options;
  singleSelect.innerHTML = baseOptions;
  autoSelect.innerHTML = baseOptions;
}

function getCrewRoleLabel(value) {
  if (value === 'началник влак') {
    return 'Началник влак';
  }

  if (value === 'кондуктор') {
    return 'Кондуктор';
  }

  return '';
}

export async function loadDutyOptions(container) {
  const { data: mappings, error: mappingsError } = await supabase
    .from('schedule_key_duties')
    .select('schedule_key_id, duty_id, duties(id, name)');

  if (mappingsError) {
    showToast(mappingsError.message, 'error');
    return;
  }

  const lookupMap = new Map();
  (mappings || []).forEach((row) => {
    const duty = row?.duties;
    if (!duty?.id) {
      return;
    }

    const existing = lookupMap.get(duty.id) || {
      id: duty.id,
      name: duty.name || '-',
      scheduleKeyIds: []
    };

    if (row.schedule_key_id && !existing.scheduleKeyIds.includes(row.schedule_key_id)) {
      existing.scheduleKeyIds.push(row.schedule_key_id);
    }

    lookupMap.set(duty.id, existing);
  });

  dutiesLookup = Array.from(lookupMap.values()).sort((a, b) =>
    String(a.name || '').localeCompare(String(b.name || ''), 'bg')
  );

  renderDutyOptionsByScheduleKey(container, '', '');
}

export function renderDutyOptionsByScheduleKey(container, scheduleKeyId, selectedDutyId) {
  const dutySelect = container.querySelector('#planned-duty-duty');
  if (!dutySelect) {
    return;
  }

  if (!scheduleKeyId) {
    dutySelect.innerHTML = '<option value="">Първо избери ключ-график</option>';
    dutySelect.value = '';
    return;
  }

  const options = dutiesLookup
    .filter((item) => item.scheduleKeyIds?.includes(scheduleKeyId))
    .map((item) => {
      const selected = item.id === selectedDutyId ? 'selected' : '';
      return `<option value="${item.id}" ${selected}>${escapeHtml(item.name ?? '-')}</option>`;
    })
    .join('');

  dutySelect.innerHTML = '<option value="">Избери повеска</option>' + options;

  if (selectedDutyId) {
    dutySelect.value = selectedDutyId;
  }
}

export function isDutyForScheduleKey(dutyId, scheduleKeyId) {
  const selectedDuty = dutiesLookup.find((item) => item.id === dutyId);
  return Boolean(selectedDuty && selectedDuty.scheduleKeyIds?.includes(scheduleKeyId));
}
