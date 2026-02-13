import { loadHtml } from '../../utils/loadHtml.js';

export async function renderHeader(container) {
  const headerHtml = await loadHtml('./header.html', import.meta.url);
  container.innerHTML = headerHtml;
}
