import pageHtml from '../trains-for-duties.html?raw';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import {
  closeModal,
  escapeHtml,
  getDutyIdFromUrl,
  getDutyNameFromUrl,
  openModal,
  setupModalEscapeHandler,
  toTimeInputValue
} from './helpers.js';
import { trainsForDutiesState } from './state.js';
import {
  loadTrainsForDuty,
  renderTrainsForDutyTable,
  loadAttachTrainsCatalog,
  renderAttachTrainsList,
  persistTrainsForDutyOrder
} from './table.js';

const TRAIN_TIMETABLES_BUCKET = 'train-timetables';

export async function renderTrainsForDutiesPage(container) {
  container.innerHTML = pageHtml;

  trainsForDutiesState.dutyId = getDutyIdFromUrl();
  trainsForDutiesState.dutyName = getDutyNameFromUrl();

  if (!trainsForDutiesState.dutyId) {
    showToast('Липсва ID на повеската.', 'error');
    container.innerHTML = '<p class="text-danger">Грешка: Не може да зареди страницата.</p>';
    return;
  }

  const titleElement = container.querySelector('#duty-trains-title');
  if (titleElement) {
    titleElement.textContent = escapeHtml(trainsForDutiesState.dutyName || 'Неизвестна');
  }

  attachTrainsForDutiesHandlers(container);
  await loadTrainsForDuty(container);
}

