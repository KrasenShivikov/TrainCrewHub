export function timeInputToInterval(value) {
  if (!value) {
    return '00:00:00';
  }

  return `${value}:00`;
}

export function intervalToTimeInput(value) {
  if (!value) {
    return '00:00';
  }

  const match = String(value).match(/(\d{1,2}):(\d{2})(?::\d{2})?/);
  if (!match) {
    return '00:00';
  }

  const [, hours, minutes] = match;
  return `${hours.padStart(2, '0')}:${minutes}`;
}

export function timeInputToMinutes(value) {
  if (!value) {
    return 0;
  }

  const [hoursPart, minutesPart] = value.split(':');
  const hours = Number(hoursPart);
  const minutes = Number(minutesPart);

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return 0;
  }

  return hours * 60 + minutes;
}

export function calculateShiftDurationMinutes(startTime, endTime) {
  const startMinutes = timeInputToMinutes(startTime);
  const endMinutes = timeInputToMinutes(endTime);

  if (endMinutes >= startMinutes) {
    return endMinutes - startMinutes;
  }

  return 24 * 60 - startMinutes + endMinutes;
}
