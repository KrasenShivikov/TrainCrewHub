import { escapeHtml, getEmployeeDisplayName } from './helpers.js';
import { userProfilesState } from './state.js';

export function renderUserProfilesTable(container, explicitEmptyMessage) {
  const tableBody = container.querySelector('#user-profiles-table-body');
  const emptyState = container.querySelector('#user-profiles-empty');

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

  if (!filteredRows.length) {
    tableBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма намерени профили.';
    return;
  }

  emptyState.classList.add('d-none');
  tableBody.innerHTML = filteredRows
    .map((row) => {
      const fullName = `${String(row?.first_name || '').trim()} ${String(row?.last_name || '').trim()}`.trim() || '-';
      const employeeName = getEmployeeDisplayName(row);
      return `
        <tr>
          <td>${escapeHtml(row?.username || '-')}</td>
          <td>${escapeHtml(row?.email || '-')}</td>
          <td>${escapeHtml(fullName)}</td>
          <td>${escapeHtml(employeeName)}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-user-profile-action="view"
                data-id="${row.id}"
              >
                Преглед
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-user-profile-action="edit"
                data-id="${row.id}"
              >
                Редакция
              </button>
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
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
