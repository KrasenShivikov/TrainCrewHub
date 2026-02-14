export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function formatInterval(value) {
  if (!value) {
    return '-';
  }

  if (typeof value === 'string') {
    return value.replace('.000000', '');
  }

  return String(value);
}

export function getScheduleKeyIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('scheduleKeyId') || '';
}

export function getScheduleKeyNameFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('scheduleKeyName') || '';
}

export function openModal(modalElement) {
  modalElement?.classList.remove('d-none');
  document.body.classList.add('overflow-hidden');
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
      if (modal && !modal.classList.contains('d-none')) {
        closeModal(modal);
        return;
      }
    }
  };

  escapeHandlers.set(handlerKey, handler);
  document.addEventListener('keydown', handler);
}

export function closeModal(modalElement) {
  modalElement?.classList.add('d-none');

  const createModalHidden = document
    .querySelector('#schedule-key-duty-create-modal')
    ?.classList.contains('d-none');
  const editModalHidden = document
    .querySelector('#schedule-key-duty-edit-modal')
    ?.classList.contains('d-none');
  const deleteModalHidden = document
    .querySelector('#schedule-key-duty-delete-modal')
    ?.classList.contains('d-none');

  if (createModalHidden && editModalHidden && deleteModalHidden) {
    document.body.classList.remove('overflow-hidden');
  }
}