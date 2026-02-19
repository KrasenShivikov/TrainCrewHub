import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml } from './helpers.js';

export async function loadDutyTypeOptions(container) {
  const createSelect = container.querySelector('#schedule-key-duty-create-type');
  const editSelect = container.querySelector('#schedule-key-duty-edit-type');
  const attachTypeSelect = container.querySelector('#schedule-key-duty-attach-type');

  const { data, error } = await supabase
    .from('duty_types')
    .select('id, name')
    .order('name', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  const options = (data || [])
    .map((item) => `<option value="${item.id}">${escapeHtml(item.name)}</option>`)
    .join('');

  createSelect.innerHTML = '<option value="">Избери тип</option>' + options;
  editSelect.innerHTML = '<option value="">Избери тип</option>' + options;
  if (attachTypeSelect) {
    attachTypeSelect.innerHTML = '<option value="">Всички типове</option>' + options;
  }
}

export async function loadScheduleKeyOptions(container) {
  const createSelect = container.querySelector('#schedule-key-duty-create-schedule-keys');
  const editSelect = container.querySelector('#schedule-key-duty-edit-schedule-keys');

  const { data, error } = await supabase
    .from('schedule_keys')
    .select('id, name')
    .order('name', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  const options = (data || [])
    .map((item) => `<option value="${item.id}">${escapeHtml(item.name)}</option>`)
    .join('');

  createSelect.innerHTML = options;
  editSelect.innerHTML = options;
}

export async function loadTrainOptions(container) {
  const createSelect = container.querySelector('#schedule-key-duty-create-trains');
  const editSelect = container.querySelector('#schedule-key-duty-edit-trains');

  const { data, error } = await supabase
    .from('trains')
    .select('id, number, origin_station, destination_station')
    .order('number', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  const options = (data || [])
    .map((item) => {
      const route = `${item.origin_station || '-'} - ${item.destination_station || '-'}`;
      return `<option value="${item.id}">${escapeHtml(item.number || '-')} (${escapeHtml(route)})</option>`;
    })
    .join('');

  if (createSelect) createSelect.innerHTML = options;
  if (editSelect) editSelect.innerHTML = options;
}
