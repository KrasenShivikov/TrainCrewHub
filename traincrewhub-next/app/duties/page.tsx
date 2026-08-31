import Link from "next/link";
import { and, asc, count, eq, ilike, inArray, or, sql, type SQL } from "drizzle-orm";
import { Eye, Plus, Save, Trash2 } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { ConfirmSubmit } from "@/components/confirm-submit";
import { EditDialog } from "@/components/edit-dialog";
import { ListFilters, SelectFilter } from "@/components/list-filters";
import { Pagination } from "@/components/pagination";
import { SectionHeader } from "@/components/section-header";
import { getDb } from "@/db";
import { duties, dutyTrains, dutyTypes, scheduleKeyDuties, scheduleKeys, trains } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { defaultPageSize, pageOffset, paginationMeta, parsePage } from "@/lib/pagination";
import { createDutyAction, deleteDutyAction, updateDutyAction } from "./actions";

type DutyRow = typeof duties.$inferSelect & {
  dutyTypeName: string | null;
  scheduleKeyIds: string[];
  scheduleKeyNames: string[];
  trainIds: string[];
  trainNumbers: string[];
};

function asTime(value: string | null) {
  return value ? value.slice(0, 5) : "";
}

function asIntervalInput(value: unknown) {
  if (!value) return "";
  const raw = String(value);
  const match = raw.match(/(\d{1,2}):(\d{2})/);
  return match ? `${match[1].padStart(2, "0")}:${match[2]}` : raw;
}