function attachTrainsForDutiesHandlers(container) {
  const createButton = container.querySelector('#open-create-train-for-duty');
  const attachButton = container.querySelector('#open-attach-train-for-duty');
  const createModal = container.querySelector('#train-for-duty-create-modal');
  const editModal = container.querySelector('#train-for-duty-edit-modal');
  const attachModal = container.querySelector('#train-for-duty-attach-modal');
  const deleteModal = container.querySelector('#train-for-duty-delete-modal');
  const createForm = container.querySelector('#train-for-duty-create-form');
  const editForm = container.querySelector('#train-for-duty-edit-form');
  const createModalCloseButton = container.querySelector('#train-for-duty-create-modal-close');
  const editModalCloseButton = container.querySelector('#train-for-duty-edit-modal-close');
  const attachModalCloseButton = container.querySelector('#train-for-duty-attach-modal-close');
  const createCancelButton = container.querySelector('#train-for-duty-create-cancel');
  const editCancelButton = container.querySelector('#train-for-duty-edit-cancel');
  const attachCancelButton = container.querySelector('#train-for-duty-attach-cancel');
  const attachSearchInput = container.querySelector('#train-for-duty-attach-search');
  const attachList = container.querySelector('#train-for-duty-attach-list');
  const trainsBody = container.querySelector('#duty-trains-body');
  const deleteCancelButton = container.querySelector('#train-for-duty-delete-cancel');
  const deleteConfirmButton = container.querySelector('#train-for-duty-delete-confirm');

  setupModalEscapeHandler('trainsForDuties', [attachModal, editModal, createModal, deleteModal]);

  createButton?.addEventListener('click', () => {
    resetCreateForm(container);
    openModal(createModal);
  });

  attachButton?.addEventListener('click', async () => {
    await loadAttachTrainsCatalog(container);
    renderAttachTrainsList(container);
    openModal(attachModal);
  });

  createModalCloseButton?.addEventListener('click', () => {
    closeModal(createModal);
  });

  editModalCloseButton?.addEventListener('click', () => {
    closeModal(editModal);
  });

  editCancelButton?.addEventListener('click', () => {
    closeModal(editModal);
  });

  editForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveEditedTrainForDuty(container);
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
    await saveNewTrainForDuty(container);
  });

  attachSearchInput?.addEventListener('input', () => {
    renderAttachTrainsList(container);
  });

  attachList?.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-attach-train-id]');
    if (!button) return;

    const trainId = button.getAttribute('data-attach-train-id');
    const trainNumber = button.getAttribute('data-attach-train-number');
    if (!trainId) return;

    await attachExistingTrainToDuty(container, trainId, trainNumber);
  });

  trainsBody?.addEventListener('click', async (event) => {
    const actionButton = event.target.closest('button[data-action]');
    if (!actionButton) return;

    const action = actionButton.getAttribute('data-action');

    if (action === 'edit') {
      populateEditTrainForm(container, {
        id: actionButton.getAttribute('data-id'),
        number: actionButton.getAttribute('data-number'),
        origin: actionButton.getAttribute('data-origin'),
        destination: actionButton.getAttribute('data-destination'),
        departure: actionButton.getAttribute('data-departure'),
        arrival: actionButton.getAttribute('data-arrival'),
        timetableUrl: actionButton.getAttribute('data-timetable-url')
      });
      openModal(editModal);
      return;
    }

    if (action === 'delete') {
      const trainId = actionButton.getAttribute('data-train-id');
      const trainNumber = actionButton.getAttribute('data-train-number');
      if (!trainId) return;

      const titleEl = container.querySelector('#train-for-duty-delete-title');
      const messageEl = container.querySelector('#train-for-duty-delete-message');
      if (titleEl) titleEl.textContent = 'Потвърди изтриване';
      if (messageEl) messageEl.textContent = `Искаш ли да премахнеш влак "${trainNumber}" от тази повеска?`;
      container.querySelector('#train-for-duty-delete-id').value = trainId;
      openModal(deleteModal);
    }
  });

  deleteCancelButton?.addEventListener('click', () => {
    closeModal(deleteModal);
  });

  deleteConfirmButton?.addEventListener('click', async () => {
    const trainId = container.querySelector('#train-for-duty-delete-id').value;
    if (trainId) {
      await deleteTrainFromDuty(container, trainId);
    }
    closeModal(deleteModal);
  });

  trainsBody?.addEventListener('dragstart', (event) => {
    if (!trainsForDutiesState.reorderEnabled) {
      return;
    }

    const row = event.target.closest('tr[data-train-id]');
    if (!row) {
      return;
    }

    trainsForDutiesState.draggedTrainId = row.getAttribute('data-train-id');
    row.classList.add('table-active');
  });

  trainsBody?.addEventListener('dragend', (event) => {
    if (!trainsForDutiesState.reorderEnabled) {
      return;
    }

    const row = event.target.closest('tr[data-train-id]');
    if (row) {
      row.classList.remove('table-active');
    }

    trainsForDutiesState.draggedTrainId = null;
  });

  trainsBody?.addEventListener('dragover', (event) => {
    if (!trainsForDutiesState.reorderEnabled) {
      return;
    }

    const row = event.target.closest('tr[data-train-id]');
    if (row) {
      event.preventDefault();
    }
  });

  trainsBody?.addEventListener('drop', async (event) => {
    if (!trainsForDutiesState.reorderEnabled) {
      return;
    }

    event.preventDefault();

    const targetRow = event.target.closest('tr[data-train-id]');
    const draggedId = trainsForDutiesState.draggedTrainId;
    if (!targetRow || !draggedId) {
      return;
    }

    const targetId = targetRow.getAttribute('data-train-id');
    if (!targetId || targetId === draggedId) {
      return;
    }

    const fromIndex = trainsForDutiesState.trains.findIndex((item) => item.id === draggedId);
    const toIndex = trainsForDutiesState.trains.findIndex((item) => item.id === targetId);
    if (fromIndex < 0 || toIndex < 0) {
      return;
    }

    const [moved] = trainsForDutiesState.trains.splice(fromIndex, 1);
    trainsForDutiesState.trains.splice(toIndex, 0, moved);
    renderTrainsForDutyTable(container);

    const persisted = await persistTrainsForDutyOrder();
    if (!persisted) {
      await loadTrainsForDuty(container);
      return;
    }

    showToast('Редът на влаковете е запазен.', 'success');
  });
}

