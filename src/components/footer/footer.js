import footerHtml from './footer.html?raw';

export async function renderFooter(container) {
  container.innerHTML = footerHtml;
}
