import Link from "next/link";
import { asc, and, eq, gte, lte } from "drizzle-orm";

import { AppShell } from "@/components/app-shell";
import { SectionHeader } from "@/components/section-header";
import { getDb } from "@/db";
import { absenceReasons, duties, dutyTypes, employeeAbsences, employees, plannedDuties } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";

const roleLabels = {
  chief: "Началник влак",
  conductor: "Кондуктор"
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export default async function PlanSchedulePage({
  searchParams
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  await requirePermission("planned_duties", "view");
  const params = await searchParams;
  const selectedDate = params.date || todayIso();
  const db = getDb();

  const [plannedRows, absenceRows] = await Promise.all([
    db
      .select({
        id: plannedDuties.id,
        date: plannedDuties.date,
        assignmentRole: plannedDuties.assignmentRole,
        employeeFirstName: employees.firstName,
        employeeLastName: employees.lastName,
        dutyName: duties.name,
        dutyStartTime: duties.startTime,
        dutyEndTime: duties.endTime,
        dutyTypeName: dutyTypes.name
      })
      .from(plannedDuties)
      .leftJoin(employees, eq(plannedDuties.employeeId, employees.id))
      .leftJoin(duties, eq(plannedDuties.dutyId, duties.id))
      .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
      .where(eq(plannedDuties.date, selectedDate))
      .orderBy(asc(dutyTypes.name), asc(duties.displayOrder), asc(duties.name)),
    db
      .select({
        id: employeeAbsences.id,
        startDate: employeeAbsences.startDate,
        endDate: employeeAbsences.endDate,
        notes: employeeAbsences.notes,
        employeeFirstName: employees.firstName,
        employeeLastName: employees.lastName,
        reasonName: absenceReasons.name
      })
      .from(employeeAbsences)
      .leftJoin(employees, eq(employeeAbsences.employeeId, employees.id))
      .leftJoin(absenceReasons, eq(employeeAbsences.reasonId, absenceReasons.id))
      .where(and(lte(employeeAbsences.startDate, selectedDate), gte(employeeAbsences.endDate, selectedDate)))
      .orderBy(asc(employees.lastName), asc(employees.firstName))
  ]);

  const grouped = Map.groupBy(plannedRows, (row) => row.dutyTypeName || "Без тип");

  return (
    <AppShell>
      <SectionHeader title="План-график" description="Преглед на планираните назначения и отсъствията за избрана дата." />

      <form className="mb-5 flex flex-wrap items-end gap-3 rounded border border-rail-line bg-white p-4 shadow-panel">
        <div>
          <label className="block text-sm font-medium" htmlFor="date">Дата</label>
          <input id="date" name="date" type="date" defaultValue={selectedDate} className="mt-1 h-10 rounded border border-rail-line px-3 outline-none focus:border-rail-route" />
        </div>
        <button className="h-10 rounded bg-rail-ink px-4 text-sm font-medium text-white hover:bg-slate-700">Покажи</button>
        <Link href="/planned-duties" className="inline-flex h-10 items-center rounded border border-rail-line px-4 text-sm font-medium hover:bg-slate-100">
          Планирани повески
        </Link>
      </form>

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <section className="space-y-5">
          {[...grouped.entries()].length ? [...grouped.entries()].map(([typeName, rows]) => (
            <div key={typeName} className="overflow-hidden rounded border border-rail-line bg-white shadow-panel">
              <div className="border-b border-rail-line px-4 py-3">
                <h3 className="text-base font-semibold">{typeName}</h3>
                <p className="text-sm text-slate-600">Назначения: {rows.length}</p>
              </div>
              <div className="grid gap-px bg-rail-line md:grid-cols-2 xl:grid-cols-3">
                {rows.map((row) => (
                  <article key={row.id} className="bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-semibold">{row.dutyName ?? "-"}</h4>
                        <p className="mt-1 text-sm text-slate-600">{row.dutyStartTime?.slice(0, 5)} - {row.dutyEndTime?.slice(0, 5)}</p>
                      </div>
                      <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                        {roleLabels[(row.assignmentRole ?? "conductor") as keyof typeof roleLabels]}
                      </span>
                    </div>
                    <p className="mt-4 text-sm font-medium">{[row.employeeFirstName, row.employeeLastName].filter(Boolean).join(" ") || "-"}</p>
                  </article>
                ))}
              </div>
            </div>
          )) : (
            <div className="rounded border border-dashed border-rail-line bg-white px-4 py-12 text-center text-sm text-slate-500">
              Няма планирани назначения за {selectedDate}.
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
                {row.notes ? <p className="mt-2 text-slate-600">{row.notes}</p> : null}
              </article>
            )) : <p className="p-4 text-sm text-slate-500">Няма отсъстващи за избраната дата.</p>}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
