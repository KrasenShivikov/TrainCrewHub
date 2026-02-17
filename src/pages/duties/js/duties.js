import pageHtml from '../duties.html?raw';
import {
  calculateShiftDurationMinutes,
  intervalToTimeInput
} from '../../../utils/dutyTime.js';
import { buildDutyProfileContent } from '../../../utils/dutyProfileTemplate.js';
import { renderDutyFormFields } from '../../../utils/dutyFormTemplate.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { closeModal, escapeHtml, openModal, setupModalEscapeHandler } from './helpers.js';
import { dutiesState } from './state.js';
import { loadDuties, persistDutiesOrder, renderDutiesTable } from './table.js';
import { isCurrentUserCrew } from '../../../utils/userContext.js';

const DUTY_FILES_BUCKET = 'duty-files';
const MAX_DUTY_FILE_ITEMS = 5;

export async function renderDutiesPage(container) {
  container.innerHTML = pageHtml;
  dutiesState.reorderEnabled = !(await isCurrentUserCrew());
  initializeDutyFormFields(container);
  attachDutiesHandlers(container);
  await loadDutyTypeOptions(container);
  await loadScheduleKeyOptions(container);
  await loadTrainOptions(container);
  await loadDuties(container);
}

function initializeDutyFormFields(container) {
  const fieldsRoot = container.querySelector('#duty-form-fields');
  if (!fieldsRoot) {
    return;
  }

  fieldsRoot.innerHTML = `
    ${renderDutyFormFields({ idPrefix: 'duty' })}

    <div class="col-12">
      <label for="duty-attachment-file" class="form-label">Файлове</label>
      <input id="duty-attachment-file" class="form-control" type="file" multiple />
      <div class="form-text">Може да добавиш до ${MAX_DUTY_FILE_ITEMS} файла общо.</div>
    </div>

    <div id="duty-current-attachments-wrap" class="col-12 d-none">
      <label class="form-label">Текущи файлове</label>
      <div id="duty-current-attachments-links" class="d-flex flex-column gap-2"></div>
    </div>

    <input type="hidden" id="duty-existing-attachments" />
    <input type="hidden" id="duty-draft-attachments" />
  `;
}

async function loadTrainOptions(container) {
  const select = container.querySelector('#duty-trains');

  const { data, error } = await supabase
    .from('trains')
    .select('id, number, origin_station, destination_station')
    .order('number', { ascending: true });

  if (error) {
    showToast(getFriendlySupabaseErrorMessage(error), 'error');
    return;
  }

  const options = (data || [])
    .map((item) => {
      const route = `${item.origin_station || '-'} - ${item.destination_station || '-'}`;
      return `<option value="${item.id}">${escapeHtml(item.number || '-')} (${escapeHtml(route)})</option>`;
    })
    .join('');

  select.innerHTML = options;
}

