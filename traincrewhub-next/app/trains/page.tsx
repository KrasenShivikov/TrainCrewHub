import { and, asc, count, ilike, or, type SQL } from "drizzle-orm";
import { ExternalLink, Plus, Save, Trash2 } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { ConfirmSubmit } from "@/components/confirm-submit";
import { EditDialog } from "@/components/edit-dialog";
import { ListFilters } from "@/components/list-filters";
import { Pagination } from "@/components/pagination";
import { SectionHeader } from "@/components/section-header";
import { getDb } from "@/db";
import { trains } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { defaultPageSize, pageOffset, paginationMeta, parsePage } from "@/lib/pagination";
import { createTrainAction, deleteTrainAction, updateTrainAction } from "./actions";

export default async function TrainsPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  await requirePermission("trains", "view");
  const { q: rawQ, page: rawPage } = await searchParams;
  const q = (rawQ ?? "").trim();
  const page = parsePage(rawPage);
  const db = getDb();
  const filters: SQL[] = [];

  if (q) {
    const term = `%${q}%`;
    const queryFilter = or(
      ilike(trains.number, term),
      ilike(trains.originStation, term),
      ilike(trains.destinationStation, term),
      ilike(trains.timetableUrl, term)
    );

    if (queryFilter) filters.push(queryFilter);
  }

  const where = filters.length ? and(...filters) : undefined;
  const [{ totalItems }] = await db.select({ totalItems: count() }).from(trains).where(where);
  const paginatedRows = paginationMeta(totalItems, page);
  const rows = await db
    .select()
    .from(trains)
    .where(where)
    .orderBy(asc(trains.number))
    .limit(defaultPageSize)
    .offset(pageOffset(paginatedRows.page));

  return (
    <AppShell>
      <SectionHeader title="Влакове" description="Влакове, маршрути, часове и връзки към разписания." />
      <ListFilters q={rawQ} />
      <div className="grid gap-5 xl:grid-cols-[420px_1fr]">
        <TrainForm action={createTrainAction} title="Нов влак" buttonLabel="Добави" />

        <section className="overflow-hidden rounded border border-rail-line bg-white shadow-panel">
          <div className="border-b border-rail-line px-4 py-3">
            <h3 className="text-base font-semibold">Списък влакове</h3>
            <p className="text-sm text-slate-600">Общо: {paginatedRows.totalItems}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Номер</th>
                  <th className="px-4 py-3">Маршрут</th>
                  <th className="px-4 py-3">Часове</th>
                  <th className="px-4 py-3">Разписание</th>
                  <th className="px-4 py-3 text-right">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rail-line">
                {rows.length ? rows.map((train) => (
                  <tr key={train.id} className="align-top">
                    <td className="px-4 py-3 font-medium">{train.number}</td>
                    <td className="px-4 py-3">{train.originStation} {"->"} {train.destinationStation}</td>
                    <td className="px-4 py-3">{train.departureTime} - {train.arrivalTime}</td>
                    <td className="px-4 py-3">
                      {train.timetableUrl ? (
                        <a href={train.timetableUrl} className="inline-flex items-center gap-1 text-rail-route hover:underline" target="_blank">
                          <ExternalLink className="h-4 w-4" /> Отвори
                        </a>
                      ) : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <EditDialog>
                          <TrainForm action={updateTrainAction} title="Редакция" buttonLabel="Запази" train={train} />
                        </EditDialog>
                        <form action={deleteTrainAction}>
                          <input type="hidden" name="id" value={train.id} />
                          <ConfirmSubmit message="Да изтрия ли този влак?" className="inline-flex h-10 items-center gap-2 rounded border border-red-200 px-3 text-sm font-medium text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" /> Изтрий
                          </ConfirmSubmit>
                        </form>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={5} className="px-4 py-10 text-center text-slate-500">Няма въведени влакове.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination pathname="/trains" params={{ q: rawQ }} {...paginatedRows} />
        </section>
      </div>
    </AppShell>
  );
}

function TrainForm({ action, title, buttonLabel, train }: {
  action: (formData: FormData) => Promise<void>;
  title: string;
  buttonLabel: string;
  train?: typeof trains.$inferSelect;
}) {
  return (
    <form action={action} className="rounded border border-rail-line bg-white p-4 shadow-panel">
      <h3 className="text-base font-semibold">{title}</h3>
      {train ? <input type="hidden" name="id" value={train.id} /> : null}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field name="number" label="Номер" defaultValue={train?.number} />
        <Field name="departureTime" label="Тръгване" type="time" defaultValue={train?.departureTime} />
        <Field name="originStation" label="Начална гара" defaultValue={train?.originStation} />
        <Field name="arrivalTime" label="Пристигане" type="time" defaultValue={train?.arrivalTime} />
        <Field name="destinationStation" label="Крайна гара" defaultValue={train?.destinationStation} />
        <Field name="timetableUrl" label="URL разписание" defaultValue={train?.timetableUrl ?? ""} />
      </div>
      <button className="mt-4 inline-flex h-10 items-center gap-2 rounded bg-rail-ink px-4 text-sm font-medium text-white hover:bg-slate-700">
        {train ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
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
