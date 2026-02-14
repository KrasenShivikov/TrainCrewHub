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
  for (let index = 0; index < idsToDelete.length; index += 200) {
    const chunk = idsToDelete.slice(index, index + 200);
    const { error } = await supabase.from('planned_duties').delete().in('id', chunk);
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
  plannedDutiesState.selectedIds = [];
  closeModal(container.querySelector('#planned-duty-bulk-delete-modal'));
  await reloadCallback();
  showToast(`Изтрити планирания: ${deletedCount}.`, 'success');
}
