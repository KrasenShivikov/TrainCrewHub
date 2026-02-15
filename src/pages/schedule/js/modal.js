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

    const cleanupError = await removeEmployeeTripAndDayOffEntries(employeeId, date, dutyId, savedActualId);
    if (cleanupError) {
      showToast(cleanupError.message, 'error');
      return;
    }

    closeModal(container.querySelector('#schedule-actual-edit-modal'));
    showToast(id ? 'Актуалният запис е обновен.' : 'Актуалният запис е създаден.', 'success');
    await loadScheduleData(container);
  }

  return {
    openEditActualDutyModal,
    openCreateActualDutyModal,
    saveEditedActualDuty
  };
}
