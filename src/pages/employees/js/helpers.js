export function openModal(modalElement) {
  modalElement.classList.remove('d-none');
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
  modalElement.classList.add('d-none');
  if (
    document.querySelector('#employee-modal')?.classList.contains('d-none') &&
    document.querySelector('#employee-delete-modal')?.classList.contains('d-none') &&
    document.querySelector('#employee-profile-modal')?.classList.contains('d-none')
  ) {
    document.body.classList.remove('overflow-hidden');
  }
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
