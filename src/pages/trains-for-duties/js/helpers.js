export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function getDutyIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('dutyId') || '';
}

export function getDutyNameFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('dutyName') || '';
}

export function openModal(modalElement) {
  modalElement?.classList.remove('d-none');
  document.body.classList.add('overflow-hidden');
}

export function closeModal(modalElement) {
  modalElement?.classList.add('d-none');
  if (!document.querySelector('.d-none.position-fixed[style*="z-index"]') === false) {
    document.body.classList.remove('overflow-hidden');
  }
}

const escapeHandlers = new Map();

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
      if (!modal?.classList.contains('d-none')) {
        event.preventDefault();
        closeModal(modal);
        return;
      }
    }
  };

  escapeHandlers.set(handlerKey, handler);
  document.addEventListener('keydown', handler);
}

export function toTimeInputValue(value) {
  if (!value) return '';
  if (typeof value === 'string' && value.includes(':')) {
    const parts = value.split(':');
    return `${String(parts[0]).padStart(2, '0')}:${String(parts[1]).padStart(2, '0')}`;
  }
  return '';
}

export function parseTimetableEntries(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }
  if (typeof value === 'string' && value.trim()) {
    try {
      return JSON.parse(value).filter(Boolean);
    } catch {
      return [];
    }
  }
  return [];
}
