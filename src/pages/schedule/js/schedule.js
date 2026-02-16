import { loadHtml } from '../../../utils/loadHtml.js';
import { applyPrintDepotLabel } from '../../../utils/printConfig.js';
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

export async function renderSchedulePage(container) {
  const pageHtml = await loadHtml('../schedule.html', import.meta.url);
  container.innerHTML = pageHtml;
  applyPrintDepotLabel(container, '#schedule-print-left-label');

  const dateInput = container.querySelector('#schedule-date');
  const goToActualButton = container.querySelector('#schedule-go-to-actual');
  const printButton = container.querySelector('#schedule-print');
  const orientationInput = container.querySelector('#schedule-print-orientation');
  const compactInput = container.querySelector('#schedule-print-compact');
  const fitOnePageInput = container.querySelector('#schedule-print-fit-one-page');
  const dateFromQuery = getDateFromQuery();

  if (dateInput && dateFromQuery) {
    dateInput.value = dateFromQuery;
  } else if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  attachScheduleHandlers(container);
  await loadEmployeeOptions(container);

  dateInput?.addEventListener('change', async () => {
    await loadScheduleData(container);
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

  printButton?.addEventListener('click', () => {
    const orientation = orientationInput?.value === 'portrait' ? 'portrait' : 'landscape';
    const compact = compactInput?.checked ?? true;
    const fitOnePage = fitOnePageInput?.checked ?? true;

    preparePrintLayout(container, {
      orientation,
      compact,
      fitOnePage
    });

    window.addEventListener('afterprint', cleanupPrintLayout, { once: true });
    window.print();
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
    const targetDate = targetCell.getAttribute('data-drop-date') || '';
    const targetRole = targetCell.getAttribute('data-drop-role') || '';
    const actualIdFromTransfer = event.dataTransfer?.getData('text/plain') || '';
    const actualId = actualIdFromTransfer || draggedActualDutyId;

    if (!targetDutyId || !targetDate || !actualId) {
      dndHandlers.clearDropTargetHighlights(container);
      setScheduleDraggingState(false);
      return;
    }

    dndHandlers.clearDropTargetHighlights(container);
    await dndHandlers.moveDraggedActualDuty(container, actualId, targetDutyId, targetDate, targetRole);
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
}

async function removeEmployeeTripAndDayOffEntries(employeeId, date, currentDutyId, currentActualId) {
  if (!employeeId || !date || !currentDutyId) {
    return null;
  }

  const { data: currentDuty, error: currentDutyError } = await supabase
    .from('duties')
    .select('id, duty_types(name)')
    .eq('id', currentDutyId)
    .single();

  if (currentDutyError) {
    return currentDutyError;
  }

  const currentTypeName = getDutyTypeName(currentDuty).toLowerCase();
  if (!currentTypeName.includes('на влак')) {
    return null;
  }

  const { data: allDuties, error: allDutiesError } = await supabase
    .from('duties')
    .select('id, duty_types(name)');

  if (allDutiesError) {
    return allDutiesError;
  }

  const tripAndDayOffDutyIds = (allDuties || [])
    .filter((duty) => {
      const typeName = getDutyTypeName(duty).toLowerCase();
      return typeName.includes('командировка') || typeName.includes('свободен ден');
    })
    .map((duty) => duty.id)
    .filter(Boolean);

  if (!tripAndDayOffDutyIds.length) {
    return null;
  }

  let deleteQuery = supabase
    .from('actual_duties')
    .delete()
    .eq('employee_id', employeeId)
    .eq('date', date)
    .in('duty_id', tripAndDayOffDutyIds);

  if (currentActualId) {
    deleteQuery = deleteQuery.neq('id', currentActualId);
  }

  const { error: deleteError } = await deleteQuery;
  return deleteError;
}

function setScheduleDraggingState(isDragging) {
  document.body.classList.toggle('schedule-dragging', Boolean(isDragging));
}

