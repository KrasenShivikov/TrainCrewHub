import pageHtml from '../schedule.html?raw';
import { applyPrintDepotLabel } from '../../../utils/printConfig.js';
import { countBulgarianWorkdays, getMonthBounds, toMonthKey, toIsoDateFromDate } from '../../index/js/date-utils.js';
import { loadDutiesForScheduleDate } from '../../../utils/scheduleDuties.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import {
  resolveActualDutyRole,
  getDutyTypeName,
  getDutyFromRow,
  getDateFromQuery,
  escapeHtml,
  openModal,
  closeModal,
  setupModalEscapeHandler
} from './helpers.js';
import { preparePrintLayout, cleanupPrintLayout } from './print.js';
import { generateSchedulePdf } from '../../../utils/generateSchedulePdf.js';
import {
  buildAssignmentsByDuty,
  renderBoards,
  setMessage,
  formatDateBg,
  compareByDutyStartTime,
  compareByScheduleKeyOrder
} from './board.js';
import { createScheduleModalHandlers } from './modal.js';
import { createScheduleDndHandlers } from './dnd.js';

const actualRowsById = new Map();
let draggedActualDutyId = '';

function formatPublicationDateTime(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('bg-BG', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
}

function setSchedulePublicationStatus(container, publicationRow) {
  const statusElement = container.querySelector('#schedule-publication-status');
  const confirmRequiredBadge = container.querySelector('#schedule-confirm-required-badge');
  if (!statusElement) {
    return;
  }

  const isConfirmed = Boolean(publicationRow?.is_confirmed);
  if (!isConfirmed) {
    const needsReconfirmation = Boolean(publicationRow);
    confirmRequiredBadge?.classList.toggle('d-none', !needsReconfirmation);

    if (publicationRow) {
      statusElement.textContent = 'Статус: има смяна на служител, нужно е повторно потвърждение от разписание';
    } else {
      statusElement.textContent = 'Статус: непотвърдено от разписание';
    }

    statusElement.classList.remove('text-success');
    statusElement.classList.add('text-warning');
    return;
  }

  confirmRequiredBadge?.classList.add('d-none');

  const source = String(publicationRow?.source || 'timetable').trim();
  const sourceLabel = source === 'timetable' ? 'разписание' : source;
  const confirmedAtText = formatPublicationDateTime(publicationRow?.confirmed_at);
  statusElement.textContent = confirmedAtText
    ? `Статус: потвърдено от ${sourceLabel} (${confirmedAtText})`
    : `Статус: потвърдено от ${sourceLabel}`;
  statusElement.classList.remove('text-warning');
  statusElement.classList.add('text-success');
}

async function loadSchedulePublicationStatus(container, selectedDate) {
  if (!selectedDate) {
    setSchedulePublicationStatus(container, null);
    return null;
  }

  const { data, error } = await supabase
    .from('schedule_publications')
    .select('schedule_date, is_confirmed, source, confirmed_at')
    .eq('schedule_date', selectedDate)
    .maybeSingle();

  if (error) {
    setSchedulePublicationStatus(container, null);
    return null;
  }

  setSchedulePublicationStatus(container, data || null);
  return data || null;
}

async function confirmScheduleFromTimetable(container, selectedDate) {
  if (!selectedDate) {
    showToast('Избери дата за потвърждение.', 'warning');
    return;
  }

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id || null;
  const nowIso = new Date().toISOString();

  const { error } = await supabase
    .from('schedule_publications')
    .upsert({
      schedule_date: selectedDate,
      is_confirmed: true,
      source: 'timetable',
      confirmed_at: nowIso,
      confirmed_by: userId,
      created_from: userId
    }, { onConflict: 'schedule_date' });

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  await loadSchedulePublicationStatus(container, selectedDate);
  showToast('Графикът е потвърден от разписание.', 'success');
}

function openConfirmModal(container) {
  const confirmModal = container.querySelector('#schedule-confirm-modal');
  openModal(confirmModal);
}

function closeConfirmModal(container) {
  const confirmModal = container.querySelector('#schedule-confirm-modal');
  if (confirmModal?.classList.contains('d-none') === false) {
    closeModal(confirmModal);
  }
}

function formatMinutesAsHours(minutes) {
  const h = Math.floor(Math.abs(minutes) / 60);
  const m = Math.abs(minutes) % 60;
  return m > 0 ? `${h}:${String(m).padStart(2, '0')}` : `${h}`;
}

function renderNormDisplay(container, selectedDate) {
  const el = container.querySelector('#schedule-norm-display');
  if (!el) {
    return;
  }

  const referenceDate = selectedDate ? new Date(selectedDate) : new Date();
  const referenceDateIso = toIsoDateFromDate(referenceDate);
  const monthKey = toMonthKey(referenceDate);
  const { startDate } = getMonthBounds(monthKey);
  const workdays = countBulgarianWorkdays(startDate, referenceDateIso);
  const normMinutes = workdays * 8 * 60;
  const normFormatted = formatMinutesAsHours(normMinutes);
  const label = selectedDate ? `Норма до ${formatDateBg(selectedDate)}` : 'Норма до днес';

  el.innerHTML = `
    <div class="schedule-print-norm-inner">
      <div class="schedule-print-norm-label">${label}</div>
      <div class="schedule-print-norm-value">${normFormatted} ч.</div>
      <div class="schedule-print-norm-sub">${workdays} работни дни</div>
    </div>
  `;
}

export async function renderSchedulePage(container) {
  container.innerHTML = pageHtml;
  applyPrintDepotLabel(container, '#schedule-print-left-label');

  const dateInput = container.querySelector('#schedule-date');
  const confirmFromTimetableButton = container.querySelector('#schedule-confirm-from-timetable');
  const goToActualButton = container.querySelector('#schedule-go-to-actual');
  const printButton = container.querySelector('#schedule-print');
  const printModal = container.querySelector('#schedule-print-modal');
  const printModalClose = container.querySelector('#sch-print-modal-close');
  const printModalCancel = container.querySelector('#sch-print-modal-cancel');
  const printModalGo = container.querySelector('#sch-print-modal-go');
  const pdfModalGo    = container.querySelector('#sch-pdf-modal-go');
  const confirmModalCloseButton = container.querySelector('#schedule-confirm-modal-close');
  const confirmModalCancelButton = container.querySelector('#schedule-confirm-modal-cancel');
  const confirmModalConfirmButton = container.querySelector('#schedule-confirm-modal-confirm');
  const dateFromQuery = getDateFromQuery();

  if (dateInput && dateFromQuery) {
    dateInput.value = dateFromQuery;
  } else if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  renderNormDisplay(container, dateInput?.value || '');

  attachScheduleHandlers(container);
  await loadEmployeeOptions(container);

  dateInput?.addEventListener('change', async () => {
    renderNormDisplay(container, dateInput.value || '');
    await loadScheduleData(container);
  });

  confirmFromTimetableButton?.addEventListener('click', () => {
    openConfirmModal(container);
  });

  goToActualButton?.addEventListener('click', () => {
    const selectedDate = dateInput?.value || '';
    if (!selectedDate) {
      showToast('Избери дата, за да отвориш Реални повески.', 'warning');
      return;
    }

    const params = new URLSearchParams({ date: selectedDate });
    window.history.pushState({}, '', `/actual-duties?${params.toString()}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  });

  function openPrintModal() {
    printModal?.classList.remove('d-none');
  }

  function closePrintModal() {
    printModal?.classList.add('d-none');
  }

  printButton?.addEventListener('click', openPrintModal);
  printModalClose?.addEventListener('click', closePrintModal);
  printModalCancel?.addEventListener('click', closePrintModal);

  printModalGo?.addEventListener('click', () => {
    const orientationInput = container.querySelector('input[name="sch-orientation"]:checked');
    const compactInput = container.querySelector('#sch-print-compact');
    const fitOnePageInput = container.querySelector('#sch-print-fit-one-page');

    const orientation = orientationInput?.value === 'portrait' ? 'portrait' : 'landscape';
    const compact = compactInput?.checked ?? true;
    const fitOnePage = fitOnePageInput?.checked ?? true;

    closePrintModal();
    preparePrintLayout(container, { orientation, compact, fitOnePage });
    window.addEventListener('afterprint', cleanupPrintLayout, { once: true });
    // Double rAF ensures the browser commits inline style changes to layout
    // before the print renderer reads them, preventing scale being ignored.
    requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
  });

  pdfModalGo?.addEventListener('click', async () => {
    const orientationInput = container.querySelector('input[name="sch-orientation"]:checked');
    const compactInput     = container.querySelector('#sch-print-compact');

    const orientation = orientationInput?.value === 'portrait' ? 'portrait' : 'landscape';
    const compact     = compactInput?.checked ?? true;
    const date        = dateInput?.value || new Date().toISOString().split('T')[0];

    pdfModalGo.disabled = true;
    pdfModalGo.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Генерира...';

    try {
      await generateSchedulePdf(container, {
        orientation,
        compact,
        hideSecondDay: true,
        filename: `график-${date}.pdf`,
      });
      closePrintModal();
      showToast('PDF файлът е готов.', 'success');
    } catch {
      showToast('Грешка при генериране на PDF.', 'error');
    } finally {
      pdfModalGo.disabled = false;
      pdfModalGo.innerHTML = '<i class="bi bi-file-earmark-pdf me-1"></i>Изтегли PDF';
    }
  });

  confirmModalCloseButton?.addEventListener('click', () => {
    closeConfirmModal(container);
  });

  confirmModalCancelButton?.addEventListener('click', () => {
    closeConfirmModal(container);
  });

  confirmModalConfirmButton?.addEventListener('click', async () => {
    closeConfirmModal(container);
    const selectedDate = dateInput?.value || '';
    confirmFromTimetableButton.disabled = true;
    await confirmScheduleFromTimetable(container, selectedDate);
    confirmFromTimetableButton.disabled = false;
  });

  await loadScheduleData(container);
}

function attachScheduleHandlers(container) {
  const modal = container.querySelector('#schedule-actual-edit-modal');
  const closeButton = container.querySelector('#schedule-actual-edit-modal-close');
  const cancelButton = container.querySelector('#schedule-actual-edit-cancel');
  const form = container.querySelector('#schedule-actual-edit-form');

  const modalHandlers = createScheduleModalHandlers({
    actualRowsById,
    supabase,
    showToast,
    getDutyFromRow,
    resolveActualDutyRole,
    openModal,
    closeModal,
    loadScheduleData,
    removeEmployeeTripAndDayOffEntries
  });

  const dndHandlers = createScheduleDndHandlers({
    actualRowsById,
    supabase,
    showToast,
    resolveActualDutyRole,
    getDutyFromRow,
    getDutyTypeName,
    loadScheduleData,
    removeEmployeeTripAndDayOffEntries
  });

  closeButton?.addEventListener('click', () => closeModal(modal));
  cancelButton?.addEventListener('click', () => closeModal(modal));

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await modalHandlers.saveEditedActualDuty(container);
  });

  container.addEventListener('click', (event) => {
    const editButton = event.target.closest('button[data-actual-edit-id]');
    if (editButton) {
      const actualId = editButton.getAttribute('data-actual-edit-id') || '';
      if (!actualId) {
        return;
      }

      modalHandlers.openEditActualDutyModal(container, actualId);
      return;
    }

    const addButton = event.target.closest('button[data-actual-add-duty-id]');
    if (!addButton) {
      return;
    }

    const dutyId = addButton.getAttribute('data-actual-add-duty-id') || '';
    const date = addButton.getAttribute('data-actual-add-date') || '';
    const dutyName = addButton.getAttribute('data-actual-add-duty-name') || '';
    if (!dutyId || !date) {
      return;
    }

    modalHandlers.openCreateActualDutyModal(container, {
      dutyId,
      date,
      dutyName
    });
  });

  container.addEventListener('dragstart', (event) => {
    const dragButton = event.target.closest('button[data-actual-drag-id]');
    if (!dragButton) {
      return;
    }

    draggedActualDutyId = dragButton.getAttribute('data-actual-drag-id') || '';
    if (!draggedActualDutyId) {
      return;
    }

    setScheduleDraggingState(true);
    dragButton.classList.add('opacity-50');
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', draggedActualDutyId);
    }

    dndHandlers.applyDropTargetHighlights(container, draggedActualDutyId);
  });

  container.addEventListener('dragend', (event) => {
    const dragButton = event.target.closest('button[data-actual-drag-id]');
    dragButton?.classList.remove('opacity-50');
    dndHandlers.clearDropTargetHighlights(container);
    dndHandlers.stopAutoScroll();
    draggedActualDutyId = '';
    setScheduleDraggingState(false);
  });

  container.addEventListener('dragover', (event) => {
    dndHandlers.handleDragOver(event);
  });

  container.addEventListener('drop', async (event) => {
    const targetCell = event.target.closest('td[data-drop-duty-id]');
    if (!targetCell) {
      dndHandlers.clearDropTargetHighlights(container);
      setScheduleDraggingState(false);
      return;
    }

    event.preventDefault();

    const targetDutyId = targetCell.getAttribute('data-drop-duty-id') || '';
    const targetDutyName = targetCell.getAttribute('data-drop-duty-name') || '';
    const targetDate = targetCell.getAttribute('data-drop-date') || '';
    const targetRole = targetCell.getAttribute('data-drop-role') || '';
    const actualIdFromTransfer = event.dataTransfer?.getData('text/plain') || '';
    const actualId = actualIdFromTransfer || draggedActualDutyId;

    if (!targetDutyId || !targetDate || !actualId) {
      dndHandlers.clearDropTargetHighlights(container);
      dndHandlers.stopAutoScroll();
      setScheduleDraggingState(false);
      return;
    }

    dndHandlers.clearDropTargetHighlights(container);
    dndHandlers.stopAutoScroll();
    await dndHandlers.moveDraggedActualDuty(container, actualId, targetDutyId, targetDate, targetRole, targetDutyName);
    setScheduleDraggingState(false);
  });

  setupModalEscapeHandler('schedule', [modal]);
}

async function loadEmployeeOptions(container) {
  const select = container.querySelector('#schedule-actual-edit-employee');
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

  if (select) {
    select.innerHTML = '<option value="">Избери служител</option>' + options;
  }
}

async function loadScheduleData(container) {
  const dateInput = container.querySelector('#schedule-date');
  const selectedDate = dateInput?.value;
  const sheetDateLabel = container.querySelector('#schedule-sheet-date');

  if (sheetDateLabel) {
    sheetDateLabel.textContent = selectedDate ? formatDateBg(selectedDate) : '';
  }

  if (!selectedDate) {
    actualRowsById.clear();
    renderBoards(container, {
      train: [],
      businessTrip: [],
      dayOff: []
    }, new Map());
    setMessage(container, {
      hint: 'Избери дата.',
      error: '',
      empty: ''
    });

    await loadSchedulePublicationStatus(container, '');
    return;
  }

  const { data: rows, error } = await supabase
    .from('actual_duties')
    .select('id, date, duty_id, employee_id, assignment_role, employees(first_name, last_name, positions(title)), duties(id, name, schedule_key_id, display_order, start_time, end_time, second_day, duty_types(name))')
    .eq('date', selectedDate);

  if (error) {
    showToast(error.message, 'error');
    actualRowsById.clear();
    renderBoards(container, {
      train: [],
      businessTrip: [],
      dayOff: []
    }, new Map());
    setMessage(container, {
      hint: '',
      error: 'Грешка при зареждане на актуалните записи.',
      empty: ''
    });

    await loadSchedulePublicationStatus(container, selectedDate);
    return;
  }

  const { data: absenceRows, error: absenceError } = await supabase
    .from('employee_absences')
    .select('employee_id')
    .lte('start_date', selectedDate)
    .gte('end_date', selectedDate);

  if (absenceError) {
    showToast(absenceError.message, 'error');
    actualRowsById.clear();
    renderBoards(container, {
      train: [],
      businessTrip: [],
      dayOff: []
    }, new Map());
    setMessage(container, {
      hint: '',
      error: 'Грешка при зареждане на отсъствията.',
      empty: ''
    });

    await loadSchedulePublicationStatus(container, selectedDate);
    return;
  }

  const { data: allDuties, error: dutiesError } = await loadDutiesForScheduleDate(selectedDate);

  if (dutiesError) {
    showToast(dutiesError.message, 'error');
    actualRowsById.clear();
    renderBoards(container, {
      train: [],
      businessTrip: [],
      dayOff: []
    }, new Map());
    setMessage(container, {
      hint: '',
      error: 'Грешка при зареждане на повеските.',
      empty: ''
    });

    await loadSchedulePublicationStatus(container, selectedDate);
    return;
  }

  const absentEmployeeIds = new Set((absenceRows || []).map((row) => row?.employee_id).filter(Boolean));

  actualRowsById.clear();
  (rows || []).forEach((row) => {
    if (row?.id) {
      actualRowsById.set(row.id, row);
    }
  });

  const groupedDuties = {
    train: [],
    businessTrip: [],
    dayOff: []
  };

  (allDuties || []).forEach((duty) => {
    const typeName = getDutyTypeName(duty).toLowerCase();
    if (typeName.includes('на влак')) {
      groupedDuties.train.push(duty);
      return;
    }

    if (typeName.includes('командировка')) {
      groupedDuties.businessTrip.push(duty);
      return;
    }

    if (typeName.includes('свободен ден')) {
      groupedDuties.dayOff.push(duty);
    }
  });

  groupedDuties.train.sort(compareByDutyStartTime);
  groupedDuties.businessTrip.sort(compareByScheduleKeyOrder);
  groupedDuties.dayOff.sort(compareByScheduleKeyOrder);

  const assignmentsByDuty = buildAssignmentsByDuty(rows || [], absentEmployeeIds);
  renderBoards(container, groupedDuties, assignmentsByDuty, selectedDate);

  const totalCount = groupedDuties.train.length + groupedDuties.businessTrip.length + groupedDuties.dayOff.length;
  setMessage(container, {
    hint: '',
    error: '',
    empty: totalCount ? '' : 'Няма повески за показване по избраните типове.'
  });

  await loadSchedulePublicationStatus(container, selectedDate);
}

async function removeEmployeeTripAndDayOffEntries(employeeId, date, currentDutyId, currentActualId) {
  const emptyResult = {
    error: null,
    removedEntries: []
  };

  if (!employeeId || !date || !currentDutyId) {
    return emptyResult;
  }

  const { data: currentDuty, error: currentDutyError } = await supabase
    .from('duties')
    .select('id, duty_types(name)')
    .eq('id', currentDutyId)
    .single();

  if (currentDutyError) {
    return {
      error: currentDutyError,
      removedEntries: []
    };
  }

  const currentTypeName = getDutyTypeName(currentDuty).toLowerCase();
  if (!currentTypeName.includes('на влак')) {
    return emptyResult;
  }

  const { data: allDuties, error: allDutiesError } = await supabase
    .from('duties')
    .select('id, duty_types(name)');

  if (allDutiesError) {
    return {
      error: allDutiesError,
      removedEntries: []
    };
  }

  const tripAndDayOffDutyIds = (allDuties || [])
    .filter((duty) => {
      const typeName = getDutyTypeName(duty).toLowerCase();
      return typeName.includes('командировка') || typeName.includes('свободен ден');
    })
    .map((duty) => duty.id)
    .filter(Boolean);

  if (!tripAndDayOffDutyIds.length) {
    return emptyResult;
  }

  let rowsQuery = supabase
    .from('actual_duties')
    .select('id, date, duties(name, duty_types(name))')
    .eq('employee_id', employeeId)
    .eq('date', date)
    .in('duty_id', tripAndDayOffDutyIds);

  if (currentActualId) {
    rowsQuery = rowsQuery.neq('id', currentActualId);
  }

  const { data: rowsToRemove, error: rowsError } = await rowsQuery;
  if (rowsError) {
    return {
      error: rowsError,
      removedEntries: []
    };
  }

  const idsToRemove = (rowsToRemove || []).map((item) => item?.id).filter(Boolean);
  if (!idsToRemove.length) {
    return emptyResult;
  }

  const { error: deleteError } = await supabase
    .from('actual_duties')
    .delete()
    .in('id', idsToRemove);

  if (deleteError) {
    return {
      error: deleteError,
      removedEntries: []
    };
  }

  const removedEntries = (rowsToRemove || []).map((row) => {
    const duty = getDutyFromRow(row);
    return {
      dutyName: String(duty?.name || '').trim(),
      dutyTypeName: String(getDutyTypeName(duty) || '').trim(),
      date: String(row?.date || '').trim()
    };
  });

  return {
    error: null,
    removedEntries
  };
}

function setScheduleDraggingState(isDragging) {
  document.body.classList.toggle('schedule-dragging', Boolean(isDragging));
}

