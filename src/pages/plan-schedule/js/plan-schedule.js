import pageHtml from '../plan-schedule.html?raw';
import { applyPrintDepotLabel } from '../../../utils/printConfig.js';
import { loadDutiesForScheduleDate } from '../../../utils/scheduleDuties.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { getDateFromQuery } from './helpers.js';
import { preparePrintLayout, cleanupPrintLayout } from './print.js';
import {
  renderBoards,
  renderAbsenceBoard,
  setMessage,
  formatDateBg,
  buildAbsenceByEmployee,
  groupDutiesFromPlanned,
  buildAssignmentsByDuty
} from './board.js';

export async function renderPlanSchedulePage(container) {
  container.innerHTML = pageHtml;
  applyPrintDepotLabel(container, '#plan-schedule-print-left-label');

  const dateInput = container.querySelector('#plan-schedule-date');
  const printButton = container.querySelector('#plan-schedule-print');
  const orientationInput = container.querySelector('#plan-schedule-print-orientation');
  const compactInput = container.querySelector('#plan-schedule-print-compact');
  const fitOnePageInput = container.querySelector('#plan-schedule-print-fit-one-page');
  const dateFromQuery = getDateFromQuery();

  if (dateInput && dateFromQuery) {
    dateInput.value = dateFromQuery;
  } else if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  dateInput?.addEventListener('change', async () => {
    await loadPlanScheduleData(container);
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

  await loadPlanScheduleData(container);
}

async function loadPlanScheduleData(container) {
  const dateInput = container.querySelector('#plan-schedule-date');
  const selectedDate = dateInput?.value;
  const sheetDateLabel = container.querySelector('#plan-schedule-sheet-date');

  if (sheetDateLabel) {
    sheetDateLabel.textContent = selectedDate ? formatDateBg(selectedDate) : '';
  }

  if (!selectedDate) {
    renderBoards(container, {
      train: [],
      businessTrip: [],
      dayOff: []
    }, new Map());
    renderAbsenceBoard(container.querySelector('#plan-schedule-absence'), []);
    setMessage(container, {
      hint: 'Избери дата.',
      error: '',
      empty: ''
    });
    return;
  }

  const { data: plannedRows, error: plannedError } = await supabase
    .from('planned_duties')
    .select('employee_id, duty_id, assignment_role, employees(first_name, last_name, positions(title)), duties(id, name, schedule_key_id, display_order, start_time, end_time, second_day, duty_types(name))')
    .eq('date', selectedDate);

  if (plannedError) {
    showToast(plannedError.message, 'error');
    renderBoards(container, {
      train: [],
      businessTrip: [],
      dayOff: []
    }, new Map());
    renderAbsenceBoard(container.querySelector('#plan-schedule-absence'), []);
    setMessage(container, {
      hint: '',
      error: 'Грешка при зареждане на планираните записи.',
      empty: ''
    });
    return;
  }

  const { data: allDuties, error: dutiesError } = await loadDutiesForScheduleDate(selectedDate);

  if (dutiesError) {
    showToast(dutiesError.message, 'error');
    renderBoards(container, {
      train: [],
      businessTrip: [],
      dayOff: []
    }, new Map());
    renderAbsenceBoard(container.querySelector('#plan-schedule-absence'), []);
    setMessage(container, {
      hint: '',
      error: 'Грешка при зареждане на повеските.',
      empty: ''
    });
    return;
  }

  const { data: absenceRows, error: absenceError } = await supabase
    .from('employee_absences')
    .select('employee_id, start_date, end_date, employees(first_name, last_name), absence_reasons(name)')
    .lte('start_date', selectedDate)
    .gte('end_date', selectedDate);

  if (absenceError) {
    showToast(absenceError.message, 'error');
    renderBoards(container, {
      train: [],
      businessTrip: [],
      dayOff: []
    }, new Map());
    renderAbsenceBoard(container.querySelector('#plan-schedule-absence'), []);
    setMessage(container, {
      hint: '',
      error: 'Грешка при зареждане на отсъствията.',
      empty: ''
    });
    return;
  }

  const absenceByEmployeeId = buildAbsenceByEmployee(absenceRows || []);
  const groupedDuties = groupDutiesFromPlanned(
    (allDuties || []).map((duty) => ({ duties: duty }))
  );
  const { assignmentsByDuty, absentAssignments } = buildAssignmentsByDuty(plannedRows || [], absenceByEmployeeId);

  renderBoards(container, groupedDuties, assignmentsByDuty);
  renderAbsenceBoard(container.querySelector('#plan-schedule-absence'), absentAssignments);

  const totalCount = groupedDuties.train.length + groupedDuties.businessTrip.length + groupedDuties.dayOff.length;
  setMessage(container, {
    hint: '',
    error: '',
    empty: totalCount || absentAssignments.length ? '' : 'Няма повески за показване по избраните типове.'
  });
}

