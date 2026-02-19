import { calculateShiftDurationMinutes } from '../../../utils/dutyTime.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { closeModal, getScheduleKeyIdFromUrl, getScheduleKeyNameFromUrl, openModal } from './helpers.js';
import { scheduleKeyDutiesState } from './state.js';
import { loadDutiesForScheduleKey, renderScheduleKeyDutiesTable } from './table.js';
import { getDutyField, getScheduleKeyIds } from './scheduleKeyDutiesForms.js';

export async function initScheduleKeyContext(container) {
  scheduleKeyDutiesState.scheduleKeyId = getScheduleKeyIdFromUrl();
  scheduleKeyDutiesState.scheduleKeyName = getScheduleKeyNameFromUrl();

  if (!scheduleKeyDutiesState.scheduleKeyId) {
    renderScheduleKeyDutiesTable(container, 'Няма избран Ключ-График. Върни се и избери запис.');
    container.querySelector('#open-create-schedule-key-duty').classList.add('d-none');
    container.querySelector('#open-attach-schedule-key-duty').classList.add('d-none');
    return;
  }

  if (!scheduleKeyDutiesState.scheduleKeyName) {
    const { data, error } = await supabase
      .from('schedule_keys')
      .select('name')
      .eq('id', scheduleKeyDutiesState.scheduleKeyId)
      .single();

    if (error) {
      showToast(error.message, 'error');
    }

    scheduleKeyDutiesState.scheduleKeyName = data?.name || scheduleKeyDutiesState.scheduleKeyId;
  }

  container.querySelector('#schedule-key-duties-title').textContent = scheduleKeyDutiesState.scheduleKeyName;
}

export async function loadAttachDutyCatalog(container) {
  const list = container.querySelector('#schedule-key-duty-attach-list');
  const emptyState = container.querySelector('#schedule-key-duty-attach-empty');

  if (!scheduleKeyDutiesState.scheduleKeyId) {
    scheduleKeyDutiesState.attachCatalog = [];
    if (list) list.innerHTML = '';
    if (emptyState) {
      emptyState.textContent = 'Няма избран ключ-график.';
      emptyState.classList.remove('d-none');
    }
    return;
  }

  if (list) {
    list.innerHTML = '<div class="list-group-item text-secondary">Зареждане...</div>';
  }
  if (emptyState) emptyState.classList.add('d-none');

  const excludedDutyIds = new Set((scheduleKeyDutiesState.duties || []).map((item) => item?.id).filter(Boolean));

  const { data, error } = await supabase
    .from('duties')
    .select('id, name, start_time, end_time, duty_type_id, duty_types(name)')
    .order('name', { ascending: true });

  if (error) {
    scheduleKeyDutiesState.attachCatalog = [];
    if (list) list.innerHTML = '';
    if (emptyState) {
      emptyState.textContent = 'Грешка при зареждане на повеските.';
      emptyState.classList.remove('d-none');
    }
    showToast(error.message, 'error');
    return;
  }

  scheduleKeyDutiesState.attachCatalog = (data || []).filter(
    (item) => item?.id && !excludedDutyIds.has(item.id)
  );
}

export async function attachExistingDutyToScheduleKey(container, dutyId, buttonEl) {
  if (!scheduleKeyDutiesState.scheduleKeyId || !dutyId) {
    showToast('Избери повеска за прикачване.', 'warning');
    return;
  }

  const button = buttonEl;
  const originalText = button?.innerHTML || '';
  if (button) {
    button.disabled = true;
    button.innerHTML =
      '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Прикачане...';
  }

  const { error } = await supabase
    .from('schedule_key_duties')
    .insert({
      duty_id: dutyId,
      schedule_key_id: scheduleKeyDutiesState.scheduleKeyId
    });

  if (button) {
    button.disabled = false;
    button.innerHTML = originalText;
  }

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  scheduleKeyDutiesState.attachCatalog = (scheduleKeyDutiesState.attachCatalog || []).filter(
    (item) => item?.id !== dutyId
  );

  showToast('Повеската е прикачена към ключ-графика.', 'success');
  await loadDutiesForScheduleKey(container);
}

