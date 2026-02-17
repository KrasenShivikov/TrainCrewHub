import { loadHtml } from '../../../utils/loadHtml.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { getCurrentUserSession, isCurrentUserAdmin } from '../../../utils/auth.js';
import { closeModal, getEmployeeDisplayName, openModal, setupModalEscapeHandler } from './helpers.js';
import { userProfilesState } from './state.js';
import { renderUserProfilesTable, syncEmployeeOptions } from './table.js';

export async function renderUserProfilesPage(container) {
  const pageHtml = await loadHtml('../user-profiles.html', import.meta.url);
  container.innerHTML = pageHtml;

  setupPasswordToggles(container);
  attachUserProfilesHandlers(container);
  await loadUserProfilesData(container);
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
      button.textContent = shouldShow ? '🙈' : '👁';

      const isConfirmField = targetId.includes('confirm');
      const showLabel = isConfirmField ? 'Покажи потвърждението на новата парола' : 'Покажи новата парола';
      const hideLabel = isConfirmField ? 'Скрий потвърждението на новата парола' : 'Скрий новата парола';
      button.setAttribute('aria-label', shouldShow ? hideLabel : showLabel);
    });
  });
}

function attachUserProfilesHandlers(container) {
  const searchInput = container.querySelector('#user-profiles-search');
  const tableBody = container.querySelector('#user-profiles-table-body');
  const viewModal = container.querySelector('#user-profile-view-modal');
  const editModal = container.querySelector('#user-profile-edit-modal');

  searchInput?.addEventListener('input', (event) => {
    userProfilesState.searchQuery = String(event.target?.value || '').trim().toLowerCase();
    renderUserProfilesTable(container);
  });

  tableBody?.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button[data-user-profile-action]');
    if (!actionButton) {
      return;
    }

    const action = actionButton.getAttribute('data-user-profile-action');
    const profileId = actionButton.getAttribute('data-id') || '';

    if (action === 'view') {
      openViewModal(container, profileId);
      return;
    }

    if (action === 'edit') {
      openEditModal(container, profileId);
    }
  });

  container.querySelector('#user-profile-view-close')?.addEventListener('click', () => closeModal(viewModal));
  container.querySelector('#user-profile-view-close-secondary')?.addEventListener('click', () => closeModal(viewModal));
  container.querySelector('#user-profile-edit-close')?.addEventListener('click', () => closeModal(editModal));
  container.querySelector('#user-profile-edit-cancel')?.addEventListener('click', () => closeModal(editModal));

  container.querySelector('#user-profile-edit-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveUserProfile(container);
  });

  setupModalEscapeHandler('user-profiles', [editModal, viewModal]);
}

async function loadUserProfilesData(container) {
  const session = await getCurrentUserSession();
  const userId = session?.user?.id || '';

  userProfilesState.currentUserId = userId;
  userProfilesState.isAdmin = await isCurrentUserAdmin();

  const searchInput = container.querySelector('#user-profiles-search');
  if (searchInput) {
    searchInput.classList.toggle('d-none', !userProfilesState.isAdmin);
    searchInput.previousElementSibling?.classList.toggle('d-none', !userProfilesState.isAdmin);
  }

  const profileQuery = supabase
    .from('user_profiles')
    .select('id, username, email, first_name, last_name, employee_id, employees(id, first_name, last_name)')
    .order('username', { ascending: true });

  if (!userProfilesState.isAdmin && userId) {
    profileQuery.eq('id', userId);
  }

  const [{ data: profiles, error: profilesError }, { data: employees, error: employeesError }] = await Promise.all([
    profileQuery,
    userProfilesState.isAdmin
      ? supabase
        .from('employees')
        .select('id, first_name, last_name')
        .order('last_name', { ascending: true })
        .order('first_name', { ascending: true })
      : Promise.resolve({ data: [], error: null })
  ]);

  if (profilesError || employeesError) {
    showToast(profilesError?.message || employeesError?.message || 'Грешка при зареждане на профили.', 'error');
    userProfilesState.rows = [];
    userProfilesState.employees = [];
    renderUserProfilesTable(container, 'Няма данни за профили.');
    return;
  }

  userProfilesState.rows = profiles || [];
  userProfilesState.employees = employees || [];
  syncEmployeeOptions(container);
  renderUserProfilesTable(container);
}

function openViewModal(container, profileId) {
  const profile = userProfilesState.rows.find((row) => row.id === profileId);
  if (!profile) {
    showToast('Профилът не е намерен.', 'warning');
    return;
  }

  container.querySelector('#user-profile-view-username').textContent = profile.username || '-';
  container.querySelector('#user-profile-view-email').textContent = profile.email || '-';
  container.querySelector('#user-profile-view-first-name').textContent = profile.first_name || '-';
  container.querySelector('#user-profile-view-last-name').textContent = profile.last_name || '-';
  container.querySelector('#user-profile-view-employee').textContent = getEmployeeDisplayName(profile);

  openModal(container.querySelector('#user-profile-view-modal'));
}

