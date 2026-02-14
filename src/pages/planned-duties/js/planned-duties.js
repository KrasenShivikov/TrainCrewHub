import { loadHtml } from '../../../utils/loadHtml.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { closeModal, escapeHtml, openModal } from './helpers.js';
import { plannedDutiesState } from './state.js';
import { loadPlannedDuties, renderPlannedDutiesTable } from './table.js';

let dutiesLookup = [];

export async function renderPlannedDutiesPage(container) {
  const pageHtml = await loadHtml('../planned-duties.html', import.meta.url);
  container.innerHTML = pageHtml;
  attachPlannedDutiesHandlers(container);
  await loadEmployeeOptions(container);
  await loadScheduleKeyOptions(container);
  await loadDutyOptions(container);
  await loadPlannedDuties(container);
}

function attachPlannedDutiesHandlers(container) {
  const createButton = container.querySelector('#open-create-planned-duty');
  const form = container.querySelector('#planned-duty-form');
  const cancelButton = container.querySelector('#planned-duty-cancel-btn');
  const tableBody = container.querySelector('#planned-duties-table-body');
  const plannedDutyModal = container.querySelector('#planned-duty-modal');
  const deleteModal = container.querySelector('#planned-duty-delete-modal');
  const modalCloseButton = container.querySelector('#planned-duty-modal-close');
  const deleteConfirmButton = container.querySelector('#planned-duty-delete-confirm');
  const deleteCancelButton = container.querySelector('#planned-duty-delete-cancel');
  const searchInput = container.querySelector('#planned-duties-search');
  const dateFilterInput = container.querySelector('#planned-duties-date-filter');
  const resetFilterButton = container.querySelector('#planned-duties-filter-reset');
  const scheduleKeyInput = container.querySelector('#planned-duty-schedule-key');

  createButton?.addEventListener('click', () => {
    resetPlannedDutyForm(container);
    openModal(plannedDutyModal);
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await savePlannedDuty(container);
  });

  cancelButton?.addEventListener('click', () => {
    closeModal(plannedDutyModal);
  });

  modalCloseButton?.addEventListener('click', () => {
    closeModal(plannedDutyModal);
  });

  deleteCancelButton?.addEventListener('click', () => {
    closeModal(deleteModal);
  });

  searchInput?.addEventListener('input', (event) => {
    plannedDutiesState.searchQuery = event.target.value.trim().toLowerCase();
    renderPlannedDutiesTable(container);
  });

  dateFilterInput?.addEventListener('change', (event) => {
    plannedDutiesState.dateFilter = event.target.value || '';
    renderPlannedDutiesTable(container);
  });

  resetFilterButton?.addEventListener('click', () => {
    plannedDutiesState.searchQuery = '';
    plannedDutiesState.dateFilter = '';

    if (searchInput) {
      searchInput.value = '';
    }

    if (dateFilterInput) {
      dateFilterInput.value = '';
    }

    renderPlannedDutiesTable(container);
  });

  scheduleKeyInput?.addEventListener('change', () => {
    renderDutyOptionsByScheduleKey(container, scheduleKeyInput.value || '', '');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    if (!deleteModal?.classList.contains('d-none')) {
      closeModal(deleteModal);
      return;
    }

    if (!plannedDutyModal?.classList.contains('d-none')) {
      closeModal(plannedDutyModal);
    }
  });

  deleteConfirmButton?.addEventListener('click', async () => {
    const id = container.querySelector('#planned-duty-delete-id').value;
    await deletePlannedDuty(id, container);
  });

  tableBody?.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button[data-action]');
    if (!actionButton) {
      return;
    }

    const action = actionButton.getAttribute('data-action');
    if (action === 'edit') {
      populatePlannedDutyForm(container, {
        id: actionButton.getAttribute('data-id'),
        date: actionButton.getAttribute('data-date'),
        employeeId: actionButton.getAttribute('data-employee-id'),
        dutyId: actionButton.getAttribute('data-duty-id'),
        dutyScheduleKeyId: actionButton.getAttribute('data-duty-schedule-key-id')
      });
      openModal(plannedDutyModal);
      return;
    }

    if (action === 'delete') {
      const id = actionButton.getAttribute('data-id');
      container.querySelector('#planned-duty-delete-id').value = id;
      openModal(deleteModal);
    }
  });
}

