import { loadHtml } from '../../../utils/loadHtml.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';

const MM_TO_PX = 96 / 25.4;

export async function renderPlanSchedulePage(container) {
  const pageHtml = await loadHtml('../plan-schedule.html', import.meta.url);
  container.innerHTML = pageHtml;

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

function preparePrintLayout(container, { orientation, compact, fitOnePage }) {
  const root = document.documentElement;
  const sheet = container.querySelector('.plan-schedule-sheet');

  root.classList.add('print-preparing');
  root.classList.toggle('print-compact', compact);
  root.classList.toggle('print-fit-one-page', fitOnePage);

  if (sheet) {
    sheet.classList.toggle('print-landscape-page', orientation === 'landscape');
    sheet.classList.toggle('print-portrait-page', orientation === 'portrait');
  }

  if (!fitOnePage || !sheet) {
    root.style.setProperty('--plan-print-scale', '1');
    return;
  }

  root.style.setProperty('--plan-print-scale', '1');

  const rect = sheet.getBoundingClientRect();
  const pageWidthMm = orientation === 'portrait' ? 210 : 297;
  const pageHeightMm = orientation === 'portrait' ? 297 : 210;
  const printableWidthPx = (pageWidthMm - 20) * MM_TO_PX;
  const printableHeightPx = (pageHeightMm - 20) * MM_TO_PX;

  const scaleX = printableWidthPx / Math.max(rect.width, 1);
  const scaleY = printableHeightPx / Math.max(rect.height, 1);
  const scale = Math.min(scaleX, scaleY, 1);

  root.style.setProperty('--plan-print-scale', String(Math.max(0.6, scale)));
}

function cleanupPrintLayout() {
  const root = document.documentElement;
  root.classList.remove('print-preparing', 'print-compact', 'print-fit-one-page', 'print-hide-second-day');
  root.style.setProperty('--plan-print-scale', '1');

  document.querySelectorAll('.plan-schedule-sheet').forEach((sheet) => {
    sheet.classList.remove('print-landscape-page', 'print-portrait-page');
  });
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

  const absenceByEmployeeId = new Map();
  (absenceRows || []).forEach((row) => {
    const employeeId = row?.employee_id;
    if (!employeeId) {
      return;
    }

    const existing = absenceByEmployeeId.get(employeeId) || {
      employeeId,
      employeeName: getEmployeeName(row.employees),
      reasons: []
    };

    const reasonName = getAbsenceReasonName(row.absence_reasons);
    if (reasonName && !existing.reasons.includes(reasonName)) {
      existing.reasons.push(reasonName);
    }

    absenceByEmployeeId.set(employeeId, existing);
  });

  const groupedDuties = {
    train: [],
    businessTrip: [],
    dayOff: []
  };

  const dutiesById = new Map();

  (plannedRows || []).forEach((row) => {
    const duty = getDutyFromPlannedRow(row);
    if (!duty?.id) {
      return;
    }

    if (!dutiesById.has(duty.id)) {
      dutiesById.set(duty.id, duty);
    }
  });

  Array.from(dutiesById.values()).forEach((duty) => {
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

function buildAssignmentsByDuty(rows, absenceByEmployeeId) {
  const map = new Map();
  const absentAssignmentsByEmployeeId = new Map();

  rows.forEach((row) => {
    if (!row?.duty_id || !row?.employees) {
      return;
    }

    if (row?.employee_id && absenceByEmployeeId?.has(row.employee_id)) {
      const absentEntry = absenceByEmployeeId.get(row.employee_id);
      if (absentEntry && !absentAssignmentsByEmployeeId.has(row.employee_id)) {
        absentAssignmentsByEmployeeId.set(row.employee_id, {
          employeeId: absentEntry.employeeId,
          employeeName: absentEntry.employeeName,
          reason: absentEntry.reasons.join(', ')
        });
      }
      return;
    }

    const entry = map.get(row.duty_id) || {
      chiefs: [],
      conductors: []
    };

    const employeeName = getEmployeeName(row.employees);
    const assignmentRole = normalizeAssignmentRole(row.assignment_role);

    if (assignmentRole === 'chief') {
      if (employeeName && !entry.chiefs.includes(employeeName)) {
        entry.chiefs.push(employeeName);
      }
    }

    if (assignmentRole === 'conductor') {
      if (employeeName && !entry.conductors.includes(employeeName)) {
        entry.conductors.push(employeeName);
      }
    }

    if (!assignmentRole) {
      const positionTitle = getPositionTitle(row.employees).toLowerCase();

      if (positionTitle.includes('началник') && positionTitle.includes('влак')) {
        if (employeeName && !entry.chiefs.includes(employeeName)) {
          entry.chiefs.push(employeeName);
        }
      }

      if (positionTitle.includes('кондуктор')) {
        if (employeeName && !entry.conductors.includes(employeeName)) {
          entry.conductors.push(employeeName);
        }
      }
    }

    map.set(row.duty_id, entry);
  });

  return {
    assignmentsByDuty: map,
    absentAssignments: Array.from(absentAssignmentsByEmployeeId.values()).sort((left, right) =>
      String(left?.employeeName || '').localeCompare(String(right?.employeeName || ''), 'bg')
    )
  };
}

function normalizeAssignmentRole(value) {
  if (value === 'chief' || value === 'conductor') {
    return value;
  }

  return '';
}

function getEmployeeName(employee) {
  const firstName = employee?.first_name ?? '';
  const lastName = employee?.last_name ?? '';
  return `${firstName} ${lastName}`.trim();
}

function getPositionTitle(employee) {
  const positions = employee?.positions;
  if (Array.isArray(positions)) {
    return positions[0]?.title ?? '';
  }

  if (positions && typeof positions === 'object') {
    return positions.title ?? '';
  }

  return '';
}

function getDutyTypeName(duty) {
  const type = duty?.duty_types;
  if (Array.isArray(type)) {
    return type[0]?.name ?? '';
  }

  if (type && typeof type === 'object') {
    return type.name ?? '';
  }

  return '';
}

function getAbsenceReasonName(reason) {
  if (Array.isArray(reason)) {
    return reason[0]?.name ?? '';
  }

  if (reason && typeof reason === 'object') {
    return reason.name ?? '';
  }

  return '';
}

function getDutyFromPlannedRow(row) {
  const duty = row?.duties;
  if (Array.isArray(duty)) {
    return duty[0] || null;
  }

  if (duty && typeof duty === 'object') {
    return duty;
  }

  return null;
}

function renderBoards(container, groupedDuties, assignmentsByDuty) {
  renderDutyBoard(container.querySelector('#plan-schedule-train'), groupedDuties.train, assignmentsByDuty, {
    conductorRows: 2,
    showHours: true,
    separateSecondDay: true,
    minPanels: 2,
    printAsCards: true
  });
  renderDutyBoard(
    container.querySelector('#plan-schedule-business-trip'),
    groupedDuties.businessTrip,
    assignmentsByDuty,
    {
      conductorRows: 3,
      showHours: false,
      minPanels: 1,
      hideEmptyConductorRows: true,
      printAsCards: true
    }
  );
  renderDutyBoard(container.querySelector('#plan-schedule-day-off'), groupedDuties.dayOff, assignmentsByDuty, {
    conductorRows: 3,
    showHours: false,
    minPanels: 1,
    hideEmptyConductorRows: true,
    printAsCards: true
  });
}

function renderDutyBoard(root, duties, assignmentsByDuty, options = {}) {
  if (!root) {
    return;
  }

  if (!duties.length) {
    root.innerHTML = '<p class="text-secondary mb-0">Няма повески от този тип.</p>';
    return;
  }

  const normalizedDuties = options.separateSecondDay ? buildDutiesWithSecondDaySeparator(duties) : duties;
  const configuredConductorRows = Number.isInteger(options.conductorRows) && options.conductorRows >= 0
    ? options.conductorRows
    : 3;

  const maxDutiesPerRow = 5;
  const chunks = chunkArray(normalizedDuties, maxDutiesPerRow);
  const minPanels = Number.isInteger(options.minPanels) && options.minPanels > 0
    ? options.minPanels
    : 1;
  while (chunks.length < minPanels) {
    chunks.push([]);
  }

  root.innerHTML = chunks
    .map((chunk) => {
      const normalized = [...chunk];
      while (normalized.length < maxDutiesPerRow) {
        normalized.push(null);
      }

      const headerCells = normalized
        .map((duty) => {
          const classAttr = getDutyCellClassAttr(duty, 'text-center');
          const label = isSeparatorDuty(duty) ? '' : (duty?.name ?? '');
          return `<th scope="col"${classAttr}>${escapeHtml(label)}</th>`;
        })
        .join('');

      const hoursCells = normalized
        .map((duty) => {
          const classAttr = getDutyCellClassAttr(duty);
          const value = duty && !isSeparatorDuty(duty) ? formatDutyTimeRange(duty) : '';
          return `<td${classAttr}>${escapeHtml(value)}</td>`;
        })
        .join('');

      const chiefsCells = normalized
        .map((duty) => {
          if (!duty) {
            return '<td></td>';
          }

          const classAttr = getDutyCellClassAttr(duty);
          if (isSeparatorDuty(duty)) {
            return `<td${classAttr}></td>`;
          }

          const assignment = assignmentsByDuty.get(duty.id) || { chiefs: [] };
          const value = assignment.chiefs.length ? assignment.chiefs.join(', ') : '';
          return `<td${classAttr}>${escapeHtml(value)}</td>`;
        })
        .join('');

      let conductorRowsCount = configuredConductorRows;
      if (options.hideEmptyConductorRows) {
        const usedConductorRows = normalized.reduce((maxRows, duty) => {
          if (!duty || isSeparatorDuty(duty)) {
            return maxRows;
          }

          const assignment = assignmentsByDuty.get(duty.id) || { conductors: [] };
          const conductorCount = Array.isArray(assignment.conductors) ? assignment.conductors.length : 0;
          return Math.max(maxRows, conductorCount);
        }, 0);

        conductorRowsCount = Math.min(configuredConductorRows, usedConductorRows);
      }

      const conductorRowsHtml = conductorRowsCount > 0
        ? Array.from({ length: conductorRowsCount }, (_, rowIndex) => {
        const conductorCells = normalized
          .map((duty) => {
            if (!duty) {
              return '<td></td>';
            }

            const classAttr = getDutyCellClassAttr(duty);
            if (isSeparatorDuty(duty)) {
              return `<td${classAttr}></td>`;
            }

            const assignment = assignmentsByDuty.get(duty.id) || { conductors: [] };
            const value = assignment.conductors[rowIndex] || '';
            return `<td${classAttr}>${escapeHtml(value)}</td>`;
          })
          .join('');

        return `
          <tr>
            <th scope="row">К-р</th>
            ${conductorCells}
          </tr>
        `;
        }).join('')
        : '';

      const hoursRow = options.showHours === false
        ? ''
        : `
            <tr>
              <th scope="row">Час</th>
              ${hoursCells}
            </tr>
          `;

      const tableHtml = `
        <table class="table table-bordered align-middle mb-3 plan-schedule-table">
          <thead>
            <tr>
              <th scope="col">Влак</th>
              ${headerCells}
            </tr>
          </thead>
          <tbody>
            ${hoursRow}
            <tr>
              <th scope="row">НВ</th>
              ${chiefsCells}
            </tr>
            ${conductorRowsHtml}
          </tbody>
        </table>
      `;

      if (!options.printAsCards) {
        return tableHtml;
      }

      const cardsHtml = renderPrintableDutyCards(normalized, assignmentsByDuty, conductorRowsCount, options);

      return `
        <div class="print-as-cards">
          ${tableHtml}
          <div class="print-only-duty-cards mb-3">${cardsHtml}</div>
        </div>
      `;
    })
    .join('');
}

function renderPrintableDutyCards(duties, assignmentsByDuty, conductorRowsCount, options = {}) {
  const cards = duties
    .map((duty) => {
      const showHours = options.showHours !== false;
      const hoursLine = showHours
        ? `
            <div class="print-duty-card-line">
              <span class="print-duty-card-key">Час</span>
              <span class="print-duty-card-value"></span>
            </div>
          `
        : '';

      if (!duty || isSeparatorDuty(duty)) {
        const emptyConductorRows = Array.from({ length: conductorRowsCount }, () => `
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">К-р</span>
            <span class="print-duty-card-value"></span>
          </div>
        `).join('');

        return `
          <article class="print-duty-card">
            <div class="print-duty-card-title"></div>
            ${hoursLine}
            <div class="print-duty-card-line">
              <span class="print-duty-card-key">НВ</span>
              <span class="print-duty-card-value"></span>
            </div>
            ${emptyConductorRows}
          </article>
        `;
      }

      const assignment = assignmentsByDuty.get(duty.id) || { chiefs: [], conductors: [] };
      const chiefValue = Array.isArray(assignment.chiefs) ? assignment.chiefs.join(', ') : '';
      const conductorRows = Array.from({ length: conductorRowsCount }, (_, rowIndex) => {
        const value = Array.isArray(assignment.conductors) ? (assignment.conductors[rowIndex] || '') : '';
        return `
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">К-р</span>
            <span class="print-duty-card-value">${escapeHtml(value)}</span>
          </div>
        `;
      }).join('');

      return `
        <article class="print-duty-card">
          <div class="print-duty-card-title">${escapeHtml(duty.name || '')}</div>
          ${showHours
    ? `
            <div class="print-duty-card-line">
              <span class="print-duty-card-key">Час</span>
              <span class="print-duty-card-value">${escapeHtml(formatDutyTimeRange(duty))}</span>
            </div>
          `
    : ''}
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">НВ</span>
            <span class="print-duty-card-value">${escapeHtml(chiefValue)}</span>
          </div>
          ${conductorRows}
        </article>
      `;
    })
    .join('');

  return `<div class="print-duty-cards-grid">${cards}</div>`;
}

function renderAbsenceBoard(root, absentAssignments) {
  if (!root) {
    return;
  }

  if (!absentAssignments.length) {
    root.innerHTML = '<p class="text-secondary mb-0">Няма служители в разход.</p>';
    return;
  }

  const rows = absentAssignments
    .map((item) => `
      <tr>
        <td>${escapeHtml(item.employeeName || '')}</td>
        <td>${escapeHtml(item.reason || '')}</td>
      </tr>
    `)
    .join('');

  root.innerHTML = `
    <table class="table table-bordered align-middle mb-0 plan-schedule-table">
      <thead>
        <tr>
          <th scope="col">Служител</th>
          <th scope="col">Причина</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

function chunkArray(items, chunkSize) {
  const chunks = [];
  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }
  return chunks;
}

function setMessage(container, { hint, error, empty }) {
  const hintEl = container.querySelector('#plan-schedule-hint');
  const errorEl = container.querySelector('#plan-schedule-error');
  const emptyEl = container.querySelector('#plan-schedule-empty');

  if (hintEl) {
    hintEl.textContent = hint || '';
    hintEl.classList.toggle('d-none', !hint);
  }

  if (errorEl) {
    errorEl.textContent = error || '';
    errorEl.classList.toggle('d-none', !error);
  }

  if (emptyEl) {
    emptyEl.textContent = empty || '';
    emptyEl.classList.toggle('d-none', !empty);
  }
}

function formatDateBg(value) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('bg-BG', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

function formatDutyTimeRange(duty) {
  const start = (duty?.start_time || '').slice(0, 5);
  const end = (duty?.end_time || '').slice(0, 5);

  if (!start && !end) {
    return '';
  }

  if (start && end) {
    return `${start} - ${end}`;
  }

  return start || end;
}

function compareByScheduleKeyOrder(left, right) {
  const leftKey = left?.schedule_key_id || '';
  const rightKey = right?.schedule_key_id || '';
  if (leftKey !== rightKey) {
    return String(leftKey).localeCompare(String(rightKey), 'bg');
  }

  const leftOrder = Number.isFinite(Number(left?.display_order)) ? Number(left.display_order) : Number.MAX_SAFE_INTEGER;
  const rightOrder = Number.isFinite(Number(right?.display_order)) ? Number(right.display_order) : Number.MAX_SAFE_INTEGER;
  if (leftOrder !== rightOrder) {
    return leftOrder - rightOrder;
  }

  return String(left?.name || '').localeCompare(String(right?.name || ''), 'bg');
}

function compareByDutyStartTime(left, right) {
  const leftSecondDay = Boolean(left?.second_day);
  const rightSecondDay = Boolean(right?.second_day);
  if (leftSecondDay !== rightSecondDay) {
    return leftSecondDay ? 1 : -1;
  }

  const leftStart = normalizeTimeValue(left?.start_time);
  const rightStart = normalizeTimeValue(right?.start_time);
  if (leftStart !== rightStart) {
    return leftStart.localeCompare(rightStart, 'bg');
  }

  return compareByScheduleKeyOrder(left, right);
}

function buildDutiesWithSecondDaySeparator(duties) {
  const firstDay = [];
  const secondDay = [];

  duties.forEach((duty) => {
    if (duty?.second_day) {
      secondDay.push(duty);
      return;
    }

    firstDay.push(duty);
  });

  if (!firstDay.length || !secondDay.length) {
    return duties;
  }

  const maxDutiesPerRow = 5;
  const hasFreeSlotInCurrentPanel = firstDay.length % maxDutiesPerRow !== 0;

  if (!hasFreeSlotInCurrentPanel) {
    return [...firstDay, ...secondDay];
  }

  return [...firstDay, { __separator: true }, ...secondDay];
}

function isSeparatorDuty(duty) {
  return Boolean(duty && duty.__separator);
}

function getDutyCellClassAttr(duty, extraClass = '') {
  const classNames = [];
  if (extraClass) {
    classNames.push(extraClass);
  }

  if (isSeparatorDuty(duty)) {
    classNames.push('separator-col');
  } else if (duty?.second_day) {
    classNames.push('second-day-col');
  }

  if (!classNames.length) {
    return '';
  }

  return ` class="${classNames.join(' ')}"`;
}

function normalizeTimeValue(value) {
  const raw = String(value || '').trim();
  if (!raw) {
    return '99:99:99';
  }

  const match = raw.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);
  if (!match) {
    return '99:99:99';
  }

  const hours = String(Number(match[1])).padStart(2, '0');
  const minutes = match[2];
  const seconds = match[3] || '00';
  return `${hours}:${minutes}:${seconds}`;
}

function getDateFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const date = params.get('date') || '';

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return '';
  }

  return date;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
