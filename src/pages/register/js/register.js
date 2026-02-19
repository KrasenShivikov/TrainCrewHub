import pageHtml from '../register.html?raw';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';

export async function renderRegisterPage(container) {
  container.innerHTML = pageHtml;
  setupPasswordToggles(container);
  attachRegisterFormListener(container);
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

      const isConfirmField = targetId.includes('confirm');
      const showLabel = isConfirmField ? 'Покажи потвърждението на паролата' : 'Покажи паролата';
      const hideLabel = isConfirmField ? 'Скрий потвърждението на паролата' : 'Скрий паролата';
      button.setAttribute('aria-label', shouldShow ? hideLabel : showLabel);
    });
  });
}

function attachRegisterFormListener(container) {
  const form = container.querySelector('#register-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = form.querySelector('input[name="username"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const firstName = form.querySelector('input[name="first_name"]').value.trim();
    const lastName = form.querySelector('input[name="last_name"]').value.trim();
    const password = form.querySelector('input[name="password"]').value;
    const confirmPassword = form.querySelector('input[name="confirm-password"]').value;

    if (!username || !email || !firstName || !lastName || !password || !confirmPassword) {
      showToast('Моля, попълни всички полета.', 'warning');
      return;
    }

    const usernamePattern = /^[A-Za-z0-9_]{3,30}$/;
    if (!usernamePattern.test(username)) {
      showToast('Потребителското име трябва да е 3-30 символа и да съдържа само латински букви, цифри и _.', 'warning');
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

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonHtml = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Регистрация...';

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          first_name: firstName,
          last_name: lastName
        }
      }
    });

    if (error) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonHtml;
      showToast(error.message, 'error');
      return;
    }

    const userId = data.user?.id;
    if (userId) {
      const { error: profileError } = await supabase.from('user_profiles').upsert(
        {
          id: userId,
          username,
          email,
          first_name: firstName,
          last_name: lastName,
          created_from: email
        },
        { onConflict: 'id' }
      );

      if (profileError) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHtml;
        showToast(profileError.message, 'error');
        return;
      }
    }

    const hasSessionAfterSignUp = Boolean(data.session);

    if (!hasSessionAfterSignUp) {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHtml;
        showToast('Регистрацията е успешна, но автоматичният вход е достъпен след имейл потвърждение.', 'warning');
        window.history.pushState({}, '', '/login');
        window.dispatchEvent(new PopStateEvent('popstate'));
        return;
      }
    }

    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonHtml;
    showToast('Регистрацията е успешна. Вече си влязъл в системата.', 'success');
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
}
