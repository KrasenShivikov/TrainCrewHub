import { loadHtml } from '../../../utils/loadHtml.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';

const AUTO_RECHECK_INTERVAL_MS = 30000;

let activePollIntervalId = null;
let activeRouteChangedHandler = null;

function cleanupPendingAccessAutoRecheck() {
  if (activePollIntervalId) {
    window.clearInterval(activePollIntervalId);
    activePollIntervalId = null;
  }

  if (activeRouteChangedHandler) {
    window.removeEventListener('route:changed', activeRouteChangedHandler);
    activeRouteChangedHandler = null;
  }
}

function triggerPendingAccessRecheck() {
  if (window.location.pathname !== '/pending-access') {
    return;
  }

  window.dispatchEvent(new PopStateEvent('popstate'));
}

export async function renderPendingAccessPage(container) {
  cleanupPendingAccessAutoRecheck();

  const pageHtml = await loadHtml('../pending-access.html', import.meta.url);
  container.innerHTML = pageHtml;

  const refreshButton = container.querySelector('#pending-access-refresh');
  const logoutButton = container.querySelector('#pending-access-logout');

  refreshButton?.addEventListener('click', () => {
    triggerPendingAccessRecheck();
  });

  logoutButton?.addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showToast(error.message, 'error');
      return;
    }

    showToast('Излезе успешно от системата.', 'success');
    window.history.replaceState({}, '', '/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });

  activePollIntervalId = window.setInterval(() => {
    triggerPendingAccessRecheck();
  }, AUTO_RECHECK_INTERVAL_MS);

  activeRouteChangedHandler = () => {
    if (window.location.pathname !== '/pending-access') {
      cleanupPendingAccessAutoRecheck();
    }
  };

  window.addEventListener('route:changed', activeRouteChangedHandler);
}
