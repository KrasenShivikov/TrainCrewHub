import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml } from './helpers.js';
import { actualDutiesState } from './state.js';

function getEmployeeFullName(employee) {
  if (!employee) {
    return '-';
  }

  return `${employee.first_name ?? ''} ${employee.last_name ?? ''}`.trim() || '-';
}

export async function loadActualDuties(container) {
  const { data, error } = await supabase
    .from('actual_duties')
    .select('id, date, employee_id, duty_id, employees(first_name, last_name), duties(name, schedule_key_duties(schedule_key_id))')
    .order('date', { ascending: false });

  if (error) {
    showToast(error.message, 'error');
    actualDutiesState.rows = [];
    renderActualDutiesTable(container, 'Грешка при зареждане на реалните повески.');
    return;
  }

  actualDutiesState.rows = data || [];
  renderActualDutiesTable(container);
}

export function renderActualDutiesTable(container, explicitEmptyMessage) {
  const tableBody = container.querySelector('#actual-duties-table-body');
  const emptyState = container.querySelector('#actual-duties-empty');
  const selectAllInput = container.querySelector('#actual-duties-select-all');
  const bulkDeleteButton = container.querySelector('#open-bulk-delete-actual-duty');

  actualDutiesState.selectedIds = actualDutiesState.selectedIds.filter((id) =>
    actualDutiesState.rows.some((row) => row.id === id)
  );

  const filteredRows = actualDutiesState.rows.filter((item) => {
    const employeeName = getEmployeeFullName(item.employees).toLowerCase();
    const dutyName = (item.duties?.name || '').toLowerCase();
    const date = (item.date || '').toLowerCase();

    const matchesSearch =
      !actualDutiesState.searchQuery ||
      employeeName.includes(actualDutiesState.searchQuery) ||
      dutyName.includes(actualDutiesState.searchQuery) ||
      date.includes(actualDutiesState.searchQuery);

    const matchesDate = !actualDutiesState.dateFilter || item.date === actualDutiesState.dateFilter;

    return matchesSearch && matchesDate;
  });

  if (!filteredRows.length) {
    actualDutiesState.visibleRowIds = [];
    tableBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма записи за реално изпълнение.';

    if (selectAllInput) {
      selectAllInput.checked = false;
      selectAllInput.indeterminate = false;
      selectAllInput.disabled = true;
    }

    if (bulkDeleteButton) {
      bulkDeleteButton.disabled = actualDutiesState.selectedIds.length === 0;
      bulkDeleteButton.textContent = actualDutiesState.selectedIds.length
        ? `Изтрий избраните (${actualDutiesState.selectedIds.length})`
        : 'Изтрий избраните';
    }

    return;
  }

  actualDutiesState.visibleRowIds = filteredRows.map((row) => row.id);

  emptyState.classList.add('d-none');
  tableBody.innerHTML = filteredRows
    .map((item) => {
      const dutyScheduleKeyId = getFirstDutyScheduleKeyId(item);
      const isSelected = actualDutiesState.selectedIds.includes(item.id);

      return `
        <tr>
          <td>
            <input
              type="checkbox"
              class="form-check-input"
              data-select-id="${item.id}"
              ${isSelected ? 'checked' : ''}
              aria-label="Избери запис"
            />
          </td>
          <td>${escapeHtml(item.date ?? '-')}</td>
          <td>${escapeHtml(getEmployeeFullName(item.employees))}</td>
          <td>${escapeHtml(item.duties?.name ?? '-')}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${item.id}"
                data-date="${escapeHtml(item.date ?? '')}"
                data-employee-id="${item.employee_id ?? ''}"
                data-duty-id="${item.duty_id ?? ''}"
                data-duty-schedule-key-id="${dutyScheduleKeyId}"
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
      `;
    })
    .join('');

  const selectedVisibleCount = filteredRows.filter((row) => actualDutiesState.selectedIds.includes(row.id)).length;

  if (selectAllInput) {
    selectAllInput.disabled = false;
    selectAllInput.checked = selectedVisibleCount > 0 && selectedVisibleCount === filteredRows.length;
    selectAllInput.indeterminate = selectedVisibleCount > 0 && selectedVisibleCount < filteredRows.length;
  }

  if (bulkDeleteButton) {
    bulkDeleteButton.disabled = actualDutiesState.selectedIds.length === 0;
    bulkDeleteButton.textContent = actualDutiesState.selectedIds.length
      ? `Изтрий избраните (${actualDutiesState.selectedIds.length})`
      : 'Изтрий избраните';
  }
}

function getFirstDutyScheduleKeyId(item) {
  const rows = Array.isArray(item?.duties?.schedule_key_duties)
    ? item.duties.schedule_key_duties
    : item?.duties?.schedule_key_duties
      ? [item.duties.schedule_key_duties]
      : [];

  return rows.find((row) => row?.schedule_key_id)?.schedule_key_id || '';
}
