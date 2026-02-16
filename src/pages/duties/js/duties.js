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
  await loadTrainOptions(container);
  await loadDuties(container);
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
  const modalCloseButton = container.querySelector('#duty-modal-close');
  const deleteConfirmButton = container.querySelector('#duty-delete-confirm');
  const deleteCancelButton = container.querySelector('#duty-delete-cancel');
  const profileCloseButton = container.querySelector('#duty-profile-close');
  const profileCloseSecondaryButton = container.querySelector('#duty-profile-close-secondary');
  const profileEditButton = container.querySelector('#duty-profile-edit');
  const searchInput = container.querySelector('#duties-search');
  const scheduleKeyFilterInput = container.querySelector('#duties-schedule-key-filter');
  const dutyTypeFilterInput = container.querySelector('#duties-type-filter');
  const filterResetButton = container.querySelector('#duties-filter-reset');
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
    openDutyEditModal(container, dutyId);
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

  setupModalEscapeHandler('duties', [
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
  const trainsInput = container.querySelector('#duty-trains');
  const startTimeInput = container.querySelector('#duty-start-time');
  const endTimeInput = container.querySelector('#duty-end-time');
  const secondDayInput = container.querySelector('#duty-second-day');
  const breakStartInput = container.querySelector('#duty-break-start-time');
  const breakEndInput = container.querySelector('#duty-break-end-time');
  const notesInput = container.querySelector('#duty-notes');
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
  const startTime = startTimeInput.value;
  const endTime = endTimeInput.value;
  const secondDay = secondDayInput.checked;
  const breakStartTime = breakStartInput.value;
  const breakEndTime = breakEndInput.value;
  const notes = notesInput.value.trim() || null;
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
    second_day: secondDay,
    break_start_time: breakStartTime,
    break_end_time: breakEndTime,
    notes
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

  if (!error && dutyId) {
    error = await syncDutyTrains(dutyId, selectedTrainIds);
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
  const trainsSelect = container.querySelector('#duty-trains');
  const selectedTrainIds = duty.trainIds || [];
  Array.from(trainsSelect.options).forEach((option) => {
    option.selected = selectedTrainIds.includes(option.value);
  });
  container.querySelector('#duty-start-time').value = duty.startTime ?? '';
  container.querySelector('#duty-end-time').value = duty.endTime ?? '';
  container.querySelector('#duty-second-day').checked = Boolean(duty.secondDay);
  container.querySelector('#duty-break-start-time').value = intervalToTimeInput(duty.breakStartTime);
  container.querySelector('#duty-break-end-time').value = intervalToTimeInput(duty.breakEndTime);
  container.querySelector('#duty-notes').value = duty.notes ?? '';

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
  container.querySelector('#duty-start-time').value = '';
  container.querySelector('#duty-end-time').value = '';
  container.querySelector('#duty-second-day').checked = false;
  container.querySelector('#duty-break-start-time').value = '00:00';
  container.querySelector('#duty-break-end-time').value = '00:00';
  container.querySelector('#duty-notes').value = '';

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
  const profileEditButton = container.querySelector('#duty-profile-edit');

  if (!content || !profileModal) {
    return;
  }

  if (!duty) {
    profileModal.dataset.dutyId = '';
    if (profileEditButton) {
      profileEditButton.disabled = true;
    }
    content.innerHTML = '<p class="text-secondary mb-0">Няма данни за тази повеска.</p>';
    openModal(profileModal);
    return;
  }

  profileModal.dataset.dutyId = duty.id;
  if (profileEditButton) {
    profileEditButton.disabled = false;
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
          <div class="fw-semibold">${escapeHtml(formatInterval(duty.break_duration_interval))}</div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Времетраене</div>
          <div class="fw-semibold">${escapeHtml(formatInterval(duty.duration_interval))}</div>
        </div>
      </div>
    </div>
  `;

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
    notes: duty.notes || ''
  });

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

function formatInterval(value) {
  if (!value) {
    return '-';
  }

  return String(value).replace('.000000', '');
}
