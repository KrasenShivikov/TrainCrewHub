import { loadHtml } from '../../../utils/loadHtml.js';
import {
  calculateShiftDurationMinutes,
  intervalToTimeInput
} from '../../../utils/dutyTime.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { closeModal, escapeHtml, openModal, setupModalEscapeHandler } from './helpers.js';
import { dutiesState } from './state.js';
import { loadDuties, persistDutiesOrder, renderDutiesTable } from './table.js';

export async function renderDutiesPage(container) {
  const pageHtml = await loadHtml('../duties.html', import.meta.url);
  container.innerHTML = pageHtml;
  attachDutiesHandlers(container);
  await loadDutyTypeOptions(container);
  await loadScheduleKeyOptions(container);
  await loadDuties(container);
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
  const modalCloseButton = container.querySelector('#duty-modal-close');
  const deleteConfirmButton = container.querySelector('#duty-delete-confirm');
  const deleteCancelButton = container.querySelector('#duty-delete-cancel');
  const searchInput = container.querySelector('#duties-search');
  const prevPageButton = container.querySelector('#duties-prev-page');
  const nextPageButton = container.querySelector('#duties-next-page');

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

  searchInput?.addEventListener('input', (event) => {
    dutiesState.searchQuery = event.target.value.trim().toLowerCase();
    dutiesState.currentPage = 1;
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

  setupModalEscapeHandler('duties', [
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
    if (action === 'edit') {
      const scheduleKeyIds = (actionButton.getAttribute('data-schedule-key-ids') || '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);

      populateDutyForm(container, {
        id: actionButton.getAttribute('data-id'),
        name: actionButton.getAttribute('data-name'),
        dutyTypeId: actionButton.getAttribute('data-duty-type-id'),
        scheduleKeyIds,
        startTime: actionButton.getAttribute('data-start-time'),
        endTime: actionButton.getAttribute('data-end-time'),
        breakStartTime: actionButton.getAttribute('data-break-start-time'),
        breakEndTime: actionButton.getAttribute('data-break-end-time')
      });
      openModal(dutyModal);
      return;
    }

    if (action === 'delete') {
      const id = actionButton.getAttribute('data-id');
      container.querySelector('#duty-delete-id').value = id;
      openModal(deleteModal);
    }
  });

  tableBody?.addEventListener('dragstart', (event) => {
    const row = event.target.closest('tr[data-duty-id]');
    if (!row) {
      return;
    }

    dutiesState.draggedDutyId = row.getAttribute('data-duty-id');
    row.classList.add('table-active');
  });

  tableBody?.addEventListener('dragend', (event) => {
    const row = event.target.closest('tr[data-duty-id]');
    if (row) {
      row.classList.remove('table-active');
    }
    dutiesState.draggedDutyId = null;
  });

  tableBody?.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  tableBody?.addEventListener('drop', async (event) => {
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
  const startTimeInput = container.querySelector('#duty-start-time');
  const endTimeInput = container.querySelector('#duty-end-time');
  const breakStartInput = container.querySelector('#duty-break-start-time');
  const breakEndInput = container.querySelector('#duty-break-end-time');
  const saveButton = container.querySelector('#duty-save-btn');

  const name = nameInput.value.trim();
  const dutyTypeId = dutyTypeInput.value || null;
  const selectedScheduleKeyIds = Array.from(scheduleKeysInput.selectedOptions || [])
    .map((option) => option.value)
    .filter(Boolean);
  const primaryScheduleKeyId = selectedScheduleKeyIds[0] || null;
  const startTime = startTimeInput.value;
  const endTime = endTimeInput.value;
  const breakStartTime = breakStartInput.value;
  const breakEndTime = breakEndInput.value;
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

  const payload = {
    name,
    duty_type_id: dutyTypeId,
    schedule_key_id: primaryScheduleKeyId,
    start_time: startTime,
    end_time: endTime,
    break_start_time: breakStartTime,
    break_end_time: breakEndTime
  };

  let error;
  let dutyId = editingId || null;

  if (editingId) {
    ({ error } = await supabase.from('duties').update(payload).eq('id', editingId));
  } else {
    const { data: userData } = await supabase.auth.getUser();
    const createdFrom = userData?.user?.email ?? 'web_app';
    const maxDisplayOrder = dutiesState.allDuties.reduce(
      (maxValue, item) => Math.max(maxValue, Number(item.display_order) || 0),
      0
    );
    const { data: insertedDuty, error: insertError } = await supabase
      .from('duties')
      .insert({ ...payload, created_from: createdFrom, display_order: maxDisplayOrder + 1 })
      .select('id')
      .single();

    error = insertError;
    dutyId = insertedDuty?.id ?? null;
  }

  if (!error && dutyId) {
    error = await syncDutyScheduleKeys(dutyId, selectedScheduleKeyIds);
  }

  saveButton.disabled = false;
  saveButton.innerHTML = originalText;

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  showToast(editingId ? 'Повеската е обновена.' : 'Повеската е създадена.', 'success');
  closeModal(container.querySelector('#duty-modal'));
  resetDutyForm(container);
  await loadDuties(container);
}

function populateDutyForm(container, duty) {
  container.querySelector('#duty-id').value = duty.id;
  container.querySelector('#duty-name').value = duty.name ?? '';
  container.querySelector('#duty-type').value = duty.dutyTypeId ?? '';
  const scheduleKeysSelect = container.querySelector('#duty-schedule-keys');
  const selectedScheduleKeyIds = duty.scheduleKeyIds || [];
  Array.from(scheduleKeysSelect.options).forEach((option) => {
    option.selected = selectedScheduleKeyIds.includes(option.value);
  });
  container.querySelector('#duty-start-time').value = duty.startTime ?? '';
  container.querySelector('#duty-end-time').value = duty.endTime ?? '';
  container.querySelector('#duty-break-start-time').value = intervalToTimeInput(duty.breakStartTime);
  container.querySelector('#duty-break-end-time').value = intervalToTimeInput(duty.breakEndTime);

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
  container.querySelector('#duty-start-time').value = '';
  container.querySelector('#duty-end-time').value = '';
  container.querySelector('#duty-break-start-time').value = '00:00';
  container.querySelector('#duty-break-end-time').value = '00:00';

  container.querySelector('#duty-form-title').textContent = 'Нова Повеска';
  container.querySelector('#duty-save-btn').textContent = 'Създай';
}

async function deleteDuty(id, container) {
  const deleteButton = container.querySelector('#duty-delete-confirm');
  const originalDeleteText = deleteButton.innerHTML;
  deleteButton.disabled = true;
  deleteButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';

  const { error } = await supabase.from('duties').delete().eq('id', id);
  deleteButton.disabled = false;
  deleteButton.innerHTML = originalDeleteText;

  if (error) {
    showToast(error.message, 'error');
    return;
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
