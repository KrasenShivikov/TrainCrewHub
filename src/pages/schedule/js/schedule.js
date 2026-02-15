import { loadHtml } from '../../../utils/loadHtml.js';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';

const MM_TO_PX = 96 / 25.4;
const actualRowsById = new Map();
const escapeHandlers = new Map();
let draggedActualDutyId = '';
let highlightedDropCell = null;

export async function renderSchedulePage(container) {
  const pageHtml = await loadHtml('../schedule.html', import.meta.url);
  container.innerHTML = pageHtml;

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

  closeButton?.addEventListener('click', () => closeModal(modal));
  cancelButton?.addEventListener('click', () => closeModal(modal));

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveEditedActualDuty(container);
  });

  container.addEventListener('click', (event) => {
    const editButton = event.target.closest('button[data-actual-edit-id]');
    if (editButton) {
      const actualId = editButton.getAttribute('data-actual-edit-id') || '';
      if (!actualId) {
        return;
      }

      openEditActualDutyModal(container, actualId);
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

    openCreateActualDutyModal(container, {
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

    dragButton.classList.add('opacity-50');
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', draggedActualDutyId);
    }

    applyDropTargetHighlights(container, draggedActualDutyId);
  });

  container.addEventListener('dragend', (event) => {
    const dragButton = event.target.closest('button[data-actual-drag-id]');
    dragButton?.classList.remove('opacity-50');
    clearDropTargetHighlights(container);
    draggedActualDutyId = '';
  });

  container.addEventListener('dragover', (event) => {
    const targetCell = event.target.closest('td[data-drop-duty-id]');
    if (!targetCell) {
      if (highlightedDropCell) {
        highlightedDropCell.classList.remove('schedule-drop-target-hover');
        highlightedDropCell = null;
      }
      return;
    }

    event.preventDefault();
    if (highlightedDropCell && highlightedDropCell !== targetCell) {
      highlightedDropCell.classList.remove('schedule-drop-target-hover');
    }
    highlightedDropCell = targetCell;
    highlightedDropCell.classList.add('schedule-drop-target-hover');
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  });

  container.addEventListener('drop', async (event) => {
    const targetCell = event.target.closest('td[data-drop-duty-id]');
    if (!targetCell) {
      clearDropTargetHighlights(container);
      return;
    }

    event.preventDefault();

    const targetDutyId = targetCell.getAttribute('data-drop-duty-id') || '';
    const targetDate = targetCell.getAttribute('data-drop-date') || '';
    const actualIdFromTransfer = event.dataTransfer?.getData('text/plain') || '';
    const actualId = actualIdFromTransfer || draggedActualDutyId;

    if (!targetDutyId || !targetDate || !actualId) {
      clearDropTargetHighlights(container);
      return;
    }

    clearDropTargetHighlights(container);
    await moveDraggedActualDuty(container, actualId, targetDutyId, targetDate);
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

  root.classList.add('print-preparing');
  root.classList.add('print-hide-second-day');
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
    .select('id, date, duty_id, employee_id, employees(first_name, last_name, positions(title)), duties(id, name, schedule_key_id, display_order, start_time, end_time, second_day, duty_types(name))')
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

function buildAssignmentsByDuty(rows, absentEmployeeIds) {
  const map = new Map();

  rows.forEach((row) => {
    if (!row?.duty_id || !row?.employees || !row?.id) {
      return;
    }

    if (row?.employee_id && absentEmployeeIds?.has(row.employee_id)) {
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

function renderBoards(container, groupedDuties, assignmentsByDuty, selectedDate) {
  renderDutyBoard(container.querySelector('#schedule-train'), groupedDuties.train, assignmentsByDuty, selectedDate, {
    allowAdd: true,
    allowEdit: true,
    conductorRows: 2,
    printConductorRows: 3,
    conductorRowOffset: 1,
    printExtraCardRows: 1,
    showHours: true,
    separateSecondDay: true,
    minPanels: 2,
    printAsCards: true,
    printHideSecondDay: true
  });
  renderDutyBoard(
    container.querySelector('#schedule-business-trip'),
    groupedDuties.businessTrip,
    assignmentsByDuty,
    selectedDate,
    {
      allowAdd: true,
      allowEdit: true,
      conductorRows: 3,
      showHours: false,
      minPanels: 1,
      hideEmptyConductorRows: true
    }
  );
  renderDutyBoard(
    container.querySelector('#schedule-day-off'),
    groupedDuties.dayOff,
    assignmentsByDuty,
    selectedDate,
    {
      allowAdd: true,
      allowEdit: true,
      conductorRows: 3,
      showHours: false,
      minPanels: 1,
      hideEmptyConductorRows: true
    }
  );
}

function renderDutyBoard(root, duties, assignmentsByDuty, selectedDate, options = {}) {
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
  const configuredPrintConductorRowsCount = Number.isInteger(options.printConductorRows) && options.printConductorRows > 0
    ? options.printConductorRows
    : configuredConductorRows;
  while (chunks.length < minPanels) {
    chunks.push([]);
  }

  const panelsHtml = chunks
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
          const dutyTypeName = getDutyTypeName(duty).toLowerCase();
          return `<td${classAttr} data-drop-duty-id="${duty.id}" data-drop-date="${selectedDate}" data-drop-duty-type="${escapeHtml(dutyTypeName)}">${renderAssignmentList(assignment.chiefs, duty, selectedDate, options)}</td>`;
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
            const conductorOffset = Number.isInteger(options.conductorRowOffset) && options.conductorRowOffset > 0
              ? options.conductorRowOffset
              : 0;
            const sourceIndex = rowIndex - conductorOffset;
            const conductorItem = sourceIndex >= 0 && Array.isArray(assignment.conductors)
              ? assignment.conductors[sourceIndex]
              : undefined;
            const dutyTypeName = getDutyTypeName(duty).toLowerCase();
            return `<td${classAttr} data-drop-duty-id="${duty.id}" data-drop-date="${selectedDate}" data-drop-duty-type="${escapeHtml(dutyTypeName)}">${renderAssignmentItem(conductorItem, duty, selectedDate, options)}</td>`;
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

      const cardsHtml = renderPrintableDutyCards(normalized, assignmentsByDuty, configuredPrintConductorRowsCount, options);

      return `
        <div class="print-as-cards">
          ${tableHtml}
          <div class="print-only-duty-cards mb-3">${cardsHtml}</div>
        </div>
      `;
    })
    .join('');

  const printExtraCardRows = Number.isInteger(options.printExtraCardRows) && options.printExtraCardRows > 0
    ? options.printExtraCardRows
    : 0;

  const extraCardsRowsHtml = options.printAsCards && printExtraCardRows > 0
    ? Array.from({ length: printExtraCardRows }, () => `
        <div class="print-as-cards">
          <div class="print-only-duty-cards mb-3">${renderPrintableDutyCards(Array.from({ length: maxDutiesPerRow }, () => null), new Map(), configuredPrintConductorRowsCount, options)}</div>
        </div>
      `).join('')
    : '';

  root.innerHTML = panelsHtml + extraCardsRowsHtml;
}

function renderPrintableDutyCards(duties, assignmentsByDuty, conductorRowsCount, options = {}) {
  const cards = duties
    .map((originalDuty) => {
      const duty = options.printHideSecondDay && originalDuty?.second_day ? null : originalDuty;

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
            <div class="print-duty-card-line">
              <span class="print-duty-card-key">Час</span>
              <span class="print-duty-card-value"></span>
            </div>
            <div class="print-duty-card-line">
              <span class="print-duty-card-key">НВ</span>
              <span class="print-duty-card-value"></span>
            </div>
            ${emptyConductorRows}
          </article>
        `;
      }

      const assignment = assignmentsByDuty.get(duty.id) || { chiefs: [], conductors: [] };
      const chiefValue = Array.isArray(assignment.chiefs)
        ? assignment.chiefs.map((item) => item?.name || '').filter(Boolean).join(', ')
        : '';
      const conductorRows = Array.from({ length: conductorRowsCount }, (_, rowIndex) => {
        const conductorOffset = Number.isInteger(options.conductorRowOffset) && options.conductorRowOffset > 0
          ? options.conductorRowOffset
          : 0;
        const sourceIndex = rowIndex - conductorOffset;
        const value = Array.isArray(assignment.conductors) && sourceIndex >= 0
          ? (assignment.conductors[sourceIndex]?.name || '')
          : '';
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
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">Час</span>
            <span class="print-duty-card-value">${escapeHtml(formatDutyTimeRange(duty))}</span>
          </div>
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

function renderAssignmentList(assignments, duty, selectedDate, options = {}) {
  if (!assignments?.length) {
    return renderAddAssignmentButton(duty, selectedDate, options);
  }

  return assignments
    .map((assignment) => renderAssignmentItem(assignment, duty, selectedDate, options))
    .join('<br>');
}

function renderAssignmentItem(assignment, duty, selectedDate, options = {}) {
  if (!assignment?.id) {
    return renderAddAssignmentButton(duty, selectedDate, options);
  }

  const allowEdit = options.allowEdit !== false;
  if (!allowEdit) {
    return escapeHtml(assignment.name || '');
  }

  return `<button type="button" class="btn btn-link p-0 text-decoration-none align-baseline" draggable="true" data-actual-edit-id="${assignment.id}" data-actual-drag-id="${assignment.id}">${escapeHtml(assignment.name || '')}</button>`;
}

function renderAddAssignmentButton(duty, selectedDate, options = {}) {
  const allowAdd = options.allowAdd !== false;
  if (!allowAdd || !duty?.id || !selectedDate) {
    return '';
  }

  return `<button type="button" class="btn btn-link p-0 text-decoration-none no-print" data-actual-add-duty-id="${duty.id}" data-actual-add-date="${selectedDate}" data-actual-add-duty-name="${escapeHtml(duty.name || '')}">Добави</button>`;
}

function openEditActualDutyModal(container, actualDutyId) {
  const row = actualRowsById.get(actualDutyId);
  if (!row) {
    showToast('Записът не е намерен.', 'warning');
    return;
  }

  const duty = getDutyFromRow(row);

  container.querySelector('#schedule-actual-edit-title').textContent = 'Редакция на актуална повеска';
  container.querySelector('#schedule-actual-edit-id').value = row.id;
  container.querySelector('#schedule-actual-edit-duty-id').value = row.duty_id || duty?.id || '';
  container.querySelector('#schedule-actual-edit-date-value').value = row.date || '';
  container.querySelector('#schedule-actual-edit-date').value = row.date || '';
  container.querySelector('#schedule-actual-edit-duty').value = duty?.name || '';
  container.querySelector('#schedule-actual-edit-employee').value = row.employee_id || '';
  container.querySelector('#schedule-actual-edit-save').textContent = 'Запази';

  openModal(container.querySelector('#schedule-actual-edit-modal'));
}

function openCreateActualDutyModal(container, { dutyId, date, dutyName }) {
  container.querySelector('#schedule-actual-edit-title').textContent = 'Нов актуален запис';
  container.querySelector('#schedule-actual-edit-id').value = '';
  container.querySelector('#schedule-actual-edit-duty-id').value = dutyId;
  container.querySelector('#schedule-actual-edit-date-value').value = date;
  container.querySelector('#schedule-actual-edit-date').value = date;
  container.querySelector('#schedule-actual-edit-duty').value = dutyName || '';
  container.querySelector('#schedule-actual-edit-employee').value = '';
  container.querySelector('#schedule-actual-edit-save').textContent = 'Създай';

  openModal(container.querySelector('#schedule-actual-edit-modal'));
}

async function saveEditedActualDuty(container) {
  const idInput = container.querySelector('#schedule-actual-edit-id');
  const dutyIdInput = container.querySelector('#schedule-actual-edit-duty-id');
  const dateValueInput = container.querySelector('#schedule-actual-edit-date-value');
  const employeeInput = container.querySelector('#schedule-actual-edit-employee');
  const saveButton = container.querySelector('#schedule-actual-edit-save');

  const id = idInput?.value || '';
  const dutyId = dutyIdInput?.value || '';
  const date = dateValueInput?.value || '';
  const employeeId = employeeInput?.value || '';

  if (!employeeId) {
    showToast('Избери служител.', 'warning');
    return;
  }

  if (!id && (!dutyId || !date)) {
    showToast('Липсват дата или повеска за новия запис.', 'warning');
    return;
  }

  const originalText = saveButton.innerHTML;
  saveButton.disabled = true;
  saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';

  let error;
  let savedActualId = id;
  if (id) {
    ({ error } = await supabase
      .from('actual_duties')
      .update({ employee_id: employeeId })
      .eq('id', id));
  } else {
    const { data: insertedRow, error: insertError } = await supabase
      .from('actual_duties')
      .insert({
        date,
        duty_id: dutyId,
        employee_id: employeeId
      })
      .select('id')
      .single();
    error = insertError;
    savedActualId = insertedRow?.id || '';
  }

  saveButton.disabled = false;
  saveButton.innerHTML = originalText;

  if (error) {
    if (error.code === '23505') {
      showToast('Този запис вече съществува за служителя и повеската.', 'warning');
      return;
    }

    showToast(error.message, 'error');
    return;
  }

  const cleanupError = await removeEmployeeTripAndDayOffEntries(employeeId, date, dutyId, savedActualId);
  if (cleanupError) {
    showToast(cleanupError.message, 'error');
    return;
  }

  closeModal(container.querySelector('#schedule-actual-edit-modal'));
  showToast(id ? 'Актуалният запис е обновен.' : 'Актуалният запис е създаден.', 'success');
  await loadScheduleData(container);
}

async function moveDraggedActualDuty(container, actualDutyId, targetDutyId, targetDate) {
  const row = actualRowsById.get(actualDutyId);
  if (!row) {
    return;
  }

  const sameDuty = row.duty_id === targetDutyId;
  const sameDate = row.date === targetDate;
  if (sameDuty && sameDate) {
    return;
  }

  const { error } = await supabase
    .from('actual_duties')
    .update({
      duty_id: targetDutyId,
      date: targetDate
    })
    .eq('id', actualDutyId);

  if (error) {
    if (error.code === '23505') {
      showToast('Този запис вече съществува за служителя и повеската.', 'warning');
      return;
    }

    showToast(error.message, 'error');
    return;
  }

  const cleanupError = await removeEmployeeTripAndDayOffEntries(row.employee_id, targetDate, targetDutyId, actualDutyId);
  if (cleanupError) {
    showToast(cleanupError.message, 'error');
    return;
  }

  await loadScheduleData(container);
  showToast('Служителят е преместен успешно.', 'success');
}

function applyDropTargetHighlights(container, actualDutyId) {
  clearDropTargetHighlights(container);

  if (!actualDutyId) {
    return;
  }

  const draggedRow = actualRowsById.get(actualDutyId);
  const draggedDuty = getDutyFromRow(draggedRow);
  const draggedCategory = getDutyCategoryByTypeName(getDutyTypeName(draggedDuty));

  container.querySelectorAll('td[data-drop-duty-id]').forEach((cell) => {
    const targetCategory = getDutyCategoryByTypeName(cell.getAttribute('data-drop-duty-type') || '');
    cell.classList.add('schedule-drop-target');

    if (targetCategory === 'business-trip') {
      cell.classList.add('schedule-drop-target-business-trip');
    }

    if (draggedCategory && targetCategory === draggedCategory) {
      cell.classList.add('schedule-drop-target-preferred');
    }
  });
}

function clearDropTargetHighlights(container) {
  container
    .querySelectorAll('.schedule-drop-target, .schedule-drop-target-business-trip, .schedule-drop-target-preferred, .schedule-drop-target-hover')
    .forEach((cell) => {
      cell.classList.remove('schedule-drop-target', 'schedule-drop-target-business-trip', 'schedule-drop-target-preferred', 'schedule-drop-target-hover');
    });
  highlightedDropCell = null;
}

function getDutyCategoryByTypeName(typeName) {
  const normalized = String(typeName || '').toLowerCase();
  if (normalized.includes('на влак')) {
    return 'train';
  }

  if (normalized.includes('командировка')) {
    return 'business-trip';
  }

  if (normalized.includes('свободен ден')) {
    return 'day-off';
  }

  return '';
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
