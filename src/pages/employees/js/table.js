import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml } from './helpers.js';
import { employeesState } from './state.js';

export async function loadEmployees(container) {
  const { data, error } = await supabase
    .from('employees')
    .select('id, first_name, last_name, position_id, is_active, photo_url, psychological_assessment_expiry, medical_certificate_expiry, license_expiry, positions(title), user_profiles(id, username)')
    .order('last_name', { ascending: true })
    .order('first_name', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    employeesState.rows = [];
    renderEmployeesTable(container, 'Грешка при зареждане на служители.');
    return;
  }

  employeesState.rows = data || [];
  renderEmployeesTable(container);
}

export function renderEmployeesTable(container, explicitEmptyMessage) {
  const tableBody = container.querySelector('#employees-table-body');
  const emptyState = container.querySelector('#employees-empty');
  syncEmployeesFilterOptions(container);

  const filteredRows = employeesState.rows.filter((item) => {
    const fullName = `${item.first_name || ''} ${item.last_name || ''}`.toLowerCase();
    const positionTitle = (item.positions?.title || '').toLowerCase();
    const matchesSearch = !employeesState.searchQuery ||
      fullName.includes(employeesState.searchQuery) ||
      positionTitle.includes(employeesState.searchQuery);
    const matchesPosition = !employeesState.positionFilter || positionTitle === employeesState.positionFilter;
    const matchesActive = !employeesState.activeFilter || String(Boolean(item.is_active)) === employeesState.activeFilter;

    return matchesSearch && matchesPosition && matchesActive;
  });

  if (!filteredRows.length) {
    tableBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма въведени служители.';
    return;
  }

  emptyState.classList.add('d-none');
  tableBody.innerHTML = filteredRows
    .map((item) => {
      const linkedProfiles = Array.isArray(item.user_profiles)
        ? item.user_profiles
        : item.user_profiles
          ? [item.user_profiles]
          : [];

      const linkedProfilesLabel = linkedProfiles.length
        ? linkedProfiles
            .map((profile) => {
              const baseLabel = profile?.username || profile?.id || '';
              if (!baseLabel) {
                return '';
              }

              return baseLabel;
            })
            .filter(Boolean)
            .join(', ')
        : '-';

      return `
        <tr data-employee-id="${item.id}">
          <td>${escapeHtml(item.first_name ?? '')} ${escapeHtml(item.last_name ?? '')}</td>
          <td>${escapeHtml(linkedProfilesLabel)}</td>
          <td>${escapeHtml(item.positions?.title ?? '-')}</td>
          <td>${item.is_active ? 'Да' : 'Не'}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-action="profile"
                data-id="${item.id}"
              >
                Профил
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${item.id}"
                data-first-name="${escapeHtml(item.first_name ?? '')}"
                data-last-name="${escapeHtml(item.last_name ?? '')}"
                data-position-id="${item.position_id ?? ''}"
                data-active="${item.is_active ? 'true' : 'false'}"
                data-photo-url="${escapeHtml(item.photo_url ?? '')}"
                data-psych-expiry="${escapeHtml(item.psychological_assessment_expiry ?? '')}"
                data-medical-expiry="${escapeHtml(item.medical_certificate_expiry ?? '')}"
                data-license-expiry="${escapeHtml(item.license_expiry ?? '')}"
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

function syncEmployeesFilterOptions(container) {
  const positionFilter = container.querySelector('#employees-position-filter');
  if (!positionFilter) {
    return;
  }

  const selectedValue = employeesState.positionFilter || '';
  const positionTitles = [...new Set(
    employeesState.rows
      .map((item) => String(item?.positions?.title || '').trim())
      .filter(Boolean)
  )].sort((left, right) => left.localeCompare(right, 'bg'));

  positionFilter.innerHTML = `
    <option value="">Всички</option>
    ${positionTitles.map((title) => `<option value="${escapeHtml(title.toLowerCase())}">${escapeHtml(title)}</option>`).join('')}
  `;

  positionFilter.value = selectedValue;
}
