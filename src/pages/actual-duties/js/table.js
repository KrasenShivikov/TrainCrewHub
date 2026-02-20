import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml } from './helpers.js';
import { actualDutiesState } from './state.js';
import { bindPaginationButtons, paginateRows, syncPaginationUi } from '../../../utils/pagination.js';

function getEmployeeFullName(employee) {
  if (!employee) {
    return '-';
  }

  return `${employee.first_name ?? ''} ${employee.last_name ?? ''}`.trim() || '-';
}

export async function loadActualDuties(container) {
  const { data, error } = await supabase
    .from('actual_duties')
    .select('id, date, employee_id, duty_id, assignment_role, start_time_override, end_time_override, break_start_time_override, break_end_time_override, employees(first_name, last_name), duties(name, start_time, end_time, break_start_time, break_end_time, schedule_key_duties(schedule_key_id))')
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
  const bulkDeleteHint = container.querySelector('#actual-duties-bulk-delete-hint');

  bindPaginationButtons(container, {
    rootSelector: '#actual-duties-pagination',
    prevSelector: '#actual-duties-pagination-prev',
    nextSelector: '#actual-duties-pagination-next',
    onPrev: () => {
      actualDutiesState.page = Math.max(1, (actualDutiesState.page || 1) - 1);
      renderActualDutiesTable(container);
    },
    onNext: () => {
      actualDutiesState.page = (actualDutiesState.page || 1) + 1;
      renderActualDutiesTable(container);
    }
  });

  const selectionEnabled = actualDutiesState.selectionEnabled !== false;

  if (!selectionEnabled) {
    actualDutiesState.selectedIds = [];
  }

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
    const matchesRole = !actualDutiesState.roleFilter || item.assignment_role === actualDutiesState.roleFilter;

    return matchesSearch && matchesDate && matchesRole;
  });

  const { pageItems, page, totalItems, totalPages } = paginateRows(
    filteredRows,
    actualDutiesState.page,
    actualDutiesState.pageSize
  );
  actualDutiesState.page = page;

  syncPaginationUi(container, {
    rootSelector: '#actual-duties-pagination',
    prevSelector: '#actual-duties-pagination-prev',
    nextSelector: '#actual-duties-pagination-next',
    labelSelector: '#actual-duties-pagination-label',
    page,
    totalItems,
    totalPages
  });

  if (!filteredRows.length) {
    actualDutiesState.visibleRowIds = [];
    tableBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма записи за реално изпълнение.';

    if (selectAllInput) {
      selectAllInput.checked = false;
      selectAllInput.indeterminate = false;
      selectAllInput.disabled = !selectionEnabled;
      selectAllInput.closest('th')?.classList.toggle('d-none', !selectionEnabled);
    }

    if (bulkDeleteButton) {
      bulkDeleteButton.disabled = !selectionEnabled || actualDutiesState.selectedIds.length === 0;
      const bulkLabel = actualDutiesState.selectedIds.length
        ? `Изтрий избраните (${actualDutiesState.selectedIds.length})`
        : 'Изтрий избраните';
      bulkDeleteButton.innerHTML = `<i class="bi bi-trash me-1"></i>${bulkLabel}`;
    }

    if (bulkDeleteHint && bulkDeleteButton) {
      const title = bulkDeleteButton.disabled
        ? 'Избери поне един запис от таблицата (чекбокс), за да активираш бутона.'
        : '';
      bulkDeleteHint.setAttribute('title', title);
      bulkDeleteHint.classList.toggle('cursor-help', Boolean(title));
    }

    return;
  }

  actualDutiesState.visibleRowIds = pageItems.map((row) => row.id);

  emptyState.classList.add('d-none');

  if (selectAllInput) {
    selectAllInput.disabled = !selectionEnabled;
    selectAllInput.closest('th')?.classList.toggle('d-none', !selectionEnabled);
  }

  tableBody.innerHTML = pageItems
    .map((item) => {
      const dutyScheduleKeyId = getFirstDutyScheduleKeyId(item);
      const isSelected = selectionEnabled && actualDutiesState.selectedIds.includes(item.id);

      return `
        <tr>
          ${selectionEnabled ? `
          <td data-label="">
            <input
              type="checkbox"
              class="form-check-input"
              data-select-id="${item.id}"
              ${isSelected ? 'checked' : ''}
              aria-label="Избери запис"
            />
          </td>
          ` : ''}
          <td data-label="Дата">${escapeHtml(item.date ?? '-')}</td>
          <td data-label="Служител">${escapeHtml(getEmployeeFullName(item.employees))}</td>
          <td data-label="Роля">${escapeHtml(getAssignmentRoleLabel(item.assignment_role))}</td>
          <td data-label="Повеска">${escapeHtml(item.duties?.name ?? '-')}</td>
          <td class="text-end" data-label="">
            <div class="d-inline-flex gap-2">
              <button type="button" class="btn btn-sm btn-outline-secondary" data-action="profile" data-id="${item.id}" title="Профил" aria-label="Профил"><i class="bi bi-person-vcard"></i></button>
              <button type="button" class="btn btn-sm btn-outline-primary" data-action="edit" data-id="${item.id}" data-date="${escapeHtml(item.date ?? '')}" data-employee-id="${item.employee_id ?? ''}" data-duty-id="${item.duty_id ?? ''}" data-assignment-role="${item.assignment_role ?? 'conductor'}" data-duty-schedule-key-id="${dutyScheduleKeyId}" data-start-time-override="${escapeHtml((item.start_time_override || '').slice(0, 5))}" data-end-time-override="${escapeHtml((item.end_time_override || '').slice(0, 5))}" data-break-start-time-override="${escapeHtml((item.break_start_time_override || '').slice(0, 5))}" data-break-end-time-override="${escapeHtml((item.break_end_time_override || '').slice(0, 5))}" data-duty-start-time="${escapeHtml((item.duties?.start_time || '').slice(0, 5))}" data-duty-end-time="${escapeHtml((item.duties?.end_time || '').slice(0, 5))}" data-duty-break-start-time="${escapeHtml((item.duties?.break_start_time || '').slice(0, 5))}" data-duty-break-end-time="${escapeHtml((item.duties?.break_end_time || '').slice(0, 5))}" title="Редакция" aria-label="Редакция"><i class="bi bi-pencil"></i></button>
              <button type="button" class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${item.id}" title="Изтрий" aria-label="Изтрий"><i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>
      `;
    })
    .join('');

  const selectedVisibleCount = pageItems.filter((row) => actualDutiesState.selectedIds.includes(row.id)).length;

  if (selectAllInput) {
    selectAllInput.disabled = !selectionEnabled;
    selectAllInput.checked = selectionEnabled && pageItems.length > 0 && selectedVisibleCount === pageItems.length;
    selectAllInput.indeterminate = selectionEnabled && selectedVisibleCount > 0 && selectedVisibleCount < pageItems.length;
  }

  if (bulkDeleteButton) {
    bulkDeleteButton.disabled = !selectionEnabled || actualDutiesState.selectedIds.length === 0;
    const bulkLabel = actualDutiesState.selectedIds.length
      ? `Изтрий избраните (${actualDutiesState.selectedIds.length})`
      : 'Изтрий избраните';
    bulkDeleteButton.innerHTML = `<i class="bi bi-trash me-1"></i>${bulkLabel}`;
  }

  if (bulkDeleteHint && bulkDeleteButton) {
    const title = bulkDeleteButton.disabled
      ? 'Избери поне един запис от таблицата (чекбокс), за да активираш бутона.'
      : '';
    bulkDeleteHint.setAttribute('title', title);
    bulkDeleteHint.classList.toggle('cursor-help', Boolean(title));
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

function getAssignmentRoleLabel(role) {
  return role === 'chief' ? 'Началник влак' : 'Кондуктор';
}
