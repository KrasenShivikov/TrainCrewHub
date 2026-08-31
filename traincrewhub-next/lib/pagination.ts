export const defaultPageSize = 20;

export function parsePage(value?: string) {
  const page = Number(value ?? "1");
  return Number.isInteger(page) && page > 0 ? page : 1;
}

export function paginateItems<T>(items: T[], page: number, pageSize = defaultPageSize) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    ...paginationMeta(items.length, page, pageSize)
  };
}

export function paginationMeta(totalItems: number, page: number, pageSize = defaultPageSize) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    page: safePage,
    pageSize,
    totalPages,
    totalItems,
    startItem: totalItems ? start + 1 : 0,
    endItem: Math.min(start + pageSize, totalItems)
  };
}

export function pageOffset(page: number, pageSize = defaultPageSize) {
  return (page - 1) * pageSize;
}
