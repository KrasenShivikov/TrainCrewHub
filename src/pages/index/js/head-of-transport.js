import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';

export function createHeadOfTransportController(deps) {
  const {
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
  } = deps;

  const absenceState = {
    groups: [],
    selectedKey: ''
  };

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
          <td data-label="Служител">${escapeHtml(item.employeeName)}</td>
          <td data-label="Сертификат">${escapeHtml(item.certificateLabel)}</td>
          <td data-label="Дата">${escapeHtml(formatDate(item.date))}</td>
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

    const sortByDateThenName = (left, right) => {
      const dateDiff = String(left.date).localeCompare(String(right.date));
      if (dateDiff !== 0) {
        return dateDiff;
      }
      return String(left.employeeName).localeCompare(String(right.employeeName), 'bg');
    };

    return {
      soon: soon.sort(sortByDateThenName),
      expired: expired.sort(sortByDateThenName)
    };
  }

  function getCertificateStatusBadgeClass(statusKey, count) {
    if (!count) {
      return 'text-bg-secondary';
    }

    if (statusKey === 'expired') {
      return 'text-bg-danger';
    }

    return 'text-bg-warning';
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
        const isExpanded = key === absenceState.selectedKey;
        const detailsRows = group.details
          .map((item) => {
            const period = `${formatDate(item.startDate)} - ${formatDate(item.endDate)}`;
            return `
              <tr>
                <td data-label="Служител">${escapeHtml(item.employeeName)}</td>
                <td data-label="Период">${escapeHtml(period)}</td>
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
            <div class="table-responsive tch-no-scroll-mobile">
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
    if (key === '' || key === absenceState.selectedKey) {
      absenceState.selectedKey = '';
      renderAbsenceReasonsSummary(container, absenceState.groups);
      return;
    }

    const nextGroup = absenceState.groups[Number(key)] || null;
    if (!nextGroup) {
      absenceState.selectedKey = '';
      renderAbsenceReasonsSummary(container, absenceState.groups);
      return;
    }

    absenceState.selectedKey = String(key);
    renderAbsenceReasonsSummary(container, absenceState.groups);
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
      absenceState.groups = [];
      absenceState.selectedKey = '';
      renderAbsenceReasonsSummary(container, []);
      return;
    }

    absenceState.groups = buildAbsenceGroupsByReason(data || []);
    absenceState.selectedKey = '';
    renderAbsenceReasonsSummary(container, absenceState.groups);
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
          <td data-label="Служител">${escapeHtml(row.employeeName)}</td>
          <td data-label="Планирани">${escapeHtml(row.planned)}</td>
          <td data-label="Реални">${escapeHtml(row.actual)}</td>
          <td data-label="Норма">${escapeHtml(row.norm)}</td>
          <td data-label="Отклонение"><span class="badge ${escapeHtml(row.deviationClass)}">${escapeHtml(row.deviation)}</span></td>
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

  return {
    toggleCertificateDetails,
    toggleAbsenceReasonDetails,
    loadHeadOfTransportWorkload,
    loadHeadOfTransportSnapshot
  };
}
