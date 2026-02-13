import {
  calculateShiftDurationMinutes,
  intervalToTimeInput
} from '../../../utils/dutyTime.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { closeModal, escapeHtml, openModal } from './helpers.js';
import { scheduleKeyDutiesState } from './state.js';

export function attachScheduleKeyDutiesHandlers(container) {
  const dutiesModal = container.querySelector('#schedule-key-duties-modal');
  const dutiesCloseButton = container.querySelector('#schedule-key-duties-close');
  const dutiesModalCloseButton = container.querySelector('#schedule-key-duties-modal-close');
  const dutiesForm = container.querySelector('#schedule-key-duties-form');
  const dutiesBody = container.querySelector('#schedule-key-duties-body');
  const dutiesEditCancelButton = container.querySelector('#schedule-key-duty-edit-cancel');

  dutiesCloseButton?.addEventListener('click', () => {
    closeModal(dutiesModal);
  });

  dutiesModalCloseButton?.addEventListener('click', () => {
    closeModal(dutiesModal);
  });

  dutiesForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveDutyForScheduleKey(container);
  });

  dutiesEditCancelButton?.addEventListener('click', () => {
    resetScheduleKeyDutyForm(container);
  });

  dutiesBody?.addEventListener('dragstart', (event) => {
    const row = event.target.closest('tr[data-duty-id]');
    if (!row) {
      return;
    }

    scheduleKeyDutiesState.draggedDutyId = row.getAttribute('data-duty-id');
    row.classList.add('table-active');
  });

  dutiesBody?.addEventListener('dragend', (event) => {
    const row = event.target.closest('tr[data-duty-id]');
    if (row) {
      row.classList.remove('table-active');
    }
    scheduleKeyDutiesState.draggedDutyId = null;
  });

  dutiesBody?.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  dutiesBody?.addEventListener('drop', async (event) => {
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
    renderScheduleKeyDuties(container);

    const keyId = container.querySelector('#schedule-key-duties-key-id').value;
    const persisted = await persistScheduleKeyDutiesOrder(keyId);
    if (!persisted) {
      await loadDutiesForScheduleKey(keyId, container);
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
    if (action === 'edit') {
      populateScheduleKeyDutyForm(container, {
        id: actionButton.getAttribute('data-id'),
        name: actionButton.getAttribute('data-name'),
        startTime: actionButton.getAttribute('data-start-time'),
        endTime: actionButton.getAttribute('data-end-time'),
        breakStartTime: actionButton.getAttribute('data-break-start-time'),
        breakEndTime: actionButton.getAttribute('data-break-end-time')
      });
      return;
    }

    if (action === 'delete') {
      const dutyId = actionButton.getAttribute('data-id');
      await deleteDutyForScheduleKey(container, dutyId);
    }
  });
}

export async function openScheduleKeyDutiesModal(container, scheduleKeyId, scheduleKeyName) {
  container.querySelector('#schedule-key-duties-key-id').value = scheduleKeyId;
  container.querySelector('#schedule-key-duties-title').textContent = scheduleKeyName;
  resetScheduleKeyDutyForm(container);
  openModal(container.querySelector('#schedule-key-duties-modal'));
  await loadDutiesForScheduleKey(scheduleKeyId, container);
}

async function loadDutiesForScheduleKey(scheduleKeyId, container) {
  const { data, error } = await supabase
    .from('duties')
    .select('id, name, start_time, end_time, break_start_time, break_end_time, break_duration_interval, duration_interval, display_order')
    .eq('schedule_key_id', scheduleKeyId)
    .order('display_order', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    scheduleKeyDutiesState.duties = [];
    renderScheduleKeyDuties(container, 'Грешка при зареждане на повеските.');
    showToast(error.message, 'error');
    return;
  }

  scheduleKeyDutiesState.duties = data || [];
  renderScheduleKeyDuties(container);
}

