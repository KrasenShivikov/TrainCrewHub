import { loadHtml } from '../../../utils/loadHtml.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';

const MM_TO_PX = 96 / 25.4;

export async function renderPlanSchedulePage(container) {
  const pageHtml = await loadHtml('../plan-schedule.html', import.meta.url);
  container.innerHTML = pageHtml;

  const dateInput = container.querySelector('#plan-schedule-date');
  const refreshButton = container.querySelector('#plan-schedule-refresh');
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

  refreshButton?.addEventListener('click', async () => {
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
  root.classList.remove('print-compact', 'print-fit-one-page');
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
    setMessage(container, {
      hint: 'Избери дата.',
      error: '',
      empty: ''
    });
    return;
  }

  const { data: plannedRows, error: plannedError } = await supabase
    .from('planned_duties')
    .select('duty_id, assignment_role, employees(first_name, last_name, positions(title)), duties(id, name, schedule_key_id, display_order, start_time, end_time, second_day, duty_types(name))')
    .eq('date', selectedDate);

  if (plannedError) {
    showToast(plannedError.message, 'error');
    renderBoards(container, {
      train: [],
      businessTrip: [],
      dayOff: []
    }, new Map());
    setMessage(container, {
      hint: '',
      error: 'Грешка при зареждане на планираните записи.',
      empty: ''
    });
    return;
  }

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

  const assignmentsByDuty = buildAssignmentsByDuty(plannedRows || []);
  renderBoards(container, groupedDuties, assignmentsByDuty);

  const totalCount = groupedDuties.train.length + groupedDuties.businessTrip.length + groupedDuties.dayOff.length;
  setMessage(container, {
    hint: '',
    error: '',
    empty: totalCount ? '' : 'Няма повески за показване по избраните типове.'
  });
}

function buildAssignmentsByDuty(rows) {
  const map = new Map();

  rows.forEach((row) => {
    if (!row?.duty_id || !row?.employees) {
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

  return map;
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
    conductorRows: 3,
    showHours: true,
    separateSecondDay: true
  });
  renderDutyBoard(
    container.querySelector('#plan-schedule-business-trip'),
    groupedDuties.businessTrip,
    assignmentsByDuty,
    {
      conductorRows: 3,
      showHours: false
    }
  );
  renderDutyBoard(container.querySelector('#plan-schedule-day-off'), groupedDuties.dayOff, assignmentsByDuty, {
    conductorRows: 3,
    showHours: false
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
  const conductorRowsCount = Number.isInteger(options.conductorRows) && options.conductorRows > 0
    ? options.conductorRows
    : 3;

  const maxDutiesPerRow = 5;
  const chunks = chunkArray(normalizedDuties, maxDutiesPerRow);

  root.innerHTML = chunks
    .map((chunk) => {
      const normalized = [...chunk];
      while (normalized.length < maxDutiesPerRow) {
        normalized.push(null);
      }

      const headerCells = normalized
        .map((duty) => `<th scope="col" class="text-center">${escapeHtml(duty?.name ?? '')}</th>`)
        .join('');

      const hoursCells = normalized
        .map((duty) => {
          const value = duty ? formatDutyTimeRange(duty) : '';
          return `<td>${escapeHtml(value)}</td>`;
        })
        .join('');

      const chiefsCells = normalized
        .map((duty) => {
          if (!duty) {
            return '<td></td>';
          }

          const assignment = assignmentsByDuty.get(duty.id) || { chiefs: [] };
          const value = assignment.chiefs.length ? assignment.chiefs.join(', ') : '';
          return `<td>${escapeHtml(value)}</td>`;
        })
        .join('');

      const conductorRowsHtml = Array.from({ length: conductorRowsCount }, (_, rowIndex) => {
        const conductorCells = normalized
          .map((duty) => {
            if (!duty) {
              return '<td></td>';
            }

            const assignment = assignmentsByDuty.get(duty.id) || { conductors: [] };
            const value = assignment.conductors[rowIndex] || '';
            return `<td>${escapeHtml(value)}</td>`;
          })
          .join('');

        return `
          <tr>
            <th scope="row">К-р</th>
            ${conductorCells}
          </tr>
        `;
      }).join('');

      const hoursRow = options.showHours === false
        ? ''
        : `
            <tr>
              <th scope="row">Час</th>
              ${hoursCells}
            </tr>
          `;

      return `
        <table class="table table-bordered align-middle mb-3 plan-schedule-table">
          <thead>
            <tr>
              <th scope="col">Позиция</th>
              ${headerCells}
            </tr>
          </thead>
          <tbody>
            ${hoursRow}
            <tr>
              <th scope="row">Началник влак</th>
              ${chiefsCells}
            </tr>
            ${conductorRowsHtml}
          </tbody>
        </table>
      `;
    })
    .join('');
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

  return [...firstDay, null, ...secondDay];
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
