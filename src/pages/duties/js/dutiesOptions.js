import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml } from './helpers.js';

export async function loadTrainOptions(container) {
  const select = container.querySelector('#duty-trains');

  const { data, error } = await supabase
    .from('trains')
    .select('id, number, origin_station, destination_station')
    .order('number', { ascending: true });

  if (error) {
    showToast(getFriendlySupabaseErrorMessage(error), 'error');
    return;
  }

  const options = (data || [])
    .map((item) => {
      const route = `${item.origin_station || '-'} - ${item.destination_station || '-'}`;
      return `<option value="${item.id}">${escapeHtml(item.number || '-')} (${escapeHtml(route)})</option>`;
    })
    .join('');

  select.innerHTML = options;
}

export async function loadDutyTypeOptions(container) {
  const select = container.querySelector('#duty-type');

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

  select.innerHTML = '<option value="">Избери тип</option>' + options;
}

export async function loadScheduleKeyOptions(container) {
  const select = container.querySelector('#duty-schedule-keys');

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

  select.innerHTML = options;
}

export function getFriendlySupabaseErrorMessage(error) {
  const rawMessage = String(error?.message || '').trim();
  const normalized = rawMessage.toLowerCase();

  const isRlsError =
    normalized.includes('row-level security') ||
    normalized.includes('violates row-level security policy') ||
    String(error?.code || '') === '42501';

  if (isRlsError && normalized.includes('schedule_key_duties')) {
    return 'Нямаш права да свързваш ключ-графици към повески. Свържи се с администратор.';
  }

  if (isRlsError && normalized.includes('duty_trains')) {
    return 'Нямаш права да свързваш влакове към повески. Свържи се с администратор.';
  }

  if (isRlsError && normalized.includes('duties')) {
    return 'Нямаш права да създаваш или редактираш повески. Свържи се с администратор.';
  }

  if (isRlsError) {
    return 'Достъпът е ограничен от права за сигурност (RLS).';
  }

  return rawMessage || 'Възникна неочаквана грешка.';
}