async function loadDutyTypeOptions(container) {
  const select = container.querySelector('#duty-type');

  const { data, error } = await supabase
    .from('duty_types')
    .select('id, name')
    .order('name', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  const options = (data || [])
    .map((item) => `<option value="${item.id}">${escapeHtml(item.name)}</option>`)
    .join('');

  select.innerHTML = '<option value="">Избери тип</option>' + options;
}

function attachDutiesHandlers(container) {
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

    const draftInput = container.querySelector('#duty-draft-attachments');
    const entries = parseAttachmentEntries(draftInput?.value || '');
    if (!entries[index]) {
      return;
    }

    entries[index].label = input.value;
    if (draftInput) {
      draftInput.value = serializeAttachmentEntries(entries) || '';
    }
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

    const draftInput = container.querySelector('#duty-draft-attachments');
    const entries = parseAttachmentEntries(draftInput?.value || '');
    if (!entries[index]) {
      return;
    }

    entries.splice(index, 1);
    updateCurrentAttachmentsPreview(container, entries);
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

  tableBody?.addEventListener('dragstart', (event) => {
    if (!dutiesState.reorderEnabled) {
      return;
    }

    const row = event.target.closest('tr[data-duty-id]');
    if (!row) {
      return;
    }

    dutiesState.draggedDutyId = row.getAttribute('data-duty-id');
    row.classList.add('table-active');
  });

  tableBody?.addEventListener('dragend', (event) => {
    if (!dutiesState.reorderEnabled) {
      return;
    }

    const row = event.target.closest('tr[data-duty-id]');
    if (row) {
      row.classList.remove('table-active');
    }
    dutiesState.draggedDutyId = null;
  });

  tableBody?.addEventListener('dragover', (event) => {
    if (!dutiesState.reorderEnabled) {
      return;
    }

    event.preventDefault();
  });

  tableBody?.addEventListener('drop', async (event) => {
    if (!dutiesState.reorderEnabled) {
      return;
    }

    event.preventDefault();
    const targetRow = event.target.closest('tr[data-duty-id]');
    const draggedId = dutiesState.draggedDutyId;

    if (!targetRow || !draggedId) {
      return;
    }

    const targetId = targetRow.getAttribute('data-duty-id');
    if (!targetId || targetId === draggedId) {
      return;
    }

    const fromIndex = dutiesState.allDuties.findIndex((item) => item.id === draggedId);
    const toIndex = dutiesState.allDuties.findIndex((item) => item.id === targetId);

    if (fromIndex < 0 || toIndex < 0) {
      return;
    }

    const [moved] = dutiesState.allDuties.splice(fromIndex, 1);
    dutiesState.allDuties.splice(toIndex, 0, moved);
    renderDutiesTable(container);

    const persisted = await persistDutiesOrder();
    if (!persisted) {
      await loadDuties(container);
      return;
    }

    showToast('Редът на повеските е запазен.', 'success');
  });
}

async function loadScheduleKeyOptions(container) {
  const select = container.querySelector('#duty-schedule-keys');

  const { data, error } = await supabase
    .from('schedule_keys')
    .select('id, name')
    .order('name', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  const options = (data || [])
    .map((item) => `<option value="${item.id}">${escapeHtml(item.name)}</option>`)
    .join('');

  select.innerHTML = options;
}

async function saveDuty(container) {
  const idInput = container.querySelector('#duty-id');
  const nameInput = container.querySelector('#duty-name');
  const dutyTypeInput = container.querySelector('#duty-type');
  const scheduleKeysInput = container.querySelector('#duty-schedule-keys');
  const trainsInput = container.querySelector('#duty-trains');
  const startTimeInput = getDutyField(container, '#duty-start', '#duty-start-time');
  const endTimeInput = getDutyField(container, '#duty-end', '#duty-end-time');
  const secondDayInput = container.querySelector('#duty-second-day');
  const breakStartInput = getDutyField(container, '#duty-break-start', '#duty-break-start-time');
  const breakEndInput = getDutyField(container, '#duty-break-end', '#duty-break-end-time');
  const notesInput = container.querySelector('#duty-notes');
  const attachmentFileInput = container.querySelector('#duty-attachment-file');
  const existingAttachmentsInput = container.querySelector('#duty-existing-attachments');
  const draftAttachmentsInput = container.querySelector('#duty-draft-attachments');
  const saveButton = container.querySelector('#duty-save-btn');

  const name = nameInput.value.trim();
  const dutyTypeId = dutyTypeInput.value || null;
  const selectedScheduleKeyIds = Array.from(scheduleKeysInput.selectedOptions || [])
    .map((option) => option.value)
    .filter(Boolean);
  const selectedTrainIds = Array.from(trainsInput.selectedOptions || [])
    .map((option) => option.value)
    .filter(Boolean);
  const primaryScheduleKeyId = selectedScheduleKeyIds[0] || null;
  const startTime = startTimeInput?.value || '';
  const endTime = endTimeInput?.value || '';
  const secondDay = secondDayInput.checked;
  const breakStartTime = breakStartInput?.value || '00:00';
  const breakEndTime = breakEndInput?.value || '00:00';
  const notes = notesInput.value.trim() || null;
  const previousAttachments = parseAttachmentEntries(existingAttachmentsInput?.value || '');
  const draftAttachments = parseAttachmentEntries(draftAttachmentsInput?.value || '');
  const attachmentFiles = Array.from(attachmentFileInput?.files || []);
  const editingId = idInput.value;

  if (!name || !dutyTypeId || !startTime || !endTime) {
    showToast('Моля, попълни всички задължителни полета.', 'warning');
    return;
  }

  if (!selectedScheduleKeyIds.length) {
    showToast('Избери поне един ключ-график.', 'warning');
    return;
  }

  const shiftDurationMinutes = calculateShiftDurationMinutes(startTime, endTime);
  const breakDurationMinutes = calculateShiftDurationMinutes(breakStartTime, breakEndTime);
  if (breakDurationMinutes > shiftDurationMinutes) {
    showToast('Прекъсването не може да е по-голямо от продължителността на повеската.', 'warning');
    return;
  }

  const originalText = saveButton.innerHTML;
  saveButton.disabled = true;
  saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';

  const dutyRecordId = editingId || crypto.randomUUID();
  const nextAttachments = dedupeAttachmentEntries(draftAttachments);
  const uploadedObjectPaths = [];

  const projectedTotalItems = nextAttachments.length + attachmentFiles.length;
  if (projectedTotalItems > MAX_DUTY_FILE_ITEMS) {
    saveButton.disabled = false;
    saveButton.innerHTML = originalText;
    showToast(`Максимум ${MAX_DUTY_FILE_ITEMS} файла/линка за една повеска.`, 'warning');
    return;
  }

  if (attachmentFiles.length) {
    const uploadedEntries = await uploadDutyAttachments(attachmentFiles, dutyRecordId);
    if (!uploadedEntries) {
      saveButton.disabled = false;
      saveButton.innerHTML = originalText;
      return;
    }

    uploadedEntries.forEach((entry) => {
      if (entry?.url) {
        nextAttachments.push({
          url: entry.url,
          label: entry.label || deriveAttachmentLabel(entry.url, nextAttachments.length)
        });
      }

      if (entry?.objectPath) {
        uploadedObjectPaths.push(entry.objectPath);
      }
    });
  }

  const finalAttachments = dedupeAttachmentEntries(nextAttachments);

  const payload = {
    name,
    duty_type_id: dutyTypeId,
    schedule_key_id: primaryScheduleKeyId,
    start_time: startTime,
    end_time: endTime,
    second_day: secondDay,
    break_start_time: breakStartTime,
    break_end_time: breakEndTime,
    notes,
    duty_files: serializeAttachmentEntries(finalAttachments)
  };

  let error;
  let dutyId = editingId || null;

  if (editingId) {
    ({ error } = await supabase.from('duties').update(payload).eq('id', editingId));
  } else {
    const { data: userData } = await supabase.auth.getUser();
    const createdFrom = userData?.user?.id ?? userData?.user?.email ?? 'web_app';
    const maxDisplayOrder = dutiesState.allDuties.reduce(
      (maxValue, item) => Math.max(maxValue, Number(item.display_order) || 0),
      0
    );
    const { data: insertedDuty, error: insertError } = await supabase
      .from('duties')
      .insert({ ...payload, id: dutyRecordId, created_from: createdFrom, display_order: maxDisplayOrder + 1 })
      .select('id')
      .single();

    error = insertError;
    dutyId = insertedDuty?.id ?? null;
  }

  if (!error && dutyId) {
    error = await syncDutyScheduleKeys(dutyId, selectedScheduleKeyIds);
  }

  if (!error && dutyId) {
    error = await syncDutyTrains(dutyId, selectedTrainIds);
  }

  saveButton.disabled = false;
  saveButton.innerHTML = originalText;

  if (error) {
    if (uploadedObjectPaths.length) {
      await removeDutyAttachmentObjects(uploadedObjectPaths);
    }
    showToast(error.message, 'error');
    return;
  }

  if (editingId) {
    const previousObjectPaths = previousAttachments
      .map((entry) => extractDutyAttachmentObjectPath(entry.url))
      .filter(Boolean);
    const currentObjectPaths = finalAttachments
      .map((entry) => extractDutyAttachmentObjectPath(entry.url))
      .filter(Boolean);

    const currentSet = new Set(currentObjectPaths);
    const obsoletePaths = previousObjectPaths.filter((path) => !currentSet.has(path));
    if (obsoletePaths.length) {
      await removeDutyAttachmentObjects(obsoletePaths);
    }
  }

  showToast(editingId ? 'Повеската е обновена.' : 'Повеската е създадена.', 'success');
  closeModal(container.querySelector('#duty-modal'));
  resetDutyForm(container);
  await loadDuties(container);
}

function populateDutyForm(container, duty) {
  const attachments = parseAttachmentEntries(duty.dutyFiles);

  container.querySelector('#duty-id').value = duty.id;
  container.querySelector('#duty-name').value = duty.name ?? '';
  container.querySelector('#duty-type').value = duty.dutyTypeId ?? '';
  const scheduleKeysSelect = container.querySelector('#duty-schedule-keys');
  const selectedScheduleKeyIds = duty.scheduleKeyIds || [];
  Array.from(scheduleKeysSelect.options).forEach((option) => {
    option.selected = selectedScheduleKeyIds.includes(option.value);
  });
  const trainsSelect = container.querySelector('#duty-trains');
  const selectedTrainIds = duty.trainIds || [];
  Array.from(trainsSelect.options).forEach((option) => {
    option.selected = selectedTrainIds.includes(option.value);
  });
  setDutyFieldValue(container, duty.startTime ?? '', '#duty-start', '#duty-start-time');
  setDutyFieldValue(container, duty.endTime ?? '', '#duty-end', '#duty-end-time');
  container.querySelector('#duty-second-day').checked = Boolean(duty.secondDay);
  setDutyFieldValue(container, intervalToTimeInput(duty.breakStartTime), '#duty-break-start', '#duty-break-start-time');
  setDutyFieldValue(container, intervalToTimeInput(duty.breakEndTime), '#duty-break-end', '#duty-break-end-time');
  container.querySelector('#duty-notes').value = duty.notes ?? '';
  container.querySelector('#duty-existing-attachments').value = serializeAttachmentEntries(attachments) || '';
  container.querySelector('#duty-draft-attachments').value = serializeAttachmentEntries(attachments) || '';
  container.querySelector('#duty-attachment-file').value = '';
  updateCurrentAttachmentsPreview(container, attachments);

  container.querySelector('#duty-form-title').textContent = 'Редакция на Повеска';
  container.querySelector('#duty-save-btn').textContent = 'Запази';
}

function resetDutyForm(container) {
  container.querySelector('#duty-id').value = '';
  container.querySelector('#duty-name').value = '';
  container.querySelector('#duty-type').value = '';
  const scheduleKeysSelect = container.querySelector('#duty-schedule-keys');
  Array.from(scheduleKeysSelect.options).forEach((option) => {
    option.selected = false;
  });
  const trainsSelect = container.querySelector('#duty-trains');
  Array.from(trainsSelect.options).forEach((option) => {
    option.selected = false;
  });
  setDutyFieldValue(container, '', '#duty-start', '#duty-start-time');
  setDutyFieldValue(container, '', '#duty-end', '#duty-end-time');
  container.querySelector('#duty-second-day').checked = false;
  setDutyFieldValue(container, '00:00', '#duty-break-start', '#duty-break-start-time');
  setDutyFieldValue(container, '00:00', '#duty-break-end', '#duty-break-end-time');
  container.querySelector('#duty-notes').value = '';
  container.querySelector('#duty-existing-attachments').value = '';
  container.querySelector('#duty-draft-attachments').value = '';
  container.querySelector('#duty-attachment-file').value = '';
  updateCurrentAttachmentsPreview(container, []);

  container.querySelector('#duty-form-title').textContent = 'Нова Повеска';
  container.querySelector('#duty-save-btn').textContent = 'Създай';
}

async function deleteDuty(id, container) {
  const deleteButton = container.querySelector('#duty-delete-confirm');
  const originalDeleteText = deleteButton.innerHTML;
  deleteButton.disabled = true;
  deleteButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';

  const { data: dutyRow, error: dutyLoadError } = await supabase
    .from('duties')
    .select('duty_files')
    .eq('id', id)
    .maybeSingle();

  if (dutyLoadError) {
    deleteButton.disabled = false;
    deleteButton.innerHTML = originalDeleteText;
    showToast(dutyLoadError.message, 'error');
    return;
  }

  const { error } = await supabase.from('duties').delete().eq('id', id);
  deleteButton.disabled = false;
  deleteButton.innerHTML = originalDeleteText;

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  const objectPaths = parseAttachmentEntries(dutyRow?.duty_files)
    .map((entry) => extractDutyAttachmentObjectPath(entry.url))
    .filter(Boolean);
  if (objectPaths.length) {
    await removeDutyAttachmentObjects(objectPaths);
  }

  showToast('Повеската е изтрита.', 'success');
  closeModal(container.querySelector('#duty-delete-modal'));
  resetDutyForm(container);
  await loadDuties(container);
}

async function syncDutyScheduleKeys(dutyId, scheduleKeyIds) {
  const { error: clearError } = await supabase
    .from('schedule_key_duties')
    .delete()
    .eq('duty_id', dutyId);

  if (clearError) {
    return clearError;
  }

  const payload = scheduleKeyIds.map((scheduleKeyId) => ({
    duty_id: dutyId,
    schedule_key_id: scheduleKeyId
  }));

  const { error: insertError } = await supabase.from('schedule_key_duties').insert(payload);
  return insertError;
}

async function syncDutyTrains(dutyId, trainIds) {
  const { error: clearError } = await supabase
    .from('duty_trains')
    .delete()
    .eq('duty_id', dutyId);

  if (clearError) {
    return clearError;
  }

  if (!trainIds.length) {
    return null;
  }

  const payload = trainIds.map((trainId, index) => ({
    duty_id: dutyId,
    train_id: trainId,
    sequence_order: index + 1
  }));

  const { error: insertError } = await supabase.from('duty_trains').insert(payload);
  return insertError;
}

function updateCurrentAttachmentsPreview(container, entries) {
  const wrap = container.querySelector('#duty-current-attachments-wrap');
  const linksContainer = container.querySelector('#duty-current-attachments-links');
  const draftInput = container.querySelector('#duty-draft-attachments');
  if (!wrap || !linksContainer || !draftInput) {
    return;
  }

  const normalized = dedupeAttachmentEntries(entries);
  draftInput.value = serializeAttachmentEntries(normalized) || '';

  if (!normalized.length) {
    wrap.classList.add('d-none');
    linksContainer.innerHTML = '';
    return;
  }

  wrap.classList.remove('d-none');
  linksContainer.innerHTML = normalized
    .map((entry, index) => {
      const label = entry.label || deriveAttachmentLabel(entry.url, index);
      return `
        <div class="border rounded p-2 w-100">
          <div class="mb-2 d-flex align-items-center justify-content-between gap-2">
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <a href="${escapeHtml(entry.url)}" target="_blank" rel="noopener noreferrer">Отвори</a>
              <button
                type="button"
                class="btn btn-link btn-sm p-0 lh-1 text-decoration-none duty-existing-attachment-preview"
                data-url="${escapeHtml(entry.url)}"
                data-label="${escapeHtml(label)}"
                title="Преглед"
                aria-label="Преглед"
              >
                👁
              </button>
            </div>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger duty-existing-attachment-remove"
              data-index="${index}"
            >
              Премахни
            </button>
          </div>
          <input
            type="text"
            class="form-control form-control-sm duty-existing-attachment-label"
            data-index="${index}"
            value="${escapeHtml(label)}"
            placeholder="Име на файла/линка"
          />
        </div>
      `;
    })
    .join('');
}

function parseAttachmentEntries(value) {
  if (Array.isArray(value)) {
    return value
      .map((item, index) => normalizeAttachmentEntry(item, index))
      .filter((entry) => entry.url);
  }

  const raw = String(value || '').trim();
  if (!raw) {
    return [];
  }

  if (raw.startsWith('[')) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed
          .map((item, index) => normalizeAttachmentEntry(item, index))
          .filter((entry) => entry.url);
      }
    } catch {
      return [{ url: raw, label: deriveAttachmentLabel(raw, 0) }];
    }
  }

  return raw
    .split('\n')
    .map((item, index) => normalizeAttachmentEntry(item, index))
    .filter((entry) => entry.url);
}

