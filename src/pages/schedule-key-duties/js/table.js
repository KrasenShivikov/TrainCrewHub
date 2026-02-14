import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml, formatInterval } from './helpers.js';
import { scheduleKeyDutiesState } from './state.js';

export async function loadDutiesForScheduleKey(container) {
  const { data, error } = await supabase
    .from('duties')
    .select('id, name, duty_type_id, schedule_key_id, start_time, end_time, break_start_time, break_end_time, break_duration_interval, duration_interval, display_order, schedule_key_duties(schedule_key_id)')
    .eq('schedule_key_id', scheduleKeyDutiesState.scheduleKeyId)
    .order('display_order', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    scheduleKeyDutiesState.duties = [];
    renderScheduleKeyDutiesTable(container, 'Грешка при зареждане на повеските.');
    showToast(error.message, 'error');
    return;
  }

  scheduleKeyDutiesState.duties = data || [];
  renderScheduleKeyDutiesTable(container);
}

export function renderScheduleKeyDutiesTable(container, explicitEmptyMessage) {
  const dutiesBody = container.querySelector('#schedule-key-duties-body');
  const emptyState = container.querySelector('#schedule-key-duties-empty');

  if (!scheduleKeyDutiesState.duties.length) {
    dutiesBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма повески към този Ключ-График.';
    return;
  }

  emptyState.classList.add('d-none');
  dutiesBody.innerHTML = scheduleKeyDutiesState.duties
    .map(
      (item) => {
        const scheduleKeyIds = getScheduleKeyIds(item);

        return `
        <tr data-duty-id="${item.id}" draggable="true">
          <td class="text-secondary">↕</td>
          <td>${escapeHtml(item.name ?? '-')}</td>
          <td>${escapeHtml(item.start_time ?? '-')}</td>
          <td>${escapeHtml(item.end_time ?? '-')}</td>
          <td>${escapeHtml(formatInterval(item.break_duration_interval))}</td>
          <td>${escapeHtml(formatInterval(item.duration_interval))}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-duty-action="edit"
                data-id="${item.id}"
                data-name="${escapeHtml(item.name ?? '')}"
                data-duty-type-id="${item.duty_type_id ?? ''}"
                data-schedule-key-ids="${escapeHtml(scheduleKeyIds.join(','))}"
                data-start-time="${escapeHtml(item.start_time ?? '')}"
                data-end-time="${escapeHtml(item.end_time ?? '')}"
                data-break-start-time="${escapeHtml(item.break_start_time ?? '00:00:00')}"
                data-break-end-time="${escapeHtml(item.break_end_time ?? '00:00:00')}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-duty-action="delete"
                data-id="${item.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `;
      }
    )
    .join('');
}

export async function persistScheduleKeyDutiesOrder() {
  const updates = scheduleKeyDutiesState.duties.map((item, index) =>
    supabase
      .from('duties')
      .update({ display_order: index + 1 })
      .eq('id', item.id)
      .eq('schedule_key_id', scheduleKeyDutiesState.scheduleKeyId)
  );

  const results = await Promise.all(updates);
  const failed = results.find((result) => result.error);

  if (failed?.error) {
    showToast(failed.error.message, 'error');
    return false;
  }

  scheduleKeyDutiesState.duties = scheduleKeyDutiesState.duties.map((item, index) => ({
    ...item,
    display_order: index + 1
  }));

  return true;
}

function getScheduleKeyRows(item) {
  return Array.isArray(item.schedule_key_duties)
    ? item.schedule_key_duties
    : item.schedule_key_duties
      ? [item.schedule_key_duties]
      : [];
}

function getScheduleKeyIds(item) {
  const mappedIds = getScheduleKeyRows(item)
    .map((row) => row?.schedule_key_id)
    .filter(Boolean);

  const ids = mappedIds.length ? mappedIds : item.schedule_key_id ? [item.schedule_key_id] : [];

  return [...new Set(ids)];
}