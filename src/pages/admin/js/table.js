import { adminState } from './state.js';
import {
  escapeHtml,
  getEmployeeDisplayLabel,
  getProfileDisplayLabel,
  getRoleLabel
} from './helpers.js';
import { getResourceDisplayName } from '../../../utils/permissions.js';

const ACCESS_SCOPE_OPTIONS = [
  { value: 'none', label: 'без достъп' },
  { value: 'all', label: 'всички' },
  { value: 'own', label: 'собствени' },
  { value: 'role_attached_employees', label: 'към прикачени служители по роля' }
];

const VIEW_SCREEN_OPTIONS = [
  { value: 'none', label: 'Не' },
  { value: 'all', label: 'Да' }
];

const CREATE_RECORDS_OPTIONS = [
  { value: 'none', label: 'Не' },
  { value: 'all', label: 'Да' }
];

export function syncAdminSelectOptions(container) {
  const roleProfileSelect = container.querySelector('#admin-role-profile-id');
  const linkProfileSelect = container.querySelector('#admin-profile-link-id');
  const linkEmployeeSelect = container.querySelector('#admin-profile-link-employee-id');

  const selectedRoleProfileId = roleProfileSelect?.value || '';
  const selectedLinkProfileId = linkProfileSelect?.value || '';
  const selectedEmployeeId = linkEmployeeSelect?.value || '';

  const profileOptions = adminState.profiles
    .map((profile) => {
      const label = getProfileDisplayLabel(profile);
      return `<option value="${profile.id}">${escapeHtml(label)}</option>`;
    })
    .join('');

  if (roleProfileSelect) {
    roleProfileSelect.innerHTML = `<option value="">Избери профил</option>${profileOptions}`;
    roleProfileSelect.value = adminState.profiles.some((item) => item.id === selectedRoleProfileId)
      ? selectedRoleProfileId
      : '';
  }

  if (linkProfileSelect) {
    linkProfileSelect.innerHTML = `<option value="">Избери профил</option>${profileOptions}`;
    linkProfileSelect.value = adminState.profiles.some((item) => item.id === selectedLinkProfileId)
      ? selectedLinkProfileId
      : '';
  }

  const employeeOptions = adminState.employees
    .map((employee) => {
      const label = getEmployeeDisplayLabel(employee);
      return `<option value="${employee.id}">${escapeHtml(label)}</option>`;
    })
    .join('');

  if (linkEmployeeSelect) {
    linkEmployeeSelect.innerHTML = `<option value="">Избери служител</option>${employeeOptions}`;
    linkEmployeeSelect.value = adminState.employees.some((item) => item.id === selectedEmployeeId)
      ? selectedEmployeeId
      : '';
  }
}