export default async function DutiesPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; dutyTypeId?: string; page?: string }>;
}) {
  await requirePermission("duties", "view");
  const { q: rawQ, dutyTypeId = "", page: rawPage } = await searchParams;
  const q = (rawQ ?? "").trim();
  const page = parsePage(rawPage);
  const db = getDb();
  const filters: SQL[] = [];

  if (q) {
    const term = `%${q}%`;
    const queryFilter = or(
      ilike(duties.name, term),
      ilike(dutyTypes.name, term),
      ilike(duties.notes, term),
      sql`exists (
        select 1
        from ${scheduleKeyDuties}
        inner join ${scheduleKeys} on ${scheduleKeys.id} = ${scheduleKeyDuties.scheduleKeyId}
        where ${scheduleKeyDuties.dutyId} = ${duties.id}
          and ${scheduleKeys.name} ilike ${term}
      )`,
      sql`exists (
        select 1
        from ${dutyTrains}
        inner join ${trains} on ${trains.id} = ${dutyTrains.trainId}
        where ${dutyTrains.dutyId} = ${duties.id}
          and ${trains.number} ilike ${term}
      )`
    );

    if (queryFilter) filters.push(queryFilter);
  }

  if (dutyTypeId) {
    filters.push(eq(duties.dutyTypeId, dutyTypeId));
  }

  const where = filters.length ? and(...filters) : undefined;
  const [{ totalItems }] = await db
    .select({ totalItems: count() })
    .from(duties)
    .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
    .where(where);
  const paginatedDuties = paginationMeta(totalItems, page);

  const [rawDuties, dutyTypeRows, scheduleKeyRows, trainRows, parentDutyRows] = await Promise.all([
    db
      .select({
        id: duties.id,
        scheduleKeyId: duties.scheduleKeyId,
        dutyTypeId: duties.dutyTypeId,
        parentDutyId: duties.parentDutyId,
        name: duties.name,
        startTime: duties.startTime,
        endTime: duties.endTime,
        breakStartTime: duties.breakStartTime,
        breakEndTime: duties.breakEndTime,
        breakDuration: duties.breakDuration,
        duration: duties.duration,
        isSecondDay: duties.isSecondDay,
        notes: duties.notes,
        displayOrder: duties.displayOrder,
        createdAt: duties.createdAt,
        createdFrom: duties.createdFrom,
        dutyTypeName: dutyTypes.name
      })
      .from(duties)
      .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
      .where(where)
      .orderBy(asc(duties.displayOrder), asc(duties.name))
      .limit(defaultPageSize)
      .offset(pageOffset(paginatedDuties.page)),
    db.select().from(dutyTypes).orderBy(asc(dutyTypes.name)),
    db.select().from(scheduleKeys).orderBy(asc(scheduleKeys.name)),
    db.select().from(trains).orderBy(asc(trains.number)),
    db.select({ id: duties.id, name: duties.name }).from(duties).orderBy(asc(duties.displayOrder), asc(duties.name))
  ]);

  const dutyIds = rawDuties.map((duty) => duty.id);
  const [scheduleLinks, trainLinks] = dutyIds.length
    ? await Promise.all([
        db.select().from(scheduleKeyDuties).where(inArray(scheduleKeyDuties.dutyId, dutyIds)),
        db.select().from(dutyTrains).where(inArray(dutyTrains.dutyId, dutyIds)).orderBy(asc(dutyTrains.sequenceOrder))
      ])
    : [[], []];

  const scheduleNameById = new Map(scheduleKeyRows.map((row) => [row.id, row.name]));
  const trainNumberById = new Map(trainRows.map((row) => [row.id, row.number]));
  const scheduleLinksByDuty = Map.groupBy(scheduleLinks, (row) => row.dutyId);
  const trainLinksByDuty = Map.groupBy(trainLinks, (row) => row.dutyId);
  const dutyRows: DutyRow[] = rawDuties.map((duty) => {
    const dutyScheduleLinks = scheduleLinksByDuty.get(duty.id) ?? [];
    const dutyTrainLinks = trainLinksByDuty.get(duty.id) ?? [];

    return {
      ...duty,
      scheduleKeyIds: dutyScheduleLinks.map((row) => row.scheduleKeyId),
      scheduleKeyNames: dutyScheduleLinks.map((row) => scheduleNameById.get(row.scheduleKeyId)).filter(Boolean) as string[],
      trainIds: dutyTrainLinks.map((row) => row.trainId),
      trainNumbers: dutyTrainLinks.map((row) => trainNumberById.get(row.trainId)).filter(Boolean) as string[]
    };
  });
  return (
    <AppShell>
      <SectionHeader title="Повески" description="Основни данни, типове, ключ-графици и влакове към повеска." />

      <ListFilters q={rawQ}>
        <SelectFilter
          name="dutyTypeId"
          label="Тип"
          value={dutyTypeId}
          options={[
            { value: "", label: "Всички" },
            ...dutyTypeRows.map((type) => ({ value: type.id, label: type.name }))
          ]}
        />
      </ListFilters>

      <div className="grid gap-5 2xl:grid-cols-[460px_1fr]">
        <DutyForm
          action={createDutyAction}
          title="Нова повеска"
          buttonLabel="Добави"
          dutyTypeOptions={dutyTypeRows}
          scheduleKeys={scheduleKeyRows}
          trains={trainRows}
          parentDuties={parentDutyRows}
        />

        <section className="overflow-hidden rounded border border-rail-line bg-white shadow-panel">
          <div className="border-b border-rail-line px-4 py-3">
            <h3 className="text-base font-semibold">Списък повески</h3>
            <p className="text-sm text-slate-600">Общо: {paginatedDuties.totalItems}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Име</th>
                  <th className="px-4 py-3">Тип</th>
                  <th className="px-4 py-3">Часове</th>
                  <th className="px-4 py-3">Ключ-графици</th>
                  <th className="px-4 py-3">Влакове</th>
                  <th className="px-4 py-3">Бележки</th>
                  <th className="px-4 py-3 text-right">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rail-line">
                {dutyRows.length ? dutyRows.map((duty) => (
                  <tr key={duty.id} className="align-top">
                    <td className="px-4 py-3">
                      <p className="font-medium">{duty.name}</p>
                      {duty.isSecondDay ? <p className="mt-1 text-xs text-rail-signal">Втори ден</p> : null}
                    </td>
                    <td className="px-4 py-3">{duty.dutyTypeName ?? "-"}</td>
                    <td className="px-4 py-3">
                      <p>{asTime(duty.startTime)} - {asTime(duty.endTime)}</p>
                      <p className="mt-1 text-xs text-slate-500">Прекъсване: {asIntervalInput(duty.breakDuration) || "-"}</p>
                    </td>
                    <td className="px-4 py-3">{duty.scheduleKeyNames.join(", ") || "-"}</td>
                    <td className="px-4 py-3">{duty.trainNumbers.join(", ") || "-"}</td>
                    <td className="max-w-xs px-4 py-3 text-slate-600">{duty.notes || "-"}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link href={`/duties/${duty.id}`} className="inline-flex h-10 items-center gap-2 rounded border border-rail-line px-3 text-sm font-medium hover:bg-slate-100">
                          <Eye className="h-4 w-4" /> Детайли
                        </Link>
                        <EditDialog>
                          <DutyForm
                            action={updateDutyAction}
                            title="Редакция"
                            buttonLabel="Запази"
                            duty={duty}
                            dutyTypeOptions={dutyTypeRows}
                            scheduleKeys={scheduleKeyRows}
                            trains={trainRows}
                            parentDuties={parentDutyRows.filter((item) => item.id !== duty.id)}
                          />
                        </EditDialog>
                        <form action={deleteDutyAction}>
                          <input type="hidden" name="id" value={duty.id} />
                          <ConfirmSubmit message="Да изтрия ли тази повеска?" className="inline-flex h-10 items-center gap-2 rounded border border-red-200 px-3 text-sm font-medium text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" /> Изтрий
                          </ConfirmSubmit>
                        </form>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-slate-500">Няма въведени повески.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination pathname="/duties" params={{ q: rawQ, dutyTypeId }} {...paginatedDuties} />
        </section>
      </div>
    </AppShell>
  );
}

function DutyForm({
  action,
  title,
  buttonLabel,
  duty,
  dutyTypeOptions,
  scheduleKeys: scheduleKeyOptions,
  trains: trainOptions,
  parentDuties
}: {
  action: (formData: FormData) => Promise<void>;
  title: string;
  buttonLabel: string;
  duty?: DutyRow;
  dutyTypeOptions: Array<typeof dutyTypes.$inferSelect>;
  scheduleKeys: Array<typeof scheduleKeys.$inferSelect>;
  trains: Array<typeof trains.$inferSelect>;
  parentDuties: Array<{ id: string; name: string }>;
}) {
  const selectedScheduleKeyIds = new Set(duty?.scheduleKeyIds ?? []);
  const selectedTrainIds = new Set(duty?.trainIds ?? []);

  return (
    <form action={action} className="rounded border border-rail-line bg-white p-4 shadow-panel">
      <h3 className="text-base font-semibold">{title}</h3>
      {duty ? <input type="hidden" name="id" value={duty.id} /> : null}

      <div className="mt-4 grid gap-3">
        <Field name="name" label="Наименование" defaultValue={duty?.name} />
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium" htmlFor="dutyTypeId">Тип</label>
            <select id="dutyTypeId" name="dutyTypeId" defaultValue={duty?.dutyTypeId ?? ""} className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route">
              <option value="">Без тип</option>
              {dutyTypeOptions.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
            </select>
          </div>
          <Field name="breakDuration" label="Прекъсване" type="time" defaultValue={asIntervalInput(duty?.breakDuration)} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field name="startTime" label="Начало" type="time" defaultValue={asTime(duty?.startTime ?? null)} />
          <Field name="endTime" label="Край" type="time" defaultValue={asTime(duty?.endTime ?? null)} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field name="breakStartTime" label="Начало прекъсване" type="time" defaultValue={asTime(duty?.breakStartTime ?? null)} />
          <Field name="breakEndTime" label="Край прекъсване" type="time" defaultValue={asTime(duty?.breakEndTime ?? null)} />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="scheduleKeyIds">Ключ-графици</label>
          <select id="scheduleKeyIds" name="scheduleKeyIds" multiple defaultValue={duty ? [...selectedScheduleKeyIds] : []} className="mt-1 min-h-28 w-full rounded border border-rail-line px-3 py-2 outline-none focus:border-rail-route">
            {scheduleKeyOptions.map((key) => <option key={key.id} value={key.id}>{key.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="trainIds">Влакове</label>
          <select id="trainIds" name="trainIds" multiple defaultValue={duty ? [...selectedTrainIds] : []} className="mt-1 min-h-28 w-full rounded border border-rail-line px-3 py-2 outline-none focus:border-rail-route">
            {trainOptions.map((train) => (
              <option key={train.id} value={train.id}>
                {train.number} · {train.originStation} - {train.destinationStation}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input name="isSecondDay" type="checkbox" defaultChecked={Boolean(duty?.isSecondDay)} className="h-4 w-4 rounded border-rail-line text-rail-route" />
          Повеска за втори ден
        </label>

        <div>
          <label className="block text-sm font-medium" htmlFor="parentDutyId">Родителска повеска</label>
          <select id="parentDutyId" name="parentDutyId" defaultValue={duty?.parentDutyId ?? ""} className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route">
            <option value="">Без родител</option>
            {parentDuties.map((parentDuty) => <option key={parentDuty.id} value={parentDuty.id}>{parentDuty.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="notes">Бележки</label>
          <textarea id="notes" name="notes" defaultValue={duty?.notes ?? ""} rows={3} className="mt-1 w-full rounded border border-rail-line px-3 py-2 outline-none focus:border-rail-route" />
        </div>
      </div>

      <button className="mt-4 inline-flex h-10 items-center gap-2 rounded bg-rail-ink px-4 text-sm font-medium text-white hover:bg-slate-700">
        {duty ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
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
