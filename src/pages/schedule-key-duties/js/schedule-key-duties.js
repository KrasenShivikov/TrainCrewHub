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

  setupModalEscapeHandler('schedule-key-duties', [
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
    if (action === 'edit') {
      openEditDutyModal(container, {
        id: actionButton.getAttribute('data-id'),
        name: actionButton.getAttribute('data-name'),
        dutyTypeId: actionButton.getAttribute('data-duty-type-id'),
        scheduleKeyIds: (actionButton.getAttribute('data-schedule-key-ids') || '')
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean),
        startTime: actionButton.getAttribute('data-start-time'),
        endTime: actionButton.getAttribute('data-end-time'),
        breakStartTime: actionButton.getAttribute('data-break-start-time'),
        breakEndTime: actionButton.getAttribute('data-break-end-time')
      });
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

async function saveDutyForScheduleKey(container) {
  const nameInput = container.querySelector('#schedule-key-duty-create-name');
  const dutyTypeInput = container.querySelector('#schedule-key-duty-create-type');
  const scheduleKeysInput = container.querySelector('#schedule-key-duty-create-schedule-keys');
  const startInput = container.querySelector('#schedule-key-duty-create-start');
  const endInput = container.querySelector('#schedule-key-duty-create-end');
  const breakStartInput = container.querySelector('#schedule-key-duty-create-break-start');
  const breakEndInput = container.querySelector('#schedule-key-duty-create-break-end');
  const saveButton = container.querySelector('#schedule-key-duty-create-save');

  const name = nameInput.value.trim();
  const dutyTypeId = dutyTypeInput.value || null;
  const selectedScheduleKeyIds = Array.from(scheduleKeysInput.selectedOptions || [])
    .map((option) => option.value)
    .filter(Boolean);
  const primaryScheduleKeyId = selectedScheduleKeyIds[0] || null;
  const startTime = startInput.value;
  const endTime = endInput.value;
  const breakStartTime = breakStartInput.value;
  const breakEndTime = breakEndInput.value;

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

  saveButton.disabled = false;
  saveButton.innerHTML = originalButtonText;

  if (error || mappingError) {
    showToast((error || mappingError).message, 'error');
    return;
  }

  scheduleKeyDutiesState.lastCreatedDutyTypeId = dutyTypeId;
  scheduleKeyDutiesState.lastCreatedScheduleKeyIds = [...selectedScheduleKeyIds];

  closeModal(container.querySelector('#schedule-key-duty-create-modal'));
  resetCreateDutyForm(container);
  showToast('Повеската е добавена към Ключ-График.', 'success');
  await loadDutiesForScheduleKey(container);
}

function openEditDutyModal(container, duty) {
  container.querySelector('#schedule-key-duty-edit-id').value = duty.id;
  container.querySelector('#schedule-key-duty-edit-name').value = duty.name ?? '';
  container.querySelector('#schedule-key-duty-edit-type').value = duty.dutyTypeId ?? '';
  const scheduleKeysSelect = container.querySelector('#schedule-key-duty-edit-schedule-keys');
  const selectedScheduleKeyIds = duty.scheduleKeyIds || [];
  Array.from(scheduleKeysSelect.options).forEach((option) => {
    option.selected = selectedScheduleKeyIds.includes(option.value);
  });
  container.querySelector('#schedule-key-duty-edit-start').value = duty.startTime ?? '';
  container.querySelector('#schedule-key-duty-edit-end').value = duty.endTime ?? '';
  container.querySelector('#schedule-key-duty-edit-break-start').value = intervalToTimeInput(duty.breakStartTime);
  container.querySelector('#schedule-key-duty-edit-break-end').value = intervalToTimeInput(duty.breakEndTime);
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
  container.querySelector('#schedule-key-duty-create-break-start').value = '00:00';
  container.querySelector('#schedule-key-duty-create-break-end').value = '00:00';
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
  const breakStartTime = container.querySelector('#schedule-key-duty-edit-break-start').value;
  const breakEndTime = container.querySelector('#schedule-key-duty-edit-break-end').value;
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
      break_start_time: breakStartTime,
      break_end_time: breakEndTime
    })
    .eq('id', dutyId)
    .eq('schedule_key_id', scheduleKeyDutiesState.scheduleKeyId);

  const mappingError = error ? null : await syncDutyScheduleKeys(dutyId, selectedScheduleKeyIds);

  saveButton.disabled = false;
  saveButton.innerHTML = originalText;

  if (error || mappingError) {
    showToast((error || mappingError).message, 'error');
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