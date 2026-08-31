import Link from "next/link";

import { FlashBanner } from "@/components/flash-banner";
import { NavLinks } from "@/components/nav-links";
import { getCurrentUser } from "@/lib/auth/session";
import { consumeFlash } from "@/lib/flash";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const [user, flash] = await Promise.all([getCurrentUser(), consumeFlash()]);
  const displayName =
    user?.firstName || user?.lastName
      ? [user.firstName, user.lastName].filter(Boolean).join(" ")
      : user?.username;

  return (
    <div className="min-h-screen bg-rail-mist text-rail-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-rail-line bg-white px-4 py-5 lg:block">
        <Link href="/" className="flex items-center gap-3 px-2 text-lg font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded bg-rail-route text-sm font-bold text-white">
            T
          </span>
          TrainCrewHub
        </Link>
        <NavLinks />
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-rail-line bg-white/95 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Next.js миграция
              </p>
              <h1 className="text-lg font-semibold">TrainCrewHub</h1>
            </div>
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-medium">{displayName}</p>
                  <p className="text-xs text-slate-500">{user.roles.join(", ") || "без роля"}</p>
                </div>
                <form action="/logout" method="post">
                  <button
                    type="submit"
                    className="rounded border border-rail-line bg-white px-3 py-2 text-sm font-medium hover:bg-slate-100"
                  >
                    Изход
                  </button>
                </form>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded bg-rail-ink px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
              >
                Вход
              </Link>
            )}
          </div>
          <div className="mt-3 lg:hidden">
            <NavLinks compact />
          </div>
        </header>

        <main className="px-4 py-6 lg:px-8">
          <FlashBanner message={flash} />
          {children}
        </main>
      </div>
    </div>
  );
}