function normalizeAttachmentEntry(item, index) {
  if (item && typeof item === 'object' && !Array.isArray(item)) {
    const url = String(item.url || '').trim();
    const label = String(item.label || '').trim() || deriveAttachmentLabel(url, index);
    return { url, label };
  }

  const url = String(item || '').trim();
  return {
    url,
    label: deriveAttachmentLabel(url, index)
  };
}

function serializeAttachmentEntries(entries) {
  const normalized = dedupeAttachmentEntries(entries);
  if (!normalized.length) {
    return '';
  }

  return JSON.stringify(normalized);
}

function dedupeAttachmentEntries(entries) {
  const unique = [];
  const seen = new Set();

  for (const entry of entries || []) {
    const normalized = normalizeAttachmentEntry(entry, unique.length);
    if (!normalized.url) {
      continue;
    }

    const key = normalized.url.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    unique.push(normalized);
  }

  return unique;
}

function deriveAttachmentLabel(url, index) {
  const raw = String(url || '').trim();
  if (!raw) {
    return `Файл ${index + 1}`;
  }

  try {
    const parsedUrl = new URL(raw);
    const pathPart = parsedUrl.pathname.split('/').pop() || '';
    const decoded = decodeURIComponent(pathPart);
    if (decoded) {
      return decoded;
    }
  } catch {
    // ignore parsing errors
  }

  return `Файл ${index + 1}`;
}

