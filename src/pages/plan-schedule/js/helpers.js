export function normalizeAssignmentRole(value) {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'chief' || normalized === 'conductor') {
    return normalized;
  }

  return '';
}

export function getEmployeeName(employee) {
  const firstName = employee?.first_name ?? '';
  const lastName = employee?.last_name ?? '';
  return `${firstName} ${lastName}`.trim();
}

export function getPositionTitle(employee) {
  const positions = employee?.positions;
  if (Array.isArray(positions)) {
    return positions[0]?.title ?? '';
  }

  if (positions && typeof positions === 'object') {
    return positions.title ?? '';
  }

  return '';
}

export function getDutyTypeName(duty) {
  const type = duty?.duty_types;
  if (Array.isArray(type)) {
    return type[0]?.name ?? '';
  }

  if (type && typeof type === 'object') {
    return type.name ?? '';
  }

  return '';
}

export function getAbsenceReasonName(reason) {
  const value = Array.isArray(reason)
    ? reason[0]?.name
    : (reason && typeof reason === 'object' ? reason.name : '');

  return String(value || '').trim();
}

export function getDutyFromPlannedRow(row) {
  const duty = row?.duties;
  if (Array.isArray(duty)) {
    return duty[0] || null;
  }

  if (duty && typeof duty === 'object') {
    return duty;
  }

  return null;
}

export function normalizeTimeValue(value) {
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

export function getDateFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const date = params.get('date') || '';

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return '';
  }

  return date;
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
