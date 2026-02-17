import pageHtml from '../index.html?raw';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { calculateShiftDurationMinutes, intervalToTimeInput } from '../../../utils/dutyTime.js';
import { loadAdminDashboardSnapshot } from './admin-panel.js';
import { createHeadOfTransportController } from './head-of-transport.js';
import { isCrewRole, isTransportAnalyticsMode, resolveUserMode } from './role-mode.js';
import { attachCrewHandlers } from './crew-panel.js';
import { createCrewSnapshotController } from './crew-snapshot.js';
import { createCrewViewController } from './crew-view.js';
import {
  toMonthKey,
  toIsoDateFromDate,
  parseMonthKey,
  shiftMonthKey,
  formatMonthLabel,
  getMonthBounds,
  parseIsoDateSafe,
  countBulgarianWorkdays
} from './date-utils.js';
import { loadSchedulePublicationDates, loadScheduleChangesSummary } from './crew-data.js';
import { applyRoleLayout } from './role-layout.js';

const crewCalendarState = {
  visibleMonth: '',
  selectedDate: '',
  plannedRows: [],
  actualRows: [],
  actualRowsById: new Map(),
  absenceRows: [],
  confirmedDates: new Set(),
  pendingConfirmationDates: new Set(),
  changeCountByDate: new Map(),
  changeEventsByDate: new Map(),
  editingActualDutyId: ''
};

const DEVIATION_MIN_ALLOWED = -20 * 60;
const DEVIATION_MAX_ALLOWED = 30 * 60;

