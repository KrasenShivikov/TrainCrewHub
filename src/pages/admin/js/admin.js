import pageHtml from '../admin.html?raw';
import { adminState } from './state.js';
import { resetRoleModalForm } from './adminModals.js';
import { attachAdminHandlers, initializeAdminTabs } from './adminHandlers.js';
import { loadAdminData, loadPermissionsForRole } from './adminData.js';

export async function renderAdminPage(container) {
  container.innerHTML = pageHtml;
  const permissionsRoleSelect = container.querySelector('#admin-permissions-role');
  if (permissionsRoleSelect) {
    permissionsRoleSelect.value = adminState.permissionsRole;
  }

  resetRoleModalForm(container);
  initializeAdminTabs(container);

  attachAdminHandlers(container);
  await loadAdminData(container);
  await loadPermissionsForRole(container, adminState.permissionsRole);
}
