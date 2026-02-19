import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { getAllPermissionResources, getResourceDisplayName } from '../../../utils/permissions.js';
import { adminState } from './state.js';
import {
  renderProfilesTable,
  renderRoleAuditTable,
  renderRoleCatalogTable,
  renderRolePermissionsTable,
  renderRolesTable,
  syncAdminSelectOptions
} from './table.js';
import { mapAllUsersWithRoles, mapRoleAuditLogs, mapRolesWithProfiles, resolveCurrentUserProtectedAdminIds } from './adminMappers.js';
import { getMergedRoles, getRoleOptionLabel, syncRoleSelectOptions } from './adminRoles.js';
import { closeModal, openRoleWarningModal, resetRoleModalForm } from './adminModals.js';

export async function hardDeleteUser(container, userId) {
  if (!userId) {
    return;
  }

  const resolveAccessToken = async () => {
    const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession();
    if (!refreshError && refreshed?.session?.access_token) {
      return refreshed.session.access_token;
    }

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData?.session?.access_token) {
      return '';
    }

    return sessionData.session.access_token;
  };

  let accessToken = await resolveAccessToken();
  if (!accessToken) {
    showToast('Липсва активна сесия. Влез отново и опитай пак.', 'warning');
    return;
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    showToast('Липсва Supabase конфигурация (env vars).', 'error');
    return;
  }

  const functionName = 'admin-hard-delete-user-v2';

  const doRequest = async (token) => {
    return fetch(`${supabaseUrl}/functions/v1/${functionName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userId,
        reason: 'admin_panel'
      })
    });
  };

  let response;
  try {
    response = await doRequest(accessToken);
  } catch {
    showToast('Неуспешна връзка към Edge функцията.', 'error');
    return;
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (response.status === 401) {
    accessToken = await resolveAccessToken();
    if (accessToken) {
      try {
        response = await doRequest(accessToken);
        payload = null;
        try {
          payload = await response.json();
        } catch {
          payload = null;
        }
      } catch {
        showToast('Неуспешна връзка към Edge функцията.', 'error');
        return;
      }
    }
  }

  if (!response.ok) {
    const message = String(payload?.error || payload?.message || response.statusText || 'Изтриването не беше успешно.');
    if (response.status === 401) {
      showToast('Нямаш валидна сесия за Edge функцията. Опитай logout/login.', 'warning');
      return;
    }

    if (String(message).toLowerCase().includes('last admin')) {
      showToast('Не може да се изтрие последният администратор.', 'warning');
      return;
    }

    showToast(message, 'error');
    return;
  }

  if (!payload?.ok) {
    showToast('Изтриването не беше успешно.', 'error');
    return;
  }

  showToast('Потребителят е изтрит.', 'success');
  await loadAdminData(container);
}

export async function loadAdminData(container) {
  const { data: userData } = await supabase.auth.getUser();
  adminState.currentUserId = userData?.user?.id || '';

  const [
    { data: profiles, error: profilesError },
    { data: employees, error: employeesError },
    { data: roles, error: rolesError },
    { data: roleCatalogRows, error: roleCatalogError },
    { data: roleAuditLogsRows, error: roleAuditLogsError }
  ] = await Promise.all([
    supabase
      .from('user_profiles')
      .select('id, username, is_active, employee_id, employees(id, first_name, last_name, is_active)')
      .order('username', { ascending: true }),
    supabase
      .from('employees')
      .select('id, first_name, last_name, is_active')
      .order('last_name', { ascending: true })
      .order('first_name', { ascending: true }),
    supabase
      .from('user_roles')
      .select('id, user_id, role, granted_by_user_id')
      .order('role', { ascending: true })
      .order('created_at', { ascending: false }),
    supabase
      .from('roles')
      .select('name, display_name_bg')
      .order('name', { ascending: true }),
    supabase
      .from('user_role_audit_logs')
      .select('id, action, role, actor_user_id, target_user_id, occurred_at')
      .order('occurred_at', { ascending: false })
      .limit(100)
  ]);

  if (profilesError || employeesError || rolesError || roleCatalogError || roleAuditLogsError) {
    showToast(
      profilesError?.message
        || employeesError?.message
        || rolesError?.message
        || roleCatalogError?.message
        || roleAuditLogsError?.message
        || 'Грешка при зареждане на админ панела.',
      'error'
    );
    adminState.profiles = [];
    adminState.employees = [];
    adminState.roleCatalog = [];
    adminState.availableRoles = [];
    adminState.roles = [];
    adminState.roleAuditLogs = [];
    adminState.currentUserProtectedAdminIds = [];
    syncAdminSelectOptions(container);
    renderRoleCatalogTable(container, 'Няма налични роли.');
    renderRolesTable(container, 'Няма данни за роли.');
    renderRoleAuditTable(container, 'Няма записани промени по роли.');
    renderProfilesTable(container, 'Няма данни за профили.');
    return;
  }

  adminState.profiles = profiles || [];
  adminState.employees = employees || [];
  adminState.roleCatalog = roleCatalogRows || [];
  adminState.roles = mapAllUsersWithRoles(roles || [], adminState.profiles);
  adminState.roleAuditLogs = mapRoleAuditLogs(roleAuditLogsRows || [], adminState.profiles);
  adminState.currentUserProtectedAdminIds = resolveCurrentUserProtectedAdminIds(adminState.roles);
  adminState.availableRoles = getMergedRoles(roleCatalogRows || [], roles || []);
  syncRoleSelectOptions(container);

  syncAdminSelectOptions(container);
  renderRoleCatalogTable(container);
  renderRolesTable(container);
  renderRoleAuditTable(container);
  renderProfilesTable(container);
}

export async function createRole(container) {
  const originalRoleNameInput = container.querySelector('#admin-role-modal-original-name');
  const roleInput = container.querySelector('#admin-role-modal-name');
  const roleBgInput = container.querySelector('#admin-role-modal-name-bg');
  const createButton = container.querySelector('#admin-role-modal-save');
  const editingRoleName = originalRoleNameInput?.value?.trim() || '';
  const rawValue = roleInput?.value || '';
  const rawBgValue = roleBgInput?.value || '';
  const roleName = rawValue.trim().toLowerCase();
  const roleNameBg = rawBgValue.trim();

  if (!roleName) {
    showToast('Въведи име на роля.', 'warning');
    return;
  }

  if (!roleNameBg) {
    showToast('Въведи име на ролята на български.', 'warning');
    return;
  }

  if (!/^[a-z0-9_]+$/.test(roleName)) {
    showToast('Ролята може да съдържа само малки латински букви, цифри и _.', 'warning');
    return;
  }

  const originalText = createButton?.innerHTML || '';
  if (createButton) {
    createButton.disabled = true;
    createButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Създаване...';
  }

  const { data: userData } = await supabase.auth.getUser();

  let roleWriteError = null;
  if (editingRoleName) {
    const { error: roleUpdateError } = await supabase
      .from('roles')
      .update({
        name: roleName,
        display_name_bg: roleNameBg || roleName
      })
      .eq('name', editingRoleName);

    roleWriteError = roleUpdateError;
  } else {
    const { error: roleInsertError } = await supabase
      .from('roles')
      .insert({
        name: roleName,
        display_name_bg: roleNameBg || roleName,
        created_from: userData?.user?.email || 'admin_panel'
      });

    roleWriteError = roleInsertError;
  }

  if (roleWriteError) {
    if (createButton) {
      createButton.disabled = false;
      createButton.innerHTML = originalText;
    }
    showToast(roleWriteError.message, 'error');
    return;
  }

  const resourceSeedRows = [...new Map(
    adminState.permissions
      .map((row) => [row.resource, row])
      .filter(([resource]) => Boolean(resource))
  ).values()];

  if (resourceSeedRows.length) {
    const permissionsSeedPayload = resourceSeedRows.map((row) => ({
      role: roleName,
      resource: row.resource,
      display_name_bg: row.display_name_bg || getResourceDisplayName(row.resource),
      view_screen_scope: 'none',
      view_records_scope: 'none',
      create_records_scope: 'none',
      edit_records_scope: 'none',
      delete_records_scope: 'none'
    }));

    const { error: seedError } = await supabase
      .from('role_permissions')
      .upsert(permissionsSeedPayload, { onConflict: 'role,resource' });

    if (seedError) {
      if (createButton) {
        createButton.disabled = false;
        createButton.innerHTML = originalText;
      }
      showToast(seedError.message, 'error');
      return;
    }
  }

  if (roleInput) {
    roleInput.value = '';
  }
  if (roleBgInput) {
    roleBgInput.value = '';
  }
  if (originalRoleNameInput) {
    originalRoleNameInput.value = '';
  }

  if (createButton) {
    createButton.disabled = false;
    createButton.innerHTML = originalText;
  }

  showToast(editingRoleName ? 'Ролята е обновена.' : 'Ролята е създадена.', 'success');
  await loadAvailableRoles(container);
  const roleSelect = container.querySelector('#admin-permissions-role');
  if (roleSelect) {
    roleSelect.value = roleName;
  }
  adminState.permissionsRole = roleName;
  await loadPermissionsForRole(container, roleName);
  closeModal(container.querySelector('#admin-role-modal'));
  resetRoleModalForm(container);
}

export async function addUserRole(container) {
  const profileId = container.querySelector('#admin-role-profile-id')?.value || '';
  const role = container.querySelector('#admin-role-value')?.value || '';
  const addButton = container.querySelector('#admin-role-add');

  if (!profileId || !role) {
    showToast('Избери профил и роля.', 'warning');
    return;
  }

  const originalText = addButton?.innerHTML || '';
  if (addButton) {
    addButton.disabled = true;
    addButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Добавяне...';
  }

  const { data: userData } = await supabase.auth.getUser();

  const { error } = await supabase
    .from('user_roles')
    .insert({
      user_id: profileId,
      role,
      granted_by_user_id: userData?.user?.id || null,
      created_from: userData?.user?.email || 'admin_panel'
    });

  if (addButton) {
    addButton.disabled = false;
    addButton.innerHTML = originalText;
  }

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  showToast('Ролята е добавена.', 'success');
  closeModal(container.querySelector('#admin-assign-role-modal'));
  const profileSelect = container.querySelector('#admin-role-profile-id');
  const roleSelect = container.querySelector('#admin-role-value');
  if (profileSelect) {
    profileSelect.value = '';
  }
  if (roleSelect) {
    roleSelect.value = '';
  }
  await Promise.all([loadRoles(container), loadRoleAuditLogs(container)]);
}

export async function removeUserRole(container, roleId) {
  const { error } = await supabase
    .from('user_roles')
    .delete()
    .eq('id', roleId);

  if (error) {
    if (String(error.message || '').toLowerCase().includes('last admin')) {
      showToast('Не може да се премахне последната админ роля.', 'warning');
      return;
    }

    if (String(error.message || '').toLowerCase().includes('grantor')) {
      showToast('Не можеш да отнемеш админ права нагоре по grantor веригата.', 'warning');
      return;
    }

    showToast(error.message, 'error');
    return;
  }

  showToast('Ролята е премахната.', 'success');
  await Promise.all([loadRoles(container), loadRoleAuditLogs(container)]);
}

export async function saveProfileEmployeeLink(container) {
  const profileId = container.querySelector('#admin-profile-link-id')?.value || '';
  const employeeId = container.querySelector('#admin-profile-link-employee-id')?.value || '';

  if (!profileId || !employeeId) {
    showToast('Избери профил и служител.', 'warning');
    return;
  }

  await updateProfileEmployeeLink(container, profileId, employeeId);
}

export async function updateProfileEmployeeLink(container, profileId, employeeId) {
  const saveButton = container.querySelector('#admin-profile-link-save');
  const originalSaveText = saveButton?.innerHTML || '';

  if (saveButton) {
    saveButton.disabled = true;
    saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';
  }

  if (employeeId) {
    const { error: clearPreviousError } = await supabase
      .from('user_profiles')
      .update({
        employee_id: null,
        updated_at: new Date().toISOString()
      })
      .eq('employee_id', employeeId)
      .neq('id', profileId);

    if (clearPreviousError) {
      if (saveButton) {
        saveButton.disabled = false;
        saveButton.innerHTML = originalSaveText;
      }
      showToast(clearPreviousError.message, 'error');
      return;
    }
  }

  const { error } = await supabase
    .from('user_profiles')
    .update({
      employee_id: employeeId,
      updated_at: new Date().toISOString()
    })
    .eq('id', profileId);

  if (saveButton) {
    saveButton.disabled = false;
    saveButton.innerHTML = originalSaveText;
  }

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  showToast(employeeId ? 'Профилът е свързан със служителя.' : 'Профилът е разкачен от служител.', 'success');
  closeModal(container.querySelector('#admin-profile-link-modal'));
  const profileSelect = container.querySelector('#admin-profile-link-id');
  const employeeSelect = container.querySelector('#admin-profile-link-employee-id');
  if (profileSelect) {
    profileSelect.value = '';
  }
  if (employeeSelect) {
    employeeSelect.value = '';
  }
  await loadProfiles(container);
}

export async function updateProfileActiveStatus(container, profileId, shouldBeActive) {
  if (!profileId) {
    return;
  }

  const profile = adminState.profiles.find((item) => String(item?.id || '') === String(profileId));
  const currentIsActive = profile?.is_active !== false;
  if (currentIsActive === shouldBeActive) {
    showToast(shouldBeActive ? 'Профилът вече е активен.' : 'Профилът вече е деактивиран.', 'warning');
    return;
  }

  const { error } = await supabase
    .from('user_profiles')
    .update({
      is_active: shouldBeActive,
      updated_at: new Date().toISOString()
    })
    .eq('id', profileId);

  if (error) {
    if (String(error.message || '').toLowerCase().includes('last active admin')) {
      showToast('Не може да деактивираш последния активен администратор.', 'warning');
      return;
    }

    showToast(error.message, 'error');
    return;
  }

  showToast(shouldBeActive ? 'Профилът е възстановен.' : 'Профилът е деактивиран.', 'success');
  await loadAdminData(container);
}

export async function loadRoles(container) {
  const { data, error } = await supabase
    .from('user_roles')
    .select('id, user_id, role, granted_by_user_id')
    .order('created_at', { ascending: false });

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  adminState.roles = mapRolesWithProfiles(data || [], adminState.profiles);
  adminState.currentUserProtectedAdminIds = resolveCurrentUserProtectedAdminIds(adminState.roles);
  renderRolesTable(container);
}

export async function loadRoleAuditLogs(container) {
  const { data, error } = await supabase
    .from('user_role_audit_logs')
    .select('id, action, role, actor_user_id, target_user_id, occurred_at')
    .order('occurred_at', { ascending: false })
    .limit(100);

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  adminState.roleAuditLogs = mapRoleAuditLogs(data || [], adminState.profiles);
  renderRoleAuditTable(container);
}

export async function loadAvailableRoles(container) {
  const { data: roleCatalogRows, error } = await supabase
    .from('roles')
    .select('name, display_name_bg')
    .order('name', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  adminState.roleCatalog = roleCatalogRows || [];
  adminState.availableRoles = getMergedRoles(roleCatalogRows || [], adminState.roles);
  syncRoleSelectOptions(container);
  renderRoleCatalogTable(container);
}

export async function deleteCatalogRole(container, roleName) {
  if (!roleName) {
    return;
  }

  if (roleName === 'admin') {
    showToast('Ролята admin не може да бъде изтрита.', 'warning');
    return;
  }

  const { error: deletePermissionsError } = await supabase
    .from('role_permissions')
    .delete()
    .eq('role', roleName);

  if (deletePermissionsError) {
    showToast(deletePermissionsError.message, 'error');
    return;
  }

  const { error } = await supabase
    .from('roles')
    .delete()
    .eq('name', roleName);

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  showToast('Ролята е изтрита.', 'success');
  await loadAvailableRoles(container);
  await loadRoles(container);

  if (adminState.permissionsRole === roleName) {
    const fallbackRole = adminState.availableRoles.includes('admin')
      ? 'admin'
      : adminState.availableRoles[0] || '';

    adminState.permissionsRole = fallbackRole;
    if (fallbackRole) {
      await loadPermissionsForRole(container, fallbackRole);
    } else {
      adminState.permissions = [];
      renderRolePermissionsTable(container, 'Няма данни за права.');
    }
  }
}

export async function openDeleteRoleWarning(container, roleName) {
  const { count: assignedUsersCount, error: assignedCountError } = await supabase
    .from('user_roles')
    .select('id', { count: 'exact', head: true })
    .eq('role', roleName);

  if (assignedCountError) {
    showToast(assignedCountError.message, 'error');
    return;
  }

  const roleLabel = getRoleOptionLabel(roleName);
  const inUseCount = Number(assignedUsersCount || 0);

  if (inUseCount > 0) {
    openRoleWarningModal(container, {
      message: `Ролята "${roleLabel}" не може да бъде изтрита, защото е разкачена към ${inUseCount} потребител(и). Първо премахни свързаните роли от потребителите.`,
      confirmLabel: 'Затвори',
      onConfirm: null
    });
    return;
  }

  openRoleWarningModal(container, {
    message: `Сигурен ли си, че искаш да премахнеш ролята "${roleLabel}"? Ще бъдат изтрити и всички права за тази роля.`,
    confirmLabel: 'Премахни',
    onConfirm: () => deleteCatalogRole(container, roleName)
  });
}

export async function loadProfiles(container) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('id, username, is_active, employee_id, employees(id, first_name, last_name, is_active)')
    .order('username', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  adminState.profiles = data || [];
  syncAdminSelectOptions(container);
  renderProfilesTable(container);
}

export async function loadPermissionsForRole(container, role) {
  const normalizedRole = role || 'admin';

  const { data, error } = await supabase
    .from('role_permissions')
    .select('role, resource, display_name_bg, view_screen_scope, view_records_scope, create_records_scope, edit_records_scope, delete_records_scope')
    .eq('role', normalizedRole)
    .order('resource', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    adminState.permissions = [];
    renderRolePermissionsTable(container, 'Няма данни за права.');
    return;
  }

  const byResource = new Map(
    (data || [])
      .filter((row) => row?.resource)
      .map((row) => [String(row.resource), row])
  );

  const resolveLegacyCreateDefault = (resource) => {
    if (resource === 'action_schedule_confirm') {
      return String(byResource.get('actual_duties')?.create_records_scope || 'none');
    }

    if (
      resource === 'action_planned_go_to_plan_schedule'
      || resource === 'action_planned_add_selected_to_actual'
      || resource === 'action_planned_auto_planning'
    ) {
      return String(byResource.get('planned_duties')?.create_records_scope || 'none');
    }

    return 'none';
  };

  const merged = getAllPermissionResources().map((resource) => {
    const existing = byResource.get(resource);
    if (existing) {
      return existing;
    }

    return {
      role: normalizedRole,
      resource,
      display_name_bg: getResourceDisplayName(resource),
      view_screen_scope: 'none',
      view_records_scope: 'none',
      create_records_scope: resolveLegacyCreateDefault(resource),
      edit_records_scope: 'none',
      delete_records_scope: 'none'
    };
  });

  adminState.permissions = merged;
  renderRolePermissionsTable(container);
}

export async function saveRolePermissions(container) {
  const saveButton = container.querySelector('#admin-permissions-save');
  const roleSelect = container.querySelector('#admin-permissions-role');
  const role = roleSelect?.value || 'admin';

  const rows = [...container.querySelectorAll('#admin-permissions-body tr[data-resource]')];
  if (!rows.length) {
    showToast('Няма редове за запис.', 'warning');
    return;
  }

  const payload = rows.map((row) => {
    const resource = row.getAttribute('data-resource') || '';
    const existing = adminState.permissions.find((item) => item.resource === resource);
    const scopeValue = (field) => {
      const value = row.querySelector(`[data-permission-field="${field}"]`)?.value || 'none';
      if (field === 'view_screen_scope' || field === 'create_records_scope') {
        return ['none', 'all'].includes(value) ? value : 'none';
      }

      return ['none', 'all', 'own', 'role_attached_employees'].includes(value) ? value : 'none';
    };

    return {
      role,
      resource,
      display_name_bg: existing?.display_name_bg || getResourceDisplayName(resource),
      view_screen_scope: scopeValue('view_screen_scope'),
      view_records_scope: scopeValue('view_records_scope'),
      create_records_scope: scopeValue('create_records_scope'),
      edit_records_scope: scopeValue('edit_records_scope'),
      delete_records_scope: scopeValue('delete_records_scope'),
      updated_at: new Date().toISOString()
    };
  });

  const originalText = saveButton?.innerHTML || '';
  if (saveButton) {
    saveButton.disabled = true;
    saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';
  }

  const { error } = await supabase
    .from('role_permissions')
    .upsert(payload, { onConflict: 'role,resource' });

  if (saveButton) {
    saveButton.disabled = false;
    saveButton.innerHTML = originalText;
  }

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  showToast('Правата са записани.', 'success');
  await loadPermissionsForRole(container, role);
}
