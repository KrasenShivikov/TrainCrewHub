"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/lib/navigation";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className={compact ? "flex gap-2 overflow-x-auto pb-1 lg:hidden" : "mt-8 space-y-1"}>
      {navigation.map((item) => {
        const active = isActive(pathname, item.href);
        const className = compact
          ? active
            ? "inline-flex h-9 shrink-0 items-center gap-2 rounded bg-rail-ink px-3 text-sm font-medium text-white"
            : "inline-flex h-9 shrink-0 items-center gap-2 rounded border border-rail-line bg-white px-3 text-sm font-medium text-slate-700"
          : active
            ? "flex h-10 items-center gap-3 rounded bg-rail-ink px-3 text-sm font-medium text-white"
            : "flex h-10 items-center gap-3 rounded px-3 text-sm font-medium text-slate-700 hover:bg-slate-100";

        return (
          <Link key={item.href} href={item.href} className={className}>
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
