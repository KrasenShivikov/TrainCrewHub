const toastContainerId = 'app-toast-container';

function getToastContainer() {
  let container = document.getElementById(toastContainerId);

  if (!container) {
    container = document.createElement('div');
    container.id = toastContainerId;
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '1080';
    document.body.appendChild(container);
  }

  return container;
}

function getToastClass(type) {
  if (type === 'success') return 'text-bg-success';
  if (type === 'error') return 'text-bg-danger';
  if (type === 'warning') return 'text-bg-warning';
  return 'text-bg-primary';
}

function toFriendlyErrorMessage(message) {
  const raw = String(message || '').trim();
  const normalized = raw.toLowerCase();

  if (!raw) {
    return 'Възникна неочаквана грешка.';
  }

  if (
    normalized.includes('row-level security') ||
    normalized.includes('violates row-level security policy')
  ) {
    return 'Нямаш нужните права за това действие.';
  }

  if (
    normalized.includes('foreign key constraint') ||
    normalized.includes('violates foreign key constraint')
  ) {
    return 'Операцията не може да се изпълни, защото записът е свързан с други данни.';
  }

  if (
    normalized.includes('duplicate key value') ||
    normalized.includes('unique constraint') ||
    normalized.includes('already exists')
  ) {
    return 'Запис с тези данни вече съществува.';
  }

  if (normalized.includes('violates not-null constraint')) {
    return 'Липсва задължително поле. Провери въведените данни.';
  }

  if (
    normalized.includes('invalid input syntax') ||
    normalized.includes('invalid uuid') ||
    normalized.includes('date/time field value out of range')
  ) {
    return 'Невалиден формат на въведени данни.';
  }

  if (
    normalized.includes('permission denied') ||
    normalized.includes('not authorized') ||
    normalized.includes('unauthorized')
  ) {
    return 'Нямаш достъп за това действие.';
  }

  if (
    normalized.includes('jwt') ||
    normalized.includes('token') ||
    normalized.includes('session')
  ) {
    return 'Сесията е изтекла. Влез отново в системата.';
  }

  if (
    normalized.includes('failed to fetch') ||
    normalized.includes('networkerror') ||
    normalized.includes('network request failed')
  ) {
    return 'Проблем с връзката. Провери интернет и опитай отново.';
  }

  return raw;
}

export function showToast(message, type = 'info') {
  const container = getToastContainer();
  const toast = document.createElement('div');
  const displayMessage = type === 'error' ? toFriendlyErrorMessage(message) : String(message ?? '');

  toast.className = `toast align-items-center border-0 ${getToastClass(type)} show`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${displayMessage}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button>
    </div>
  `;

  const closeButton = toast.querySelector('button');
  closeButton?.addEventListener('click', () => {
    toast.remove();
  });

  container.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 4000);
}
