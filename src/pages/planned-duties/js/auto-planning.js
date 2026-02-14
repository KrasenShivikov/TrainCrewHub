import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { closeModal, escapeHtml } from './helpers.js';

const scheduleKeyCycleLookup = new Map();

export async function renderAutoStartDutyOptionsByScheduleKey(container, scheduleKeyId, selectedDutyId) {
  const dutySelect = container.querySelector('#planned-duty-auto-start-duty');
  if (!dutySelect) {
    return;
  }

  if (!scheduleKeyId) {
    dutySelect.innerHTML = '<option value="">Първо избери ключ-график</option>';
    dutySelect.value = '';
    return;
  }

  const cycleDuties = await getCycleDutiesForScheduleKey(scheduleKeyId);
  if (!cycleDuties.length) {
    dutySelect.innerHTML = '<option value="">Няма повески за този ключ-график</option>';
    dutySelect.value = '';
    return;
  }

  const options = cycleDuties
    .map((item) => {
      const selected = item.id === selectedDutyId ? 'selected' : '';
      return `<option value="${item.id}" ${selected}>${escapeHtml(item.name ?? '-')}</option>`;
    })
    .join('');

  dutySelect.innerHTML = '<option value="">Избери стартова повеска</option>' + options;

  if (selectedDutyId) {
    dutySelect.value = selectedDutyId;
  }
}

export function resetAutoPlanForm(container) {
  container.querySelector('#planned-duty-auto-employee').value = '';
  container.querySelector('#planned-duty-auto-assignment-role').value = 'conductor';
  container.querySelector('#planned-duty-auto-date-from').value = '';
  container.querySelector('#planned-duty-auto-date-to').value = '';
  container.querySelector('#planned-duty-auto-schedule-key').value = '';
  container.querySelector('#planned-duty-auto-overwrite').checked = false;
  container.querySelector('#planned-duty-auto-start-duty').innerHTML =
    '<option value="">Първо избери ключ-график</option>';
}

