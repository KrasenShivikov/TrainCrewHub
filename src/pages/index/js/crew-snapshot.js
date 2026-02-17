import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';

export function createCrewSnapshotController(deps) {
  const {
    crewCalendarState,
    ensureCrewSelectedDate,
    renderCrewCalendar,
    renderCrewHoursSummary,
    renderCrewSelectedDayDetails,
    toMonthKey,
    getMonthBounds,
    loadSchedulePublicationDates,
    loadScheduleChangesSummary,
    formatDateTime,
    setText
  } = deps;

  function renderCrewCalendarAndDetails(container) {
    ensureCrewSelectedDate(crewCalendarState.visibleMonth);
    renderCrewCalendar(container);
    renderCrewHoursSummary(container);
    renderCrewSelectedDayDetails(container);
  }

  async function loadCrewMonthlySnapshot(container, employeeId, targetMonthKey) {
    const monthKey = targetMonthKey || crewCalendarState.visibleMonth || toMonthKey(new Date());
    crewCalendarState.visibleMonth = monthKey;

    if (!employeeId) {
      crewCalendarState.plannedRows = [];
      crewCalendarState.actualRows = [];
      crewCalendarState.actualRowsById = new Map();
      crewCalendarState.absenceRows = [];
      crewCalendarState.confirmedDates = new Set();
      crewCalendarState.pendingConfirmationDates = new Set();
      crewCalendarState.changeCountByDate = new Map();
      crewCalendarState.changeEventsByDate = new Map();
      crewCalendarState.selectedDate = '';
      renderCrewCalendarAndDetails(container);
      setText(container, '#index-crew-last-updated', 'Липсва прикачен служител към профила.');
      return;
    }

    const { startDate, endDate } = getMonthBounds(monthKey);

    const [plannedResponse, actualResponse, absencesResponse, publicationResponse, changeSummaryResponse] = await Promise.all([
      supabase
        .from('planned_duties')
        .select('date, assignment_role, duties(name, start_time, end_time, second_day, break_start_time, break_end_time)')
        .eq('employee_id', employeeId)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true })
        .order('duty_id', { ascending: true }),
      supabase
        .from('actual_duties')
        .select('id, date, assignment_role, reported_at, start_time_override, end_time_override, break_start_time_override, break_end_time_override, duties(name, start_time, end_time, second_day, break_start_time, break_end_time, duty_files, duty_trains(sequence_order, trains(number, timetable_url)))')
        .eq('employee_id', employeeId)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true })
        .order('reported_at', { ascending: false }),
      supabase
        .from('employee_absences')
        .select('start_date, end_date, absence_reasons(name)')
        .eq('employee_id', employeeId)
        .lte('start_date', endDate)
        .gte('end_date', startDate)
        .order('start_date', { ascending: true }),
      loadSchedulePublicationDates(startDate, endDate),
      loadScheduleChangesSummary(startDate, endDate)
    ]);

    if (plannedResponse.error || actualResponse.error || absencesResponse.error || publicationResponse.error || changeSummaryResponse.error) {
      showToast('Част от данните за моите повески не могат да се заредят.', 'warning');
    }

    const confirmedDateSet = publicationResponse.confirmedDateSet || new Set();
    const pendingConfirmationDateSet = publicationResponse.pendingConfirmationDateSet || new Set();
    const changeCountByDate = changeSummaryResponse.changeCountByDate || new Map();
    const changeEventsByDate = changeSummaryResponse.changeEventsByDate || new Map();

    crewCalendarState.plannedRows = plannedResponse.data || [];
    crewCalendarState.actualRows = (actualResponse.data || []).filter((row) => confirmedDateSet.has(String(row?.date || '')));
    crewCalendarState.actualRowsById = new Map(crewCalendarState.actualRows.map((row) => [String(row?.id || ''), row]));
    crewCalendarState.absenceRows = absencesResponse.data || [];
    crewCalendarState.confirmedDates = confirmedDateSet;
    crewCalendarState.pendingConfirmationDates = pendingConfirmationDateSet;
    crewCalendarState.changeCountByDate = changeCountByDate;
    crewCalendarState.changeEventsByDate = changeEventsByDate;
    renderCrewCalendarAndDetails(container);
    setText(container, '#index-crew-last-updated', `Последно обновяване: ${formatDateTime(new Date())}`);
  }

  return {
    loadCrewMonthlySnapshot,
    renderCrewCalendarAndDetails
  };
}
