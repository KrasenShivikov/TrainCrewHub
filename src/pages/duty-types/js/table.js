import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml } from './helpers.js';
import { dutyTypesState } from './state.js';
import { bindPaginationButtons, paginateRows, syncPaginationUi } from '../../../utils/pagination.js';
import { initTooltips } from '../../../utils/tooltips.js';

export async function loadDutyTypes(container) {
  const { data, error } = await supabase
    .from('duty_types')
    .select('id, name')
    .order('name', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    dutyTypesState.rows = [];
    renderDutyTypesTable(container, 'Грешка при зареждане на типовете повески.');
    return;
  }

  dutyTypesState.rows = data || [];
  renderDutyTypesTable(container);
}

export function renderDutyTypesTable(container, explicitEmptyMessage) {
  const tableBody = container.querySelector('#duty-types-table-body');
  const emptyState = container.querySelector('#duty-types-empty');
  const actionsEnabled = dutyTypesState.actionsEnabled !== false;

  bindPaginationButtons(container, {
    rootSelector: '#duty-types-pagination',
    prevSelector: '#duty-types-pagination-prev',
    nextSelector: '#duty-types-pagination-next',
    onPrev: () => {
      dutyTypesState.page = Math.max(1, (dutyTypesState.page || 1) - 1);
      renderDutyTypesTable(container);
    },
    onNext: () => {
      dutyTypesState.page = (dutyTypesState.page || 1) + 1;
      renderDutyTypesTable(container);
    }
  });

  container.querySelector('thead th.text-end')?.classList.toggle('d-none', !actionsEnabled);

  const filteredRows = dutyTypesState.rows.filter((item) => {
    if (!dutyTypesState.searchQuery) {
      return true;
    }

    return (item.name || '').toLowerCase().includes(dutyTypesState.searchQuery);
  });

  const { pageItems, page, totalItems, totalPages } = paginateRows(
    filteredRows,
    dutyTypesState.page,
    dutyTypesState.pageSize
  );
  dutyTypesState.page = page;

  syncPaginationUi(container, {
    rootSelector: '#duty-types-pagination',
    prevSelector: '#duty-types-pagination-prev',
    nextSelector: '#duty-types-pagination-next',
    labelSelector: '#duty-types-pagination-label',
    page,
    totalItems,
    totalPages
  });

  if (!filteredRows.length) {
    tableBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма въведени типове повески.';
    return;
  }

  emptyState.classList.add('d-none');
  tableBody.innerHTML = pageItems
    .map(
      (item) => `
        <tr>
          <td data-label="Наименование">${escapeHtml(item.name ?? '-')}</td>
          ${actionsEnabled ? `
          <td class="text-end" data-label="">
            <div class="d-inline-flex gap-2">
              <button type="button" class="btn btn-sm btn-outline-primary" data-action="edit" data-id="${item.id}" data-name="${escapeHtml(item.name ?? '')}" data-bs-toggle="tooltip" data-bs-title="Редакция" aria-label="Редакция"><i class="bi bi-pencil"></i></button>
              <button type="button" class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${item.id}" data-bs-toggle="tooltip" data-bs-title="Изтрий" aria-label="Изтрий"><i class="bi bi-trash"></i></button>
            </div>
          </td>
          ` : ''}
        </tr>
      `
    )
    .join('');
  initTooltips(tableBody);
}