export async function saveDutyForScheduleKey(container, { resetCreateDutyForm } = {}) {
  const nameInput = container.querySelector('#schedule-key-duty-create-name');
  const dutyTypeInput = container.querySelector('#schedule-key-duty-create-type');
  const scheduleKeysInput = container.querySelector('#schedule-key-duty-create-schedule-keys');
  const startInput = getDutyField(
    container,
    '#schedule-key-duty-create-start',
    '#schedule-key-duty-create-start-time'
  );
  const endInput = getDutyField(
    container,
    '#schedule-key-duty-create-end',
    '#schedule-key-duty-create-end-time'
  );
  const secondDayInput = container.querySelector('#schedule-key-duty-create-second-day');
  const breakStartInput = getDutyField(
    container,
    '#schedule-key-duty-create-break-start',
    '#schedule-key-duty-create-break-start-time'
  );
  const breakEndInput = getDutyField(
    container,
    '#schedule-key-duty-create-break-end',
    '#schedule-key-duty-create-break-end-time'
  );
  const trainsInput = container.querySelector('#schedule-key-duty-create-trains');
  const saveButton = container.querySelector('#schedule-key-duty-create-save');

  const name = nameInput.value.trim();
  const dutyTypeId = dutyTypeInput.value || null;
  const selectedScheduleKeyIds = Array.from(scheduleKeysInput.selectedOptions || [])
    .map((option) => option.value)
    .filter(Boolean);
  const primaryScheduleKeyId = selectedScheduleKeyIds[0] || null;
  const startTime = startInput?.value || '';
  const endTime = endInput?.value || '';
  const secondDay = secondDayInput.checked;
  const breakStartTime = breakStartInput?.value || '00:00';
  const breakEndTime = breakEndInput?.value || '00:00';
  const notes = container.querySelector('#schedule-key-duty-create-notes').value.trim() || null;
  const selectedTrainIds = Array.from(trainsInput.selectedOptions || [])
    .map((option) => option.value)
    .filter(Boolean);

  if (!scheduleKeyDutiesState.scheduleKeyId || !name || !dutyTypeId || !startTime || !endTime) {
    showToast('Моля, попълни всички полета за повеската.', 'warning');
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

  const originalButtonText = saveButton.innerHTML;
  saveButton.disabled = true;
  saveButton.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Добавяне...';

  const { data: userData } = await supabase.auth.getUser();
  const createdFrom = userData?.user?.id ?? userData?.user?.email ?? 'web_app';
  const maxDisplayOrder = scheduleKeyDutiesState.duties.reduce(
    (maxValue, item) => Math.max(maxValue, Number(item.display_order) || 0),
    0
  );

  const { data: insertedDuty, error } = await supabase
    .from('duties')
    .insert({
      schedule_key_id: primaryScheduleKeyId,
      duty_type_id: dutyTypeId,
      name,
      start_time: startTime,
      end_time: endTime,
      second_day: secondDay,
      break_start_time: breakStartTime,
      break_end_time: breakEndTime,
      notes,
      created_from: createdFrom,
      display_order: maxDisplayOrder + 1
    })
    .select('id')
    .single();

  const mappingError = error
    ? null
    : await syncDutyScheduleKeys(insertedDuty?.id, selectedScheduleKeyIds);
  const trainMappingError = error || mappingError
    ? null
    : await syncDutyTrains(insertedDuty?.id, selectedTrainIds);

  saveButton.disabled = false;
  saveButton.innerHTML = originalButtonText;

  if (error || mappingError || trainMappingError) {
    showToast((error || mappingError || trainMappingError).message, 'error');
    return;
  }

  scheduleKeyDutiesState.lastCreatedDutyTypeId = dutyTypeId;
  scheduleKeyDutiesState.lastCreatedScheduleKeyIds = [...selectedScheduleKeyIds];

  closeModal(container.querySelector('#schedule-key-duty-create-modal'));
  if (typeof resetCreateDutyForm === 'function') {
    resetCreateDutyForm(container);
  }
  showToast('Повеската е добавена към Ключ-График.', 'success');
  await loadDutiesForScheduleKey(container);
}

export async function saveEditedDutyForScheduleKey(container) {
  const dutyId = container.querySelector('#schedule-key-duty-edit-id').value;
  const name = container.querySelector('#schedule-key-duty-edit-name').value.trim();
  const dutyTypeId = container.querySelector('#schedule-key-duty-edit-type').value || null;
  const selectedScheduleKeyIds = Array.from(
    container.querySelector('#schedule-key-duty-edit-schedule-keys').selectedOptions || []
  )
    .map((option) => option.value)
    .filter(Boolean);
  const primaryScheduleKeyId = selectedScheduleKeyIds[0] || null;
  const startTime = getDutyField(
    container,
    '#schedule-key-duty-edit-start',
    '#schedule-key-duty-edit-start-time'
  )?.value || '';
  const endTime = getDutyField(
    container,
    '#schedule-key-duty-edit-end',
    '#schedule-key-duty-edit-end-time'
  )?.value || '';
  const secondDay = container.querySelector('#schedule-key-duty-edit-second-day').checked;
  const breakStartTime = getDutyField(
    container,
    '#schedule-key-duty-edit-break-start',
    '#schedule-key-duty-edit-break-start-time'
  )?.value || '00:00';
  const breakEndTime = getDutyField(
    container,
    '#schedule-key-duty-edit-break-end',
    '#schedule-key-duty-edit-break-end-time'
  )?.value || '00:00';
  const notes = container.querySelector('#schedule-key-duty-edit-notes').value.trim() || null;
  const selectedTrainIds = Array.from(
    container.querySelector('#schedule-key-duty-edit-trains').selectedOptions || []
  )
    .map((option) => option.value)
    .filter(Boolean);
  const saveButton = container.querySelector('#schedule-key-duty-edit-save');

  if (!dutyId || !name || !dutyTypeId || !startTime || !endTime) {
    showToast('Моля, попълни всички полета за повеската.', 'warning');
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
  saveButton.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';

  const { error } = await supabase
    .from('duties')
    .update({
      name,
      duty_type_id: dutyTypeId,
      schedule_key_id: primaryScheduleKeyId,
      start_time: startTime,
      end_time: endTime,
      second_day: secondDay,
      break_start_time: breakStartTime,
      break_end_time: breakEndTime,
      notes
    })
    .eq('id', dutyId);

  const mappingError = error ? null : await syncDutyScheduleKeys(dutyId, selectedScheduleKeyIds);
  const trainMappingError = error || mappingError ? null : await syncDutyTrains(dutyId, selectedTrainIds);

  saveButton.disabled = false;
  saveButton.innerHTML = originalText;

  if (error || mappingError || trainMappingError) {
    showToast((error || mappingError || trainMappingError).message, 'error');
    return;
  }

  closeModal(container.querySelector('#schedule-key-duty-edit-modal'));
  showToast('Повеската е обновена.', 'success');
  await loadDutiesForScheduleKey(container);
}

export async function syncDutyScheduleKeys(dutyId, scheduleKeyIds) {
  if (!dutyId) {
    return { message: 'Липсва идентификатор на повеска за запис на ключ-графици.' };
  }

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

export async function syncDutyTrains(dutyId, trainIds) {
  if (!dutyId) {
    return { message: 'Липсва идентификатор на повеска за запис на влакове.' };
  }

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

export function openDeleteDutyModal(container, dutyId) {
  const modal = container.querySelector('#schedule-key-duty-delete-modal');
  const title = container.querySelector('#schedule-key-duty-delete-title');
  const message = container.querySelector('#schedule-key-duty-delete-message');
  const confirmButton = container.querySelector('#schedule-key-duty-delete-confirm');

  const duty = scheduleKeyDutiesState.duties.find((item) => item.id === dutyId);
  const currentScheduleKeyId = scheduleKeyDutiesState.scheduleKeyId;
  const scheduleKeyIds = duty ? getScheduleKeyIds(duty) : [];
  const remainingScheduleKeyIds = scheduleKeyIds.filter((id) => id !== currentScheduleKeyId);

  const shouldDelete = Boolean(duty?.schedule_key_id === currentScheduleKeyId && remainingScheduleKeyIds.length === 0);
  const newPrimaryScheduleKeyId = duty?.schedule_key_id === currentScheduleKeyId
    ? (remainingScheduleKeyIds[0] || '')
    : '';

  if (modal) {
    modal.dataset.action = shouldDelete ? 'delete' : 'detach';
    modal.dataset.newPrimaryScheduleKeyId = newPrimaryScheduleKeyId;
  }

  if (title) {
    title.textContent = shouldDelete ? 'Потвърди изтриване' : 'Потвърди разкачане';
  }

  if (message) {
    message.textContent = shouldDelete
      ? 'Сигурен ли си, че искаш да изтриеш тази повеска?'
      : 'Сигурен ли си, че искаш да разкачиш тази повеска от текущия ключ-график?';
  }

  if (confirmButton) {
    confirmButton.textContent = shouldDelete ? 'Изтрий' : 'Разкачи';
    confirmButton.classList.toggle('btn-danger', shouldDelete);
    confirmButton.classList.toggle('btn-warning', !shouldDelete);
  }

  container.querySelector('#schedule-key-duty-delete-id').value = dutyId;
  openModal(modal);
}

export async function confirmDeleteDutyForScheduleKey(container, dutyId) {
  const deleteButton = container.querySelector('#schedule-key-duty-delete-confirm');
  const modal = container.querySelector('#schedule-key-duty-delete-modal');
  const originalText = deleteButton.innerHTML;
  const action = modal?.dataset?.action || 'detach';
  const newPrimaryScheduleKeyId = modal?.dataset?.newPrimaryScheduleKeyId || '';

  const duty = scheduleKeyDutiesState.duties.find((item) => item.id === dutyId);
  const currentScheduleKeyId = scheduleKeyDutiesState.scheduleKeyId;

  deleteButton.disabled = true;
  deleteButton.innerHTML = action === 'delete'
    ? '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...'
    : '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Разкачане...';

  let error = null;

  if (action === 'delete') {
    const { error: clearMappingError } = await supabase
      .from('schedule_key_duties')
      .delete()
      .eq('duty_id', dutyId);

    if (clearMappingError) {
      error = clearMappingError;
    }

    if (!error) {
      const result = await supabase
        .from('duties')
        .delete()
        .eq('id', dutyId)
        .eq('schedule_key_id', currentScheduleKeyId);

      error = result.error;
    }
  } else {
    const { error: detachError } = await supabase
      .from('schedule_key_duties')
      .delete()
      .eq('duty_id', dutyId)
      .eq('schedule_key_id', currentScheduleKeyId);

    if (detachError) {
      error = detachError;
    }

    if (!error && duty?.schedule_key_id === currentScheduleKeyId) {
      if (!newPrimaryScheduleKeyId) {
        error = { message: 'Не е намерен друг ключ-график за прехвърляне на повеската.' };
      } else {
        const result = await supabase
          .from('duties')
          .update({ schedule_key_id: newPrimaryScheduleKeyId })
          .eq('id', dutyId);

        error = result.error;
      }
    }
  }

  deleteButton.disabled = false;
  deleteButton.innerHTML = originalText;
  if (deleteButton) {
    deleteButton.classList.remove('btn-warning');
    deleteButton.classList.add('btn-danger');
  }

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  closeModal(container.querySelector('#schedule-key-duty-delete-modal'));
  showToast(action === 'delete' ? 'Повеската е изтрита.' : 'Повеската е разкачена от ключ-графика.', 'success');
  await loadDutiesForScheduleKey(container);
}
