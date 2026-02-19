import { intervalToTimeInput } from '../../../utils/dutyTime.js';
import { buildDutyProfileContent } from '../../../utils/dutyProfileTemplate.js';
import { showToast } from '../../../components/toast/toast.js';
import { openModal } from './helpers.js';
import { scheduleKeyDutiesState } from './state.js';

export function getDutyField(container, ...selectors) {
  for (const selector of selectors) {
    const field = container.querySelector(selector);
    if (field) {
      return field;
    }
  }

  return null;
}

export function setDutyFieldValue(container, value, ...selectors) {
  const field = getDutyField(container, ...selectors);
  if (!field) {
    return;
  }

  field.value = value;
}

function getScheduleKeyRows(duty) {
  return Array.isArray(duty?.schedule_key_duties)
    ? duty.schedule_key_duties
    : duty?.schedule_key_duties
      ? [duty.schedule_key_duties]
      : [];
}

export function getScheduleKeyIds(duty) {
  const mappedIds = getScheduleKeyRows(duty)
    .map((row) => row?.schedule_key_id)
    .filter(Boolean);

  const ids = mappedIds.length ? mappedIds : duty?.schedule_key_id ? [duty.schedule_key_id] : [];
  return [...new Set(ids)];
}

export function getScheduleKeyNames(duty) {
  const names = getScheduleKeyRows(duty)
    .map((row) => row?.schedule_keys?.name)
    .filter(Boolean);

  return [...new Set(names)];
}

function getTrainRows(duty) {
  return Array.isArray(duty?.duty_trains)
    ? duty.duty_trains
    : duty?.duty_trains
      ? [duty.duty_trains]
      : [];
}

export function getTrainIdsOrdered(duty) {
  return getTrainRows(duty)
    .map((row) => ({
      id: row?.train_id,
      sequenceOrder: Number.isFinite(Number(row?.sequence_order)) ? Number(row.sequence_order) : Number.MAX_SAFE_INTEGER
    }))
    .filter((row) => Boolean(row.id))
    .sort((left, right) => left.sequenceOrder - right.sequenceOrder)
    .map((row) => row.id)
    .filter((value, index, all) => all.indexOf(value) === index);
}

export function getTrainNumbersOrdered(duty) {
  return getTrainRows(duty)
    .map((row) => ({
      number: row?.trains?.number,
      sequenceOrder: Number.isFinite(Number(row?.sequence_order)) ? Number(row.sequence_order) : Number.MAX_SAFE_INTEGER
    }))
    .filter((row) => Boolean(row.number))
    .sort((left, right) => left.sequenceOrder - right.sequenceOrder)
    .map((row) => row.number)
    .filter((value, index, all) => all.indexOf(value) === index);
}

function formatIntervalValue(value) {
  if (!value) {
    return '-';
  }

  return String(value).replace('.000000', '');
}

export function resetCreateDutyForm(container) {
  container.querySelector('#schedule-key-duty-create-name').value = '';
  container.querySelector('#schedule-key-duty-create-type').value =
    scheduleKeyDutiesState.lastCreatedDutyTypeId || '';

  const rememberedScheduleKeyIds = scheduleKeyDutiesState.lastCreatedScheduleKeyIds?.length
    ? scheduleKeyDutiesState.lastCreatedScheduleKeyIds
    : [scheduleKeyDutiesState.scheduleKeyId];

  const scheduleKeysSelect = container.querySelector('#schedule-key-duty-create-schedule-keys');
  Array.from(scheduleKeysSelect.options).forEach((option) => {
    option.selected = rememberedScheduleKeyIds.includes(option.value);
  });

  setDutyFieldValue(container, '', '#schedule-key-duty-create-start', '#schedule-key-duty-create-start-time');
  setDutyFieldValue(container, '', '#schedule-key-duty-create-end', '#schedule-key-duty-create-end-time');
  container.querySelector('#schedule-key-duty-create-second-day').checked = false;
  setDutyFieldValue(
    container,
    '00:00',
    '#schedule-key-duty-create-break-start',
    '#schedule-key-duty-create-break-start-time'
  );
  setDutyFieldValue(
    container,
    '00:00',
    '#schedule-key-duty-create-break-end',
    '#schedule-key-duty-create-break-end-time'
  );
  container.querySelector('#schedule-key-duty-create-notes').value = '';
  const trainsSelect = container.querySelector('#schedule-key-duty-create-trains');
  Array.from(trainsSelect.options).forEach((option) => {
    option.selected = false;
  });
}

