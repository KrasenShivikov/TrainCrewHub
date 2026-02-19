import { renderDutyFormFields } from '../../../utils/dutyFormTemplate.js';
import { MAX_DUTY_FILE_ITEMS } from './dutiesConstants.js';

export function initializeDutyFormFields(container) {
  const fieldsRoot = container.querySelector('#duty-form-fields');
  if (!fieldsRoot) {
    return;
  }

  fieldsRoot.innerHTML = `
    ${renderDutyFormFields({ idPrefix: 'duty' })}

    <div class="col-12">
      <label for="duty-attachment-file" class="form-label">Файлове</label>
      <input id="duty-attachment-file" class="form-control" type="file" multiple />
      <div class="form-text">Може да добавиш до ${MAX_DUTY_FILE_ITEMS} файла общо.</div>
    </div>

    <div id="duty-current-attachments-wrap" class="col-12 d-none">
      <label class="form-label">Текущи файлове</label>
      <div id="duty-current-attachments-links" class="d-flex flex-column gap-2"></div>
    </div>

    <input type="hidden" id="duty-existing-attachments" />
    <input type="hidden" id="duty-draft-attachments" />
  `;
}

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
