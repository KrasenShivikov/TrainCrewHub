import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml } from './helpers.js';
import { plannedDutiesState } from './state.js';

function getEmployeeFullName(employee) {
  if (!employee) {
    return '-';
  }

  return `${employee.first_name ?? ''} ${employee.last_name ?? ''}`.trim() || '-';
}

export async function loadPlannedDuties(container) {
  const { data, error } = await supabase
    .from('planned_duties')
    .select('id, date, employee_id, duty_id, assignment_role, employees(first_name, last_name), duties(name, schedule_key_duties(schedule_key_id))')
    .order('date', { ascending: false });

  if (error) {
    showToast(error.message, 'error');
    plannedDutiesState.rows = [];
    renderPlannedDutiesTable(container, 'Грешка при зареждане на планираните повески.');
    return;
  }

  plannedDutiesState.rows = data || [];
  renderPlannedDutiesTable(container);
}

export function renderPlannedDutiesTable(container, explicitEmptyMessage) {
  const tableBody = container.querySelector('#planned-duties-table-body');
  const emptyState = container.querySelector('#planned-duties-empty');
  const selectAllInput = container.querySelector('#planned-duties-select-all');
  const bulkDeleteButton = container.querySelector('#open-bulk-delete-planned-duty');
  const addToActualButton = container.querySelector('#add-selected-to-actual-duty');

  const selectionEnabled = plannedDutiesState.selectionEnabled !== false;

  if (!selectionEnabled) {
    plannedDutiesState.selectedIds = [];
  }

  plannedDutiesState.selectedIds = plannedDutiesState.selectedIds.filter((id) =>
    plannedDutiesState.rows.some((row) => row.id === id)
  );

  const filteredRows = plannedDutiesState.rows.filter((item) => {
    const employeeName = getEmployeeFullName(item.employees).toLowerCase();
    const dutyName = (item.duties?.name || '').toLowerCase();
    const date = (item.date || '').toLowerCase();

    const matchesSearch =
      !plannedDutiesState.searchQuery ||
      employeeName.includes(plannedDutiesState.searchQuery) ||
      dutyName.includes(plannedDutiesState.searchQuery) ||
      date.includes(plannedDutiesState.searchQuery);

    const matchesDate = !plannedDutiesState.dateFilter || item.date === plannedDutiesState.dateFilter;
    const matchesRole = !plannedDutiesState.roleFilter || item.assignment_role === plannedDutiesState.roleFilter;

    return matchesSearch && matchesDate && matchesRole;
  });

  if (!filteredRows.length) {
    plannedDutiesState.visibleRowIds = [];
    tableBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма планирани повески.';
    if (selectAllInput) {
      selectAllInput.checked = false;
      selectAllInput.indeterminate = false;
      selectAllInput.disabled = !selectionEnabled;
      selectAllInput.closest('th')?.classList.toggle('d-none', !selectionEnabled);
    }
    if (bulkDeleteButton) {
      bulkDeleteButton.disabled = !selectionEnabled || plannedDutiesState.selectedIds.length === 0;
      bulkDeleteButton.textContent = plannedDutiesState.selectedIds.length
        ? `Изтрий избраните (${plannedDutiesState.selectedIds.length})`
        : 'Изтрий избраните';
    }
    if (addToActualButton) {
      addToActualButton.disabled = !selectionEnabled || plannedDutiesState.selectedIds.length === 0;
      addToActualButton.textContent = plannedDutiesState.selectedIds.length
        ? `Към Актуални (${plannedDutiesState.selectedIds.length})`
        : 'Към Актуални';
    }
    return;
  }

  plannedDutiesState.visibleRowIds = filteredRows.map((row) => row.id);

  emptyState.classList.add('d-none');
  if (selectAllInput) {
    selectAllInput.disabled = !selectionEnabled;
    selectAllInput.closest('th')?.classList.toggle('d-none', !selectionEnabled);
  }

  tableBody.innerHTML = filteredRows
    .map(
      (item) => {
        const dutyScheduleKeyId = getFirstDutyScheduleKeyId(item);
        const isSelected = selectionEnabled && plannedDutiesState.selectedIds.includes(item.id);
        return `
        <tr>
          ${selectionEnabled ? `
          <td>
            <input
              type="checkbox"
              class="form-check-input"
              data-select-id="${item.id}"
              ${isSelected ? 'checked' : ''}
              aria-label="Избери планиране"
            />
          </td>
          ` : ''}
          <td>${escapeHtml(item.date ?? '-')}</td>
          <td>${escapeHtml(getEmployeeFullName(item.employees))}</td>
          <td>${escapeHtml(getAssignmentRoleLabel(item.assignment_role))}</td>
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
                data-assignment-role="${item.assignment_role ?? 'conductor'}"
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
      }
    )
    .join('');

  const selectedVisibleCount = filteredRows.filter((row) => plannedDutiesState.selectedIds.includes(row.id)).length;
  if (selectAllInput) {
    selectAllInput.disabled = !selectionEnabled;
    selectAllInput.checked = selectionEnabled && selectedVisibleCount > 0 && selectedVisibleCount === filteredRows.length;
    selectAllInput.indeterminate = selectionEnabled && selectedVisibleCount > 0 && selectedVisibleCount < filteredRows.length;
  }

  if (bulkDeleteButton) {
    bulkDeleteButton.disabled = !selectionEnabled || plannedDutiesState.selectedIds.length === 0;
    bulkDeleteButton.textContent = plannedDutiesState.selectedIds.length
      ? `Изтрий избраните (${plannedDutiesState.selectedIds.length})`
      : 'Изтрий избраните';
  }

  if (addToActualButton) {
    addToActualButton.disabled = !selectionEnabled || plannedDutiesState.selectedIds.length === 0;
    addToActualButton.textContent = plannedDutiesState.selectedIds.length
      ? `Към Актуални (${plannedDutiesState.selectedIds.length})`
      : 'Към Актуални';
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

function getAssignmentRoleLabel(value) {
  return value === 'chief' ? 'Началник влак' : 'Кондуктор';
}
