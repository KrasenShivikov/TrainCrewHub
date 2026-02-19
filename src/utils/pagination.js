export const DEFAULT_PAGE_SIZE = 20;

export function paginateRows(rows, requestedPage = 1, pageSize = DEFAULT_PAGE_SIZE) {
  const safeRows = Array.isArray(rows) ? rows : [];
  const safePageSize = Number(pageSize) > 0 ? Number(pageSize) : DEFAULT_PAGE_SIZE;
  const totalItems = safeRows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const page = clampPage(Number(requestedPage) || 1, totalPages);

  const startIndex = (page - 1) * safePageSize;
  const endIndex = startIndex + safePageSize;

  return {
    pageItems: safeRows.slice(startIndex, endIndex),
    page,
    pageSize: safePageSize,
    totalItems,
    totalPages
  };
}

export function clampPage(page, totalPages) {
  const safeTotal = Number(totalPages) > 0 ? Number(totalPages) : 1;
  const safePage = Number(page) || 1;
  return Math.min(Math.max(1, safePage), safeTotal);
}

export function syncPaginationUi(container, config) {
  const root = container.querySelector(config.rootSelector);
  const prev = container.querySelector(config.prevSelector);
  const next = container.querySelector(config.nextSelector);
  const label = container.querySelector(config.labelSelector);

  if (!root || !prev || !next || !label) {
    return;
  }

  const totalItems = Number(config.totalItems) || 0;
  const totalPages = Number(config.totalPages) || 1;
  const page = clampPage(Number(config.page) || 1, totalPages);

  if (totalItems === 0 || totalPages <= 1) {
    root.classList.add('d-none');
    prev.disabled = true;
    next.disabled = true;
    label.textContent = '';
    return;
  }

  root.classList.remove('d-none');
  prev.disabled = page <= 1;
  next.disabled = page >= totalPages;
  label.textContent = `Страница ${page} от ${totalPages}`;
}

export function bindPaginationButtons(container, config) {
  const root = container.querySelector(config.rootSelector);
  const prev = container.querySelector(config.prevSelector);
  const next = container.querySelector(config.nextSelector);

  if (!root || !prev || !next) {
    return;
  }

  if (root.dataset.paginationBound === 'true') {
    return;
  }

  root.dataset.paginationBound = 'true';

  prev.addEventListener('click', () => {
    config.onPrev?.();
  });

  next.addEventListener('click', () => {
    config.onNext?.();
  });
}
