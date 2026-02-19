import pageHtml from '../schedule-key-duties.html?raw';
import { isCurrentUserCrew } from '../../../utils/userContext.js';
import { scheduleKeyDutiesState } from './state.js';
import { initializeScheduleKeyFormFields } from './scheduleKeyDutiesFormFields.js';
import { attachScheduleKeyDutiesHandlers } from './scheduleKeyDutiesHandlers.js';
import { loadDutyTypeOptions, loadScheduleKeyOptions, loadTrainOptions } from './scheduleKeyDutiesOptions.js';
import { initScheduleKeyContext } from './scheduleKeyDutiesData.js';
import { loadDutiesForScheduleKey } from './table.js';
import { resetCreateDutyForm } from './scheduleKeyDutiesForms.js';

export async function renderScheduleKeyDutiesPage(container) {
  container.innerHTML = pageHtml;

  const isCrew = await isCurrentUserCrew();
  scheduleKeyDutiesState.reorderEnabled = !isCrew;
  if (isCrew) {
    const attachBtn = container.querySelector('#open-attach-schedule-key-duty');
    if (attachBtn) {
      attachBtn.classList.add('d-none');
    }
  }

  initializeScheduleKeyFormFields(container);
  attachScheduleKeyDutiesHandlers(container);

  await loadDutyTypeOptions(container);
  await loadScheduleKeyOptions(container);
  await loadTrainOptions(container);

  await initScheduleKeyContext(container);

  if (!scheduleKeyDutiesState.scheduleKeyId) {
    return;
  }

  resetCreateDutyForm(container);
  await loadDutiesForScheduleKey(container);
}