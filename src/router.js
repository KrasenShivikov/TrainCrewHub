import { renderIndexPage } from './pages/index/js/index.js';
import { renderDashboardPage } from './pages/dashboard/js/dashboard.js';
import { renderLoginPage } from './pages/login/js/login.js';
import { renderRegisterPage } from './pages/register/js/register.js';
import { renderScheduleKeysPage } from './pages/schedule-keys/js/schedule-keys.js';
import { renderDutiesPage } from './pages/duties/js/duties.js';
import { renderEmployeesPage } from './pages/employees/js/employees.js';
import { renderPlannedDutiesPage } from './pages/planned-duties/js/planned-duties.js';
import { renderActualDutiesPage } from './pages/actual-duties/js/actual-duties.js';
import { renderPlanSchedulePage } from './pages/plan-schedule/js/plan-schedule.js';
import { renderDutyTypesPage } from './pages/duty-types/js/duty-types.js';
import { renderScheduleKeyDutiesPage } from './pages/schedule-key-duties/js/schedule-key-duties.js';

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
    title: 'TrainCrewHub / Ключ-График'
  },
  '/duties': {
    render: renderDutiesPage,
    title: 'TrainCrewHub / Повески'
  },
  '/duty-types': {
    render: renderDutyTypesPage,
    title: 'TrainCrewHub / Типове повески'
  },
  '/employees': {
    render: renderEmployeesPage,
    title: 'TrainCrewHub / Служители'
  },
  '/planned-duties': {
    render: renderPlannedDutiesPage,
    title: 'TrainCrewHub / Планирани повески'
  },
  '/actual-duties': {
    render: renderActualDutiesPage,
    title: 'TrainCrewHub / Реални повески'
  },
  '/plan-schedule': {
    render: renderPlanSchedulePage,
    title: 'TrainCrewHub / План График'
  },
  '/schedule-key-duties': {
    render: renderScheduleKeyDutiesPage,
    title: 'TrainCrewHub / Повески към Ключ-График'
  }
};

const contentRootId = 'page-content';

function getRouteConfig(pathname) {
  return routes[pathname] ?? routes['/'];
}

async function renderCurrentRoute() {
  const contentRoot = document.getElementById(contentRootId);
  const config = getRouteConfig(window.location.pathname);
  
  document.title = config.title;
  await config.render(contentRoot);
  window.dispatchEvent(new CustomEvent('route:changed', { detail: { pathname: window.location.pathname } }));
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
  window.addEventListener('popstate', renderCurrentRoute);
  document.addEventListener('click', handleLinkClick);
  renderCurrentRoute();
}
