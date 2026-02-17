import { loadHtml } from '../../../utils/loadHtml.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { calculateShiftDurationMinutes, intervalToTimeInput } from '../../../utils/dutyTime.js';

const indexAbsenceState = {
  groups: [],
  selectedKey: ''
};

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

const crewAbsenceCodeClassMap = {
  'БО': 'text-bg-warning',
  'ДО': 'text-bg-danger',
  'ПО': 'text-bg-primary',
  'НП': 'text-bg-dark',
  'К': 'text-bg-info',
  'ОТС': 'text-bg-secondary'
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

function normalizeRole(role) {
  return String(role || '').trim().toLowerCase();
}

function isAdminRole(roles) {
  const normalized = (roles || []).map((role) => normalizeRole(role));
  return normalized.includes('admin');
}

function isManagerRole(roles) {
  const normalized = (roles || []).map((role) => normalizeRole(role));
  return normalized.includes('crew_manager');
}

function isHeadOfTransportRole(roles) {
  const normalized = (roles || []).map((role) => normalizeRole(role));
  return normalized.includes('head_of_transport');
}

function isInstructorRole(roles) {
  const normalized = (roles || []).map((role) => normalizeRole(role));
  return normalized.includes('crew_instructor') || normalized.includes('instructor');
}

function isCrewRole(roles) {
  const normalized = (roles || []).map((role) => normalizeRole(role));
  return normalized.includes('crew') || normalized.includes('crew_member') || normalized.includes('user');
}

function resolveUserMode(roles) {
  if (isAdminRole(roles)) {
    return 'admin';
  }

  if (isHeadOfTransportRole(roles)) {
    return 'head_of_transport';
  }

  if (isInstructorRole(roles)) {
    return 'head_of_transport';
  }

  if (isManagerRole(roles)) {
    return 'manager';
  }

  if (isCrewRole(roles)) {
    return 'crew';
  }

  return 'default';
}

function formatDutyTime(startTime, endTime, secondDay) {
  if (!startTime || !endTime) {
    return '-';
  }

  return secondDay ? `${startTime} - ${endTime} (+1)` : `${startTime} - ${endTime}`;
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

function getActualDutyRowById(rowId) {
  if (!rowId) {
    return null;
  }

  return crewCalendarState.actualRowsById.get(rowId) || null;
}

function openCrewActualDutyEditModal(container, rowId) {
  const modal = container.querySelector('#index-actual-duty-edit-modal');
  const idInput = container.querySelector('#index-actual-duty-edit-id');
  const startInput = container.querySelector('#index-actual-duty-start');
  const endInput = container.querySelector('#index-actual-duty-end');
  const breakStartInput = container.querySelector('#index-actual-duty-break-start');
  const breakEndInput = container.querySelector('#index-actual-duty-break-end');

  const row = getActualDutyRowById(rowId);
  if (!modal || !idInput || !startInput || !endInput || !breakStartInput || !breakEndInput || !row) {
    showToast('Не е намерена реална повеска за редакция.', 'warning');
    return;
  }

  idInput.value = rowId;
  const timing = getActualDutyTimingSummary(row);
  startInput.value = timing.startTime === '-' ? '' : timing.startTime;
  endInput.value = timing.endTime === '-' ? '' : timing.endTime;
  breakStartInput.value = timing.breakStartTime === '-' ? '00:00' : timing.breakStartTime;
  breakEndInput.value = timing.breakEndTime === '-' ? '00:00' : timing.breakEndTime;

  crewCalendarState.editingActualDutyId = rowId;
  modal.classList.remove('d-none');
}

function closeCrewActualDutyEditModal(container) {
  const modal = container.querySelector('#index-actual-duty-edit-modal');
  const form = container.querySelector('#index-actual-duty-edit-form');
  const idInput = container.querySelector('#index-actual-duty-edit-id');

  if (form) {
    form.reset();
  }

  if (idInput) {
    idInput.value = '';
  }

  crewCalendarState.editingActualDutyId = '';
  modal?.classList.add('d-none');
}

async function saveCrewActualDutyEdits(container) {
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

function setWelcomeIdentity(container, { username = '', employeeName = '', employeeId = '' } = {}) {
  const profileButton = container.querySelector('#index-open-employee-profile');

  if (profileButton) {
    if (employeeId) {
      profileButton.classList.remove('d-none');
      profileButton.setAttribute('href', `/employees?profile=${encodeURIComponent(employeeId)}`);
    } else {
      profileButton.classList.add('d-none');
      profileButton.setAttribute('href', '/employees');
    }
  }
}

async function loadUserSnapshot(container) {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session || null;
  const user = session?.user || null;

  if (!user?.id) {
    setText(container, '#index-welcome-title', 'Добре дошъл в TrainCrewHub');
    setText(container, '#index-welcome-subtitle', 'Влез в профила си, за да видиш персонална информация.');
    setWelcomeIdentity(container, { username: '', employeeName: '', employeeId: '' });
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

  setText(container, '#index-welcome-title', `Здравей, ${username}${employeeName ? ` | ${employeeName}` : ''}`);
  setText(container, '#index-welcome-subtitle', 'Тук виждаш твоя профил и бърз оперативен преглед за деня.');
  setWelcomeIdentity(container, {
    username,
    employeeName: employeeName || '',
    employeeId: profile?.employee_id || ''
  });

  return {
    userId: user.id,
    employeeId: profile?.employee_id || '',
    roles,
    crew: isCrewRole(roles),
    mode: resolveUserMode(roles)
  };
}

function setKpiLabels(container, labels) {
  const [label1, label2, label3, label4] = labels;
  setText(container, '#index-kpi-label-1', label1);
  setText(container, '#index-kpi-label-2', label2);
  setText(container, '#index-kpi-label-3', label3);
  setText(container, '#index-kpi-label-4', label4);
}

function renderCertificateRows(container, bodySelector, rows, emptyMessage) {
  const body = container.querySelector(bodySelector);
  if (!body) {
    return;
  }

  if (!rows.length) {
    body.innerHTML = `<tr><td colspan="3" class="text-secondary">${emptyMessage}</td></tr>`;
    return;
  }

  body.innerHTML = rows
    .map((item) => `
      <tr>
        <td>${escapeHtml(item.employeeName)}</td>
        <td>${escapeHtml(item.certificateLabel)}</td>
        <td>${escapeHtml(formatDate(item.date))}</td>
      </tr>
    `)
    .join('');
}

function buildCertificateAlerts(rows) {
  const nowDate = new Date();
  nowDate.setHours(0, 0, 0, 0);

  const soonThreshold = new Date(nowDate);
  soonThreshold.setDate(soonThreshold.getDate() + 30);

  const certificateFields = [
    { key: 'psychological_assessment_expiry', label: 'Психологическа годност' },
    { key: 'medical_certificate_expiry', label: 'Медицинско' },
    { key: 'license_expiry', label: 'Лиценз' }
  ];

  const soon = [];
  const expired = [];

  (rows || []).forEach((employee) => {
    const employeeName = `${employee?.first_name || ''} ${employee?.last_name || ''}`.trim() || '-';

    certificateFields.forEach((field) => {
      const dateValue = employee?.[field.key];
      if (!dateValue) {
        return;
      }

      const date = new Date(`${dateValue}T00:00:00`);
      if (Number.isNaN(date.getTime())) {
        return;
      }

      const payload = {
        employeeName,
        certificateLabel: field.label,
        date: dateValue
      };

      if (date < nowDate) {
        expired.push(payload);
        return;
      }

      if (date <= soonThreshold) {
        soon.push(payload);
      }
    });
  });

  const byDateThenName = (left, right) => {
    const dateCompare = String(left?.date || '').localeCompare(String(right?.date || ''), 'bg');
    if (dateCompare !== 0) {
      return dateCompare;
    }

    return String(left?.employeeName || '').localeCompare(String(right?.employeeName || ''), 'bg');
  };

  soon.sort(byDateThenName);
  expired.sort(byDateThenName);

  return { soon, expired };
}

function getCountBadgeClass(count) {
  const numericCount = Number(count || 0);

  if (numericCount <= 0) {
    return 'text-bg-secondary';
  }

  if (numericCount <= 2) {
    return 'text-bg-warning';
  }

  return 'text-bg-danger';
}

function getCertificateStatusBadgeClass(statusKey, count) {
  const normalizedStatus = String(statusKey || '').trim().toLowerCase();
  const numericCount = Number(count || 0);

  if (numericCount <= 0) {
    return 'text-bg-secondary';
  }

  const explicitStatusColors = {
    soon: 'text-bg-warning',
    expired: 'text-bg-danger'
  };

  return explicitStatusColors[normalizedStatus] || 'text-bg-primary';
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

function toggleCertificateDetails(container, target) {
  const soonDetails = container.querySelector('#index-certificates-soon-details');
  const expiredDetails = container.querySelector('#index-certificates-expired-details');
  if (!soonDetails || !expiredDetails) {
    return;
  }

  if (target === 'soon') {
    soonDetails.classList.toggle('d-none');
    expiredDetails.classList.add('d-none');
    return;
  }

  if (target === 'expired') {
    expiredDetails.classList.toggle('d-none');
    soonDetails.classList.add('d-none');
  }
}

async function loadHeadOfTransportCertificates(container) {
  const certificatesPanel = container.querySelector('#index-certificates-panel');
  const soonToggle = container.querySelector('#index-certificates-soon-toggle');
  const expiredToggle = container.querySelector('#index-certificates-expired-toggle');

  if (!certificatesPanel || !soonToggle || !expiredToggle) {
    return;
  }

  const { data, error } = await supabase
    .from('employees')
    .select('first_name, last_name, psychological_assessment_expiry, medical_certificate_expiry, license_expiry')
    .eq('is_active', true)
    .order('last_name', { ascending: true })
    .order('first_name', { ascending: true });

  if (error) {
    showToast('Сертификатите не могат да се заредят.', 'warning');
    soonToggle.textContent = '0';
    expiredToggle.textContent = '0';
    soonToggle.className = 'badge text-bg-secondary border-0';
    expiredToggle.className = 'badge text-bg-secondary border-0';
    renderCertificateRows(container, '#index-certificates-soon-body', [], 'Няма служители.');
    renderCertificateRows(container, '#index-certificates-expired-body', [], 'Няма служители.');
    return;
  }

  const alerts = buildCertificateAlerts(data || []);
  soonToggle.textContent = String(alerts.soon.length);
  expiredToggle.textContent = String(alerts.expired.length);
  soonToggle.className = `badge ${getCertificateStatusBadgeClass('soon', alerts.soon.length)} border-0`;
  expiredToggle.className = `badge ${getCertificateStatusBadgeClass('expired', alerts.expired.length)} border-0`;
  renderCertificateRows(container, '#index-certificates-soon-body', alerts.soon, 'Няма служители с изтичащи сертификати.');
  renderCertificateRows(container, '#index-certificates-expired-body', alerts.expired, 'Няма служители с изтекли сертификати.');
}

function buildAbsenceGroupsByReason(rows) {
  const grouped = new Map();

  (rows || []).forEach((row) => {
    const reason = String(row?.absence_reasons?.name || '').trim() || 'Без посочена причина';
    const employeeName = `${row?.employees?.first_name || ''} ${row?.employees?.last_name || ''}`.trim() || '-';
    const startDate = row?.start_date || '';
    const endDate = row?.end_date || '';

    const existing = grouped.get(reason) || { reason, details: [] };
    existing.details.push({ employeeName, startDate, endDate });
    grouped.set(reason, existing);
  });

  const groups = Array.from(grouped.values()).map((group) => ({
    ...group,
    details: group.details.sort((left, right) => String(left.employeeName).localeCompare(String(right.employeeName), 'bg')),
    count: group.details.length
  }));

  groups.sort((left, right) => {
    if (right.count !== left.count) {
      return right.count - left.count;
    }

    return String(left.reason).localeCompare(String(right.reason), 'bg');
  });

  return groups;
}

function renderAbsenceReasonsSummary(container, groups) {
  const body = container.querySelector('#index-absence-reasons-body');
  if (!body) {
    return;
  }

  if (!groups.length) {
    body.innerHTML = '<p class="text-secondary mb-0">Няма активни отсъствия.</p>';
    return;
  }

  body.innerHTML = groups
    .map((group, index) => {
      const badgeClass = getDistinctBadgeClassByReason(group.reason);
      const key = String(index);
      const isExpanded = key === indexAbsenceState.selectedKey;
      const detailsRows = group.details
        .map((item) => {
          const period = `${formatDate(item.startDate)} - ${formatDate(item.endDate)}`;
          return `
            <tr>
              <td>${escapeHtml(item.employeeName)}</td>
              <td>${escapeHtml(period)}</td>
            </tr>
          `;
        })
        .join('');

      return `
        <div class="d-flex justify-content-between align-items-center border rounded p-2">
          <span>${escapeHtml(group.reason)}</span>
          <button
            type="button"
            class="badge ${badgeClass} border-0"
            data-index-absence-action="toggle-reason"
            data-index-absence-key="${key}"
            aria-expanded="${isExpanded ? 'true' : 'false'}"
          >
            ${escapeHtml(String(group.count))}
          </button>
        </div>
        ${isExpanded ? `
          <div class="table-responsive">
            <table class="table table-sm align-middle mb-0">
              <thead>
                <tr>
                  <th>Служител</th>
                  <th>Период</th>
                </tr>
              </thead>
              <tbody>
                ${detailsRows}
              </tbody>
            </table>
          </div>
        ` : ''}
      `;
    })
    .join('');
}

function toggleAbsenceReasonDetails(container, key) {
  if (key === '' || key === indexAbsenceState.selectedKey) {
    indexAbsenceState.selectedKey = '';
    renderAbsenceReasonsSummary(container, indexAbsenceState.groups);
    return;
  }

  const nextGroup = indexAbsenceState.groups[Number(key)] || null;
  if (!nextGroup) {
    indexAbsenceState.selectedKey = '';
    renderAbsenceReasonsSummary(container, indexAbsenceState.groups);
    return;
  }

  indexAbsenceState.selectedKey = String(key);
  renderAbsenceReasonsSummary(container, indexAbsenceState.groups);
}

async function loadHeadOfTransportAbsences(container) {
  const today = getTodayIsoDate();
  const { data, error } = await supabase
    .from('employee_absences')
    .select('start_date, end_date, employees(first_name, last_name), absence_reasons(name)')
    .lte('start_date', today)
    .gte('end_date', today)
    .order('start_date', { ascending: true });

  if (error) {
    showToast('Отсъствията не могат да се заредят.', 'warning');
    indexAbsenceState.groups = [];
    indexAbsenceState.selectedKey = '';
    renderAbsenceReasonsSummary(container, []);
    return;
  }

  indexAbsenceState.groups = buildAbsenceGroupsByReason(data || []);
  indexAbsenceState.selectedKey = '';
  renderAbsenceReasonsSummary(container, indexAbsenceState.groups);
}

function renderHeadOfTransportWorkloadRows(container, rows) {
  const body = container.querySelector('#index-workload-body');
  if (!body) {
    return;
  }

  if (!rows.length) {
    body.innerHTML = '<tr><td colspan="5" class="text-secondary">Няма данни.</td></tr>';
    return;
  }

  body.innerHTML = rows
    .map((row) => `
      <tr>
        <td>${escapeHtml(row.employeeName)}</td>
        <td>${escapeHtml(row.planned)}</td>
        <td>${escapeHtml(row.actual)}</td>
        <td>${escapeHtml(row.norm)}</td>
        <td><span class="badge ${escapeHtml(row.deviationClass)}">${escapeHtml(row.deviation)}</span></td>
      </tr>
    `)
    .join('');
}

async function loadHeadOfTransportWorkload(container) {
  const cutoffInput = container.querySelector('#index-workload-date');
  const cutoffDate = String(cutoffInput?.value || getTodayIsoDate());
  const cutoffParsed = parseIsoDateSafe(cutoffDate);

  if (!cutoffParsed) {
    renderHeadOfTransportWorkloadRows(container, []);
    return;
  }

  const monthKey = toMonthKey(cutoffParsed);
  const { startDate } = getMonthBounds(monthKey);
  const normMinutes = countBulgarianWorkdays(startDate, cutoffDate) * 8 * 60;

  const [employeesResponse, plannedResponse, actualResponse] = await Promise.all([
    supabase
      .from('employees')
      .select('id, first_name, last_name')
      .eq('is_active', true)
      .order('last_name', { ascending: true })
      .order('first_name', { ascending: true }),
    supabase
      .from('planned_duties')
      .select('employee_id, date, duties(start_time, end_time, break_start_time, break_end_time)')
      .gte('date', startDate)
      .lte('date', cutoffDate),
    supabase
      .from('actual_duties')
      .select('employee_id, date, start_time_override, end_time_override, break_start_time_override, break_end_time_override, duties(start_time, end_time, break_start_time, break_end_time)')
      .gte('date', startDate)
      .lte('date', cutoffDate)
  ]);

  if (employeesResponse.error || plannedResponse.error || actualResponse.error) {
    showToast('Натовареността не може да се зареди.', 'warning');
    renderHeadOfTransportWorkloadRows(container, []);
    return;
  }

  const employees = employeesResponse.data || [];
  const plannedRows = plannedResponse.data || [];
  const actualRows = actualResponse.data || [];

  const plannedMinutesByEmployee = new Map();
  plannedRows.forEach((row) => {
    const employeeId = String(row?.employee_id || '');
    if (!employeeId) {
      return;
    }

    const durationMinutes = Number(getDutyTimingSummary(row?.duties).durationMinutes);
    if (!Number.isFinite(durationMinutes)) {
      return;
    }

    plannedMinutesByEmployee.set(employeeId, Number(plannedMinutesByEmployee.get(employeeId) || 0) + durationMinutes);
  });

  const actualMinutesByEmployee = new Map();
  actualRows.forEach((row) => {
    const employeeId = String(row?.employee_id || '');
    if (!employeeId) {
      return;
    }

    const durationMinutes = Number(getActualDutyTimingSummary(row).durationMinutes);
    if (!Number.isFinite(durationMinutes)) {
      return;
    }

    actualMinutesByEmployee.set(employeeId, Number(actualMinutesByEmployee.get(employeeId) || 0) + durationMinutes);
  });

  const resultRows = employees.map((employee) => {
    const employeeId = String(employee?.id || '');
    const employeeName = `${employee?.first_name || ''} ${employee?.last_name || ''}`.trim() || '-';
    const plannedMinutes = Number(plannedMinutesByEmployee.get(employeeId) || 0);
    const actualMinutes = Number(actualMinutesByEmployee.get(employeeId) || 0);
    const deviationMinutes = actualMinutes - normMinutes;

    return {
      employeeName,
      planned: formatMinutesAsClock(plannedMinutes),
      actual: formatMinutesAsClock(actualMinutes),
      norm: formatMinutesAsClock(normMinutes),
      deviation: formatSignedMinutesAsClock(deviationMinutes),
      deviationClass: getDeviationClassByThreshold(deviationMinutes),
      deviationMinutes
    };
  });

  resultRows.sort((left, right) => {
    const deviationDiff = Math.abs(Number(right.deviationMinutes || 0)) - Math.abs(Number(left.deviationMinutes || 0));
    if (deviationDiff !== 0) {
      return deviationDiff;
    }

    return String(left.employeeName).localeCompare(String(right.employeeName), 'bg');
  });

  renderHeadOfTransportWorkloadRows(container, resultRows);
}

async function loadHeadOfTransportSnapshot(container) {
  await Promise.all([
    loadKpiSnapshot(container),
    loadHeadOfTransportCertificates(container),
    loadHeadOfTransportAbsences(container),
    loadHeadOfTransportWorkload(container)
  ]);
}

function toMonthKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

function toIsoDateFromDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseMonthKey(monthKey) {
  const [yearRaw, monthRaw] = String(monthKey || '').split('-');
  const year = Number(yearRaw);
  const month = Number(monthRaw);

  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

  return new Date(year, month - 1, 1);
}

function shiftMonthKey(monthKey, delta) {
  const monthDate = parseMonthKey(monthKey);
  monthDate.setMonth(monthDate.getMonth() + delta);
  return toMonthKey(monthDate);
}

function formatMonthLabel(monthKey) {
  const monthDate = parseMonthKey(monthKey);
  return new Intl.DateTimeFormat('bg-BG', { month: 'long', year: 'numeric' }).format(monthDate);
}

function getMonthBounds(monthKey) {
  const monthStart = parseMonthKey(monthKey);
  const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
  return {
    startDate: toIsoDateFromDate(monthStart),
    endDate: toIsoDateFromDate(monthEnd)
  };
}

function parseIsoDateSafe(dateValue) {
  const normalized = String(dateValue || '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return null;
  }

  const [yearRaw, monthRaw, dayRaw] = normalized.split('-');
  const year = Number(yearRaw);
  const month = Number(monthRaw);
  const day = Number(dayRaw);
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function toUtcDate(year, month, day) {
  return new Date(Date.UTC(year, month - 1, day));
}

function getOrthodoxEasterSunday(year) {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;

  const julianDate = toUtcDate(year, month, day);
  julianDate.setUTCDate(julianDate.getUTCDate() + 13);

  return new Date(julianDate.getUTCFullYear(), julianDate.getUTCMonth(), julianDate.getUTCDate());
}

function addHolidayWithWeekendCompensation(holidaySet, date) {
  const holidayIso = toIsoDateFromDate(date);
  holidaySet.add(holidayIso);

  const day = date.getDay();
  if (day !== 0 && day !== 6) {
    return;
  }

  const substitute = new Date(date);
  substitute.setDate(substitute.getDate() + 1);

  while (substitute.getDay() === 0 || substitute.getDay() === 6 || holidaySet.has(toIsoDateFromDate(substitute))) {
    substitute.setDate(substitute.getDate() + 1);
  }

  holidaySet.add(toIsoDateFromDate(substitute));
}

function buildBulgarianOfficialHolidays(year) {
  const holidaySet = new Set();
  const fixedDates = [
    [1, 1],
    [3, 3],
    [5, 1],
    [5, 6],
    [5, 24],
    [9, 6],
    [9, 22],
    [12, 24],
    [12, 25],
    [12, 26]
  ];

  fixedDates.forEach(([month, day]) => {
    addHolidayWithWeekendCompensation(holidaySet, new Date(year, month - 1, day));
  });

  const easterSunday = getOrthodoxEasterSunday(year);
  const easterOffsets = [-2, -1, 0, 1];
  easterOffsets.forEach((offset) => {
    const holidayDate = new Date(easterSunday);
    holidayDate.setDate(holidayDate.getDate() + offset);
    holidaySet.add(toIsoDateFromDate(holidayDate));
  });

  return holidaySet;
}

function getBulgarianHolidaysBetween(startDate, endDate) {
  const start = parseIsoDateSafe(startDate);
  const end = parseIsoDateSafe(endDate);
  if (!start || !end || start > end) {
    return new Set();
  }

  const holidays = new Set();
  for (let year = start.getFullYear(); year <= end.getFullYear(); year += 1) {
    const yearHolidays = buildBulgarianOfficialHolidays(year);
    yearHolidays.forEach((dateValue) => holidays.add(dateValue));
  }

  return holidays;
}

function countBulgarianWorkdays(startDate, endDate) {
  const start = parseIsoDateSafe(startDate);
  const end = parseIsoDateSafe(endDate);
  if (!start || !end || start > end) {
    return 0;
  }

  const holidays = getBulgarianHolidaysBetween(startDate, endDate);
  let count = 0;
  const cursor = new Date(start);

  while (cursor <= end) {
    const dayOfWeek = cursor.getDay();
    const isoDate = toIsoDateFromDate(cursor);
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isHoliday = holidays.has(isoDate);

    if (!isWeekend && !isHoliday) {
      count += 1;
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return count;
}

function renderCrewHoursSummary(container) {
  const plannedHoursElement = container.querySelector('#index-crew-planned-hours-total');
  const actualHoursElement = container.querySelector('#index-crew-actual-hours-total');
  const normHoursElement = container.querySelector('#index-crew-norm-hours-total');
  const deviationHoursElement = container.querySelector('#index-crew-deviation-hours-total');

  if (!plannedHoursElement || !actualHoursElement || !normHoursElement || !deviationHoursElement) {
    return;
  }

  const selectedDate = String(crewCalendarState.selectedDate || '').trim();
  if (!selectedDate) {
    plannedHoursElement.textContent = '00:00';
    actualHoursElement.textContent = '00:00';
    normHoursElement.textContent = '00:00';
    deviationHoursElement.textContent = '+00:00';
    deviationHoursElement.className = 'fw-semibold badge text-bg-success';
    return;
  }

  const { startDate } = getMonthBounds(crewCalendarState.visibleMonth || toMonthKey(new Date()));
  const rangeEndDate = selectedDate >= startDate ? selectedDate : startDate;

  const plannedMinutes = crewCalendarState.plannedRows
    .filter((row) => {
      const date = String(row?.date || '');
      return Boolean(date && date >= startDate && date <= rangeEndDate);
    })
    .reduce((sum, row) => {
      const durationMinutes = Number(getDutyTimingSummary(row?.duties).durationMinutes);
      return Number.isFinite(durationMinutes) ? sum + durationMinutes : sum;
    }, 0);

  const actualMinutes = crewCalendarState.actualRows
    .filter((row) => {
      const date = String(row?.date || '');
      return Boolean(date && date >= startDate && date <= rangeEndDate);
    })
    .reduce((sum, row) => {
      const durationMinutes = Number(getActualDutyTimingSummary(row).durationMinutes);
      return Number.isFinite(durationMinutes) ? sum + durationMinutes : sum;
    }, 0);

  const normMinutes = countBulgarianWorkdays(startDate, rangeEndDate) * 8 * 60;
  const deviationMinutes = actualMinutes - normMinutes;

  plannedHoursElement.textContent = formatMinutesAsClock(plannedMinutes);
  actualHoursElement.textContent = formatMinutesAsClock(actualMinutes);
  normHoursElement.textContent = formatMinutesAsClock(normMinutes);
  deviationHoursElement.textContent = formatSignedMinutesAsClock(deviationMinutes);
  deviationHoursElement.className = `fw-semibold badge ${getDeviationClassByThreshold(deviationMinutes)}`;
}

async function loadSchedulePublicationDates(startDate, endDate) {
  const { data, error } = await supabase
    .from('schedule_publications')
    .select('schedule_date, is_confirmed')
    .gte('schedule_date', startDate)
    .lte('schedule_date', endDate);

  if (error) {
    return {
      confirmedDateSet: new Set(),
      pendingConfirmationDateSet: new Set(),
      error
    };
  }

  const confirmedDateSet = new Set();
  const pendingConfirmationDateSet = new Set();

  (data || []).forEach((row) => {
    const date = String(row?.schedule_date || '').trim();
    if (!date) {
      return;
    }

    if (row?.is_confirmed) {
      confirmedDateSet.add(date);
      return;
    }

    pendingConfirmationDateSet.add(date);
  });

  return {
    confirmedDateSet,
    pendingConfirmationDateSet,
    error: null
  };
}

function formatAssignmentRoleName(value) {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'chief') {
    return 'Началник влак';
  }

  if (normalized === 'conductor') {
    return 'Кондуктор';
  }

  if (!normalized) {
    return '-';
  }

  return normalized;
}

function formatEmployeeDisplayName(row) {
  const firstName = String(row?.first_name || '').trim();
  const lastName = String(row?.last_name || '').trim();
  return `${firstName} ${lastName}`.trim() || '-';
}

async function loadScheduleChangesSummary(startDate, endDate) {
  const { data, error } = await supabase
    .from('schedule_change_events')
    .select('schedule_date, action, old_duty_id, new_duty_id, old_employee_id, new_employee_id, old_assignment_role, new_assignment_role, changed_at')
    .gte('schedule_date', startDate)
    .lte('schedule_date', endDate)
    .order('changed_at', { ascending: false });

  if (error) {
    return {
      changeCountByDate: new Map(),
      changeEventsByDate: new Map(),
      error
    };
  }

  const dutyIds = new Set();
  const employeeIds = new Set();

  (data || []).forEach((row) => {
    if (row?.old_duty_id) {
      dutyIds.add(row.old_duty_id);
    }

    if (row?.new_duty_id) {
      dutyIds.add(row.new_duty_id);
    }

    if (row?.old_employee_id) {
      employeeIds.add(row.old_employee_id);
    }

    if (row?.new_employee_id) {
      employeeIds.add(row.new_employee_id);
    }
  });

  const [dutyResponse, employeeResponse] = await Promise.all([
    dutyIds.size
      ? supabase.from('duties').select('id, name').in('id', Array.from(dutyIds))
      : Promise.resolve({ data: [], error: null }),
    employeeIds.size
      ? supabase.from('employees').select('id, first_name, last_name').in('id', Array.from(employeeIds))
      : Promise.resolve({ data: [], error: null })
  ]);

  if (dutyResponse.error || employeeResponse.error) {
    return {
      changeCountByDate: new Map(),
      changeEventsByDate: new Map(),
      error: dutyResponse.error || employeeResponse.error
    };
  }

  const dutyNameById = new Map(
    (dutyResponse.data || [])
      .map((row) => [String(row?.id || ''), String(row?.name || '').trim() || '-'])
      .filter(([id]) => id)
  );

  const employeeNameById = new Map(
    (employeeResponse.data || [])
      .map((row) => [String(row?.id || ''), formatEmployeeDisplayName(row)])
      .filter(([id]) => id)
  );

  const counts = new Map();
  const eventsByDate = new Map();

  (data || []).forEach((row) => {
    const date = String(row?.schedule_date || '').trim();
    if (!date) {
      return;
    }

    const current = Number(counts.get(date) || 0);
    counts.set(date, current + 1);

    const oldDutyName = dutyNameById.get(String(row?.old_duty_id || '')) || '-';
    const newDutyName = dutyNameById.get(String(row?.new_duty_id || '')) || '-';
    const oldEmployeeName = employeeNameById.get(String(row?.old_employee_id || '')) || '-';
    const newEmployeeName = employeeNameById.get(String(row?.new_employee_id || '')) || '-';
    const oldRole = formatAssignmentRoleName(row?.old_assignment_role);
    const newRole = formatAssignmentRoleName(row?.new_assignment_role);
    const action = String(row?.action || '').trim().toLowerCase();
    const changedAt = row?.changed_at ? formatDateTime(new Date(row.changed_at)) : '-';

    let summary = '';
    if (action === 'insert') {
      summary = `Добавено: ${newEmployeeName} | ${newDutyName} | ${newRole}`;
    } else if (action === 'delete') {
      summary = `Премахнато: ${oldEmployeeName} | ${oldDutyName} | ${oldRole}`;
    } else {
      summary = `Промяна: ${oldEmployeeName} | ${oldDutyName} | ${oldRole} → ${newEmployeeName} | ${newDutyName} | ${newRole}`;
    }

    const entries = eventsByDate.get(date) || [];
    entries.push({
      summary,
      changedAt
    });
    eventsByDate.set(date, entries);
  });

  return {
    changeCountByDate: counts,
    changeEventsByDate: eventsByDate,
    error: null
  };
}

function parseTimetableEntriesForCrew(value) {
  if (Array.isArray(value)) {
    return value
      .map((item, index) => normalizeTimetableEntryForCrew(item, index))
      .filter((entry) => entry.url);
  }

  const raw = String(value || '').trim();
  if (!raw) {
    return [];
  }

  if (raw.startsWith('[')) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed
          .map((item, index) => normalizeTimetableEntryForCrew(item, index))
          .filter((entry) => entry.url);
      }
    } catch {
      return [{ url: raw, label: `Разписание 1` }];
    }
  }

  return raw
    .split('\n')
    .map((item, index) => normalizeTimetableEntryForCrew(item, index))
    .filter((entry) => entry.url);
}

function normalizeTimetableEntryForCrew(item, index) {
  if (item && typeof item === 'object' && !Array.isArray(item)) {
    const url = String(item.url || '').trim();
    const label = String(item.label || '').trim() || `Разписание ${index + 1}`;
    return { url, label };
  }

  const url = String(item || '').trim();
  return {
    url,
    label: `Разписание ${index + 1}`
  };
}

function getAbsenceReasonBadgeLabel(reasonName) {
  const raw = String(reasonName || '').trim();
  if (!raw) {
    return 'ОТС';
  }

  const normalized = raw.toLowerCase();
  const explicitLabels = {
    'бо': 'БО',
    'болничен': 'БО',
    'болничен отпуск': 'БО',
    'до': 'ДО',
    'допълнителен отпуск': 'ДО',
    'по': 'ПО',
    'платен отпуск': 'ПО',
    'нп': 'НП',
    'неплатен отпуск': 'НП',
    'командировка': 'К'
  };

  if (explicitLabels[normalized]) {
    return explicitLabels[normalized];
  }

  if (raw.length <= 4 && /^[\p{L}\p{N}]+$/u.test(raw)) {
    return raw.toUpperCase();
  }

  const parts = raw
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length >= 2) {
    return parts
      .slice(0, 3)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }

  return raw.slice(0, 2).toUpperCase();
}

function getAbsenceReasonBadgeClass(reasonName) {
  const code = getAbsenceReasonBadgeLabel(reasonName);
  return crewAbsenceCodeClassMap[code] || getDistinctBadgeClassByReason(reasonName);
}

function createDateRange(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) {
    return [];
  }

  const dates = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    dates.push(toIsoDateFromDate(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

function normalizeAbsenceReasonName(row) {
  return String(row?.absence_reasons?.name || '').trim() || 'Отсъствие';
}

function getFileExtensionFromUrl(url) {
  const value = String(url || '').trim();
  if (!value) {
    return '';
  }

  try {
    const parsedUrl = new URL(value);
    const filename = parsedUrl.pathname.split('/').pop() || '';
    const extension = filename.includes('.') ? filename.split('.').pop() : '';
    return String(extension || '').toLowerCase();
  } catch {
    return '';
  }
}

function resolveTimetablePreviewUrl(url) {
  const extension = getFileExtensionFromUrl(url);
  if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension)) {
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
  }

  return url;
}

function openCrewTimetablePreview(container, url, label) {
  const previewModal = container.querySelector('#index-timetable-preview-modal');
  const frame = container.querySelector('#index-timetable-preview-frame');
  const title = container.querySelector('#index-timetable-preview-title');
  const fallback = container.querySelector('#index-timetable-preview-fallback');
  const directOpenLink = container.querySelector('#index-timetable-preview-open');
  if (!previewModal || !frame || !title || !fallback || !directOpenLink) {
    return;
  }

  const safeUrl = String(url || '').trim();
  if (!safeUrl) {
    showToast('Липсва линк за преглед.', 'warning');
    return;
  }

  const previewUrl = resolveTimetablePreviewUrl(safeUrl);
  title.textContent = label ? `Преглед: ${label}` : 'Преглед на разписание';
  directOpenLink.setAttribute('href', safeUrl);
  fallback.classList.add('d-none');

  frame.src = 'about:blank';
  frame.src = previewUrl;

  frame.onload = () => {
    if (previewUrl !== safeUrl) {
      fallback.classList.add('d-none');
      return;
    }

    const extension = getFileExtensionFromUrl(safeUrl);
    const likelyNonRenderable = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension);
    fallback.classList.toggle('d-none', !likelyNonRenderable);
  };

  frame.onerror = () => {
    fallback.classList.remove('d-none');
  };

  previewModal.classList.remove('d-none');
}

function closeCrewTimetablePreview(container) {
  const previewModal = container.querySelector('#index-timetable-preview-modal');
  const frame = container.querySelector('#index-timetable-preview-frame');
  const fallback = container.querySelector('#index-timetable-preview-fallback');
  const directOpenLink = container.querySelector('#index-timetable-preview-open');
  if (!previewModal || !frame || !fallback || !directOpenLink) {
    return;
  }

  frame.src = 'about:blank';
  directOpenLink.setAttribute('href', '#');
  fallback.classList.add('d-none');
  previewModal.classList.add('d-none');
}

function ensureCrewSelectedDate(monthKey) {
  const monthStart = parseMonthKey(monthKey);
  const monthPrefix = toMonthKey(monthStart);
  const today = getTodayIsoDate();
  const hasTodayInMonth = today.startsWith(monthPrefix);

  if (crewCalendarState.selectedDate && crewCalendarState.selectedDate.startsWith(monthPrefix)) {
    return;
  }

  const allDates = [
    ...new Set([
      ...crewCalendarState.plannedRows.map((row) => row?.date).filter(Boolean),
      ...crewCalendarState.actualRows.map((row) => row?.date).filter(Boolean),
      ...crewCalendarState.absenceRows.flatMap((row) => createDateRange(row?.start_date, row?.end_date))
    ])
  ].sort((left, right) => String(left).localeCompare(String(right), 'bg'));

  if (hasTodayInMonth) {
    crewCalendarState.selectedDate = today;
    return;
  }

  if (allDates.length) {
    crewCalendarState.selectedDate = allDates[0];
    return;
  }

  crewCalendarState.selectedDate = `${monthPrefix}-01`;
}

function buildCrewDayCounters() {
  const counters = new Map();

  crewCalendarState.plannedRows.forEach((row) => {
    const date = row?.date;
    if (!date) {
      return;
    }

    const existing = counters.get(date) || { planned: 0, actual: 0 };
    existing.planned += 1;
    counters.set(date, existing);
  });

  crewCalendarState.actualRows.forEach((row) => {
    const date = row?.date;
    if (!date) {
      return;
    }

    const existing = counters.get(date) || { planned: 0, actual: 0 };
    existing.actual += 1;
    counters.set(date, existing);
  });

  crewCalendarState.pendingConfirmationDates.forEach((date) => {
    const existing = counters.get(date) || { planned: 0, actual: 0, absences: [] };
    existing.pendingConfirmation = true;
    counters.set(date, existing);
  });

  crewCalendarState.changeCountByDate.forEach((count, date) => {
    const existing = counters.get(date) || { planned: 0, actual: 0, absences: [] };
    existing.changeCount = Number(count || 0);
    counters.set(date, existing);
  });

  crewCalendarState.absenceRows.forEach((row) => {
    const reasonName = normalizeAbsenceReasonName(row);
    const className = getAbsenceReasonBadgeClass(reasonName);

    createDateRange(row?.start_date, row?.end_date).forEach((date) => {
      const existing = counters.get(date) || { planned: 0, actual: 0, absences: [] };
      if (!Array.isArray(existing.absences)) {
        existing.absences = [];
      }

      const alreadyAdded = existing.absences.some((item) => item?.reason === reasonName);
      if (!alreadyAdded) {
        existing.absences.push({ reason: reasonName, className });
      }

      counters.set(date, existing);
    });
  });

  return counters;
}

function renderCrewCalendar(container) {
  const daysHost = container.querySelector('#index-crew-calendar-days');
  if (!daysHost) {
    return;
  }

  const visibleMonth = crewCalendarState.visibleMonth || toMonthKey(new Date());
  const monthDate = parseMonthKey(visibleMonth);
  const firstOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const dayOfWeek = firstOfMonth.getDay();
  const mondayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(firstOfMonth.getDate() - mondayIndex);

  const counters = buildCrewDayCounters();
  const today = getTodayIsoDate();

  setText(container, '#index-crew-month-label', formatMonthLabel(visibleMonth));

  const cells = [];
  for (let index = 0; index < 42; index += 1) {
    const current = new Date(gridStart);
    current.setDate(gridStart.getDate() + index);
    const dateKey = toMonthKey(current);
    const fullDate = `${dateKey}-${String(current.getDate()).padStart(2, '0')}`;
    const isOtherMonth = current.getMonth() !== monthDate.getMonth();
    const isSelected = fullDate === crewCalendarState.selectedDate;
    const isToday = fullDate === today;
    const dayCounter = counters.get(fullDate) || { planned: 0, actual: 0, absences: [] };
    const absenceBadges = Array.isArray(dayCounter.absences)
      ? dayCounter.absences
          .map((item) => `<span class="badge ${escapeHtml(item.className || 'text-bg-danger')}" title="${escapeHtml(item.reason || 'Отсъствие')}">${escapeHtml(item.reason || 'Отсъствие')}</span>`)
          .join('')
      : '';

    cells.push(`
      <button
        type="button"
        class="index-crew-calendar-day ${isOtherMonth ? 'is-other-month' : ''} ${isSelected ? 'is-selected' : ''} ${isToday ? 'is-today' : ''}"
        data-index-crew-action="select-day"
        data-date="${fullDate}"
      >
        <span class="index-crew-calendar-day-number">${current.getDate()}</span>
        <span class="index-crew-calendar-day-flags">
          ${dayCounter.planned ? `<span class="badge text-bg-primary">П${dayCounter.planned}</span>` : ''}
          ${dayCounter.actual ? `<span class="badge text-bg-success">Р${dayCounter.actual}</span>` : ''}
          ${dayCounter.pendingConfirmation ? `<span class="badge text-bg-warning">Промяна</span>` : ''}
          ${dayCounter.changeCount ? `<span class="badge text-bg-info" title="Извършени промени за деня">Δ${escapeHtml(String(dayCounter.changeCount))}</span>` : ''}
          ${absenceBadges}
        </span>
      </button>
    `);
  }

  daysHost.innerHTML = cells.join('');
}

function renderCrewSelectedDayDetails(container) {
  const selectedDate = crewCalendarState.selectedDate;
  const plannedBody = container.querySelector('#index-crew-planned-body');
  const actualBody = container.querySelector('#index-crew-actual-body');
  const changesBody = container.querySelector('#index-crew-change-body');
  const absenceBody = container.querySelector('#index-crew-absence-body');

  if (!plannedBody || !actualBody || !changesBody || !absenceBody) {
    return;
  }

  setText(container, '#index-crew-selected-date-label', `Детайли за ${formatDate(selectedDate)}`);

  const plannedRows = crewCalendarState.plannedRows
    .filter((row) => row?.date === selectedDate)
    .sort((left, right) => String(left?.duties?.start_time || '').localeCompare(String(right?.duties?.start_time || ''), 'bg'));

  if (!plannedRows.length) {
    plannedBody.innerHTML = '<p class="text-secondary mb-0">Няма планирани повески.</p>';
  } else {
    plannedBody.innerHTML = plannedRows
      .map((row) => {
        const dutyName = row?.duties?.name || '-';
        const role = formatRoleLabel(row?.assignment_role);
        const time = formatDutyTime(row?.duties?.start_time, row?.duties?.end_time, row?.duties?.second_day);
        const timing = getDutyTimingSummary(row?.duties);

        return `
          <article class="border rounded p-2">
            <div class="fw-semibold">${escapeHtml(dutyName)}</div>
            <div class="small text-secondary">${escapeHtml(role)} · ${escapeHtml(time)}</div>
            <div class="small mt-1">
              <div><span class="text-secondary">Начало:</span> ${escapeHtml(timing.startTime)}</div>
              <div><span class="text-secondary">Край:</span> ${escapeHtml(timing.endTime)}</div>
              <div><span class="text-secondary">Начало на прекъсване:</span> ${escapeHtml(timing.breakStartTime)}</div>
              <div><span class="text-secondary">Край на прекъсване:</span> ${escapeHtml(timing.breakEndTime)}</div>
              <div><span class="text-secondary">Прекъсване:</span> ${escapeHtml(timing.breakDuration)}</div>
              <div><span class="text-secondary">Времетраене:</span> ${escapeHtml(timing.duration)}</div>
            </div>
          </article>
        `;
      })
      .join('');
  }

  const actualRows = crewCalendarState.actualRows
    .filter((row) => row?.date === selectedDate)
    .sort((left, right) => String(right?.reported_at || '').localeCompare(String(left?.reported_at || ''), 'bg'));

  const isDateConfirmed = crewCalendarState.confirmedDates.has(selectedDate);
  const hasPendingConfirmation = crewCalendarState.pendingConfirmationDates.has(selectedDate);

  if (!isDateConfirmed) {
    actualBody.innerHTML = hasPendingConfirmation
      ? '<p class="text-warning mb-0">Има смяна на служител по реална повеска. Нужна е повторна валидация от разписание.</p>'
      : '<p class="text-secondary mb-0">Графикът за деня не е потвърден от разписание.</p>';
  } else if (!actualRows.length) {
    actualBody.innerHTML = '<p class="text-secondary mb-0">Няма реални повески.</p>';
  } else {
    actualBody.innerHTML = actualRows
      .map((row) => {
        const dutyName = row?.duties?.name || '-';
        const role = formatRoleLabel(row?.assignment_role);
        const reported = row?.reported_at ? formatDateTime(new Date(row.reported_at)) : '-';
        const timing = getActualDutyTimingSummary(row);

        const trains = Array.isArray(row?.duties?.duty_trains)
          ? [...row.duties.duty_trains].sort((left, right) => Number(left?.sequence_order || 0) - Number(right?.sequence_order || 0))
          : row?.duties?.duty_trains
            ? [row.duties.duty_trains]
            : [];

        const trainRows = trains
          .map((item) => {
            const trainNumber = item?.trains?.number ? `Влак ${item.trains.number}` : 'Влак';
            const entries = parseTimetableEntriesForCrew(item?.trains?.timetable_url);
            if (!entries.length) {
              return `<div class="small">${escapeHtml(trainNumber)}: <span class="text-secondary">без разписание</span></div>`;
            }

            const links = entries
              .map((entry) => {
                const encodedUrl = encodeURIComponent(entry.url);
                const encodedLabel = encodeURIComponent(entry.label || 'Разписание');
                const previewLabel = entry.label || 'Разписание';
                return `
                  <span class="d-inline-flex align-items-center gap-1 me-2">
                    <span>${escapeHtml(previewLabel)}</span>
                    <button
                      type="button"
                      class="btn btn-link btn-sm p-0 lh-1 text-decoration-none"
                      data-index-crew-action="preview-timetable"
                      data-preview-url="${escapeHtml(encodedUrl)}"
                      data-preview-label="${escapeHtml(encodedLabel)}"
                      title="Преглед: ${escapeHtml(previewLabel)}"
                      aria-label="Преглед: ${escapeHtml(previewLabel)}"
                    >
                      👁
                    </button>
                  </span>
                `;
              })
              .join(' ');

            return `<div class="small">${escapeHtml(trainNumber)}: ${links}</div>`;
          })
          .join('');

        return `
          <article class="border rounded p-2">
            <div class="d-flex align-items-start justify-content-between gap-2">
              <div class="fw-semibold">${escapeHtml(dutyName)}</div>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary py-0 px-2"
                title="Редакция на часове"
                aria-label="Редакция на часове"
                data-index-crew-action="edit-actual-duty"
                data-actual-duty-id="${escapeHtml(String(row?.id || ''))}"
              >
                ✎
              </button>
            </div>
            <div class="small text-secondary mb-1">${escapeHtml(role)} · Отчетена: ${escapeHtml(reported)}</div>
            <div class="small mb-1">
              <div><span class="text-secondary">Начало:</span> ${escapeHtml(timing.startTime)}</div>
              <div><span class="text-secondary">Край:</span> ${escapeHtml(timing.endTime)}</div>
              <div><span class="text-secondary">Начало на прекъсване:</span> ${escapeHtml(timing.breakStartTime)}</div>
              <div><span class="text-secondary">Край на прекъсване:</span> ${escapeHtml(timing.breakEndTime)}</div>
              <div><span class="text-secondary">Прекъсване:</span> ${escapeHtml(timing.breakDuration)}</div>
              <div><span class="text-secondary">Времетраене:</span> ${escapeHtml(timing.duration)}</div>
            </div>
            ${trainRows ? `<div class="small"><span class="fw-semibold">Разписания:</span> ${trainRows}</div>` : ''}
          </article>
        `;
      })
      .join('');
  }

  const changeEvents = crewCalendarState.changeEventsByDate.get(selectedDate) || [];
  if (!changeEvents.length) {
    changesBody.innerHTML = '<p class="text-secondary mb-0">Няма регистрирани промени за избрания ден.</p>';
  } else {
    changesBody.innerHTML = changeEvents
      .map((eventItem) => `
        <article class="border rounded p-2">
          <div class="small">${escapeHtml(eventItem.summary || '-')}</div>
          <div class="small text-secondary">${escapeHtml(eventItem.changedAt || '-')}</div>
        </article>
      `)
      .join('');
  }

  const absenceRows = crewCalendarState.absenceRows
    .filter((row) => {
      const startDate = String(row?.start_date || '');
      const endDate = String(row?.end_date || '');
      return Boolean(startDate && endDate && selectedDate >= startDate && selectedDate <= endDate);
    })
    .sort((left, right) => {
      const startCompare = String(left?.start_date || '').localeCompare(String(right?.start_date || ''), 'bg');
      if (startCompare !== 0) {
        return startCompare;
      }

      return normalizeAbsenceReasonName(left).localeCompare(normalizeAbsenceReasonName(right), 'bg');
    });

  if (!absenceRows.length) {
    absenceBody.innerHTML = '<p class="text-secondary mb-0">Няма отсъствия за избрания ден.</p>';
    return;
  }

  absenceBody.innerHTML = absenceRows
    .map((row) => {
      const reasonName = normalizeAbsenceReasonName(row);
      const badgeClass = getAbsenceReasonBadgeClass(reasonName);
      const period = `${formatDate(row?.start_date)} - ${formatDate(row?.end_date)}`;

      return `
        <article class="border rounded p-2">
          <div class="d-flex flex-wrap align-items-center gap-2 mb-1">
            <span class="badge ${escapeHtml(badgeClass)}">${escapeHtml(reasonName)}</span>
          </div>
          <div class="small text-secondary">Период: ${escapeHtml(period)}</div>
        </article>
      `;
    })
    .join('');
}

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
      .select('id, date, assignment_role, reported_at, start_time_override, end_time_override, break_start_time_override, break_end_time_override, duties(name, start_time, end_time, second_day, break_start_time, break_end_time, duty_trains(sequence_order, trains(number, timetable_url)))')
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
  const [
    profilesResponse,
    usersWithRolesResponse,
    rolesCatalogResponse,
    linkedProfilesResponse
  ] = await Promise.all([
    supabase.from('user_profiles').select('id', { count: 'exact', head: true }),
    supabase.from('user_roles').select('user_id'),
    supabase.from('roles').select('name', { count: 'exact', head: true }),
    supabase.from('user_profiles').select('id', { count: 'exact', head: true }).not('employee_id', 'is', null)
  ]);

  const hasError = [profilesResponse, usersWithRolesResponse, rolesCatalogResponse, linkedProfilesResponse].some(
    (item) => item.error
  );
  if (hasError) {
    showToast('Част от админ данните на индекс страницата не могат да се заредят.', 'warning');
  }

  const uniqueUserIds = new Set((usersWithRolesResponse.data || []).map((item) => item.user_id).filter(Boolean));

  setText(container, '#index-kpi-planned', String(profilesResponse.count ?? 0));
  setText(container, '#index-kpi-actual', String(uniqueUserIds.size));
  setText(container, '#index-kpi-absences', String(linkedProfilesResponse.count ?? 0));
  setText(container, '#index-kpi-employees', String(rolesCatalogResponse.count ?? 0));
  setText(container, '#index-last-updated', `Последно обновяване: ${formatDateTime(new Date())}`);
}

function attachIndexHandlers(container) {
  const refreshButton = container.querySelector('#index-refresh');
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
  const certificatesPanel = container.querySelector('#index-certificates-panel');
  const absencesPanel = container.querySelector('#index-absences-panel');
  const workloadDateInput = container.querySelector('#index-workload-date');
  const workloadRefreshButton = container.querySelector('#index-workload-refresh');

  refreshButton?.addEventListener('click', async () => {
    const mode = container.dataset.indexMode || 'default';
    if (mode === 'admin') {
      refreshButton.disabled = true;
      await loadAdminKpiSnapshot(container);
      refreshButton.disabled = false;
      return;
    }

    if (mode === 'head_of_transport') {
      refreshButton.disabled = true;
      await loadHeadOfTransportSnapshot(container);
      refreshButton.disabled = false;
      return;
    }

    if (mode !== 'crew') {
      refreshButton.disabled = true;
      await loadKpiSnapshot(container);
      refreshButton.disabled = false;
    }
  });

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

  certificatesPanel?.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button[data-index-cert-action]');
    if (!actionButton) {
      return;
    }

    const mode = container.dataset.indexMode || 'default';
    if (mode !== 'head_of_transport') {
      return;
    }

    const action = actionButton.getAttribute('data-index-cert-action') || '';
    if (action === 'toggle-soon') {
      toggleCertificateDetails(container, 'soon');
      return;
    }

    if (action === 'toggle-expired') {
      toggleCertificateDetails(container, 'expired');
    }
  });

  absencesPanel?.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button[data-index-absence-action]');
    if (!actionButton) {
      return;
    }

    const mode = container.dataset.indexMode || 'default';
    if (mode !== 'head_of_transport') {
      return;
    }

    const action = actionButton.getAttribute('data-index-absence-action') || '';
    if (action !== 'toggle-reason') {
      return;
    }

    const key = actionButton.getAttribute('data-index-absence-key') || '';
    toggleAbsenceReasonDetails(container, key);
  });

  workloadDateInput?.addEventListener('change', async () => {
    const mode = container.dataset.indexMode || 'default';
    if (mode !== 'head_of_transport') {
      return;
    }

    await loadHeadOfTransportWorkload(container);
  });

  workloadRefreshButton?.addEventListener('click', async () => {
    const mode = container.dataset.indexMode || 'default';
    if (mode !== 'head_of_transport') {
      return;
    }

    workloadRefreshButton.disabled = true;
    await loadHeadOfTransportWorkload(container);
    workloadRefreshButton.disabled = false;
  });
}

