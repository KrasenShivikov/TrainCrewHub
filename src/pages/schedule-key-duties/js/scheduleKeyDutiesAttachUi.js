import { escapeHtml } from './helpers.js';
import { scheduleKeyDutiesState } from './state.js';

export function renderAttachDutyList(container) {
  const list = container.querySelector('#schedule-key-duty-attach-list');
  const emptyState = container.querySelector('#schedule-key-duty-attach-empty');
  const searchInput = container.querySelector('#schedule-key-duty-attach-search');
  const typeSelect = container.querySelector('#schedule-key-duty-attach-type');

  if (!list || !emptyState) {
    return;
  }

  const searchTerm = (searchInput?.value || '').trim().toLowerCase();
  const selectedTypeId = typeSelect?.value || '';
  const catalog = Array.isArray(scheduleKeyDutiesState.attachCatalog)
    ? scheduleKeyDutiesState.attachCatalog
    : [];

  const filtered = catalog.filter((item) => {
    if (selectedTypeId && item?.duty_type_id !== selectedTypeId) {
      return false;
    }

    if (!searchTerm) {
      return true;
    }

    return String(item?.name || '').toLowerCase().includes(searchTerm);
  });

  if (!catalog.length) {
    list.innerHTML = '';
    emptyState.textContent = 'Няма свободни повески за прикачване.';
    emptyState.classList.remove('d-none');
    return;
  }

  if (!filtered.length) {
    list.innerHTML = '';
    emptyState.textContent = 'Няма резултати по зададените филтри.';
    emptyState.classList.remove('d-none');
    return;
  }

  emptyState.classList.add('d-none');
  list.innerHTML = filtered
    .map((item) => {
      const start = (item.start_time || '').slice(0, 5) || '--:--';
      const end = (item.end_time || '').slice(0, 5) || '--:--';
      const typeName = item?.duty_types?.name || '';

      return `
        <div class="list-group-item d-flex justify-content-between align-items-start gap-3 flex-wrap">
          <div class="flex-grow-1">
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <strong>${escapeHtml(item.name || '-')}</strong>
              ${typeName ? `<span class="badge text-bg-light">${escapeHtml(typeName)}</span>` : ''}
            </div>
            <div class="text-secondary small">${escapeHtml(start)} - ${escapeHtml(end)}</div>
          </div>
          <div>
            <button type="button" class="btn btn-sm btn-primary" data-attach-duty-id="${item.id}"><i class="bi bi-link-45deg me-1"></i>Прикачи</button>
          </div>
        </div>
      `;
    })
    .join('');
}