export function renderRolesTable(container, explicitEmptyMessage) {
  const body = container.querySelector('#admin-roles-body');
  const emptyState = container.querySelector('#admin-roles-empty');

  if (!body || !emptyState) {
    return;
  }

  if (!adminState.roles.length) {
    body.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма добавени роли.';
    return;
  }

  emptyState.classList.add('d-none');
  const adminRolesCount = adminState.roles.filter(
    (item) => String(item?.role || '').trim().toLowerCase() === 'admin'
  ).length;

  body.innerHTML = adminState.roles
    .map((row) => {
      const username = row?.username || row?.user_id || '-';
      const role = row?.role ? resolveRoleLabel(row.role) : '-';
      const grantedBy = row?.granted_by_username || row?.granted_by_user_id || '-';
      const userId = row?.user_id || '';
      const hasRole = Boolean(row?.role);
      const isAdminRole = String(row?.role || '').trim().toLowerCase() === 'admin';
      const isLastAdminRole = isAdminRole && adminRolesCount <= 1;
      const isGrantorProtectedAdmin =
        isAdminRole && userId && adminState.currentUserProtectedAdminIds.includes(userId);
      const removeDisabled = !hasRole || isLastAdminRole || isGrantorProtectedAdmin;
      const roleBadges = [
        hasRole ? `<span class="badge text-bg-secondary">${escapeHtml(role)}</span>` : '<span class="text-secondary">-</span>',
        isGrantorProtectedAdmin ? '<span class="badge text-bg-info">Твой grantor lineage</span>' : ''
      ]
        .filter(Boolean)
        .join(' ');
      const removeTitle = isLastAdminRole
        ? 'Не може да се премахне последният администратор.'
        : isGrantorProtectedAdmin
          ? 'Не можеш да премахнеш админ права нагоре по grantor веригата.'
          : '';

      return `
        <tr>
          <td>${escapeHtml(username)}</td>
          <td>${roleBadges}</td>
          <td>${hasRole ? escapeHtml(grantedBy) : '<span class="text-secondary">-</span>'}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-admin-action="add-role"
                data-user-id="${userId}"
                data-username="${escapeHtml(username)}"
              >
                Добави роля
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-admin-action="remove-role"
                data-role-id="${row.id || ''}"
                ${removeDisabled ? 'disabled' : ''}
                title="${removeTitle}"
              >
                Премахни
              </button>
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

export function renderRoleCatalogTable(container, explicitEmptyMessage) {
  const body = container.querySelector('#admin-role-catalog-body');
  const emptyState = container.querySelector('#admin-role-catalog-empty');

  if (!body || !emptyState) {
    return;
  }

  if (!adminState.roleCatalog.length) {
    body.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма налични роли.';
    return;
  }

  emptyState.classList.add('d-none');
  body.innerHTML = adminState.roleCatalog
    .map((role) => {
      const code = String(role?.name || '').trim();
      const labelBg = String(role?.display_name_bg || '').trim() || getRoleLabel(code);
      const cannotDelete = code === 'admin';

      return `
        <tr>
          <td>${escapeHtml(code)}</td>
          <td>${escapeHtml(labelBg)}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-admin-action="edit-catalog-role"
                data-role-name="${escapeHtml(code)}"
                data-role-bg="${escapeHtml(labelBg)}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-admin-action="delete-catalog-role"
                data-role-name="${escapeHtml(code)}"
                ${cannotDelete ? 'disabled' : ''}
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

export function renderProfilesTable(container, explicitEmptyMessage) {
  const body = container.querySelector('#admin-profiles-body');
  const emptyState = container.querySelector('#admin-profiles-empty');

  if (!body || !emptyState) {
    return;
  }

  if (!adminState.profiles.length) {
    body.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма налични профили.';
    return;
  }

  emptyState.classList.add('d-none');

  body.innerHTML = adminState.profiles
    .map((profile) => {
      const profileLabel = getProfileDisplayLabel(profile);
      const employeeLabel = profile?.employees
        ? getEmployeeDisplayLabel(profile.employees)
        : '-';
      const hasLinkedEmployee = Boolean(profile?.employee_id);

      return `
        <tr>
          <td>${escapeHtml(profileLabel)}</td>
          <td>${escapeHtml(employeeLabel)}</td>
          <td class="text-end">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary me-2"
              data-admin-action="link-profile"
              data-profile-id="${profile.id}"
            >
              Свържи
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger"
              data-admin-action="unlink-profile"
              data-profile-id="${profile.id}"
              ${hasLinkedEmployee ? '' : 'disabled'}
            >
              Разкачи
            </button>
          </td>
        </tr>
      `;
    })
    .join('');
}

export function renderRolePermissionsTable(container, explicitEmptyMessage) {
  const body = container.querySelector('#admin-permissions-body');
  const emptyState = container.querySelector('#admin-permissions-empty');

  if (!body || !emptyState) {
    return;
  }

  if (!adminState.permissions.length) {
    body.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма данни за права.';
    return;
  }

  emptyState.classList.add('d-none');
  body.innerHTML = adminState.permissions
    .map((permission) => {
      const resource = String(permission?.resource || '-');
      const resourceLabel = String(permission?.display_name_bg || '').trim() || getResourceDisplayName(resource);
      const viewScreenScope = normalizeScope(permission?.view_screen_scope);
      const viewRecordsScope = normalizeScope(permission?.view_records_scope);
      const createRecordsScope = normalizeScope(permission?.create_records_scope);
      const editRecordsScope = normalizeScope(permission?.edit_records_scope);
      const deleteRecordsScope = normalizeScope(permission?.delete_records_scope);

      return `
        <tr data-resource="${escapeHtml(resource)}">
          <td>${escapeHtml(resourceLabel)}</td>
          <td class="text-center">
            ${renderScopeSelect('view_screen_scope', viewScreenScope)}
          </td>
          <td class="text-center">
            ${renderScopeSelect('view_records_scope', viewRecordsScope)}
          </td>
          <td class="text-center">
            ${renderScopeSelect('create_records_scope', createRecordsScope)}
          </td>
          <td class="text-center">
            ${renderScopeSelect('edit_records_scope', editRecordsScope)}
          </td>
          <td class="text-center">
            ${renderScopeSelect('delete_records_scope', deleteRecordsScope)}
          </td>
        </tr>
      `;
    })
    .join('');
}

export function renderRoleAuditTable(container, explicitEmptyMessage) {
  const body = container.querySelector('#admin-role-audit-body');
  const emptyState = container.querySelector('#admin-role-audit-empty');

  if (!body || !emptyState) {
    return;
  }

  if (!adminState.roleAuditLogs.length) {
    body.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма записани промени по роли.';
    return;
  }

  emptyState.classList.add('d-none');

  body.innerHTML = adminState.roleAuditLogs
    .map((row) => {
      const action = String(row?.action || '').trim();
      const actionLabel = action === 'grant' ? 'Добавяне' : action === 'revoke' ? 'Премахване' : 'Обновяване';
      const roleLabel = row?.role_label || '-';
      const actorLabel = row?.actor_label || '-';
      const targetLabel = row?.target_label || '-';
      const occurredAt = formatDateTime(row?.occurred_at);

      return `
        <tr>
          <td>${escapeHtml(occurredAt)}</td>
          <td>${escapeHtml(actionLabel)}</td>
          <td>${escapeHtml(roleLabel)}</td>
          <td>${escapeHtml(actorLabel)}</td>
          <td>${escapeHtml(targetLabel)}</td>
        </tr>
      `;
    })
    .join('');
}

function renderScopeSelect(field, selectedValue) {
  const optionsSource = field === 'view_screen_scope'
    ? VIEW_SCREEN_OPTIONS
    : field === 'create_records_scope'
      ? CREATE_RECORDS_OPTIONS
      : ACCESS_SCOPE_OPTIONS;
  const optionsHtml = optionsSource
    .map((option) => {
      const selected = option.value === selectedValue ? 'selected' : '';
      return `<option value="${option.value}" ${selected}>${escapeHtml(option.label)}</option>`;
    })
    .join('');

  return `<select class="form-select form-select-sm" data-permission-field="${field}">${optionsHtml}</select>`;
}

function normalizeScope(value) {
  const normalized = String(value || '').trim();
  if (ACCESS_SCOPE_OPTIONS.some((option) => option.value === normalized)) {
    return normalized;
  }

  return 'none';
}

function resolveRoleLabel(roleName) {
  const normalizedRole = String(roleName || '').trim();
  if (!normalizedRole) {
    return '-';
  }

  const roleMeta = adminState.roleCatalog.find((item) => item?.name === normalizedRole);
  if (!roleMeta) {
    return getRoleLabel(normalizedRole);
  }

  const bg = String(roleMeta?.display_name_bg || '').trim();
  return bg || getRoleLabel(normalizedRole);
}

function formatDateTime(value) {
  if (!value) {
    return '-';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return date.toLocaleString('bg-BG');
}