async function uploadDutyAttachments(files, dutyId) {
  if (!Array.isArray(files) || !files.length || !dutyId) {
    return [];
  }

  const uploaded = [];

  for (const file of files) {
    const extension = (file.name?.split('.').pop() || 'pdf').toLowerCase();
    const safeExtension = extension.replace(/[^a-z0-9]/g, '') || 'pdf';
    const randomSuffix = Math.random().toString(36).slice(2, 10);
    const filePath = `${dutyId}/${Date.now()}-${randomSuffix}.${safeExtension}`;

    const { error } = await supabase.storage
      .from(DUTY_FILES_BUCKET)
      .upload(filePath, file, { upsert: true, contentType: file.type || undefined });

    if (error) {
      if (uploaded.length) {
        await removeDutyAttachmentObjects(uploaded.map((item) => item.objectPath));
      }
      showToast(error.message, 'error');
      return null;
    }

    const { data } = supabase.storage.from(DUTY_FILES_BUCKET).getPublicUrl(filePath);
    if (!data?.publicUrl) {
      await removeDutyAttachmentObjects([filePath, ...uploaded.map((item) => item.objectPath)]);
      showToast('Файлът е качен, но не успях да генерирам публичен линк.', 'error');
      return null;
    }

    uploaded.push({
      url: data.publicUrl,
      label: file.name || '',
      objectPath: filePath
    });
  }

  return uploaded;
}

