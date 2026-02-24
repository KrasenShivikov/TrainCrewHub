import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { calculateShiftDurationMinutes } from '../../../utils/dutyTime.js';
import { closeModal } from './helpers.js';
import { dutiesState } from './state.js';
import { loadDuties } from './table.js';
import { getDutyField } from './dutiesFormFields.js';
import {
  dedupeAttachmentEntries,
  deriveAttachmentLabel,
  extractDutyAttachmentObjectPath,
  parseAttachmentEntries,
  removeDutyAttachmentObjects,
  serializeAttachmentEntries,
  updateCurrentAttachmentsPreview,
  uploadDutyAttachments
} from './dutiesAttachments.js';
import { MAX_DUTY_FILE_ITEMS } from './dutiesConstants.js';
import { getFriendlySupabaseErrorMessage } from './dutiesOptions.js';
import { resetDutyForm } from './dutiesForms.js';

function hasAffectedRows(rows) {
  return Array.isArray(rows) && rows.length > 0;
}

export async function saveDuty(container) {
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
  let affectedRows = null;
  let dutyId = editingId || null;

  if (editingId) {
    ({ data: affectedRows, error } = await supabase
      .from('duties')
      .update(payload)
      .eq('id', editingId)
      .select('id'));
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
    showToast(getFriendlySupabaseErrorMessage(error), 'error');
    return;
  }

  if (editingId && !hasAffectedRows(affectedRows)) {
    if (uploadedObjectPaths.length) {
      await removeDutyAttachmentObjects(uploadedObjectPaths);
    }
    showToast('Нямаш права да редактираш тази повеска.', 'warning');
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

export async function deleteDuty(id, container) {
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

  const { data: affectedRows, error } = await supabase
    .from('duties')
    .delete()
    .eq('id', id)
    .select('id');
  deleteButton.disabled = false;
  deleteButton.innerHTML = originalDeleteText;

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  if (!hasAffectedRows(affectedRows)) {
    showToast('Нямаш права да изтриеш тази повеска.', 'warning');
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
  const normalizedTarget = [...new Set((scheduleKeyIds || []).map(String).filter(Boolean))].sort();
  const { data: existingRows, error: existingError } = await supabase
    .from('schedule_key_duties')
    .select('schedule_key_id')
    .eq('duty_id', dutyId);

  if (existingError) {
    return existingError;
  }

  const normalizedExisting = [...new Set((existingRows || []).map((row) => String(row?.schedule_key_id || '')).filter(Boolean))].sort();
  const isSame =
    normalizedExisting.length === normalizedTarget.length &&
    normalizedExisting.every((value, index) => value === normalizedTarget[index]);

  if (isSame) {
    return null;
  }

  const { error: clearError } = await supabase
    .from('schedule_key_duties')
    .delete()
    .eq('duty_id', dutyId);

  if (clearError) {
    return clearError;
  }

  const payload = normalizedTarget.map((scheduleKeyId) => ({
    duty_id: dutyId,
    schedule_key_id: scheduleKeyId
  }));

  const { error: insertError } = await supabase.from('schedule_key_duties').insert(payload);
  return insertError;
}

async function syncDutyTrains(dutyId, trainIds) {
  const normalizedTarget = [...new Set((trainIds || []).map(String).filter(Boolean))];
  const { data: existingRows, error: existingError } = await supabase
    .from('duty_trains')
    .select('train_id, sequence_order')
    .eq('duty_id', dutyId)
    .order('sequence_order', { ascending: true });

  if (existingError) {
    return existingError;
  }

  const normalizedExisting = (existingRows || [])
    .map((row) => String(row?.train_id || ''))
    .filter(Boolean);

  const isSame =
    normalizedExisting.length === normalizedTarget.length &&
    normalizedExisting.every((value, index) => value === normalizedTarget[index]);

  if (isSame) {
    return null;
  }

  const { error: clearError } = await supabase
    .from('duty_trains')
    .delete()
    .eq('duty_id', dutyId);

  if (clearError) {
    return clearError;
  }

  if (!normalizedTarget.length) {
    return null;
  }

  const payload = normalizedTarget.map((trainId, index) => ({
    duty_id: dutyId,
    train_id: trainId,
    sequence_order: index + 1
  }));

  const { error: insertError } = await supabase.from('duty_trains').insert(payload);
  return insertError;
}

export function updateAttachmentsLabelDraft(container, index, label) {
  const draftInput = container.querySelector('#duty-draft-attachments');
  const entries = parseAttachmentEntries(draftInput?.value || '');
  if (!entries[index]) {
    return;
  }

  entries[index].label = label;
  if (draftInput) {
    draftInput.value = serializeAttachmentEntries(entries) || '';
  }
}

export function removeAttachmentDraftItem(container, index) {
  const draftInput = container.querySelector('#duty-draft-attachments');
  const entries = parseAttachmentEntries(draftInput?.value || '');
  if (!entries[index]) {
    return;
  }

  entries.splice(index, 1);
  updateCurrentAttachmentsPreview(container, entries);
}
