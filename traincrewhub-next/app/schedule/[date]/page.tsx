import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, and, desc, eq, gte, lte } from "drizzle-orm";
import { AlertTriangle, ArrowLeft, BadgeCheck, CalendarDays, Clock3, Send, UserRoundX } from "lucide-react";

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
  scheduleChangeEvents,
  schedulePublications
} from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { confirmScheduleAction, publishScheduleAction } from "../actions";

const roleLabels = {
  chief: "Началник влак",
  conductor: "Кондуктор"
};

function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function asTime(value: string | null) {
  return value ? value.slice(0, 5) : "-";
}

function fullName(firstName: string | null, lastName: string | null) {
  return [firstName, lastName].filter(Boolean).join(" ") || "-";
}

function publicationStatus(publication: { publishedAt: Date | null; confirmedAt: Date | null; invalidatedAt: Date | null } | undefined) {
  if (publication?.confirmedAt && !publication.invalidatedAt) {
    return { label: "Потвърден", className: "bg-emerald-50 text-emerald-700" };
  }
  if (publication?.publishedAt && !publication.invalidatedAt) {
    return { label: "Публикуван", className: "bg-sky-50 text-sky-700" };
  }
  return { label: "Чернова", className: "bg-slate-100 text-slate-600" };
}

export default async function ScheduleDatePage({ params }: { params: Promise<{ date: string }> }) {
  await requirePermission("actual_duties", "view");
  const { date } = await params;
  if (!isIsoDate(date)) notFound();

  const db = getDb();
  const [actualRows, absenceRows, [publication], changeRows] = await Promise.all([
    db
      .select({
        id: actualDuties.id,
        assignmentRole: actualDuties.assignmentRole,
        startTimeOverride: actualDuties.startTimeOverride,
        endTimeOverride: actualDuties.endTimeOverride,
        dutyId: actualDuties.dutyId,
        employeeId: actualDuties.employeeId,
        employeeFirstName: employees.firstName,
        employeeLastName: employees.lastName,
        employeeIsActive: employees.isActive,
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
      .where(eq(actualDuties.date, date))
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
      .where(and(lte(employeeAbsences.startDate, date), gte(employeeAbsences.endDate, date)))
      .orderBy(asc(employees.lastName), asc(employees.firstName)),
    db.select().from(schedulePublications).where(eq(schedulePublications.date, date)).limit(1),
    db
      .select({
        id: scheduleChangeEvents.id,
        action: scheduleChangeEvents.action,
        createdAt: scheduleChangeEvents.createdAt,
        employeeFirstName: employees.firstName,
        employeeLastName: employees.lastName,
        dutyName: duties.name
      })
      .from(scheduleChangeEvents)
      .leftJoin(employees, eq(scheduleChangeEvents.employeeId, employees.id))
      .leftJoin(duties, eq(scheduleChangeEvents.dutyId, duties.id))
      .where(eq(scheduleChangeEvents.date, date))
      .orderBy(desc(scheduleChangeEvents.createdAt))
      .limit(12)
  ]);

  const absentEmployeeIds = new Set(absenceRows.map((row) => row.employeeId).filter(Boolean));
  const visibleActualRows = actualRows.filter((row) => !row.employeeId || !absentEmployeeIds.has(row.employeeId));
  const grouped = Map.groupBy(visibleActualRows, (row) => row.dutyTypeName || "Без тип");
  const byDuty = Map.groupBy(visibleActualRows.filter((row) => row.dutyId), (row) => row.dutyId as string);
  const status = publicationStatus(publication);
  const isPublished = Boolean(publication?.publishedAt && !publication.invalidatedAt);
  const isConfirmed = Boolean(publication?.confirmedAt && !publication.invalidatedAt);
  const warningItems = [
    ...(!isPublished ? ["Денят още е чернова и не е публикуван."] : []),
    ...(isPublished && !isConfirmed ? ["Графикът е публикуван, но още не е потвърден."] : []),
    ...[...byDuty.entries()].flatMap(([, rows]) => {
      const roles = new Set(rows.map((row) => row.assignmentRole));
      const dutyName = rows[0]?.dutyName ?? "Повеска";
      return [
        ...(roles.has("chief") ? [] : [`${dutyName}: липсва началник влак.`]),
        ...(roles.has("conductor") ? [] : [`${dutyName}: липсва кондуктор.`])
      ];
    }),
    ...visibleActualRows.flatMap((row) => row.employeeIsActive === false ? [`${fullName(row.employeeFirstName, row.employeeLastName)} е неактивен служител.`] : []),
    ...visibleActualRows.flatMap((row) => row.startTimeOverride || row.endTimeOverride ? [`${row.dutyName ?? "Повеска"} има коригирани часове.`] : [])
  ];

  return (
    <AppShell>
      <div className="mb-4 flex flex-wrap gap-3">
        <Link href={`/schedule?date=${date}`} className="inline-flex h-10 items-center gap-2 rounded border border-rail-line px-3 text-sm font-medium hover:bg-slate-100">
          <ArrowLeft className="h-4 w-4" />
          График
        </Link>
        <Link href="/actual-duties" className="inline-flex h-10 items-center rounded border border-rail-line px-3 text-sm font-medium hover:bg-slate-100">Реални повески</Link>
      </div>

      <SectionHeader title={`График за ${date}`} description="Детайлен дневен преглед на реални повески, отсъствия, публикация и промени." />

      {warningItems.length ? <WarningList title="Проверки за деня" items={[...new Set(warningItems)]} /> : null}

      <section className="mb-5 rounded border border-rail-line bg-white p-4 shadow-panel">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span className={`rounded px-3 py-2 text-sm font-medium ${status.className}`}>{status.label}</span>
            <span className="rounded bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">Назначения: {visibleActualRows.length}</span>
            <span className="rounded bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">Отсъстващи: {absenceRows.length}</span>
            <span className={warningItems.length ? "rounded bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800" : "rounded bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700"}>
              Предупреждения: {new Set(warningItems).size}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <form action={publishScheduleAction}>
              <input type="hidden" name="date" value={date} />
              <button className="inline-flex h-10 items-center gap-2 rounded bg-rail-route px-4 text-sm font-medium text-white hover:bg-emerald-800">
                <Send className="h-4 w-4" />
                Публикувай
              </button>
            </form>
            <form action={confirmScheduleAction}>
              <input type="hidden" name="date" value={date} />
              <button className="inline-flex h-10 items-center gap-2 rounded border border-rail-line bg-white px-4 text-sm font-medium hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50" disabled={!isPublished}>
                <BadgeCheck className="h-4 w-4" />
                Потвърди
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <section className="space-y-5">
          {[...grouped.entries()].length ? [...grouped.entries()].map(([typeName, rows]) => (
            <div key={typeName} className="overflow-hidden rounded border border-rail-line bg-white shadow-panel">
              <Header title={typeName} count={rows.length} />
              <div className="grid gap-px bg-rail-line md:grid-cols-2 xl:grid-cols-3">
                {rows.map((row) => (
                  <article key={row.id} className="bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {row.dutyId ? <Link href={`/duties/${row.dutyId}`} className="font-semibold text-rail-route hover:underline">{row.dutyName ?? "-"}</Link> : <h4 className="font-semibold">{row.dutyName ?? "-"}</h4>}
                        <p className="mt-1 inline-flex items-center gap-1 text-sm text-slate-600">
                          <Clock3 className="h-4 w-4" />
                          {asTime(row.startTimeOverride ?? row.dutyStartTime)} - {asTime(row.endTimeOverride ?? row.dutyEndTime)}
                        </p>
                      </div>
                      <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{roleLabels[(row.assignmentRole ?? "conductor") as keyof typeof roleLabels]}</span>
                    </div>
                    {row.employeeId ? <Link href={`/employees/${row.employeeId}`} className="mt-4 block text-sm font-medium text-rail-route hover:underline">{fullName(row.employeeFirstName, row.employeeLastName)}</Link> : <p className="mt-4 text-sm font-medium">{fullName(row.employeeFirstName, row.employeeLastName)}</p>}
                    {row.employeeIsActive === false ? <p className="mt-2 text-xs font-medium text-red-700">Неактивен служител</p> : null}
                    {(row.startTimeOverride || row.endTimeOverride) ? <p className="mt-2 text-xs font-medium text-rail-signal">Коригирани часове</p> : null}
                  </article>
                ))}
              </div>
            </div>
          )) : <div className="rounded border border-dashed border-rail-line bg-white px-4 py-12 text-center text-sm text-slate-500">Няма реални назначения за {date}.</div>}
        </section>

        <aside className="grid content-start gap-5">
          <section className="rounded border border-rail-line bg-white shadow-panel">
            <Header title="Отсъстващи" count={absenceRows.length} />
            <div className="divide-y divide-rail-line">
              {absenceRows.length ? absenceRows.map((row) => (
                <article key={row.id} className="p-4 text-sm">
                  {row.employeeId ? <Link href={`/employees/${row.employeeId}`} className="font-medium text-rail-route hover:underline">{fullName(row.employeeFirstName, row.employeeLastName)}</Link> : <p className="font-medium">{fullName(row.employeeFirstName, row.employeeLastName)}</p>}
                  <p className="mt-1 text-slate-600">{row.reasonName ?? "-"}</p>
                  <p className="mt-1 text-xs text-slate-500">{row.startDate} - {row.endDate}</p>
                  {row.notes ? <p className="mt-2 text-xs text-slate-600">{row.notes}</p> : null}
                </article>
              )) : <Empty icon={<UserRoundX className="h-4 w-4" />} text="Няма отсъстващи за тази дата." />}
            </div>
          </section>

          <section className="rounded border border-rail-line bg-white shadow-panel">
            <Header title="История" count={changeRows.length} />
            <div className="divide-y divide-rail-line">
              {changeRows.length ? changeRows.map((row) => (
                <article key={row.id} className="p-4 text-sm">
                  <p className="font-medium">{row.action}</p>
                  <p className="mt-1 text-slate-600">{row.dutyName ?? "-"} · {fullName(row.employeeFirstName, row.employeeLastName)}</p>
                  <p className="mt-1 text-xs text-slate-500">{row.createdAt ? row.createdAt.toLocaleString("bg-BG") : "-"}</p>
                </article>
              )) : <Empty icon={<CalendarDays className="h-4 w-4" />} text="Няма записани промени." />}
            </div>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}

function WarningList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mb-5 rounded border border-amber-200 bg-amber-50 p-4 text-amber-900">
      <div className="flex items-center gap-2 font-semibold">
        <AlertTriangle className="h-5 w-5" />
        {title}
      </div>
      <ul className="mt-2 space-y-1 text-sm">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

function Header({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center justify-between border-b border-rail-line px-4 py-3">
      <h3 className="text-base font-semibold">{title}</h3>
      <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">{count}</span>
    </div>
  );
}

function Empty({ icon, text }: { icon: React.ReactNode; text: string }) {
  return <div className="flex items-center justify-center gap-2 px-4 py-8 text-sm text-slate-500">{icon}{text}</div>;
}
