import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { closeModal, openModal } from './helpers.js';
import { plannedDutiesState } from './state.js';

export function openBulkDeleteModal(container) {
  if (!plannedDutiesState.selectedIds.length) {
    showToast('Избери поне едно планиране за изтриване.', 'warning');
    return;
  }

  const bulkDeleteCount = container.querySelector('#planned-duty-bulk-delete-count');
  if (bulkDeleteCount) {
    bulkDeleteCount.textContent = String(plannedDutiesState.selectedIds.length);
  }

  openModal(container.querySelector('#planned-duty-bulk-delete-modal'));
}

export function toggleSelectAllVisible(checked) {
  const visibleIds = plannedDutiesState.visibleRowIds || [];

  if (checked) {
    const next = new Set(plannedDutiesState.selectedIds);
    visibleIds.forEach((id) => next.add(id));
    plannedDutiesState.selectedIds = Array.from(next);
    return;
  }

  plannedDutiesState.selectedIds = plannedDutiesState.selectedIds.filter((id) => !visibleIds.includes(id));
}

export function toggleSingleSelection(plannedDutyId, checked) {
  if (!plannedDutyId) {
    return;
  }

  if (checked) {
    if (!plannedDutiesState.selectedIds.includes(plannedDutyId)) {
      plannedDutiesState.selectedIds = [...plannedDutiesState.selectedIds, plannedDutyId];
    }
    return;
  }

  plannedDutiesState.selectedIds = plannedDutiesState.selectedIds.filter((id) => id !== plannedDutyId);
}

export async function deleteSelectedPlannedDuties(container, reloadCallback) {
  const deleteButton = container.querySelector('#planned-duty-bulk-delete-confirm');
  const idsToDelete = [...plannedDutiesState.selectedIds];

  if (!idsToDelete.length) {
    closeModal(container.querySelector('#planned-duty-bulk-delete-modal'));
    return;
  }

  const originalDeleteText = deleteButton.innerHTML;
  deleteButton.disabled = true;
  deleteButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';

  let deleteError = null;
  let deletedCount = 0;
  let deniedCount = 0;
  for (let index = 0; index < idsToDelete.length; index += 200) {
    const chunk = idsToDelete.slice(index, index + 200);
    const { data: deletedRows, error } = await supabase
      .from('planned_duties')
      .delete()
      .in('id', chunk)
      .select('id');
    if (error) {
      deleteError = error;
      break;
    }

    const affected = Array.isArray(deletedRows) ? deletedRows.length : 0;
    deletedCount += affected;
    deniedCount += Math.max(0, chunk.length - affected);
  }

  deleteButton.disabled = false;
  deleteButton.innerHTML = originalDeleteText;

  if (deleteError) {
    showToast(deleteError.message, 'error');
    return;
  }

  if (deletedCount === 0) {
    showToast('Нямаш права да изтриеш избраните планирания.', 'warning');
    return;
  }

  plannedDutiesState.selectedIds = [];
  closeModal(container.querySelector('#planned-duty-bulk-delete-modal'));
  await reloadCallback();

  if (deniedCount > 0) {
    showToast(`Изтрити планирания: ${deletedCount}. Пропуснати (без права): ${deniedCount}.`, 'warning');
    return;
  }

  showToast(`Изтрити планирания: ${deletedCount}.`, 'success');
}

export async function addSelectedPlannedToActualDuties(container, reloadCallback) {
  const addButton = container.querySelector('#add-selected-to-actual-duty');
  const selectedIds = [...plannedDutiesState.selectedIds];

  if (!selectedIds.length) {
    showToast('Избери поне едно планиране за прехвърляне към Актуални.', 'warning');
    return false;
  }

  const selectedMap = new Set(selectedIds);
  const selectedRows = plannedDutiesState.rows.filter((row) => selectedMap.has(row.id));

  if (!selectedRows.length) {
    showToast('Няма валидни избрани планирания за прехвърляне.', 'warning');
    return false;
  }

  const payload = selectedRows
    .filter((row) => row?.date && row?.employee_id && row?.duty_id)
    .map((row) => ({
      date: row.date,
      employee_id: row.employee_id,
      duty_id: row.duty_id,
      assignment_role: row.assignment_role || 'conductor'
    }));

  if (!payload.length) {
    showToast('Избраните записи са невалидни за прехвърляне.', 'warning');
    return false;
  }

  const originalText = addButton?.innerHTML || 'Към Актуални';
  if (addButton) {
    addButton.disabled = true;
    addButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Прехвърляне...';
  }

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

  if (addButton) {
    addButton.disabled = false;
    addButton.innerHTML = originalText;
  }

  if (upsertError) {
    showToast(upsertError.message, 'error');
    return false;
  }

  const movedCount = payload.length;
  plannedDutiesState.selectedIds = [];
  await reloadCallback();
  showToast(`Прехвърлени към Актуални: ${movedCount}. Съществуващите са пропуснати.`, 'success');
  return true;
}
