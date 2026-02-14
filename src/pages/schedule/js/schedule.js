import { loadHtml } from '../../../utils/loadHtml.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';

const MM_TO_PX = 96 / 25.4;
const actualRowsById = new Map();
const escapeHandlers = new Map();

export async function renderSchedulePage(container) {
  const pageHtml = await loadHtml('../schedule.html', import.meta.url);
  container.innerHTML = pageHtml;

  const dateInput = container.querySelector('#schedule-date');
  const refreshButton = container.querySelector('#schedule-refresh');
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

  refreshButton?.addEventListener('click', async () => {
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

  closeButton?.addEventListener('click', () => closeModal(modal));
  cancelButton?.addEventListener('click', () => closeModal(modal));

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveEditedActualDuty(container);
  });

  container.addEventListener('click', (event) => {
    const editButton = event.target.closest('button[data-actual-edit-id]');
    if (!editButton) {
      return;
    }

    const actualId = editButton.getAttribute('data-actual-edit-id') || '';
    if (!actualId) {
      return;
    }

    openEditActualDutyModal(container, actualId);
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
      train: []
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
    .select('id, date, duty_id, employee_id, employees(first_name, last_name, positions(title)), duties(id, name, schedule_key_id, display_order, start_time, end_time, second_day, duty_types(name))')
    .eq('date', selectedDate);

  if (error) {
    showToast(error.message, 'error');
    actualRowsById.clear();
    renderBoards(container, {
      train: []
    }, new Map());
    setMessage(container, {
      hint: '',
      error: 'Грешка при зареждане на актуалните записи.',
      empty: ''
    });
    return;
  }

  actualRowsById.clear();
  (rows || []).forEach((row) => {
    if (row?.id) {
      actualRowsById.set(row.id, row);
    }
  });

  const groupedDuties = {
    train: []
  };

  const dutiesById = new Map();
  (rows || []).forEach((row) => {
    const duty = getDutyFromRow(row);
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
    }
  });

  groupedDuties.train.sort(compareByDutyStartTime);

  const assignmentsByDuty = buildAssignmentsByDuty(rows || []);
  renderBoards(container, groupedDuties, assignmentsByDuty);

  const totalCount = groupedDuties.train.length;
  setMessage(container, {
    hint: '',
    error: '',
    empty: totalCount ? '' : 'Няма повески за показване по избраните типове.'
  });
}

function buildAssignmentsByDuty(rows) {
  const map = new Map();

  rows.forEach((row) => {
    if (!row?.duty_id || !row?.employees || !row?.id) {
      return;
    }

    const entry = map.get(row.duty_id) || {
      chiefs: [],
      conductors: []
    };

    const employeeName = getEmployeeName(row.employees);
    const positionTitle = getPositionTitle(row.employees).toLowerCase();
    const assignment = {
      id: row.id,
      employeeId: row.employee_id,
      name: employeeName,
      dutyName: getDutyFromRow(row)?.name || '',
      date: row.date || ''
    };

    if (positionTitle.includes('началник') && positionTitle.includes('влак')) {
      if (employeeName && !entry.chiefs.some((item) => item.id === assignment.id)) {
        entry.chiefs.push(assignment);
      }
    }

    if (positionTitle.includes('кондуктор')) {
      if (employeeName && !entry.conductors.some((item) => item.id === assignment.id)) {
        entry.conductors.push(assignment);
      }
    }

    map.set(row.duty_id, entry);
  });

  return map;
}

function renderBoards(container, groupedDuties, assignmentsByDuty) {
  renderDutyBoard(container.querySelector('#schedule-train'), groupedDuties.train, assignmentsByDuty, {
    conductorRows: 3,
    showHours: true,
    separateSecondDay: true
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
          return `<td>${renderAssignmentList(assignment.chiefs)}</td>`;
        })
        .join('');

      const conductorRowsHtml = Array.from({ length: conductorRowsCount }, (_, rowIndex) => {
        const conductorCells = normalized
          .map((duty) => {
            if (!duty) {
              return '<td></td>';
            }

            const assignment = assignmentsByDuty.get(duty.id) || { conductors: [] };
            return `<td>${renderAssignmentItem(assignment.conductors[rowIndex])}</td>`;
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

function renderAssignmentList(assignments) {
  if (!assignments?.length) {
    return '';
  }

  return assignments
    .map((assignment) => renderAssignmentItem(assignment))
    .join('<br>');
}

function renderAssignmentItem(assignment) {
  if (!assignment?.id) {
    return '';
  }

  return `<button type="button" class="btn btn-link p-0 text-decoration-none align-baseline" data-actual-edit-id="${assignment.id}">${escapeHtml(assignment.name || '')}</button>`;
}

function openEditActualDutyModal(container, actualDutyId) {
  const row = actualRowsById.get(actualDutyId);
  if (!row) {
    showToast('Записът не е намерен.', 'warning');
    return;
  }

  const duty = getDutyFromRow(row);

  container.querySelector('#schedule-actual-edit-id').value = row.id;
  container.querySelector('#schedule-actual-edit-date').value = row.date || '';
  container.querySelector('#schedule-actual-edit-duty').value = duty?.name || '';
  container.querySelector('#schedule-actual-edit-employee').value = row.employee_id || '';

  openModal(container.querySelector('#schedule-actual-edit-modal'));
}

async function saveEditedActualDuty(container) {
  const idInput = container.querySelector('#schedule-actual-edit-id');
  const employeeInput = container.querySelector('#schedule-actual-edit-employee');
  const saveButton = container.querySelector('#schedule-actual-edit-save');

  const id = idInput?.value || '';
  const employeeId = employeeInput?.value || '';

  if (!id || !employeeId) {
    showToast('Избери служител.', 'warning');
    return;
  }

  const originalText = saveButton.innerHTML;
  saveButton.disabled = true;
  saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';

  const { error } = await supabase
    .from('actual_duties')
    .update({ employee_id: employeeId })
    .eq('id', id);

  saveButton.disabled = false;
  saveButton.innerHTML = originalText;

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  closeModal(container.querySelector('#schedule-actual-edit-modal'));
  showToast('Актуалният запис е обновен.', 'success');
  await loadScheduleData(container);
}

function chunkArray(items, chunkSize) {
  const chunks = [];
  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }
  return chunks;
}

function setMessage(container, { hint, error, empty }) {
  const hintEl = container.querySelector('#schedule-hint');
  const errorEl = container.querySelector('#schedule-error');
  const emptyEl = container.querySelector('#schedule-empty');

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

function getDutyFromRow(row) {
  const duty = row?.duties;
  if (Array.isArray(duty)) {
    return duty[0] || null;
  }

  if (duty && typeof duty === 'object') {
    return duty;
  }

  return null;
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

function openModal(modalElement) {
  modalElement?.classList.remove('d-none');
  document.body.classList.add('overflow-hidden');
}

function closeModal(modalElement) {
  modalElement?.classList.add('d-none');

  const hasOpenModal = Boolean(document.querySelector('#schedule-actual-edit-modal:not(.d-none)'));
  if (!hasOpenModal) {
    document.body.classList.remove('overflow-hidden');
  }
}

function setupModalEscapeHandler(handlerKey, modalsInPriority) {
  const previousHandler = escapeHandlers.get(handlerKey);
  if (previousHandler) {
    document.removeEventListener('keydown', previousHandler);
  }

  const handler = (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    for (const modal of modalsInPriority) {
      if (modal && !modal.classList.contains('d-none')) {
        closeModal(modal);
        return;
      }
    }
  };

  escapeHandlers.set(handlerKey, handler);
  document.addEventListener('keydown', handler);
}
