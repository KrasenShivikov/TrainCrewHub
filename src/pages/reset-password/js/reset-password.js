import pageHtml from '../reset-password.html?raw';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';

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

      const isConfirmField = targetId.includes('confirm');
      const showLabel = isConfirmField ? 'Покажи потвърждението на новата парола' : 'Покажи новата парола';
      const hideLabel = isConfirmField ? 'Скрий потвърждението на новата парола' : 'Скрий новата парола';
      button.setAttribute('aria-label', shouldShow ? hideLabel : showLabel);
    });
  });
}

function getRecoveryTokensFromHash() {
  const hash = String(window.location.hash || '').replace(/^#/, '');
  const params = new URLSearchParams(hash);
  return {
    accessToken: params.get('access_token') || '',
    refreshToken: params.get('refresh_token') || '',
    type: params.get('type') || ''
  };
}

async function establishRecoverySession() {
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get('code') || '';

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return true;
    }
  }

  const tokens = getRecoveryTokensFromHash();
  if (tokens.type !== 'recovery' || !tokens.accessToken || !tokens.refreshToken) {
    return false;
  }

  const { error } = await supabase.auth.setSession({
    access_token: tokens.accessToken,
    refresh_token: tokens.refreshToken
  });

  if (error) {
    return false;
  }

  window.history.replaceState({}, '', '/reset-password');
  return true;
}

export async function renderResetPasswordPage(container) {
  container.innerHTML = pageHtml;
  setupPasswordToggles(container);

  const info = container.querySelector('#reset-password-info');
  const submitButton = container.querySelector('#reset-password-submit');
  const form = container.querySelector('#reset-password-form');

  const { data: sessionData } = await supabase.auth.getSession();
  let hasSession = Boolean(sessionData?.session?.user?.id);

  if (!hasSession) {
    hasSession = await establishRecoverySession();
  }

  if (!hasSession) {
    if (info) {
      info.textContent = 'Линкът е невалиден или е изтекъл. Заяви нов линк за възстановяване.';
      info.className = 'text-warning small mb-4 text-center';
    }

    if (submitButton) {
      submitButton.disabled = true;
    }

    return;
  }

  if (info) {
    info.textContent = 'Въведи нова парола за профила си.';
  }

  if (submitButton) {
    submitButton.disabled = false;
  }

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const password = (container.querySelector('#reset-password')?.value || '').trim();
    const confirmPassword = (container.querySelector('#reset-password-confirm')?.value || '').trim();

    if (!password || !confirmPassword) {
      showToast('Попълни и двете полета за парола.', 'warning');
      return;
    }

    if (password.length < 6) {
      showToast('Паролата трябва да е поне 6 символа.', 'warning');
      return;
    }

    const cyrillicPattern = /[\u0400-\u04FF]/;
    if (cyrillicPattern.test(password) || cyrillicPattern.test(confirmPassword)) {
      showToast('Паролата не трябва да съдържа кирилица.', 'warning');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Паролите не съвпадат.', 'warning');
      return;
    }

    const originalButtonHtml = submitButton?.innerHTML || 'Запази нова парола';
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonHtml;
    }

    if (error) {
      showToast(error.message || 'Неуспешна смяна на паролата.', 'error');
      return;
    }

    showToast('Паролата е сменена успешно.', 'success');
    window.history.pushState({}, '', '/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
}
