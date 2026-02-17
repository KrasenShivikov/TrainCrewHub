import pageHtml from '../admin.html?raw';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { getResourceDisplayName } from '../../../utils/permissions.js';
import { adminState } from './state.js';
import { getRoleLabel } from './helpers.js';
import {
  renderProfilesTable,
  renderRoleAuditTable,
  renderRoleCatalogTable,
  renderRolePermissionsTable,
  renderRolesTable,
  syncAdminSelectOptions
} from './table.js';

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
let pendingRoleWarningAction = null;

export async function renderAdminPage(container) {
  container.innerHTML = pageHtml;
  const permissionsRoleSelect = container.querySelector('#admin-permissions-role');
  if (permissionsRoleSelect) {
    permissionsRoleSelect.value = adminState.permissionsRole;
  }

  resetRoleModalForm(container);
  initializeAdminTabs(container);

  attachAdminHandlers(container);
  await loadAdminData(container);
  await loadPermissionsForRole(container, adminState.permissionsRole);
}

function attachAdminHandlers(container) {
  const assignRoleModal = container.querySelector('#admin-assign-role-modal');
  const assignRoleModalCloseButton = container.querySelector('#admin-assign-role-modal-close');
  const assignRoleModalCancelButton = container.querySelector('#admin-assign-role-modal-cancel');
  const profileLinkModal = container.querySelector('#admin-profile-link-modal');
  const profileLinkModalCloseButton = container.querySelector('#admin-profile-link-modal-close');
  const profileLinkModalCancelButton = container.querySelector('#admin-profile-link-modal-cancel');
  const openRoleModalButton = container.querySelector('#open-admin-role-modal');
  const roleModal = container.querySelector('#admin-role-modal');
  const roleModalForm = container.querySelector('#admin-role-modal-form');
  const roleModalCloseButton = container.querySelector('#admin-role-modal-close');
  const roleModalCancelButton = container.querySelector('#admin-role-modal-cancel');
  const warningModal = container.querySelector('#admin-role-warning-modal');
  const warningModalCloseButton = container.querySelector('#admin-role-warning-close');
  const warningModalCancelButton = container.querySelector('#admin-role-warning-cancel');
  const warningModalConfirmButton = container.querySelector('#admin-role-warning-confirm');
  const roleForm = container.querySelector('#admin-role-form');
  const profileLinkForm = container.querySelector('#admin-profile-link-form');
  const unlinkButton = container.querySelector('#admin-profile-link-clear');
  const permissionsForm = container.querySelector('#admin-permissions-form');
  const permissionsRoleSelect = container.querySelector('#admin-permissions-role');
  const rolesBody = container.querySelector('#admin-roles-body');
  const roleCatalogBody = container.querySelector('#admin-role-catalog-body');
  const profilesBody = container.querySelector('#admin-profiles-body');

  assignRoleModalCloseButton?.addEventListener('click', () => {
    closeModal(assignRoleModal);
  });

  assignRoleModalCancelButton?.addEventListener('click', () => {
    closeModal(assignRoleModal);
  });

  profileLinkModalCloseButton?.addEventListener('click', () => {
    closeModal(profileLinkModal);
  });

  profileLinkModalCancelButton?.addEventListener('click', () => {
    closeModal(profileLinkModal);
  });

  openRoleModalButton?.addEventListener('click', () => {
    openRoleModal(container, { mode: 'create' });
  });

  roleModalForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await createRole(container);
  });

  roleModalCloseButton?.addEventListener('click', () => {
    closeModal(roleModal);
    resetRoleModalForm(container);
  });

  roleModalCancelButton?.addEventListener('click', () => {
    closeModal(roleModal);
    resetRoleModalForm(container);
  });

  warningModalCloseButton?.addEventListener('click', () => {
    closeModal(warningModal);
    pendingRoleWarningAction = null;
  });

  warningModalCancelButton?.addEventListener('click', () => {
    closeModal(warningModal);
    pendingRoleWarningAction = null;
  });

  warningModalConfirmButton?.addEventListener('click', async () => {
    if (!pendingRoleWarningAction) {
      closeModal(warningModal);
      return;
    }

    const action = pendingRoleWarningAction;
    pendingRoleWarningAction = null;
    closeModal(warningModal);
    await action();
  });

  roleForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await addUserRole(container);
  });

  profileLinkForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveProfileEmployeeLink(container);
  });

  unlinkButton?.addEventListener('click', async () => {
    const profileId = container.querySelector('#admin-profile-link-id')?.value || '';
    if (!profileId) {
      showToast('Избери профил за разкачане.', 'warning');
      return;
    }

    openRoleWarningModal(container, {
      message: 'Сигурен ли си, че искаш да разкачиш профила от служителя?',
      confirmLabel: 'Разкачи',
      onConfirm: () => updateProfileEmployeeLink(container, profileId, null)
    });
  });

  permissionsForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveRolePermissions(container);
  });

  permissionsRoleSelect?.addEventListener('change', async (event) => {
    const nextRole = event.target.value || 'admin';
    adminState.permissionsRole = nextRole;
    await loadPermissionsForRole(container, nextRole);
  });

  rolesBody?.addEventListener('click', async (event) => {
    const addButton = event.target.closest('button[data-admin-action="add-role"]');
    if (addButton) {
      const userId = addButton.getAttribute('data-user-id') || '';
      if (!userId) {
        return;
      }

      openAssignRoleModalForUser(container, userId);
      return;
    }

    const removeButton = event.target.closest('button[data-admin-action="remove-role"]');
    if (!removeButton) {
      return;
    }

    const roleId = removeButton.getAttribute('data-role-id') || '';
    if (!roleId) {
      return;
    }

    openRoleWarningModal(container, {
      message: 'Сигурен ли си, че искаш да разкачиш тази роля от потребителя?',
      confirmLabel: 'Разкачи',
      onConfirm: () => removeUserRole(container, roleId)
    });
  });

  roleCatalogBody?.addEventListener('click', async (event) => {
    const editButton = event.target.closest('button[data-admin-action="edit-catalog-role"]');
    if (editButton) {
      const roleName = editButton.getAttribute('data-role-name') || '';
      const roleNameBg = editButton.getAttribute('data-role-bg') || '';
      openRoleModal(container, { mode: 'edit', roleName, roleNameBg });
      return;
    }

    const deleteButton = event.target.closest('button[data-admin-action="delete-catalog-role"]');
    if (!deleteButton) {
      return;
    }

    const roleName = deleteButton.getAttribute('data-role-name') || '';
    if (!roleName) {
      return;
    }

    await openDeleteRoleWarning(container, roleName);
  });

  profilesBody?.addEventListener('click', async (event) => {
    const linkActionButton = event.target.closest('button[data-admin-action="link-profile"]');
    if (linkActionButton) {
      const profileId = linkActionButton.getAttribute('data-profile-id') || '';
      if (profileId) {
        openProfileLinkModalForProfile(container, profileId);
      }
      return;
    }

    const unlinkActionButton = event.target.closest('button[data-admin-action="unlink-profile"]');
    if (unlinkActionButton) {
      const profileId = unlinkActionButton.getAttribute('data-profile-id') || '';
      if (!profileId) {
        return;
      }

      openRoleWarningModal(container, {
        message: 'Сигурен ли си, че искаш да разкачиш профила от служителя?',
        confirmLabel: 'Разкачи',
        onConfirm: () => updateProfileEmployeeLink(container, profileId, null)
      });
      return;
    }

    const deactivateButton = event.target.closest('button[data-admin-action="deactivate-profile"]');
    if (deactivateButton) {
      const deactivateProfileId = deactivateButton.getAttribute('data-profile-id') || '';
      if (!deactivateProfileId) {
        return;
      }

      if (deactivateProfileId === adminState.currentUserId) {
        showToast('Не можеш да деактивираш собствения си профил.', 'warning');
        return;
      }

      openRoleWarningModal(container, {
        message: 'Сигурен ли си, че искаш да деактивираш този профил? Потребителят ще загуби достъп до системата.',
        confirmLabel: 'Деактивирай',
        onConfirm: () => updateProfileActiveStatus(container, deactivateProfileId, false)
      });
      return;
    }

    const restoreButton = event.target.closest('button[data-admin-action="restore-profile"]');
    if (restoreButton) {
      const restoreProfileId = restoreButton.getAttribute('data-profile-id') || '';
      if (!restoreProfileId) {
        return;
      }

      openRoleWarningModal(container, {
        message: 'Сигурен ли си, че искаш да възстановиш този профил?',
        confirmLabel: 'Възстанови',
        onConfirm: () => updateProfileActiveStatus(container, restoreProfileId, true)
      });
      return;
    }

    const hardDeleteButton = event.target.closest('button[data-admin-action="hard-delete-user"]');
    if (!hardDeleteButton) {
      return;
    }

    const hardDeleteUserId = hardDeleteButton.getAttribute('data-profile-id') || '';
    if (!hardDeleteUserId) {
      return;
    }

    if (hardDeleteUserId === adminState.currentUserId) {
      showToast('Не можеш да изтриеш собствения си акаунт.', 'warning');
      return;
    }

    openRoleWarningModal(container, {
      message: 'Сигурен ли си? Това е необратимо: ще бъдат изтрити Auth акаунтът, профилът и ролите.',
      confirmLabel: 'Изтрий',
      onConfirm: () => hardDeleteUser(container, hardDeleteUserId)
    });
  });
}

