import { supabase } from '../services/supabaseClient.js';
import { showToast } from '../components/toast/toast.js';

// Permission banner feature removed.

const RESOURCE_LABELS_BG = {
  page_plan_schedule: 'Страница План-График',
  page_schedule: 'Страница График',

  action_schedule_confirm: 'Разпределение: Потвърди разпределението',
  action_planned_go_to_plan_schedule: 'Планирани повески: Към План-График',
  action_planned_add_selected_to_actual: 'Планирани повески: Към Актуални',
  action_planned_auto_planning: 'Планирани повески: Автоматично планиране',
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

const ACTION_RESOURCE_FALLBACKS = {
  action_schedule_confirm: { resource: 'actual_duties', action: 'create_records' },
  action_planned_go_to_plan_schedule: { resource: 'planned_duties', action: 'create_records' },
  action_planned_add_selected_to_actual: { resource: 'planned_duties', action: 'create_records' },
  action_planned_auto_planning: { resource: 'planned_duties', action: 'create_records' }
};

let cacheUserId = '';
let cachePermissions = new Map();
let cacheReady = false;
let activeGuardCleanup = null;
let activeActionGuardCleanup = null;

export function getAllPermissionResources() {
  return Object.keys(RESOURCE_LABELS_BG)
    .map((key) => String(key || '').trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, 'bg'));
}

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
    const fallback = ACTION_RESOURCE_FALLBACKS[normalizedResource];
    if (!fallback?.resource || !fallback?.action) {
      return 'none';
    }

    const fallbackPermissions = cachePermissions.get(String(fallback.resource));
    if (!fallbackPermissions) {
      return 'none';
    }

    if (fallback.action === 'view_screen') {
      return normalizeScope(fallbackPermissions.view_screen_scope);
    }
    if (fallback.action === 'view_records') {
      return normalizeScope(fallbackPermissions.view_records_scope);
    }
    if (fallback.action === 'edit_records') {
      return normalizeScope(fallbackPermissions.edit_records_scope);
    }
    if (fallback.action === 'create_records') {
      return normalizeScope(fallbackPermissions.create_records_scope);
    }
    if (fallback.action === 'delete_records') {
      return normalizeScope(fallbackPermissions.delete_records_scope);
    }

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

function setElementPermissionHidden(element, shouldHide) {
  if (!element) {
    return;
  }

  const wasHiddenByGuard = element.dataset.permissionHidden === '1';
  if (shouldHide) {
    element.classList.add('d-none');
    element.dataset.permissionHidden = '1';
    return;
  }

  if (wasHiddenByGuard) {
    element.classList.remove('d-none');
    delete element.dataset.permissionHidden;
  }
}

function setElementActionPermissionHidden(element, shouldHide) {
  if (!element) {
    return;
  }

  if (shouldHide) {
    element.classList.add('d-none');
    element.dataset.actionPermissionHidden = '1';
    return;
  }

  element.classList.remove('d-none');
  delete element.dataset.actionPermissionHidden;
}

export async function applyActionPermissionGuards(container) {
  if (activeActionGuardCleanup) {
    activeActionGuardCleanup();
    activeActionGuardCleanup = null;
  }

  if (!container) {
    return;
  }

  const rules = [
    { selector: '#schedule-confirm-from-timetable', resource: 'action_schedule_confirm' },
    { selector: '#planned-duties-go-to-plan-schedule-hint', resource: 'action_planned_go_to_plan_schedule' },
    { selector: '#planned-duties-add-to-actual-hint', resource: 'action_planned_add_selected_to_actual' },
    { selector: '#open-auto-plan-duty', resource: 'action_planned_auto_planning' }
  ];

  const scopes = await Promise.all(
    rules.map((rule) => getResourcePermissionScope(rule.resource, 'create_records'))
  );

  const lockBySelector = new Map(
    rules.map((rule, index) => [rule.selector, scopes[index] === 'none'])
  );

  const applyDisabledState = () => {
    rules.forEach((rule) => {
      const element = container.querySelector(rule.selector);
      const locked = lockBySelector.get(rule.selector) ?? true;
      setElementActionPermissionHidden(element, locked);
    });
  };

  const clickHandler = (event) => {
    const target = event.target;
    if (!target) {
      return;
    }

    for (const rule of rules) {
      if (!(lockBySelector.get(rule.selector) ?? true)) {
        continue;
      }

      if (target.closest(rule.selector)) {
        event.preventDefault();
        event.stopPropagation();
        showToast('Нямаш права за това действие.', 'warning');
        return;
      }
    }
  };

  const observer = new MutationObserver(() => {
    applyDisabledState();
  });

  applyDisabledState();
  container.addEventListener('click', clickHandler, true);
  observer.observe(container, { childList: true, subtree: true });

  activeActionGuardCleanup = () => {
    container.removeEventListener('click', clickHandler, true);
    observer.disconnect();
  };
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
    'a[id^="open-create-"]',
    'button[id^="open-add-"]',
    'a[id^="open-add-"]',

    // Planned duties page

    // Actual duties page
    '#go-to-schedule',

    'button[data-actual-add-duty-id]'
  ];
  const editSelectors = [
    '[data-action="edit"]',
    '[data-duty-action="edit"]',
    '[data-document-action="edit"]',
    '[data-category-action="edit"]',
    '[data-user-profile-action="edit"]',
    '[data-action="duplicate"]',
    '[data-duty-action="duplicate"]',

    // Schedule page
    'button[data-actual-edit-id]',
    'button[data-actual-drag-id]',
    '#schedule-actual-edit-save'
  ];
  const deleteSelectors = [
    '[data-action="delete"]',
    '[data-duty-action="delete"]',
    '[data-document-action="delete"]',
    '[data-category-action="delete"]',
    '[data-user-profile-action="delete"]',

    // Bulk delete buttons
    '#open-bulk-delete-planned-duty',
    '#open-bulk-delete-actual-duty'
  ];

  const applyDisabledState = () => {
    if (lockCreate) {
      container.querySelectorAll(createSelectors.join(',')).forEach((element) => setElementPermissionHidden(element, true));
    }

    if (lockEdit) {
      container.querySelectorAll(editSelectors.join(',')).forEach((element) => setElementPermissionHidden(element, true));
    }

    if (lockDelete) {
      container.querySelectorAll(deleteSelectors.join(',')).forEach((element) => setElementPermissionHidden(element, true));
    }

    if (!lockCreate) {
      container.querySelectorAll(createSelectors.join(',')).forEach((element) => setElementPermissionHidden(element, false));
    }

    if (!lockEdit) {
      container.querySelectorAll(editSelectors.join(',')).forEach((element) => setElementPermissionHidden(element, false));
    }

    if (!lockDelete) {
      container.querySelectorAll(deleteSelectors.join(',')).forEach((element) => setElementPermissionHidden(element, false));
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

  if (activeActionGuardCleanup) {
    activeActionGuardCleanup();
    activeActionGuardCleanup = null;
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