function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function formatDateTime(date) {
  return new Intl.DateTimeFormat('bg-BG', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
}

function formatDate(dateValue) {
  if (!dateValue) {
    return '-';
  }

  return new Intl.DateTimeFormat('bg-BG', { dateStyle: 'medium' }).format(new Date(`${dateValue}T00:00:00`));
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function normalizeDutyTimeValue(value) {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  const normalized = intervalToTimeInput(String(value));
  return normalized || '';
}

function formatDutyTimeValue(value) {
  const normalized = normalizeDutyTimeValue(value);
  return normalized ? normalized.slice(0, 5) : '-';
}

function formatMinutesAsClock(minutes) {
  const numericMinutes = Number(minutes);
  if (!Number.isFinite(numericMinutes) || numericMinutes < 0) {
    return '-';
  }

  const hours = Math.floor(numericMinutes / 60);
  const restMinutes = numericMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(restMinutes).padStart(2, '0')}`;
}

function formatSignedMinutesAsClock(minutes) {
  const numericMinutes = Number(minutes);
  if (!Number.isFinite(numericMinutes)) {
    return '-';
  }

  const sign = numericMinutes < 0 ? '-' : '+';
  const absolute = Math.abs(numericMinutes);
  const hours = Math.floor(absolute / 60);
  const restMinutes = absolute % 60;
  return `${sign}${String(hours).padStart(2, '0')}:${String(restMinutes).padStart(2, '0')}`;
}

function getDeviationClassByThreshold(deviationMinutes) {
  const value = Number(deviationMinutes || 0);
  if (!Number.isFinite(value)) {
    return 'text-bg-secondary';
  }

  if (value < DEVIATION_MIN_ALLOWED || value > DEVIATION_MAX_ALLOWED) {
    return 'text-bg-danger';
  }

  return 'text-bg-success';
}

function getDutyTimingSummary(duty) {
  const startTime = normalizeDutyTimeValue(duty?.start_time);
  const endTime = normalizeDutyTimeValue(duty?.end_time);
  const breakStartTime = normalizeDutyTimeValue(duty?.break_start_time);
  const breakEndTime = normalizeDutyTimeValue(duty?.break_end_time);

  const breakDurationMinutes = breakStartTime && breakEndTime
    ? calculateShiftDurationMinutes(breakStartTime, breakEndTime)
    : null;
  const shiftDurationMinutes = startTime && endTime
    ? calculateShiftDurationMinutes(startTime, endTime)
    : null;

  const durationMinutes = Number.isFinite(shiftDurationMinutes) && Number.isFinite(breakDurationMinutes)
    ? Math.max(0, shiftDurationMinutes - breakDurationMinutes)
    : null;

  return {
    startTime: formatDutyTimeValue(duty?.start_time),
    endTime: formatDutyTimeValue(duty?.end_time),
    breakStartTime: formatDutyTimeValue(duty?.break_start_time),
    breakEndTime: formatDutyTimeValue(duty?.break_end_time),
    breakDuration: breakDurationMinutes === null ? '-' : formatMinutesAsClock(breakDurationMinutes),
    duration: durationMinutes === null ? '-' : formatMinutesAsClock(durationMinutes),
    breakDurationMinutes,
    durationMinutes
  };
}

function getActualDutyTimingSummary(row) {
  const duty = row?.duties || {};

  return getDutyTimingSummary({
    start_time: row?.start_time_override ?? duty?.start_time,
    end_time: row?.end_time_override ?? duty?.end_time,
    break_start_time: row?.break_start_time_override ?? duty?.break_start_time,
    break_end_time: row?.break_end_time_override ?? duty?.break_end_time
  });
}

function toDbTimeValue(value) {
  if (!value) {
    return null;
  }

  return `${String(value).slice(0, 5)}:00`;
}

async function saveCrewActualDutyEdits(container, loadCrewMonthlySnapshot, closeCrewActualDutyEditModal) {
  const mode = container.dataset.indexMode || 'default';
  if (mode !== 'crew') {
    return;
  }

  const employeeId = container.dataset.indexEmployeeId || '';
  const rowId = (container.querySelector('#index-actual-duty-edit-id')?.value || '').trim();
  const startTime = (container.querySelector('#index-actual-duty-start')?.value || '').trim();
  const endTime = (container.querySelector('#index-actual-duty-end')?.value || '').trim();
  const breakStartTime = (container.querySelector('#index-actual-duty-break-start')?.value || '').trim();
  const breakEndTime = (container.querySelector('#index-actual-duty-break-end')?.value || '').trim();
  const saveButton = container.querySelector('#index-actual-duty-edit-save');

  if (!rowId || !startTime || !endTime || !breakStartTime || !breakEndTime) {
    showToast('Попълни всички полета.', 'warning');
    return;
  }

  const shiftDurationMinutes = calculateShiftDurationMinutes(startTime, endTime);
  const breakDurationMinutes = calculateShiftDurationMinutes(breakStartTime, breakEndTime);
  if (breakDurationMinutes > shiftDurationMinutes) {
    showToast('Прекъсването не може да е по-голямо от продължителността.', 'warning');
    return;
  }

  const originalText = saveButton?.innerHTML || 'Запази';
  if (saveButton) {
    saveButton.disabled = true;
    saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';
  }

  const { error } = await supabase
    .from('actual_duties')
    .update({
      start_time_override: toDbTimeValue(startTime),
      end_time_override: toDbTimeValue(endTime),
      break_start_time_override: toDbTimeValue(breakStartTime),
      break_end_time_override: toDbTimeValue(breakEndTime)
    })
    .eq('id', rowId);

  if (saveButton) {
    saveButton.disabled = false;
    saveButton.innerHTML = originalText;
  }

  if (error) {
    showToast(error.message || 'Редакцията не беше запазена.', 'error');
    return;
  }

  closeCrewActualDutyEditModal(container);
  await loadCrewMonthlySnapshot(container, employeeId, crewCalendarState.visibleMonth);
  showToast('Реалната повеска е обновена.', 'success');
}

function formatRoleLabel(value) {
  const role = normalizeRole(value);
  if (role === 'chief') {
    return 'Началник влак';
  }

  if (role === 'conductor') {
    return 'Кондуктор';
  }

  if (role === 'driver') {
    return 'Машинист';
  }

  if (role === 'assistant_driver') {
    return 'Пом. машинист';
  }

  return 'Кондуктор';
}

function setText(container, selector, value) {
  const element = container.querySelector(selector);
  if (!element) {
    return;
  }

  element.textContent = value;
}

async function loadUserSnapshot(container) {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session || null;
  const user = session?.user || null;

  if (!user?.id) {
    setText(container, '#index-welcome-title', 'Добре дошъл в TrainCrewHub');
    setText(container, '#index-welcome-subtitle', 'Влез в профила си, за да видиш персонална информация.');
    return {
      userId: '',
      employeeId: '',
      roles: [],
      crew: false,
      mode: 'default'
    };
  }

  const [{ data: profile }, { data: roleRows }] = await Promise.all([
    supabase
      .from('user_profiles')
      .select('username, employee_id, employees(first_name, last_name)')
      .eq('id', user.id)
      .maybeSingle(),
    supabase.from('user_roles').select('role').eq('user_id', user.id)
  ]);

  const username = profile?.username || user.email || user.id;
  const employeeName = profile?.employees
    ? `${profile.employees.first_name || ''} ${profile.employees.last_name || ''}`.trim()
    : '';
  const roles = [...new Set((roleRows || []).map((item) => String(item?.role || '').trim()).filter(Boolean))];
  const mode = resolveUserMode(roles);

  setText(container, '#index-welcome-title', `Здравей, ${username}${employeeName ? ` | ${employeeName}` : ''}`);
  setText(container, '#index-welcome-subtitle', 'Тук виждаш твоя профил и бърз оперативен преглед за деня.');

  return {
    userId: user.id,
    employeeId: profile?.employee_id || '',
    roles,
    crew: isCrewRole(roles),
    mode
  };
}

function getDistinctBadgeClassByReason(reason) {
  const palette = [
    'text-bg-primary',
    'text-bg-success',
    'text-bg-warning',
    'text-bg-danger',
    'text-bg-info',
    'text-bg-dark'
  ];

  const normalizedReason = String(reason || '').trim().toLowerCase();
  if (!normalizedReason) {
    return palette[0];
  }

  const explicitReasonColors = {
    'бо': 'text-bg-warning',
    'do': 'text-bg-danger',
    'до': 'text-bg-danger',
    'болничен': 'text-bg-warning',
    'отпуск': 'text-bg-primary',
    'командировка': 'text-bg-info'
  };

  if (explicitReasonColors[normalizedReason]) {
    return explicitReasonColors[normalizedReason];
  }

  let hash = 0;
  for (let index = 0; index < normalizedReason.length; index += 1) {
    hash = (hash * 31 + normalizedReason.charCodeAt(index)) % 2147483647;
  }

  return palette[Math.abs(hash) % palette.length];
}

async function loadKpiSnapshot(container) {
  const today = getTodayIsoDate();

  const [
    plannedResponse,
    actualResponse,
    absencesResponse,
    employeesResponse,
    publicationStatusResponse
  ] = await Promise.all([
    supabase.from('planned_duties').select('id', { count: 'exact', head: true }).eq('date', today),
    supabase.from('actual_duties').select('id', { count: 'exact', head: true }).eq('date', today),
    supabase
      .from('employee_absences')
      .select('id', { count: 'exact', head: true })
      .lte('start_date', today)
      .gte('end_date', today),
    supabase.from('employees').select('id', { count: 'exact', head: true }).eq('is_active', true),
    supabase
      .from('schedule_publications')
      .select('is_confirmed')
      .eq('schedule_date', today)
      .maybeSingle()
  ]);

  const hasError = [plannedResponse, actualResponse, absencesResponse, employeesResponse, publicationStatusResponse].some((item) => item.error);
  if (hasError) {
    showToast('Част от данните за индекс страницата не могат да се заредят.', 'warning');
  }

  const isTodayConfirmed = Boolean(publicationStatusResponse?.data?.is_confirmed);
  const actualCount = isTodayConfirmed ? Number(actualResponse.count ?? 0) : 0;

  setText(container, '#index-kpi-planned', String(plannedResponse.count ?? 0));
  setText(container, '#index-kpi-actual', String(actualCount));
  setText(container, '#index-kpi-absences', String(absencesResponse.count ?? 0));
  setText(container, '#index-kpi-employees', String(employeesResponse.count ?? 0));
  setText(container, '#index-last-updated', `Последно обновяване: ${formatDateTime(new Date())}`);
}

async function loadAdminKpiSnapshot(container) {
  await loadAdminDashboardSnapshot(container, {
    setText,
    formatDateTime,
    escapeHtml
  });
}

function attachIndexHandlers(container, headOfTransportController, crewSnapshotController, crewViewController) {
  const refreshButton = container.querySelector('#index-refresh');
  const certificatesPanel = container.querySelector('#index-certificates-panel');
  const absencesPanel = container.querySelector('#index-absences-panel');
  const workloadDateInput = container.querySelector('#index-workload-date');
  const workloadRefreshButton = container.querySelector('#index-workload-refresh');
  const { loadCrewMonthlySnapshot, renderCrewCalendarAndDetails } = crewSnapshotController;
  const {
    openCrewActualDutyEditModal,
    openCrewTimetablePreview,
    closeCrewTimetablePreview,
    closeCrewActualDutyEditModal
  } = crewViewController;

  attachCrewHandlers(container, {
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
    saveCrewActualDutyEdits: (handlerContainer) => saveCrewActualDutyEdits(handlerContainer, loadCrewMonthlySnapshot, closeCrewActualDutyEditModal)
  });

  refreshButton?.addEventListener('click', async () => {
    const mode = container.dataset.indexMode || 'default';
    if (mode === 'admin') {
      refreshButton.disabled = true;
      await loadAdminKpiSnapshot(container);
      refreshButton.disabled = false;
      return;
    }

    if (isTransportAnalyticsMode(mode)) {
      refreshButton.disabled = true;
      await headOfTransportController.loadHeadOfTransportSnapshot(container);
      refreshButton.disabled = false;
      return;
    }

    if (mode !== 'crew') {
      refreshButton.disabled = true;
      await loadKpiSnapshot(container);
      refreshButton.disabled = false;
    }
  });

  certificatesPanel?.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button[data-index-cert-action]');
    if (!actionButton) {
      return;
    }

    const mode = container.dataset.indexMode || 'default';
    if (!isTransportAnalyticsMode(mode)) {
      return;
    }

    const action = actionButton.getAttribute('data-index-cert-action') || '';
    if (action === 'toggle-soon') {
      headOfTransportController.toggleCertificateDetails(container, 'soon');
      return;
    }

    if (action === 'toggle-expired') {
      headOfTransportController.toggleCertificateDetails(container, 'expired');
    }
  });

  absencesPanel?.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button[data-index-absence-action]');
    if (!actionButton) {
      return;
    }

    const mode = container.dataset.indexMode || 'default';
    if (!isTransportAnalyticsMode(mode)) {
      return;
    }

    const action = actionButton.getAttribute('data-index-absence-action') || '';
    if (action !== 'toggle-reason') {
      return;
    }

    const key = actionButton.getAttribute('data-index-absence-key') || '';
    headOfTransportController.toggleAbsenceReasonDetails(container, key);
  });

  workloadDateInput?.addEventListener('change', async () => {
    const mode = container.dataset.indexMode || 'default';
    if (!isTransportAnalyticsMode(mode)) {
      return;
    }

    await headOfTransportController.loadHeadOfTransportWorkload(container);
  });

  workloadRefreshButton?.addEventListener('click', async () => {
    const mode = container.dataset.indexMode || 'default';
    if (!isTransportAnalyticsMode(mode)) {
      return;
    }

    workloadRefreshButton.disabled = true;
    await headOfTransportController.loadHeadOfTransportWorkload(container);
    workloadRefreshButton.disabled = false;
  });
}

export async function renderIndexPage(container) {
  container.innerHTML = pageHtml;
  const headOfTransportController = createHeadOfTransportController({
    loadKpiSnapshot,
    getTodayIsoDate,
    formatDate,
    escapeHtml,
    formatMinutesAsClock,
    formatSignedMinutesAsClock,
    getDeviationClassByThreshold,
    parseIsoDateSafe,
    toMonthKey,
    getMonthBounds,
    countBulgarianWorkdays,
    getDutyTimingSummary,
    getActualDutyTimingSummary,
    getDistinctBadgeClassByReason
  });

  const crewViewController = createCrewViewController({
    crewCalendarState,
    setText,
    getTodayIsoDate,
    toMonthKey,
    toIsoDateFromDate,
    parseMonthKey,
    formatMonthLabel,
    getMonthBounds,
    formatDate,
    formatDateTime,
    escapeHtml,
    countBulgarianWorkdays,
    getDutyTimingSummary,
    getActualDutyTimingSummary,
    formatMinutesAsClock,
    formatSignedMinutesAsClock,
    getDeviationClassByThreshold,
    formatRoleLabel,
    getDistinctBadgeClassByReason
  });

  const crewSnapshotController = createCrewSnapshotController({
    crewCalendarState,
    ensureCrewSelectedDate: crewViewController.ensureCrewSelectedDate,
    renderCrewCalendar: crewViewController.renderCrewCalendar,
    renderCrewHoursSummary: crewViewController.renderCrewHoursSummary,
    renderCrewSelectedDayDetails: crewViewController.renderCrewSelectedDayDetails,
    toMonthKey,
    getMonthBounds,
    loadSchedulePublicationDates: (startDate, endDate) => loadSchedulePublicationDates(supabase, startDate, endDate),
    loadScheduleChangesSummary: (startDate, endDate) => loadScheduleChangesSummary(supabase, startDate, endDate, formatDateTime),
    formatDateTime,
    setText
  });

  attachIndexHandlers(container, headOfTransportController, crewSnapshotController, crewViewController);
  const userContext = await loadUserSnapshot(container);
  applyRoleLayout(container, userContext, {
    setText,
    isTransportAnalyticsMode,
    getTodayIsoDate
  });

  if (userContext?.mode === 'crew') {
    const monthKey = toMonthKey(new Date());
    crewCalendarState.visibleMonth = monthKey;
    crewCalendarState.selectedDate = getTodayIsoDate();
    await crewSnapshotController.loadCrewMonthlySnapshot(container, userContext.employeeId || '', monthKey);
    return;
  }

  if (userContext?.mode === 'admin') {
    await loadAdminKpiSnapshot(container);
    return;
  }

  if (isTransportAnalyticsMode(userContext?.mode || 'default')) {
    await headOfTransportController.loadHeadOfTransportSnapshot(container);
    return;
  }

  await loadKpiSnapshot(container);
}