function renderScheduleKeyDuties(container, explicitEmptyMessage) {
  const dutiesBody = container.querySelector('#schedule-key-duties-body');
  const emptyState = container.querySelector('#schedule-key-duties-empty');

  if (!scheduleKeyDutiesState.duties.length) {
    dutiesBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма повески към този Ключ-График.';
    return;
  }

  emptyState.classList.add('d-none');
  dutiesBody.innerHTML = scheduleKeyDutiesState.duties
    .map(
      (item) => `
        <tr data-duty-id="${item.id}" draggable="true">
          <td class="text-secondary">↕</td>
          <td>${escapeHtml(item.name ?? '-')}</td>
          <td>${escapeHtml(item.start_time ?? '-')}</td>
          <td>${escapeHtml(item.end_time ?? '-')}</td>
          <td>${escapeHtml(formatInterval(item.break_duration_interval))}</td>
          <td>${escapeHtml(formatInterval(item.duration_interval))}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-duty-action="edit"
                data-id="${item.id}"
                data-name="${escapeHtml(item.name ?? '')}"
                data-start-time="${escapeHtml(item.start_time ?? '')}"
                data-end-time="${escapeHtml(item.end_time ?? '')}"
                data-break-start-time="${escapeHtml(item.break_start_time ?? '00:00:00')}"
                data-break-end-time="${escapeHtml(item.break_end_time ?? '00:00:00')}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-duty-action="delete"
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
}

async function saveDutyForScheduleKey(container) {
  const scheduleKeyId = container.querySelector('#schedule-key-duties-key-id').value;
  const dutyIdInput = container.querySelector('#schedule-key-duty-id');
  const nameInput = container.querySelector('#schedule-key-duty-name');
  const startInput = container.querySelector('#schedule-key-duty-start');
  const endInput = container.querySelector('#schedule-key-duty-end');
  const breakStartInput = container.querySelector('#schedule-key-duty-break-start');
  const breakEndInput = container.querySelector('#schedule-key-duty-break-end');
  const saveButton = container.querySelector('#schedule-key-duty-save-btn');
  const editingDutyId = dutyIdInput.value;

  const name = nameInput.value.trim();
  const startTime = startInput.value;
  const endTime = endInput.value;
  const breakStartTime = breakStartInput.value;
  const breakEndTime = breakEndInput.value;

  if (!scheduleKeyId || !name || !startTime || !endTime) {
    showToast('Моля, попълни всички полета за повеската.', 'warning');
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
  saveButton.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>${editingDutyId ? 'Запис...' : 'Добавяне...'}`;

  let error;

  if (editingDutyId) {
    ({ error } = await supabase
      .from('duties')
      .update({
        name,
        start_time: startTime,
        end_time: endTime,
        break_start_time: breakStartTime,
        break_end_time: breakEndTime
      })
      .eq('id', editingDutyId)
      .eq('schedule_key_id', scheduleKeyId));
  } else {
    const { data: userData } = await supabase.auth.getUser();
    const createdFrom = userData?.user?.email ?? 'web_app';
    const maxDisplayOrder = scheduleKeyDutiesState.duties.reduce(
      (maxValue, item) => Math.max(maxValue, Number(item.display_order) || 0),
      0
    );

    ({ error } = await supabase.from('duties').insert({
      schedule_key_id: scheduleKeyId,
      name,
      start_time: startTime,
      end_time: endTime,
      break_start_time: breakStartTime,
      break_end_time: breakEndTime,
      created_from: createdFrom,
      display_order: maxDisplayOrder + 1
    }));
  }

  saveButton.disabled = false;
  saveButton.innerHTML = originalButtonText;

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  resetScheduleKeyDutyForm(container);
  showToast(editingDutyId ? 'Повеската е обновена.' : 'Повеската е добавена към Ключ-График.', 'success');
  await loadDutiesForScheduleKey(scheduleKeyId, container);
}

function populateScheduleKeyDutyForm(container, duty) {
  container.querySelector('#schedule-key-duty-id').value = duty.id;
  container.querySelector('#schedule-key-duty-name').value = duty.name ?? '';
  container.querySelector('#schedule-key-duty-start').value = duty.startTime ?? '';
  container.querySelector('#schedule-key-duty-end').value = duty.endTime ?? '';
  container.querySelector('#schedule-key-duty-break-start').value = intervalToTimeInput(duty.breakStartTime);
  container.querySelector('#schedule-key-duty-break-end').value = intervalToTimeInput(duty.breakEndTime);
  container.querySelector('#schedule-key-duty-save-btn').textContent = 'Запази';
  container.querySelector('#schedule-key-duty-edit-cancel').classList.remove('d-none');
}

function resetScheduleKeyDutyForm(container) {
  container.querySelector('#schedule-key-duty-id').value = '';
  container.querySelector('#schedule-key-duty-name').value = '';
  container.querySelector('#schedule-key-duty-start').value = '';
  container.querySelector('#schedule-key-duty-end').value = '';
  container.querySelector('#schedule-key-duty-break-start').value = '00:00';
  container.querySelector('#schedule-key-duty-break-end').value = '00:00';
  container.querySelector('#schedule-key-duty-save-btn').textContent = 'Добави';
  container.querySelector('#schedule-key-duty-edit-cancel').classList.add('d-none');
}

async function deleteDutyForScheduleKey(container, dutyId) {
  const confirmed = window.confirm('Сигурен ли си, че искаш да изтриеш тази повеска?');
  if (!confirmed) {
    return;
  }

  const scheduleKeyId = container.querySelector('#schedule-key-duties-key-id').value;
  const { error } = await supabase
    .from('duties')
    .delete()
    .eq('id', dutyId)
    .eq('schedule_key_id', scheduleKeyId);

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  showToast('Повеската е изтрита.', 'success');
  resetScheduleKeyDutyForm(container);
  await loadDutiesForScheduleKey(scheduleKeyId, container);
}

async function persistScheduleKeyDutiesOrder(scheduleKeyId) {
  const updates = scheduleKeyDutiesState.duties.map((item, index) =>
    supabase
      .from('duties')
      .update({ display_order: index + 1 })
      .eq('id', item.id)
      .eq('schedule_key_id', scheduleKeyId)
  );

  const results = await Promise.all(updates);
  const failed = results.find((result) => result.error);
  if (failed?.error) {
    showToast(failed.error.message, 'error');
    return false;
  }

  scheduleKeyDutiesState.duties = scheduleKeyDutiesState.duties.map((item, index) => ({
    ...item,
    display_order: index + 1
  }));
  return true;
}

function formatInterval(value) {
  if (!value) {
    return '-';
  }

  if (typeof value === 'string') {
    return value.replace('.000000', '');
  }

  return String(value);
}
