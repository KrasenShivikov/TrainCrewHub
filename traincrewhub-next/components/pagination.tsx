import Link from "next/link";
import type { Route } from "next";

function buildHref(pathname: string, params: Record<string, string | undefined>, page: number) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  if (page > 1) {
    searchParams.set("page", String(page));
  }

  const query = searchParams.toString();
  return `${pathname}${query ? `?${query}` : ""}` as Route;
}

export function Pagination({
  pathname,
  params,
  page,
  totalPages,
  totalItems,
  startItem,
  endItem
}: {
  pathname: string;
  params: Record<string, string | undefined>;
  page: number;
  totalPages: number;
  totalItems: number;
  startItem: number;
  endItem: number;
}) {
  if (totalPages <= 1 && totalItems <= endItem) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rail-line px-4 py-3 text-sm">
      <p className="text-slate-600">
        Показани {startItem}-{endItem} от {totalItems}
      </p>
      <div className="flex items-center gap-2">
        <PageLink disabled={page <= 1} href={buildHref(pathname, params, page - 1)}>
          Назад
        </PageLink>
        <span className="px-2 text-slate-600">
          {page} / {totalPages}
        </span>
        <PageLink disabled={page >= totalPages} href={buildHref(pathname, params, page + 1)}>
          Напред
        </PageLink>
      </div>
    </div>
  );
}

function PageLink({ href, disabled, children }: { href: Route; disabled: boolean; children: React.ReactNode }) {
  if (disabled) {
    return <span className="rounded border border-rail-line px-3 py-2 text-slate-400">{children}</span>;
  }

  return (
    <Link href={href} className="rounded border border-rail-line px-3 py-2 font-medium hover:bg-slate-100">
      {children}
    </Link>
  );
}
