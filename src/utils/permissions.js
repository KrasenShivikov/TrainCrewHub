import { supabase } from '../services/supabaseClient.js';
import { showToast } from '../components/toast/toast.js';

// Permission banner feature removed.

const RESOURCE_LABELS_BG = {
  page_plan_schedule: 'Страница План-График',
  page_schedule: 'Страница График',
  schedule_keys: 'Ключ-Графици',
  duties: 'Повески',
  duty_types: 'Типове повески',
  trains: 'Влакове',
  employees: 'Служители',
  employee_absences: 'Отсъствия',
  planned_duties: 'Планирани повески',
  actual_duties: 'Реални повески',
  user_roles: 'Роли на потребители',
  user_profiles: 'Потребителски профили',
  role_permissions: 'Права по роли',
  schedule_key_duties: 'Повески към ключ-график',
  positions: 'Позиции',
  absence_reasons: 'Причини за отсъствие',
  duty_trains: 'Влакове към повески',
  documents: 'Документи'
};

const ACCESS_SCOPE_RANK = {
  none: 0,
  own: 1,
  role_attached_employees: 2,
  all: 3
};

let cacheUserId = '';
let cachePermissions = new Map();
let cacheReady = false;
let activeGuardCleanup = null;

function normalizeScope(value) {
  const normalized = String(value || '').trim();
  if (Object.hasOwn(ACCESS_SCOPE_RANK, normalized)) {
    return normalized;
  }

  return 'none';
}

function maxScope(left, right) {
  const normalizedLeft = normalizeScope(left);
  const normalizedRight = normalizeScope(right);
  return ACCESS_SCOPE_RANK[normalizedLeft] >= ACCESS_SCOPE_RANK[normalizedRight] ? normalizedLeft : normalizedRight;
}

async function loadPermissionCache() {
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData?.session?.user?.id || '';

  if (!userId) {
    cacheUserId = '';
    cachePermissions = new Map();
    cacheReady = true;
    return;
  }

  if (cacheReady && cacheUserId === userId) {
    return;
  }

  const { data: roleRows, error: rolesError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId);

  if (rolesError) {
    cacheUserId = userId;
    cachePermissions = new Map();
    cacheReady = true;
    return;
  }

  const roles = [...new Set((roleRows || []).map((item) => String(item?.role || '').trim()).filter(Boolean))];
  if (!roles.length) {
    cacheUserId = userId;
    cachePermissions = new Map();
    cacheReady = true;
    return;
  }

  const { data: permissionRows, error: permissionsError } = await supabase
    .from('role_permissions')
    .select('resource, view_screen_scope, view_records_scope, create_records_scope, edit_records_scope, delete_records_scope')
    .in('role', roles);

  if (permissionsError) {
    cacheUserId = userId;
    cachePermissions = new Map();
    cacheReady = true;
    return;
  }

  const nextPermissions = new Map();

  (permissionRows || []).forEach((row) => {
    const resource = String(row?.resource || '').trim();
    if (!resource) {
      return;
    }

    const current = nextPermissions.get(resource) || {
      view_screen_scope: 'none',
      view_records_scope: 'none',
      create_records_scope: 'none',
      edit_records_scope: 'none',
      delete_records_scope: 'none'
    };

    nextPermissions.set(resource, {
      view_screen_scope: maxScope(current.view_screen_scope, row?.view_screen_scope),
      view_records_scope: maxScope(current.view_records_scope, row?.view_records_scope),
      create_records_scope: maxScope(current.create_records_scope, row?.create_records_scope),
      edit_records_scope: maxScope(current.edit_records_scope, row?.edit_records_scope),
      delete_records_scope: maxScope(current.delete_records_scope, row?.delete_records_scope)
    });
  });

  cacheUserId = userId;
  cachePermissions = nextPermissions;
  cacheReady = true;
}

export async function getResourcePermissionScope(resource, action) {
  await loadPermissionCache();

  const normalizedResource = String(resource || '').trim();
  const normalizedAction = String(action || '').trim();
  if (!normalizedResource || !normalizedAction) {
    return 'none';
  }

  const resourcePermissions = cachePermissions.get(normalizedResource);
  if (!resourcePermissions) {
    return 'none';
  }

  if (normalizedAction === 'view_screen') {
    return normalizeScope(resourcePermissions.view_screen_scope);
  }

  if (normalizedAction === 'view_records') {
    return normalizeScope(resourcePermissions.view_records_scope);
  }

  if (normalizedAction === 'edit_records') {
    return normalizeScope(resourcePermissions.edit_records_scope);
  }

  if (normalizedAction === 'create_records') {
    return normalizeScope(resourcePermissions.create_records_scope);
  }

  if (normalizedAction === 'delete_records') {
    return normalizeScope(resourcePermissions.delete_records_scope);
  }

  return 'none';
}

