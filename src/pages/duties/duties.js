import { loadHtml } from '../../utils/loadHtml.js';
import { supabase } from '../../services/supabaseClient.js';
import { showToast } from '../../components/toast/toast.js';

const PAGE_SIZE = 8;

const dutiesState = {
  allDuties: [],
  searchQuery: '',
  currentPage: 1,
  draggedDutyId: null
};

export async function renderDutiesPage(container) {
  const pageHtml = await loadHtml('./duties.html', import.meta.url);
  container.innerHTML = pageHtml;
  attachDutiesHandlers(container);
  await loadScheduleKeyOptions(container);
  await loadDuties(container);
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

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    if (!deleteModal?.classList.contains('d-none')) {
      closeModal(deleteModal);
      return;
    }

    if (!dutyModal?.classList.contains('d-none')) {
      closeModal(dutyModal);
    }
  });

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
      populateDutyForm(container, {
        id: actionButton.getAttribute('data-id'),
        name: actionButton.getAttribute('data-name'),
        scheduleKeyId: actionButton.getAttribute('data-schedule-key-id'),
        startTime: actionButton.getAttribute('data-start-time'),
        endTime: actionButton.getAttribute('data-end-time')
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
  const select = container.querySelector('#duty-schedule-key');

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

  select.innerHTML = '<option value="">Без ключ-график</option>' + options;
}

async function saveDuty(container) {
  const idInput = container.querySelector('#duty-id');
  const nameInput = container.querySelector('#duty-name');
  const scheduleKeyInput = container.querySelector('#duty-schedule-key');
  const startTimeInput = container.querySelector('#duty-start-time');
  const endTimeInput = container.querySelector('#duty-end-time');
  const saveButton = container.querySelector('#duty-save-btn');

  const name = nameInput.value.trim();
  const scheduleKeyId = scheduleKeyInput.value || null;
  const startTime = startTimeInput.value;
  const endTime = endTimeInput.value;
  const editingId = idInput.value;

  if (!name || !startTime || !endTime) {
    showToast('Моля, попълни всички задължителни полета.', 'warning');
    return;
  }

  const originalText = saveButton.innerHTML;
  saveButton.disabled = true;
  saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';

  const payload = {
    name,
    schedule_key_id: scheduleKeyId,
    start_time: startTime,
    end_time: endTime
  };

  let error;

  if (editingId) {
    ({ error } = await supabase.from('duties').update(payload).eq('id', editingId));
  } else {
    const { data: userData } = await supabase.auth.getUser();
    const createdFrom = userData?.user?.email ?? 'web_app';
    const maxDisplayOrder = dutiesState.allDuties.reduce(
      (maxValue, item) => Math.max(maxValue, Number(item.display_order) || 0),
      0
    );
    ({ error } = await supabase
      .from('duties')
      .insert({ ...payload, created_from: createdFrom, display_order: maxDisplayOrder + 1 }));
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
  container.querySelector('#duty-schedule-key').value = duty.scheduleKeyId ?? '';
  container.querySelector('#duty-start-time').value = duty.startTime ?? '';
  container.querySelector('#duty-end-time').value = duty.endTime ?? '';

  container.querySelector('#duty-form-title').textContent = 'Редакция на Повеска';
  container.querySelector('#duty-save-btn').textContent = 'Запази';
}

function resetDutyForm(container) {
  container.querySelector('#duty-id').value = '';
  container.querySelector('#duty-name').value = '';
  container.querySelector('#duty-schedule-key').value = '';
  container.querySelector('#duty-start-time').value = '';
  container.querySelector('#duty-end-time').value = '';

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

function openModal(modalElement) {
  modalElement.classList.remove('d-none');
  document.body.classList.add('overflow-hidden');
}

function closeModal(modalElement) {
  modalElement.classList.add('d-none');
  if (
    document.querySelector('#duty-modal')?.classList.contains('d-none') &&
    document.querySelector('#duty-delete-modal')?.classList.contains('d-none')
  ) {
    document.body.classList.remove('overflow-hidden');
  }
}

function formatDuration(durationValue) {
  if (!durationValue) {
    return '-';
  }

  if (typeof durationValue === 'string') {
    return durationValue.replace('.000000', '');
  }

  return String(durationValue);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function loadDuties(container) {
  const { data, error } = await supabase
    .from('duties')
    .select('id, name, schedule_key_id, start_time, end_time, duration, display_order, schedule_keys(name)')
    .order('display_order', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    dutiesState.allDuties = [];
    renderDutiesTable(container, 'Грешка при зареждане на повеските.');
    return;
  }

  dutiesState.allDuties = data || [];
  renderDutiesTable(container);
}

async function persistDutiesOrder() {
  const updates = dutiesState.allDuties.map((item, index) =>
    supabase
      .from('duties')
      .update({ display_order: index + 1 })
      .eq('id', item.id)
  );

  const results = await Promise.all(updates);
  const failed = results.find((result) => result.error);

  if (failed?.error) {
    showToast(failed.error.message, 'error');
    return false;
  }

  dutiesState.allDuties = dutiesState.allDuties.map((item, index) => ({
    ...item,
    display_order: index + 1
  }));
  return true;
}

function renderDutiesTable(container, explicitEmptyMessage) {
  const tableBody = container.querySelector('#duties-table-body');
  const emptyState = container.querySelector('#duties-empty');
  const pagination = container.querySelector('#duties-pagination');
  const pageInfo = container.querySelector('#duties-page-info');
  const prevPageButton = container.querySelector('#duties-prev-page');
  const nextPageButton = container.querySelector('#duties-next-page');

  const filteredDuties = dutiesState.allDuties.filter((item) => {
    if (!dutiesState.searchQuery) {
      return true;
    }

    const name = (item.name || '').toLowerCase();
    const scheduleKeyName = (item.schedule_keys?.name || '').toLowerCase();
    return name.includes(dutiesState.searchQuery) || scheduleKeyName.includes(dutiesState.searchQuery);
  });

  if (!filteredDuties.length) {
    tableBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма въведени повески.';
    pagination.classList.add('d-none');
    return;
  }

  emptyState.classList.add('d-none');

  const totalPages = Math.max(1, Math.ceil(filteredDuties.length / PAGE_SIZE));
  if (dutiesState.currentPage > totalPages) {
    dutiesState.currentPage = totalPages;
  }
  if (dutiesState.currentPage < 1) {
    dutiesState.currentPage = 1;
  }

  const startIndex = (dutiesState.currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const pagedDuties = filteredDuties.slice(startIndex, endIndex);

  tableBody.innerHTML = pagedDuties
    .map(
      (item) => `
        <tr data-duty-id="${item.id}" draggable="true">
          <td class="text-secondary">↕</td>
          <td>${escapeHtml(item.name ?? '-')}</td>
          <td>${escapeHtml(item.schedule_keys?.name ?? '-')}</td>
          <td>${escapeHtml(item.start_time ?? '-')}</td>
          <td>${escapeHtml(item.end_time ?? '-')}</td>
          <td>${escapeHtml(formatDuration(item.duration))}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${item.id}"
                data-name="${escapeHtml(item.name ?? '')}"
                data-schedule-key-id="${item.schedule_key_id ?? ''}"
                data-start-time="${escapeHtml(item.start_time ?? '')}"
                data-end-time="${escapeHtml(item.end_time ?? '')}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${item.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `
    )
    .join('');

  if (filteredDuties.length <= PAGE_SIZE) {
    pagination.classList.add('d-none');
    return;
  }

  pagination.classList.remove('d-none');
  pageInfo.textContent = `Страница ${dutiesState.currentPage} от ${totalPages}`;
  prevPageButton.disabled = dutiesState.currentPage <= 1;
  nextPageButton.disabled = dutiesState.currentPage >= totalPages;
}
