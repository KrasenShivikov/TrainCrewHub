import { loadHtml } from '../../utils/loadHtml.js';
import { supabase } from '../../services/supabaseClient.js';
import { showToast } from '../toast/toast.js';

let authSubscription;

export async function renderHeader(container) {
  const headerHtml = await loadHtml('./header.html', import.meta.url);
  container.innerHTML = headerHtml;

  const signInNavItem = container.querySelector('#nav-sign-in');
  const registerNavItem = container.querySelector('#nav-register');
  const logoutNavItem = container.querySelector('#nav-logout');
  const logoutButton = logoutNavItem?.querySelector('button');

  const updateAuthNav = async () => {
    const { data } = await supabase.auth.getSession();
    const isAuthenticated = Boolean(data.session);

    signInNavItem?.classList.toggle('d-none', isAuthenticated);
    registerNavItem?.classList.toggle('d-none', isAuthenticated);
    logoutNavItem?.classList.toggle('d-none', !isAuthenticated);
  };

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

  const { data: listenerData } = supabase.auth.onAuthStateChange(() => {
    updateAuthNav();
  });
  authSubscription = listenerData.subscription;

  await updateAuthNav();
}
