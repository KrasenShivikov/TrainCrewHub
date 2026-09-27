import Link from "next/link";
import { asc, and, eq, gte, lte } from "drizzle-orm";

import { AppShell } from "@/components/app-shell";
import { PlanSchedulePdfButton, type PlanSchedulePdfDuty } from "@/components/plan-schedule-pdf-button";
import { SectionHeader } from "@/components/section-header";
import { getDb } from "@/db";
import { absenceReasons, duties, dutyTypes, employeeAbsences, employees, plannedDuties } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { loadDutiesForScheduleDate } from "@/lib/schedule-duties";

const roleLabels = {
  chief: "Началник влак",
  conductor: "Кондуктор"
};

type DutyCardRow = {
  dutyIsSecondDay: boolean | null;
  dutyStartTime: string | null;
  dutyName: string | null;
};

function compareDutyCardRows(left: DutyCardRow | undefined, right: DutyCardRow | undefined) {
  const leftSecondDay = Boolean(left?.dutyIsSecondDay);
  const rightSecondDay = Boolean(right?.dutyIsSecondDay);
  if (leftSecondDay !== rightSecondDay) {
    return leftSecondDay ? 1 : -1;
  }

  const leftStart = left?.dutyStartTime ?? "";
  const rightStart = right?.dutyStartTime ?? "";
  if (leftStart !== rightStart) {
    return leftStart.localeCompare(rightStart);
  }

  return (left?.dutyName ?? "").localeCompare(right?.dutyName ?? "");
}

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

  const [plannedRows, absenceRows, scheduleDuties] = await Promise.all([
    db
      .select({
        id: plannedDuties.id,
        date: plannedDuties.date,
        dutyId: plannedDuties.dutyId,
        employeeId: plannedDuties.employeeId,
        assignmentRole: plannedDuties.assignmentRole,
        employeeFirstName: employees.firstName,
        employeeLastName: employees.lastName,
        dutyName: duties.name,
        dutyStartTime: duties.startTime,
        dutyEndTime: duties.endTime,
        dutyIsSecondDay: duties.isSecondDay,
        dutyTypeName: dutyTypes.name
      })
      .from(plannedDuties)
      .leftJoin(employees, eq(plannedDuties.employeeId, employees.id))
      .leftJoin(duties, eq(plannedDuties.dutyId, duties.id))
      .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
      .where(eq(plannedDuties.date, selectedDate))
      .orderBy(asc(dutyTypes.name), asc(duties.isSecondDay), asc(duties.startTime), asc(duties.displayOrder), asc(duties.name)),
    db
      .select({
        id: employeeAbsences.id,
        employeeId: employeeAbsences.employeeId,
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
      .orderBy(asc(employees.lastName), asc(employees.firstName)),
    loadDutiesForScheduleDate(selectedDate)
  ]);

  const absentEmployeeIds = new Set(absenceRows.map((row) => row.employeeId).filter(Boolean));
  const visiblePlannedRows = plannedRows.filter((row) => !row.employeeId || !absentEmployeeIds.has(row.employeeId));
  const scheduledDutyRows = scheduleDuties.map((duty) => ({
    id: `schedule-duty-${duty.id}`,
    date: selectedDate,
    dutyId: duty.id,
    employeeId: null,
    assignmentRole: null,
    employeeFirstName: null,
    employeeLastName: null,
    dutyName: duty.name,
    dutyStartTime: duty.startTime,
    dutyEndTime: duty.endTime,
    dutyIsSecondDay: duty.isSecondDay,
    dutyTypeName: duty.dutyTypeName
  }));
  const scheduledDutyIds = new Set(scheduleDuties.map((duty) => duty.id));
  const plannedRowsOutsideScheduleKeys = visiblePlannedRows.filter((row) => row.dutyId && !scheduledDutyIds.has(row.dutyId));
  const plannedRowsForScheduleKeys = visiblePlannedRows.filter((row) => row.dutyId && scheduledDutyIds.has(row.dutyId));
  const grouped = Map.groupBy([...scheduledDutyRows, ...plannedRowsOutsideScheduleKeys, ...plannedRowsForScheduleKeys], (row) => row.dutyTypeName || "Без тип");

  const pdfDuties = [...grouped.entries()].flatMap(([typeName, rows]) =>
    [...Map.groupBy(rows, (row) => row.dutyId ?? row.dutyName ?? row.id).entries()].map(([dutyKey, dutyRows]) => {
      const first = dutyRows[0];
      const employeeName = (row: (typeof dutyRows)[number]) => [row.employeeFirstName, row.employeeLastName].filter(Boolean).join(" ");
      const pdfDuty: PlanSchedulePdfDuty & { classification: string; reportingTime: string; isSecondDay: boolean } = {
        id: String(dutyKey),
        name: first?.dutyName ?? "-",
        time: [first?.dutyStartTime?.slice(0, 5), first?.dutyEndTime?.slice(0, 5)].filter(Boolean).join(" - "),
        chiefs: dutyRows.filter((row) => row.assignmentRole === "chief").map(employeeName).filter(Boolean),
        conductors: dutyRows.filter((row) => row.assignmentRole === "conductor").map(employeeName).filter(Boolean),
        classification: `${typeName} ${first?.dutyName ?? ""}`.toLocaleLowerCase("bg"),
        reportingTime: first?.dutyStartTime?.slice(0, 5) ?? "",
        isSecondDay: Boolean(first?.dutyIsSecondDay)
      };
      return pdfDuty;
    })
  );
  const isBusinessTrip = (duty: (typeof pdfDuties)[number]) => duty.classification.includes("командиров");
  const isDayOff = (duty: (typeof pdfDuties)[number]) => ["свобод", "почив", "отпуск"].some((term) => duty.classification.includes(term));
  const businessTrips = pdfDuties.filter(isBusinessTrip);
  const daysOff = pdfDuties.filter((duty) => !isBusinessTrip(duty) && isDayOff(duty));
  const trainDuties = pdfDuties
    .filter((duty) => !isBusinessTrip(duty) && !isDayOff(duty))
    .sort((left, right) => {
      if (left.isSecondDay !== right.isSecondDay) return left.isSecondDay ? 1 : -1;
      if (!left.reportingTime && right.reportingTime) return 1;
      if (left.reportingTime && !right.reportingTime) return -1;
      return left.reportingTime.localeCompare(right.reportingTime) || left.name.localeCompare(right.name, "bg");
    });
  const pdfAbsences = absenceRows.map((row) => ({
    id: row.id,
    employeeName: [row.employeeFirstName, row.employeeLastName].filter(Boolean).join(" ") || "-",
    reason: row.reasonName ?? "-",
    period: `${row.startDate} - ${row.endDate}`,
    notes: row.notes ?? ""
  }));

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
        <PlanSchedulePdfButton
          date={selectedDate}
          trainDuties={trainDuties}
          businessTrips={businessTrips}
          daysOff={daysOff}
          absences={pdfAbsences}
        />
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
                {[...Map.groupBy(rows, (row) => row.dutyId ?? row.dutyName ?? row.id).entries()]
                  .sort(([, leftRows], [, rightRows]) => compareDutyCardRows(leftRows[0], rightRows[0]))
                  .map(([dutyKey, dutyRows]) => (
                  <article key={dutyKey} className="bg-white p-4">
                    <h4 className="font-semibold">{dutyRows[0]?.dutyName ?? "-"}</h4>
                    <p className="mt-1 text-sm text-slate-600">{dutyRows[0]?.dutyStartTime?.slice(0, 5)} - {dutyRows[0]?.dutyEndTime?.slice(0, 5)}</p>
                    <div className="mt-4 grid gap-2">
                      {(["chief", "conductor"] as const).map((role) => {
                        const assigned = dutyRows.find((row) => row.assignmentRole === role);

                        return (
                          <div key={role} className="rounded border border-rail-line bg-slate-50 px-3 py-2">
                            <p className="text-xs font-medium text-slate-500">{roleLabels[role]}</p>
                            <p className="mt-1 text-sm font-semibold">{assigned ? [assigned.employeeFirstName, assigned.employeeLastName].filter(Boolean).join(" ") || "-" : "-"}</p>
                          </div>
                        );
                      })}
                    </div>
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
