import { loadHtml } from '../../../utils/loadHtml.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { closeModal, escapeHtml, openModal, setupModalEscapeHandler } from './helpers.js';
import { actualDutiesState } from './state.js';
import { loadActualDuties, renderActualDutiesTable } from './table.js';

let dutiesLookup = [];

export async function renderActualDutiesPage(container) {
  const pageHtml = await loadHtml('../actual-duties.html', import.meta.url);
  container.innerHTML = pageHtml;

  const dateFromQuery = getDateFromQuery();
  const dateFilterInput = container.querySelector('#actual-duties-date-filter');
  if (dateFromQuery && dateFilterInput) {
    dateFilterInput.value = dateFromQuery;
    actualDutiesState.dateFilter = dateFromQuery;
  }

  attachActualDutiesHandlers(container);
  await loadEmployeeOptions(container);
  await loadScheduleKeyOptions(container);
  await loadDutyOptions(container);
  await loadActualDuties(container);
}

function attachActualDutiesHandlers(container) {
  const createButton = container.querySelector('#open-create-actual-duty');
  const goToScheduleButton = container.querySelector('#go-to-schedule');
  const bulkDeleteButton = container.querySelector('#open-bulk-delete-actual-duty');
  const bulkAddButton = container.querySelector('#open-bulk-add-actual-duty');
  const form = container.querySelector('#actual-duty-form');
  const tableBody = container.querySelector('#actual-duties-table-body');
  const actualDutyModal = container.querySelector('#actual-duty-modal');
  const deleteModal = container.querySelector('#actual-duty-delete-modal');
  const bulkDeleteModal = container.querySelector('#actual-duty-bulk-delete-modal');
  const bulkAddModal = container.querySelector('#actual-duty-bulk-add-modal');
  const modalCloseButton = container.querySelector('#actual-duty-modal-close');
  const modalCancelButton = container.querySelector('#actual-duty-cancel-btn');
  const deleteConfirmButton = container.querySelector('#actual-duty-delete-confirm');
  const deleteCancelButton = container.querySelector('#actual-duty-delete-cancel');
  const bulkDeleteConfirmButton = container.querySelector('#actual-duty-bulk-delete-confirm');
  const bulkDeleteCancelButton = container.querySelector('#actual-duty-bulk-delete-cancel');
  const bulkAddModalCloseButton = container.querySelector('#actual-duty-bulk-add-modal-close');
  const bulkAddCancelButton = container.querySelector('#actual-duty-bulk-add-cancel');
  const bulkAddConfirmButton = container.querySelector('#actual-duty-bulk-add-confirm');
  const bulkAddSearchInput = container.querySelector('#actual-duty-bulk-add-search');
  const bulkAddDateFilterInput = container.querySelector('#actual-duty-bulk-add-date-filter');
  const bulkAddFilterResetButton = container.querySelector('#actual-duty-bulk-add-filter-reset');
  const bulkAddSelectAllInput = container.querySelector('#actual-duty-bulk-add-select-all');
  const bulkAddTableBody = container.querySelector('#actual-duty-bulk-add-table-body');
  const searchInput = container.querySelector('#actual-duties-search');
  const dateFilterInput = container.querySelector('#actual-duties-date-filter');
  const resetFilterButton = container.querySelector('#actual-duties-filter-reset');
  const scheduleKeyInput = container.querySelector('#actual-duty-schedule-key');
  const selectAllInput = container.querySelector('#actual-duties-select-all');

  createButton?.addEventListener('click', () => {
    resetActualDutyForm(container);
    openModal(actualDutyModal);
  });

  bulkDeleteButton?.addEventListener('click', () => {
    if (!actualDutiesState.selectedIds.length) {
      showToast('Избери поне един запис за изтриване.', 'warning');
      return;
    }

    const countLabel = container.querySelector('#actual-duty-bulk-delete-count');
    if (countLabel) {
      countLabel.textContent = String(actualDutiesState.selectedIds.length);
    }

    openModal(bulkDeleteModal);
  });

  bulkAddButton?.addEventListener('click', async () => {
    resetBulkAddFilters(container);
    await loadPlannedRowsForBulkAdd(container);
    openModal(bulkAddModal);
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveActualDuty(container);
  });

  modalCloseButton?.addEventListener('click', () => {
    closeModal(actualDutyModal);
  });

  modalCancelButton?.addEventListener('click', () => {
    closeModal(actualDutyModal);
  });

  deleteCancelButton?.addEventListener('click', () => {
    closeModal(deleteModal);
  });

  bulkDeleteCancelButton?.addEventListener('click', () => {
    closeModal(bulkDeleteModal);
  });

  bulkAddModalCloseButton?.addEventListener('click', () => {
    closeModal(bulkAddModal);
  });

  bulkAddCancelButton?.addEventListener('click', () => {
    closeModal(bulkAddModal);
  });

  searchInput?.addEventListener('input', (event) => {
    actualDutiesState.searchQuery = event.target.value.trim().toLowerCase();
    renderActualDutiesTable(container);
  });

  dateFilterInput?.addEventListener('change', (event) => {
    actualDutiesState.dateFilter = event.target.value || '';
    updateGoToScheduleState(goToScheduleButton, actualDutiesState.dateFilter);
    renderActualDutiesTable(container);
  });

  resetFilterButton?.addEventListener('click', () => {
    actualDutiesState.searchQuery = '';
    actualDutiesState.dateFilter = '';

    if (searchInput) {
      searchInput.value = '';
    }

    if (dateFilterInput) {
      dateFilterInput.value = '';
    }

    updateGoToScheduleState(goToScheduleButton, actualDutiesState.dateFilter);

    renderActualDutiesTable(container);
  });

  goToScheduleButton?.addEventListener('click', () => {
    const selectedDate = actualDutiesState.dateFilter || dateFilterInput?.value || '';
    if (!selectedDate) {
      showToast('Избери дата от филтъра, за да отвориш График.', 'warning');
      return;
    }

    const params = new URLSearchParams({ date: selectedDate });
    window.history.pushState({}, '', `/schedule?${params.toString()}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  });

  updateGoToScheduleState(goToScheduleButton, actualDutiesState.dateFilter || dateFilterInput?.value || '');

  scheduleKeyInput?.addEventListener('change', () => {
    renderDutyOptionsByScheduleKey(container, scheduleKeyInput.value || '', '');
  });

  selectAllInput?.addEventListener('change', () => {
    const visibleIds = actualDutiesState.visibleRowIds || [];
    if (selectAllInput.checked) {
      const next = new Set(actualDutiesState.selectedIds);
      visibleIds.forEach((id) => next.add(id));
      actualDutiesState.selectedIds = Array.from(next);
    } else {
      actualDutiesState.selectedIds = actualDutiesState.selectedIds.filter((id) => !visibleIds.includes(id));
    }

    renderActualDutiesTable(container);
  });

  deleteConfirmButton?.addEventListener('click', async () => {
    const id = container.querySelector('#actual-duty-delete-id').value;
    await deleteActualDuty(id, container);
  });

  bulkDeleteConfirmButton?.addEventListener('click', async () => {
    await deleteSelectedActualDuties(container);
  });

  bulkAddConfirmButton?.addEventListener('click', async () => {
    await addSelectedPlannedToActual(container);
  });

  bulkAddSearchInput?.addEventListener('input', (event) => {
    actualDutiesState.plannedSearchQuery = event.target.value.trim().toLowerCase();
    renderBulkAddTable(container);
  });

  bulkAddDateFilterInput?.addEventListener('change', (event) => {
    actualDutiesState.plannedDateFilter = event.target.value || '';
    renderBulkAddTable(container);
  });

  bulkAddFilterResetButton?.addEventListener('click', () => {
    resetBulkAddFilters(container);
    renderBulkAddTable(container);
  });

  bulkAddSelectAllInput?.addEventListener('change', () => {
    const visibleIds = actualDutiesState.plannedVisibleRowIds || [];
    if (bulkAddSelectAllInput.checked) {
      const next = new Set(actualDutiesState.plannedSelectedIds);
      visibleIds.forEach((id) => next.add(id));
      actualDutiesState.plannedSelectedIds = Array.from(next);
    } else {
      actualDutiesState.plannedSelectedIds = actualDutiesState.plannedSelectedIds.filter((id) => !visibleIds.includes(id));
    }

    renderBulkAddTable(container);
  });

  bulkAddTableBody?.addEventListener('change', (event) => {
    const checkbox = event.target.closest('input[data-planned-select-id]');
    if (!checkbox) {
      return;
    }

    const id = checkbox.getAttribute('data-planned-select-id');
    if (!id) {
      return;
    }

    if (checkbox.checked) {
      if (!actualDutiesState.plannedSelectedIds.includes(id)) {
        actualDutiesState.plannedSelectedIds = [...actualDutiesState.plannedSelectedIds, id];
      }
    } else {
      actualDutiesState.plannedSelectedIds = actualDutiesState.plannedSelectedIds.filter((itemId) => itemId !== id);
    }

    renderBulkAddTable(container);
  });

  tableBody?.addEventListener('change', (event) => {
    const checkbox = event.target.closest('input[data-select-id]');
    if (!checkbox) {
      return;
    }

    const id = checkbox.getAttribute('data-select-id');
    if (!id) {
      return;
    }

    if (checkbox.checked) {
      if (!actualDutiesState.selectedIds.includes(id)) {
        actualDutiesState.selectedIds = [...actualDutiesState.selectedIds, id];
      }
    } else {
      actualDutiesState.selectedIds = actualDutiesState.selectedIds.filter((itemId) => itemId !== id);
    }

    renderActualDutiesTable(container);
  });

  tableBody?.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button[data-action]');
    if (!actionButton) {
      return;
    }

    const action = actionButton.getAttribute('data-action');
    if (action === 'edit') {
      populateActualDutyForm(container, {
        id: actionButton.getAttribute('data-id'),
        date: actionButton.getAttribute('data-date'),
        employeeId: actionButton.getAttribute('data-employee-id'),
        dutyId: actionButton.getAttribute('data-duty-id'),
        dutyScheduleKeyId: actionButton.getAttribute('data-duty-schedule-key-id')
      });
      openModal(actualDutyModal);
      return;
    }

    if (action === 'delete') {
      const id = actionButton.getAttribute('data-id');
      container.querySelector('#actual-duty-delete-id').value = id;
      openModal(deleteModal);
    }
  });

  setupModalEscapeHandler('actual-duties', [
    deleteModal,
    bulkDeleteModal,
    bulkAddModal,
    actualDutyModal
  ]);
}

async function loadEmployeeOptions(container) {
  const select = container.querySelector('#actual-duty-employee');
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

async function loadScheduleKeyOptions(container) {
  const select = container.querySelector('#actual-duty-schedule-key');
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

function renderDutyOptionsByScheduleKey(container, scheduleKeyId, selectedDutyId) {
  const dutySelect = container.querySelector('#actual-duty-duty');
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

function isDutyForScheduleKey(dutyId, scheduleKeyId) {
  const selectedDuty = dutiesLookup.find((item) => item.id === dutyId);
  return Boolean(selectedDuty && selectedDuty.scheduleKeyIds?.includes(scheduleKeyId));
}

async function saveActualDuty(container) {
  const idInput = container.querySelector('#actual-duty-id');
  const dateInput = container.querySelector('#actual-duty-date');
  const employeeInput = container.querySelector('#actual-duty-employee');
  const scheduleKeyInput = container.querySelector('#actual-duty-schedule-key');
  const dutyInput = container.querySelector('#actual-duty-duty');
  const saveButton = container.querySelector('#actual-duty-save-btn');

  const date = dateInput.value;
  const employeeId = employeeInput.value || null;
  const scheduleKeyId = scheduleKeyInput.value || null;
  const dutyId = dutyInput.value || null;
  const editingId = idInput.value;

  if (!date || !employeeId || !scheduleKeyId || !dutyId) {
    showToast('Моля, попълни всички полета.', 'warning');
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
    duty_id: dutyId
  };

  let error;

  if (editingId) {
    ({ error } = await supabase.from('actual_duties').update(payload).eq('id', editingId));
  } else {
    ({ error } = await supabase.from('actual_duties').insert(payload));
  }

  saveButton.disabled = false;
  saveButton.innerHTML = originalText;

  if (error) {
    if (error.code === '23505') {
      showToast('Този запис вече съществува за тази дата.', 'warning');
      return;
    }

    showToast(error.message, 'error');
    return;
  }

  showToast(editingId ? 'Записът е обновен.' : 'Записът е създаден.', 'success');
  closeModal(container.querySelector('#actual-duty-modal'));
  resetActualDutyForm(container);
  await loadActualDuties(container);
}

function populateActualDutyForm(container, row) {
  container.querySelector('#actual-duty-id').value = row.id;
  container.querySelector('#actual-duty-date').value = row.date ?? '';
  container.querySelector('#actual-duty-employee').value = row.employeeId ?? '';
  container.querySelector('#actual-duty-schedule-key').value = row.dutyScheduleKeyId ?? '';
  renderDutyOptionsByScheduleKey(container, row.dutyScheduleKeyId ?? '', row.dutyId ?? '');

  container.querySelector('#actual-duty-form-title').textContent = 'Редакция на запис';
  container.querySelector('#actual-duty-save-btn').textContent = 'Запази';
}

function resetActualDutyForm(container) {
  container.querySelector('#actual-duty-id').value = '';
  container.querySelector('#actual-duty-date').value = '';
  container.querySelector('#actual-duty-employee').value = '';
  container.querySelector('#actual-duty-schedule-key').value = '';
  renderDutyOptionsByScheduleKey(container, '', '');

  container.querySelector('#actual-duty-form-title').textContent = 'Нов запис';
  container.querySelector('#actual-duty-save-btn').textContent = 'Създай';
}

async function deleteActualDuty(id, container) {
  const deleteButton = container.querySelector('#actual-duty-delete-confirm');
  const originalDeleteText = deleteButton.innerHTML;
  deleteButton.disabled = true;
  deleteButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';

  const { error } = await supabase.from('actual_duties').delete().eq('id', id);

  deleteButton.disabled = false;
  deleteButton.innerHTML = originalDeleteText;

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  actualDutiesState.selectedIds = actualDutiesState.selectedIds.filter((selectedId) => selectedId !== id);
  closeModal(container.querySelector('#actual-duty-delete-modal'));
  await loadActualDuties(container);
  showToast('Записът е изтрит.', 'success');
}

async function deleteSelectedActualDuties(container) {
  const deleteButton = container.querySelector('#actual-duty-bulk-delete-confirm');
  const idsToDelete = [...actualDutiesState.selectedIds];

  if (!idsToDelete.length) {
    closeModal(container.querySelector('#actual-duty-bulk-delete-modal'));
    return;
  }

  const originalDeleteText = deleteButton.innerHTML;
  deleteButton.disabled = true;
  deleteButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';

  let deleteError = null;
  for (let index = 0; index < idsToDelete.length; index += 200) {
    const chunk = idsToDelete.slice(index, index + 200);
    const { error } = await supabase.from('actual_duties').delete().in('id', chunk);
    if (error) {
      deleteError = error;
      break;
    }
  }

  deleteButton.disabled = false;
  deleteButton.innerHTML = originalDeleteText;

  if (deleteError) {
    showToast(deleteError.message, 'error');
    return;
  }

  const deletedCount = idsToDelete.length;
  actualDutiesState.selectedIds = [];
  closeModal(container.querySelector('#actual-duty-bulk-delete-modal'));
  await loadActualDuties(container);
  showToast(`Изтрити записи: ${deletedCount}.`, 'success');
}

async function loadPlannedRowsForBulkAdd(container) {
  const { data, error } = await supabase
    .from('planned_duties')
    .select('id, date, employee_id, duty_id, employees(first_name, last_name), duties(name)')
    .order('date', { ascending: false });

  if (error) {
    showToast(error.message, 'error');
    actualDutiesState.plannedRows = [];
    renderBulkAddTable(container, 'Грешка при зареждане на планираните повески.');
    return;
  }

  actualDutiesState.plannedRows = data || [];
  actualDutiesState.plannedSelectedIds = [];
  renderBulkAddTable(container);
}

function renderBulkAddTable(container, explicitEmptyMessage) {
  const tableBody = container.querySelector('#actual-duty-bulk-add-table-body');
  const emptyState = container.querySelector('#actual-duty-bulk-add-empty');
  const selectAllInput = container.querySelector('#actual-duty-bulk-add-select-all');
  const confirmButton = container.querySelector('#actual-duty-bulk-add-confirm');

  actualDutiesState.plannedSelectedIds = actualDutiesState.plannedSelectedIds.filter((id) =>
    actualDutiesState.plannedRows.some((row) => row.id === id)
  );

  const filteredRows = actualDutiesState.plannedRows.filter((item) => {
    const employeeName = `${item.employees?.first_name ?? ''} ${item.employees?.last_name ?? ''}`
      .trim()
      .toLowerCase();
    const dutyName = (item.duties?.name || '').toLowerCase();
    const date = (item.date || '').toLowerCase();

    const matchesSearch =
      !actualDutiesState.plannedSearchQuery ||
      employeeName.includes(actualDutiesState.plannedSearchQuery) ||
      dutyName.includes(actualDutiesState.plannedSearchQuery) ||
      date.includes(actualDutiesState.plannedSearchQuery);

    const matchesDate =
      !actualDutiesState.plannedDateFilter || item.date === actualDutiesState.plannedDateFilter;

    return matchesSearch && matchesDate;
  });

  if (!filteredRows.length) {
    actualDutiesState.plannedVisibleRowIds = [];
    tableBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма записи за добавяне.';

    selectAllInput.checked = false;
    selectAllInput.indeterminate = false;
    selectAllInput.disabled = true;
    confirmButton.disabled = actualDutiesState.plannedSelectedIds.length === 0;
    confirmButton.textContent = actualDutiesState.plannedSelectedIds.length
      ? `Добави избраните (${actualDutiesState.plannedSelectedIds.length})`
      : 'Добави избраните';

    return;
  }

  actualDutiesState.plannedVisibleRowIds = filteredRows.map((row) => row.id);

  emptyState.classList.add('d-none');
  tableBody.innerHTML = filteredRows
    .map((item) => {
      const isSelected = actualDutiesState.plannedSelectedIds.includes(item.id);
      const fullName = `${item.employees?.first_name ?? ''} ${item.employees?.last_name ?? ''}`.trim() || '-';

      return `
        <tr>
          <td>
            <input
              type="checkbox"
              class="form-check-input"
              data-planned-select-id="${item.id}"
              ${isSelected ? 'checked' : ''}
              aria-label="Избери планиране"
            />
          </td>
          <td>${escapeHtml(item.date ?? '-')}</td>
          <td>${escapeHtml(fullName)}</td>
          <td>${escapeHtml(item.duties?.name ?? '-')}</td>
        </tr>
      `;
    })
    .join('');

  const selectedVisibleCount = filteredRows.filter((row) => actualDutiesState.plannedSelectedIds.includes(row.id)).length;
  selectAllInput.disabled = false;
  selectAllInput.checked = selectedVisibleCount > 0 && selectedVisibleCount === filteredRows.length;
  selectAllInput.indeterminate = selectedVisibleCount > 0 && selectedVisibleCount < filteredRows.length;

  confirmButton.disabled = actualDutiesState.plannedSelectedIds.length === 0;
  confirmButton.textContent = actualDutiesState.plannedSelectedIds.length
    ? `Добави избраните (${actualDutiesState.plannedSelectedIds.length})`
    : 'Добави избраните';
}

function resetBulkAddFilters(container) {
  actualDutiesState.plannedSearchQuery = '';
  actualDutiesState.plannedDateFilter = '';

  const searchInput = container.querySelector('#actual-duty-bulk-add-search');
  const dateFilterInput = container.querySelector('#actual-duty-bulk-add-date-filter');
  if (searchInput) {
    searchInput.value = '';
  }
  if (dateFilterInput) {
    dateFilterInput.value = '';
  }
}

async function addSelectedPlannedToActual(container) {
  const addButton = container.querySelector('#actual-duty-bulk-add-confirm');
  const selectedIds = [...actualDutiesState.plannedSelectedIds];

  if (!selectedIds.length) {
    showToast('Избери поне един запис от планирани повески.', 'warning');
    return;
  }

  const selectedMap = new Set(selectedIds);
  const selectedRows = actualDutiesState.plannedRows.filter((row) => selectedMap.has(row.id));

  if (!selectedRows.length) {
    showToast('Няма валидни записи за добавяне.', 'warning');
    return;
  }

  const payload = selectedRows.map((row) => ({
    date: row.date,
    employee_id: row.employee_id,
    duty_id: row.duty_id
  }));

  const originalText = addButton.innerHTML;
  addButton.disabled = true;
  addButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Добавяне...';

  let upsertError = null;
  for (let index = 0; index < payload.length; index += 200) {
    const chunk = payload.slice(index, index + 200);
    const { error } = await supabase
      .from('actual_duties')
      .upsert(chunk, { onConflict: 'date,employee_id,duty_id', ignoreDuplicates: true });

    if (error) {
      upsertError = error;
      break;
    }
  }

  addButton.disabled = false;
  addButton.innerHTML = originalText;

  if (upsertError) {
    showToast(upsertError.message, 'error');
    return;
  }

  const attemptedCount = payload.length;
  closeModal(container.querySelector('#actual-duty-bulk-add-modal'));
  await loadActualDuties(container);
  showToast(`Обработени записи: ${attemptedCount}. Съществуващите са пропуснати.`, 'success');
}

function updateGoToScheduleState(button, selectedDate) {
  if (!button) {
    return;
  }

  button.disabled = !selectedDate;
}

function getDateFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const date = params.get('date') || '';

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return '';
  }

  return date;
}
