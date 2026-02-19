import { adminState } from './state.js';
import { getRoleLabel } from './helpers.js';

const DEFAULT_ROLES = ['admin', 'head_of_transport', 'instructor', 'crew', 'user'];
const ROLE_SORT_PRIORITY = {
  admin: 10,
  crew_manager: 20,
  head_of_transport: 30,
  crew_instructor: 40,
  instructor: 50,
  crew: 60,
  crew_member: 70,
  user: 80
};

export function getMergedRoles(roleCatalogRows, assignedRoleRows) {
  const fromCatalog = (roleCatalogRows || []).map((row) => String(row?.name || '').trim()).filter(Boolean);
  const fromAssigned = (assignedRoleRows || []).map((row) => String(row?.role || '').trim()).filter(Boolean);
  const merged = [...new Set([...DEFAULT_ROLES, ...fromCatalog, ...fromAssigned])];
  return merged.sort((left, right) => {
    const normalizedLeft = String(left || '').trim().toLowerCase();
    const normalizedRight = String(right || '').trim().toLowerCase();
    const leftPriority = ROLE_SORT_PRIORITY[normalizedLeft] ?? 999;
    const rightPriority = ROLE_SORT_PRIORITY[normalizedRight] ?? 999;

    if (leftPriority !== rightPriority) {
      return leftPriority - rightPriority;
    }

    return normalizedLeft.localeCompare(normalizedRight, 'en');
  });
}

export function getRoleOptionLabel(roleName) {
  const roleMeta = adminState.roleCatalog.find((item) => item?.name === roleName);
  const bgName = String(roleMeta?.display_name_bg || '').trim();
  if (!bgName) {
    return getRoleLabel(roleName);
  }

  return bgName;
}

export function syncRoleSelectOptions(container) {
  const roleValueSelect = container.querySelector('#admin-role-value');
  const permissionsRoleSelect = container.querySelector('#admin-permissions-role');

  const selectedRoleForAssign = roleValueSelect?.value || '';
  const selectedRoleForPermissions = permissionsRoleSelect?.value || adminState.permissionsRole || '';

  const optionsHtml = adminState.availableRoles
    .map((roleName) => {
      const label = getRoleOptionLabel(roleName);
      return `<option value="${roleName}">${label}</option>`;
    })
    .join('');

  if (roleValueSelect) {
    roleValueSelect.innerHTML = `<option value="">Избери роля</option>${optionsHtml}`;
    roleValueSelect.value = adminState.availableRoles.includes(selectedRoleForAssign)
      ? selectedRoleForAssign
      : '';
  }

  if (permissionsRoleSelect) {
    permissionsRoleSelect.innerHTML = optionsHtml;
    const fallbackRole = adminState.availableRoles.includes('admin') ? 'admin' : adminState.availableRoles[0] || '';
    const selectedRole = adminState.availableRoles.includes(selectedRoleForPermissions)
      ? selectedRoleForPermissions
      : fallbackRole;
    permissionsRoleSelect.value = selectedRole;
    adminState.permissionsRole = selectedRole;
  }
}
