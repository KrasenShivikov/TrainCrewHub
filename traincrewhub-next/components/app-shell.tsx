import Link from "next/link";

import { getCurrentUser } from "@/lib/auth/session";
import { navigation } from "@/lib/navigation";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
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
        <nav className="mt-8 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex h-10 items-center gap-3 rounded px-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
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
        </header>

        <main className="px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
