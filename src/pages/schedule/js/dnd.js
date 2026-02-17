let highlightedDropCell = null;

export function createScheduleDndHandlers({
  actualRowsById,
  supabase,
  showToast,
  resolveActualDutyRole,
  getDutyFromRow,
  getDutyTypeName,
  loadScheduleData,
  removeEmployeeTripAndDayOffEntries
}) {
  function formatAssignmentRole(role) {
    return role === 'chief' ? 'Началник влак' : 'Кондуктор';
  }

  function getEmployeeNameFromRow(row) {
    const firstName = row?.employees?.first_name ?? '';
    const lastName = row?.employees?.last_name ?? '';
    return `${firstName} ${lastName}`.trim() || '-';
  }

  function buildAssignmentLabel({ employeeName, dutyName, date, role }) {
    return `${employeeName || '-'} | ${dutyName || '-'} | ${date || '-'} | ${formatAssignmentRole(role)}`;
  }

  function buildRemovedEntriesText(removedEntries) {
    if (!Array.isArray(removedEntries) || !removedEntries.length) {
      return '';
    }

    const normalized = removedEntries
      .map((item) => String(item?.dutyName || item?.dutyTypeName || '').trim())
      .filter(Boolean);

    if (!normalized.length) {
      return ' Премахнати са автоматично конфликтни записи.';
    }

    return ` Премахнати: ${normalized.join(', ')}.`;
  }

  function getDutyCategoryByTypeName(typeName) {
    const normalized = String(typeName || '').toLowerCase();
    if (normalized.includes('на влак')) {
      return 'train';
    }

    if (normalized.includes('командировка')) {
      return 'business-trip';
    }

    if (normalized.includes('свободен ден')) {
      return 'day-off';
    }

    return '';
  }

  function clearDropTargetHighlights(container) {
    container
      .querySelectorAll('.schedule-drop-target, .schedule-drop-target-business-trip, .schedule-drop-target-preferred, .schedule-drop-target-hover')
      .forEach((cell) => {
        cell.classList.remove('schedule-drop-target', 'schedule-drop-target-business-trip', 'schedule-drop-target-preferred', 'schedule-drop-target-hover');
      });
    highlightedDropCell = null;
  }

  function applyDropTargetHighlights(container, actualDutyId) {
    clearDropTargetHighlights(container);

    if (!actualDutyId) {
      return;
    }

    const draggedRow = actualRowsById.get(actualDutyId);
    const draggedDuty = getDutyFromRow(draggedRow);
    const draggedCategory = getDutyCategoryByTypeName(getDutyTypeName(draggedDuty));

    container.querySelectorAll('td[data-drop-duty-id]').forEach((cell) => {
      const targetCategory = getDutyCategoryByTypeName(cell.getAttribute('data-drop-duty-type') || '');
      cell.classList.add('schedule-drop-target');

      if (targetCategory === 'business-trip') {
        cell.classList.add('schedule-drop-target-business-trip');
      }

      if (draggedCategory && targetCategory === draggedCategory) {
        cell.classList.add('schedule-drop-target-preferred');
      }
    });
  }

  function handleDragOver(event) {
    const targetCell = event.target.closest('td[data-drop-duty-id]');
    if (!targetCell) {
      if (highlightedDropCell) {
        highlightedDropCell.classList.remove('schedule-drop-target-hover');
        highlightedDropCell = null;
      }
      return;
    }

    event.preventDefault();
    if (highlightedDropCell && highlightedDropCell !== targetCell) {
      highlightedDropCell.classList.remove('schedule-drop-target-hover');
    }
    highlightedDropCell = targetCell;
    highlightedDropCell.classList.add('schedule-drop-target-hover');
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  async function moveDraggedActualDuty(container, actualDutyId, targetDutyId, targetDate, targetRole, targetDutyName = '') {
    const row = actualRowsById.get(actualDutyId);
    if (!row) {
      return;
    }

    const sameDuty = row.duty_id === targetDutyId;
    const sameDate = row.date === targetDate;
    const normalizedTargetRole = targetRole === 'chief' || targetRole === 'conductor' ? targetRole : '';
    const currentRole = resolveActualDutyRole(row);
    const sameRole = !normalizedTargetRole || currentRole === normalizedTargetRole;
    if (sameDuty && sameDate && sameRole) {
      return;
    }

    const updatePayload = {
      duty_id: targetDutyId,
      date: targetDate
    };

    const previousDutyName = getDutyFromRow(row)?.name || '';
    const previousAssignment = {
      employeeName: getEmployeeNameFromRow(row),
      dutyName: previousDutyName,
      date: row.date || '',
      role: currentRole
    };

    if (normalizedTargetRole) {
      updatePayload.assignment_role = normalizedTargetRole;
    }

    const { error } = await supabase
      .from('actual_duties')
      .update(updatePayload)
      .eq('id', actualDutyId);

    if (error) {
      if (error.code === '23505') {
        showToast('Този запис вече съществува за служителя и повеската.', 'warning');
        return;
      }

      showToast(error.message, 'error');
      return;
    }

    const cleanupResult = await removeEmployeeTripAndDayOffEntries(row.employee_id, targetDate, targetDutyId, actualDutyId);
    if (cleanupResult?.error) {
      showToast(cleanupResult.error.message, 'error');
      return;
    }

    const nextAssignment = {
      employeeName: getEmployeeNameFromRow(row),
      dutyName: targetDutyName || previousDutyName,
      date: targetDate,
      role: normalizedTargetRole || currentRole
    };

    const removedEntriesText = buildRemovedEntriesText(cleanupResult?.removedEntries || []);

    await loadScheduleData(container);
    showToast(`Промяна: ${buildAssignmentLabel(previousAssignment)} → ${buildAssignmentLabel(nextAssignment)}.${removedEntriesText}`, 'success');
  }

  return {
    applyDropTargetHighlights,
    clearDropTargetHighlights,
    handleDragOver,
    moveDraggedActualDuty
  };
}
