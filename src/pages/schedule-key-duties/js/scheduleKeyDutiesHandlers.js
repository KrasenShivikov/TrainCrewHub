import { showToast } from '../../../components/toast/toast.js';
import { closeModal, openModal, setupModalEscapeHandler, escapeHtml } from './helpers.js';
import { scheduleKeyDutiesState } from './state.js';
import { loadDutiesForScheduleKey, persistScheduleKeyDutiesOrder, renderScheduleKeyDutiesTable } from './table.js';
import { renderAttachDutyList } from './scheduleKeyDutiesAttachUi.js';
import {
  attachExistingDutyToScheduleKey,
  confirmDeleteDutyForScheduleKey,
  loadAttachDutyCatalog,
  openDeleteDutyModal,
  saveDutyForScheduleKey,
  saveEditedDutyForScheduleKey
} from './scheduleKeyDutiesData.js';
import { openDutyProfileModal, openEditDutyModal, resetCreateDutyForm } from './scheduleKeyDutiesForms.js';

export function attachScheduleKeyDutiesHandlers(container) {
  const openCreateButton = container.querySelector('#open-create-schedule-key-duty');
  const openAttachButton = container.querySelector('#open-attach-schedule-key-duty');
  const createModal = container.querySelector('#schedule-key-duty-create-modal');
  const attachModal = container.querySelector('#schedule-key-duty-attach-modal');
  const createForm = container.querySelector('#schedule-key-duty-create-form');
  const createModalCloseButton = container.querySelector('#schedule-key-duty-create-modal-close');
  const attachModalCloseButton = container.querySelector('#schedule-key-duty-attach-modal-close');
  const createCancelButton = container.querySelector('#schedule-key-duty-create-cancel');
  const attachCancelButton = container.querySelector('#schedule-key-duty-attach-cancel');
  const attachSearchInput = container.querySelector('#schedule-key-duty-attach-search');
  const attachTypeSelect = container.querySelector('#schedule-key-duty-attach-type');
  const attachList = container.querySelector('#schedule-key-duty-attach-list');
  const dutiesBody = container.querySelector('#schedule-key-duties-body');
  const editModal = container.querySelector('#schedule-key-duty-edit-modal');
  const deleteModal = container.querySelector('#schedule-key-duty-delete-modal');
  const editForm = container.querySelector('#schedule-key-duty-edit-form');
  const editModalCloseButton = container.querySelector('#schedule-key-duty-edit-modal-close');
  const editCancelButton = container.querySelector('#schedule-key-duty-edit-cancel');
  const deleteCancelButton = container.querySelector('#schedule-key-duty-delete-cancel');
  const deleteConfirmButton = container.querySelector('#schedule-key-duty-delete-confirm');
  const profileModal = container.querySelector('#schedule-key-duty-profile-modal');
  const profileCloseButton = container.querySelector('#schedule-key-duty-profile-close');
  const profileCloseSecondaryButton = container.querySelector('#schedule-key-duty-profile-close-secondary');
  const profileEditButton = container.querySelector('#schedule-key-duty-profile-edit');

  openCreateButton?.addEventListener('click', () => {
    resetCreateDutyForm(container);
    openModal(createModal);
  });

  openAttachButton?.addEventListener('click', async () => {
    await loadAttachDutyCatalog(container);
    renderAttachDutyList(container);
    openModal(attachModal);
  });

  createModalCloseButton?.addEventListener('click', () => {
    closeModal(createModal);
  });

  attachModalCloseButton?.addEventListener('click', () => {
    closeModal(attachModal);
  });

  createCancelButton?.addEventListener('click', () => {
    closeModal(createModal);
  });

  attachCancelButton?.addEventListener('click', () => {
    closeModal(attachModal);
  });

  createForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveDutyForScheduleKey(container, { resetCreateDutyForm });
  });

  attachSearchInput?.addEventListener('input', () => {
    renderAttachDutyList(container);
  });

  attachTypeSelect?.addEventListener('change', () => {
    renderAttachDutyList(container);
  });

  attachList?.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-attach-duty-id]');
    if (!button) {
      return;
    }

    const dutyId = button.getAttribute('data-attach-duty-id') || '';
    if (!dutyId) {
      return;
    }

    await attachExistingDutyToScheduleKey(container, dutyId, button);
    renderAttachDutyList(container);
  });

  editForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveEditedDutyForScheduleKey(container);
  });

  editModalCloseButton?.addEventListener('click', () => {
    closeModal(editModal);
  });

  editCancelButton?.addEventListener('click', () => {
    closeModal(editModal);
  });

  deleteCancelButton?.addEventListener('click', () => {
    closeModal(deleteModal);
  });

  deleteConfirmButton?.addEventListener('click', async () => {
    const dutyId = container.querySelector('#schedule-key-duty-delete-id').value;
    await confirmDeleteDutyForScheduleKey(container, dutyId);
  });

  profileCloseButton?.addEventListener('click', () => {
    closeModal(profileModal);
  });

  profileCloseSecondaryButton?.addEventListener('click', () => {
    closeModal(profileModal);
  });

  profileEditButton?.addEventListener('click', () => {
    const dutyId = profileModal?.dataset?.dutyId || '';
    if (!dutyId) {
      return;
    }

    closeModal(profileModal);
    openEditDutyModal(container, dutyId);
  });

  setupModalEscapeHandler('schedule-key-duties', [
    profileModal,
    deleteModal,
    editModal,
    attachModal,
    createModal
  ]);

  dutiesBody?.addEventListener('dragstart', (event) => {
    if (!scheduleKeyDutiesState.reorderEnabled) {
      return;
    }

    const row = event.target.closest('tr[data-duty-id]');
    if (!row) {
      return;
    }

    scheduleKeyDutiesState.draggedDutyId = row.getAttribute('data-duty-id');
    row.classList.add('table-active');
  });

  dutiesBody?.addEventListener('dragend', (event) => {
    if (!scheduleKeyDutiesState.reorderEnabled) {
      return;
    }

    const row = event.target.closest('tr[data-duty-id]');
    if (row) {
      row.classList.remove('table-active');
    }
    scheduleKeyDutiesState.draggedDutyId = null;
  });

  dutiesBody?.addEventListener('dragover', (event) => {
    if (!scheduleKeyDutiesState.reorderEnabled) {
      return;
    }

    event.preventDefault();
  });

  dutiesBody?.addEventListener('drop', async (event) => {
    if (!scheduleKeyDutiesState.reorderEnabled) {
      return;
    }

    event.preventDefault();

    const targetRow = event.target.closest('tr[data-duty-id]');
    const draggedId = scheduleKeyDutiesState.draggedDutyId;
    if (!targetRow || !draggedId) {
      return;
    }

    const targetId = targetRow.getAttribute('data-duty-id');
    if (!targetId || targetId === draggedId) {
      return;
    }

    const fromIndex = scheduleKeyDutiesState.duties.findIndex((item) => item.id === draggedId);
    const toIndex = scheduleKeyDutiesState.duties.findIndex((item) => item.id === targetId);
    if (fromIndex < 0 || toIndex < 0) {
      return;
    }

    const [moved] = scheduleKeyDutiesState.duties.splice(fromIndex, 1);
    scheduleKeyDutiesState.duties.splice(toIndex, 0, moved);
    renderScheduleKeyDutiesTable(container);

    const persisted = await persistScheduleKeyDutiesOrder();
    if (!persisted) {
      await loadDutiesForScheduleKey(container);
      return;
    }

    showToast('Редът на повеските е запазен.', 'success');
  });

  dutiesBody?.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button[data-duty-action]');
    if (!actionButton) {
      return;
    }

    const action = actionButton.getAttribute('data-duty-action');
    if (action === 'profile') {
      const dutyId = actionButton.getAttribute('data-id');
      openDutyProfileModal(container, dutyId, { escapeHtml });
      return;
    }

    if (action === 'trains') {
      const dutyId = actionButton.getAttribute('data-id');
      const dutyName = actionButton.getAttribute('data-name');
      const params = new URLSearchParams({
        dutyId,
        dutyName
      });
      window.history.pushState({}, '', `/trains-for-duties?${params.toString()}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }

    if (action === 'edit') {
      const dutyId = actionButton.getAttribute('data-id');
      openEditDutyModal(container, dutyId);
      return;
    }

    if (action === 'delete') {
      const dutyId = actionButton.getAttribute('data-id');
      openDeleteDutyModal(container, dutyId);
    }
  });
}