export async function saveAutoPlannedDuties(container, reloadCallback) {
  const employeeId = container.querySelector('#planned-duty-auto-employee').value || null;
  const assignmentRole = container.querySelector('#planned-duty-auto-assignment-role').value || '';
  const dateFrom = container.querySelector('#planned-duty-auto-date-from').value;
  const dateTo = container.querySelector('#planned-duty-auto-date-to').value;
  const scheduleKeyId = container.querySelector('#planned-duty-auto-schedule-key').value || null;
  const startDutyId = container.querySelector('#planned-duty-auto-start-duty').value || null;
  const overwriteExisting = container.querySelector('#planned-duty-auto-overwrite').checked;
  const saveButton = container.querySelector('#planned-duty-auto-save-btn');

  if (!employeeId || !assignmentRole || !dateFrom || !dateTo || !scheduleKeyId || !startDutyId) {
    showToast('Моля, попълни всички полета за автоматично планиране.', 'warning');
    return;
  }

  if (!['chief', 'conductor'].includes(assignmentRole)) {
    showToast('Невалидна роля. Избери Кондуктор или Началник влак.', 'warning');
    return;
  }

  if (dateTo < dateFrom) {
    showToast('Полето "До дата" трябва да е след или равно на "От дата".', 'warning');
    return;
  }

  const cycleDuties = await getCycleDutiesForScheduleKey(scheduleKeyId);
  if (!cycleDuties.length) {
    showToast('Няма повески за избрания ключ-график.', 'warning');
    return;
  }

  const startIndex = cycleDuties.findIndex((item) => item.id === startDutyId);
  if (startIndex < 0) {
    showToast('Избери валидна стартова повеска.', 'warning');
    return;
  }

  const dates = buildDateRange(dateFrom, dateTo);
  if (!dates.length) {
    showToast('Невалиден период.', 'warning');
    return;
  }

  const originalText = saveButton.innerHTML;
  saveButton.disabled = true;
  saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Генериране...';

  const { data: userData } = await supabase.auth.getUser();
  const createdFrom = userData?.user?.email ?? 'web_app';

  const { data: existingRows, error: existingError } = await supabase
    .from('planned_duties')
    .select('date')
    .eq('employee_id', employeeId)
    .gte('date', dateFrom)
    .lte('date', dateTo);

  if (existingError) {
    saveButton.disabled = false;
    saveButton.innerHTML = originalText;
    showToast(existingError.message, 'error');
    return;
  }

  const existingDates = new Set((existingRows || []).map((item) => item.date));
  const existingDatesCount = existingDates.size;
  const payload = [];
  let skippedCount = 0;

  dates.forEach((date, dayIndex) => {
    if (!overwriteExisting && existingDates.has(date)) {
      skippedCount += 1;
      return;
    }

    const duty = cycleDuties[(startIndex + dayIndex) % cycleDuties.length];
    payload.push({
      date,
      employee_id: employeeId,
      assignment_role: assignmentRole,
      duty_id: duty.id,
      created_from: createdFrom
    });
  });

  if (!payload.length) {
    saveButton.disabled = false;
    saveButton.innerHTML = originalText;
    showToast('Няма нови записи за създаване. За периода вече има планиране за служителя.', 'warning');
    return;
  }

  if (overwriteExisting) {
    const { error: deleteError } = await supabase
      .from('planned_duties')
      .delete()
      .eq('employee_id', employeeId)
      .gte('date', dateFrom)
      .lte('date', dateTo);

    if (deleteError) {
      saveButton.disabled = false;
      saveButton.innerHTML = originalText;
      showToast(deleteError.message, 'error');
      return;
    }
  }

  let insertError = null;
  for (let index = 0; index < payload.length; index += 200) {
    const chunk = payload.slice(index, index + 200);
    const { error } = await supabase.from('planned_duties').insert(chunk);
    if (error) {
      insertError = error;
      break;
    }
  }

  saveButton.disabled = false;
  saveButton.innerHTML = originalText;

  if (insertError) {
    showToast(insertError.message, 'error');
    return;
  }

  closeModal(container.querySelector('#planned-duty-auto-modal'));
  resetAutoPlanForm(container);
  await reloadCallback();

  const createdCount = payload.length;
  if (overwriteExisting) {
    showToast(`Създадени записи: ${createdCount}. Презаписани дати: ${existingDatesCount}.`, 'success');
    return;
  }

  if (skippedCount > 0) {
    showToast(`Създадени: ${createdCount}. Пропуснати (вече съществуват за датата): ${skippedCount}.`, 'success');
    return;
  }

  showToast(`Създадени записи: ${createdCount}.`, 'success');
}

async function getCycleDutiesForScheduleKey(scheduleKeyId) {
  if (!scheduleKeyId) {
    return [];
  }

  if (scheduleKeyCycleLookup.has(scheduleKeyId)) {
    return scheduleKeyCycleLookup.get(scheduleKeyId);
  }

  const { data, error } = await supabase
    .from('schedule_key_duties')
    .select('duty_id, duties(id, name, display_order)')
    .eq('schedule_key_id', scheduleKeyId);

  if (error) {
    showToast(error.message, 'error');
    return [];
  }

  const rows = (data || [])
    .map((item) => ({
      id: item?.duties?.id,
      name: item?.duties?.name || '-',
      displayOrder: Number(item?.duties?.display_order) || 0
    }))
    .filter((item) => item.id)
    .sort((a, b) => {
      if (a.displayOrder !== b.displayOrder) {
        return a.displayOrder - b.displayOrder;
      }

      return String(a.name || '').localeCompare(String(b.name || ''), 'bg');
    });

  scheduleKeyCycleLookup.set(scheduleKeyId, rows);
  return rows;
}

function buildDateRange(dateFrom, dateTo) {
  const result = [];
  const from = new Date(`${dateFrom}T00:00:00`);
  const to = new Date(`${dateTo}T00:00:00`);

  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime()) || from > to) {
    return result;
  }

  for (let current = new Date(from); current <= to; current.setDate(current.getDate() + 1)) {
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    const day = String(current.getDate()).padStart(2, '0');
    result.push(`${year}-${month}-${day}`);
  }

  return result;
}
