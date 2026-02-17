import pageHtml from '../employee-absences.html?raw';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { closeModal, escapeHtml, openModal, setupModalEscapeHandler } from './helpers.js';
import { employeeAbsencesState } from './state.js';
import { loadEmployeeAbsences, renderEmployeeAbsencesTable } from './table.js';

export async function renderEmployeeAbsencesPage(container) {
  container.innerHTML = pageHtml;

  attachEmployeeAbsencesHandlers(container);
  await loadEmployeeOptions(container);
  await loadReasonOptions(container);
  await loadEmployeeAbsences(container);
}

function attachEmployeeAbsencesHandlers(container) {
  const createButton = container.querySelector('#open-create-employee-absence');
  const form = container.querySelector('#employee-absence-form');
  const cancelButton = container.querySelector('#employee-absence-cancel-btn');
  const tableBody = container.querySelector('#employee-absences-table-body');
  const modal = container.querySelector('#employee-absence-modal');
  const deleteModal = container.querySelector('#employee-absence-delete-modal');
  const modalCloseButton = container.querySelector('#employee-absence-modal-close');
  const deleteConfirmButton = container.querySelector('#employee-absence-delete-confirm');
  const deleteCancelButton = container.querySelector('#employee-absence-delete-cancel');
  const searchInput = container.querySelector('#employee-absences-search');
  const dateFromInput = container.querySelector('#employee-absences-date-from');
  const dateToInput = container.querySelector('#employee-absences-date-to');
  const resetFilterButton = container.querySelector('#employee-absences-filter-reset');

  createButton?.addEventListener('click', () => {
    resetEmployeeAbsenceForm(container);
    openModal(modal);
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveEmployeeAbsence(container);
  });

  cancelButton?.addEventListener('click', () => {
    closeModal(modal);
  });

  modalCloseButton?.addEventListener('click', () => {
    closeModal(modal);
  });

  deleteCancelButton?.addEventListener('click', () => {
    closeModal(deleteModal);
  });

  searchInput?.addEventListener('input', (event) => {
    employeeAbsencesState.searchQuery = event.target.value.trim().toLowerCase();
    renderEmployeeAbsencesTable(container);
  });

  dateFromInput?.addEventListener('change', (event) => {
    employeeAbsencesState.dateFrom = event.target.value || '';
    renderEmployeeAbsencesTable(container);
  });

  dateToInput?.addEventListener('change', (event) => {
    employeeAbsencesState.dateTo = event.target.value || '';
    renderEmployeeAbsencesTable(container);
  });

  resetFilterButton?.addEventListener('click', () => {
    employeeAbsencesState.searchQuery = '';
    employeeAbsencesState.dateFrom = '';
    employeeAbsencesState.dateTo = '';

    if (searchInput) {
      searchInput.value = '';
    }
    if (dateFromInput) {
      dateFromInput.value = '';
    }
    if (dateToInput) {
      dateToInput.value = '';
    }

    renderEmployeeAbsencesTable(container);
  });

  setupModalEscapeHandler('employee-absences', [
    deleteModal,
    modal
  ]);

  deleteConfirmButton?.addEventListener('click', async () => {
    const id = container.querySelector('#employee-absence-delete-id').value;
    await deleteEmployeeAbsence(id, container);
  });

  tableBody?.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button[data-action]');
    if (!actionButton) {
      return;
    }

    const action = actionButton.getAttribute('data-action');
    if (action === 'edit') {
      populateEmployeeAbsenceForm(container, {
        id: actionButton.getAttribute('data-id'),
        employeeId: actionButton.getAttribute('data-employee-id'),
        reasonId: actionButton.getAttribute('data-reason-id'),
        startDate: actionButton.getAttribute('data-start-date'),
        endDate: actionButton.getAttribute('data-end-date'),
        notes: actionButton.getAttribute('data-notes')
      });
      openModal(modal);
      return;
    }

    if (action === 'delete') {
      const id = actionButton.getAttribute('data-id');
      container.querySelector('#employee-absence-delete-id').value = id;
      openModal(deleteModal);
    }
  });
}

