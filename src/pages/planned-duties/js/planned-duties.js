import pageHtml from '../planned-duties.html?raw';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { closeModal, openModal, setupModalEscapeHandler } from './helpers.js';
import { plannedDutiesState } from './state.js';
import { loadPlannedDuties, renderPlannedDutiesTable } from './table.js';
import {
  loadDutyOptions,
  loadEmployeeOptions,
  loadScheduleKeyOptions,
  renderDutyOptionsByScheduleKey,
  isDutyForScheduleKey
} from './options.js';
import {
  renderAutoStartDutyOptionsByScheduleKey,
  resetAutoPlanForm,
  saveAutoPlannedDuties
} from './auto-planning.js';
import {
  addSelectedPlannedToActualDuties,
  deleteSelectedPlannedDuties,
  openBulkDeleteModal,
  toggleSelectAllVisible,
  toggleSingleSelection
} from './bulk-delete.js';
import { isCurrentUserCrew } from '../../../utils/userContext.js';

export async function renderPlannedDutiesPage(container) {
  container.innerHTML = pageHtml;
  plannedDutiesState.selectionEnabled = !(await isCurrentUserCrew());
  applyPlannedDutiesCrewLayout(container);
  attachPlannedDutiesHandlers(container);
  await loadEmployeeOptions(container);
  await loadScheduleKeyOptions(container);
  await loadDutyOptions(container);
  await loadPlannedDuties(container);
}

function applyPlannedDutiesCrewLayout(container) {
  if (plannedDutiesState.selectionEnabled) {
    return;
  }

  container.querySelector('.page-actions')?.classList.add('d-none');

  const selectAll = container.querySelector('#planned-duties-select-all');
  selectAll?.closest('th')?.classList.add('d-none');
}

