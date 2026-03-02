import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml, parseTimetableEntries } from './helpers.js';
import { trainsForDutiesState } from './state.js';
import { bindPaginationButtons, paginateRows, syncPaginationUi } from '../../../utils/pagination.js';
import { initTooltips } from '../../../utils/tooltips.js';

const TRAIN_SELECT = 'id, number, origin_station, destination_station, departure_time, arrival_time, timetable_url';

export async function loadTrainsForDuty(container) {
  const dutyId = trainsForDutiesState.dutyId;

  // Get train IDs linked to this duty from junction table
  const { data: dutyTrainsData, error: dutyTrainsError } = await supabase
    .from('duty_trains')
    .select('train_id, sequence_order')
    .eq('duty_id', dutyId)
    .order('sequence_order', { ascending: true });

  if (dutyTrainsError) {
    trainsForDutiesState.trains = [];
    renderTrainsForDutyTable(container, 'Грешка при зареждане на влаковете.');
    showToast(dutyTrainsError.message, 'error');
    return;
  }

  if (!dutyTrainsData?.length) {
    trainsForDutiesState.trains = [];
    renderTrainsForDutyTable(container);
    return;
  }

  const trainIds = dutyTrainsData.map((row) => row.train_id).filter(Boolean);

  // Get trains data
  const { data: trainsData, error: trainsError } = await supabase
    .from('trains')
    .select(TRAIN_SELECT)
    .in('id', trainIds);

  if (trainsError) {
    trainsForDutiesState.trains = [];
    renderTrainsForDutyTable(container, 'Грешка при зареждане на влаковете.');
    showToast(trainsError.message, 'error');
    return;
  }

  // Sort by sequence_order
  const sequenceMap = new Map(dutyTrainsData.map((row) => [row.train_id, row.sequence_order]));
  const sortedTrains = (trainsData || []).sort(
    (a, b) => (sequenceMap.get(a.id) || 0) - (sequenceMap.get(b.id) || 0)
  );

  trainsForDutiesState.trains = sortedTrains;
  renderTrainsForDutyTable(container);
}

