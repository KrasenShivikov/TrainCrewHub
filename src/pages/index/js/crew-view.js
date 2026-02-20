import { showToast } from '../../../components/toast/toast.js';

const crewAbsenceCodeClassMap = {
  'БО': 'text-bg-warning',
  'ДО': 'text-bg-danger',
  'ПО': 'text-bg-primary',
  'НП': 'text-bg-dark',
  'К': 'text-bg-info',
  'ОТС': 'text-bg-secondary'
};

export function createCrewViewController(deps) {
  const {
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
  } = deps;

  function normalizeIsoDateKey(value) {
    if (!value) {
      return '';
    }

    if (value instanceof Date && !Number.isNaN(value.getTime())) {
      return value.toISOString().slice(0, 10);
    }

    const raw = String(value).trim();
    const match = raw.match(/\d{4}-\d{2}-\d{2}/);
    return match ? match[0] : raw;
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
        return [{ url: raw, label: 'Разписание 1' }];
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

    const candidateDates = new Set([
      ...crewCalendarState.plannedRows.map((row) => normalizeIsoDateKey(row?.date)).filter(Boolean),
      ...crewCalendarState.actualRows.map((row) => normalizeIsoDateKey(row?.date)).filter(Boolean),
      ...crewCalendarState.absenceRows.flatMap((row) => createDateRange(row?.start_date, row?.end_date)),
      ...Array.from(crewCalendarState.pendingConfirmationDates || []).map((date) => normalizeIsoDateKey(date)).filter(Boolean),
      ...Array.from((crewCalendarState.changeCountByDate || new Map()).keys()).map((date) => normalizeIsoDateKey(date)).filter(Boolean)
    ]);

    const selectedKey = normalizeIsoDateKey(crewCalendarState.selectedDate);
    const hasCandidateForSelected = selectedKey
      ? candidateDates.has(selectedKey)
      : false;

    const hasAnyCandidates = candidateDates.size > 0;

    if (
      selectedKey &&
      selectedKey.startsWith(monthPrefix) &&
      (!hasAnyCandidates || hasCandidateForSelected)
    ) {
      return;
    }

    const allDates = [...candidateDates].sort((left, right) => String(left).localeCompare(String(right), 'bg'));

    if (hasTodayInMonth && candidateDates.has(today)) {
      crewCalendarState.selectedDate = today;
      return;
    }

    if (allDates.length) {
      crewCalendarState.selectedDate = String(allDates[0]);
      return;
    }

    crewCalendarState.selectedDate = `${monthPrefix}-01`;
  }

  function buildCrewDayCounters() {
    const counters = new Map();

    crewCalendarState.plannedRows.forEach((row) => {
      const date = normalizeIsoDateKey(row?.date);
      if (!date) {
        return;
      }

      const existing = counters.get(date) || { planned: 0, actual: 0 };
      existing.planned += 1;
      counters.set(date, existing);
    });

    crewCalendarState.actualRows.forEach((row) => {
      const date = normalizeIsoDateKey(row?.date);
      if (!date) {
        return;
      }

      const existing = counters.get(date) || { planned: 0, actual: 0 };
      existing.actual += 1;
      counters.set(date, existing);
    });

    crewCalendarState.pendingConfirmationDates.forEach((dateRaw) => {
      const date = normalizeIsoDateKey(dateRaw);
      if (!date) {
        return;
      }

      const existing = counters.get(date) || { planned: 0, actual: 0, absences: [] };
      existing.pendingConfirmation = true;
      counters.set(date, existing);
    });

    crewCalendarState.changeCountByDate.forEach((count, dateRaw) => {
      const date = normalizeIsoDateKey(dateRaw);
      if (!date) {
        return;
      }

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
    const selectedDate = normalizeIsoDateKey(crewCalendarState.selectedDate);
    const plannedBody = container.querySelector('#index-crew-planned-body');
    const actualBody = container.querySelector('#index-crew-actual-body');
    const changesBody = container.querySelector('#index-crew-change-body');
    const absenceBody = container.querySelector('#index-crew-absence-body');

    if (!plannedBody || !actualBody || !changesBody || !absenceBody) {
      return;
    }

    setText(container, '#index-crew-selected-date-label', `Детайли за ${formatDate(selectedDate)}`);

    const plannedRows = crewCalendarState.plannedRows
      .filter((row) => normalizeIsoDateKey(row?.date) === selectedDate)
      .sort((left, right) => String(left?.duties?.start_time || '').localeCompare(String(right?.duties?.start_time || ''), 'bg'));

    if (!plannedRows.length) {
      plannedBody.innerHTML = '<p class="text-secondary mb-0">Няма планирани повески.</p>';
    } else {
      plannedBody.innerHTML = plannedRows
        .map((row) => {
          const dutyName = row?.duties?.name || '-';
          const role = formatRoleLabel(row?.assignment_role);
          const time = `${row?.duties?.start_time || '-'} - ${row?.duties?.end_time || '-'}${row?.duties?.second_day ? ' (+1)' : ''}`;
          const timing = getDutyTimingSummary(row?.duties);

          return `
            <article class="border-start border-4 border-primary rounded-3 ps-3 pe-2 py-2 bg-body-tertiary">
              <div class="fw-semibold">${escapeHtml(dutyName)}</div>
              <div class="small text-secondary mb-2">${escapeHtml(role)} · ${escapeHtml(time)}</div>
              <div class="row g-1 small">
                <div class="col-6"><span class="text-secondary">Начало:</span> ${escapeHtml(timing.startTime)}</div>
                <div class="col-6"><span class="text-secondary">Край:</span> ${escapeHtml(timing.endTime)}</div>
                <div class="col-6"><span class="text-secondary">Пауза от:</span> ${escapeHtml(timing.breakStartTime)}</div>
                <div class="col-6"><span class="text-secondary">Пауза до:</span> ${escapeHtml(timing.breakEndTime)}</div>
                <div class="col-6"><span class="text-secondary">Прекъсване:</span> ${escapeHtml(timing.breakDuration)}</div>
                <div class="col-6"><strong>${escapeHtml(timing.duration)}</strong> <span class="text-secondary">времетраене</span></div>
              </div>
            </article>
          `;
        })
        .join('');
    }

    const actualRows = crewCalendarState.actualRows
      .filter((row) => normalizeIsoDateKey(row?.date) === selectedDate)
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
          const dutyFileEntries = parseTimetableEntriesForCrew(row?.duties?.duty_files);

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

          const dutyFileRows = dutyFileEntries
            .map((entry) => {
              const encodedUrl = encodeURIComponent(entry.url);
              const encodedLabel = encodeURIComponent(entry.label || 'Файл');
              const previewLabel = entry.label || 'Файл';
              return `
                <span class="d-inline-flex align-items-center gap-1 me-2 small">
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
            .join('');

          return `
            <article class="border-start border-4 border-success rounded-3 ps-3 pe-2 py-2 bg-body-tertiary">
              <div class="d-flex align-items-start justify-content-between gap-2 mb-1">
                <div class="fw-semibold">${escapeHtml(dutyName)}</div>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary py-0 px-2 flex-shrink-0"
                  title="Редакция на часове"
                  aria-label="Редакция на часове"
                  data-index-crew-action="edit-actual-duty"
                  data-actual-duty-id="${escapeHtml(String(row?.id || ''))}"
                >
                  <i class="bi bi-pencil"></i>
                </button>
              </div>
              <div class="small text-secondary mb-2">${escapeHtml(role)} · Отчетена: ${escapeHtml(reported)}</div>
              <div class="row g-1 small mb-2">
                <div class="col-6"><span class="text-secondary">Начало:</span> ${escapeHtml(timing.startTime)}</div>
                <div class="col-6"><span class="text-secondary">Край:</span> ${escapeHtml(timing.endTime)}</div>
                <div class="col-6"><span class="text-secondary">Пауза от:</span> ${escapeHtml(timing.breakStartTime)}</div>
                <div class="col-6"><span class="text-secondary">Пауза до:</span> ${escapeHtml(timing.breakEndTime)}</div>
                <div class="col-6"><span class="text-secondary">Прекъсване:</span> ${escapeHtml(timing.breakDuration)}</div>
                <div class="col-6"><strong>${escapeHtml(timing.duration)}</strong> <span class="text-secondary">времетраене</span></div>
              </div>
              ${trainRows ? `<div class="small border-top pt-2 mt-1"><span class="fw-semibold">Разписания:</span> ${trainRows}</div>` : ''}
              ${dutyFileRows ? `<div class="small border-top pt-2 mt-1"><span class="fw-semibold">Файлове:</span> ${dutyFileRows}</div>` : ''}
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
          <article class="border-start border-4 border-info rounded-3 ps-3 pe-2 py-2 bg-body-tertiary">
            <div class="small fw-semibold">${escapeHtml(eventItem.summary || '-')}</div>
            <div class="small text-secondary"><i class="bi bi-clock me-1"></i>${escapeHtml(eventItem.changedAt || '-')}</div>
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
          <article class="border-start border-4 border-warning rounded-3 ps-3 pe-2 py-2 bg-body-tertiary">
            <div class="mb-1">
              <span class="badge ${escapeHtml(badgeClass)}">${escapeHtml(reasonName)}</span>
            </div>
            <div class="small text-secondary"><i class="bi bi-calendar-range me-1"></i>${escapeHtml(period)}</div>
          </article>
        `;
      })
      .join('');
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
      deviationHoursElement.className = 'fw-semibold badge fs-6 px-3 py-2 text-bg-success';
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
    deviationHoursElement.className = `fw-semibold badge fs-6 px-3 py-2 ${getDeviationClassByThreshold(deviationMinutes)}`;
  }

  return {
    openCrewActualDutyEditModal,
    closeCrewActualDutyEditModal,
    openCrewTimetablePreview,
    closeCrewTimetablePreview,
    ensureCrewSelectedDate,
    renderCrewCalendar,
    renderCrewSelectedDayDetails,
    renderCrewHoursSummary
  };
}