function resetCreateForm(container) {
  const form = container.querySelector('#train-for-duty-create-form');
  if (form) form.reset();
}

function populateEditTrainForm(container, { id, number, origin, destination, departure, arrival, timetableUrl }) {
  container.querySelector('#train-for-duty-edit-id').value = id || '';
  container.querySelector('#train-for-duty-edit-number').value = number || '';
  container.querySelector('#train-for-duty-edit-origin').value = origin || '';
  container.querySelector('#train-for-duty-edit-destination').value = destination || '';
  container.querySelector('#train-for-duty-edit-departure').value = toTimeInputValue(departure);
  container.querySelector('#train-for-duty-edit-arrival').value = toTimeInputValue(arrival);
  container.querySelector('#train-for-duty-edit-timetable').value = '';
  container.querySelector('#train-for-duty-edit-existing-timetable').value = timetableUrl || '';

  const wrap = container.querySelector('#train-for-duty-edit-current-timetable-wrap');
  const linksRoot = container.querySelector('#train-for-duty-edit-current-timetable-links');
  let parsed = [];
  if (timetableUrl) {
    try { parsed = JSON.parse(decodeURIComponent(timetableUrl)); } catch { parsed = []; }
  }
  if (parsed.length && wrap && linksRoot) {
    linksRoot.innerHTML = parsed.map((entry) =>
      `<a href="${escapeHtml(entry.url)}" target="_blank" rel="noopener noreferrer" class="badge bg-light border text-dark text-decoration-none">${escapeHtml(entry.label || 'Файл')}</a>`
    ).join('');
    wrap.classList.remove('d-none');
  } else if (wrap) {
    wrap.classList.add('d-none');
  }
}

