import { showToast } from '../../../components/toast/toast.js';
import { buildDutyProfileContent } from '../../../utils/dutyProfileTemplate.js';
import { intervalToTimeInput } from '../../../utils/dutyTime.js';
import { openModal, escapeHtml } from './helpers.js';
import { dutiesState } from './state.js';
import { populateDutyForm } from './dutiesForms.js';
import { parseAttachmentEntries } from './dutiesAttachments.js';
import { initTooltips } from '../../../utils/tooltips.js';

export function openDutyProfileModal(container, dutyId) {
  const duty = dutiesState.allDuties.find((item) => item.id === dutyId);
  const content = container.querySelector('#duty-profile-content');
  const profileModal = container.querySelector('#duty-profile-modal');
  const profileDuplicateButton = container.querySelector('#duty-profile-duplicate');
  const profileEditButton = container.querySelector('#duty-profile-edit');

  if (!content || !profileModal) {
    return;
  }

  if (!duty) {
    profileModal.dataset.dutyId = '';
    if (profileEditButton) {
      profileEditButton.disabled = true;
    }
    if (profileDuplicateButton) {
      profileDuplicateButton.disabled = true;
    }
    content.innerHTML = '<p class="text-secondary mb-0">Няма данни за тази повеска.</p>';
    openModal(profileModal);
    return;
  }

  profileModal.dataset.dutyId = duty.id;
  if (profileEditButton) {
    profileEditButton.disabled = false;
  }
  if (profileDuplicateButton) {
    profileDuplicateButton.disabled = false;
  }

  const scheduleKeyNames = getScheduleKeyNames(duty);
  const trainNumbers = getTrainNumbersOrdered(duty);
  const attachmentEntries = parseAttachmentEntries(duty?.duty_files);

  content.innerHTML = buildDutyProfileContent({
    duty,
    scheduleKeyNames,
    trainNumbers,
    attachmentEntries,
    escapeHtml,
    intervalToTimeInput,
    formatInterval
  });
  initTooltips(content);

  openModal(profileModal);
}

export function openDutyEditModal(container, dutyId) {
  const duty = dutiesState.allDuties.find((item) => item.id === dutyId);
  if (!duty) {
    showToast('Не е намерена повеска за редакция.', 'warning');
    return;
  }

  populateDutyForm(container, {
    id: duty.id,
    name: duty.name || '',
    dutyTypeId: duty.duty_type_id || '',
    scheduleKeyIds: getScheduleKeyIds(duty),
    trainIds: getTrainIdsOrdered(duty),
    startTime: normalizeTime(duty.start_time),
    endTime: normalizeTime(duty.end_time),
    secondDay: Boolean(duty.second_day),
    breakStartTime: duty.break_start_time || '00:00:00',
    breakEndTime: duty.break_end_time || '00:00:00',
    notes: duty.notes || '',
    dutyFiles: duty.duty_files || ''
  });

  openModal(container.querySelector('#duty-modal'));
}

export function openDutyDuplicateModal(container, dutyId) {
  const duty = dutiesState.allDuties.find((item) => item.id === dutyId);
  if (!duty) {
    showToast('Не е намерена повеска за копиране.', 'warning');
    return;
  }

  populateDutyForm(container, {
    id: '',
    name: duty.name ? `${duty.name} (копие)` : '',
    dutyTypeId: duty.duty_type_id || '',
    scheduleKeyIds: getScheduleKeyIds(duty),
    trainIds: getTrainIdsOrdered(duty),
    startTime: normalizeTime(duty.start_time),
    endTime: normalizeTime(duty.end_time),
    secondDay: Boolean(duty.second_day),
    breakStartTime: duty.break_start_time || '00:00:00',
    breakEndTime: duty.break_end_time || '00:00:00',
    notes: duty.notes || '',
    dutyFiles: duty.duty_files || ''
  });

  container.querySelector('#duty-id').value = '';
  container.querySelector('#duty-form-title').textContent = 'Нова Повеска (копие)';
  container.querySelector('#duty-save-btn').textContent = 'Създай';

  openModal(container.querySelector('#duty-modal'));
}

function getScheduleKeyNames(duty) {
  const rows = Array.isArray(duty?.schedule_key_duties)
    ? duty.schedule_key_duties
    : duty?.schedule_key_duties
      ? [duty.schedule_key_duties]
      : [];

  const names = rows
    .map((row) => row?.schedule_keys?.name)
    .filter(Boolean);

  return [...new Set(names)];
}

function getScheduleKeyIds(duty) {
  const rows = Array.isArray(duty?.schedule_key_duties)
    ? duty.schedule_key_duties
    : duty?.schedule_key_duties
      ? [duty.schedule_key_duties]
      : [];

  const ids = rows
    .map((row) => row?.schedule_key_id)
    .filter(Boolean);

  return [...new Set(ids)];
}

function getTrainNumbersOrdered(duty) {
  const rows = Array.isArray(duty?.duty_trains)
    ? duty.duty_trains
    : duty?.duty_trains
      ? [duty.duty_trains]
      : [];

  return rows
    .map((row) => ({
      number: row?.trains?.number,
      sequenceOrder: Number.isFinite(Number(row?.sequence_order)) ? Number(row.sequence_order) : Number.MAX_SAFE_INTEGER
    }))
    .filter((row) => Boolean(row.number))
    .sort((left, right) => left.sequenceOrder - right.sequenceOrder)
    .map((row) => row.number)
    .filter((value, index, all) => all.indexOf(value) === index);
}

function getTrainIdsOrdered(duty) {
  const rows = Array.isArray(duty?.duty_trains)
    ? duty.duty_trains
    : duty?.duty_trains
      ? [duty.duty_trains]
      : [];

  return rows
    .map((row) => ({
      id: row?.train_id,
      sequenceOrder: Number.isFinite(Number(row?.sequence_order)) ? Number(row.sequence_order) : Number.MAX_SAFE_INTEGER
    }))
    .filter((row) => Boolean(row.id))
    .sort((left, right) => left.sequenceOrder - right.sequenceOrder)
    .map((row) => row.id)
    .filter((value, index, all) => all.indexOf(value) === index);
}

function normalizeTime(value) {
  if (!value) {
    return '';
  }

  return String(value).slice(0, 5);
}

function formatInterval(value) {
  if (!value) {
    return '-';
  }

  return String(value).replace('.000000', '');
}

