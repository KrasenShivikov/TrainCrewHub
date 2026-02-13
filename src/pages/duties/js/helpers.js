export function openModal(modalElement) {
  modalElement.classList.remove('d-none');
  document.body.classList.add('overflow-hidden');
}

export function closeModal(modalElement) {
  modalElement.classList.add('d-none');
  if (
    document.querySelector('#duty-modal')?.classList.contains('d-none') &&
    document.querySelector('#duty-delete-modal')?.classList.contains('d-none')
  ) {
    document.body.classList.remove('overflow-hidden');
  }
}

export function formatDuration(durationValue) {
  if (!durationValue) {
    return '-';
  }

  if (typeof durationValue === 'string') {
    return durationValue.replace('.000000', '');
  }

  return String(durationValue);
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
