import pageHtml from '../schedule-key-duties.html?raw';
import {
  calculateShiftDurationMinutes,
  intervalToTimeInput
} from '../../../utils/dutyTime.js';
import { buildDutyProfileContent } from '../../../utils/dutyProfileTemplate.js';
import { renderDutyFormFields } from '../../../utils/dutyFormTemplate.js';
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
import { isCurrentUserCrew } from '../../../utils/userContext.js';

export async function renderScheduleKeyDutiesPage(container) {
  container.innerHTML = pageHtml;
  const isCrew = await isCurrentUserCrew();
  scheduleKeyDutiesState.reorderEnabled = !isCrew;
  if (isCrew) {
    const attachBtn = container.querySelector('#open-attach-schedule-key-duty');
    if (attachBtn) {
      attachBtn.classList.add('d-none');
    }
  }
  initializeScheduleKeyFormFields(container);
  attachScheduleKeyDutiesHandlers(container);
  await loadDutyTypeOptions(container);
  await loadScheduleKeyOptions(container);
  await loadTrainOptions(container);
  await initScheduleKeyContext(container);
}

function initializeScheduleKeyFormFields(container) {
  const createFieldsRoot = container.querySelector('#schedule-key-duty-create-form-fields');
  if (createFieldsRoot) {
    createFieldsRoot.innerHTML = renderDutyFormFields({
      idPrefix: 'schedule-key-duty-create'
    });
  }

  const editFieldsRoot = container.querySelector('#schedule-key-duty-edit-form-fields');
  if (editFieldsRoot) {
    editFieldsRoot.innerHTML = renderDutyFormFields({
      idPrefix: 'schedule-key-duty-edit'
    });
  }
}

