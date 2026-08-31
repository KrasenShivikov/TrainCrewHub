import Link from "next/link";
import { asc, and, eq, gte, lte } from "drizzle-orm";

import { AppShell } from "@/components/app-shell";
import { SectionHeader } from "@/components/section-header";
import { getDb } from "@/db";
import {
  absenceReasons,
  actualDuties,
  duties,
  dutyTypes,
  employeeAbsences,
  employees,
  schedulePublications
} from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { confirmScheduleAction, publishScheduleAction } from "./actions";

const roleLabels = {
  chief: "Началник влак",
  conductor: "Кондуктор"
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function asTime(value: string | null) {
  return value ? value.slice(0, 5) : "";
}

export default async function SchedulePage({
  searchParams
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  await requirePermission("actual_duties", "view");
  const params = await searchParams;
  const selectedDate = params.date || todayIso();
  const db = getDb();

  const [actualRows, absenceRows, [publication]] = await Promise.all([
    db
      .select({
        id: actualDuties.id,
        date: actualDuties.date,
        dutyId: actualDuties.dutyId,
        employeeId: actualDuties.employeeId,
        assignmentRole: actualDuties.assignmentRole,
        startTimeOverride: actualDuties.startTimeOverride,
        endTimeOverride: actualDuties.endTimeOverride,
        employeeFirstName: employees.firstName,
        employeeLastName: employees.lastName,
        dutyName: duties.name,
        dutyStartTime: duties.startTime,
        dutyEndTime: duties.endTime,
        dutyIsSecondDay: duties.isSecondDay,
        dutyTypeName: dutyTypes.name
      })
      .from(actualDuties)
      .leftJoin(employees, eq(actualDuties.employeeId, employees.id))
      .leftJoin(duties, eq(actualDuties.dutyId, duties.id))
      .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
      .where(eq(actualDuties.date, selectedDate))
      .orderBy(asc(dutyTypes.name), asc(duties.isSecondDay), asc(duties.startTime), asc(duties.displayOrder), asc(duties.name)),
    db
      .select({
        id: employeeAbsences.id,
        employeeId: employeeAbsences.employeeId,
        startDate: employeeAbsences.startDate,
        endDate: employeeAbsences.endDate,
        employeeFirstName: employees.firstName,
        employeeLastName: employees.lastName,
        reasonName: absenceReasons.name
      })
      .from(employeeAbsences)
      .leftJoin(employees, eq(employeeAbsences.employeeId, employees.id))
      .leftJoin(absenceReasons, eq(employeeAbsences.reasonId, absenceReasons.id))
      .where(and(lte(employeeAbsences.startDate, selectedDate), gte(employeeAbsences.endDate, selectedDate)))
      .orderBy(asc(employees.lastName), asc(employees.firstName)),
    db.select().from(schedulePublications).where(eq(schedulePublications.date, selectedDate)).limit(1)
  ]);

  const absentEmployeeIds = new Set(absenceRows.map((row) => row.employeeId).filter(Boolean));
  const visibleActualRows = actualRows.filter((row) => !row.employeeId || !absentEmployeeIds.has(row.employeeId));
  const grouped = Map.groupBy(visibleActualRows, (row) => row.dutyTypeName || "Без тип");
  const isPublished = Boolean(publication?.publishedAt && !publication.invalidatedAt);
  const isConfirmed = Boolean(publication?.confirmedAt);

  return (
    <AppShell>
      <SectionHeader title="График" description="Реални назначения, отсъстващи и публикация за избраната дата." />

      <form className="mb-5 flex flex-wrap items-end gap-3 rounded border border-rail-line bg-white p-4 shadow-panel">
        <div>
          <label className="block text-sm font-medium" htmlFor="date">Дата</label>
          <input id="date" name="date" type="date" defaultValue={selectedDate} className="mt-1 h-10 rounded border border-rail-line px-3 outline-none focus:border-rail-route" />
        </div>
        <button className="h-10 rounded bg-rail-ink px-4 text-sm font-medium text-white hover:bg-slate-700">Покажи</button>
        <Link href="/actual-duties" className="inline-flex h-10 items-center rounded border border-rail-line px-4 text-sm font-medium hover:bg-slate-100">
          Реални повески
        </Link>
        <Link href={`/schedule/${selectedDate}`} className="inline-flex h-10 items-center rounded border border-rail-line px-4 text-sm font-medium hover:bg-slate-100">
          Детайли за деня
        </Link>
        <span className={isConfirmed ? "rounded bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700" : isPublished ? "rounded bg-sky-50 px-3 py-2 text-sm font-medium text-sky-700" : "rounded bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600"}>
          {isConfirmed ? "Потвърден" : isPublished ? "Публикуван" : "Чернова"}
        </span>
      </form>

      <div className="mb-5 flex flex-wrap gap-3">
        <form action={publishScheduleAction}>
          <input type="hidden" name="date" value={selectedDate} />
          <button className="h-10 rounded bg-rail-route px-4 text-sm font-medium text-white hover:bg-emerald-800">Публикувай</button>
        </form>
        <form action={confirmScheduleAction}>
          <input type="hidden" name="date" value={selectedDate} />
          <button className="h-10 rounded border border-rail-line bg-white px-4 text-sm font-medium hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50" disabled={!isPublished}>
            Потвърди
          </button>
        </form>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <section className="space-y-5">
          {[...grouped.entries()].length ? [...grouped.entries()].map(([typeName, rows]) => (
            <div key={typeName} className="overflow-hidden rounded border border-rail-line bg-white shadow-panel">
              <div className="border-b border-rail-line px-4 py-3">
                <h3 className="text-base font-semibold">{typeName}</h3>
                <p className="text-sm text-slate-600">Реални назначения: {rows.length}</p>
              </div>
              <div className="grid gap-px bg-rail-line md:grid-cols-2 xl:grid-cols-3">
                {[...Map.groupBy(rows, (row) => row.dutyId ?? row.dutyName ?? row.id).entries()].map(([dutyKey, dutyRows]) => {
                  const base = dutyRows[0];

                  return (
                    <article key={dutyKey} className="bg-white p-4">
                      <h4 className="font-semibold">{base?.dutyName ?? "-"}</h4>
                      <p className="mt-1 text-sm text-slate-600">
                        {asTime(base?.startTimeOverride ?? null) || asTime(base?.dutyStartTime ?? null)} - {asTime(base?.endTimeOverride ?? null) || asTime(base?.dutyEndTime ?? null)}
                      </p>
                      <div className="mt-4 grid gap-2">
                        {(["chief", "conductor"] as const).map((role) => {
                          const assigned = dutyRows.find((row) => row.assignmentRole === role);

                          return (
                            <div key={role} className="rounded border border-rail-line bg-slate-50 px-3 py-2">
                              <p className="text-xs font-medium text-slate-500">{roleLabels[role]}</p>
                              <p className="mt-1 text-sm font-semibold">{assigned ? [assigned.employeeFirstName, assigned.employeeLastName].filter(Boolean).join(" ") || "-" : "-"}</p>
                              {assigned?.startTimeOverride || assigned?.endTimeOverride ? <p className="mt-1 text-xs text-rail-signal">коригирано</p> : null}
                            </div>
                          );
                        })}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )) : (
            <div className="rounded border border-dashed border-rail-line bg-white px-4 py-12 text-center text-sm text-slate-500">
              Няма реални назначения за {selectedDate}.
            </div>
          )}
        </section>

        <aside className="rounded border border-rail-line bg-white shadow-panel">
          <div className="border-b border-rail-line px-4 py-3">
            <h3 className="text-base font-semibold">Отсъстващи</h3>
            <p className="text-sm text-slate-600">За {selectedDate}: {absenceRows.length}</p>
          </div>
          <div className="divide-y divide-rail-line">
            {absenceRows.length ? absenceRows.map((row) => (
              <article key={row.id} className="p-4 text-sm">
                <p className="font-medium">{[row.employeeFirstName, row.employeeLastName].filter(Boolean).join(" ") || "-"}</p>
                <p className="mt-1 text-slate-600">{row.reasonName ?? "-"}</p>
                <p className="mt-1 text-xs text-slate-500">{row.startDate} - {row.endDate}</p>
              </article>
            )) : <p className="p-4 text-sm text-slate-500">Няма отсъстващи за избраната дата.</p>}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