export function openEditDutyModal(container, dutyId) {
  const duty = scheduleKeyDutiesState.duties.find((item) => item.id === dutyId);
  if (!duty) {
    showToast('Повеската не е намерена.', 'warning');
    return;
  }

  container.querySelector('#schedule-key-duty-edit-id').value = duty.id;
  container.querySelector('#schedule-key-duty-edit-name').value = duty.name ?? '';
  container.querySelector('#schedule-key-duty-edit-type').value = duty.duty_type_id ?? '';
  const scheduleKeysSelect = container.querySelector('#schedule-key-duty-edit-schedule-keys');
  const selectedScheduleKeyIds = getScheduleKeyIds(duty);
  Array.from(scheduleKeysSelect.options).forEach((option) => {
    option.selected = selectedScheduleKeyIds.includes(option.value);
  });
  const trainsSelect = container.querySelector('#schedule-key-duty-edit-trains');
  const selectedTrainIds = getTrainIdsOrdered(duty);
  Array.from(trainsSelect.options).forEach((option) => {
    option.selected = selectedTrainIds.includes(option.value);
  });
  setDutyFieldValue(
    container,
    (duty.start_time || '').slice(0, 5),
    '#schedule-key-duty-edit-start',
    '#schedule-key-duty-edit-start-time'
  );
  setDutyFieldValue(
    container,
    (duty.end_time || '').slice(0, 5),
    '#schedule-key-duty-edit-end',
    '#schedule-key-duty-edit-end-time'
  );
  container.querySelector('#schedule-key-duty-edit-second-day').checked = Boolean(duty.second_day);
  setDutyFieldValue(
    container,
    intervalToTimeInput(duty.break_start_time),
    '#schedule-key-duty-edit-break-start',
    '#schedule-key-duty-edit-break-start-time'
  );
  setDutyFieldValue(
    container,
    intervalToTimeInput(duty.break_end_time),
    '#schedule-key-duty-edit-break-end',
    '#schedule-key-duty-edit-break-end-time'
  );
  container.querySelector('#schedule-key-duty-edit-notes').value = duty.notes ?? '';
  openModal(container.querySelector('#schedule-key-duty-edit-modal'));
}

export function openDutyProfileModal(container, dutyId, { escapeHtml } = {}) {
  const duty = scheduleKeyDutiesState.duties.find((item) => item.id === dutyId);
  const content = container.querySelector('#schedule-key-duty-profile-content');
  const modal = container.querySelector('#schedule-key-duty-profile-modal');
  const profileEditButton = container.querySelector('#schedule-key-duty-profile-edit');

  if (!content || !modal) {
    return;
  }

  if (!duty) {
    modal.dataset.dutyId = '';
    if (profileEditButton) {
      profileEditButton.disabled = true;
    }
    content.innerHTML = '<p class="text-secondary mb-0">Няма данни за тази повеска.</p>';
    openModal(modal);
    return;
  }

  modal.dataset.dutyId = duty.id;
  if (profileEditButton) {
    profileEditButton.disabled = false;
  }

  const scheduleKeyNames = getScheduleKeyNames(duty);
  const trainNumbers = getTrainNumbersOrdered(duty);

  content.innerHTML = buildDutyProfileContent({
    duty,
    scheduleKeyNames,
    trainNumbers,
    escapeHtml,
    intervalToTimeInput,
    formatInterval: formatIntervalValue
  });

  openModal(modal);
}
