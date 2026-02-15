import { loadHtml } from '../../../utils/loadHtml.js';
import {
  calculateShiftDurationMinutes,
  intervalToTimeInput
} from '../../../utils/dutyTime.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import {
  closeModal,
  escapeHtml,
  getScheduleKeyIdFromUrl,
  getScheduleKeyNameFromUrl,
  openModal,
  setupModalEscapeHandler
} from './helpers.js';
import { scheduleKeyDutiesState } from './state.js';
import {
  loadDutiesForScheduleKey,
  persistScheduleKeyDutiesOrder,
  renderScheduleKeyDutiesTable
} from './table.js';

export async function renderScheduleKeyDutiesPage(container) {
  const pageHtml = await loadHtml('../schedule-key-duties.html', import.meta.url);
  container.innerHTML = pageHtml;
  attachScheduleKeyDutiesHandlers(container);
  await loadDutyTypeOptions(container);
  await loadScheduleKeyOptions(container);
  await loadTrainOptions(container);
  await initScheduleKeyContext(container);
}

function attachScheduleKeyDutiesHandlers(container) {
  const openCreateButton = container.querySelector('#open-create-schedule-key-duty');
  const createModal = container.querySelector('#schedule-key-duty-create-modal');
  const createForm = container.querySelector('#schedule-key-duty-create-form');
  const createModalCloseButton = container.querySelector('#schedule-key-duty-create-modal-close');
  const createCancelButton = container.querySelector('#schedule-key-duty-create-cancel');
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

  openCreateButton?.addEventListener('click', () => {
    resetCreateDutyForm(container);
    openModal(createModal);
  });

  createModalCloseButton?.addEventListener('click', () => {
    closeModal(createModal);
  });

  createCancelButton?.addEventListener('click', () => {
    closeModal(createModal);
  });

  createForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveDutyForScheduleKey(container);
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

  setupModalEscapeHandler('schedule-key-duties', [
    profileModal,
    deleteModal,
    editModal,
    createModal
  ]);

  dutiesBody?.addEventListener('dragstart', (event) => {
    const row = event.target.closest('tr[data-duty-id]');
    if (!row) {
      return;
    }

    scheduleKeyDutiesState.draggedDutyId = row.getAttribute('data-duty-id');
    row.classList.add('table-active');
  });

  dutiesBody?.addEventListener('dragend', (event) => {
    const row = event.target.closest('tr[data-duty-id]');
    if (row) {
      row.classList.remove('table-active');
    }
    scheduleKeyDutiesState.draggedDutyId = null;
  });

  dutiesBody?.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  dutiesBody?.addEventListener('drop', async (event) => {
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

  dutiesBody?.addEventListener('click', async (event) => {
    const actionButton = event.target.closest('button[data-duty-action]');
    if (!actionButton) {
      return;
    }

    const action = actionButton.getAttribute('data-duty-action');
    if (action === 'profile') {
      const dutyId = actionButton.getAttribute('data-id');
      openDutyProfileModal(container, dutyId);
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

async function initScheduleKeyContext(container) {
  scheduleKeyDutiesState.scheduleKeyId = getScheduleKeyIdFromUrl();
  scheduleKeyDutiesState.scheduleKeyName = getScheduleKeyNameFromUrl();

  if (!scheduleKeyDutiesState.scheduleKeyId) {
    renderScheduleKeyDutiesTable(container, 'Няма избран Ключ-График. Върни се и избери запис.');
    container.querySelector('#open-create-schedule-key-duty').classList.add('d-none');
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
  resetCreateDutyForm(container);
  await loadDutiesForScheduleKey(container);
}

async function loadDutyTypeOptions(container) {
  const createSelect = container.querySelector('#schedule-key-duty-create-type');
  const editSelect = container.querySelector('#schedule-key-duty-edit-type');

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

  createSelect.innerHTML = '<option value="">Избери тип</option>' + options;
  editSelect.innerHTML = '<option value="">Избери тип</option>' + options;
}

async function loadScheduleKeyOptions(container) {
  const createSelect = container.querySelector('#schedule-key-duty-create-schedule-keys');
  const editSelect = container.querySelector('#schedule-key-duty-edit-schedule-keys');

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

  createSelect.innerHTML = options;
  editSelect.innerHTML = options;
}

async function loadTrainOptions(container) {
  const createSelect = container.querySelector('#schedule-key-duty-create-trains');
  const editSelect = container.querySelector('#schedule-key-duty-edit-trains');

  const { data, error } = await supabase
    .from('trains')
    .select('id, number, origin_station, destination_station')
    .order('number', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  const options = (data || [])
    .map((item) => {
      const route = `${item.origin_station || '-'} - ${item.destination_station || '-'}`;
      return `<option value="${item.id}">${escapeHtml(item.number || '-')} (${escapeHtml(route)})</option>`;
    })
    .join('');

  if (createSelect) createSelect.innerHTML = options;
  if (editSelect) editSelect.innerHTML = options;
}

async function saveDutyForScheduleKey(container) {
  const nameInput = container.querySelector('#schedule-key-duty-create-name');
  const dutyTypeInput = container.querySelector('#schedule-key-duty-create-type');
  const scheduleKeysInput = container.querySelector('#schedule-key-duty-create-schedule-keys');
  const startInput = container.querySelector('#schedule-key-duty-create-start');
  const endInput = container.querySelector('#schedule-key-duty-create-end');
  const secondDayInput = container.querySelector('#schedule-key-duty-create-second-day');
  const breakStartInput = container.querySelector('#schedule-key-duty-create-break-start');
  const breakEndInput = container.querySelector('#schedule-key-duty-create-break-end');
  const trainsInput = container.querySelector('#schedule-key-duty-create-trains');
  const saveButton = container.querySelector('#schedule-key-duty-create-save');

  const name = nameInput.value.trim();
  const dutyTypeId = dutyTypeInput.value || null;
  const selectedScheduleKeyIds = Array.from(scheduleKeysInput.selectedOptions || [])
    .map((option) => option.value)
    .filter(Boolean);
  const primaryScheduleKeyId = selectedScheduleKeyIds[0] || null;
  const startTime = startInput.value;
  const endTime = endInput.value;
  const secondDay = secondDayInput.checked;
  const breakStartTime = breakStartInput.value;
  const breakEndTime = breakEndInput.value;
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
  saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Добавяне...';

  const { data: userData } = await supabase.auth.getUser();
  const createdFrom = userData?.user?.email ?? 'web_app';
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
  resetCreateDutyForm(container);
  showToast('Повеската е добавена към Ключ-График.', 'success');
  await loadDutiesForScheduleKey(container);
}

function openEditDutyModal(container, dutyId) {
  const duty = scheduleKeyDutiesState.duties.find((item) => item.id === dutyId);
  if (!duty) {
    showToast('Повеската не е намерена.', 'warning');
    return;
  }

  container.querySelector('#schedule-key-duty-edit-id').value = duty.id;
  container.querySelector('#schedule-key-duty-edit-name').value = duty.name ?? '';
  container.querySelector('#schedule-key-duty-edit-type').value = duty.duty_type_id ?? '';
  const scheduleKeysSelect = container.querySelector('#schedule-key-duty-edit-schedule-keys');
  const selectedScheduleKeyIds = getScheduleKeyIds(duty);
  Array.from(scheduleKeysSelect.options).forEach((option) => {
    option.selected = selectedScheduleKeyIds.includes(option.value);
  });
  const trainsSelect = container.querySelector('#schedule-key-duty-edit-trains');
  const selectedTrainIds = getTrainIdsOrdered(duty);
  Array.from(trainsSelect.options).forEach((option) => {
    option.selected = selectedTrainIds.includes(option.value);
  });
  container.querySelector('#schedule-key-duty-edit-start').value = (duty.start_time || '').slice(0, 5);
  container.querySelector('#schedule-key-duty-edit-end').value = (duty.end_time || '').slice(0, 5);
  container.querySelector('#schedule-key-duty-edit-second-day').checked = Boolean(duty.second_day);
  container.querySelector('#schedule-key-duty-edit-break-start').value = intervalToTimeInput(duty.break_start_time);
  container.querySelector('#schedule-key-duty-edit-break-end').value = intervalToTimeInput(duty.break_end_time);
  openModal(container.querySelector('#schedule-key-duty-edit-modal'));
}

function resetCreateDutyForm(container) {
  container.querySelector('#schedule-key-duty-create-name').value = '';
  container.querySelector('#schedule-key-duty-create-type').value =
    scheduleKeyDutiesState.lastCreatedDutyTypeId || '';

  const rememberedScheduleKeyIds = scheduleKeyDutiesState.lastCreatedScheduleKeyIds?.length
    ? scheduleKeyDutiesState.lastCreatedScheduleKeyIds
    : [scheduleKeyDutiesState.scheduleKeyId];

  const scheduleKeysSelect = container.querySelector('#schedule-key-duty-create-schedule-keys');
  Array.from(scheduleKeysSelect.options).forEach((option) => {
    option.selected = rememberedScheduleKeyIds.includes(option.value);
  });

  container.querySelector('#schedule-key-duty-create-start').value = '';
  container.querySelector('#schedule-key-duty-create-end').value = '';
  container.querySelector('#schedule-key-duty-create-second-day').checked = false;
  container.querySelector('#schedule-key-duty-create-break-start').value = '00:00';
  container.querySelector('#schedule-key-duty-create-break-end').value = '00:00';
  const trainsSelect = container.querySelector('#schedule-key-duty-create-trains');
  Array.from(trainsSelect.options).forEach((option) => {
    option.selected = false;
  });
}

async function saveEditedDutyForScheduleKey(container) {
  const dutyId = container.querySelector('#schedule-key-duty-edit-id').value;
  const name = container.querySelector('#schedule-key-duty-edit-name').value.trim();
  const dutyTypeId = container.querySelector('#schedule-key-duty-edit-type').value || null;
  const selectedScheduleKeyIds = Array.from(
    container.querySelector('#schedule-key-duty-edit-schedule-keys').selectedOptions || []
  )
    .map((option) => option.value)
    .filter(Boolean);
  const primaryScheduleKeyId = selectedScheduleKeyIds[0] || null;
  const startTime = container.querySelector('#schedule-key-duty-edit-start').value;
  const endTime = container.querySelector('#schedule-key-duty-edit-end').value;
  const secondDay = container.querySelector('#schedule-key-duty-edit-second-day').checked;
  const breakStartTime = container.querySelector('#schedule-key-duty-edit-break-start').value;
  const breakEndTime = container.querySelector('#schedule-key-duty-edit-break-end').value;
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
  saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';

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
      break_end_time: breakEndTime
    })
    .eq('id', dutyId)
    .eq('schedule_key_id', scheduleKeyDutiesState.scheduleKeyId);

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

async function syncDutyScheduleKeys(dutyId, scheduleKeyIds) {
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

async function syncDutyTrains(dutyId, trainIds) {
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

function openDutyProfileModal(container, dutyId) {
  const duty = scheduleKeyDutiesState.duties.find((item) => item.id === dutyId);
  const content = container.querySelector('#schedule-key-duty-profile-content');
  const modal = container.querySelector('#schedule-key-duty-profile-modal');

  if (!content || !modal) {
    return;
  }

  if (!duty) {
    content.innerHTML = '<p class="text-secondary mb-0">Няма данни за тази повеска.</p>';
    openModal(modal);
    return;
  }

  const scheduleKeyNames = getScheduleKeyNames(duty);
  const trainNumbers = getTrainNumbersOrdered(duty);

  content.innerHTML = `
    <div class="row g-3">
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Наименование</div>
          <div class="fw-semibold">${escapeHtml(duty.name || '-')}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Тип</div>
          <div class="fw-semibold">${escapeHtml(duty?.duty_types?.name || '-')}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Ключ-графици</div>
          <div class="fw-semibold">${escapeHtml(scheduleKeyNames.length ? scheduleKeyNames.join(', ') : '-')}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Влакове</div>
          <div class="fw-semibold">${escapeHtml(trainNumbers.length ? trainNumbers.join(', ') : '-')}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Начало</div>
          <div class="fw-semibold">${escapeHtml((duty.start_time || '-').slice(0, 5) || '-')}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Край</div>
          <div class="fw-semibold">${escapeHtml((duty.end_time || '-').slice(0, 5) || '-')}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Втори ден</div>
          <div class="fw-semibold">${duty.second_day ? 'Да' : 'Не'}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Начало на прекъсване</div>
          <div class="fw-semibold">${escapeHtml((intervalToTimeInput(duty.break_start_time || '00:00:00') || '-').slice(0, 5) || '-')}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Край на прекъсване</div>
          <div class="fw-semibold">${escapeHtml((intervalToTimeInput(duty.break_end_time || '00:00:00') || '-').slice(0, 5) || '-')}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Прекъсване</div>
          <div class="fw-semibold">${escapeHtml(formatIntervalValue(duty.break_duration_interval))}</div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Времетраене</div>
          <div class="fw-semibold">${escapeHtml(formatIntervalValue(duty.duration_interval))}</div>
        </div>
      </div>
    </div>
  `;

  openModal(modal);
}

function formatIntervalValue(value) {
  if (!value) {
    return '-';
  }

  return String(value).replace('.000000', '');
}

function getScheduleKeyRows(duty) {
  return Array.isArray(duty?.schedule_key_duties)
    ? duty.schedule_key_duties
    : duty?.schedule_key_duties
      ? [duty.schedule_key_duties]
      : [];
}

function getScheduleKeyIds(duty) {
  const mappedIds = getScheduleKeyRows(duty)
    .map((row) => row?.schedule_key_id)
    .filter(Boolean);

  const ids = mappedIds.length ? mappedIds : duty?.schedule_key_id ? [duty.schedule_key_id] : [];
  return [...new Set(ids)];
}

function getScheduleKeyNames(duty) {
  const names = getScheduleKeyRows(duty)
    .map((row) => row?.schedule_keys?.name)
    .filter(Boolean);

  return [...new Set(names)];
}

function getTrainRows(duty) {
  return Array.isArray(duty?.duty_trains)
    ? duty.duty_trains
    : duty?.duty_trains
      ? [duty.duty_trains]
      : [];
}

function getTrainIdsOrdered(duty) {
  return getTrainRows(duty)
    .map((row) => ({
      id: row?.train_id,
      sequenceOrder: Number.isFinite(Number(row?.sequence_order)) ? Number(row.sequence_order) : Number.MAX_SAFE_INTEGER
    }))
    .filter((row) => Boolean(row.id))
    .sort((left, right) => left.sequenceOrder - right.sequenceOrder)
    .map((row) => row.id)
    .filter((value, index, all) => all.indexOf(value) === index);
}

function getTrainNumbersOrdered(duty) {
  return getTrainRows(duty)
    .map((row) => ({
      number: row?.trains?.number,
      sequenceOrder: Number.isFinite(Number(row?.sequence_order)) ? Number(row.sequence_order) : Number.MAX_SAFE_INTEGER
    }))
    .filter((row) => Boolean(row.number))
    .sort((left, right) => left.sequenceOrder - right.sequenceOrder)
    .map((row) => row.number)
    .filter((value, index, all) => all.indexOf(value) === index);
}

function openDeleteDutyModal(container, dutyId) {
  container.querySelector('#schedule-key-duty-delete-id').value = dutyId;
  openModal(container.querySelector('#schedule-key-duty-delete-modal'));
}

async function confirmDeleteDutyForScheduleKey(container, dutyId) {
  const deleteButton = container.querySelector('#schedule-key-duty-delete-confirm');
  const originalText = deleteButton.innerHTML;
  deleteButton.disabled = true;
  deleteButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';

  const { error } = await supabase
    .from('duties')
    .delete()
    .eq('id', dutyId)
    .eq('schedule_key_id', scheduleKeyDutiesState.scheduleKeyId);

  deleteButton.disabled = false;
  deleteButton.innerHTML = originalText;

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  closeModal(container.querySelector('#schedule-key-duty-delete-modal'));
  showToast('Повеската е изтрита.', 'success');
  await loadDutiesForScheduleKey(container);
}