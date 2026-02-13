import { loadHtml } from '../../../utils/loadHtml.js';

export async function renderIndexPage(container) {
  const pageHtml = await loadHtml('../index.html', import.meta.url);
  container.innerHTML = pageHtml;
}
