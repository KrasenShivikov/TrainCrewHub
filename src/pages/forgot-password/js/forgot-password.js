import { loadHtml } from '../../../utils/loadHtml.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';

function getResetRedirectUrl() {
  return `${window.location.origin}/reset-password`;
}

async function resolveIdentifierToEmail(identifier) {
  if (identifier.includes('@')) {
    return identifier;
  }

  const { data } = await supabase.rpc('resolve_login_email', {
    input_username: identifier
  });

  return String(data || '').trim();
}

export async function renderForgotPasswordPage(container) {
  const pageHtml = await loadHtml('../forgot-password.html', import.meta.url);
  container.innerHTML = pageHtml;

  const form = container.querySelector('#forgot-password-form');
  if (!form) {
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const identifier = (form.querySelector('input[name="identifier"]')?.value || '').trim();
    if (!identifier) {
      showToast('Въведи имейл или потребителско име.', 'warning');
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonHtml = submitButton?.innerHTML || 'Изпрати линк';
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изпращане...';
    }

    try {
      const email = await resolveIdentifierToEmail(identifier);
      if (email) {
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: getResetRedirectUrl()
        });
      }
    } catch {
      // Intentionally no-op to avoid account enumeration hints.
    }

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonHtml;
    }

    showToast('Ако акаунтът съществува, изпратихме инструкции за смяна на паролата.', 'success');
    form.reset();
  });
}
