import Link from "next/link";
import { asc, and, eq, gte, lte } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

import { AppShell } from "@/components/app-shell";
import { ScheduleAssignmentBoard } from "@/components/schedule-assignment-board";
import { SectionHeader } from "@/components/section-header";
import { getDb } from "@/db";
import {
  absenceReasons,
  actualDuties,
  duties,
  dutyTypes,
  employeeAbsences,
  employees,
  positions,
  schedulePublications
} from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { assignMissingActualDutyAction, confirmScheduleAction, publishScheduleAction, restoreActualDutyOriginalAction } from "./actions";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
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
  const originalEmployees = alias(employees, "original_employees");

  const [actualRows, absenceRows, [publication], employeeRows] = await Promise.all([
    db
      .select({
        id: actualDuties.id,
        date: actualDuties.date,
        dutyId: actualDuties.dutyId,
        employeeId: actualDuties.employeeId,
        assignmentRole: actualDuties.assignmentRole,
        originalEmployeeId: actualDuties.originalEmployeeId,
        originalAssignmentRole: actualDuties.originalAssignmentRole,
        startTimeOverride: actualDuties.startTimeOverride,
        endTimeOverride: actualDuties.endTimeOverride,
        employeeFirstName: employees.firstName,
        employeeLastName: employees.lastName,
        originalEmployeeFirstName: originalEmployees.firstName,
        originalEmployeeLastName: originalEmployees.lastName,
        dutyName: duties.name,
        dutyStartTime: duties.startTime,
        dutyEndTime: duties.endTime,
        dutyIsSecondDay: duties.isSecondDay,
        dutyTypeName: dutyTypes.name
      })
      .from(actualDuties)
      .leftJoin(employees, eq(actualDuties.employeeId, employees.id))
      .leftJoin(originalEmployees, eq(actualDuties.originalEmployeeId, originalEmployees.id))
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
    ,
    db
      .select({
        id: employees.id,
        firstName: employees.firstName,
        lastName: employees.lastName,
        positionTitle: positions.title
      })
      .from(employees)
      .leftJoin(positions, eq(employees.positionId, positions.id))
      .where(eq(employees.isActive, true))
      .orderBy(asc(employees.lastName), asc(employees.firstName))
  ]);

  const absentEmployeeIds = new Set(absenceRows.map((row) => row.employeeId).filter(Boolean));
  const assignedEmployeeIds = new Set(actualRows.map((row) => row.employeeId).filter(Boolean));
  const visibleActualRows = actualRows.filter((row) => !row.employeeId || !absentEmployeeIds.has(row.employeeId));
  const visibleDutyKeys = new Set(visibleActualRows.map((row) => row.dutyId ?? row.dutyName ?? row.id));
  const placeholderDutyKeys = new Set<string>();
  const boardRows = actualRows.flatMap((row) => {
    const dutyKey = row.dutyId ?? row.dutyName ?? row.id;

    if (!row.employeeId || !absentEmployeeIds.has(row.employeeId)) {
      return [row];
    }

    if (visibleDutyKeys.has(dutyKey) || placeholderDutyKeys.has(dutyKey)) {
      return [];
    }

    placeholderDutyKeys.add(dutyKey);

    return [{
      ...row,
      id: `placeholder-${row.id}`,
      employeeId: null,
      assignmentRole: null,
      startTimeOverride: null,
      endTimeOverride: null,
      employeeFirstName: null,
      employeeLastName: null
    }];
  });
  const availableEmployees = employeeRows.filter((row) => !absentEmployeeIds.has(row.id) && !assignedEmployeeIds.has(row.id));
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
        <ScheduleAssignmentBoard
          date={selectedDate}
          assignments={boardRows}
          employees={availableEmployees}
          assignAction={assignMissingActualDutyAction}
          restoreAction={restoreActualDutyOriginalAction}
        />

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
