import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml, formatDuration } from './helpers.js';
import { dutiesState, PAGE_SIZE } from './state.js';

export async function loadDuties(container) {
  const { data, error } = await supabase
    .from('duties')
    .select('id, name, notes, duty_files, duty_type_id, start_time, end_time, second_day, break_start_time, break_end_time, break_duration_interval, duration_interval, display_order, duty_types(name), schedule_key_duties(schedule_key_id, schedule_keys(name)), duty_trains(train_id, sequence_order, trains(number))')
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
  syncDutyTypeFilterOptions(container);
  syncScheduleKeyFilterOptions(container);

  const filteredDuties = dutiesState.allDuties.filter((item) => {
    const name = (item.name || '').toLowerCase();
    const typeName = (item.duty_types?.name || '').toLowerCase();
    const scheduleKeyNames = getScheduleKeyNames(item).map((value) => value.toLowerCase());
    const trainNames = getTrainNames(item).join(' ').toLowerCase();
    const matchesSearch = !dutiesState.searchQuery ||
      name.includes(dutiesState.searchQuery) ||
      trainNames.includes(dutiesState.searchQuery);
    const matchesScheduleKey = !dutiesState.scheduleKeyFilter ||
      scheduleKeyNames.includes(dutiesState.scheduleKeyFilter);
    const matchesType = !dutiesState.dutyTypeFilter || typeName === dutiesState.dutyTypeFilter;

    return matchesSearch && matchesScheduleKey && matchesType;
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
      (item) => {
        const scheduleKeyNames = getScheduleKeyNames(item);
        const scheduleKeyIds = getScheduleKeyIds(item);
        const trainIds = getTrainIds(item);
        const attachmentCount = getAttachmentCount(item);
        const multiScheduleBadge =`<span class="badge text-bg-info" title="${escapeHtml(scheduleKeyNames.join(', '))}">${scheduleKeyIds.length} кл-гр</span>`;
        const attachmentBadge = attachmentCount > 0
          ? `<span class="badge text-bg-secondary" title="Прикачени файлове">${attachmentCount} док.</span>`
          : '';
        return `
        <tr data-duty-id="${item.id}">
          <td data-label="Наименование">
            <div class="d-flex align-items-center gap-2 flex-wrap">
              ${multiScheduleBadge}
              ${attachmentBadge}
              <span class="duties-name-ellipsis" title="${escapeHtml(item.name ?? '-')}">${escapeHtml(item.name ?? '-')}</span>
            </div>
          </td>
          <td data-label="Тип">${escapeHtml(item.duty_types?.name ?? '-')}</td>
          <td data-label="Начало">${escapeHtml(item.start_time ?? '-')}</td>
          <td data-label="Край">${escapeHtml(item.end_time ?? '-')}</td>
          <td data-label="Прекъсване">${escapeHtml(formatDuration(item.break_duration_interval))}</td>
          <td data-label="Времетраене">${escapeHtml(formatDuration(item.duration_interval))}</td>
          <td class="text-end" data-label="">
            <div class="d-inline-flex gap-2">
              <button type="button" class="btn btn-sm btn-outline-secondary" data-action="profile" data-id="${item.id}" title="Профил" aria-label="Профил"><i class="bi bi-person-vcard"></i></button>
              <button type="button" class="btn btn-sm btn-outline-primary" data-action="edit" data-id="${item.id}" title="Редакция" aria-label="Редакция"><i class="bi bi-pencil"></i></button>
              <button type="button" class="btn btn-sm btn-outline-secondary" data-action="trains" data-id="${item.id}" data-name="${escapeHtml(item.name ?? '')}" title="Влакове" aria-label="Влакове"><i class="bi bi-train-front"></i></button>
              <button type="button" class="btn btn-sm btn-outline-secondary" data-action="duplicate" data-id="${item.id}" title="Копирай" aria-label="Копирай"><i class="bi bi-copy"></i></button>
              <button type="button" class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${item.id}" title="Изтрий" aria-label="Изтрий"><i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>
      `;
      }
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

function getScheduleKeyRows(item) {
  return Array.isArray(item.schedule_key_duties)
    ? item.schedule_key_duties
    : item.schedule_key_duties
      ? [item.schedule_key_duties]
      : [];
}

function getTrainRows(item) {
  return Array.isArray(item.duty_trains)
    ? item.duty_trains
    : item.duty_trains
      ? [item.duty_trains]
      : [];
}

function getScheduleKeyNames(item) {
  const names = getScheduleKeyRows(item)
    .map((row) => row?.schedule_keys?.name)
    .filter(Boolean);

  return [...new Set(names)];
}

function getScheduleKeyIds(item) {
  const ids = getScheduleKeyRows(item)
    .map((row) => row?.schedule_key_id)
    .filter(Boolean);

  return [...new Set(ids)];
}

function getTrainNames(item) {
  const names = getTrainRows(item)
    .map((row) => row?.trains?.number)
    .filter(Boolean);

  return [...new Set(names)];
}

function getTrainNamesOrdered(item) {
  const rows = getTrainRows(item)
    .map((row) => ({
      number: row?.trains?.number,
      sequenceOrder: Number.isFinite(Number(row?.sequence_order)) ? Number(row.sequence_order) : Number.MAX_SAFE_INTEGER
    }))
    .filter((row) => Boolean(row.number))
    .sort((left, right) => left.sequenceOrder - right.sequenceOrder);

  return [...new Set(rows.map((row) => row.number))];
}

function getTrainIds(item) {
  const rows = getTrainRows(item)
    .map((row) => ({
      trainId: row?.train_id,
      sequenceOrder: Number.isFinite(Number(row?.sequence_order)) ? Number(row.sequence_order) : Number.MAX_SAFE_INTEGER
    }))
    .filter((row) => Boolean(row.trainId))
    .sort((left, right) => left.sequenceOrder - right.sequenceOrder);

  return [...new Set(rows.map((row) => row.trainId))];
}

function getAttachmentCount(item) {
  const raw = String(item?.duty_files || '').trim();
  if (!raw) {
    return 0;
  }

  if (raw.startsWith('[')) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter((entry) => String(entry?.url || '').trim()).length;
      }
    } catch {
      return 1;
    }
  }

  return raw.split('\n').map((entry) => entry.trim()).filter(Boolean).length;
}

