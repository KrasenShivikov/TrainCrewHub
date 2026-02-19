import { renderIndexPage } from './pages/index/js/index.js';
import { renderLoginPage } from './pages/login/js/login.js';
import { renderRegisterPage } from './pages/register/js/register.js';
import { renderForgotPasswordPage } from './pages/forgot-password/js/forgot-password.js';
import { renderResetPasswordPage } from './pages/reset-password/js/reset-password.js';
import { renderPendingAccessPage } from './pages/pending-access/js/pending-access.js';
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
import { renderDocumentsPage } from './pages/documents/js/documents.js';
import { renderUserProfilesPage } from './pages/user-profiles/js/user-profiles.js';
import { showToast } from './components/toast/toast.js';
import { ensureActiveUserSession, getCurrentUserSession, hasUserAssignedRole, isUserAdmin } from './utils/auth.js';
import {
  applyActionPermissionGuards,
  applyResourceActionGuards,
  canViewResourceScreen,
  clearResourceActionGuards,
  resetPermissionCache
} from './utils/permissions.js';

const routes = {
  '/': {
    render: renderIndexPage,
    title: 'TrainCrewHub'
  },
  '/login': {
    render: renderLoginPage,
    title: 'TrainCrewHub / Sign In'
  },
  '/register': {
    render: renderRegisterPage,
    title: 'TrainCrewHub / Register'
  },
  '/forgot-password': {
    render: renderForgotPasswordPage,
    title: 'TrainCrewHub / Forgot Password'
  },
  '/reset-password': {
    render: renderResetPasswordPage,
    title: 'TrainCrewHub / Reset Password'
  },
  '/pending-access': {
    render: renderPendingAccessPage,
    title: 'TrainCrewHub / Чака одобрение'
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
  '/documents': {
    render: renderDocumentsPage,
    title: 'TrainCrewHub / Документи',
    resource: 'documents'
  },
  '/user-profiles': {
    render: renderUserProfilesPage,
    title: 'TrainCrewHub / Потребителски профили'
  },
  '/admin': {
    render: renderAdminPage,
    title: 'TrainCrewHub / Админ Панел',
    requiresAdmin: true
  }
};

const contentRootId = 'page-content';

function getRouteConfig(pathname) {
  return routes[pathname] ?? routes['/'];
}

async function resolveAccessPath(pathname, config) {
  const publicPaths = new Set(['/login', '/register', '/forgot-password', '/reset-password']);
  let session = null;

  if (!publicPaths.has(pathname)) {
    const activeSessionCheck = await ensureActiveUserSession();
    if (!activeSessionCheck.allowed) {
      if (activeSessionCheck.reason === 'inactive-profile') {
        showToast('Профилът е деактивиран. Свържи се с администратор.', 'warning');
      }
      return '/login';
    }

    session = await getCurrentUserSession();
    if (!session?.user?.id) {
      return '/login';
    }

    const hasAssignedRole = await hasUserAssignedRole(session.user.id);
    if (!hasAssignedRole) {
      if (pathname === '/pending-access') {
        return pathname;
      }

      showToast('Акаунтът ти чака одобрение от администратор.', 'warning');
      return '/pending-access';
    }
  }

  if (pathname === '/pending-access') {
    if (!session?.user?.id) {
      const activeSessionCheck = await ensureActiveUserSession();
      if (!activeSessionCheck.allowed) {
        if (activeSessionCheck.reason === 'inactive-profile') {
          showToast('Профилът е деактивиран. Свържи се с администратор.', 'warning');
        }
        return '/login';
      }

      session = await getCurrentUserSession();
    }

    if (!session?.user?.id) {
      return '/login';
    }

    const hasAssignedRole = await hasUserAssignedRole(session.user.id);
    if (hasAssignedRole) {
      return '/';
    }

    return pathname;
  }

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
    return '/';
  }

  session = session || (await getCurrentUserSession());
  if (!session?.user?.id) {
    return '/login';
  }

  const canAccessAdmin = await isUserAdmin(session.user.id);
  if (canAccessAdmin) {
    return pathname;
  }

  showToast('Нямаш права за достъп до админ панела.', 'warning');
  return '/';
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
    await applyResourceActionGuards(contentRoot, config.resource);
  }
  await applyActionPermissionGuards(contentRoot);
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
