import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml } from './helpers.js';
import { trainsState } from './state.js';
import { bindPaginationButtons, paginateRows, syncPaginationUi } from '../../../utils/pagination.js';

export async function loadTrains(container) {
  const { data, error } = await supabase
    .from('trains')
    .select('id, number, origin_station, destination_station, departure_time, arrival_time, timetable_url')
    .order('number', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    trainsState.rows = [];
    renderTrainsTable(container, 'Грешка при зареждане на влаковете.');
    return;
  }

  trainsState.rows = data || [];
  renderTrainsTable(container);
}

export function renderTrainsTable(container, explicitEmptyMessage) {
  const tableBody = container.querySelector('#trains-table-body');
  const emptyState = container.querySelector('#trains-empty');
  syncTrainFilterOptions(container);

  bindPaginationButtons(container, {
    rootSelector: '#trains-pagination',
    prevSelector: '#trains-pagination-prev',
    nextSelector: '#trains-pagination-next',
    onPrev: () => {
      trainsState.page = Math.max(1, (trainsState.page || 1) - 1);
      renderTrainsTable(container);
    },
    onNext: () => {
      trainsState.page = (trainsState.page || 1) + 1;
      renderTrainsTable(container);
    }
  });

  const filteredRows = trainsState.rows.filter((item) => {
    const searchable = `${item.number || ''} ${item.origin_station || ''} ${item.destination_station || ''}`.toLowerCase();
    const origin = String(item.origin_station || '').trim().toLowerCase();
    const destination = String(item.destination_station || '').trim().toLowerCase();

    const matchesSearch = !trainsState.searchQuery || searchable.includes(trainsState.searchQuery);
    const matchesOrigin = !trainsState.originFilter || origin === trainsState.originFilter;
    const matchesDestination = !trainsState.destinationFilter || destination === trainsState.destinationFilter;

    return matchesSearch && matchesOrigin && matchesDestination;
  });

  const { pageItems, page, totalItems, totalPages } = paginateRows(
    filteredRows,
    trainsState.page,
    trainsState.pageSize
  );
  trainsState.page = page;

  syncPaginationUi(container, {
    rootSelector: '#trains-pagination',
    prevSelector: '#trains-pagination-prev',
    nextSelector: '#trains-pagination-next',
    labelSelector: '#trains-pagination-label',
    page,
    totalItems,
    totalPages
  });

  if (!filteredRows.length) {
    tableBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма въведени влакове.';
    return;
  }

  emptyState.classList.add('d-none');
  tableBody.innerHTML = pageItems
    .map((item) => {
      const timetableEntries = parseTimetableEntries(item.timetable_url);
      const timetableHtml = timetableEntries.length
        ? `<div class="d-flex flex-column gap-0">${timetableEntries
          .map((entry, index) => {
            const label = entry.label || `Файл ${index + 1}`;
            const encodedUrl = encodeURIComponent(entry.url);
            const encodedLabel = encodeURIComponent(label);
            return `
              <div class="d-flex align-items-center gap-2 flex-wrap">
                <a class="text-decoration-none" href="${escapeHtml(entry.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>
                <button
                  type="button"
                  class="btn btn-link btn-sm p-0 lh-1 text-decoration-none"
                  data-action="preview-timetable"
                  data-preview-url="${escapeHtml(encodedUrl)}"
                  data-preview-label="${escapeHtml(encodedLabel)}"
                  title="Преглед"
                  aria-label="Преглед"
                >
                  👁
                </button>
              </div>
            `;
          })
          .join('')}</div>`
        : '<span class="text-secondary">-</span>';

      return `
        <tr>
          <td>${escapeHtml(item.number ?? '-')}</td>
          <td>${escapeHtml(item.origin_station ?? '-')}</td>
          <td>${escapeHtml(item.destination_station ?? '-')}</td>
          <td>${escapeHtml((item.departure_time || '').slice(0, 5) || '-')}</td>
          <td>${escapeHtml((item.arrival_time || '').slice(0, 5) || '-')}</td>
          <td>${timetableHtml}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${item.id}"
                data-number="${escapeHtml(item.number ?? '')}"
                data-origin-station="${escapeHtml(item.origin_station ?? '')}"
                data-destination-station="${escapeHtml(item.destination_station ?? '')}"
                data-departure-time="${escapeHtml(item.departure_time ?? '')}"
                data-arrival-time="${escapeHtml(item.arrival_time ?? '')}"
                data-timetable-url="${escapeHtml(encodeURIComponent(item.timetable_url ?? ''))}"
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
      `;
    })
    .join('');
}

function parseTimetableEntries(value) {
  if (Array.isArray(value)) {
    return value
      .map((item, index) => normalizeTimetableEntry(item, index))
      .filter((entry) => entry.url);
  }

  const raw = String(value || '').trim();
  if (!raw) {
    return [];
  }

  if (raw.startsWith('[')) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed
          .map((item, index) => normalizeTimetableEntry(item, index))
          .filter((entry) => entry.url);
      }
    } catch {
      return [{ url: raw, label: deriveTimetableLabel(raw, 0) }];
    }
  }

  return raw
    .split('\n')
    .map((item, index) => normalizeTimetableEntry(item, index))
    .filter((entry) => entry.url);
}

function syncTrainFilterOptions(container) {
  const originFilter = container.querySelector('#trains-origin-filter');
  const destinationFilter = container.querySelector('#trains-destination-filter');

  if (!originFilter || !destinationFilter) {
    return;
  }

  const selectedOrigin = trainsState.originFilter || '';
  const selectedDestination = trainsState.destinationFilter || '';

  const origins = [...new Set(
    trainsState.rows
      .map((item) => String(item?.origin_station || '').trim())
      .filter(Boolean)
  )].sort((left, right) => left.localeCompare(right, 'bg'));

  const destinations = [...new Set(
    trainsState.rows
      .map((item) => String(item?.destination_station || '').trim())
      .filter(Boolean)
  )].sort((left, right) => left.localeCompare(right, 'bg'));

  originFilter.innerHTML = `
    <option value="">Всички</option>
    ${origins.map((value) => `<option value="${escapeHtml(value.toLowerCase())}">${escapeHtml(value)}</option>`).join('')}
  `;

  destinationFilter.innerHTML = `
    <option value="">Всички</option>
    ${destinations.map((value) => `<option value="${escapeHtml(value.toLowerCase())}">${escapeHtml(value)}</option>`).join('')}
  `;

  originFilter.value = selectedOrigin;
  destinationFilter.value = selectedDestination;
}

function normalizeTimetableEntry(item, index) {
  if (item && typeof item === 'object' && !Array.isArray(item)) {
    const url = String(item.url || '').trim();
    const label = String(item.label || '').trim() || deriveTimetableLabel(url, index);
    return { url, label };
  }

  const url = String(item || '').trim();
  return {
    url,
    label: deriveTimetableLabel(url, index)
  };
}

function deriveTimetableLabel(url, index) {
  const raw = String(url || '').trim();
  if (!raw) {
    return `Файл ${index + 1}`;
  }

  try {
    const parsedUrl = new URL(raw);
    const pathPart = parsedUrl.pathname.split('/').pop() || '';
    const decoded = decodeURIComponent(pathPart);
    if (decoded) {
      return decoded;
    }
  } catch {
    // ignore parsing errors
  }

  return `Файл ${index + 1}`;
}
