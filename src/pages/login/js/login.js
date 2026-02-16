import { loadHtml } from '../../../utils/loadHtml.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';

async function waitForActiveSession({ attempts = 10, delayMs = 120 } = {}) {
  for (let index = 0; index < attempts; index += 1) {
    const { data } = await supabase.auth.getSession();
    if (data?.session?.user?.id) {
      return true;
    }

    await new Promise((resolve) => {
      window.setTimeout(resolve, delayMs);
    });
  }

  return false;
}

export async function renderLoginPage(container) {
  const pageHtml = await loadHtml('../login.html', import.meta.url);
  container.innerHTML = pageHtml;
  attachLoginFormListener(container);
}

function attachLoginFormListener(container) {
  const form = container.querySelector('#login-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.querySelector('input[name="email"]').value.trim();
    const password = form.querySelector('input[name="password"]').value;

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonHtml = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading...';

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonHtml;

    if (error) {
      showToast(error.message, 'error');
      return;
    }

    showToast('Login successful.', 'success');

    const hasSession = Boolean(data?.session?.user?.id) || await waitForActiveSession();
    if (!hasSession) {
      showToast('Влизането е успешно, но сесията не е активирана. Опитай отново.', 'warning');
      return;
    }

    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
}
