import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml, formatInterval } from './helpers.js';
import { scheduleKeyDutiesState } from './state.js';
import { bindPaginationButtons, paginateRows, syncPaginationUi } from '../../../utils/pagination.js';

const DUTY_SELECT = 'id, name, notes, duty_type_id, schedule_key_id, start_time, end_time, second_day, break_start_time, break_end_time, break_duration_interval, duration_interval, display_order, duty_types(name), schedule_key_duties(schedule_key_id, schedule_keys(name)), duty_trains(train_id, sequence_order, trains(number))';

export async function loadDutiesForScheduleKey(container) {
  const scheduleKeyId = scheduleKeyDutiesState.scheduleKeyId;

  const { data, error } = await supabase
    .from('duties')
    .select(DUTY_SELECT)
    .eq('schedule_key_id', scheduleKeyId)
    .order('display_order', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    scheduleKeyDutiesState.duties = [];
    renderScheduleKeyDutiesTable(container, 'Грешка при зареждане на повеските.');
    showToast(error.message, 'error');
    return;
  }

  const { data: mappedRows, error: mappedRowsError } = await supabase
    .from('schedule_key_duties')
    .select('duty_id')
    .eq('schedule_key_id', scheduleKeyId);

  if (mappedRowsError) {
    scheduleKeyDutiesState.duties = [];
    renderScheduleKeyDutiesTable(container, 'Грешка при зареждане на повеските.');
    showToast(mappedRowsError.message, 'error');
    return;
  }

  const directDuties = data || [];
  const directDutyIds = new Set(directDuties.map((item) => item?.id).filter(Boolean));
  const mappedDutyIds = [...new Set((mappedRows || []).map((row) => row?.duty_id).filter(Boolean))]
    .filter((dutyId) => !directDutyIds.has(dutyId));

  let mappedDuties = [];
  if (mappedDutyIds.length) {
    const { data: mappedDutiesData, error: mappedDutiesError } = await supabase
      .from('duties')
      .select(DUTY_SELECT)
      .in('id', mappedDutyIds);

    if (mappedDutiesError) {
      scheduleKeyDutiesState.duties = [];
      renderScheduleKeyDutiesTable(container, 'Грешка при зареждане на повеските.');
      showToast(mappedDutiesError.message, 'error');
      return;
    }

    mappedDuties = mappedDutiesData || [];
  }

  scheduleKeyDutiesState.duties = [...directDuties, ...mappedDuties].sort((left, right) => {
    const leftOrder = Number.isFinite(Number(left?.display_order)) ? Number(left.display_order) : Number.MAX_SAFE_INTEGER;
    const rightOrder = Number.isFinite(Number(right?.display_order)) ? Number(right.display_order) : Number.MAX_SAFE_INTEGER;
    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return String(left?.name || '').localeCompare(String(right?.name || ''), 'bg');
  });

  renderScheduleKeyDutiesTable(container);
}

