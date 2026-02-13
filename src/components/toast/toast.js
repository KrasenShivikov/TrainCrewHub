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

export function showToast(message, type = 'info') {
  const container = getToastContainer();
  const toast = document.createElement('div');

  toast.className = `toast align-items-center border-0 ${getToastClass(type)} show`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
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