async function loadEmployeeOptions(container) {
  const select = container.querySelector('#employee-absence-employee');

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

async function loadReasonOptions(container) {
  const select = container.querySelector('#employee-absence-reason');

  const { data, error } = await supabase
    .from('absence_reasons')
    .select('id, name')
    .order('name', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  const options = (data || [])
    .map((item) => `<option value="${item.id}">${escapeHtml(item.name ?? '-')}</option>`)
    .join('');

  select.innerHTML = '<option value="">Избери причина</option>' + options;
}

async function saveEmployeeAbsence(container) {
  const idInput = container.querySelector('#employee-absence-id');
  const employeeInput = container.querySelector('#employee-absence-employee');
  const reasonInput = container.querySelector('#employee-absence-reason');
  const startDateInput = container.querySelector('#employee-absence-start-date');
  const endDateInput = container.querySelector('#employee-absence-end-date');
  const notesInput = container.querySelector('#employee-absence-notes');
  const saveButton = container.querySelector('#employee-absence-save-btn');

  const employeeId = employeeInput.value || null;
  const reasonId = reasonInput.value || null;
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;
  const notes = notesInput.value.trim() || null;
  const editingId = idInput.value;

  if (!employeeId || !reasonId || !startDate || !endDate) {
    showToast('Моля, попълни всички задължителни полета.', 'warning');
    return;
  }

  if (endDate < startDate) {
    showToast('Полето "До дата" трябва да е след или равно на "От дата".', 'warning');
    return;
  }

  const originalText = saveButton.innerHTML;
  saveButton.disabled = true;
  saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';

  const payload = {
    employee_id: employeeId,
    reason_id: reasonId,
    start_date: startDate,
    end_date: endDate,
    notes
  };

  let error;

  if (editingId) {
    ({ error } = await supabase.from('employee_absences').update(payload).eq('id', editingId));
  } else {
    const { data: userData } = await supabase.auth.getUser();
    const createdFrom = userData?.user?.email ?? 'web_app';
    ({ error } = await supabase.from('employee_absences').insert({ ...payload, created_from: createdFrom }));
  }

  saveButton.disabled = false;
  saveButton.innerHTML = originalText;

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  showToast(editingId ? 'Отсъствието е обновено.' : 'Отсъствието е създадено.', 'success');
  closeModal(container.querySelector('#employee-absence-modal'));
  resetEmployeeAbsenceForm(container);
  await loadEmployeeAbsences(container);
}

function populateEmployeeAbsenceForm(container, absence) {
  container.querySelector('#employee-absence-id').value = absence.id;
  container.querySelector('#employee-absence-employee').value = absence.employeeId ?? '';
  container.querySelector('#employee-absence-reason').value = absence.reasonId ?? '';
  container.querySelector('#employee-absence-start-date').value = absence.startDate ?? '';
  container.querySelector('#employee-absence-end-date').value = absence.endDate ?? '';
  container.querySelector('#employee-absence-notes').value = absence.notes ?? '';

  container.querySelector('#employee-absence-form-title').textContent = 'Редакция на отсъствие';
  container.querySelector('#employee-absence-save-btn').textContent = 'Запази';
}

function resetEmployeeAbsenceForm(container) {
  container.querySelector('#employee-absence-id').value = '';
  container.querySelector('#employee-absence-employee').value = '';
  container.querySelector('#employee-absence-reason').value = '';
  container.querySelector('#employee-absence-start-date').value = '';
  container.querySelector('#employee-absence-end-date').value = '';
  container.querySelector('#employee-absence-notes').value = '';

  container.querySelector('#employee-absence-form-title').textContent = 'Ново отсъствие';
  container.querySelector('#employee-absence-save-btn').textContent = 'Създай';
}

async function deleteEmployeeAbsence(id, container) {
  const deleteButton = container.querySelector('#employee-absence-delete-confirm');
  const originalDeleteText = deleteButton.innerHTML;
  deleteButton.disabled = true;
  deleteButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';

  const { error } = await supabase.from('employee_absences').delete().eq('id', id);

  deleteButton.disabled = false;
  deleteButton.innerHTML = originalDeleteText;

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  showToast('Отсъствието е изтрито.', 'success');
  closeModal(container.querySelector('#employee-absence-delete-modal'));
  resetEmployeeAbsenceForm(container);
  await loadEmployeeAbsences(container);
}
