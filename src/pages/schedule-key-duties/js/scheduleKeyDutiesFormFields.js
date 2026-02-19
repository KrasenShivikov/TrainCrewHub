import { renderDutyFormFields } from '../../../utils/dutyFormTemplate.js';

export function initializeScheduleKeyFormFields(container) {
  const createFieldsRoot = container.querySelector('#schedule-key-duty-create-form-fields');
  if (createFieldsRoot) {
    createFieldsRoot.innerHTML = renderDutyFormFields({
      idPrefix: 'schedule-key-duty-create'
    });
  }

  const editFieldsRoot = container.querySelector('#schedule-key-duty-edit-form-fields');
  if (editFieldsRoot) {
    editFieldsRoot.innerHTML = renderDutyFormFields({
      idPrefix: 'schedule-key-duty-edit'
    });
  }
}
