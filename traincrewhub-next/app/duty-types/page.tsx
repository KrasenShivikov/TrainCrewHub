import { asc } from "drizzle-orm";
import { Plus, Save, Trash2 } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { SectionHeader } from "@/components/section-header";
import { getDb } from "@/db";
import { dutyTypes } from "@/db/schema";
import { requireUser } from "@/lib/auth/session";
import { createDutyTypeAction, deleteDutyTypeAction, updateDutyTypeAction } from "./actions";

export default async function DutyTypesPage() {
  await requireUser();
  const rows = await getDb().select().from(dutyTypes).orderBy(asc(dutyTypes.name));

  return (
    <AppShell>
      <SectionHeader title="Типове повески" description="Номенклатура за категоризиране и филтриране на повеските." />
      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <form action={createDutyTypeAction} className="rounded border border-rail-line bg-white p-4 shadow-panel">
          <h3 className="text-base font-semibold">Нов тип</h3>
          <label className="mt-3 block text-sm font-medium" htmlFor="name">Наименование</label>
          <input id="name" name="name" className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route" />
          <button className="mt-4 inline-flex h-10 items-center gap-2 rounded bg-rail-ink px-4 text-sm font-medium text-white hover:bg-slate-700">
            <Plus className="h-4 w-4" /> Добави
          </button>
        </form>
        <section className="rounded border border-rail-line bg-white shadow-panel">
          <div className="border-b border-rail-line px-4 py-3 text-sm text-slate-600">Общо: {rows.length}</div>
          <div className="divide-y divide-rail-line">
            {rows.length ? rows.map((row) => (
              <div key={row.id} className="grid gap-3 px-4 py-3 md:grid-cols-[1fr_auto]">
                <form action={updateDutyTypeAction} className="flex gap-2">
                  <input type="hidden" name="id" value={row.id} />
                  <input name="name" defaultValue={row.name} className="h-10 min-w-0 flex-1 rounded border border-rail-line px-3 outline-none focus:border-rail-route" />
                  <button className="inline-flex h-10 items-center gap-2 rounded border border-rail-line px-3 text-sm font-medium hover:bg-slate-100">
                    <Save className="h-4 w-4" /> Запази
                  </button>
                </form>
                <form action={deleteDutyTypeAction}>
                  <input type="hidden" name="id" value={row.id} />
                  <button className="inline-flex h-10 items-center gap-2 rounded border border-red-200 px-3 text-sm font-medium text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" /> Изтрий
                  </button>
                </form>
              </div>
            )) : <p className="px-4 py-10 text-center text-sm text-slate-500">Няма въведени типове.</p>}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
