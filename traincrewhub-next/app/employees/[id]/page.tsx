import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, desc, eq } from "drizzle-orm";
import { ArrowLeft, BadgeCheck, CalendarDays, CircleAlert, Clock3, UserRound } from "lucide-react";

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
  plannedDuties,
  positions
} from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";

const roleLabels = {
  chief: "Началник влак",
  conductor: "Кондуктор"
};

function asTime(value: string | null) {
  return value ? value.slice(0, 5) : "-";
}

function fullName(firstName: string | null, lastName: string | null) {
  return [firstName, lastName].filter(Boolean).join(" ") || "-";
}

function documentStatus(value: string | Date | null) {
  if (!value) {
    return { label: "Липсва дата", tone: "neutral" as const };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(String(value).slice(0, 10));
  const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / 86_400_000);

  if (diffDays < 0) {
    return { label: "Изтекъл", tone: "danger" as const };
  }

  if (diffDays <= 30) {
    return { label: `${diffDays} дни`, tone: "warning" as const };
  }

  return { label: `${diffDays} дни`, tone: "ok" as const };
}

function toneClass(tone: "ok" | "warning" | "danger" | "neutral") {
  return {
    ok: "border-emerald-200 bg-emerald-50 text-emerald-800",
    warning: "border-amber-200 bg-amber-50 text-amber-800",
    danger: "border-red-200 bg-red-50 text-red-800",
    neutral: "border-slate-200 bg-slate-50 text-slate-600"
  }[tone];
}

