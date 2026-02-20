import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml } from './helpers.js';
import { employeeAbsencesState } from './state.js';
import { bindPaginationButtons, paginateRows, syncPaginationUi } from '../../../utils/pagination.js';
import { initTooltips } from '../../../utils/tooltips.js';

function getEmployeeFullName(employee) {
  if (!employee) {
    return '-';
  }

  return `${employee.first_name ?? ''} ${employee.last_name ?? ''}`.trim() || '-';
}

export async function loadEmployeeAbsences(container) {
  const { data, error } = await supabase
    .from('employee_absences')
    .select('id, employee_id, reason_id, start_date, end_date, notes, employees(first_name, last_name), absence_reasons(name)')
    .order('start_date', { ascending: false })
    .order('end_date', { ascending: false });

  if (error) {
    showToast(error.message, 'error');
    employeeAbsencesState.rows = [];
    renderEmployeeAbsencesTable(container, 'Грешка при зареждане на отсъствията.');
    return;
  }

  employeeAbsencesState.rows = data || [];
  renderEmployeeAbsencesTable(container);
}

export function renderEmployeeAbsencesTable(container, explicitEmptyMessage) {
  const tableBody = container.querySelector('#employee-absences-table-body');
  const emptyState = container.querySelector('#employee-absences-empty');

  bindPaginationButtons(container, {
    rootSelector: '#employee-absences-pagination',
    prevSelector: '#employee-absences-pagination-prev',
    nextSelector: '#employee-absences-pagination-next',
    onPrev: () => {
      employeeAbsencesState.page = Math.max(1, (employeeAbsencesState.page || 1) - 1);
      renderEmployeeAbsencesTable(container);
    },
    onNext: () => {
      employeeAbsencesState.page = (employeeAbsencesState.page || 1) + 1;
      renderEmployeeAbsencesTable(container);
    }
  });

  const filteredRows = employeeAbsencesState.rows.filter((item) => {
    const employeeName = getEmployeeFullName(item.employees).toLowerCase();
    const reasonName = (item.absence_reasons?.name || '').toLowerCase();
    const startDate = String(item.start_date || '').toLowerCase();
    const endDate = String(item.end_date || '').toLowerCase();
    const notes = String(item.notes || '').toLowerCase();

    const matchesSearch =
      !employeeAbsencesState.searchQuery ||
      employeeName.includes(employeeAbsencesState.searchQuery) ||
      reasonName.includes(employeeAbsencesState.searchQuery) ||
      startDate.includes(employeeAbsencesState.searchQuery) ||
      endDate.includes(employeeAbsencesState.searchQuery) ||
      notes.includes(employeeAbsencesState.searchQuery);

    const matchesFrom =
      !employeeAbsencesState.dateFrom ||
      String(item.end_date || '') >= employeeAbsencesState.dateFrom;

    const matchesTo =
      !employeeAbsencesState.dateTo ||
      String(item.start_date || '') <= employeeAbsencesState.dateTo;

    return matchesSearch && matchesFrom && matchesTo;
  });

  const { pageItems, page, totalItems, totalPages } = paginateRows(
    filteredRows,
    employeeAbsencesState.page,
    employeeAbsencesState.pageSize
  );
  employeeAbsencesState.page = page;

  syncPaginationUi(container, {
    rootSelector: '#employee-absences-pagination',
    prevSelector: '#employee-absences-pagination-prev',
    nextSelector: '#employee-absences-pagination-next',
    labelSelector: '#employee-absences-pagination-label',
    page,
    totalItems,
    totalPages
  });

  if (!filteredRows.length) {
    tableBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма въведени отсъствия.';
    return;
  }

  emptyState.classList.add('d-none');
  tableBody.innerHTML = pageItems
    .map(
      (item) => `
        <tr>
          <td data-label="Служител">${escapeHtml(getEmployeeFullName(item.employees))}</td>
          <td data-label="Причина">${escapeHtml(item.absence_reasons?.name ?? '-')}</td>
          <td data-label="От">${escapeHtml(item.start_date ?? '-')}</td>
          <td data-label="До">${escapeHtml(item.end_date ?? '-')}</td>
          <td data-label="Бележки">${escapeHtml(item.notes ?? '')}</td>
          <td class="text-end" data-label="">
            <div class="d-inline-flex gap-2">
              <button type="button" class="btn btn-sm btn-outline-primary" data-action="edit" data-id="${item.id}" data-employee-id="${item.employee_id ?? ''}" data-reason-id="${item.reason_id ?? ''}" data-start-date="${escapeHtml(item.start_date ?? '')}" data-end-date="${escapeHtml(item.end_date ?? '')}" data-notes="${escapeHtml(item.notes ?? '')}" data-bs-toggle="tooltip" data-bs-title="Редакция" aria-label="Редакция"><i class="bi bi-pencil"></i></button>
              <button type="button" class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${item.id}" data-bs-toggle="tooltip" data-bs-title="Изтрий" aria-label="Изтрий"><i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>
      `
    )
    .join('');
  initTooltips(tableBody);
}
