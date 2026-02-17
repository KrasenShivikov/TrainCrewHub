import headerHtml from './header.html?raw';
import { supabase } from '../../services/supabaseClient.js';
import { showToast } from '../toast/toast.js';
import { hasUserAssignedRole, isUserAdmin } from '../../utils/auth.js';
import { canViewResourceScreen, resetPermissionCache } from '../../utils/permissions.js';

let authSubscription;
let routeChangedHandler;
let documentClickHandler;
let documentKeydownHandler;

export async function renderHeader(container) {
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

  const bootstrapApi = globalThis.bootstrap;
  const hasBootstrapCollapse = Boolean(bootstrapApi?.Collapse);
  const hasBootstrapDropdown = Boolean(bootstrapApi?.Dropdown);

  const closeNavbarCollapse = () => {
    if (!navbarCollapse) {
      return;
    }

    if (hasBootstrapCollapse) {
      const instance = bootstrapApi.Collapse.getOrCreateInstance(navbarCollapse, { toggle: false });
      instance.hide();
      return;
    }

    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
      navbarToggler?.setAttribute('aria-expanded', 'false');
    }
  };

  const closeAllDropdowns = () => {
    if (hasBootstrapDropdown) {
      container.querySelectorAll('.dropdown-toggle').forEach((toggle) => {
        try {
          bootstrapApi.Dropdown.getOrCreateInstance(toggle).hide();
        } catch {
          // ignore
        }
      });

      return;
    }

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
    const userId = session?.user?.id || '';
    const hasAssignedRole = userId ? await hasUserAssignedRole(userId) : false;
    const noRoleAccess = isAuthenticated && !hasAssignedRole;

    navRoot?.classList.toggle('d-none', !isAuthenticated);

    signInNavItem?.classList.toggle('d-none', isAuthenticated);
    registerNavItem?.classList.toggle('d-none', isAuthenticated);
    logoutNavItem?.classList.toggle('d-none', !isAuthenticated);

    if (noRoleAccess) {
      container.querySelectorAll('#mainNav .navbar-nav > li').forEach((item) => {
        item.classList.add('d-none');
      });
      logoutNavItem?.classList.remove('d-none');
      adminNavItem?.classList.add('d-none');
      myProfileNavItem?.classList.add('d-none');
      return;
    }

    let isAdmin = false;
    if (userId) {
      isAdmin = await isUserAdmin(userId);
    }

    adminNavItem?.classList.toggle('d-none', !isAdmin);
    myProfileNavItem?.classList.toggle('d-none', !isAdmin);

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

      if (hasBootstrapDropdown) {
        const dropdown = dropdownToggle.closest('.nav-item.dropdown');
        const isOpen = dropdown?.classList.contains('show');
        closeAllDropdowns();

        const instance = bootstrapApi.Dropdown.getOrCreateInstance(dropdownToggle);
        if (isOpen) {
          instance.hide();
        } else {
          instance.show();
        }

        return;
      }

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

    const togglerButton = event.target.closest('.navbar-toggler');
    if (togglerButton && container.contains(togglerButton)) {
      event.preventDefault();
      closeAllDropdowns();

      if (navbarCollapse) {
        if (hasBootstrapCollapse) {
          const instance = bootstrapApi.Collapse.getOrCreateInstance(navbarCollapse, { toggle: false });
          instance.toggle();
        } else {
          const shouldOpen = !navbarCollapse.classList.contains('show');
          navbarCollapse.classList.toggle('show', shouldOpen);
          navbarToggler?.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
        }
      }

      return;
    }

    const navLink = event.target.closest('a[data-link]');
    if (!navLink) {
      return;
    }

    closeAllDropdowns();

    closeNavbarCollapse();
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
      closeNavbarCollapse();
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
