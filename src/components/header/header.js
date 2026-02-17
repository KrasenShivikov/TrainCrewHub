import { loadHtml } from '../../utils/loadHtml.js';
import { supabase } from '../../services/supabaseClient.js';
import { showToast } from '../toast/toast.js';
import { isUserAdmin } from '../../utils/auth.js';
import { canViewResourceScreen, resetPermissionCache } from '../../utils/permissions.js';

let authSubscription;
let routeChangedHandler;
let documentClickHandler;
let documentKeydownHandler;

export async function renderHeader(container) {
  const headerHtml = await loadHtml('./header.html', import.meta.url);
  container.innerHTML = headerHtml;
  const navRoot = container.querySelector('nav.navbar');

  const signInNavItem = container.querySelector('#nav-sign-in');
  const registerNavItem = container.querySelector('#nav-register');
  const myProfileNavItem = container.querySelector('#nav-my-profile');
  const logoutNavItem = container.querySelector('#nav-logout');
  const adminNavItem = container.querySelector('#nav-admin');
  const logoutButton = logoutNavItem?.querySelector('button');
  const navbarCollapse = container.querySelector('#mainNav');
  const navbarToggler = container.querySelector('.navbar-toggler');

  const closeAllDropdowns = () => {
    container.querySelectorAll('.nav-item.dropdown').forEach((dropdown) => {
      dropdown.classList.remove('show');
      dropdown.querySelector('.dropdown-menu')?.classList.remove('show');

      const toggle = dropdown.querySelector('.dropdown-toggle');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  };

  const updateActiveNav = () => {
    const currentPath = window.location.pathname;
    const navLinks = container.querySelectorAll('a[data-link]');

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const isActive = href === currentPath;
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });

    const dropdowns = container.querySelectorAll('.nav-item.dropdown');
    dropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const hasActiveChild = Boolean(dropdown.querySelector('.dropdown-item.active'));
      toggle?.classList.toggle('active', hasActiveChild);
      if (toggle) {
        toggle.setAttribute('aria-current', hasActiveChild ? 'page' : 'false');
      }
    });
  };

  const updateAuthNav = async () => {
    const { data } = await supabase.auth.getSession();
    const session = data.session;
    const isAuthenticated = Boolean(session);

    navRoot?.classList.toggle('d-none', !isAuthenticated);

    signInNavItem?.classList.toggle('d-none', isAuthenticated);
    registerNavItem?.classList.toggle('d-none', isAuthenticated);
    myProfileNavItem?.classList.toggle('d-none', !isAuthenticated);
    logoutNavItem?.classList.toggle('d-none', !isAuthenticated);

    let isAdmin = false;
    if (session?.user?.id) {
      isAdmin = await isUserAdmin(session.user.id);
    }

    adminNavItem?.classList.toggle('d-none', !isAdmin);

    const resourceByPath = {
      '/schedule-keys': 'schedule_keys',
      '/duties': 'duties',
      '/duty-types': 'duty_types',
      '/trains': 'trains',
      '/employees': 'employees',
      '/employee-absences': 'employee_absences',
      '/planned-duties': 'planned_duties',
      '/actual-duties': 'actual_duties',
      '/documents': 'documents',
      '/user-profiles': 'user_profiles',
      '/plan-schedule': 'page_plan_schedule',
      '/schedule': 'page_schedule',
      '/schedule-key-duties': 'duties'
    };

    await Promise.all(
      Object.entries(resourceByPath).map(async ([href, resource]) => {
        const link = container.querySelector(`a[data-link][href="${href}"]`);
        const navItem = link?.closest('li');
        if (!link || !navItem) {
          return;
        }

        if (!isAuthenticated) {
          navItem.classList.add('d-none');
          return;
        }

        const canView = await canViewResourceScreen(resource);
        navItem.classList.toggle('d-none', !canView);
      })
    );
  };

  container.addEventListener('click', (event) => {
    const dropdownToggle = event.target.closest('.dropdown-toggle');
    if (dropdownToggle && container.contains(dropdownToggle)) {
      event.preventDefault();

      const dropdown = dropdownToggle.closest('.nav-item.dropdown');
      const menu = dropdown?.querySelector('.dropdown-menu');
      const isOpen = dropdown?.classList.contains('show');

      closeAllDropdowns();

      if (!isOpen && dropdown && menu) {
        dropdown.classList.add('show');
        menu.classList.add('show');
        dropdownToggle.setAttribute('aria-expanded', 'true');
      }

      return;
    }

    const navLink = event.target.closest('a[data-link]');
    if (!navLink) {
      return;
    }

    closeAllDropdowns();

    if (navbarCollapse?.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
      navbarToggler?.setAttribute('aria-expanded', 'false');
    }
  });

  logoutButton?.addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showToast(error.message, 'error');
      return;
    }

    showToast('Logged out successfully.', 'success');

    window.history.pushState({}, '', '/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });

  if (authSubscription) {
    authSubscription.unsubscribe();
  }

  if (routeChangedHandler) {
    window.removeEventListener('route:changed', routeChangedHandler);
  }

  if (documentClickHandler) {
    document.removeEventListener('click', documentClickHandler);
  }

  if (documentKeydownHandler) {
    document.removeEventListener('keydown', documentKeydownHandler);
  }

  routeChangedHandler = updateActiveNav;
  window.addEventListener('route:changed', routeChangedHandler);

  documentClickHandler = (event) => {
    if (!container.contains(event.target)) {
      closeAllDropdowns();
    }
  };
  document.addEventListener('click', documentClickHandler);

  documentKeydownHandler = (event) => {
    if (event.key === 'Escape') {
      closeAllDropdowns();
    }
  };
  document.addEventListener('keydown', documentKeydownHandler);

  const { data: listenerData } = supabase.auth.onAuthStateChange(() => {
    resetPermissionCache();
    updateAuthNav();
  });
  authSubscription = listenerData.subscription;

  await updateAuthNav();
  updateActiveNav();
}
