import {
  normalizeAssignmentRole,
  getEmployeeName,
  getPositionTitle,
  getDutyTypeName,
  getAbsenceReasonName,
  getDutyFromPlannedRow,
  normalizeTimeValue,
  escapeHtml
} from './helpers.js';

export function buildAbsenceByEmployee(absenceRows) {
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

  return absenceByEmployeeId;
}

export function groupDutiesFromPlanned(plannedRows) {
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

  return groupedDuties;
}

export function buildAssignmentsByDuty(rows, absenceByEmployeeId) {
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

  // Also add ALL employees from absenceByEmployeeId who didn't appear in
  // plannedRows at all — they are absent but have no planned duty for the day.
  if (absenceByEmployeeId) {
    absenceByEmployeeId.forEach((absentEntry, employeeId) => {
      if (!absentAssignmentsByEmployeeId.has(employeeId)) {
        absentAssignmentsByEmployeeId.set(employeeId, {
          employeeId: absentEntry.employeeId,
          employeeName: absentEntry.employeeName,
          reason: absentEntry.reasons.join(', ')
        });
      }
    });
  }

  return {
    assignmentsByDuty: map,
    absentAssignments: Array.from(absentAssignmentsByEmployeeId.values()).sort((left, right) =>
      String(left?.employeeName || '').localeCompare(String(right?.employeeName || ''), 'bg')
    )
  };
}

export function renderBoards(container, groupedDuties, assignmentsByDuty) {
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

export function renderAbsenceBoard(root, absentAssignments) {
  if (!root) {
    return;
  }

  if (!absentAssignments.length) {
    root.innerHTML = '<p class="text-secondary mb-0">Няма служители в разход.</p>';
    return;
  }

  const COLS = 5;
  // Pad to a full row of 5
  const padded = [...absentAssignments];
  const remainder = padded.length % COLS;
  if (remainder !== 0) {
    for (let i = 0; i < COLS - remainder; i++) {
      padded.push(null);
    }
  }

  const cards = padded
    .map((item) => item
      ? `<article class="absence-card">
           <span class="absence-card-name">${escapeHtml(item.employeeName || '')}</span>
           <span class="absence-card-reason">${escapeHtml(item.reason || '')}</span>
         </article>`
      : `<article class="absence-card absence-card-empty">
           <span class="absence-card-name"></span>
           <span class="absence-card-reason"></span>
         </article>`
    )
    .join('');

  root.innerHTML = `<div class="absence-cards-grid">${cards}</div>`;
}

export function setMessage(container, { hint, error, empty }) {
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
          const value = assignment.chiefs.length ? assignment.chiefs.join(', ') : '';
          return `<td${classAttr}>${renderCellKeyBadge('НВ', 'chief')}${escapeHtml(value)}</td>`;
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
              return `<td${classAttr}>${renderCellKeyBadge('К-р', 'conductor')}${escapeHtml(value)}</td>`;
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
            <div class="print-duty-card-note"></div>
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
          <div class="print-duty-card-note">${escapeHtml(String(duty.notes || '').trim())}</div>
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

function chunkArray(items, chunkSize) {
  const chunks = [];
  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }
  return chunks;
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

function renderCellKeyBadge(label, variant) {
  const cssClass = variant
    ? `schedule-cell-key-badge schedule-cell-key-badge-${variant}`
    : 'schedule-cell-key-badge';

  return `<span class="${cssClass}">${escapeHtml(label)}</span>`;
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
