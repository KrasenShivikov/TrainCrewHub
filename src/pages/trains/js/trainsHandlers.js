import { showToast } from '../../../components/toast/toast.js';
import { closeModal, openModal, setupModalEscapeHandler } from './helpers.js';
import { trainsState } from './state.js';
import { renderTrainsTable } from './table.js';
import { MAX_TRAIN_TIMETABLE_ITEMS } from './trainsConstants.js';
import { deleteTrain, saveTrain } from './trainsData.js';
import { populateTrainForm, resetTrainForm, updateCurrentTimetablePreview } from './trainsForms.js';
import { parseTimetableEntries, serializeTimetableEntries } from './trainsTimetableEntries.js';
import { closeTrainTimetablePreview, openTrainTimetablePreview } from './trainsPreview.js';

export function attachTrainsHandlers(container) {
  const createButton = container.querySelector('#open-create-train');
  const form = container.querySelector('#train-form');
  const cancelButton = container.querySelector('#train-cancel-btn');
  const tableBody = container.querySelector('#trains-table-body');
  const modal = container.querySelector('#train-modal');
  const deleteModal = container.querySelector('#train-delete-modal');
  const previewModal = container.querySelector('#train-timetable-preview-modal');
  const modalCloseButton = container.querySelector('#train-modal-close');
  const deleteConfirmButton = container.querySelector('#train-delete-confirm');
  const deleteCancelButton = container.querySelector('#train-delete-cancel');
  const previewCloseButton = container.querySelector('#train-timetable-preview-close');
  const searchInput = container.querySelector('#trains-search');
  const originFilterInput = container.querySelector('#trains-origin-filter');
  const destinationFilterInput = container.querySelector('#trains-destination-filter');
  const filterResetButton = container.querySelector('#trains-filter-reset');
  const timetableFileInput = container.querySelector('#train-timetable-file');
  const currentTimetableLinks = container.querySelector('#train-current-timetable-links');

  createButton?.addEventListener('click', () => {
    resetTrainForm(container);
    openModal(modal);
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveTrain(container);
  });

  cancelButton?.addEventListener('click', () => {
    closeModal(modal);
  });

  modalCloseButton?.addEventListener('click', () => {
    closeModal(modal);
  });

  deleteCancelButton?.addEventListener('click', () => {
    closeModal(deleteModal);
  });

  previewCloseButton?.addEventListener('click', () => {
    closeTrainTimetablePreview(container);
  });

  searchInput?.addEventListener('input', (event) => {
    trainsState.searchQuery = event.target.value.trim().toLowerCase();
    renderTrainsTable(container);
  });

  originFilterInput?.addEventListener('change', (event) => {
    trainsState.originFilter = event.target.value || '';
    renderTrainsTable(container);
  });

  destinationFilterInput?.addEventListener('change', (event) => {
    trainsState.destinationFilter = event.target.value || '';
    renderTrainsTable(container);
  });

  filterResetButton?.addEventListener('click', () => {
    trainsState.searchQuery = '';
    trainsState.originFilter = '';
    trainsState.destinationFilter = '';

    if (searchInput) searchInput.value = '';
    if (originFilterInput) originFilterInput.value = '';
    if (destinationFilterInput) destinationFilterInput.value = '';

    renderTrainsTable(container);
  });

  timetableFileInput?.addEventListener('change', () => {
    if (timetableFileInput.files?.length) {
      if (timetableFileInput.files.length > MAX_TRAIN_TIMETABLE_ITEMS) {
        showToast(`Може да избереш до ${MAX_TRAIN_TIMETABLE_ITEMS} файла наведнъж.`, 'warning');
        timetableFileInput.value = '';
        return;
      }
    }
  });

  currentTimetableLinks?.addEventListener('input', (event) => {
    const input = event.target.closest('.train-existing-timetable-label');
    if (!input) {
      return;
    }

    const index = Number(input.getAttribute('data-index'));
    if (!Number.isInteger(index) || index < 0) {
      return;
    }

    const draftInput = container.querySelector('#train-draft-timetable-url');
    const entries = parseTimetableEntries(draftInput?.value || '');
    if (!entries[index]) {
      return;
    }

    entries[index].label = input.value;
    if (draftInput) {
      draftInput.value = serializeTimetableEntries(entries) || '';
    }
  });

  currentTimetableLinks?.addEventListener('click', (event) => {
    const previewButton = event.target.closest('.train-existing-timetable-preview');
    if (previewButton) {
      const previewUrl = String(previewButton.getAttribute('data-url') || '').trim();
      const previewLabel = String(previewButton.getAttribute('data-label') || '').trim();
      openTrainTimetablePreview(container, previewUrl, previewLabel);
      return;
    }

    const removeButton = event.target.closest('.train-existing-timetable-remove');
    if (!removeButton) {
      return;
    }

    const index = Number(removeButton.getAttribute('data-index'));
    if (!Number.isInteger(index) || index < 0) {
      return;
    }

    const draftInput = container.querySelector('#train-draft-timetable-url');
    const entries = parseTimetableEntries(draftInput?.value || '');
    if (!entries[index]) {
      return;
    }

    entries.splice(index, 1);
    updateCurrentTimetablePreview(container, entries);
  });

  setupModalEscapeHandler('trains', [
    previewModal,
    deleteModal,
    modal
  ]);

  deleteConfirmButton?.addEventListener('click', async () => {
    const id = container.querySelector('#train-delete-id').value;
    await deleteTrain(id, container);
  });

  tableBody?.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button[data-action]');
    if (!actionButton) {
      return;
    }

    const action = actionButton.getAttribute('data-action');
    if (action === 'edit') {
      populateTrainForm(container, {
        id: actionButton.getAttribute('data-id'),
        number: actionButton.getAttribute('data-number'),
        originStation: actionButton.getAttribute('data-origin-station'),
        destinationStation: actionButton.getAttribute('data-destination-station'),
        departureTime: actionButton.getAttribute('data-departure-time'),
        arrivalTime: actionButton.getAttribute('data-arrival-time'),
        timetableUrl: decodeURIComponent(actionButton.getAttribute('data-timetable-url') || '')
      });
      openModal(modal);
      return;
    }

    if (action === 'delete') {
      const id = actionButton.getAttribute('data-id');
      container.querySelector('#train-delete-id').value = id;
      openModal(deleteModal);
      return;
    }

    if (action === 'preview-timetable') {
      const previewUrl = decodeURIComponent(actionButton.getAttribute('data-preview-url') || '');
      const previewLabel = decodeURIComponent(actionButton.getAttribute('data-preview-label') || '');
      openTrainTimetablePreview(container, previewUrl, previewLabel);
    }
  });
}
