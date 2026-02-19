import { intervalToTimeInput } from '../../../utils/dutyTime.js';
import { parseAttachmentEntries, serializeAttachmentEntries, updateCurrentAttachmentsPreview } from './dutiesAttachments.js';
import { setDutyFieldValue } from './dutiesFormFields.js';

export function populateDutyForm(container, duty) {
  const attachments = parseAttachmentEntries(duty.dutyFiles);

  container.querySelector('#duty-id').value = duty.id;
  container.querySelector('#duty-name').value = duty.name ?? '';
  container.querySelector('#duty-type').value = duty.dutyTypeId ?? '';
  const scheduleKeysSelect = container.querySelector('#duty-schedule-keys');
  const selectedScheduleKeyIds = duty.scheduleKeyIds || [];
  Array.from(scheduleKeysSelect.options).forEach((option) => {
    option.selected = selectedScheduleKeyIds.includes(option.value);
  });
  const trainsSelect = container.querySelector('#duty-trains');
  const selectedTrainIds = duty.trainIds || [];
  Array.from(trainsSelect.options).forEach((option) => {
    option.selected = selectedTrainIds.includes(option.value);
  });
  setDutyFieldValue(container, duty.startTime ?? '', '#duty-start', '#duty-start-time');
  setDutyFieldValue(container, duty.endTime ?? '', '#duty-end', '#duty-end-time');
  container.querySelector('#duty-second-day').checked = Boolean(duty.secondDay);
  setDutyFieldValue(container, intervalToTimeInput(duty.breakStartTime), '#duty-break-start', '#duty-break-start-time');
  setDutyFieldValue(container, intervalToTimeInput(duty.breakEndTime), '#duty-break-end', '#duty-break-end-time');
  container.querySelector('#duty-notes').value = duty.notes ?? '';
  container.querySelector('#duty-existing-attachments').value = serializeAttachmentEntries(attachments) || '';
  container.querySelector('#duty-draft-attachments').value = serializeAttachmentEntries(attachments) || '';
  container.querySelector('#duty-attachment-file').value = '';
  updateCurrentAttachmentsPreview(container, attachments);

  container.querySelector('#duty-form-title').textContent = 'Редакция на Повеска';
  container.querySelector('#duty-save-btn').textContent = 'Запази';
}

export function resetDutyForm(container) {
  container.querySelector('#duty-id').value = '';
  container.querySelector('#duty-name').value = '';
  container.querySelector('#duty-type').value = '';
  const scheduleKeysSelect = container.querySelector('#duty-schedule-keys');
  Array.from(scheduleKeysSelect.options).forEach((option) => {
    option.selected = false;
  });
  const trainsSelect = container.querySelector('#duty-trains');
  Array.from(trainsSelect.options).forEach((option) => {
    option.selected = false;
  });
  setDutyFieldValue(container, '', '#duty-start', '#duty-start-time');
  setDutyFieldValue(container, '', '#duty-end', '#duty-end-time');
  container.querySelector('#duty-second-day').checked = false;
  setDutyFieldValue(container, '00:00', '#duty-break-start', '#duty-break-start-time');
  setDutyFieldValue(container, '00:00', '#duty-break-end', '#duty-break-end-time');
  container.querySelector('#duty-notes').value = '';
  container.querySelector('#duty-existing-attachments').value = '';
  container.querySelector('#duty-draft-attachments').value = '';
  container.querySelector('#duty-attachment-file').value = '';
  updateCurrentAttachmentsPreview(container, []);

  container.querySelector('#duty-form-title').textContent = 'Нова Повеска';
  container.querySelector('#duty-save-btn').textContent = 'Създай';
}
