import pageHtml from '../duty-types.html?raw';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { closeModal, openModal, setupModalEscapeHandler } from './helpers.js';
import { dutyTypesState } from './state.js';
import { loadDutyTypes, renderDutyTypesTable } from './table.js';
import { isCurrentUserCrew } from '../../../utils/userContext.js';

export async function renderDutyTypesPage(container) {
  container.innerHTML = pageHtml;
  dutyTypesState.actionsEnabled = !(await isCurrentUserCrew());
  applyDutyTypesCrewLayout(container);
  attachDutyTypesHandlers(container);
  await loadDutyTypes(container);
}

function applyDutyTypesCrewLayout(container) {
  if (dutyTypesState.actionsEnabled) {
    return;
  }

  container.querySelector('#open-create-duty-type')?.classList.add('d-none');
  container.querySelector('thead th.text-end')?.classList.add('d-none');
}

function attachDutyTypesHandlers(container) {
  const createButton = container.querySelector('#open-create-duty-type');
  const form = container.querySelector('#duty-type-form');
  const cancelButton = container.querySelector('#duty-type-cancel-btn');
  const tableBody = container.querySelector('#duty-types-table-body');
  const dutyTypeModal = container.querySelector('#duty-type-modal');
  const deleteModal = container.querySelector('#duty-type-delete-modal');
  const modalCloseButton = container.querySelector('#duty-type-modal-close');
  const deleteConfirmButton = container.querySelector('#duty-type-delete-confirm');
  const deleteCancelButton = container.querySelector('#duty-type-delete-cancel');
  const searchInput = container.querySelector('#duty-types-search');

  createButton?.addEventListener('click', () => {
    resetDutyTypeForm(container);
    openModal(dutyTypeModal);
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveDutyType(container);
  });

  cancelButton?.addEventListener('click', () => {
    closeModal(dutyTypeModal);
  });

  modalCloseButton?.addEventListener('click', () => {
    closeModal(dutyTypeModal);
  });

  deleteCancelButton?.addEventListener('click', () => {
    closeModal(deleteModal);
  });

  searchInput?.addEventListener('input', (event) => {
    dutyTypesState.searchQuery = event.target.value.trim().toLowerCase();
    renderDutyTypesTable(container);
  });

  setupModalEscapeHandler('duty-types', [
    deleteModal,
    dutyTypeModal
  ]);

  deleteConfirmButton?.addEventListener('click', async () => {
    const id = container.querySelector('#duty-type-delete-id').value;
    await deleteDutyType(id, container);
  });

  tableBody?.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button[data-action]');
    if (!actionButton) {
      return;
    }

    const action = actionButton.getAttribute('data-action');
    if (action === 'edit') {
      populateDutyTypeForm(container, {
        id: actionButton.getAttribute('data-id'),
        name: actionButton.getAttribute('data-name')
      });
      openModal(dutyTypeModal);
      return;
    }

    if (action === 'delete') {
      const id = actionButton.getAttribute('data-id');
      container.querySelector('#duty-type-delete-id').value = id;
      openModal(deleteModal);
    }
  });
}

async function saveDutyType(container) {
  const idInput = container.querySelector('#duty-type-id');
  const nameInput = container.querySelector('#duty-type-name');
  const saveButton = container.querySelector('#duty-type-save-btn');

  const name = nameInput.value.trim();
  const editingId = idInput.value;

  if (!name) {
    showToast('Моля, попълни наименование.', 'warning');
    return;
  }

  const originalText = saveButton.innerHTML;
  saveButton.disabled = true;
  saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';

  let error;

  if (editingId) {
    ({ error } = await supabase.from('duty_types').update({ name }).eq('id', editingId));
  } else {
    const { data: userData } = await supabase.auth.getUser();
    const createdFrom = userData?.user?.email ?? 'web_app';
    ({ error } = await supabase.from('duty_types').insert({ name, created_from: createdFrom }));
  }

  saveButton.disabled = false;
  saveButton.innerHTML = originalText;

  if (error) {
    if (error.code === '23505') {
      showToast('Такъв тип вече съществува.', 'warning');
      return;
    }

    showToast(error.message, 'error');
    return;
  }

  showToast(editingId ? 'Типът е обновен.' : 'Типът е създаден.', 'success');
  closeModal(container.querySelector('#duty-type-modal'));
  resetDutyTypeForm(container);
  await loadDutyTypes(container);
}

function populateDutyTypeForm(container, dutyType) {
  container.querySelector('#duty-type-id').value = dutyType.id;
  container.querySelector('#duty-type-name').value = dutyType.name ?? '';

  container.querySelector('#duty-type-form-title').textContent = 'Редакция на тип';
  container.querySelector('#duty-type-save-btn').textContent = 'Запази';
}

function resetDutyTypeForm(container) {
  container.querySelector('#duty-type-id').value = '';
  container.querySelector('#duty-type-name').value = '';

  container.querySelector('#duty-type-form-title').textContent = 'Нов тип';
  container.querySelector('#duty-type-save-btn').textContent = 'Създай';
}

async function deleteDutyType(id, container) {
  const deleteButton = container.querySelector('#duty-type-delete-confirm');
  const originalDeleteText = deleteButton.innerHTML;
  deleteButton.disabled = true;
  deleteButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';

  const { count, error: usageError } = await supabase
    .from('duties')
    .select('id', { count: 'exact', head: true })
    .eq('duty_type_id', id);

  if (usageError) {
    deleteButton.disabled = false;
    deleteButton.innerHTML = originalDeleteText;
    showToast(usageError.message, 'error');
    return;
  }

  if ((count || 0) > 0) {
    deleteButton.disabled = false;
    deleteButton.innerHTML = originalDeleteText;
    showToast('Типът не може да се изтрие, защото се използва от повески.', 'warning');
    return;
  }

  const { error } = await supabase.from('duty_types').delete().eq('id', id);

  deleteButton.disabled = false;
  deleteButton.innerHTML = originalDeleteText;

  if (error) {
    if (error.code === '23503') {
      showToast('Типът не може да се изтрие, защото се използва от повески.', 'warning');
      return;
    }

    showToast(error.message, 'error');
    return;
  }

  showToast('Типът е изтрит.', 'success');
  closeModal(container.querySelector('#duty-type-delete-modal'));
  resetDutyTypeForm(container);
  await loadDutyTypes(container);
}
