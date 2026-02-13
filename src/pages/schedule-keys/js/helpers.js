export function openModal(modalElement) {
  modalElement.classList.remove('d-none');
  document.body.classList.add('overflow-hidden');
}

export function closeModal(modalElement) {
  modalElement.classList.add('d-none');
  if (
    document.querySelector('#schedule-key-modal')?.classList.contains('d-none') &&
    document.querySelector('#schedule-key-delete-modal')?.classList.contains('d-none')
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
