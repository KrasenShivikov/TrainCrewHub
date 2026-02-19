import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml, syncDisabledHints } from './helpers.js';
import { plannedDutiesState } from './state.js';
import { bindPaginationButtons, paginateRows, syncPaginationUi } from '../../../utils/pagination.js';

const ACTION_HINTS = [
  {
    wrapperSelector: '#planned-duties-add-to-actual-hint',
    buttonSelector: '#add-selected-to-actual-duty',
    disabledTitle: 'Избери поне едно планиране от таблицата (чекбокс), за да активираш бутона.'
  },
  {
    wrapperSelector: '#planned-duties-bulk-delete-hint',
    buttonSelector: '#open-bulk-delete-planned-duty',
    disabledTitle: 'Избери поне едно планиране от таблицата (чекбокс), за да активираш бутона.'
  }
];

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

  bindPaginationButtons(container, {
    rootSelector: '#planned-duties-pagination',
    prevSelector: '#planned-duties-pagination-prev',
    nextSelector: '#planned-duties-pagination-next',
    onPrev: () => {
      plannedDutiesState.page = Math.max(1, (plannedDutiesState.page || 1) - 1);
      renderPlannedDutiesTable(container);
    },
    onNext: () => {
      plannedDutiesState.page = (plannedDutiesState.page || 1) + 1;
      renderPlannedDutiesTable(container);
    }
  });

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

  const { pageItems, page, totalItems, totalPages } = paginateRows(
    filteredRows,
    plannedDutiesState.page,
    plannedDutiesState.pageSize
  );
  plannedDutiesState.page = page;

  syncPaginationUi(container, {
    rootSelector: '#planned-duties-pagination',
    prevSelector: '#planned-duties-pagination-prev',
    nextSelector: '#planned-duties-pagination-next',
    labelSelector: '#planned-duties-pagination-label',
    page,
    totalItems,
    totalPages
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
      const bulkLabel = plannedDutiesState.selectedIds.length
        ? `Изтрий избраните (${plannedDutiesState.selectedIds.length})`
        : 'Изтрий избраните';
      bulkDeleteButton.innerHTML = `<i class="bi bi-trash me-1"></i>${bulkLabel}`;
    }
    if (addToActualButton) {
      addToActualButton.disabled = !selectionEnabled || plannedDutiesState.selectedIds.length === 0;
      const actualLabel = plannedDutiesState.selectedIds.length
        ? `Към Актуални (${plannedDutiesState.selectedIds.length})`
        : 'Към Актуални';
      addToActualButton.innerHTML = `<i class="bi bi-clipboard2-check me-1"></i>${actualLabel}`;
    }

    syncDisabledHints(container, ACTION_HINTS);
    return;
  }

  plannedDutiesState.visibleRowIds = pageItems.map((row) => row.id);

  emptyState.classList.add('d-none');
  if (selectAllInput) {
    selectAllInput.disabled = !selectionEnabled;
    selectAllInput.closest('th')?.classList.toggle('d-none', !selectionEnabled);
  }

  tableBody.innerHTML = pageItems
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
              <button type="button" class="btn btn-sm btn-outline-secondary" data-action="trains" data-duty-id="${item.duty_id ?? ''}" data-duty-name="${escapeHtml(item.duties?.name ?? '')}" title="Влакове" aria-label="Влакове"><i class="bi bi-train-front"></i></button>
              <button type="button" class="btn btn-sm btn-outline-primary" data-action="edit" data-id="${item.id}" data-date="${escapeHtml(item.date ?? '')}" data-employee-id="${item.employee_id ?? ''}" data-duty-id="${item.duty_id ?? ''}" data-assignment-role="${item.assignment_role ?? 'conductor'}" data-duty-schedule-key-id="${dutyScheduleKeyId}" title="Редакция" aria-label="Редакция"><i class="bi bi-pencil"></i></button>
              <button type="button" class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${item.id}" title="Изтрий" aria-label="Изтрий"><i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>
      `;
      }
    )
    .join('');

  const selectedVisibleCount = pageItems.filter((row) => plannedDutiesState.selectedIds.includes(row.id)).length;
  if (selectAllInput) {
    selectAllInput.disabled = !selectionEnabled;
    selectAllInput.checked = selectionEnabled && pageItems.length > 0 && selectedVisibleCount === pageItems.length;
    selectAllInput.indeterminate = selectionEnabled && selectedVisibleCount > 0 && selectedVisibleCount < pageItems.length;
  }

  if (bulkDeleteButton) {
    bulkDeleteButton.disabled = !selectionEnabled || plannedDutiesState.selectedIds.length === 0;
    const bulkLabel = plannedDutiesState.selectedIds.length
      ? `Изтрий избраните (${plannedDutiesState.selectedIds.length})`
      : 'Изтрий избраните';
    bulkDeleteButton.innerHTML = `<i class="bi bi-trash me-1"></i>${bulkLabel}`;
  }

  if (addToActualButton) {
    addToActualButton.disabled = !selectionEnabled || plannedDutiesState.selectedIds.length === 0;
    const actualLabel = plannedDutiesState.selectedIds.length
      ? `Към Актуални (${plannedDutiesState.selectedIds.length})`
      : 'Към Актуални';
    addToActualButton.innerHTML = `<i class="bi bi-clipboard2-check me-1"></i>${actualLabel}`;
  }

  syncDisabledHints(container, ACTION_HINTS);
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
