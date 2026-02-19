import pageHtml from '../trains.html?raw';
import { attachTrainsHandlers } from './trainsHandlers.js';
import { loadTrains } from './table.js';

export async function renderTrainsPage(container) {
  container.innerHTML = pageHtml;

  attachTrainsHandlers(container);
  await loadTrains(container);
}