export default async function EmployeeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  await requirePermission("employees", "view");
  const { id } = await params;
  const db = getDb();

  const [employee] = await db
    .select({
      id: employees.id,
      firstName: employees.firstName,
      lastName: employees.lastName,
      photoUrl: employees.photoUrl,
      positionTitle: positions.title,
      isActive: employees.isActive,
      psychologicalAssessmentExpiry: employees.psychologicalAssessmentExpiry,
      medicalCertificateExpiry: employees.medicalCertificateExpiry,
      licenseExpiry: employees.licenseExpiry,
      createdAt: employees.createdAt
    })
    .from(employees)
    .leftJoin(positions, eq(employees.positionId, positions.id))
    .where(eq(employees.id, id))
    .limit(1);

  if (!employee) {
    notFound();
  }

  const [absenceRows, plannedRows, actualRows] = await Promise.all([
    db
      .select({
        id: employeeAbsences.id,
        startDate: employeeAbsences.startDate,
        endDate: employeeAbsences.endDate,
        notes: employeeAbsences.notes,
        reasonName: absenceReasons.name
      })
      .from(employeeAbsences)
      .leftJoin(absenceReasons, eq(employeeAbsences.reasonId, absenceReasons.id))
      .where(eq(employeeAbsences.employeeId, employee.id))
      .orderBy(desc(employeeAbsences.startDate))
      .limit(12),
    db
      .select({
        id: plannedDuties.id,
        date: plannedDuties.date,
        assignmentRole: plannedDuties.assignmentRole,
        dutyId: plannedDuties.dutyId,
        dutyName: duties.name,
        dutyStartTime: duties.startTime,
        dutyEndTime: duties.endTime,
        dutyTypeName: dutyTypes.name
      })
      .from(plannedDuties)
      .leftJoin(duties, eq(plannedDuties.dutyId, duties.id))
      .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
      .where(eq(plannedDuties.employeeId, employee.id))
      .orderBy(desc(plannedDuties.date), asc(duties.startTime))
      .limit(12),
    db
      .select({
        id: actualDuties.id,
        date: actualDuties.date,
        assignmentRole: actualDuties.assignmentRole,
        dutyId: actualDuties.dutyId,
        startTimeOverride: actualDuties.startTimeOverride,
        endTimeOverride: actualDuties.endTimeOverride,
        dutyName: duties.name,
        dutyStartTime: duties.startTime,
        dutyEndTime: duties.endTime,
        dutyTypeName: dutyTypes.name
      })
      .from(actualDuties)
      .leftJoin(duties, eq(actualDuties.dutyId, duties.id))
      .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
      .where(eq(actualDuties.employeeId, employee.id))
      .orderBy(desc(actualDuties.date), asc(duties.startTime))
      .limit(12)
  ]);

  const name = fullName(employee.firstName, employee.lastName);
  const documents = [
    { label: "Психологическо", value: employee.psychologicalAssessmentExpiry },
    { label: "Медицинско", value: employee.medicalCertificateExpiry },
    { label: "Лиценз", value: employee.licenseExpiry }
  ];

  return (
    <AppShell>
      <div className="mb-4">
        <Link href="/employees" className="inline-flex h-10 items-center gap-2 rounded border border-rail-line px-3 text-sm font-medium hover:bg-slate-100">
          <ArrowLeft className="h-4 w-4" />
          Служители
        </Link>
      </div>

      <SectionHeader title={name} description="Профил, валидности, отсъствия и назначения на служителя." />

      <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
        <aside className="grid content-start gap-5">
          <section className="rounded border border-rail-line bg-white p-4 shadow-panel">
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 place-items-center rounded bg-slate-100 text-rail-ink">
                <UserRound className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-slate-600">{employee.positionTitle ?? "Без позиция"}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className={employee.isActive ? "rounded bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700" : "rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"}>
                {employee.isActive ? "Активен" : "Неактивен"}
              </span>
            </div>
          </section>

          <section className="rounded border border-rail-line bg-white shadow-panel">
            <Header title="Валидности" count={documents.length} />
            <div className="divide-y divide-rail-line">
              {documents.map((item) => {
                const status = documentStatus(item.value);
                return (
                  <div key={item.label} className="px-4 py-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium">{item.label}</span>
                      <span className={`rounded border px-2 py-1 text-xs font-medium ${toneClass(status.tone)}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="mt-1 text-slate-600">{item.value ? String(item.value).slice(0, 10) : "-"}</div>
                  </div>
                );
              })}
            </div>
          </section>
        </aside>

        <div className="grid gap-5">
          <section className="rounded border border-rail-line bg-white shadow-panel">
            <Header title="Отсъствия" count={absenceRows.length} />
            <div className="divide-y divide-rail-line">
              {absenceRows.length ? absenceRows.map((absence) => (
                <div key={absence.id} className="grid gap-2 px-4 py-3 text-sm md:grid-cols-[220px_1fr]">
                  <div className="font-medium">{absence.startDate} - {absence.endDate}</div>
                  <div>
                    <div>{absence.reasonName ?? "-"}</div>
                    {absence.notes ? <p className="mt-1 text-slate-600">{absence.notes}</p> : null}
                  </div>
                </div>
              )) : <Empty icon={<CircleAlert className="h-4 w-4" />} text="Няма въведени отсъствия." />}
            </div>
          </section>

          <section className="rounded border border-rail-line bg-white shadow-panel">
            <Header title="Планирани повески" count={plannedRows.length} />
            <div className="divide-y divide-rail-line">
              {plannedRows.length ? plannedRows.map((row) => (
                <Assignment
                  key={row.id}
                  date={row.date}
                  dutyId={row.dutyId}
                  dutyName={row.dutyName}
                  dutyTypeName={row.dutyTypeName}
                  role={row.assignmentRole}
                  time={`${asTime(row.dutyStartTime)} - ${asTime(row.dutyEndTime)}`}
                />
              )) : <Empty icon={<CalendarDays className="h-4 w-4" />} text="Няма планирани повески." />}
            </div>
          </section>

          <section className="rounded border border-rail-line bg-white shadow-panel">
            <Header title="Действителни повески" count={actualRows.length} />
            <div className="divide-y divide-rail-line">
              {actualRows.length ? actualRows.map((row) => (
                <Assignment
                  key={row.id}
                  date={row.date}
                  dutyId={row.dutyId}
                  dutyName={row.dutyName}
                  dutyTypeName={row.dutyTypeName}
                  role={row.assignmentRole}
                  time={`${asTime(row.startTimeOverride ?? row.dutyStartTime)} - ${asTime(row.endTimeOverride ?? row.dutyEndTime)}`}
                  meta={row.startTimeOverride || row.endTimeOverride ? "Коригирани часове" : undefined}
                />
              )) : <Empty icon={<BadgeCheck className="h-4 w-4" />} text="Няма действителни повески." />}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
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
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-8 text-sm text-slate-500">
      {icon}
      {text}
    </div>
  );
}

function Assignment({
  date,
  dutyId,
  dutyName,
  dutyTypeName,
  role,
  time,
  meta
}: {
  date: string;
  dutyId: string | null;
  dutyName: string | null;
  dutyTypeName: string | null;
  role: string | null;
  time: string;
  meta?: string;
}) {
  return (
    <div className="grid gap-3 px-4 py-3 text-sm md:grid-cols-[140px_1fr_140px]">
      <div className="font-medium">{date}</div>
      <div>
        {dutyId ? (
          <Link href={`/duties/${dutyId}`} className="font-medium text-rail-route hover:underline">
            {dutyName ?? "-"}
          </Link>
        ) : (
          <span className="font-medium">{dutyName ?? "-"}</span>
        )}
        {dutyTypeName ? <div className="mt-1 text-xs text-slate-500">{dutyTypeName}</div> : null}
        {meta ? <div className="mt-1 text-xs font-medium text-rail-signal">{meta}</div> : null}
      </div>
      <div>
        <div className="inline-flex items-center gap-1 text-slate-700">
          <Clock3 className="h-4 w-4" />
          {time}
        </div>
        <div className="mt-1 text-xs text-slate-500">{roleLabels[(role ?? "conductor") as keyof typeof roleLabels] ?? role}</div>
      </div>
    </div>
  );
}
