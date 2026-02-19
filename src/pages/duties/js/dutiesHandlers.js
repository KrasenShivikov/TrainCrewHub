import { showToast } from '../../../components/toast/toast.js';
import { closeModal, openModal, setupModalEscapeHandler } from './helpers.js';
import { dutiesState } from './state.js';
import { renderDutiesTable } from './table.js';
import { MAX_DUTY_FILE_ITEMS } from './dutiesConstants.js';
import { resetDutyForm } from './dutiesForms.js';
import {
  deleteDuty,
  removeAttachmentDraftItem,
  saveDuty,
  updateAttachmentsLabelDraft
} from './dutiesData.js';
import {
  closeDutyAttachmentPreview,
  openDutyAttachmentPreview
} from './dutiesPreview.js';
import {
  openDutyDuplicateModal,
  openDutyEditModal,
  openDutyProfileModal
} from './dutiesProfile.js';

export function attachDutiesHandlers(container) {
  const createButton = container.querySelector('#open-create-duty');
  const form = container.querySelector('#duty-form');
  const cancelButton = container.querySelector('#duty-cancel-btn');
  const tableBody = container.querySelector('#duties-table-body');
  const dutyModal = container.querySelector('#duty-modal');
  const deleteModal = container.querySelector('#duty-delete-modal');
  const profileModal = container.querySelector('#duty-profile-modal');
  const attachmentPreviewModal = container.querySelector('#duty-attachment-preview-modal');
  const modalCloseButton = container.querySelector('#duty-modal-close');
  const deleteConfirmButton = container.querySelector('#duty-delete-confirm');
  const deleteCancelButton = container.querySelector('#duty-delete-cancel');
  const profileCloseButton = container.querySelector('#duty-profile-close');
  const profileCloseSecondaryButton = container.querySelector('#duty-profile-close-secondary');
  const profileDuplicateButton = container.querySelector('#duty-profile-duplicate');
  const profileEditButton = container.querySelector('#duty-profile-edit');
  const searchInput = container.querySelector('#duties-search');
  const scheduleKeyFilterInput = container.querySelector('#duties-schedule-key-filter');
  const dutyTypeFilterInput = container.querySelector('#duties-type-filter');
  const filterResetButton = container.querySelector('#duties-filter-reset');
  const prevPageButton = container.querySelector('#duties-prev-page');
  const nextPageButton = container.querySelector('#duties-next-page');
  const attachmentFileInput = container.querySelector('#duty-attachment-file');
  const currentAttachmentsLinks = container.querySelector('#duty-current-attachments-links');

  createButton?.addEventListener('click', () => {
    resetDutyForm(container);
    openModal(dutyModal);
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveDuty(container);
  });

  cancelButton?.addEventListener('click', () => {
    closeModal(dutyModal);
  });

  modalCloseButton?.addEventListener('click', () => {
    closeModal(dutyModal);
  });

  deleteCancelButton?.addEventListener('click', () => {
    closeModal(deleteModal);
  });

  profileCloseButton?.addEventListener('click', () => {
    closeModal(profileModal);
  });

  profileCloseSecondaryButton?.addEventListener('click', () => {
    closeModal(profileModal);
  });

  container.querySelector('#duty-profile-content')?.addEventListener('click', (event) => {
    const previewButton = event.target.closest('button[data-duty-profile-action="preview-attachment"]');
    if (!previewButton) {
      return;
    }

    const previewUrl = String(previewButton.getAttribute('data-url') || '').trim();
    const previewLabel = String(previewButton.getAttribute('data-label') || '').trim();
    openDutyAttachmentPreview(container, previewUrl, previewLabel);
  });

  container.querySelector('#duty-attachment-preview-close')?.addEventListener('click', () => {
    closeDutyAttachmentPreview(container);
  });

  profileEditButton?.addEventListener('click', () => {
    const dutyId = profileModal?.dataset?.dutyId || '';
    if (!dutyId) {
      return;
    }

    closeModal(profileModal);
    openDutyEditModal(container, dutyId);
  });

  profileDuplicateButton?.addEventListener('click', () => {
    const dutyId = profileModal?.dataset?.dutyId || '';
    if (!dutyId) {
      return;
    }

    closeModal(profileModal);
    openDutyDuplicateModal(container, dutyId);
  });

  searchInput?.addEventListener('input', (event) => {
    dutiesState.searchQuery = event.target.value.trim().toLowerCase();
    dutiesState.currentPage = 1;
    renderDutiesTable(container);
  });

  dutyTypeFilterInput?.addEventListener('change', (event) => {
    dutiesState.dutyTypeFilter = event.target.value || '';
    dutiesState.currentPage = 1;
    renderDutiesTable(container);
  });

  scheduleKeyFilterInput?.addEventListener('change', (event) => {
    dutiesState.scheduleKeyFilter = event.target.value || '';
    dutiesState.currentPage = 1;
    renderDutiesTable(container);
  });

  filterResetButton?.addEventListener('click', () => {
    dutiesState.searchQuery = '';
    dutiesState.scheduleKeyFilter = '';
    dutiesState.dutyTypeFilter = '';
    dutiesState.currentPage = 1;

    if (searchInput) searchInput.value = '';
    if (scheduleKeyFilterInput) scheduleKeyFilterInput.value = '';
    if (dutyTypeFilterInput) dutyTypeFilterInput.value = '';

    renderDutiesTable(container);
  });

  prevPageButton?.addEventListener('click', () => {
    dutiesState.currentPage -= 1;
    renderDutiesTable(container);
  });

  nextPageButton?.addEventListener('click', () => {
    dutiesState.currentPage += 1;
    renderDutiesTable(container);
  });

  attachmentFileInput?.addEventListener('change', () => {
    if (!attachmentFileInput.files?.length) {
      return;
    }

    if (attachmentFileInput.files.length > MAX_DUTY_FILE_ITEMS) {
      showToast(`Може да избереш до ${MAX_DUTY_FILE_ITEMS} файла наведнъж.`, 'warning');
      attachmentFileInput.value = '';
    }
  });

  currentAttachmentsLinks?.addEventListener('input', (event) => {
    const input = event.target.closest('.duty-existing-attachment-label');
    if (!input) {
      return;
    }

    const index = Number(input.getAttribute('data-index'));
    if (!Number.isInteger(index) || index < 0) {
      return;
    }

    updateAttachmentsLabelDraft(container, index, input.value);
  });

  currentAttachmentsLinks?.addEventListener('click', (event) => {
    const previewButton = event.target.closest('.duty-existing-attachment-preview');
    if (previewButton) {
      const previewUrl = String(previewButton.getAttribute('data-url') || '').trim();
      const previewLabel = String(previewButton.getAttribute('data-label') || '').trim();
      openDutyAttachmentPreview(container, previewUrl, previewLabel);
      return;
    }

    const removeButton = event.target.closest('.duty-existing-attachment-remove');
    if (!removeButton) {
      return;
    }

    const index = Number(removeButton.getAttribute('data-index'));
    if (!Number.isInteger(index) || index < 0) {
      return;
    }

    removeAttachmentDraftItem(container, index);
  });

  setupModalEscapeHandler('duties', [
    attachmentPreviewModal,
    profileModal,
    deleteModal,
    dutyModal
  ]);

  deleteConfirmButton?.addEventListener('click', async () => {
    const id = container.querySelector('#duty-delete-id').value;
    await deleteDuty(id, container);
  });

  tableBody?.addEventListener('click', async (event) => {
    const actionButton = event.target.closest('button[data-action]');
    if (!actionButton) {
      return;
    }

    const action = actionButton.getAttribute('data-action');
    if (action === 'profile') {
      const id = actionButton.getAttribute('data-id');
      openDutyProfileModal(container, id);
      return;
    }

    if (action === 'edit') {
      const id = actionButton.getAttribute('data-id');
      openDutyEditModal(container, id);
      return;
    }

    if (action === 'trains') {
      const id = actionButton.getAttribute('data-id');
      const name = actionButton.getAttribute('data-name');
      const params = new URLSearchParams({
        dutyId: id,
        dutyName: name
      });
      window.history.pushState({}, '', `/trains-for-duties?${params.toString()}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }

    if (action === 'duplicate') {
      const id = actionButton.getAttribute('data-id');
      openDutyDuplicateModal(container, id);
      return;
    }

    if (action === 'delete') {
      const id = actionButton.getAttribute('data-id');
      container.querySelector('#duty-delete-id').value = id;
      openModal(deleteModal);
    }
  });

}