function openEditModal(container, profileId) {
  const profile = userProfilesState.rows.find((row) => row.id === profileId);
  if (!profile) {
    showToast('Профилът не е намерен.', 'warning');
    return;
  }

  const employeeWrap = container.querySelector('#user-profile-edit-employee-wrap');
  const passwordWrap = container.querySelector('#user-profile-password-wrap');
  const newPasswordInput = container.querySelector('#user-profile-edit-new-password');
  const confirmPasswordInput = container.querySelector('#user-profile-edit-confirm-password');
  if (employeeWrap) {
    employeeWrap.classList.toggle('d-none', !userProfilesState.isAdmin);
  }

  const canChangeOwnPassword = profile.id === userProfilesState.currentUserId;
  if (passwordWrap) {
    passwordWrap.classList.toggle('d-none', !canChangeOwnPassword);
  }

  if (newPasswordInput) {
    newPasswordInput.value = '';
  }

  if (confirmPasswordInput) {
    confirmPasswordInput.value = '';
  }

  container.querySelector('#user-profile-edit-id').value = profile.id;
  container.querySelector('#user-profile-edit-username').value = profile.username || '';
  container.querySelector('#user-profile-edit-email').value = profile.email || '';
  container.querySelector('#user-profile-edit-first-name').value = profile.first_name || '';
  container.querySelector('#user-profile-edit-last-name').value = profile.last_name || '';
  container.querySelector('#user-profile-edit-employee-id').value = profile.employee_id || '';

  openModal(container.querySelector('#user-profile-edit-modal'));
}

async function saveUserProfile(container) {
  const id = (container.querySelector('#user-profile-edit-id')?.value || '').trim();
  const username = (container.querySelector('#user-profile-edit-username')?.value || '').trim();
  const email = (container.querySelector('#user-profile-edit-email')?.value || '').trim();
  const firstName = (container.querySelector('#user-profile-edit-first-name')?.value || '').trim();
  const lastName = (container.querySelector('#user-profile-edit-last-name')?.value || '').trim();
  const newPassword = container.querySelector('#user-profile-edit-new-password')?.value || '';
  const confirmPassword = container.querySelector('#user-profile-edit-confirm-password')?.value || '';
  const employeeId = container.querySelector('#user-profile-edit-employee-id')?.value || null;
  const saveButton = container.querySelector('#user-profile-edit-save');
  const canChangeOwnPassword = id === userProfilesState.currentUserId;

  if (!id || !username || !email || !firstName || !lastName) {
    showToast('Попълни всички задължителни полета.', 'warning');
    return;
  }

  const usernamePattern = /^[A-Za-z0-9_]{3,30}$/;
  if (!usernamePattern.test(username)) {
    showToast('Потребителското име трябва да е 3-30 символа и да съдържа само латински букви, цифри и _.', 'warning');
    return;
  }

  if ((newPassword || confirmPassword) && !canChangeOwnPassword) {
    showToast('Можеш да сменяш паролата само на собствения си профил.', 'warning');
    return;
  }

  if (canChangeOwnPassword && (newPassword || confirmPassword)) {
    if (newPassword.length < 6) {
      showToast('Новата парола трябва да е поне 6 символа.', 'warning');
      return;
    }

    const cyrillicPattern = /[\u0400-\u04FF]/;
    if (cyrillicPattern.test(newPassword) || cyrillicPattern.test(confirmPassword)) {
      showToast('Паролата не трябва да съдържа кирилица.', 'warning');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('Новата парола и потвърждението не съвпадат.', 'warning');
      return;
    }
  }

  const originalText = saveButton?.innerHTML || '';
  if (saveButton) {
    saveButton.disabled = true;
    saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';
  }

  const payload = {
    username,
    email,
    first_name: firstName,
    last_name: lastName,
    updated_at: new Date().toISOString()
  };

  if (userProfilesState.isAdmin) {
    payload.employee_id = employeeId || null;
  }

  const { error } = await supabase
    .from('user_profiles')
    .update(payload)
    .eq('id', id);

  if (saveButton) {
    saveButton.disabled = false;
    saveButton.innerHTML = originalText;
  }

  if (error) {
    if (error.code === '23505') {
      showToast('Потребителско име или имейл вече съществува.', 'warning');
      return;
    }

    showToast(error.message, 'error');
    return;
  }

  if (canChangeOwnPassword && newPassword) {
    const { error: passwordError } = await supabase.auth.updateUser({ password: newPassword });
    if (passwordError) {
      showToast(passwordError.message || 'Профилът е обновен, но паролата не беше сменена.', 'warning');
      await loadUserProfilesData(container);
      closeModal(container.querySelector('#user-profile-edit-modal'));
      return;
    }
  }

  closeModal(container.querySelector('#user-profile-edit-modal'));
  await loadUserProfilesData(container);
  showToast(canChangeOwnPassword && newPassword ? 'Профилът и паролата са обновени.' : 'Профилът е обновен.', 'success');
}
