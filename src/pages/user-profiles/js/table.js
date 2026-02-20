import { escapeHtml, getEmployeeDisplayName } from './helpers.js';
import { userProfilesState } from './state.js';
import { bindPaginationButtons, paginateRows, syncPaginationUi } from '../../../utils/pagination.js';
import { initTooltips } from '../../../utils/tooltips.js';

export function renderUserProfilesTable(container, explicitEmptyMessage) {
  const tableBody = container.querySelector('#user-profiles-table-body');
  const emptyState = container.querySelector('#user-profiles-empty');

  bindPaginationButtons(container, {
    rootSelector: '#user-profiles-pagination',
    prevSelector: '#user-profiles-pagination-prev',
    nextSelector: '#user-profiles-pagination-next',
    onPrev: () => {
      userProfilesState.page = Math.max(1, (userProfilesState.page || 1) - 1);
      renderUserProfilesTable(container);
    },
    onNext: () => {
      userProfilesState.page = (userProfilesState.page || 1) + 1;
      renderUserProfilesTable(container);
    }
  });

  const filteredRows = (userProfilesState.rows || []).filter((row) => {
    const searchable = [
      row?.username,
      row?.email,
      row?.first_name,
      row?.last_name,
      getEmployeeDisplayName(row)
    ]
      .map((value) => String(value || '').toLowerCase())
      .join(' ');

    return !userProfilesState.searchQuery || searchable.includes(userProfilesState.searchQuery);
  });

  const { pageItems, page, totalItems, totalPages } = paginateRows(
    filteredRows,
    userProfilesState.page,
    userProfilesState.pageSize
  );
  userProfilesState.page = page;

  syncPaginationUi(container, {
    rootSelector: '#user-profiles-pagination',
    prevSelector: '#user-profiles-pagination-prev',
    nextSelector: '#user-profiles-pagination-next',
    labelSelector: '#user-profiles-pagination-label',
    page,
    totalItems,
    totalPages
  });

  if (!filteredRows.length) {
    tableBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма намерени профили.';
    return;
  }

  emptyState.classList.add('d-none');
  tableBody.innerHTML = pageItems
    .map((row) => {
      const fullName = `${String(row?.first_name || '').trim()} ${String(row?.last_name || '').trim()}`.trim() || '-';
      const employeeName = getEmployeeDisplayName(row);
      return `
        <tr>
          <td data-label="Потребителско име">${escapeHtml(row?.username || '-')}</td>
          <td data-label="Имейл">${escapeHtml(row?.email || '-')}</td>
          <td data-label="Име">${escapeHtml(fullName)}</td>
          <td data-label="Служител">${escapeHtml(employeeName)}</td>
          <td class="text-end" data-label="">
            <div class="d-inline-flex gap-2">
              <button type="button" class="btn btn-sm btn-outline-secondary" data-user-profile-action="view" data-id="${row.id}" data-bs-toggle="tooltip" data-bs-title="Преглед" aria-label="Преглед"><i class="bi bi-eye"></i></button>
              <button type="button" class="btn btn-sm btn-outline-primary" data-user-profile-action="edit" data-id="${row.id}" data-bs-toggle="tooltip" data-bs-title="Редакция" aria-label="Редакция"><i class="bi bi-pencil"></i></button>
              ${userProfilesState.isAdmin ? `
                <button type="button" class="btn btn-sm btn-outline-warning" data-user-profile-action="reset-password" data-id="${row.id}" data-bs-toggle="tooltip" data-bs-title="Reset парола" aria-label="Reset парола"><i class="bi bi-key"></i></button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
  initTooltips(tableBody);
}

export function syncEmployeeOptions(container) {
  const select = container.querySelector('#user-profile-edit-employee-id');
  if (!select) {
    return;
  }

  const options = (userProfilesState.employees || [])
    .map((employee) => {
      const fullName = `${String(employee?.first_name || '').trim()} ${String(employee?.last_name || '').trim()}`.trim() || '-';
      return `<option value="${employee.id}">${escapeHtml(fullName)}</option>`;
    })
    .join('');

  select.innerHTML = '<option value="">Без свързан служител</option>' + options;
}
