import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml } from './helpers.js';
import { scheduleKeysState } from './state.js';
import { bindPaginationButtons, paginateRows, syncPaginationUi } from '../../../utils/pagination.js';

export async function loadScheduleKeys(container) {
  const { data, error } = await supabase
    .from('schedule_keys')
    .select('id, name, is_active, type, crew_role, valid_from, valid_to')
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

  bindPaginationButtons(container, {
    rootSelector: '#schedule-keys-pagination',
    prevSelector: '#schedule-keys-pagination-prev',
    nextSelector: '#schedule-keys-pagination-next',
    onPrev: () => {
      scheduleKeysState.page = Math.max(1, (scheduleKeysState.page || 1) - 1);
      renderScheduleKeysTable(container);
    },
    onNext: () => {
      scheduleKeysState.page = (scheduleKeysState.page || 1) + 1;
      renderScheduleKeysTable(container);
    }
  });

  const filteredRows = scheduleKeysState.rows.filter((item) => {
    const matchesName =
      !scheduleKeysState.filters.name ||
      (item.name || '').toLowerCase().includes(scheduleKeysState.filters.name);

    const matchesCrewRole =
      !scheduleKeysState.filters.crewRole || item.crew_role === scheduleKeysState.filters.crewRole;

    const matchesActive =
      !scheduleKeysState.filters.isActive ||
      String(Boolean(item.is_active)) === scheduleKeysState.filters.isActive;

    const matchesValidFrom =
      !scheduleKeysState.filters.validFrom || item.valid_from === scheduleKeysState.filters.validFrom;

    const matchesValidTo =
      !scheduleKeysState.filters.validTo || item.valid_to === scheduleKeysState.filters.validTo;

    return matchesName && matchesCrewRole && matchesActive && matchesValidFrom && matchesValidTo;
  });

  const { pageItems, page, totalItems, totalPages } = paginateRows(
    filteredRows,
    scheduleKeysState.page,
    scheduleKeysState.pageSize
  );
  scheduleKeysState.page = page;

  syncPaginationUi(container, {
    rootSelector: '#schedule-keys-pagination',
    prevSelector: '#schedule-keys-pagination-prev',
    nextSelector: '#schedule-keys-pagination-next',
    labelSelector: '#schedule-keys-pagination-label',
    page,
    totalItems,
    totalPages
  });

  if (!filteredRows.length) {
    tableBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма записи по зададените филтри.';
    return;
  }

  emptyState.classList.add('d-none');
  tableBody.innerHTML = pageItems
    .map(
      (item) => `
        <tr>
          <td data-label="Наименование">${escapeHtml(item.name ?? '-')}</td>
          <td data-label="Екип">${escapeHtml(item.crew_role ?? '-')}</td>
          <td data-label="Активен">${item.is_active ? 'Да' : 'Не'}</td>
          <td data-label="От дата">${escapeHtml(item.valid_from ?? '-')}</td>
          <td data-label="До дата">${escapeHtml(item.valid_to ?? '-')}</td>
          <td class="text-end" data-label="">
            <div class="d-inline-flex gap-2">
              <button type="button" class="btn btn-sm btn-outline-primary" data-action="edit" data-id="${item.id}" data-name="${escapeHtml(item.name ?? '')}" data-type="${escapeHtml(item.type ?? 'seasonal')}" data-crew-role="${escapeHtml(item.crew_role ?? 'кондуктор')}" data-active="${item.is_active ? 'true' : 'false'}" data-valid-from="${escapeHtml(item.valid_from ?? '')}" data-valid-to="${escapeHtml(item.valid_to ?? '')}" title="Редакция" aria-label="Редакция"><i class="bi bi-pencil"></i></button>
              <button type="button" class="btn btn-sm btn-outline-secondary" data-action="duties" data-id="${item.id}" data-name="${escapeHtml(item.name ?? '')}" title="Повески" aria-label="Повески"><i class="bi bi-list-task"></i></button>
              <button type="button" class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${item.id}" title="Изтрий" aria-label="Изтрий"><i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>
      `
    )
    .join('');
}