function attachPlannedDutiesHandlers(container) {
  const createButton = container.querySelector('#open-create-planned-duty');
  const bulkDeleteButton = container.querySelector('#open-bulk-delete-planned-duty');
  const addToActualButton = container.querySelector('#add-selected-to-actual-duty');
  const goToPlanScheduleButton = container.querySelector('#go-to-plan-schedule');
  const autoPlanButton = container.querySelector('#open-auto-plan-duty');
  const form = container.querySelector('#planned-duty-form');
  const autoForm = container.querySelector('#planned-duty-auto-form');
  const cancelButton = container.querySelector('#planned-duty-cancel-btn');
  const autoCancelButton = container.querySelector('#planned-duty-auto-cancel-btn');
  const tableBody = container.querySelector('#planned-duties-table-body');
  const plannedDutyModal = container.querySelector('#planned-duty-modal');
  const autoModal = container.querySelector('#planned-duty-auto-modal');
  const deleteModal = container.querySelector('#planned-duty-delete-modal');
  const bulkDeleteModal = container.querySelector('#planned-duty-bulk-delete-modal');
  const modalCloseButton = container.querySelector('#planned-duty-modal-close');
  const autoModalCloseButton = container.querySelector('#planned-duty-auto-modal-close');
  const deleteConfirmButton = container.querySelector('#planned-duty-delete-confirm');
  const deleteCancelButton = container.querySelector('#planned-duty-delete-cancel');
  const bulkDeleteConfirmButton = container.querySelector('#planned-duty-bulk-delete-confirm');
  const bulkDeleteCancelButton = container.querySelector('#planned-duty-bulk-delete-cancel');
  const selectAllInput = container.querySelector('#planned-duties-select-all');
  const searchInput = container.querySelector('#planned-duties-search');
  const dateFilterInput = container.querySelector('#planned-duties-date-filter');
  const roleFilterInput = container.querySelector('#planned-duties-role-filter');
  const resetFilterButton = container.querySelector('#planned-duties-filter-reset');
  const scheduleKeyInput = container.querySelector('#planned-duty-schedule-key');
  const autoScheduleKeyInput = container.querySelector('#planned-duty-auto-schedule-key');

  createButton?.addEventListener('click', () => {
    resetPlannedDutyForm(container);
    openModal(plannedDutyModal);
  });

  bulkDeleteButton?.addEventListener('click', () => {
    if (!plannedDutiesState.selectionEnabled) {
      return;
    }

    openBulkDeleteModal(container);
  });

  addToActualButton?.addEventListener('click', async () => {
    if (!plannedDutiesState.selectionEnabled) {
      return;
    }

    await addSelectedPlannedToActualDuties(container, async () => {
      await loadPlannedDuties(container);
    });
  });

  autoPlanButton?.addEventListener('click', async () => {
    resetAutoPlanForm(container);
    openModal(autoModal);
    await renderAutoStartDutyOptionsByScheduleKey(container, autoScheduleKeyInput?.value || '', '');
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await savePlannedDuty(container);
  });

  autoForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveAutoPlannedDuties(container, async () => {
      await loadPlannedDuties(container);
    });
  });

  cancelButton?.addEventListener('click', () => {
    closeModal(plannedDutyModal);
  });

  modalCloseButton?.addEventListener('click', () => {
    closeModal(plannedDutyModal);
  });

  autoModalCloseButton?.addEventListener('click', () => {
    closeModal(autoModal);
  });

  autoCancelButton?.addEventListener('click', () => {
    closeModal(autoModal);
  });

  deleteCancelButton?.addEventListener('click', () => {
    closeModal(deleteModal);
  });

  bulkDeleteCancelButton?.addEventListener('click', () => {
    closeModal(bulkDeleteModal);
  });

  searchInput?.addEventListener('input', (event) => {
    plannedDutiesState.searchQuery = event.target.value.trim().toLowerCase();
    renderPlannedDutiesTable(container);
  });

  dateFilterInput?.addEventListener('change', (event) => {
    plannedDutiesState.dateFilter = event.target.value || '';
    updateGoToPlanScheduleState(goToPlanScheduleButton, plannedDutiesState.dateFilter);
    renderPlannedDutiesTable(container);
  });

  roleFilterInput?.addEventListener('change', (event) => {
    plannedDutiesState.roleFilter = event.target.value || '';
    renderPlannedDutiesTable(container);
  });

  resetFilterButton?.addEventListener('click', () => {
    plannedDutiesState.searchQuery = '';
    plannedDutiesState.dateFilter = '';
    plannedDutiesState.roleFilter = '';

    if (searchInput) {
      searchInput.value = '';
    }

    if (dateFilterInput) {
      dateFilterInput.value = '';
    }

    if (roleFilterInput) {
      roleFilterInput.value = '';
    }

    updateGoToPlanScheduleState(goToPlanScheduleButton, plannedDutiesState.dateFilter);

    renderPlannedDutiesTable(container);
  });

  goToPlanScheduleButton?.addEventListener('click', () => {
    const selectedDate = plannedDutiesState.dateFilter || dateFilterInput?.value || '';
    if (!selectedDate) {
      showToast('Избери дата от филтъра, за да отвориш План-График.', 'warning');
      return;
    }

    const params = new URLSearchParams({ date: selectedDate });
    window.history.pushState({}, '', `/plan-schedule?${params.toString()}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  });

  updateGoToPlanScheduleState(goToPlanScheduleButton, plannedDutiesState.dateFilter || dateFilterInput?.value || '');

  scheduleKeyInput?.addEventListener('change', () => {
    renderDutyOptionsByScheduleKey(container, scheduleKeyInput.value || '', '');
  });

  autoScheduleKeyInput?.addEventListener('change', async () => {
    await renderAutoStartDutyOptionsByScheduleKey(container, autoScheduleKeyInput.value || '', '');
  });

  selectAllInput?.addEventListener('change', () => {
    if (!plannedDutiesState.selectionEnabled) {
      return;
    }

    toggleSelectAllVisible(selectAllInput.checked);
    renderPlannedDutiesTable(container);
  });

  setupModalEscapeHandler('planned-duties', [
    deleteModal,
    bulkDeleteModal,
    autoModal,
    plannedDutyModal
  ]);

  deleteConfirmButton?.addEventListener('click', async () => {
    const id = container.querySelector('#planned-duty-delete-id').value;
    await deletePlannedDuty(id, container);
  });

  bulkDeleteConfirmButton?.addEventListener('click', async () => {
    await deleteSelectedPlannedDuties(container, async () => {
      await loadPlannedDuties(container);
    });
  });

  tableBody?.addEventListener('change', (event) => {
    if (!plannedDutiesState.selectionEnabled) {
      return;
    }

    const checkbox = event.target.closest('input[data-select-id]');
    if (!checkbox) {
      return;
    }

    const plannedDutyId = checkbox.getAttribute('data-select-id');
    toggleSingleSelection(plannedDutyId, checkbox.checked);
    renderPlannedDutiesTable(container);
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
        assignmentRole: actionButton.getAttribute('data-assignment-role') || 'conductor',
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

async function savePlannedDuty(container) {
  const idInput = container.querySelector('#planned-duty-id');
  const dateInput = container.querySelector('#planned-duty-date');
  const employeeInput = container.querySelector('#planned-duty-employee');
  const assignmentRoleInput = container.querySelector('#planned-duty-assignment-role');
  const scheduleKeyInput = container.querySelector('#planned-duty-schedule-key');
  const dutyInput = container.querySelector('#planned-duty-duty');
  const saveButton = container.querySelector('#planned-duty-save-btn');

  const date = dateInput.value;
  const employeeId = employeeInput.value || null;
  const assignmentRole = assignmentRoleInput.value || '';
  const scheduleKeyId = scheduleKeyInput.value || null;
  const dutyId = dutyInput.value || null;
  const editingId = idInput.value;

  if (!date || !employeeId || !assignmentRole || !scheduleKeyId || !dutyId) {
    showToast('Моля, попълни всички полета.', 'warning');
    return;
  }

  if (!['chief', 'conductor'].includes(assignmentRole)) {
    showToast('Невалидна роля. Избери Кондуктор или Началник влак.', 'warning');
    return;
  }

  if (!isDutyForScheduleKey(dutyId, scheduleKeyId)) {
    showToast('Избери повеска от посочения ключ-график.', 'warning');
    return;
  }

  const originalText = saveButton.innerHTML;
  saveButton.disabled = true;
  saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';

  const payload = {
    date,
    employee_id: employeeId,
    assignment_role: assignmentRole,
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
  container.querySelector('#planned-duty-assignment-role').value = plannedDuty.assignmentRole ?? 'conductor';
  container.querySelector('#planned-duty-schedule-key').value = plannedDuty.dutyScheduleKeyId ?? '';
  renderDutyOptionsByScheduleKey(container, plannedDuty.dutyScheduleKeyId ?? '', plannedDuty.dutyId ?? '');

  container.querySelector('#planned-duty-form-title').textContent = 'Редакция на планиране';
  container.querySelector('#planned-duty-save-btn').textContent = 'Запази';
}

function resetPlannedDutyForm(container) {
  container.querySelector('#planned-duty-id').value = '';
  container.querySelector('#planned-duty-date').value = '';
  container.querySelector('#planned-duty-employee').value = '';
  container.querySelector('#planned-duty-assignment-role').value = 'conductor';
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
  plannedDutiesState.selectedIds = plannedDutiesState.selectedIds.filter((selectedId) => selectedId !== id);
  closeModal(container.querySelector('#planned-duty-delete-modal'));
  resetPlannedDutyForm(container);
  await loadPlannedDuties(container);
}

function updateGoToPlanScheduleState(button, selectedDate) {
  if (!button) {
    return;
  }

  button.disabled = !selectedDate;
}
