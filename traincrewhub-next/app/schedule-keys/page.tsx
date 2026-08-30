import { asc } from "drizzle-orm";
import { Plus, Save, Trash2 } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { SectionHeader } from "@/components/section-header";
import { getDb } from "@/db";
import { scheduleKeys } from "@/db/schema";
import { requireUser } from "@/lib/auth/session";
import {
  createScheduleKeyAction,
  deleteScheduleKeyAction,
  updateScheduleKeyAction
} from "./actions";

const scheduleTypeLabels = {
  seasonal: "Сезонен",
  "ad-hoc": "Еднократен",
  temporary: "Временен"
};

export default async function ScheduleKeysPage() {
  await requireUser();
  const rows = await getDb().select().from(scheduleKeys).orderBy(asc(scheduleKeys.validFrom), asc(scheduleKeys.name));

  return (
    <AppShell>
      <SectionHeader title="Ключ-графици" description="Периоди и типове графици, към които се прикрепят повески." />
      <div className="grid gap-5 xl:grid-cols-[420px_1fr]">
        <ScheduleKeyForm action={createScheduleKeyAction} title="Нов ключ-график" buttonLabel="Добави" />
        <section className="overflow-hidden rounded border border-rail-line bg-white shadow-panel">
          <div className="border-b border-rail-line px-4 py-3">
            <h3 className="text-base font-semibold">Списък ключ-графици</h3>
            <p className="text-sm text-slate-600">Общо: {rows.length}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Име</th>
                  <th className="px-4 py-3">Тип</th>
                  <th className="px-4 py-3">Период</th>
                  <th className="px-4 py-3">Роля</th>
                  <th className="px-4 py-3">Статус</th>
                  <th className="px-4 py-3 text-right">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rail-line">
                {rows.length ? rows.map((row) => (
                  <tr key={row.id} className="align-top">
                    <td className="px-4 py-3 font-medium">{row.name}</td>
                    <td className="px-4 py-3">{scheduleTypeLabels[row.type ?? "seasonal"]}</td>
                    <td className="px-4 py-3">{row.validFrom} - {row.validTo}</td>
                    <td className="px-4 py-3">{row.crewRole || "-"}</td>
                    <td className="px-4 py-3">
                      <span className={row.isActive ? "rounded bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700" : "rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"}>
                        {row.isActive ? "Активен" : "Неактивен"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <details className="text-left">
                          <summary className="cursor-pointer rounded border border-rail-line px-3 py-2 text-sm font-medium hover:bg-slate-100">Редакция</summary>
                          <div className="absolute right-8 z-10 mt-2 w-[min(520px,calc(100vw-2rem))] rounded border border-rail-line bg-white p-4 shadow-lg">
                            <ScheduleKeyForm action={updateScheduleKeyAction} title="Редакция" buttonLabel="Запази" scheduleKey={row} />
                          </div>
                        </details>
                        <form action={deleteScheduleKeyAction}>
                          <input type="hidden" name="id" value={row.id} />
                          <button className="inline-flex h-10 items-center gap-2 rounded border border-red-200 px-3 text-sm font-medium text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" /> Изтрий
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={6} className="px-4 py-10 text-center text-slate-500">Няма въведени ключ-графици.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function ScheduleKeyForm({
  action,
  title,
  buttonLabel,
  scheduleKey
}: {
  action: (formData: FormData) => Promise<void>;
  title: string;
  buttonLabel: string;
  scheduleKey?: typeof scheduleKeys.$inferSelect;
}) {
  return (
    <form action={action} className="rounded border border-rail-line bg-white p-4 shadow-panel">
      <h3 className="text-base font-semibold">{title}</h3>
      {scheduleKey ? <input type="hidden" name="id" value={scheduleKey.id} /> : null}
      <div className="mt-4 grid gap-3">
        <Field name="name" label="Име" defaultValue={scheduleKey?.name} />
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium" htmlFor="type">Тип</label>
            <select id="type" name="type" defaultValue={scheduleKey?.type ?? "seasonal"} className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route">
              <option value="seasonal">Сезонен</option>
              <option value="ad-hoc">Еднократен</option>
              <option value="temporary">Временен</option>
            </select>
          </div>
          <Field name="crewRole" label="Роля екипаж" defaultValue={scheduleKey?.crewRole ?? ""} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field name="validFrom" label="Валиден от" type="date" defaultValue={scheduleKey?.validFrom} />
          <Field name="validTo" label="Валиден до" type="date" defaultValue={scheduleKey?.validTo} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input name="isActive" type="checkbox" defaultChecked={scheduleKey?.isActive ?? true} className="h-4 w-4 rounded border-rail-line text-rail-route" />
          Активен
        </label>
      </div>
      <button className="mt-4 inline-flex h-10 items-center gap-2 rounded bg-rail-ink px-4 text-sm font-medium text-white hover:bg-slate-700">
        {scheduleKey ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        {buttonLabel}
      </button>
    </form>
  );
}

function Field({ name, label, type = "text", defaultValue = "" }: { name: string; label: string; type?: string; defaultValue?: string | null }) {
  return (
    <div>
      <label className="block text-sm font-medium" htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} defaultValue={defaultValue ?? ""} className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route" />
    </div>
  );
}
