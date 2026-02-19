import { showToast } from '../../../components/toast/toast.js';
import { adminState } from './state.js';
import {
  bindRoleWarningModalHandlers,
  closeModal,
  openAssignRoleModalForUser,
  openProfileLinkModalForProfile,
  openRoleModal,
  openRoleWarningModal,
  resetRoleModalForm
} from './adminModals.js';
import {
  addUserRole,
  createRole,
  hardDeleteUser,
  loadPermissionsForRole,
  removeUserRole,
  openDeleteRoleWarning,
  saveProfileEmployeeLink,
  saveRolePermissions,
  updateProfileActiveStatus,
  updateProfileEmployeeLink
} from './adminData.js';

export function initializeAdminTabs(container) {
  const tabButtons = [...container.querySelectorAll('[data-admin-tab]')];
  const tabPanes = [...container.querySelectorAll('[data-admin-tab-pane]')];
  if (!tabButtons.length || !tabPanes.length) {
    return;
  }

  const activateTab = (tabName) => {
    tabButtons.forEach((button) => {
      const isActive = button.getAttribute('data-admin-tab') === tabName;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    tabPanes.forEach((pane) => {
      const isActive = pane.getAttribute('data-admin-tab-pane') === tabName;
      pane.classList.toggle('active', isActive);
      pane.classList.toggle('d-none', !isActive);
    });
  };

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-admin-tab') || '';
      if (!tabName) {
        return;
      }

      activateTab(tabName);
    });
  });

  const initialTabName = tabButtons.find((button) => button.classList.contains('active'))?.getAttribute('data-admin-tab')
    || tabButtons[0]?.getAttribute('data-admin-tab')
    || '';
  if (initialTabName) {
    activateTab(initialTabName);
  }
}