function syncDutyTypeFilterOptions(container) {
  const filter = container.querySelector('#duties-type-filter');
  if (!filter) {
    return;
  }

  const selectedValue = dutiesState.dutyTypeFilter || '';
  const typeNames = [...new Set(
    dutiesState.allDuties
      .map((item) => String(item?.duty_types?.name || '').trim())
      .filter(Boolean)
  )].sort((left, right) => left.localeCompare(right, 'bg'));

  filter.innerHTML = `
    <option value="">Всички</option>
    ${typeNames.map((name) => `<option value="${escapeHtml(name.toLowerCase())}">${escapeHtml(name)}</option>`).join('')}
  `;

  filter.value = selectedValue;
}

function syncScheduleKeyFilterOptions(container) {
  const filter = container.querySelector('#duties-schedule-key-filter');
  if (!filter) {
    return;
  }

  const selectedValue = dutiesState.scheduleKeyFilter || '';
  const scheduleKeyNames = [...new Set(
    dutiesState.allDuties
      .flatMap((item) => getScheduleKeyNames(item))
      .map((value) => String(value || '').trim())
      .filter(Boolean)
  )].sort((left, right) => left.localeCompare(right, 'bg'));

  filter.innerHTML = `
    <option value="">Всички</option>
    ${scheduleKeyNames.map((name) => `<option value="${escapeHtml(name.toLowerCase())}">${escapeHtml(name)}</option>`).join('')}
  `;

  filter.value = selectedValue;
}
