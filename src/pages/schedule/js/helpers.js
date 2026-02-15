const escapeHandlers = new Map();

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

export function resolveActualDutyRole(row) {
  const explicitRole = String(row?.assignment_role || '').trim().toLowerCase();
  if (explicitRole === 'chief' || explicitRole === 'conductor') {
    return explicitRole;
  }

  const positionTitle = getPositionTitle(row?.employees).toLowerCase();
  if (positionTitle.includes('началник') && positionTitle.includes('влак')) {
    return 'chief';
  }

  return 'conductor';
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

export function getDutyFromRow(row) {
  const duty = row?.duties;
  if (Array.isArray(duty)) {
    return duty[0] || null;
  }

  if (duty && typeof duty === 'object') {
    return duty;
  }

  return null;
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

export function openModal(modalElement) {
  modalElement?.classList.remove('d-none');
  document.body.classList.add('overflow-hidden');
}

export function closeModal(modalElement) {
  modalElement?.classList.add('d-none');

  const hasOpenModal = Boolean(document.querySelector('#schedule-actual-edit-modal:not(.d-none)'));
  if (!hasOpenModal) {
    document.body.classList.remove('overflow-hidden');
  }
}

export function setupModalEscapeHandler(handlerKey, modalsInPriority) {
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