export function renderTrainsForDutyTable(container, explicitEmptyMessage) {
  const trainsBody = container.querySelector('#duty-trains-body');
  const emptyState = container.querySelector('#duty-trains-empty');

  bindPaginationButtons(container, {
    rootSelector: '#duty-trains-pagination',
    prevSelector: '#duty-trains-pagination-prev',
    nextSelector: '#duty-trains-pagination-next',
    onPrev: () => {
      trainsForDutiesState.page = Math.max(1, (trainsForDutiesState.page || 1) - 1);
      renderTrainsForDutyTable(container);
    },
    onNext: () => {
      trainsForDutiesState.page = (trainsForDutiesState.page || 1) + 1;
      renderTrainsForDutyTable(container);
    }
  });

  const rows = trainsForDutiesState.trains || [];

  const { pageItems, page, totalItems, totalPages } = paginateRows(
    rows,
    trainsForDutiesState.page,
    trainsForDutiesState.pageSize
  );
  trainsForDutiesState.page = page;

  syncPaginationUi(container, {
    rootSelector: '#duty-trains-pagination',
    prevSelector: '#duty-trains-pagination-prev',
    nextSelector: '#duty-trains-pagination-next',
    labelSelector: '#duty-trains-pagination-label',
    page,
    totalItems,
    totalPages
  });

  if (!rows.length) {
    trainsBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма опасени влакове.';
    return;
  }

  const reorderEnabled = trainsForDutiesState.reorderEnabled !== false;

  emptyState.classList.add('d-none');
  trainsBody.innerHTML = pageItems
    .map((item, index) => {
      const timetableEntries = parseTimetableEntries(item.timetable_url);
      const timetableHtml = timetableEntries.length
        ? `<div class="d-flex flex-column gap-0">${timetableEntries
          .map((entry, i) => {
            const label = entry.label || `Файл ${i + 1}`;
            return `
              <div class="d-flex align-items-center gap-2 flex-wrap">
                <a class="text-decoration-none" href="${escapeHtml(entry.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>
              </div>
            `;
          })
          .join('')}</div>`
        : '<span class="text-secondary">-</span>';

      return `
        <tr data-train-id="${item.id}" draggable="${reorderEnabled ? 'true' : 'false'}">
          <td class="text-center text-secondary" data-label="" style="cursor: grab;">${reorderEnabled ? '<i class="bi bi-grip-vertical"></i>' : ''}</td>
          <td data-label="Номер">${escapeHtml(item.number ?? '-')}</td>
          <td data-label="Начална гара">${escapeHtml(item.origin_station ?? '-')}</td>
          <td data-label="Крайна гара">${escapeHtml(item.destination_station ?? '-')}</td>
          <td data-label="Отпътуване">${escapeHtml((item.departure_time || '').slice(0, 5) || '-')}</td>
          <td data-label="Пристигане">${escapeHtml((item.arrival_time || '').slice(0, 5) || '-')}</td>
          <td data-label="Разписание">${timetableHtml}</td>
          <td class="text-end" data-label="">
            <div class="d-inline-flex gap-2">
              <button type="button" class="btn btn-sm btn-outline-primary" data-action="edit" data-id="${item.id}" data-number="${escapeHtml(item.number ?? '')}" data-origin="${escapeHtml(item.origin_station ?? '')}" data-destination="${escapeHtml(item.destination_station ?? '')}" data-departure="${escapeHtml((item.departure_time || '').slice(0, 5))}" data-arrival="${escapeHtml((item.arrival_time || '').slice(0, 5))}" data-timetable-url="${escapeHtml(encodeURIComponent(JSON.stringify(parseTimetableEntries(item.timetable_url))))}" data-bs-toggle="tooltip" data-bs-title="Редакция" aria-label="Редакция"><i class="bi bi-pencil"></i></button>
              <button type="button" class="btn btn-sm btn-outline-danger" data-action="delete" data-train-id="${item.id}" data-train-number="${escapeHtml(item.number ?? '')}" data-bs-toggle="tooltip" data-bs-title="Изтрий" aria-label="Изтрий"><i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
  initTooltips(trainsBody);
}

export async function persistTrainsForDutyOrder() {
  const dutyId = trainsForDutiesState.dutyId;
  const updates = trainsForDutiesState.trains.map((item, index) =>
    supabase
      .from('duty_trains')
      .update({ sequence_order: index + 1 })
      .eq('duty_id', dutyId)
      .eq('train_id', item.id)
  );

  const results = await Promise.all(updates);
  const failed = results.find((result) => result.error);

  if (failed?.error) {
    showToast(failed.error.message, 'error');
    return false;
  }

  trainsForDutiesState.trains = trainsForDutiesState.trains.map((item, index) => ({
    ...item,
    sequence_order: index + 1
  }));

  return true;
}

export async function loadAttachTrainsCatalog(container) {
  const dutyId = trainsForDutiesState.dutyId;

  // Get all trains
  const { data: allTrains, error: allTrainsError } = await supabase
    .from('trains')
    .select('id, number, origin_station, destination_station, departure_time, arrival_time, timetable_url')
    .order('number', { ascending: true });

  if (allTrainsError) {
    showToast(allTrainsError.message, 'error');
    trainsForDutiesState.attachCatalog = [];
    return;
  }

  // Get trains already linked to this duty
  const { data: linkedTrains, error: linkedTrainsError } = await supabase
    .from('duty_trains')
    .select('train_id')
    .eq('duty_id', dutyId);

  if (linkedTrainsError) {
    showToast(linkedTrainsError.message, 'error');
    trainsForDutiesState.attachCatalog = [];
    return;
  }

  const linkedTrainIds = new Set((linkedTrains || []).map((row) => row.train_id).filter(Boolean));

  // Filter out already linked trains
  trainsForDutiesState.attachCatalog = (allTrains || []).filter((train) => !linkedTrainIds.has(train.id));
}

export function renderAttachTrainsList(container) {
  const listRoot = container.querySelector('#train-for-duty-attach-list');
  const emptyState = container.querySelector('#train-for-duty-attach-empty');
  const searchInput = container.querySelector('#train-for-duty-attach-search');
  const searchQuery = (searchInput?.value || '').trim().toLowerCase();

  const filtered = trainsForDutiesState.attachCatalog.filter((item) => {
    const searchable = `${item.number || ''} ${item.origin_station || ''} ${item.destination_station || ''}`.toLowerCase();
    return !searchQuery || searchable.includes(searchQuery);
  });

  if (!filtered.length) {
    listRoot.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = trainsForDutiesState.attachCatalog.length === 0
      ? 'Всички влакове са вече опасени.'
      : 'Няма совпадащи влакове.';
    return;
  }

  emptyState.classList.add('d-none');
  listRoot.innerHTML = filtered
    .map((item) => {
      const departure = (item.departure_time || '').slice(0, 5) || '--:--';
      const arrival = (item.arrival_time || '').slice(0, 5) || '--:--';

      return `
        <div class="list-group-item d-flex justify-content-between align-items-start gap-3 flex-wrap">
          <div class="flex-grow-1">
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <strong>${escapeHtml(item.number ?? '-')}</strong>
            </div>
            <div class="text-secondary small">${escapeHtml(item.origin_station ?? '-')} → ${escapeHtml(item.destination_station ?? '-')}</div>
            <div class="text-secondary small">${escapeHtml(departure)} - ${escapeHtml(arrival)}</div>
          </div>
          <div>
            <button type="button" class="btn btn-sm btn-primary" data-attach-train-id="${item.id}" data-attach-train-number="${escapeHtml(item.number ?? '')}"><i class="bi bi-link-45deg me-1"></i>Прикачи</button>
          </div>
        </div>
      `;
    })
    .join('');
}