function attachScheduleKeyDutiesHandlers(container) {
  const openCreateButton = container.querySelector('#open-create-schedule-key-duty');
  const openAttachButton = container.querySelector('#open-attach-schedule-key-duty');
  const createModal = container.querySelector('#schedule-key-duty-create-modal');
  const attachModal = container.querySelector('#schedule-key-duty-attach-modal');
  const createForm = container.querySelector('#schedule-key-duty-create-form');
  const createModalCloseButton = container.querySelector('#schedule-key-duty-create-modal-close');
  const attachModalCloseButton = container.querySelector('#schedule-key-duty-attach-modal-close');
  const createCancelButton = container.querySelector('#schedule-key-duty-create-cancel');
  const attachCancelButton = container.querySelector('#schedule-key-duty-attach-cancel');
  const attachSearchInput = container.querySelector('#schedule-key-duty-attach-search');
  const attachTypeSelect = container.querySelector('#schedule-key-duty-attach-type');
  const attachList = container.querySelector('#schedule-key-duty-attach-list');
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
  const profileEditButton = container.querySelector('#schedule-key-duty-profile-edit');

  openCreateButton?.addEventListener('click', () => {
    resetCreateDutyForm(container);
    openModal(createModal);
  });

  openAttachButton?.addEventListener('click', async () => {
    await loadAttachDutyCatalog(container);
    renderAttachDutyList(container);
    openModal(attachModal);
  });

  createModalCloseButton?.addEventListener('click', () => {
    closeModal(createModal);
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
    await saveDutyForScheduleKey(container);
  });

  attachSearchInput?.addEventListener('input', () => {
    renderAttachDutyList(container);
  });

  attachTypeSelect?.addEventListener('change', () => {
    renderAttachDutyList(container);
  });

  attachList?.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-attach-duty-id]');
    if (!button) {
      return;
    }

    const dutyId = button.getAttribute('data-attach-duty-id') || '';
    if (!dutyId) {
      return;
    }

    await attachExistingDutyToScheduleKey(container, dutyId, button);
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

  profileEditButton?.addEventListener('click', () => {
    const dutyId = profileModal?.dataset?.dutyId || '';
    if (!dutyId) {
      return;
    }

    closeModal(profileModal);
    openEditDutyModal(container, dutyId);
  });

  setupModalEscapeHandler('schedule-key-duties', [
    profileModal,
    deleteModal,
    editModal,
    attachModal,
    createModal
  ]);

  dutiesBody?.addEventListener('dragstart', (event) => {
    if (!scheduleKeyDutiesState.reorderEnabled) {
      return;
    }

    const row = event.target.closest('tr[data-duty-id]');
    if (!row) {
      return;
    }

    scheduleKeyDutiesState.draggedDutyId = row.getAttribute('data-duty-id');
    row.classList.add('table-active');
  });

  dutiesBody?.addEventListener('dragend', (event) => {
    if (!scheduleKeyDutiesState.reorderEnabled) {
      return;
    }

    const row = event.target.closest('tr[data-duty-id]');
    if (row) {
      row.classList.remove('table-active');
    }
    scheduleKeyDutiesState.draggedDutyId = null;
  });

  dutiesBody?.addEventListener('dragover', (event) => {
    if (!scheduleKeyDutiesState.reorderEnabled) {
      return;
    }

    event.preventDefault();
  });

  dutiesBody?.addEventListener('drop', async (event) => {
    if (!scheduleKeyDutiesState.reorderEnabled) {
      return;
    }

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

    if (action === 'trains') {
      const dutyId = actionButton.getAttribute('data-id');
      const dutyName = actionButton.getAttribute('data-name');
      const params = new URLSearchParams({
        dutyId,
        dutyName
      });
      window.history.pushState({}, '', `/trains-for-duties?${params.toString()}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
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
  resetCreateDutyForm(container);
  await loadDutiesForScheduleKey(container);
}

async function loadDutyTypeOptions(container) {
  const createSelect = container.querySelector('#schedule-key-duty-create-type');
  const editSelect = container.querySelector('#schedule-key-duty-edit-type');
  const attachTypeSelect = container.querySelector('#schedule-key-duty-attach-type');

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
  if (attachTypeSelect) {
    attachTypeSelect.innerHTML = '<option value="">Всички типове</option>' + options;
  }
}

async function loadAttachDutyCatalog(container) {
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

function renderAttachDutyList(container) {
  const list = container.querySelector('#schedule-key-duty-attach-list');
  const emptyState = container.querySelector('#schedule-key-duty-attach-empty');
  const searchInput = container.querySelector('#schedule-key-duty-attach-search');
  const typeSelect = container.querySelector('#schedule-key-duty-attach-type');

  if (!list || !emptyState) {
    return;
  }

  const searchTerm = (searchInput?.value || '').trim().toLowerCase();
  const selectedTypeId = typeSelect?.value || '';
  const catalog = Array.isArray(scheduleKeyDutiesState.attachCatalog)
    ? scheduleKeyDutiesState.attachCatalog
    : [];

  const filtered = catalog.filter((item) => {
    if (selectedTypeId && item?.duty_type_id !== selectedTypeId) {
      return false;
    }

    if (!searchTerm) {
      return true;
    }

    return String(item?.name || '').toLowerCase().includes(searchTerm);
  });

  if (!catalog.length) {
    list.innerHTML = '';
    emptyState.textContent = 'Няма свободни повески за прикачване.';
    emptyState.classList.remove('d-none');
    return;
  }

  if (!filtered.length) {
    list.innerHTML = '';
    emptyState.textContent = 'Няма резултати по зададените филтри.';
    emptyState.classList.remove('d-none');
    return;
  }

  emptyState.classList.add('d-none');
  list.innerHTML = filtered
    .map((item) => {
      const start = (item.start_time || '').slice(0, 5) || '--:--';
      const end = (item.end_time || '').slice(0, 5) || '--:--';
      const typeName = item?.duty_types?.name || '';

      return `
        <div class="list-group-item d-flex justify-content-between align-items-start gap-3 flex-wrap">
          <div class="flex-grow-1">
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <strong>${escapeHtml(item.name || '-')}</strong>
              ${typeName ? `<span class="badge text-bg-light">${escapeHtml(typeName)}</span>` : ''}
            </div>
            <div class="text-secondary small">${escapeHtml(start)} - ${escapeHtml(end)}</div>
          </div>
          <div>
            <button type="button" class="btn btn-sm btn-primary" data-attach-duty-id="${item.id}"><i class="bi bi-link-45deg me-1"></i>Прикачи</button>
          </div>
        </div>
      `;
    })
    .join('');
}

async function attachExistingDutyToScheduleKey(container, dutyId, buttonEl) {
  if (!scheduleKeyDutiesState.scheduleKeyId || !dutyId) {
    showToast('Избери повеска за прикачване.', 'warning');
    return;
  }

  const button = buttonEl;
  const originalText = button?.innerHTML || '';
  if (button) {
    button.disabled = true;
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Прикачане...';
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

  renderAttachDutyList(container);
  showToast('Повеската е прикачена към ключ-графика.', 'success');
  await loadDutiesForScheduleKey(container);
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
  saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Добавяне...';

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
  setDutyFieldValue(
    container,
    (duty.start_time || '').slice(0, 5),
    '#schedule-key-duty-edit-start',
    '#schedule-key-duty-edit-start-time'
  );
  setDutyFieldValue(
    container,
    (duty.end_time || '').slice(0, 5),
    '#schedule-key-duty-edit-end',
    '#schedule-key-duty-edit-end-time'
  );
  container.querySelector('#schedule-key-duty-edit-second-day').checked = Boolean(duty.second_day);
  setDutyFieldValue(
    container,
    intervalToTimeInput(duty.break_start_time),
    '#schedule-key-duty-edit-break-start',
    '#schedule-key-duty-edit-break-start-time'
  );
  setDutyFieldValue(
    container,
    intervalToTimeInput(duty.break_end_time),
    '#schedule-key-duty-edit-break-end',
    '#schedule-key-duty-edit-break-end-time'
  );
  container.querySelector('#schedule-key-duty-edit-notes').value = duty.notes ?? '';
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

  setDutyFieldValue(container, '', '#schedule-key-duty-create-start', '#schedule-key-duty-create-start-time');
  setDutyFieldValue(container, '', '#schedule-key-duty-create-end', '#schedule-key-duty-create-end-time');
  container.querySelector('#schedule-key-duty-create-second-day').checked = false;
  setDutyFieldValue(
    container,
    '00:00',
    '#schedule-key-duty-create-break-start',
    '#schedule-key-duty-create-break-start-time'
  );
  setDutyFieldValue(
    container,
    '00:00',
    '#schedule-key-duty-create-break-end',
    '#schedule-key-duty-create-break-end-time'
  );
  container.querySelector('#schedule-key-duty-create-notes').value = '';
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
      break_end_time: breakEndTime,
      notes
    })
    .eq('id', dutyId)
    ;

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
  const profileEditButton = container.querySelector('#schedule-key-duty-profile-edit');

  if (!content || !modal) {
    return;
  }

  if (!duty) {
    modal.dataset.dutyId = '';
    if (profileEditButton) {
      profileEditButton.disabled = true;
    }
    content.innerHTML = '<p class="text-secondary mb-0">Няма данни за тази повеска.</p>';
    openModal(modal);
    return;
  }

  modal.dataset.dutyId = duty.id;
  if (profileEditButton) {
    profileEditButton.disabled = false;
  }

  const scheduleKeyNames = getScheduleKeyNames(duty);
  const trainNumbers = getTrainNumbersOrdered(duty);

  content.innerHTML = buildDutyProfileContent({
    duty,
    scheduleKeyNames,
    trainNumbers,
    escapeHtml,
    intervalToTimeInput,
    formatInterval: formatIntervalValue
  });

  openModal(modal);
}

function formatIntervalValue(value) {
  if (!value) {
    return '-';
  }

  return String(value).replace('.000000', '');
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
  const modal = container.querySelector('#schedule-key-duty-delete-modal');
  const title = container.querySelector('#schedule-key-duty-delete-title');
  const message = container.querySelector('#schedule-key-duty-delete-message');
  const confirmButton = container.querySelector('#schedule-key-duty-delete-confirm');

  const duty = scheduleKeyDutiesState.duties.find((item) => item.id === dutyId);
  const currentScheduleKeyId = scheduleKeyDutiesState.scheduleKeyId;
  const scheduleKeyIds = duty ? getScheduleKeyIds(duty) : [];
  const remainingScheduleKeyIds = scheduleKeyIds.filter((id) => id !== currentScheduleKeyId);

  const shouldDelete = Boolean(duty?.schedule_key_id === currentScheduleKeyId && remainingScheduleKeyIds.length === 0);
  const newPrimaryScheduleKeyId = duty?.schedule_key_id === currentScheduleKeyId ? (remainingScheduleKeyIds[0] || '') : '';

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

async function confirmDeleteDutyForScheduleKey(container, dutyId) {
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