async function loadEmployeeOptions(container) {
  const select = container.querySelector('#planned-duty-employee');
  const { data, error } = await supabase
    .from('employees')
    .select('id, first_name, last_name')
    .order('last_name', { ascending: true })
    .order('first_name', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  const options = (data || [])
    .map((item) => {
      const fullName = `${item.first_name ?? ''} ${item.last_name ?? ''}`.trim() || '-';
      return `<option value="${item.id}">${escapeHtml(fullName)}</option>`;
    })
    .join('');

  select.innerHTML = '<option value="">Избери служител</option>' + options;
}

async function loadDutyOptions(container) {
  const { data: mappings, error: mappingsError } = await supabase
    .from('schedule_key_duties')
    .select('schedule_key_id, duty_id, duties(id, name)');

  if (mappingsError) {
    showToast(mappingsError.message, 'error');
    return;
  }

  const lookupMap = new Map();
  (mappings || []).forEach((row) => {
    const duty = row?.duties;
    if (!duty?.id) {
      return;
    }

    const existing = lookupMap.get(duty.id) || {
      id: duty.id,
      name: duty.name || '-',
      scheduleKeyIds: []
    };

    if (row.schedule_key_id && !existing.scheduleKeyIds.includes(row.schedule_key_id)) {
      existing.scheduleKeyIds.push(row.schedule_key_id);
    }

    lookupMap.set(duty.id, existing);
  });

  dutiesLookup = Array.from(lookupMap.values()).sort((a, b) =>
    String(a.name || '').localeCompare(String(b.name || ''), 'bg')
  );

  renderDutyOptionsByScheduleKey(container, '', '');
}

async function loadScheduleKeyOptions(container) {
  const select = container.querySelector('#planned-duty-schedule-key');
  const { data, error } = await supabase
    .from('schedule_keys')
    .select('id, name')
    .order('name', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  const options = (data || [])
    .map((item) => `<option value="${item.id}">${escapeHtml(item.name ?? '-')}</option>`)
    .join('');

  select.innerHTML = '<option value="">Избери ключ-график</option>' + options;
}

function renderDutyOptionsByScheduleKey(container, scheduleKeyId, selectedDutyId) {
  const dutySelect = container.querySelector('#planned-duty-duty');
  if (!dutySelect) {
    return;
  }

  if (!scheduleKeyId) {
    dutySelect.innerHTML = '<option value="">Първо избери ключ-график</option>';
    dutySelect.value = '';
    return;
  }

  const options = dutiesLookup
    .filter((item) => item.scheduleKeyIds?.includes(scheduleKeyId))
    .map((item) => {
      const selected = item.id === selectedDutyId ? 'selected' : '';
      return `<option value="${item.id}" ${selected}>${escapeHtml(item.name ?? '-')}</option>`;
    })
    .join('');

  dutySelect.innerHTML = '<option value="">Избери повеска</option>' + options;

  if (selectedDutyId) {
    dutySelect.value = selectedDutyId;
  }
}

async function savePlannedDuty(container) {
  const idInput = container.querySelector('#planned-duty-id');
  const dateInput = container.querySelector('#planned-duty-date');
  const employeeInput = container.querySelector('#planned-duty-employee');
  const scheduleKeyInput = container.querySelector('#planned-duty-schedule-key');
  const dutyInput = container.querySelector('#planned-duty-duty');
  const saveButton = container.querySelector('#planned-duty-save-btn');

  const date = dateInput.value;
  const employeeId = employeeInput.value || null;
  const scheduleKeyId = scheduleKeyInput.value || null;
  const dutyId = dutyInput.value || null;
  const editingId = idInput.value;

  if (!date || !employeeId || !scheduleKeyId || !dutyId) {
    showToast('Моля, попълни всички полета.', 'warning');
    return;
  }

  const selectedDuty = dutiesLookup.find((item) => item.id === dutyId);
  if (!selectedDuty || !selectedDuty.scheduleKeyIds?.includes(scheduleKeyId)) {
    showToast('Избери повеска от посочения ключ-график.', 'warning');
    return;
  }

  const originalText = saveButton.innerHTML;
  saveButton.disabled = true;
  saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';

  const payload = {
    date,
    employee_id: employeeId,
    duty_id: dutyId
  };

  let error;

  if (editingId) {
    ({ error } = await supabase.from('planned_duties').update(payload).eq('id', editingId));
  } else {
    const { data: userData } = await supabase.auth.getUser();
    const createdFrom = userData?.user?.email ?? 'web_app';
    ({ error } = await supabase.from('planned_duties').insert({ ...payload, created_from: createdFrom }));
  }

  saveButton.disabled = false;
  saveButton.innerHTML = originalText;

  if (error) {
    if (error.code === '23505') {
      showToast('Това планиране вече съществува за тази дата.', 'warning');
      return;
    }

    showToast(error.message, 'error');
    return;
  }

  showToast(editingId ? 'Планирането е обновено.' : 'Планирането е създадено.', 'success');
  closeModal(container.querySelector('#planned-duty-modal'));
  resetPlannedDutyForm(container);
  await loadPlannedDuties(container);
}

function populatePlannedDutyForm(container, plannedDuty) {
  container.querySelector('#planned-duty-id').value = plannedDuty.id;
  container.querySelector('#planned-duty-date').value = plannedDuty.date ?? '';
  container.querySelector('#planned-duty-employee').value = plannedDuty.employeeId ?? '';
  container.querySelector('#planned-duty-schedule-key').value = plannedDuty.dutyScheduleKeyId ?? '';
  renderDutyOptionsByScheduleKey(container, plannedDuty.dutyScheduleKeyId ?? '', plannedDuty.dutyId ?? '');

  container.querySelector('#planned-duty-form-title').textContent = 'Редакция на планиране';
  container.querySelector('#planned-duty-save-btn').textContent = 'Запази';
}

function resetPlannedDutyForm(container) {
  container.querySelector('#planned-duty-id').value = '';
  container.querySelector('#planned-duty-date').value = '';
  container.querySelector('#planned-duty-employee').value = '';
  container.querySelector('#planned-duty-schedule-key').value = '';
  renderDutyOptionsByScheduleKey(container, '', '');

  container.querySelector('#planned-duty-form-title').textContent = 'Ново планиране';
  container.querySelector('#planned-duty-save-btn').textContent = 'Създай';
}

async function deletePlannedDuty(id, container) {
  const deleteButton = container.querySelector('#planned-duty-delete-confirm');
  const originalDeleteText = deleteButton.innerHTML;
  deleteButton.disabled = true;
  deleteButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';

  const { error } = await supabase.from('planned_duties').delete().eq('id', id);

  deleteButton.disabled = false;
  deleteButton.innerHTML = originalDeleteText;

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  showToast('Планирането е изтрито.', 'success');
  closeModal(container.querySelector('#planned-duty-delete-modal'));
  resetPlannedDutyForm(container);
  await loadPlannedDuties(container);
}
