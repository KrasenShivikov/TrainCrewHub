import { adminState } from './state.js';

let pendingRoleWarningAction = null;

export function openModal(modalElement) {
  if (!modalElement) {
    return;
  }

  modalElement.classList.remove('d-none');
}

export function closeModal(modalElement) {
  if (!modalElement) {
    return;
  }

  modalElement.classList.add('d-none');
}

export function openRoleModal(container, { mode, roleName = '', roleNameBg = '' }) {
  const modal = container.querySelector('#admin-role-modal');
  const title = container.querySelector('#admin-role-modal-title');
  const originalRoleNameInput = container.querySelector('#admin-role-modal-original-name');
  const roleInput = container.querySelector('#admin-role-modal-name');
  const roleBgInput = container.querySelector('#admin-role-modal-name-bg');
  const saveButton = container.querySelector('#admin-role-modal-save');

  if (originalRoleNameInput) {
    originalRoleNameInput.value = mode === 'edit' ? roleName : '';
  }
  if (roleInput) {
    roleInput.value = mode === 'edit' ? roleName : '';
  }
  if (roleBgInput) {
    roleBgInput.value = mode === 'edit' ? (roleNameBg || roleName) : '';
  }
  if (title) {
    title.textContent = mode === 'edit' ? 'Редакция на роля' : 'Нова роля';
  }
  if (saveButton) {
    saveButton.textContent = mode === 'edit' ? 'Запази' : 'Създай';
  }

  openModal(modal);
}

export function resetRoleModalForm(container) {
  const originalRoleNameInput = container.querySelector('#admin-role-modal-original-name');
  const roleInput = container.querySelector('#admin-role-modal-name');
  const roleBgInput = container.querySelector('#admin-role-modal-name-bg');
  const title = container.querySelector('#admin-role-modal-title');
  const saveButton = container.querySelector('#admin-role-modal-save');

  if (originalRoleNameInput) {
    originalRoleNameInput.value = '';
  }
  if (roleInput) {
    roleInput.value = '';
  }
  if (roleBgInput) {
    roleBgInput.value = '';
  }
  if (title) {
    title.textContent = 'Нова роля';
  }
  if (saveButton) {
    saveButton.textContent = 'Създай';
  }
}

export function openRoleWarningModal(container, { message, confirmLabel, onConfirm }) {
  const modal = container.querySelector('#admin-role-warning-modal');
  const messageElement = container.querySelector('#admin-role-warning-message');
  const confirmButton = container.querySelector('#admin-role-warning-confirm');

  pendingRoleWarningAction = typeof onConfirm === 'function' ? onConfirm : null;
  if (messageElement) {
    messageElement.textContent = message || 'Сигурен ли си?';
  }
  if (confirmButton) {
    confirmButton.textContent = confirmLabel || 'Потвърди';
  }

  openModal(modal);
}

export function bindRoleWarningModalHandlers(container) {
  const warningModal = container.querySelector('#admin-role-warning-modal');
  const warningModalCloseButton = container.querySelector('#admin-role-warning-close');
  const warningModalCancelButton = container.querySelector('#admin-role-warning-cancel');
  const warningModalConfirmButton = container.querySelector('#admin-role-warning-confirm');

  warningModalCloseButton?.addEventListener('click', () => {
    closeModal(warningModal);
    pendingRoleWarningAction = null;
  });

  warningModalCancelButton?.addEventListener('click', () => {
    closeModal(warningModal);
    pendingRoleWarningAction = null;
  });

  warningModalConfirmButton?.addEventListener('click', async () => {
    if (!pendingRoleWarningAction) {
      closeModal(warningModal);
      return;
    }

    const action = pendingRoleWarningAction;
    pendingRoleWarningAction = null;
    closeModal(warningModal);
    await action();
  });
}

export function openProfileLinkModalForProfile(container, profileId) {
  const profileLinkModal = container.querySelector('#admin-profile-link-modal');
  const profileSelect = container.querySelector('#admin-profile-link-id');
  const employeeSelect = container.querySelector('#admin-profile-link-employee-id');
  const profile = adminState.profiles.find((item) => item.id === profileId);

  if (profileSelect) {
    profileSelect.value = profileId;
  }

  if (employeeSelect) {
    employeeSelect.value = profile?.employee_id || '';
  }

  openModal(profileLinkModal);
}

export function openAssignRoleModalForUser(container, userId) {
  const assignRoleModal = container.querySelector('#admin-assign-role-modal');
  const userSelect = container.querySelector('#admin-role-profile-id');
  const roleSelect = container.querySelector('#admin-role-value');

  if (userSelect) {
    userSelect.value = userId;
  }

  if (roleSelect) {
    roleSelect.value = '';
  }

  openModal(assignRoleModal);
}
