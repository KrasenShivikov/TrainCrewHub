export function attachCrewHandlers(container, deps) {
  const {
    loadCrewMonthlySnapshot,
    crewCalendarState,
    toMonthKey,
    shiftMonthKey,
    getTodayIsoDate,
    renderCrewCalendarAndDetails,
    openCrewActualDutyEditModal,
    openCrewTimetablePreview,
    closeCrewTimetablePreview,
    closeCrewActualDutyEditModal,
    saveCrewActualDutyEdits
  } = deps;

  const crewRefreshButton = container.querySelector('#index-refresh-crew');
  const crewPrevMonthButton = container.querySelector('#index-crew-prev-month');
  const crewNextMonthButton = container.querySelector('#index-crew-next-month');
  const crewTodayMonthButton = container.querySelector('#index-crew-today-month');
  const crewCalendarDays = container.querySelector('#index-crew-calendar-days');
  const crewActualBody = container.querySelector('#index-crew-actual-body');
  const crewTimetablePreviewModal = container.querySelector('#index-timetable-preview-modal');
  const crewTimetablePreviewClose = container.querySelector('#index-timetable-preview-close');
  const crewActualDutyEditModal = container.querySelector('#index-actual-duty-edit-modal');
  const crewActualDutyEditClose = container.querySelector('#index-actual-duty-edit-close');
  const crewActualDutyEditCancel = container.querySelector('#index-actual-duty-edit-cancel');
  const crewActualDutyEditForm = container.querySelector('#index-actual-duty-edit-form');

  crewRefreshButton?.addEventListener('click', async () => {
    const mode = container.dataset.indexMode || 'default';
    const employeeId = container.dataset.indexEmployeeId || '';
    if (mode === 'crew') {
      crewRefreshButton.disabled = true;
      await loadCrewMonthlySnapshot(container, employeeId, crewCalendarState.visibleMonth);
      crewRefreshButton.disabled = false;
    }
  });

  crewPrevMonthButton?.addEventListener('click', async () => {
    const mode = container.dataset.indexMode || 'default';
    const employeeId = container.dataset.indexEmployeeId || '';
    if (mode !== 'crew') {
      return;
    }

    const currentMonth = crewCalendarState.visibleMonth || toMonthKey(new Date());
    const previousMonth = shiftMonthKey(currentMonth, -1);
    await loadCrewMonthlySnapshot(container, employeeId, previousMonth);
  });

  crewNextMonthButton?.addEventListener('click', async () => {
    const mode = container.dataset.indexMode || 'default';
    const employeeId = container.dataset.indexEmployeeId || '';
    if (mode !== 'crew') {
      return;
    }

    const currentMonth = crewCalendarState.visibleMonth || toMonthKey(new Date());
    const nextMonth = shiftMonthKey(currentMonth, 1);
    await loadCrewMonthlySnapshot(container, employeeId, nextMonth);
  });

  crewTodayMonthButton?.addEventListener('click', async () => {
    const mode = container.dataset.indexMode || 'default';
    const employeeId = container.dataset.indexEmployeeId || '';
    if (mode !== 'crew') {
      return;
    }

    const today = new Date();
    crewCalendarState.visibleMonth = toMonthKey(today);
    crewCalendarState.selectedDate = getTodayIsoDate();
    await loadCrewMonthlySnapshot(container, employeeId, crewCalendarState.visibleMonth);
  });

  crewCalendarDays?.addEventListener('click', (event) => {
    const dayButton = event.target.closest('button[data-index-crew-action="select-day"]');
    if (!dayButton) {
      return;
    }

    const mode = container.dataset.indexMode || 'default';
    if (mode !== 'crew') {
      return;
    }

    const dateValue = dayButton.getAttribute('data-date') || '';
    if (!dateValue) {
      return;
    }

    crewCalendarState.selectedDate = dateValue;
    renderCrewCalendarAndDetails(container);
  });

  crewActualBody?.addEventListener('click', (event) => {
    const editButton = event.target.closest('button[data-index-crew-action="edit-actual-duty"]');
    if (editButton) {
      const mode = container.dataset.indexMode || 'default';
      if (mode !== 'crew') {
        return;
      }

      const actualDutyId = editButton.getAttribute('data-actual-duty-id') || '';
      if (!actualDutyId) {
        return;
      }

      openCrewActualDutyEditModal(container, actualDutyId);
      return;
    }

    const previewButton = event.target.closest('button[data-index-crew-action="preview-timetable"]');
    if (!previewButton) {
      return;
    }

    const mode = container.dataset.indexMode || 'default';
    if (mode !== 'crew') {
      return;
    }

    const previewUrl = decodeURIComponent(previewButton.getAttribute('data-preview-url') || '');
    const previewLabel = decodeURIComponent(previewButton.getAttribute('data-preview-label') || '');
    openCrewTimetablePreview(container, previewUrl, previewLabel);
  });

  crewTimetablePreviewClose?.addEventListener('click', () => {
    closeCrewTimetablePreview(container);
  });

  crewTimetablePreviewModal?.addEventListener('click', (event) => {
    if (event.target === crewTimetablePreviewModal) {
      closeCrewTimetablePreview(container);
    }
  });

  crewActualDutyEditClose?.addEventListener('click', () => {
    closeCrewActualDutyEditModal(container);
  });

  crewActualDutyEditCancel?.addEventListener('click', () => {
    closeCrewActualDutyEditModal(container);
  });

  crewActualDutyEditModal?.addEventListener('click', (event) => {
    if (event.target === crewActualDutyEditModal) {
      closeCrewActualDutyEditModal(container);
    }
  });

  crewActualDutyEditForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveCrewActualDutyEdits(container);
  });
}
