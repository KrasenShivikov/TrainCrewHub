import pageHtml from '../documents.html?raw';
import { attachDocumentsHandlers } from './documentsHandlers.js';
import { refreshDocumentsData } from './documentsData.js';

export async function renderDocumentsPage(container) {
  container.innerHTML = pageHtml;
  attachDocumentsHandlers(container);
  await refreshDocumentsData(container);
}
