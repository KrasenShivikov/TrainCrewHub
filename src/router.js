import { renderIndexPage } from './pages/index/js/index.js';
import { renderDashboardPage } from './pages/dashboard/js/dashboard.js';
import { renderLoginPage } from './pages/login/js/login.js';
import { renderRegisterPage } from './pages/register/js/register.js';
import { renderScheduleKeysPage } from './pages/schedule-keys/js/schedule-keys.js';
import { renderDutiesPage } from './pages/duties/js/duties.js';
import { renderEmployeesPage } from './pages/employees/js/employees.js';
import { renderEmployeeAbsencesPage } from './pages/employee-absences/js/employee-absences.js';
import { renderPlannedDutiesPage } from './pages/planned-duties/js/planned-duties.js';
import { renderActualDutiesPage } from './pages/actual-duties/js/actual-duties.js';
import { renderPlanSchedulePage } from './pages/plan-schedule/js/plan-schedule.js';
import { renderSchedulePage } from './pages/schedule/js/schedule.js';
import { renderDutyTypesPage } from './pages/duty-types/js/duty-types.js';
import { renderScheduleKeyDutiesPage } from './pages/schedule-key-duties/js/schedule-key-duties.js';
import { renderTrainsPage } from './pages/trains/js/trains.js';
import { renderAdminPage } from './pages/admin/js/admin.js';
import { showToast } from './components/toast/toast.js';
import { getCurrentUserSession, isUserAdmin } from './utils/auth.js';
import {
  applyResourceActionGuards,
  canViewResourceScreen,
  clearResourceActionGuards,
  getResourceDisplayName,
  getResourceScopes,
  isPermissionBannerEnabled,
  resetPermissionCache
} from './utils/permissions.js';

const routes = {
  '/': {
    render: renderIndexPage,
    title: 'TrainCrewHub'
  },
  '/dashboard': {
    render: renderDashboardPage,
    title: 'TrainCrewHub / Dashboard'
  },
  '/login': {
    render: renderLoginPage,
    title: 'TrainCrewHub / Sign In'
  },
  '/register': {
    render: renderRegisterPage,
    title: 'TrainCrewHub / Register'
  },
  '/schedule-keys': {
    render: renderScheduleKeysPage,
    title: 'TrainCrewHub / Ключ-График',
    resource: 'schedule_keys'
  },
  '/duties': {
    render: renderDutiesPage,
    title: 'TrainCrewHub / Повески',
    resource: 'duties'
  },
  '/duty-types': {
    render: renderDutyTypesPage,
    title: 'TrainCrewHub / Типове повески',
    resource: 'duty_types'
  },
  '/trains': {
    render: renderTrainsPage,
    title: 'TrainCrewHub / Влакове',
    resource: 'trains'
  },
  '/employees': {
    render: renderEmployeesPage,
    title: 'TrainCrewHub / Служители',
    resource: 'employees'
  },
  '/employee-absences': {
    render: renderEmployeeAbsencesPage,
    title: 'TrainCrewHub / Отсъствия',
    resource: 'employee_absences'
  },
  '/planned-duties': {
    render: renderPlannedDutiesPage,
    title: 'TrainCrewHub / Планирани повески',
    resource: 'planned_duties'
  },
  '/actual-duties': {
    render: renderActualDutiesPage,
    title: 'TrainCrewHub / Реални повески',
    resource: 'actual_duties'
  },
  '/plan-schedule': {
    render: renderPlanSchedulePage,
    title: 'TrainCrewHub / План График',
    screenResource: 'page_plan_schedule',
    resource: 'planned_duties'
  },
  '/schedule': {
    render: renderSchedulePage,
    title: 'TrainCrewHub / График',
    screenResource: 'page_schedule',
    resource: 'actual_duties'
  },
  '/schedule-key-duties': {
    render: renderScheduleKeyDutiesPage,
    title: 'TrainCrewHub / Повески към Ключ-График',
    resource: 'duties'
  },
  '/admin': {
    render: renderAdminPage,
    title: 'TrainCrewHub / Админ Панел',
    requiresAdmin: true
  }
};

