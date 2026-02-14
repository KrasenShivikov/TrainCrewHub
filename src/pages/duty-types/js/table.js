import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml } from './helpers.js';
import { dutyTypesState } from './state.js';

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

  const filteredRows = dutyTypesState.rows.filter((item) => {
    if (!dutyTypesState.searchQuery) {
      return true;
    }

    return (item.name || '').toLowerCase().includes(dutyTypesState.searchQuery);
  });

  if (!filteredRows.length) {
    tableBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма въведени типове повески.';
    return;
  }

  emptyState.classList.add('d-none');
  tableBody.innerHTML = filteredRows
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.name ?? '-')}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${item.id}"
                data-name="${escapeHtml(item.name ?? '')}"
              >
                Редакция
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