function extractDutyAttachmentObjectPath(value) {
  const raw = String(value || '').trim();
  if (!raw) {
    return '';
  }

  if (!/^https?:\/\//i.test(raw)) {
    const normalized = raw.replace(/^\/+/, '');
    const bucketPrefix = `${DUTY_FILES_BUCKET}/`;
    return normalized.startsWith(bucketPrefix) ? normalized.slice(bucketPrefix.length) : '';
  }

  try {
    const url = new URL(raw);
    const marker = `/storage/v1/object/public/${DUTY_FILES_BUCKET}/`;
    const index = url.pathname.indexOf(marker);
    if (index === -1) {
      return '';
    }

    return decodeURIComponent(url.pathname.slice(index + marker.length));
  } catch {
    return '';
  }
}

async function removeDutyAttachmentObjects(objectPaths) {
  const uniquePaths = Array.from(new Set((objectPaths || []).filter(Boolean)));
  if (!uniquePaths.length) {
    return;
  }

  await supabase.storage
    .from(DUTY_FILES_BUCKET)
    .remove(uniquePaths);
}

function openDutyAttachmentPreview(container, url, label) {
  const previewModal = container.querySelector('#duty-attachment-preview-modal');
  const frame = container.querySelector('#duty-attachment-preview-frame');
  const textWrap = container.querySelector('#duty-attachment-preview-text-wrap');
  const textPreview = container.querySelector('#duty-attachment-preview-text');
  const csvWrap = container.querySelector('#duty-attachment-preview-csv-wrap');
  const csvNote = container.querySelector('#duty-attachment-preview-csv-note');
  const csvHead = container.querySelector('#duty-attachment-preview-csv-head');
  const csvBody = container.querySelector('#duty-attachment-preview-csv-body');
  const title = container.querySelector('#duty-attachment-preview-title');
  const fallback = container.querySelector('#duty-attachment-preview-fallback');
  const directOpenLink = container.querySelector('#duty-attachment-preview-open');
  if (!previewModal || !frame || !textWrap || !textPreview || !csvWrap || !csvNote || !csvHead || !csvBody || !title || !fallback || !directOpenLink) {
    return;
  }

  const safeUrl = String(url || '').trim();
  if (!safeUrl) {
    showToast('Липсва линк за преглед.', 'warning');
    return;
  }

  const previewUrl = resolveAttachmentPreviewUrl(safeUrl);
  const extension = getFileExtensionFromUrl(safeUrl);
  const isCsvPreview = extension === 'csv';
  const isTextPreview = ['txt', 'csv', 'json'].includes(extension);

  title.textContent = label ? `Преглед: ${label}` : 'Преглед на файл';
  directOpenLink.setAttribute('href', safeUrl);
  fallback.classList.add('d-none');
  textWrap.classList.add('d-none');
  csvWrap.classList.add('d-none');
  csvNote.textContent = '';
  csvHead.innerHTML = '';
  csvBody.innerHTML = '';
  textPreview.textContent = '';
  frame.classList.remove('d-none');
  frame.src = 'about:blank';

  if (isCsvPreview) {
    csvWrap.classList.remove('d-none');
    frame.classList.add('d-none');
    void loadAttachmentCsvPreview(safeUrl, csvHead, csvBody, csvNote, fallback);
  } else if (isTextPreview) {
    textWrap.classList.remove('d-none');
    frame.classList.add('d-none');
    textPreview.textContent = 'Зареждане...';
    void loadAttachmentTextPreview(safeUrl, textPreview, fallback);
  } else {
    frame.src = previewUrl;
    frame.onload = () => {
      if (previewUrl !== safeUrl) {
        fallback.classList.add('d-none');
        return;
      }

      const currentExtension = getFileExtensionFromUrl(safeUrl);
      const likelyNonRenderable = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(currentExtension);
      fallback.classList.toggle('d-none', !likelyNonRenderable);
    };
    frame.onerror = () => {
      fallback.classList.remove('d-none');
    };
  }

  openModal(previewModal);
}