const contentRootId = 'page-content';

const SCOPE_LABELS = {
  none: 'без достъп',
  all: 'всички',
  own: 'собствени',
  role_attached_employees: 'към прикачени служители по роля'
};

function getScopeBadgeClass(scope) {
  if (scope === 'all') {
    return 'text-bg-success';
  }

  if (scope === 'own' || scope === 'role_attached_employees') {
    return 'text-bg-warning';
  }

  return 'text-bg-secondary';
}

async function renderResourceScopeBanner(contentRoot, resource) {
  if (!contentRoot || !resource) {
    return;
  }

  if (!isPermissionBannerEnabled()) {
    return;
  }

  const scopes = await getResourceScopes(resource);
  const resourceLabel = getResourceDisplayName(resource);
  const rows = [
    { label: 'Екран', key: 'view_screen' },
    { label: 'Виж записи', key: 'view_records' },
    { label: 'Редакция', key: 'edit_records' },
    { label: 'Изтриване', key: 'delete_records' }
  ];

  const badges = rows
    .map(({ label, key }) => {
      const scope = scopes[key] || 'none';
      const scopeLabel = SCOPE_LABELS[scope] || scope;
      const badgeClass = getScopeBadgeClass(scope);
      return `
        <span class="me-3 mb-2 d-inline-flex align-items-center gap-2">
          <span class="text-secondary small">${label}:</span>
          <span class="badge ${badgeClass}">${scopeLabel}</span>
        </span>
      `;
    })
    .join('');

  const banner = document.createElement('div');
  banner.className = 'alert alert-light border d-flex flex-wrap align-items-center gap-1 mb-3';
  banner.innerHTML = `
    <span class="fw-semibold me-2">Права за ${resourceLabel}</span>
    ${badges}
  `;

  contentRoot.prepend(banner);
}

function getRouteConfig(pathname) {
  return routes[pathname] ?? routes['/'];
}

async function resolveAccessPath(pathname, config) {
  if (!config?.requiresAdmin) {
    const screenResource = config?.screenResource || config?.resource || '';
    if (!screenResource) {
      return pathname;
    }

    const canViewScreen = await canViewResourceScreen(screenResource);
    if (canViewScreen) {
      return pathname;
    }

    showToast('Нямаш права за достъп до този екран.', 'warning');
    return '/dashboard';
  }

  const session = await getCurrentUserSession();
  if (!session?.user?.id) {
    return '/login';
  }

  const canAccessAdmin = await isUserAdmin(session.user.id);
  if (canAccessAdmin) {
    return pathname;
  }

  showToast('Нямаш права за достъп до админ панела.', 'warning');
  return '/dashboard';
}

async function renderCurrentRoute() {
  const contentRoot = document.getElementById(contentRootId);
  clearResourceActionGuards();
  const initialPath = window.location.pathname;
  const initialConfig = getRouteConfig(initialPath);
  const resolvedPath = await resolveAccessPath(initialPath, initialConfig);

  if (resolvedPath !== initialPath) {
    window.history.replaceState({}, '', resolvedPath);
  }

  const config = getRouteConfig(resolvedPath);
  
  document.title = config.title;
  await config.render(contentRoot);
  if (config.resource) {
    await renderResourceScopeBanner(contentRoot, config.resource);
    await applyResourceActionGuards(contentRoot, config.resource);
  }
  window.dispatchEvent(new CustomEvent('route:changed', { detail: { pathname: resolvedPath } }));
}

function handleLinkClick(event) {
  const anchor = event.target.closest('a[data-link]');
  if (!anchor) {
    return;
  }

  event.preventDefault();
  const nextPath = anchor.getAttribute('href');
  if (nextPath === window.location.pathname) {
    return;
  }

  window.history.pushState({}, '', nextPath);
  renderCurrentRoute();
}

export function initRouter() {
  resetPermissionCache();
  window.addEventListener('popstate', renderCurrentRoute);
  document.addEventListener('click', handleLinkClick);
  renderCurrentRoute();
}
