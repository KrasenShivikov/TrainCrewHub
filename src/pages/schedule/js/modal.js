export function createScheduleModalHandlers({
  actualRowsById,
  supabase,
  showToast,
  getDutyFromRow,
  resolveActualDutyRole,
  openModal,
  closeModal,
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

  function getEmployeeNameById(container, employeeId) {
    const select = container.querySelector('#schedule-actual-edit-employee');
    if (!select || !employeeId) {
      return '-';
    }

    const option = Array.from(select.options || []).find((item) => item?.value === employeeId);
    return String(option?.textContent || '').trim() || '-';
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

  function openEditActualDutyModal(container, actualDutyId) {
    const row = actualRowsById.get(actualDutyId);
    if (!row) {
      showToast('Записът не е намерен.', 'warning');
      return;
    }

    const duty = getDutyFromRow(row);

    container.querySelector('#schedule-actual-edit-title').textContent = 'Редакция на актуална повеска';
    container.querySelector('#schedule-actual-edit-id').value = row.id;
    container.querySelector('#schedule-actual-edit-duty-id').value = row.duty_id || duty?.id || '';
    container.querySelector('#schedule-actual-edit-date-value').value = row.date || '';
    container.querySelector('#schedule-actual-edit-date').value = row.date || '';
    container.querySelector('#schedule-actual-edit-duty').value = duty?.name || '';
    container.querySelector('#schedule-actual-edit-employee').value = row.employee_id || '';
    container.querySelector('#schedule-actual-edit-assignment-role').value = resolveActualDutyRole(row);
    container.querySelector('#schedule-actual-edit-save').textContent = 'Запази';

    openModal(container.querySelector('#schedule-actual-edit-modal'));
  }

  function openCreateActualDutyModal(container, { dutyId, date, dutyName }) {
    container.querySelector('#schedule-actual-edit-title').textContent = 'Нов актуален запис';
    container.querySelector('#schedule-actual-edit-id').value = '';
    container.querySelector('#schedule-actual-edit-duty-id').value = dutyId;
    container.querySelector('#schedule-actual-edit-date-value').value = date;
    container.querySelector('#schedule-actual-edit-date').value = date;
    container.querySelector('#schedule-actual-edit-duty').value = dutyName || '';
    container.querySelector('#schedule-actual-edit-employee').value = '';
    container.querySelector('#schedule-actual-edit-assignment-role').value = 'conductor';
    container.querySelector('#schedule-actual-edit-save').textContent = 'Създай';

    openModal(container.querySelector('#schedule-actual-edit-modal'));
  }

  async function saveEditedActualDuty(container) {
    const idInput = container.querySelector('#schedule-actual-edit-id');
    const dutyIdInput = container.querySelector('#schedule-actual-edit-duty-id');
    const dateValueInput = container.querySelector('#schedule-actual-edit-date-value');
    const employeeInput = container.querySelector('#schedule-actual-edit-employee');
    const assignmentRoleInput = container.querySelector('#schedule-actual-edit-assignment-role');
    const saveButton = container.querySelector('#schedule-actual-edit-save');

    const id = idInput?.value || '';
    const dutyId = dutyIdInput?.value || '';
    const date = dateValueInput?.value || '';
    const employeeId = employeeInput?.value || '';
    const assignmentRole = assignmentRoleInput?.value || 'conductor';

    if (!employeeId) {
      showToast('Избери служител.', 'warning');
      return;
    }

    if (!id && (!dutyId || !date)) {
      showToast('Липсват дата или повеска за новия запис.', 'warning');
      return;
    }

    if (!['chief', 'conductor'].includes(assignmentRole)) {
      showToast('Невалидна роля. Избери Кондуктор или Началник влак.', 'warning');
      return;
    }

    const originalText = saveButton.innerHTML;
    saveButton.disabled = true;
    saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';

    let error;
    let savedActualId = id;
    const previousRow = id ? actualRowsById.get(id) : null;
    const previousDuty = getDutyFromRow(previousRow);
    const previousAssignment = previousRow
      ? {
        employeeName: getEmployeeNameFromRow(previousRow),
        dutyName: previousDuty?.name || '',
        date: previousRow?.date || date,
        role: resolveActualDutyRole(previousRow)
      }
      : null;

    if (id) {
      ({ error } = await supabase
        .from('actual_duties')
        .update({ employee_id: employeeId, assignment_role: assignmentRole })
        .eq('id', id));
    } else {
      const { data: insertedRow, error: insertError } = await supabase
        .from('actual_duties')
        .insert({
          date,
          duty_id: dutyId,
          employee_id: employeeId,
          assignment_role: assignmentRole
        })
        .select('id')
        .single();
      error = insertError;
      savedActualId = insertedRow?.id || '';
    }

    saveButton.disabled = false;
    saveButton.innerHTML = originalText;

    if (error) {
      if (error.code === '23505') {
        showToast('Този запис вече съществува за служителя и повеската.', 'warning');
        return;
      }

      showToast(error.message, 'error');
      return;
    }

    const cleanupResult = await removeEmployeeTripAndDayOffEntries(employeeId, date, dutyId, savedActualId);
    if (cleanupResult?.error) {
      showToast(cleanupResult.error.message, 'error');
      return;
    }

    const nextDutyName = previousDuty?.name || container.querySelector('#schedule-actual-edit-duty')?.value || '';
    const nextAssignment = {
      employeeName: getEmployeeNameById(container, employeeId),
      dutyName: nextDutyName,
      date,
      role: assignmentRole
    };

    const removedEntriesText = buildRemovedEntriesText(cleanupResult?.removedEntries || []);

    closeModal(container.querySelector('#schedule-actual-edit-modal'));
    if (id && previousAssignment) {
      const previousLabel = buildAssignmentLabel(previousAssignment);
      const nextLabel = buildAssignmentLabel(nextAssignment);
      showToast(`Промяна: ${previousLabel} → ${nextLabel}.${removedEntriesText}`, 'success');
    } else {
      const nextLabel = buildAssignmentLabel(nextAssignment);
      showToast(`Ново назначение: ${nextLabel}.${removedEntriesText}`, 'success');
    }

    await loadScheduleData(container);
  }

  return {
    openEditActualDutyModal,
    openCreateActualDutyModal,
    saveEditedActualDuty
  };
}
