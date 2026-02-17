import {
  normalizeTimeValue,
  getEmployeeName,
  resolveActualDutyRole,
  getDutyTypeName,
  getDutyFromRow,
  escapeHtml
} from './helpers.js';

export function buildAssignmentsByDuty(rows, absentEmployeeIds) {
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
    const resolvedRole = resolveActualDutyRole(row);
    const assignment = {
      id: row.id,
      employeeId: row.employee_id,
      role: resolvedRole,
      name: employeeName,
      dutyName: getDutyFromRow(row)?.name || '',
      date: row.date || ''
    };

    if (resolvedRole === 'chief') {
      if (employeeName && !entry.chiefs.some((item) => item.id === assignment.id)) {
        entry.chiefs.push(assignment);
      }
    } else if (resolvedRole === 'conductor') {
      if (employeeName && !entry.conductors.some((item) => item.id === assignment.id)) {
        entry.conductors.push(assignment);
      }
    }

    map.set(row.duty_id, entry);
  });

  return map;
}

export function renderBoards(container, groupedDuties, assignmentsByDuty, selectedDate) {
  renderDutyBoard(container.querySelector('#schedule-train'), groupedDuties.train, assignmentsByDuty, selectedDate, {
    allowAdd: true,
    allowEdit: true,
    conductorRows: 2,
    printConductorRows: 3,
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

export function setMessage(container, { hint, error, empty }) {
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

export function formatDateBg(value) {
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

export function compareByScheduleKeyOrder(left, right) {
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

export function compareByDutyStartTime(left, right) {
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
          if (!label) {
            return `<th scope="col"${classAttr}></th>`;
          }

          const notes = String(duty?.notes || '').trim();
          const notesHtml = notes
            ? `<div class="schedule-duty-note" title="${escapeHtml(notes)}">${escapeHtml(notes)}</div>`
            : '';

          return `<th scope="col"${classAttr}><span class="schedule-duty-name-wrap">${renderCellKeyBadge('Влак', 'train')}<span class="schedule-duty-name-ellipsis" title="${escapeHtml(label)}">${escapeHtml(label)}</span></span>${notesHtml}</th>`;
        })
        .join('');

      const hoursCells = normalized
        .map((duty) => {
          const classAttr = getDutyCellClassAttr(duty);
          const value = duty && !isSeparatorDuty(duty) ? formatDutyTimeRange(duty) : '';
          if (!duty || isSeparatorDuty(duty)) {
            return `<td${classAttr}></td>`;
          }

          return `<td${classAttr}>${renderCellKeyBadge('Час', 'hours')}${escapeHtml(value)}</td>`;
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
          return `<td${classAttr} data-drop-duty-id="${duty.id}" data-drop-duty-name="${escapeHtml(duty?.name || '')}" data-drop-date="${selectedDate}" data-drop-role="chief" data-drop-duty-type="${escapeHtml(dutyTypeName)}">${renderCellKeyBadge('НВ', 'chief')}${renderAssignmentList(assignment.chiefs, duty, selectedDate, options)}</td>`;
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
              return `<td${classAttr} data-drop-duty-id="${duty.id}" data-drop-duty-name="${escapeHtml(duty?.name || '')}" data-drop-date="${selectedDate}" data-drop-role="conductor" data-drop-duty-type="${escapeHtml(dutyTypeName)}">${renderCellKeyBadge('К-р', 'conductor')}${renderAssignmentItem(conductorItem, duty, selectedDate, options)}</td>`;
            })
            .join('');

          return `
          <tr>
            ${conductorCells}
          </tr>
        `;
        }).join('')
        : '';

      const hoursRow = options.showHours === false
        ? ''
        : `
            <tr>
              ${hoursCells}
            </tr>
          `;

      const tableHtml = `
        <table class="table table-bordered align-middle mb-3 plan-schedule-table">
          <thead>
            <tr>
              ${headerCells}
            </tr>
          </thead>
          <tbody>
            ${hoursRow}
            <tr>
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
            <div class="print-duty-card-note"></div>
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
          <div class="print-duty-card-note">${escapeHtml(String(duty.notes || '').trim())}</div>
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

function renderCellKeyBadge(label, variant) {
  const cssClass = variant
    ? `schedule-cell-key-badge schedule-cell-key-badge-${variant}`
    : 'schedule-cell-key-badge';

  return `<span class="${cssClass}">${escapeHtml(label)}</span>`;
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

function chunkArray(items, chunkSize) {
  const chunks = [];
  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }
  return chunks;
}