function closeDutyAttachmentPreview(container) {
  const previewModal = container.querySelector('#duty-attachment-preview-modal');
  const frame = container.querySelector('#duty-attachment-preview-frame');
  const textWrap = container.querySelector('#duty-attachment-preview-text-wrap');
  const textPreview = container.querySelector('#duty-attachment-preview-text');
  const csvWrap = container.querySelector('#duty-attachment-preview-csv-wrap');
  const csvNote = container.querySelector('#duty-attachment-preview-csv-note');
  const csvHead = container.querySelector('#duty-attachment-preview-csv-head');
  const csvBody = container.querySelector('#duty-attachment-preview-csv-body');
  const fallback = container.querySelector('#duty-attachment-preview-fallback');
  const directOpenLink = container.querySelector('#duty-attachment-preview-open');
  if (!previewModal || !frame || !textWrap || !textPreview || !csvWrap || !csvNote || !csvHead || !csvBody || !fallback || !directOpenLink) {
    return;
  }

  frame.src = 'about:blank';
  frame.classList.remove('d-none');
  textWrap.classList.add('d-none');
  csvWrap.classList.add('d-none');
  textPreview.textContent = '';
  csvNote.textContent = '';
  csvHead.innerHTML = '';
  csvBody.innerHTML = '';
  directOpenLink.setAttribute('href', '#');
  fallback.classList.add('d-none');
  closeModal(previewModal);
}

