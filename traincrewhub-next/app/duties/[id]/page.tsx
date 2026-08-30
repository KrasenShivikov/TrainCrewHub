import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, desc, eq } from "drizzle-orm";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, TrainFront } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { SectionHeader } from "@/components/section-header";
import { getDb } from "@/db";
import {
  actualDuties,
  duties,
  dutyTrains,
  dutyTypes,
  employees,
  plannedDuties,
  scheduleKeyDuties,
  scheduleKeys,
  trains
} from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";

const roleLabels = {
  chief: "Началник влак",
  conductor: "Кондуктор"
};

function asTime(value: string | null) {
  return value ? value.slice(0, 5) : "-";
}

function asInterval(value: unknown) {
  if (!value) return "-";
  const raw = String(value);
  const match = raw.match(/(\d{1,2}):(\d{2})/);
  return match ? `${match[1].padStart(2, "0")}:${match[2]}` : raw;
}

function fullName(firstName: string | null, lastName: string | null) {
  return [firstName, lastName].filter(Boolean).join(" ") || "-";
}

export default async function DutyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  await requirePermission("duties", "view");
  const { id } = await params;
  const db = getDb();

  const [duty] = await db
    .select({
      id: duties.id,
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
      dutyTypeName: dutyTypes.name,
      parentDutyId: duties.parentDutyId,
      parentDutyName: duties.name
    })
    .from(duties)
    .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
    .where(eq(duties.id, id))
    .limit(1);

  if (!duty) {
    notFound();
  }

  const [scheduleRows, trainRows, plannedRows, actualRows] = await Promise.all([
    db
      .select({
        id: scheduleKeys.id,
        name: scheduleKeys.name,
        type: scheduleKeys.type,
        validFrom: scheduleKeys.validFrom,
        validTo: scheduleKeys.validTo,
        crewRole: scheduleKeys.crewRole,
        displayOrder: scheduleKeyDuties.displayOrder
      })
      .from(scheduleKeyDuties)
      .innerJoin(scheduleKeys, eq(scheduleKeyDuties.scheduleKeyId, scheduleKeys.id))
      .where(eq(scheduleKeyDuties.dutyId, duty.id))
      .orderBy(asc(scheduleKeyDuties.displayOrder), asc(scheduleKeys.name)),
    db
      .select({
        id: trains.id,
        number: trains.number,
        originStation: trains.originStation,
        destinationStation: trains.destinationStation,
        departureTime: trains.departureTime,
        arrivalTime: trains.arrivalTime,
        timetableUrl: trains.timetableUrl,
        sequenceOrder: dutyTrains.sequenceOrder
      })
      .from(dutyTrains)
      .innerJoin(trains, eq(dutyTrains.trainId, trains.id))
      .where(eq(dutyTrains.dutyId, duty.id))
      .orderBy(asc(dutyTrains.sequenceOrder), asc(trains.departureTime)),
    db
      .select({
        id: plannedDuties.id,
        date: plannedDuties.date,
        assignmentRole: plannedDuties.assignmentRole,
        employeeFirstName: employees.firstName,
        employeeLastName: employees.lastName
      })
      .from(plannedDuties)
      .leftJoin(employees, eq(plannedDuties.employeeId, employees.id))
      .where(eq(plannedDuties.dutyId, duty.id))
      .orderBy(desc(plannedDuties.date))
      .limit(8),
    db
      .select({
        id: actualDuties.id,
        date: actualDuties.date,
        assignmentRole: actualDuties.assignmentRole,
        startTimeOverride: actualDuties.startTimeOverride,
        endTimeOverride: actualDuties.endTimeOverride,
        employeeFirstName: employees.firstName,
        employeeLastName: employees.lastName
      })
      .from(actualDuties)
      .leftJoin(employees, eq(actualDuties.employeeId, employees.id))
      .where(eq(actualDuties.dutyId, duty.id))
      .orderBy(desc(actualDuties.date))
      .limit(8)
  ]);

  return (
    <AppShell>
      <div className="mb-4">
        <Link href="/duties" className="inline-flex h-10 items-center gap-2 rounded border border-rail-line px-3 text-sm font-medium hover:bg-slate-100">
          <ArrowLeft className="h-4 w-4" />
          Повески
        </Link>
      </div>

      <SectionHeader title={duty.name} description="Детайли за повеската, влакове, ключ-графици и назначения." />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-5">
          <section className="rounded border border-rail-line bg-white p-4 shadow-panel">
            <div className="grid gap-4 md:grid-cols-4">
              <Stat icon={<Clock3 className="h-4 w-4" />} label="Часове" value={`${asTime(duty.startTime)} - ${asTime(duty.endTime)}`} />
              <Stat icon={<Clock3 className="h-4 w-4" />} label="Прекъсване" value={asInterval(duty.breakDuration)} />
              <Stat icon={<CalendarDays className="h-4 w-4" />} label="Тип" value={duty.dutyTypeName ?? "-"} />
              <Stat icon={<CheckCircle2 className="h-4 w-4" />} label="Втори ден" value={duty.isSecondDay ? "Да" : "Не"} />
            </div>

            <dl className="mt-5 grid gap-4 border-t border-rail-line pt-4 text-sm md:grid-cols-2">
              <Detail label="Начало прекъсване" value={asTime(duty.breakStartTime)} />
              <Detail label="Край прекъсване" value={asTime(duty.breakEndTime)} />
              <Detail label="Продължителност" value={asInterval(duty.duration)} />
              <Detail label="Ред" value={String(duty.displayOrder ?? 0)} />
            </dl>

            {duty.notes ? (
              <div className="mt-5 border-t border-rail-line pt-4">
                <h3 className="text-sm font-semibold">Бележки</h3>
                <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{duty.notes}</p>
              </div>
            ) : null}
          </section>

          <section className="rounded border border-rail-line bg-white shadow-panel">
            <Header title="Влакове" count={trainRows.length} />
            <div className="divide-y divide-rail-line">
              {trainRows.length ? trainRows.map((train) => (
                <div key={train.id} className="grid gap-3 px-4 py-3 text-sm md:grid-cols-[80px_1fr_160px]">
                  <div className="inline-flex items-center gap-2 font-semibold">
                    <TrainFront className="h-4 w-4 text-rail-route" />
                    {train.number}
                  </div>
                  <div>{train.originStation} - {train.destinationStation}</div>
                  <div className="text-slate-600">{asTime(train.departureTime)} - {asTime(train.arrivalTime)}</div>
                </div>
              )) : <Empty text="Няма свързани влакове." />}
            </div>
          </section>

          <section className="rounded border border-rail-line bg-white shadow-panel">
            <Header title="Ключ-графици" count={scheduleRows.length} />
            <div className="divide-y divide-rail-line">
              {scheduleRows.length ? scheduleRows.map((key) => (
                <div key={key.id} className="grid gap-2 px-4 py-3 text-sm md:grid-cols-[1fr_140px_220px]">
                  <div className="font-medium">{key.name}</div>
                  <div className="text-slate-600">{key.type}</div>
                  <div className="text-slate-600">{key.validFrom} - {key.validTo}</div>
                </div>
              )) : <Empty text="Няма свързани ключ-графици." />}
            </div>
          </section>
        </div>

        <aside className="grid content-start gap-5">
          <section className="rounded border border-rail-line bg-white shadow-panel">
            <Header title="Последни планирани" count={plannedRows.length} />
            <div className="divide-y divide-rail-line">
              {plannedRows.length ? plannedRows.map((row) => (
                <Assignment key={row.id} date={row.date} employee={fullName(row.employeeFirstName, row.employeeLastName)} role={row.assignmentRole} />
              )) : <Empty text="Няма планирани назначения." />}
            </div>
          </section>

          <section className="rounded border border-rail-line bg-white shadow-panel">
            <Header title="Последни действителни" count={actualRows.length} />
            <div className="divide-y divide-rail-line">
              {actualRows.length ? actualRows.map((row) => (
                <Assignment
                  key={row.id}
                  date={row.date}
                  employee={fullName(row.employeeFirstName, row.employeeLastName)}
                  role={row.assignmentRole}
                  meta={row.startTimeOverride || row.endTimeOverride ? "Коригирани часове" : undefined}
                />
              )) : <Empty text="Няма действителни назначения." />}
            </div>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded border border-rail-line p-3">
      <div className="flex items-center gap-2 text-xs font-medium uppercase text-slate-500">
        {icon}
        {label}
      </div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-slate-500">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
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

function Empty({ text }: { text: string }) {
  return <div className="px-4 py-8 text-center text-sm text-slate-500">{text}</div>;
}

function Assignment({ date, employee, role, meta }: { date: string; employee: string; role: string | null; meta?: string }) {
  return (
    <div className="px-4 py-3 text-sm">
      <div className="font-medium">{date}</div>
      <div className="mt-1 text-slate-600">{employee}</div>
      <div className="mt-1 text-xs text-slate-500">{roleLabels[(role ?? "conductor") as keyof typeof roleLabels] ?? role}</div>
      {meta ? <div className="mt-2 text-xs font-medium text-rail-signal">{meta}</div> : null}
    </div>
  );
}