async function saveEditedTrainForDuty(container) {
  const id = container.querySelector('#train-for-duty-edit-id').value;
  const number = container.querySelector('#train-for-duty-edit-number').value?.trim();
  const origin = container.querySelector('#train-for-duty-edit-origin').value?.trim();
  const destination = container.querySelector('#train-for-duty-edit-destination').value?.trim();
  const departure = container.querySelector('#train-for-duty-edit-departure').value?.trim();
  const arrival = container.querySelector('#train-for-duty-edit-arrival').value?.trim();
  const timetableFileInput = container.querySelector('#train-for-duty-edit-timetable');
  const existingTimetableRaw = container.querySelector('#train-for-duty-edit-existing-timetable').value;

  if (!number || !origin || !destination) {
    showToast('Попълни всички задължителни полета.', 'warning');
    return;
  }

  let timetableUrls = [];
  if (existingTimetableRaw) {
    try { timetableUrls = JSON.parse(decodeURIComponent(existingTimetableRaw)); } catch { timetableUrls = []; }
  }

  if (timetableFileInput?.files?.length) {
    timetableUrls = [];
    for (let i = 0; i < timetableFileInput.files.length; i++) {
      const file = timetableFileInput.files[i];
      const fileName = `${Date.now()}_${i}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from(TRAIN_TIMETABLES_BUCKET)
        .upload(fileName, file);

      if (uploadError) {
        showToast(`Грешка при качване на ${file.name}: ${uploadError.message}`, 'error');
        return;
      }

      const { data: publicData } = supabase.storage
        .from(TRAIN_TIMETABLES_BUCKET)
        .getPublicUrl(fileName);

      if (publicData?.publicUrl) {
        timetableUrls.push({ label: file.name, url: publicData.publicUrl });
      }
    }
  }

  const { error } = await supabase
    .from('trains')
    .update({
      number,
      origin_station: origin,
      destination_station: destination,
      departure_time: departure || null,
      arrival_time: arrival || null,
      timetable_url: timetableUrls.length ? timetableUrls : null
    })
    .eq('id', id);

  if (error) {
    showToast(`Грешка при запазване: ${error.message}`, 'error');
    return;
  }

  showToast('Влакът е успешно обновен.', 'success');
  closeModal(container.querySelector('#train-for-duty-edit-modal'));
  await loadTrainsForDuty(container);
}

async function saveNewTrainForDuty(container) {
  const number = container.querySelector('#train-for-duty-create-number').value?.trim();
  const origin = container.querySelector('#train-for-duty-create-origin').value?.trim();
  const destination = container.querySelector('#train-for-duty-create-destination').value?.trim();
  const departure = container.querySelector('#train-for-duty-create-departure').value?.trim();
  const arrival = container.querySelector('#train-for-duty-create-arrival').value?.trim();
  const timetableFileInput = container.querySelector('#train-for-duty-create-timetable');

  if (!number || !origin || !destination) {
    showToast('Попълни всички задължителни полета.', 'warning');
    return;
  }

  // Upload timetable files if provided
  let timetableUrls = [];
  if (timetableFileInput?.files?.length) {
    for (let i = 0; i < timetableFileInput.files.length; i++) {
      const file = timetableFileInput.files[i];
      const fileName = `${Date.now()}_${i}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from(TRAIN_TIMETABLES_BUCKET)
        .upload(fileName, file);

      if (uploadError) {
        showToast(`Грешка при качване на ${file.name}: ${uploadError.message}`, 'error');
        return;
      }

      const { data: publicData } = supabase.storage
        .from(TRAIN_TIMETABLES_BUCKET)
        .getPublicUrl(fileName);

      if (publicData?.publicUrl) {
        timetableUrls.push({
          label: file.name,
          url: publicData.publicUrl
        });
      }
    }
  }

  // Insert new train
  const { data: newTrain, error: insertError } = await supabase
    .from('trains')
    .insert({
      number,
      origin_station: origin,
      destination_station: destination,
      departure_time: departure || null,
      arrival_time: arrival || null,
      timetable_url: timetableUrls.length ? timetableUrls : null
    })
    .select()
    .single();

  if (insertError) {
    showToast(`Грешка при създаване на влак: ${insertError.message}`, 'error');
    return;
  }

  // Link train to duty
  const { error: linkError } = await supabase
    .from('duty_trains')
    .insert({
      duty_id: trainsForDutiesState.dutyId,
      train_id: newTrain.id,
      sequence_order: trainsForDutiesState.trains.length + 1
    });

  if (linkError) {
    showToast(`Грешка при закачане на влак: ${linkError.message}`, 'error');
    return;
  }

  showToast('Влакът е успешно създаден и закачен.', 'success');
  closeModal(container.querySelector('#train-for-duty-create-modal'));
  resetCreateForm(container);
  await loadTrainsForDuty(container);
}

async function attachExistingTrainToDuty(container, trainId, trainNumber) {
  const { error } = await supabase
    .from('duty_trains')
    .insert({
      duty_id: trainsForDutiesState.dutyId,
      train_id: trainId,
      sequence_order: trainsForDutiesState.trains.length + 1
    });

  if (error) {
    showToast(`Грешка: ${error.message}`, 'error');
    return;
  }

  showToast(`Влакът "${trainNumber}" е успешно закачен.`, 'success');
  closeModal(container.querySelector('#train-for-duty-attach-modal'));
  await loadTrainsForDuty(container);
  await loadAttachTrainsCatalog(container);
  renderAttachTrainsList(container);
}

async function deleteTrainFromDuty(container, trainId) {
  const { error } = await supabase
    .from('duty_trains')
    .delete()
    .eq('duty_id', trainsForDutiesState.dutyId)
    .eq('train_id', trainId);

  if (error) {
    showToast(`Грешка: ${error.message}`, 'error');
    return;
  }

  showToast('Влакът е успешно отстранен от повеската.', 'success');
  await loadTrainsForDuty(container);
}
