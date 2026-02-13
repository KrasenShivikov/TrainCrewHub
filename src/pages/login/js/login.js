import { loadHtml } from '../../../utils/loadHtml.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';

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

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonHtml;

    if (error) {
      showToast(error.message, 'error');
      return;
    }

    showToast('Login successful.', 'success');

    window.history.pushState({}, '', '/dashboard');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
}
