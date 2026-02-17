import shellHtml from './page.html?raw';
import { renderHeader } from '../header/header.js';
import { renderFooter } from '../footer/footer.js';

export async function renderPageShell(container) {
  container.innerHTML = shellHtml;

  const headerRoot = container.querySelector('#app-header');
  const footerRoot = container.querySelector('#app-footer');

  await Promise.all([renderHeader(headerRoot), renderFooter(footerRoot)]);
}
