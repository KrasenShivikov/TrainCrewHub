import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml, formatDuration } from './helpers.js';
import { dutiesState, PAGE_SIZE } from './state.js';

export async function loadDuties(container) {
  const { data, error } = await supabase
    .from('duties')
    .select('id, name, schedule_key_id, start_time, end_time, break_start_time, break_end_time, break_duration_interval, duration_interval, display_order, schedule_keys(name)')
    .order('display_order', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    dutiesState.allDuties = [];
    renderDutiesTable(container, 'Грешка при зареждане на повеските.');
    return;
  }

  dutiesState.allDuties = data || [];
  renderDutiesTable(container);
}

export async function persistDutiesOrder() {
  const updates = dutiesState.allDuties.map((item, index) =>
    supabase
      .from('duties')
      .update({ display_order: index + 1 })
      .eq('id', item.id)
  );

  const results = await Promise.all(updates);
  const failed = results.find((result) => result.error);

  if (failed?.error) {
    showToast(failed.error.message, 'error');
    return false;
  }

  dutiesState.allDuties = dutiesState.allDuties.map((item, index) => ({
    ...item,
    display_order: index + 1
  }));
  return true;
}

export function renderDutiesTable(container, explicitEmptyMessage) {
  const tableBody = container.querySelector('#duties-table-body');
  const emptyState = container.querySelector('#duties-empty');
  const pagination = container.querySelector('#duties-pagination');
  const pageInfo = container.querySelector('#duties-page-info');
  const prevPageButton = container.querySelector('#duties-prev-page');
  const nextPageButton = container.querySelector('#duties-next-page');

  const filteredDuties = dutiesState.allDuties.filter((item) => {
    if (!dutiesState.searchQuery) {
      return true;
    }

    const name = (item.name || '').toLowerCase();
    const scheduleKeyName = (item.schedule_keys?.name || '').toLowerCase();
    return name.includes(dutiesState.searchQuery) || scheduleKeyName.includes(dutiesState.searchQuery);
  });

  if (!filteredDuties.length) {
    tableBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма въведени повески.';
    pagination.classList.add('d-none');
    return;
  }

  emptyState.classList.add('d-none');

  const totalPages = Math.max(1, Math.ceil(filteredDuties.length / PAGE_SIZE));
  if (dutiesState.currentPage > totalPages) {
    dutiesState.currentPage = totalPages;
  }
  if (dutiesState.currentPage < 1) {
    dutiesState.currentPage = 1;
  }

  const startIndex = (dutiesState.currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const pagedDuties = filteredDuties.slice(startIndex, endIndex);

  tableBody.innerHTML = pagedDuties
    .map(
      (item) => `
        <tr data-duty-id="${item.id}" draggable="true">
          <td class="text-secondary">↕</td>
          <td>${escapeHtml(item.name ?? '-')}</td>
          <td>${escapeHtml(item.schedule_keys?.name ?? '-')}</td>
          <td>${escapeHtml(item.start_time ?? '-')}</td>
          <td>${escapeHtml(item.end_time ?? '-')}</td>
          <td>${escapeHtml(formatDuration(item.break_duration_interval))}</td>
          <td>${escapeHtml(formatDuration(item.duration_interval))}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${item.id}"
                data-name="${escapeHtml(item.name ?? '')}"
                data-schedule-key-id="${item.schedule_key_id ?? ''}"
                data-start-time="${escapeHtml(item.start_time ?? '')}"
                data-end-time="${escapeHtml(item.end_time ?? '')}"
                data-break-start-time="${escapeHtml(item.break_start_time ?? '00:00:00')}"
                data-break-end-time="${escapeHtml(item.break_end_time ?? '00:00:00')}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${item.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `
    )
    .join('');

  if (filteredDuties.length <= PAGE_SIZE) {
    pagination.classList.add('d-none');
    return;
  }

  pagination.classList.remove('d-none');
  pageInfo.textContent = `Страница ${dutiesState.currentPage} от ${totalPages}`;
  prevPageButton.disabled = dutiesState.currentPage <= 1;
  nextPageButton.disabled = dutiesState.currentPage >= totalPages;
}
