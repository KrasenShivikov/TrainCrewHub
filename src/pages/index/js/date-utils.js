export function toMonthKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

export function toIsoDateFromDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseMonthKey(monthKey) {
  const [yearRaw, monthRaw] = String(monthKey || '').split('-');
  const year = Number(yearRaw);
  const month = Number(monthRaw);

  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

  return new Date(year, month - 1, 1);
}

export function shiftMonthKey(monthKey, delta) {
  const monthDate = parseMonthKey(monthKey);
  monthDate.setMonth(monthDate.getMonth() + delta);
  return toMonthKey(monthDate);
}

export function formatMonthLabel(monthKey) {
  const monthDate = parseMonthKey(monthKey);
  return new Intl.DateTimeFormat('bg-BG', { month: 'long', year: 'numeric' }).format(monthDate);
}

export function getMonthBounds(monthKey) {
  const monthStart = parseMonthKey(monthKey);
  const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
  return {
    startDate: toIsoDateFromDate(monthStart),
    endDate: toIsoDateFromDate(monthEnd)
  };
}

export function parseIsoDateSafe(dateValue) {
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

export function countBulgarianWorkdays(startDate, endDate) {
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
