import { loadHtml } from '../../../utils/loadHtml.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';

export async function renderRegisterPage(container) {
  const pageHtml = await loadHtml('../register.html', import.meta.url);
  container.innerHTML = pageHtml;
  attachRegisterFormListener(container);
}

function attachRegisterFormListener(container) {
  const form = container.querySelector('#register-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.querySelector('input[name="email"]').value.trim();
    const password = form.querySelector('input[name="password"]').value;
    const confirmPassword = form.querySelector('input[name="confirm-password"]').value;

    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'warning');
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonHtml = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading...';

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonHtml;
      showToast(error.message, 'error');
      return;
    }

    const userId = data.user?.id;
    if (userId) {
      const defaultUsername = email.split('@')[0];
      const { error: profileError } = await supabase.from('user_profiles').upsert(
        {
          id: userId,
          username: defaultUsername,
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
        showToast('Registration successful, but automatic login is not available until email confirmation is completed.', 'warning');
        window.history.pushState({}, '', '/login');
        window.dispatchEvent(new PopStateEvent('popstate'));
        return;
      }
    }

    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonHtml;
    showToast('Registration successful. You are now signed in.', 'success');
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
}
