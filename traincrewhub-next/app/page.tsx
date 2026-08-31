import Link from "next/link";
import type { Route } from "next";
import { asc, and, desc, eq, gte, lte } from "drizzle-orm";
import { AlertTriangle, BadgeCheck, CalendarDays, Clock3, FileWarning, UserRoundX } from "lucide-react";

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
  positions,
  scheduleChangeEvents,
  schedulePublications
} from "@/db/schema";
import { requireUser } from "@/lib/auth/session";

const roleLabels = {
  chief: "Началник влак",
  conductor: "Кондуктор"
};

function todayInSofia() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Sofia",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

function asTime(value: string | null) {
  return value ? value.slice(0, 5) : "-";
}

function fullName(firstName: string | null, lastName: string | null) {
  return [firstName, lastName].filter(Boolean).join(" ") || "-";
}

function documentWarning(label: string, value: string | Date | null) {
  if (!value) return `${label}: липсва дата.`;

  const today = new Date(todayInSofia());
  const expiry = new Date(String(value).slice(0, 10));
  const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / 86_400_000);

  if (diffDays < 0) return `${label}: изтекъл.`;
  if (diffDays <= 30) return `${label}: изтича след ${diffDays} дни.`;
  return null;
}

export default async function HomePage() {
  await requireUser();

  const today = todayInSofia();
  const db = getDb();

  const [actualRows, absenceRows, [publication], changeRows, employeeRows] = await Promise.all([
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
        dutyTypeName: dutyTypes.name
      })
      .from(actualDuties)
      .leftJoin(employees, eq(actualDuties.employeeId, employees.id))
      .leftJoin(duties, eq(actualDuties.dutyId, duties.id))
      .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
      .where(eq(actualDuties.date, today))
      .orderBy(asc(dutyTypes.name), asc(duties.displayOrder), asc(duties.startTime)),
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
      .where(and(lte(employeeAbsences.startDate, today), gte(employeeAbsences.endDate, today)))
      .orderBy(asc(employees.lastName), asc(employees.firstName)),
    db.select().from(schedulePublications).where(eq(schedulePublications.date, today)).limit(1),
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
      .orderBy(desc(scheduleChangeEvents.createdAt))
      .limit(8),
    db
      .select({
        id: employees.id,
        firstName: employees.firstName,
        lastName: employees.lastName,
        isActive: employees.isActive,
        positionTitle: positions.title,
        psychologicalAssessmentExpiry: employees.psychologicalAssessmentExpiry,
        medicalCertificateExpiry: employees.medicalCertificateExpiry,
        licenseExpiry: employees.licenseExpiry
      })
      .from(employees)
      .leftJoin(positions, eq(employees.positionId, positions.id))
      .orderBy(asc(employees.lastName), asc(employees.firstName))
  ]);

  const byDuty = Map.groupBy(actualRows.filter((row) => row.dutyId), (row) => row.dutyId as string);
  const scheduleWarnings = [
    ...(!publication?.publishedAt || publication.invalidatedAt ? ["Днешният график още не е публикуван."] : []),
    ...(publication?.publishedAt && !publication.confirmedAt && !publication.invalidatedAt ? ["Днешният график е публикуван, но не е потвърден."] : []),
    ...[...byDuty.entries()].flatMap(([, rows]) => {
      const roles = new Set(rows.map((row) => row.assignmentRole));
      const dutyName = rows[0]?.dutyName ?? "Повеска";
      return [
        ...(roles.has("chief") ? [] : [`${dutyName}: липсва началник влак.`]),
        ...(roles.has("conductor") ? [] : [`${dutyName}: липсва кондуктор.`])
      ];
    }),
    ...actualRows.flatMap((row) => row.employeeIsActive === false ? [`${fullName(row.employeeFirstName, row.employeeLastName)} е неактивен служител.`] : [])
  ];

  const documentWarnings = employeeRows.flatMap((employee) => {
    const employeeName = fullName(employee.firstName, employee.lastName);
    return [
      documentWarning(`${employeeName} - психологическо`, employee.psychologicalAssessmentExpiry),
      documentWarning(`${employeeName} - медицинско`, employee.medicalCertificateExpiry),
      documentWarning(`${employeeName} - лиценз`, employee.licenseExpiry)
    ].filter(Boolean).map((text) => ({ employeeId: employee.id, text: text as string }));
  });
  const inactiveCount = employeeRows.filter((employee) => employee.isActive === false).length;
  const statusLabel = publication?.confirmedAt && !publication.invalidatedAt ? "Потвърден" : publication?.publishedAt && !publication.invalidatedAt ? "Публикуван" : "Чернова";
  const todayScheduleHref = `/schedule/${today}` as Route;

  return (
    <AppShell>
      <SectionHeader title="Работен плот" description={`Оперативен обзор за ${today}: график, предупреждения, отсъствия и последни промени.`} />

      <div className="mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Stat href={todayScheduleHref} icon={<CalendarDays className="h-5 w-5" />} label="Днешен график" value={statusLabel} />
        <Stat href="/actual-duties" icon={<Clock3 className="h-5 w-5" />} label="Реални повески" value={String(actualRows.length)} />
        <Stat href="/employee-absences" icon={<UserRoundX className="h-5 w-5" />} label="Отсъстващи" value={String(absenceRows.length)} />
        <Stat href="/employees" icon={<FileWarning className="h-5 w-5" />} label="Документи" value={String(documentWarnings.length)} />
        <Stat href="/employees" icon={<AlertTriangle className="h-5 w-5" />} label="Неактивни" value={String(inactiveCount)} />
      </div>

      {(scheduleWarnings.length || documentWarnings.length) ? (
        <section className="mb-5 rounded border border-amber-200 bg-amber-50 p-4 text-amber-900">
          <div className="flex items-center gap-2 font-semibold">
            <AlertTriangle className="h-5 w-5" />
            Предупреждения
          </div>
          <div className="mt-3 grid gap-3 xl:grid-cols-2">
            <WarningGroup title="График" items={[...new Set(scheduleWarnings)]} emptyText="Няма предупреждения за днешния график." />
            <WarningGroup title="Документи" items={documentWarnings.slice(0, 8).map((item) => item.text)} emptyText="Няма изтичащи или липсващи валидности." />
          </div>
        </section>
      ) : null}

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <section className="space-y-5">
          <Panel title="Днешни реални повески" count={actualRows.length} href={todayScheduleHref}>
            {actualRows.length ? actualRows.slice(0, 9).map((row) => (
              <article key={row.id} className="grid gap-3 border-b border-rail-line px-4 py-3 text-sm last:border-b-0 md:grid-cols-[140px_1fr_150px]">
                <div className="font-medium">{asTime(row.startTimeOverride ?? row.dutyStartTime)} - {asTime(row.endTimeOverride ?? row.dutyEndTime)}</div>
                <div>
                  {row.dutyId ? <Link href={`/duties/${row.dutyId}`} className="font-medium text-rail-route hover:underline">{row.dutyName ?? "-"}</Link> : <span className="font-medium">{row.dutyName ?? "-"}</span>}
                  <div className="mt-1 text-xs text-slate-500">{row.dutyTypeName ?? "Без тип"}</div>
                </div>
                <div>
                  {row.employeeId ? <Link href={`/employees/${row.employeeId}`} className="text-rail-route hover:underline">{fullName(row.employeeFirstName, row.employeeLastName)}</Link> : fullName(row.employeeFirstName, row.employeeLastName)}
                  <div className="mt-1 text-xs text-slate-500">{roleLabels[(row.assignmentRole ?? "conductor") as keyof typeof roleLabels]}</div>
                </div>
              </article>
            )) : <Empty text="Няма реални назначения за днес." />}
          </Panel>

          <Panel title="Последни промени" count={changeRows.length} href={todayScheduleHref}>
            {changeRows.length ? changeRows.map((row) => (
              <article key={row.id} className="border-b border-rail-line px-4 py-3 text-sm last:border-b-0">
                <div className="font-medium">{row.action}</div>
                <div className="mt-1 text-slate-600">{row.dutyName ?? "-"} · {fullName(row.employeeFirstName, row.employeeLastName)}</div>
                <div className="mt-1 text-xs text-slate-500">{row.createdAt ? row.createdAt.toLocaleString("bg-BG") : "-"}</div>
              </article>
            )) : <Empty text="Няма записани промени." />}
          </Panel>
        </section>

        <aside className="grid content-start gap-5">
          <Panel title="Отсъстващи днес" count={absenceRows.length} href="/employee-absences">
            {absenceRows.length ? absenceRows.map((row) => (
              <article key={row.id} className="border-b border-rail-line px-4 py-3 text-sm last:border-b-0">
                {row.employeeId ? <Link href={`/employees/${row.employeeId}`} className="font-medium text-rail-route hover:underline">{fullName(row.employeeFirstName, row.employeeLastName)}</Link> : <p className="font-medium">{fullName(row.employeeFirstName, row.employeeLastName)}</p>}
                <p className="mt-1 text-slate-600">{row.reasonName ?? "-"}</p>
                <p className="mt-1 text-xs text-slate-500">{row.startDate} - {row.endDate}</p>
              </article>
            )) : <Empty text="Няма отсъстващи днес." />}
          </Panel>

          <Panel title="Документи за внимание" count={documentWarnings.length} href="/employees">
            {documentWarnings.length ? documentWarnings.slice(0, 8).map((item) => (
              <Link key={`${item.employeeId}-${item.text}`} href={`/employees/${item.employeeId}`} className="block border-b border-rail-line px-4 py-3 text-sm text-rail-route hover:bg-slate-50 last:border-b-0">
                {item.text}
              </Link>
            )) : <Empty text="Няма документи за внимание." />}
          </Panel>
        </aside>
      </div>
    </AppShell>
  );
}