export function renderScheduleKeyDutiesTable(container, explicitEmptyMessage) {
  const dutiesBody = container.querySelector('#schedule-key-duties-body');
  const emptyState = container.querySelector('#schedule-key-duties-empty');

  bindPaginationButtons(container, {
    rootSelector: '#schedule-key-duties-pagination',
    prevSelector: '#schedule-key-duties-pagination-prev',
    nextSelector: '#schedule-key-duties-pagination-next',
    onPrev: () => {
      scheduleKeyDutiesState.page = Math.max(1, (scheduleKeyDutiesState.page || 1) - 1);
      renderScheduleKeyDutiesTable(container);
    },
    onNext: () => {
      scheduleKeyDutiesState.page = (scheduleKeyDutiesState.page || 1) + 1;
      renderScheduleKeyDutiesTable(container);
    }
  });

  const rows = scheduleKeyDutiesState.duties || [];

  const { pageItems, page, totalItems, totalPages } = paginateRows(
    rows,
    scheduleKeyDutiesState.page,
    scheduleKeyDutiesState.pageSize
  );
  scheduleKeyDutiesState.page = page;

  syncPaginationUi(container, {
    rootSelector: '#schedule-key-duties-pagination',
    prevSelector: '#schedule-key-duties-pagination-prev',
    nextSelector: '#schedule-key-duties-pagination-next',
    labelSelector: '#schedule-key-duties-pagination-label',
    page,
    totalItems,
    totalPages
  });

  if (!rows.length) {
    dutiesBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма повески към този Ключ-График.';
    return;
  }

  const reorderEnabled = scheduleKeyDutiesState.reorderEnabled !== false;

  emptyState.classList.add('d-none');
  dutiesBody.innerHTML = pageItems
    .map(
      (item) => {
        const scheduleKeyIds = getScheduleKeyIds(item);
        const scheduleKeyNames = getScheduleKeyNames(item);
        const multiScheduleBadge =`<span class="badge text-bg-info" title="${escapeHtml(scheduleKeyNames.join(', '))}">${scheduleKeyIds.length} кл-гр</span>`;

        return `
        <tr data-duty-id="${item.id}" draggable="${reorderEnabled ? 'true' : 'false'}">
          <td class="text-secondary" data-label="">${reorderEnabled ? '↕' : ''}</td>
          <td data-label="Наименование">
            <div class="d-flex align-items-center gap-2 flex-wrap">
              ${multiScheduleBadge}
              <span>${escapeHtml(item.name ?? '-')}</span>           
            </div>
          </td>
          <td data-label="Начало">${escapeHtml(item.start_time ?? '-')}</td>
          <td data-label="Край">${escapeHtml(item.end_time ?? '-')}</td>
          <td data-label="Втори ден">${item.second_day ? 'Да' : 'Не'}</td>
          <td data-label="Прекъсване">${escapeHtml(formatInterval(item.break_duration_interval))}</td>
          <td data-label="Времетраене">${escapeHtml(formatInterval(item.duration_interval))}</td>
          <td class="text-end" data-label="">
            <div class="d-inline-flex gap-2">
              <button type="button" class="btn btn-sm btn-outline-secondary" data-duty-action="profile" data-id="${item.id}" title="Профил" aria-label="Профил"><i class="bi bi-person-vcard"></i></button>
              <button type="button" class="btn btn-sm btn-outline-secondary" data-duty-action="trains" data-id="${item.id}" data-name="${escapeHtml(item.name ?? '')}" title="Влакове" aria-label="Влакове"><i class="bi bi-train-front"></i></button>
              <button type="button" class="btn btn-sm btn-outline-primary" data-duty-action="edit" data-id="${item.id}" title="Редакция" aria-label="Редакция"><i class="bi bi-pencil"></i></button>
              <button type="button" class="btn btn-sm btn-outline-danger" data-duty-action="delete" data-id="${item.id}" title="Изтрий" aria-label="Изтрий"><i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>
      `;
      }
    )
    .join('');
}

export async function persistScheduleKeyDutiesOrder() {
  const updates = scheduleKeyDutiesState.duties.map((item, index) =>
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

  scheduleKeyDutiesState.duties = scheduleKeyDutiesState.duties.map((item, index) => ({
    ...item,
    display_order: index + 1
  }));

  return true;
}

function getScheduleKeyRows(item) {
  return Array.isArray(item.schedule_key_duties)
    ? item.schedule_key_duties
    : item.schedule_key_duties
      ? [item.schedule_key_duties]
      : [];
}

function getScheduleKeyIds(item) {
  const mappedIds = getScheduleKeyRows(item)
    .map((row) => row?.schedule_key_id)
    .filter(Boolean);

  const ids = mappedIds.length ? mappedIds : item.schedule_key_id ? [item.schedule_key_id] : [];

  return [...new Set(ids)];
}

function getScheduleKeyNames(item) {
  const names = getScheduleKeyRows(item)
    .map((row) => row?.schedule_keys?.name)
    .filter(Boolean);

  return [...new Set(names)];
}