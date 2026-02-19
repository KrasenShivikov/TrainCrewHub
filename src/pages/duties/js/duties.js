import pageHtml from '../duties.html?raw';
import { initializeDutyFormFields } from './dutiesFormFields.js';
import { attachDutiesHandlers } from './dutiesHandlers.js';
import { loadDutyTypeOptions, loadScheduleKeyOptions, loadTrainOptions } from './dutiesOptions.js';
import { loadDuties } from './table.js';

export async function renderDutiesPage(container) {
  container.innerHTML = pageHtml;
  initializeDutyFormFields(container);
  attachDutiesHandlers(container);
  await loadDutyTypeOptions(container);
  await loadScheduleKeyOptions(container);
  await loadTrainOptions(container);
  await loadDuties(container);
}
