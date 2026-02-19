import pageHtml from '../login.html?raw';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { isUserProfileActive } from '../../../utils/auth.js';

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
  container.innerHTML = pageHtml;
  setupPasswordToggles(container);
  attachLoginFormListener(container);
}

function setupPasswordToggles(container) {
  container.querySelectorAll('button[data-toggle-password]').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-toggle-password') || '';
      const input = container.querySelector(`#${targetId}`);
      if (!input) {
        return;
      }

      const shouldShow = input.type === 'password';
      input.type = shouldShow ? 'text' : 'password';
      button.innerHTML = shouldShow ? '<i class="bi bi-eye-slash"></i>' : '<i class="bi bi-eye"></i>';
      button.setAttribute('aria-label', shouldShow ? 'Скрий паролата' : 'Покажи паролата');
    });
  });
}

function attachLoginFormListener(container) {
  const form = container.querySelector('#login-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const identifier = form.querySelector('input[name="identifier"]').value.trim();
    const password = form.querySelector('input[name="password"]').value;

    if (!identifier || !password) {
      showToast('Попълни имейл/потребителско име и парола.', 'warning');
      return;
    }

    let email = identifier;
    if (!identifier.includes('@')) {
      const { data: resolvedEmail } = await supabase.rpc('resolve_login_email', {
        input_username: identifier
      });

      if (resolvedEmail) {
        email = String(resolvedEmail).trim();
      }
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonHtml = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Влизане...';

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonHtml;

    if (error) {
      showToast('Невалидни данни за вход.', 'error');
      return;
    }

    const signedInUserId = data?.user?.id || data?.session?.user?.id || '';
    if (signedInUserId) {
      const profileIsActive = await isUserProfileActive(signedInUserId);
      if (!profileIsActive) {
        await supabase.auth.signOut();
        showToast('Профилът е деактивиран. Свържи се с администратор.', 'warning');
        return;
      }
    }

    showToast('Успешен вход.', 'success');

    const hasSession = Boolean(data?.session?.user?.id) || await waitForActiveSession();
    if (!hasSession) {
      showToast('Влизането е успешно, но сесията не е активирана. Опитай отново.', 'warning');
      return;
    }

    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
}