export function attachAdminHandlers(container) {
  const assignRoleModal = container.querySelector('#admin-assign-role-modal');
  const assignRoleModalCloseButton = container.querySelector('#admin-assign-role-modal-close');
  const assignRoleModalCancelButton = container.querySelector('#admin-assign-role-modal-cancel');
  const profileLinkModal = container.querySelector('#admin-profile-link-modal');
  const profileLinkModalCloseButton = container.querySelector('#admin-profile-link-modal-close');
  const profileLinkModalCancelButton = container.querySelector('#admin-profile-link-modal-cancel');
  const openRoleModalButton = container.querySelector('#open-admin-role-modal');
  const roleModal = container.querySelector('#admin-role-modal');
  const roleModalForm = container.querySelector('#admin-role-modal-form');
  const roleModalCloseButton = container.querySelector('#admin-role-modal-close');
  const roleModalCancelButton = container.querySelector('#admin-role-modal-cancel');
  const roleForm = container.querySelector('#admin-role-form');
  const profileLinkForm = container.querySelector('#admin-profile-link-form');
  const unlinkButton = container.querySelector('#admin-profile-link-clear');
  const permissionsForm = container.querySelector('#admin-permissions-form');
  const permissionsRoleSelect = container.querySelector('#admin-permissions-role');
  const rolesBody = container.querySelector('#admin-roles-body');
  const roleCatalogBody = container.querySelector('#admin-role-catalog-body');
  const profilesBody = container.querySelector('#admin-profiles-body');

  bindRoleWarningModalHandlers(container);

  assignRoleModalCloseButton?.addEventListener('click', () => {
    closeModal(assignRoleModal);
  });

  assignRoleModalCancelButton?.addEventListener('click', () => {
    closeModal(assignRoleModal);
  });

  profileLinkModalCloseButton?.addEventListener('click', () => {
    closeModal(profileLinkModal);
  });

  profileLinkModalCancelButton?.addEventListener('click', () => {
    closeModal(profileLinkModal);
  });

  openRoleModalButton?.addEventListener('click', () => {
    openRoleModal(container, { mode: 'create' });
  });

  roleModalForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await createRole(container);
  });

  roleModalCloseButton?.addEventListener('click', () => {
    closeModal(roleModal);
    resetRoleModalForm(container);
  });

  roleModalCancelButton?.addEventListener('click', () => {
    closeModal(roleModal);
    resetRoleModalForm(container);
  });

  roleForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await addUserRole(container);
  });

  profileLinkForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveProfileEmployeeLink(container);
  });

  unlinkButton?.addEventListener('click', async () => {
    const profileId = container.querySelector('#admin-profile-link-id')?.value || '';
    if (!profileId) {
      showToast('Избери профил за разкачане.', 'warning');
      return;
    }

    openRoleWarningModal(container, {
      message: 'Сигурен ли си, че искаш да разкачиш профила от служителя?',
      confirmLabel: 'Разкачи',
      onConfirm: () => updateProfileEmployeeLink(container, profileId, null)
    });
  });

  permissionsForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveRolePermissions(container);
  });

  permissionsRoleSelect?.addEventListener('change', async (event) => {
    const nextRole = event.target.value || 'admin';
    adminState.permissionsRole = nextRole;
    await loadPermissionsForRole(container, nextRole);
  });

  rolesBody?.addEventListener('click', async (event) => {
    const addButton = event.target.closest('button[data-admin-action="add-role"]');
    if (addButton) {
      const userId = addButton.getAttribute('data-user-id') || '';
      if (!userId) {
        return;
      }

      openAssignRoleModalForUser(container, userId);
      return;
    }

    const removeButton = event.target.closest('button[data-admin-action="remove-role"]');
    if (!removeButton) {
      return;
    }

    const roleId = removeButton.getAttribute('data-role-id') || '';
    if (!roleId) {
      return;
    }

    openRoleWarningModal(container, {
      message: 'Сигурен ли си, че искаш да разкачиш тази роля от потребителя?',
      confirmLabel: 'Разкачи',
      onConfirm: () => removeUserRole(container, roleId)
    });
  });

  roleCatalogBody?.addEventListener('click', async (event) => {
    const editButton = event.target.closest('button[data-admin-action="edit-catalog-role"]');
    if (editButton) {
      const roleName = editButton.getAttribute('data-role-name') || '';
      const roleNameBg = editButton.getAttribute('data-role-bg') || '';
      openRoleModal(container, { mode: 'edit', roleName, roleNameBg });
      return;
    }

    const deleteButton = event.target.closest('button[data-admin-action="delete-catalog-role"]');
    if (!deleteButton) {
      return;
    }

    const roleName = deleteButton.getAttribute('data-role-name') || '';
    if (!roleName) {
      return;
    }

    await openDeleteRoleWarning(container, roleName);
  });

  profilesBody?.addEventListener('click', async (event) => {
    const linkActionButton = event.target.closest('button[data-admin-action="link-profile"]');
    if (linkActionButton) {
      const profileId = linkActionButton.getAttribute('data-profile-id') || '';
      if (profileId) {
        openProfileLinkModalForProfile(container, profileId);
      }
      return;
    }

    const unlinkActionButton = event.target.closest('button[data-admin-action="unlink-profile"]');
    if (unlinkActionButton) {
      const profileId = unlinkActionButton.getAttribute('data-profile-id') || '';
      if (!profileId) {
        return;
      }

      openRoleWarningModal(container, {
        message: 'Сигурен ли си, че искаш да разкачиш профила от служителя?',
        confirmLabel: 'Разкачи',
        onConfirm: () => updateProfileEmployeeLink(container, profileId, null)
      });
      return;
    }

    const deactivateButton = event.target.closest('button[data-admin-action="deactivate-profile"]');
    if (deactivateButton) {
      const deactivateProfileId = deactivateButton.getAttribute('data-profile-id') || '';
      if (!deactivateProfileId) {
        return;
      }

      if (deactivateProfileId === adminState.currentUserId) {
        showToast('Не можеш да деактивираш собствения си профил.', 'warning');
        return;
      }

      openRoleWarningModal(container, {
        message: 'Сигурен ли си, че искаш да деактивираш този профил? Потребителят ще загуби достъп до системата.',
        confirmLabel: 'Деактивирай',
        onConfirm: () => updateProfileActiveStatus(container, deactivateProfileId, false)
      });
      return;
    }

    const restoreButton = event.target.closest('button[data-admin-action="restore-profile"]');
    if (restoreButton) {
      const restoreProfileId = restoreButton.getAttribute('data-profile-id') || '';
      if (!restoreProfileId) {
        return;
      }

      openRoleWarningModal(container, {
        message: 'Сигурен ли си, че искаш да възстановиш този профил?',
        confirmLabel: 'Възстанови',
        onConfirm: () => updateProfileActiveStatus(container, restoreProfileId, true)
      });
      return;
    }

    const hardDeleteButton = event.target.closest('button[data-admin-action="hard-delete-user"]');
    if (!hardDeleteButton) {
      return;
    }

    const hardDeleteUserId = hardDeleteButton.getAttribute('data-profile-id') || '';
    if (!hardDeleteUserId) {
      return;
    }

    if (hardDeleteUserId === adminState.currentUserId) {
      showToast('Не можеш да изтриеш собствения си акаунт.', 'warning');
      return;
    }

    openRoleWarningModal(container, {
      message: 'Сигурен ли си? Това е необратимо: ще бъдат изтрити Auth акаунтът, профилът и ролите.',
      confirmLabel: 'Изтрий',
      onConfirm: () => hardDeleteUser(container, hardDeleteUserId)
    });
  });
}
