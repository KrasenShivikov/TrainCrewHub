import { loadHtml } from '../../../utils/loadHtml.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { closeModal, openModal, setupModalEscapeHandler } from './helpers.js';
import { scheduleKeysState } from './state.js';
import { loadScheduleKeys, renderScheduleKeysTable } from './table.js';

export async function renderScheduleKeysPage(container) {
  const pageHtml = await loadHtml('../schedule-keys.html', import.meta.url);
  container.innerHTML = pageHtml;
  attachScheduleKeysHandlers(container);
  await loadScheduleKeys(container);
}

function attachScheduleKeysHandlers(container) {
  const createButton = container.querySelector('#open-create-schedule-key');
  const form = container.querySelector('#schedule-keys-form');
  const cancelButton = container.querySelector('#schedule-key-cancel-btn');
  const tableBody = container.querySelector('#schedule-keys-table-body');
  const scheduleKeyModal = container.querySelector('#schedule-key-modal');
  const deleteModal = container.querySelector('#schedule-key-delete-modal');
  const modalCloseButton = container.querySelector('#schedule-key-modal-close');
  const deleteConfirmButton = container.querySelector('#schedule-key-delete-confirm');
  const deleteCancelButton = container.querySelector('#schedule-key-delete-cancel');
  const filterNameInput = container.querySelector('#filter-name');
  const filterTypeInput = container.querySelector('#filter-type');
  const filterActiveInput = container.querySelector('#filter-active');
  const filterValidFromInput = container.querySelector('#filter-valid-from');
  const filterValidToInput = container.querySelector('#filter-valid-to');
  const filterResetButton = container.querySelector('#filter-reset');

  createButton?.addEventListener('click', () => {
    resetScheduleKeyForm(container);
    openModal(scheduleKeyModal);
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveScheduleKey(container);
  });

  cancelButton?.addEventListener('click', () => {
    closeModal(scheduleKeyModal);
  });

  modalCloseButton?.addEventListener('click', () => {
    closeModal(scheduleKeyModal);
  });

  deleteCancelButton?.addEventListener('click', () => {
    closeModal(deleteModal);
  });

  filterNameInput?.addEventListener('input', (event) => {
    scheduleKeysState.filters.name = event.target.value.trim().toLowerCase();
    renderScheduleKeysTable(container);
  });

  filterTypeInput?.addEventListener('change', (event) => {
    scheduleKeysState.filters.type = event.target.value;
    renderScheduleKeysTable(container);
  });

  filterActiveInput?.addEventListener('change', (event) => {
    scheduleKeysState.filters.isActive = event.target.value;
    renderScheduleKeysTable(container);
  });

  filterValidFromInput?.addEventListener('change', (event) => {
    scheduleKeysState.filters.validFrom = event.target.value;
    renderScheduleKeysTable(container);
  });

  filterValidToInput?.addEventListener('change', (event) => {
    scheduleKeysState.filters.validTo = event.target.value;
    renderScheduleKeysTable(container);
  });

  filterResetButton?.addEventListener('click', () => {
    scheduleKeysState.filters = {
      name: '',
      type: '',
      isActive: '',
      validFrom: '',
      validTo: ''
    };

    if (filterNameInput) filterNameInput.value = '';
    if (filterTypeInput) filterTypeInput.value = '';
    if (filterActiveInput) filterActiveInput.value = '';
    if (filterValidFromInput) filterValidFromInput.value = '';
    if (filterValidToInput) filterValidToInput.value = '';

    renderScheduleKeysTable(container);
  });

  setupModalEscapeHandler('schedule-keys', [
    deleteModal,
    scheduleKeyModal
  ]);

  deleteConfirmButton?.addEventListener('click', async () => {
    const id = container.querySelector('#schedule-key-delete-id').value;
    await deleteScheduleKey(id, container);
  });

  tableBody?.addEventListener('click', async (event) => {
    const actionButton = event.target.closest('button[data-action]');
    if (!actionButton) {
      return;
    }

    const action = actionButton.getAttribute('data-action');
    if (action === 'edit') {
      populateScheduleKeyForm(container, {
        id: actionButton.getAttribute('data-id'),
        name: actionButton.getAttribute('data-name'),
        type: actionButton.getAttribute('data-type'),
        isActive: actionButton.getAttribute('data-active') === 'true',
        validFrom: actionButton.getAttribute('data-valid-from'),
        validTo: actionButton.getAttribute('data-valid-to')
      });
      openModal(scheduleKeyModal);
      return;
    }

    if (action === 'delete') {
      const id = actionButton.getAttribute('data-id');
      container.querySelector('#schedule-key-delete-id').value = id;
      openModal(deleteModal);
      return;
    }

    if (action === 'duties') {
      const scheduleKeyId = actionButton.getAttribute('data-id');
      const scheduleKeyName = actionButton.getAttribute('data-name') || '';
      const params = new URLSearchParams({
        scheduleKeyId,
        scheduleKeyName
      });

      window.history.pushState({}, '', `/schedule-key-duties?${params.toString()}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  });
}

async function saveScheduleKey(container) {
  const idInput = container.querySelector('#schedule-key-id');
  const nameInput = container.querySelector('#schedule-key-name');
  const typeInput = container.querySelector('#schedule-key-type');
  const activeInput = container.querySelector('#schedule-key-active');
  const validFromInput = container.querySelector('#schedule-key-valid-from');
  const validToInput = container.querySelector('#schedule-key-valid-to');
  const saveButton = container.querySelector('#schedule-key-save-btn');

  const name = nameInput.value.trim();
  const type = typeInput.value;
  const isActive = activeInput.checked;
  const validFrom = validFromInput.value;
  const validTo = validToInput.value;
  const editingId = idInput.value;

  if (!name || !type || !validFrom || !validTo) {
    showToast('Моля, попълни всички задължителни полета.', 'warning');
    return;
  }

  if (validTo < validFrom) {
    showToast('Полето "До дата" трябва да е след "От дата".', 'warning');
    return;
  }

  const originalText = saveButton.innerHTML;
  saveButton.disabled = true;
  saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';

  const payload = {
    name,
    type,
    is_active: isActive,
    valid_from: validFrom,
    valid_to: validTo
  };

  let error;

  if (editingId) {
    ({ error } = await supabase.from('schedule_keys').update(payload).eq('id', editingId));
  } else {
    const { data: userData } = await supabase.auth.getUser();
    const createdFrom = userData?.user?.email ?? 'web_app';
    ({ error } = await supabase.from('schedule_keys').insert({ ...payload, created_from: createdFrom }));
  }

  saveButton.disabled = false;
  saveButton.innerHTML = originalText;

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  showToast(editingId ? 'Записът е обновен.' : 'Записът е създаден.', 'success');
  closeModal(container.querySelector('#schedule-key-modal'));
  resetScheduleKeyForm(container);
  await loadScheduleKeys(container);
}

function populateScheduleKeyForm(container, scheduleKey) {
  container.querySelector('#schedule-key-id').value = scheduleKey.id;
  container.querySelector('#schedule-key-name').value = scheduleKey.name ?? '';
  container.querySelector('#schedule-key-type').value = scheduleKey.type ?? 'seasonal';
  container.querySelector('#schedule-key-active').checked = Boolean(scheduleKey.isActive);
  container.querySelector('#schedule-key-valid-from').value = scheduleKey.validFrom ?? '';
  container.querySelector('#schedule-key-valid-to').value = scheduleKey.validTo ?? '';

  container.querySelector('#schedule-keys-form-title').textContent = 'Редакция на Ключ-График';
  container.querySelector('#schedule-key-save-btn').textContent = 'Запази';
  container.querySelector('#schedule-key-cancel-btn').classList.remove('d-none');
}

function resetScheduleKeyForm(container) {
  container.querySelector('#schedule-key-id').value = '';
  container.querySelector('#schedule-key-name').value = '';
  container.querySelector('#schedule-key-type').value = 'seasonal';
  container.querySelector('#schedule-key-active').checked = true;
  container.querySelector('#schedule-key-valid-from').value = '';
  container.querySelector('#schedule-key-valid-to').value = '';

  container.querySelector('#schedule-keys-form-title').textContent = 'Нов Ключ-График';
  container.querySelector('#schedule-key-save-btn').textContent = 'Създай';
  container.querySelector('#schedule-key-cancel-btn').classList.add('d-none');
}

async function deleteScheduleKey(id, container) {
  const deleteButton = container.querySelector('#schedule-key-delete-confirm');
  const originalDeleteText = deleteButton.innerHTML;
  deleteButton.disabled = true;
  deleteButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';

  const { error } = await supabase.from('schedule_keys').delete().eq('id', id);
  deleteButton.disabled = false;
  deleteButton.innerHTML = originalDeleteText;

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  showToast('Записът е изтрит.', 'success');
  closeModal(container.querySelector('#schedule-key-delete-modal'));
  resetScheduleKeyForm(container);
  await loadScheduleKeys(container);
}