function Stat({ href, icon, label, value }: { href: Route; icon: React.ReactNode; label: string; value: string }) {
  return (
    <Link href={href} className="rounded border border-rail-line bg-white p-4 shadow-panel hover:border-rail-route">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-600">{label}</span>
        <span className="text-rail-route">{icon}</span>
      </div>
      <div className="mt-3 text-2xl font-semibold text-rail-ink">{value}</div>
    </Link>
  );
}

function WarningGroup({ title, items, emptyText }: { title: string; items: string[]; emptyText: string }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      {items.length ? <ul className="mt-2 space-y-1 text-sm">{items.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="mt-2 text-sm">{emptyText}</p>}
    </div>
  );
}

function Panel({ title, count, href, children }: { title: string; count: number; href: Route; children: React.ReactNode }) {
  return (
    <section className="overflow-hidden rounded border border-rail-line bg-white shadow-panel">
      <div className="flex items-center justify-between gap-3 border-b border-rail-line px-4 py-3">
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="text-sm text-slate-600">Общо: {count}</p>
        </div>
        <Link href={href} className="inline-flex h-9 items-center rounded border border-rail-line px-3 text-sm font-medium hover:bg-slate-100">
          Отвори
        </Link>
      </div>
      {children}
    </section>
  );
}

function Empty({ text }: { text: string }) {
  return <div className="px-4 py-8 text-center text-sm text-slate-500">{text}</div>;
}
