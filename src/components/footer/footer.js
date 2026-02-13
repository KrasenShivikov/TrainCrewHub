import { loadHtml } from '../../utils/loadHtml.js';

export async function renderFooter(container) {
  const footerHtml = await loadHtml('./footer.html', import.meta.url);
  container.innerHTML = footerHtml;
}