export async function canViewResourceScreen(resource) {
  const scope = await getResourcePermissionScope(resource, 'view_screen');
  return scope !== 'none';
}

export async function getResourceScopes(resource) {
  const normalizedResource = String(resource || '').trim();
  if (!normalizedResource) {
    return {
      view_screen: 'none',
      view_records: 'none',
      create_records: 'none',
      edit_records: 'none',
      delete_records: 'none'
    };
  }

  const [viewScreenScope, viewRecordsScope, createRecordsScope, editRecordsScope, deleteRecordsScope] = await Promise.all([
    getResourcePermissionScope(normalizedResource, 'view_screen'),
    getResourcePermissionScope(normalizedResource, 'view_records'),
    getResourcePermissionScope(normalizedResource, 'create_records'),
    getResourcePermissionScope(normalizedResource, 'edit_records'),
    getResourcePermissionScope(normalizedResource, 'delete_records')
  ]);

  return {
    view_screen: viewScreenScope,
    view_records: viewRecordsScope,
    create_records: createRecordsScope,
    edit_records: editRecordsScope,
    delete_records: deleteRecordsScope
  };
}

function disableButton(button, shouldDisable) {
  if (!button) {
    return;
  }

  button.disabled = shouldDisable;
  button.classList.toggle('disabled', shouldDisable);
}

export async function applyResourceActionGuards(container, resource) {
  if (activeGuardCleanup) {
    activeGuardCleanup();
    activeGuardCleanup = null;
  }

  const normalizedResource = String(resource || '').trim();
  if (!container || !normalizedResource) {
    return;
  }

  const editScope = await getResourcePermissionScope(normalizedResource, 'edit_records');
  const createScope = await getResourcePermissionScope(normalizedResource, 'create_records');
  const deleteScope = await getResourcePermissionScope(normalizedResource, 'delete_records');

  const lockCreate = createScope === 'none';
  const lockEdit = editScope === 'none';
  const lockDelete = deleteScope === 'none';

  const createSelectors = [
    'button[id^="open-create-"]',
    'button[id^="open-add-"]'
  ];
  const editSelectors = [
    '[data-action="edit"]',
    '[data-duty-action="edit"]',
    '[data-action="duplicate"]',
    '[data-duty-action="duplicate"]'
  ];
  const deleteSelectors = ['[data-action="delete"]', '[data-duty-action="delete"]'];

  const applyDisabledState = () => {
    if (lockCreate) {
      container.querySelectorAll(createSelectors.join(',')).forEach((button) => disableButton(button, true));
    }

    if (lockEdit) {
      container.querySelectorAll(editSelectors.join(',')).forEach((button) => disableButton(button, true));
    }

    if (lockDelete) {
      container.querySelectorAll(deleteSelectors.join(',')).forEach((button) => disableButton(button, true));
    }
  };

  const clickHandler = (event) => {
    const target = event.target;
    if (!target) {
      return;
    }

    if (lockCreate && target.closest(createSelectors.join(','))) {
      event.preventDefault();
      event.stopPropagation();
      showToast('Нямаш права за създаване.', 'warning');
      return;
    }

    if (lockEdit && target.closest(editSelectors.join(','))) {
      event.preventDefault();
      event.stopPropagation();
      showToast('Нямаш права за редакция.', 'warning');
      return;
    }

    if (lockDelete && target.closest(deleteSelectors.join(','))) {
      event.preventDefault();
      event.stopPropagation();
      showToast('Нямаш права за изтриване.', 'warning');
    }
  };

  const observer = new MutationObserver(() => {
    applyDisabledState();
  });

  applyDisabledState();
  container.addEventListener('click', clickHandler, true);
  observer.observe(container, { childList: true, subtree: true });

  activeGuardCleanup = () => {
    container.removeEventListener('click', clickHandler, true);
    observer.disconnect();
  };
}

export function clearResourceActionGuards() {
  if (activeGuardCleanup) {
    activeGuardCleanup();
    activeGuardCleanup = null;
  }
}

export function resetPermissionCache() {
  cacheUserId = '';
  cachePermissions = new Map();
  cacheReady = false;
}

export function getResourceDisplayName(resource) {
  const normalizedResource = String(resource || '').trim();
  if (!normalizedResource) {
    return '-';
  }

  return RESOURCE_LABELS_BG[normalizedResource] || normalizedResource;
}