function applyRoleLayout(container, userContext) {
  const managementSection = container.querySelector('#index-management-section');
  const crewSection = container.querySelector('#index-crew-section');
  const plannedKpiCard = container.querySelector('#index-kpi-card-planned');
  const actualKpiCard = container.querySelector('#index-kpi-card-actual');
  const absencesKpiCard = container.querySelector('#index-kpi-card-absences');
  const employeesKpiCard = container.querySelector('#index-kpi-card-employees');
  const certificatesPanel = container.querySelector('#index-certificates-panel');
  const absencesPanel = container.querySelector('#index-absences-panel');
  const workloadPanel = container.querySelector('#index-workload-panel');
  const workloadDateInput = container.querySelector('#index-workload-date');
  const soonDetails = container.querySelector('#index-certificates-soon-details');
  const expiredDetails = container.querySelector('#index-certificates-expired-details');
  const quickActions = container.querySelector('#index-quick-actions');
  const mode = userContext?.mode || 'default';

  setText(container, '#index-management-title', 'Оперативен преглед за днес');
  setKpiLabels(container, ['Планирани повески', 'Реални повески', 'Активни отсъствия', 'Активни служители']);

  if (mode !== 'crew') {
    container.dataset.indexMode = mode;
    managementSection?.classList.remove('d-none');
    crewSection?.classList.add('d-none');
    plannedKpiCard?.classList.remove('d-none');
    actualKpiCard?.classList.remove('d-none');
    absencesKpiCard?.classList.remove('col-xl-6');
    absencesKpiCard?.classList.add('col-xl-3');
    employeesKpiCard?.classList.remove('col-xl-6');
    employeesKpiCard?.classList.add('col-xl-3');
    certificatesPanel?.classList.add('d-none');
    absencesPanel?.classList.add('d-none');
    workloadPanel?.classList.add('d-none');
    soonDetails?.classList.add('d-none');
    expiredDetails?.classList.add('d-none');

    if (quickActions) {
      if (mode === 'admin') {
        quickActions.innerHTML = `
          <a href="/admin" data-link class="btn btn-outline-danger">Админ Панел</a>
          <a href="/employees" data-link class="btn btn-outline-primary">Служители</a>
          <a href="/schedule-keys" data-link class="btn btn-outline-primary">Ключ-Графици</a>
        `;
        setText(container, '#index-welcome-subtitle', 'Административен преглед на потребители, роли и системно състояние.');
        setText(container, '#index-management-title', 'Административен преглед');
        setKpiLabels(container, ['Профили', 'Потребители с роля', 'Профили със служител', 'Роли']);
      } else if (mode === 'manager') {
        quickActions.innerHTML = `
          <a href="/plan-schedule" data-link class="btn btn-outline-primary">План-График</a>
          <a href="/schedule" data-link class="btn btn-outline-primary">График</a>
          <a href="/planned-duties" data-link class="btn btn-outline-primary">Планирани повески</a>
          <a href="/actual-duties" data-link class="btn btn-outline-primary">Реални повески</a>
        `;
        setText(container, '#index-welcome-subtitle', 'Оперативен преглед за управление на екипи и дневни повески.');
      } else if (mode === 'head_of_transport') {
        quickActions.innerHTML = `
          <a href="/plan-schedule" data-link class="btn btn-outline-primary">План-График</a>
          <a href="/schedule" data-link class="btn btn-outline-primary">График</a>
          <a href="/planned-duties" data-link class="btn btn-outline-primary">Планирани повески</a>
          <a href="/actual-duties" data-link class="btn btn-outline-primary">Реални повески</a>
        `;
        setText(container, '#index-welcome-subtitle', 'Оперативен преглед с акцент върху празни позиции, сертификати и отсъствия.');
        plannedKpiCard?.classList.add('d-none');
        actualKpiCard?.classList.add('d-none');
        absencesKpiCard?.classList.remove('col-xl-3');
        absencesKpiCard?.classList.add('col-xl-6');
        employeesKpiCard?.classList.remove('col-xl-3');
        employeesKpiCard?.classList.add('col-xl-6');
        certificatesPanel?.classList.remove('d-none');
        absencesPanel?.classList.remove('d-none');
        workloadPanel?.classList.remove('d-none');
        if (workloadDateInput && !workloadDateInput.value) {
          workloadDateInput.value = getTodayIsoDate();
        }
      }
    }

    return;
  }

  container.dataset.indexMode = 'crew';
  container.dataset.indexEmployeeId = userContext.employeeId || '';
  managementSection?.classList.add('d-none');
  crewSection?.classList.remove('d-none');
  setText(container, '#index-welcome-subtitle', 'Виждаш своя месечен календар за планирани и реални повески.');

  if (quickActions) {
    quickActions.innerHTML = `
      <a href="/planned-duties" data-link class="btn btn-outline-primary">Планирани повески</a>
      <a href="/actual-duties" data-link class="btn btn-outline-primary">Реални повески</a>
    `;
  }
}

export async function renderIndexPage(container) {
  const pageHtml = await loadHtml('../index.html', import.meta.url);
  container.innerHTML = pageHtml;
  attachIndexHandlers(container);
  const userContext = await loadUserSnapshot(container);
  applyRoleLayout(container, userContext);

  if (userContext?.mode === 'crew') {
    const monthKey = toMonthKey(new Date());
    crewCalendarState.visibleMonth = monthKey;
    crewCalendarState.selectedDate = getTodayIsoDate();
    await loadCrewMonthlySnapshot(container, userContext.employeeId || '', monthKey);
    return;
  }

  if (userContext?.mode === 'admin') {
    await loadAdminKpiSnapshot(container);
    return;
  }

  if (userContext?.mode === 'head_of_transport') {
    await loadHeadOfTransportSnapshot(container);
    return;
  }

  await loadKpiSnapshot(container);
}