async function hardDeleteUser(container, userId) {
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

function openProfileLinkModalForProfile(container, profileId) {
  const profileLinkModal = container.querySelector('#admin-profile-link-modal');
  const profileSelect = container.querySelector('#admin-profile-link-id');
  const employeeSelect = container.querySelector('#admin-profile-link-employee-id');
  const profile = adminState.profiles.find((item) => item.id === profileId);

  if (profileSelect) {
    profileSelect.value = profileId;
  }

  if (employeeSelect) {
    employeeSelect.value = profile?.employee_id || '';
  }

  openModal(profileLinkModal);
}

function openAssignRoleModalForUser(container, userId) {
  const assignRoleModal = container.querySelector('#admin-assign-role-modal');
  const userSelect = container.querySelector('#admin-role-profile-id');
  const roleSelect = container.querySelector('#admin-role-value');

  if (userSelect) {
    userSelect.value = userId;
  }

  if (roleSelect) {
    roleSelect.value = '';
  }

  openModal(assignRoleModal);
}

async function loadAdminData(container) {
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

async function createRole(container) {
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

async function addUserRole(container) {
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

async function removeUserRole(container, roleId) {
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

async function saveProfileEmployeeLink(container) {
  const profileId = container.querySelector('#admin-profile-link-id')?.value || '';
  const employeeId = container.querySelector('#admin-profile-link-employee-id')?.value || '';

  if (!profileId || !employeeId) {
    showToast('Избери профил и служител.', 'warning');
    return;
  }

  await updateProfileEmployeeLink(container, profileId, employeeId);
}

async function updateProfileEmployeeLink(container, profileId, employeeId) {
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

async function updateProfileActiveStatus(container, profileId, shouldBeActive) {
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

async function loadRoles(container) {
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

async function loadRoleAuditLogs(container) {
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

function mapRoleAuditLogs(logRows, profiles) {
  const profilesById = new Map((profiles || []).map((profile) => [profile.id, profile]));

  return (logRows || []).map((row) => {
    const actorProfile = profilesById.get(row.actor_user_id);
    const targetProfile = profilesById.get(row.target_user_id);
    const role = String(row?.role || '').trim();

    return {
      ...row,
      role_label: role ? getRoleLabel(role) : '-',
      actor_label: actorProfile?.username || row?.actor_user_id || '-',
      target_label: targetProfile?.username || row?.target_user_id || '-'
    };
  });
}

function resolveCurrentUserProtectedAdminIds(roles) {
  const currentUserId = String(adminState.currentUserId || '').trim();
  if (!currentUserId) {
    return [];
  }

  const adminRows = (roles || []).filter((row) => String(row?.role || '').trim().toLowerCase() === 'admin');
  const grantorByUserId = new Map(
    adminRows.map((row) => [String(row?.user_id || '').trim(), String(row?.granted_by_user_id || '').trim()])
  );

  const adminRoleRow = (roles || []).find(
    (row) => String(row?.user_id || '').trim() === currentUserId && String(row?.role || '').trim().toLowerCase() === 'admin'
  );
  const firstGrantorId = String(adminRoleRow?.granted_by_user_id || '').trim();
  if (!firstGrantorId) {
    return [];
  }

  const protectedIds = [];
  const visited = new Set([currentUserId]);
  let cursorId = firstGrantorId;

  while (cursorId && !visited.has(cursorId)) {
    protectedIds.push(cursorId);
    visited.add(cursorId);

    const nextGrantorId = String(grantorByUserId.get(cursorId) || '').trim();
    if (!nextGrantorId || nextGrantorId === cursorId) {
      break;
    }

    cursorId = nextGrantorId;
  }

  return protectedIds;
}

function mapRolesWithProfiles(roles, profiles) {
  const profilesById = new Map((profiles || []).map((profile) => [profile.id, profile]));

  return (roles || []).map((roleRow) => ({
    ...roleRow,
    username: profilesById.get(roleRow.user_id)?.username || '',
    granted_by_username: profilesById.get(roleRow.granted_by_user_id)?.username || ''
  }));
}

function mapAllUsersWithRoles(roles, profiles) {
  const profilesById = new Map((profiles || []).map((profile) => [profile.id, profile]));
  const rolesByUserId = new Map();

  // Group roles by user_id
  (roles || []).forEach((roleRow) => {
    if (!rolesByUserId.has(roleRow.user_id)) {
      rolesByUserId.set(roleRow.user_id, []);
    }
    rolesByUserId.get(roleRow.user_id).push(roleRow);
  });

  // Create rows: for each user with roles, create a row for each role; for users without roles, create one row
  const result = [];
  (profiles || []).forEach((profile) => {
    const userRoles = rolesByUserId.get(profile.id) || [];
    
    if (userRoles.length > 0) {
      // User has roles - create a row for each role
      userRoles.forEach((roleRow) => {
        result.push({
          ...roleRow,
          username: profile.username,
          user_id: profile.id,
          granted_by_username: profilesById.get(roleRow.granted_by_user_id)?.username || ''
        });
      });
    } else {
      // User has no roles - create a single row with empty role
      result.push({
        id: null,
        user_id: profile.id,
        role: null,
        username: profile.username,
        granted_by_user_id: null,
        granted_by_username: ''
      });
    }
  });

  return result;
}

function getMergedRoles(roleCatalogRows, assignedRoleRows) {
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

function syncRoleSelectOptions(container) {
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

async function loadAvailableRoles(container) {
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

function getRoleOptionLabel(roleName) {
  const roleMeta = adminState.roleCatalog.find((item) => item?.name === roleName);
  const bgName = String(roleMeta?.display_name_bg || '').trim();
  if (!bgName) {
    return getRoleLabel(roleName);
  }

  return bgName;
}

async function deleteCatalogRole(container, roleName) {
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

function openRoleModal(container, { mode, roleName = '', roleNameBg = '' }) {
  const modal = container.querySelector('#admin-role-modal');
  const title = container.querySelector('#admin-role-modal-title');
  const originalRoleNameInput = container.querySelector('#admin-role-modal-original-name');
  const roleInput = container.querySelector('#admin-role-modal-name');
  const roleBgInput = container.querySelector('#admin-role-modal-name-bg');
  const saveButton = container.querySelector('#admin-role-modal-save');

  if (originalRoleNameInput) {
    originalRoleNameInput.value = mode === 'edit' ? roleName : '';
  }
  if (roleInput) {
    roleInput.value = mode === 'edit' ? roleName : '';
  }
  if (roleBgInput) {
    roleBgInput.value = mode === 'edit' ? (roleNameBg || roleName) : '';
  }
  if (title) {
    title.textContent = mode === 'edit' ? 'Редакция на роля' : 'Нова роля';
  }
  if (saveButton) {
    saveButton.textContent = mode === 'edit' ? 'Запази' : 'Създай';
  }

  openModal(modal);
}

function resetRoleModalForm(container) {
  const originalRoleNameInput = container.querySelector('#admin-role-modal-original-name');
  const roleInput = container.querySelector('#admin-role-modal-name');
  const roleBgInput = container.querySelector('#admin-role-modal-name-bg');
  const title = container.querySelector('#admin-role-modal-title');
  const saveButton = container.querySelector('#admin-role-modal-save');

  if (originalRoleNameInput) {
    originalRoleNameInput.value = '';
  }
  if (roleInput) {
    roleInput.value = '';
  }
  if (roleBgInput) {
    roleBgInput.value = '';
  }
  if (title) {
    title.textContent = 'Нова роля';
  }
  if (saveButton) {
    saveButton.textContent = 'Създай';
  }
}

function openRoleWarningModal(container, { message, confirmLabel, onConfirm }) {
  const modal = container.querySelector('#admin-role-warning-modal');
  const messageElement = container.querySelector('#admin-role-warning-message');
  const confirmButton = container.querySelector('#admin-role-warning-confirm');

  pendingRoleWarningAction = typeof onConfirm === 'function' ? onConfirm : null;
  if (messageElement) {
    messageElement.textContent = message || 'Сигурен ли си?';
  }
  if (confirmButton) {
    confirmButton.textContent = confirmLabel || 'Потвърди';
  }

  openModal(modal);
}

async function openDeleteRoleWarning(container, roleName) {
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

function openModal(modalElement) {
  if (!modalElement) {
    return;
  }

  modalElement.classList.remove('d-none');
}

function closeModal(modalElement) {
  if (!modalElement) {
    return;
  }

  modalElement.classList.add('d-none');
}

function initializeAdminTabs(container) {
  const tabButtons = [...container.querySelectorAll('[data-admin-tab]')];
  const tabPanes = [...container.querySelectorAll('[data-admin-tab-pane]')];
  if (!tabButtons.length || !tabPanes.length) {
    return;
  }

  const activateTab = (tabName) => {
    tabButtons.forEach((button) => {
      const isActive = button.getAttribute('data-admin-tab') === tabName;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    tabPanes.forEach((pane) => {
      const isActive = pane.getAttribute('data-admin-tab-pane') === tabName;
      pane.classList.toggle('active', isActive);
      pane.classList.toggle('d-none', !isActive);
    });
  };

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-admin-tab') || '';
      if (!tabName) {
        return;
      }

      activateTab(tabName);
    });
  });

  const initialTabName = tabButtons.find((button) => button.classList.contains('active'))?.getAttribute('data-admin-tab')
    || tabButtons[0]?.getAttribute('data-admin-tab')
    || '';
  if (initialTabName) {
    activateTab(initialTabName);
  }
}

async function loadProfiles(container) {
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

async function loadPermissionsForRole(container, role) {
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

  adminState.permissions = data || [];
  renderRolePermissionsTable(container);
}

async function saveRolePermissions(container) {
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