async function loadAttachmentCsvPreview(url, csvHeadElement, csvBodyElement, csvNoteElement, fallbackElement) {
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();
    const rows = parseAttachmentCsvRows(text);
    if (!rows.length) {
      csvHeadElement.innerHTML = '';
      csvBodyElement.innerHTML = '';
      csvNoteElement.textContent = 'Файлът е празен.';
      fallbackElement.classList.add('d-none');
      return;
    }

    const MAX_PREVIEW_ROWS = 200;
    const previewRows = rows.slice(0, MAX_PREVIEW_ROWS);
    const headerCells = previewRows[0] || [];
    const bodyRows = previewRows.slice(1);

    csvHeadElement.innerHTML = `
      <tr>${headerCells.map((cell) => `<th>${escapeHtml(cell)}</th>`).join('')}</tr>
    `;
    csvBodyElement.innerHTML = bodyRows
      .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`)
      .join('');

    if (rows.length > MAX_PREVIEW_ROWS) {
      csvNoteElement.textContent = `Показани са първите ${MAX_PREVIEW_ROWS} реда от общо ${rows.length}.`;
    } else {
      csvNoteElement.textContent = `Редове: ${rows.length}.`;
    }

    fallbackElement.classList.add('d-none');
  } catch {
    csvHeadElement.innerHTML = '';
    csvBodyElement.innerHTML = '';
    csvNoteElement.textContent = '';
    fallbackElement.classList.remove('d-none');
  }
}

function parseAttachmentCsvRows(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === ',') {
      row.push(cell);
      cell = '';
      continue;
    }

    if (!inQuotes && (char === '\n' || char === '\r')) {
      if (char === '\r' && next === '\n') {
        i += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      continue;
    }

    cell += char;
  }

  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

async function loadAttachmentTextPreview(url, targetElement, fallbackElement) {
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();
    targetElement.textContent = text || '(Празен файл)';
    fallbackElement.classList.add('d-none');
  } catch {
    targetElement.textContent = 'Неуспешно зареждане на текстов преглед.';
    fallbackElement.classList.remove('d-none');
  }
}

function resolveAttachmentPreviewUrl(url) {
  const extension = getFileExtensionFromUrl(url);
  if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension)) {
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
  }

  return url;
}

function getFileExtensionFromUrl(url) {
  const value = String(url || '').trim();
  if (!value) {
    return '';
  }

  try {
    const parsedUrl = new URL(value);
    const filename = parsedUrl.pathname.split('/').pop() || '';
    const extension = filename.includes('.') ? filename.split('.').pop() : '';
    return String(extension || '').toLowerCase();
  } catch {
    return '';
  }
}

function getFriendlySupabaseErrorMessage(error) {
  const rawMessage = String(error?.message || '').trim();
  const normalized = rawMessage.toLowerCase();

  const isRlsError =
    normalized.includes('row-level security') ||
    normalized.includes('violates row-level security policy') ||
    String(error?.code || '') === '42501';

  if (isRlsError && normalized.includes('duty_trains')) {
    return 'Нямаш права да свързваш влакове към повески. Свържи се с администратор.';
  }

  if (isRlsError && normalized.includes('duties')) {
    return 'Нямаш права да създаваш или редактираш повески. Свържи се с администратор.';
  }

  if (isRlsError) {
    return 'Достъпът е ограничен от права за сигурност (RLS).';
  }

  return rawMessage || 'Възникна неочаквана грешка.';
}

function openDutyProfileModal(container, dutyId) {
  const duty = dutiesState.allDuties.find((item) => item.id === dutyId);
  const content = container.querySelector('#duty-profile-content');
  const profileModal = container.querySelector('#duty-profile-modal');
  const profileDuplicateButton = container.querySelector('#duty-profile-duplicate');
  const profileEditButton = container.querySelector('#duty-profile-edit');

  if (!content || !profileModal) {
    return;
  }

  if (!duty) {
    profileModal.dataset.dutyId = '';
    if (profileEditButton) {
      profileEditButton.disabled = true;
    }
    if (profileDuplicateButton) {
      profileDuplicateButton.disabled = true;
    }
    content.innerHTML = '<p class="text-secondary mb-0">Няма данни за тази повеска.</p>';
    openModal(profileModal);
    return;
  }

  profileModal.dataset.dutyId = duty.id;
  if (profileEditButton) {
    profileEditButton.disabled = false;
  }
  if (profileDuplicateButton) {
    profileDuplicateButton.disabled = false;
  }

  const scheduleKeyNames = getScheduleKeyNames(duty);
  const trainNumbers = getTrainNumbersOrdered(duty);
  const attachmentEntries = parseAttachmentEntries(duty?.duty_files);

  content.innerHTML = buildDutyProfileContent({
    duty,
    scheduleKeyNames,
    trainNumbers,
    attachmentEntries,
    escapeHtml,
    intervalToTimeInput,
    formatInterval
  });

  openModal(profileModal);
}

function openDutyEditModal(container, dutyId) {
  const duty = dutiesState.allDuties.find((item) => item.id === dutyId);
  if (!duty) {
    showToast('Не е намерена повеска за редакция.', 'warning');
    return;
  }

  populateDutyForm(container, {
    id: duty.id,
    name: duty.name || '',
    dutyTypeId: duty.duty_type_id || '',
    scheduleKeyIds: getScheduleKeyIds(duty),
    trainIds: getTrainIdsOrdered(duty),
    startTime: normalizeTime(duty.start_time),
    endTime: normalizeTime(duty.end_time),
    secondDay: Boolean(duty.second_day),
    breakStartTime: duty.break_start_time || '00:00:00',
    breakEndTime: duty.break_end_time || '00:00:00',
    notes: duty.notes || '',
    dutyFiles: duty.duty_files || ''
  });

  openModal(container.querySelector('#duty-modal'));
}

function openDutyDuplicateModal(container, dutyId) {
  const duty = dutiesState.allDuties.find((item) => item.id === dutyId);
  if (!duty) {
    showToast('Не е намерена повеска за копиране.', 'warning');
    return;
  }

  populateDutyForm(container, {
    id: '',
    name: duty.name ? `${duty.name} (копие)` : '',
    dutyTypeId: duty.duty_type_id || '',
    scheduleKeyIds: getScheduleKeyIds(duty),
    trainIds: getTrainIdsOrdered(duty),
    startTime: normalizeTime(duty.start_time),
    endTime: normalizeTime(duty.end_time),
    secondDay: Boolean(duty.second_day),
    breakStartTime: duty.break_start_time || '00:00:00',
    breakEndTime: duty.break_end_time || '00:00:00',
    notes: duty.notes || '',
    dutyFiles: duty.duty_files || ''
  });

  container.querySelector('#duty-id').value = '';
  container.querySelector('#duty-form-title').textContent = 'Нова Повеска (копие)';
  container.querySelector('#duty-save-btn').textContent = 'Създай';

  openModal(container.querySelector('#duty-modal'));
}

function getScheduleKeyNames(duty) {
  const rows = Array.isArray(duty?.schedule_key_duties)
    ? duty.schedule_key_duties
    : duty?.schedule_key_duties
      ? [duty.schedule_key_duties]
      : [];

  const names = rows
    .map((row) => row?.schedule_keys?.name)
    .filter(Boolean);

  return [...new Set(names)];
}

function getScheduleKeyIds(duty) {
  const rows = Array.isArray(duty?.schedule_key_duties)
    ? duty.schedule_key_duties
    : duty?.schedule_key_duties
      ? [duty.schedule_key_duties]
      : [];

  const ids = rows
    .map((row) => row?.schedule_key_id)
    .filter(Boolean);

  return [...new Set(ids)];
}

function getTrainNumbersOrdered(duty) {
  const rows = Array.isArray(duty?.duty_trains)
    ? duty.duty_trains
    : duty?.duty_trains
      ? [duty.duty_trains]
      : [];

  return rows
    .map((row) => ({
      number: row?.trains?.number,
      sequenceOrder: Number.isFinite(Number(row?.sequence_order)) ? Number(row.sequence_order) : Number.MAX_SAFE_INTEGER
    }))
    .filter((row) => Boolean(row.number))
    .sort((left, right) => left.sequenceOrder - right.sequenceOrder)
    .map((row) => row.number)
    .filter((value, index, all) => all.indexOf(value) === index);
}

function getTrainIdsOrdered(duty) {
  const rows = Array.isArray(duty?.duty_trains)
    ? duty.duty_trains
    : duty?.duty_trains
      ? [duty.duty_trains]
      : [];

  return rows
    .map((row) => ({
      id: row?.train_id,
      sequenceOrder: Number.isFinite(Number(row?.sequence_order)) ? Number(row.sequence_order) : Number.MAX_SAFE_INTEGER
    }))
    .filter((row) => Boolean(row.id))
    .sort((left, right) => left.sequenceOrder - right.sequenceOrder)
    .map((row) => row.id)
    .filter((value, index, all) => all.indexOf(value) === index);
}

function normalizeTime(value) {
  if (!value) {
    return '';
  }

  return String(value).slice(0, 5);
}

function getDutyField(container, ...selectors) {
  for (const selector of selectors) {
    const field = container.querySelector(selector);
    if (field) {
      return field;
    }
  }

  return null;
}

function setDutyFieldValue(container, value, ...selectors) {
  const field = getDutyField(container, ...selectors);
  if (!field) {
    return;
  }

  field.value = value;
}

function formatInterval(value) {
  if (!value) {
    return '-';
  }

  return String(value).replace('.000000', '');
}
