import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml } from './helpers.js';
import { scheduleKeysState } from './state.js';

export async function loadScheduleKeys(container) {
  const { data, error } = await supabase
    .from('schedule_keys')
    .select('id, name, is_active, type, valid_from, valid_to')
    .order('valid_from', { ascending: false });

  if (error) {
    showToast(error.message, 'error');
    scheduleKeysState.rows = [];
    renderScheduleKeysTable(container, 'Грешка при зареждане на Ключ-График.');
    return;
  }

  scheduleKeysState.rows = data || [];
  renderScheduleKeysTable(container);
}

export function renderScheduleKeysTable(container, explicitEmptyMessage) {
  const tableBody = container.querySelector('#schedule-keys-table-body');
  const emptyState = container.querySelector('#schedule-keys-empty');

  const filteredRows = scheduleKeysState.rows.filter((item) => {
    const matchesName =
      !scheduleKeysState.filters.name ||
      (item.name || '').toLowerCase().includes(scheduleKeysState.filters.name);

    const matchesType = !scheduleKeysState.filters.type || item.type === scheduleKeysState.filters.type;

    const matchesActive =
      !scheduleKeysState.filters.isActive ||
      String(Boolean(item.is_active)) === scheduleKeysState.filters.isActive;

    const matchesValidFrom =
      !scheduleKeysState.filters.validFrom || item.valid_from === scheduleKeysState.filters.validFrom;

    const matchesValidTo =
      !scheduleKeysState.filters.validTo || item.valid_to === scheduleKeysState.filters.validTo;

    return matchesName && matchesType && matchesActive && matchesValidFrom && matchesValidTo;
  });

  if (!filteredRows.length) {
    tableBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма записи по зададените филтри.';
    return;
  }

  emptyState.classList.add('d-none');
  tableBody.innerHTML = filteredRows
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.name ?? '-')}</td>
          <td>${escapeHtml(item.type ?? '-')}</td>
          <td>${item.is_active ? 'Да' : 'Не'}</td>
          <td>${escapeHtml(item.valid_from ?? '-')}</td>
          <td>${escapeHtml(item.valid_to ?? '-')}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${item.id}"
                data-name="${escapeHtml(item.name ?? '')}"
                data-type="${escapeHtml(item.type ?? 'seasonal')}"
                data-active="${item.is_active ? 'true' : 'false'}"
                data-valid-from="${escapeHtml(item.valid_from ?? '')}"
                data-valid-to="${escapeHtml(item.valid_to ?? '')}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-action="duties"
                data-id="${item.id}"
                data-name="${escapeHtml(item.name ?? '')}"
              >
                Повески
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${item.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `
    )
    .join('');
}
