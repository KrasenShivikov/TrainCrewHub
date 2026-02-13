import { loadHtml } from '../../../utils/loadHtml.js';

export async function renderDashboardPage(container) {
  const pageHtml = await loadHtml('../dashboard.html', import.meta.url);
  container.innerHTML = pageHtml;
}
