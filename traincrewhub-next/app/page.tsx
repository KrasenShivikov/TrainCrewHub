import Link from "next/link";
import type { Route } from "next";
import { AlertTriangle, BadgeCheck, BarChart3, CalendarDays, Clock3, FileWarning, ShieldCheck, UserRoundX, UsersRound } from "lucide-react";
import { and, asc, count, desc, eq, gte, isNotNull, lte, sql } from "drizzle-orm";

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
  roles,
  scheduleChangeEvents,
  schedulePublications,
  userProfiles,
  userRoles,
  users
} from "@/db/schema";
import { requireUser, type CurrentUser } from "@/lib/auth/session";

const roleLabels = {
  chief: "Началник влак",
  conductor: "Кондуктор",
  driver: "Машинист",
  assistant_driver: "Пом. машинист"
};

const crewRoles = ["crew", "crew_member", "user"];
const transportAnalyticsModes = ["head_of_transport", "instructor"];
const deviationMinAllowed = -20 * 60;
const deviationMaxAllowed = 30 * 60;

type UserMode = "admin" | "head_of_transport" | "instructor" | "manager" | "crew" | "default";

function normalizeRole(role: string | null | undefined) {
  return String(role || "").trim().toLowerCase();
}

function hasRole(userRoles: string[], values: string[]) {
  const normalized = userRoles.map(normalizeRole);
  return values.some((value) => normalized.includes(value));
}

function resolveUserMode(userRoles: string[]): UserMode {
  if (hasRole(userRoles, ["admin"])) return "admin";
  if (hasRole(userRoles, ["head_of_transport"])) return "head_of_transport";
  if (hasRole(userRoles, ["crew_instructor", "instructor"])) return "instructor";
  if (hasRole(userRoles, ["crew_manager"])) return "manager";
  if (hasRole(userRoles, crewRoles)) return "crew";
  return "default";
}

function isTransportAnalyticsMode(mode: UserMode) {
  return transportAnalyticsModes.includes(mode);
}

function todayInSofia() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Sofia",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

function monthBounds(date: string) {
  const [year, month] = date.split("-").map(Number);
  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const endDate = new Date(Date.UTC(year, month, 0));
  const end = `${year}-${String(month).padStart(2, "0")}-${String(endDate.getUTCDate()).padStart(2, "0")}`;
  return { start, end, year, month };
}

function daysInMonth(date: string) {
  const { year, month } = monthBounds(date);
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return Array.from({ length: lastDay }, (_, index) => `${year}-${String(month).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`);
}

function formatDate(value: string | Date | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("bg-BG", { dateStyle: "medium" }).format(new Date(`${String(value).slice(0, 10)}T00:00:00`));
}

function asTime(value: string | null) {
  return value ? value.slice(0, 5) : "-";
}

function fullName(firstName: string | null, lastName: string | null) {
  return [firstName, lastName].filter(Boolean).join(" ") || "-";
}

function minutesBetween(start: string | null, end: string | null) {
  if (!start || !end) return 0;
  const [startHour, startMinute] = start.slice(0, 5).split(":").map(Number);
  const [endHour, endMinute] = end.slice(0, 5).split(":").map(Number);
  const startTotal = startHour * 60 + startMinute;
  const endTotal = endHour * 60 + endMinute;
  return endTotal >= startTotal ? endTotal - startTotal : endTotal - startTotal + 24 * 60;
}

function dutyMinutes(row: { startTime: string | null; endTime: string | null; breakStartTime?: string | null; breakEndTime?: string | null }) {
  return Math.max(0, minutesBetween(row.startTime, row.endTime) - minutesBetween(row.breakStartTime ?? null, row.breakEndTime ?? null));
}

function actualDutyMinutes(row: { startTimeOverride: string | null; endTimeOverride: string | null; dutyStartTime: string | null; dutyEndTime: string | null; breakStartTime?: string | null; breakEndTime?: string | null }) {
  return dutyMinutes({
    startTime: row.startTimeOverride ?? row.dutyStartTime,
    endTime: row.endTimeOverride ?? row.dutyEndTime,
    breakStartTime: row.breakStartTime,
    breakEndTime: row.breakEndTime
  });
}

function formatMinutes(minutes: number) {
  const safeMinutes = Number.isFinite(minutes) ? Math.max(0, Math.round(minutes)) : 0;
  return `${String(Math.floor(safeMinutes / 60)).padStart(2, "0")}:${String(safeMinutes % 60).padStart(2, "0")}`;
}

function formatSignedMinutes(minutes: number) {
  const sign = minutes < 0 ? "-" : "+";
  return `${sign}${formatMinutes(Math.abs(minutes))}`;
}

function countBulgarianWorkdays(startDate: string, endDate: string) {
  let count = 0;
  const cursor = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  while (cursor <= end) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) count += 1;
    cursor.setDate(cursor.getDate() + 1);
  }

  return count;
}

function deviationClass(minutes: number) {
  return minutes < deviationMinAllowed || minutes > deviationMaxAllowed ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800";
}

function documentStatus(label: string, value: string | Date | null) {
  if (!value) return null;
  const today = new Date(`${todayInSofia()}T00:00:00`);
  const expiry = new Date(`${String(value).slice(0, 10)}T00:00:00`);
  const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / 86_400_000);
  if (diffDays < 0) return { label, date: String(value).slice(0, 10), status: "expired" as const };
  if (diffDays <= 30) return { label, date: String(value).slice(0, 10), status: "soon" as const };
  return null;
}

async function scalarCount(query: Promise<Array<{ value: number }>>) {
  const [row] = await query;
  return Number(row?.value ?? 0);
}

export default async function HomePage() {
  const user = await requireUser();
  const mode = resolveUserMode(user.roles);

  if (mode === "admin") return <AdminHome />;
  if (isTransportAnalyticsMode(mode)) return <TransportHome mode={mode} />;
  if (mode === "crew") return <CrewHome user={user} />;
  return <OperationsHome mode={mode} />;
}

async function OperationsHome({ mode }: { mode: UserMode }) {
  const today = todayInSofia();
  const db = getDb();

  const [plannedCount, actualRows, absenceRows, [publication], changeRows, employeeRows] = await Promise.all([
    scalarCount(db.select({ value: count() }).from(plannedDuties).where(eq(plannedDuties.date, today))),
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
        psychologicalAssessmentExpiry: employees.psychologicalAssessmentExpiry,
        medicalCertificateExpiry: employees.medicalCertificateExpiry,
        licenseExpiry: employees.licenseExpiry
      })
      .from(employees)
  ]);

  const dutyRoles = new Map<string, Set<string | null>>();
  actualRows.forEach((row) => {
    if (!row.dutyId) return;
    dutyRoles.set(row.dutyId, dutyRoles.get(row.dutyId) ?? new Set());
    dutyRoles.get(row.dutyId)?.add(row.assignmentRole);
  });

  const scheduleWarnings = [
    ...(!publication?.publishedAt || publication.invalidatedAt ? ["Днешният график още не е публикуван."] : []),
    ...(publication?.publishedAt && !publication.confirmedAt && !publication.invalidatedAt ? ["Днешният график е публикуван, но не е потвърден."] : []),
    ...[...dutyRoles.entries()].flatMap(([dutyId, roleSet]) => {
      const dutyName = actualRows.find((row) => row.dutyId === dutyId)?.dutyName ?? "Повеска";
      return [
        ...(roleSet.has("chief") ? [] : [`${dutyName}: липсва началник влак.`]),
        ...(roleSet.has("conductor") ? [] : [`${dutyName}: липсва кондуктор.`])
      ];
    }),
    ...actualRows.flatMap((row) => row.employeeIsActive === false ? [`${fullName(row.employeeFirstName, row.employeeLastName)} е неактивен служител.`] : [])
  ];

  const documentWarnings = employeeRows.flatMap((employee) => {
    const employeeName = fullName(employee.firstName, employee.lastName);
    return [
      documentStatus(`${employeeName} - психологическа годност`, employee.psychologicalAssessmentExpiry),
      documentStatus(`${employeeName} - медицинско`, employee.medicalCertificateExpiry),
      documentStatus(`${employeeName} - лиценз`, employee.licenseExpiry)
    ].filter(Boolean).map((item) => ({ employeeId: employee.id, text: `${item!.label}: ${item!.status === "expired" ? "изтекъл" : "изтича скоро"} (${formatDate(item!.date)}).` }));
  });
  const inactiveCount = employeeRows.filter((employee) => employee.isActive === false).length;
  const statusLabel = publication?.confirmedAt && !publication.invalidatedAt ? "Потвърден" : publication?.publishedAt && !publication.invalidatedAt ? "Публикуван" : "Чернова";
  const todayScheduleHref = `/schedule/${today}` as Route;

  return (
    <AppShell>
      <SectionHeader
        title="Работен плот"
        description={mode === "manager" ? `Оперативен обзор за управление на екипи и дневни повески за ${today}.` : `Оперативен обзор за ${today}: график, предупреждения, отсъствия и последни промени.`}
      />

      <QuickActions actions={[
        { href: "/plan-schedule", label: "План-график" },
        { href: "/schedule", label: "График" },
        { href: "/planned-duties", label: "Планирани повески" },
        { href: "/actual-duties", label: "Реални повески" }
      ]} />

      <div className="mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Stat href={todayScheduleHref} icon={<CalendarDays className="h-5 w-5" />} label="Днешен график" value={statusLabel} />
        <Stat href="/planned-duties" icon={<BadgeCheck className="h-5 w-5" />} label="Планирани" value={String(plannedCount)} />
        <Stat href="/actual-duties" icon={<Clock3 className="h-5 w-5" />} label="Реални" value={String(actualRows.length)} />
        <Stat href="/employee-absences" icon={<UserRoundX className="h-5 w-5" />} label="Отсъстващи" value={String(absenceRows.length)} />
        <Stat href="/employees" icon={<FileWarning className="h-5 w-5" />} label="Документи" value={String(documentWarnings.length + inactiveCount)} />
      </div>

      <Warnings scheduleWarnings={scheduleWarnings} documentWarnings={documentWarnings.map((item) => item.text)} />
      <OperationalPanels actualRows={actualRows} absenceRows={absenceRows} changeRows={changeRows} todayScheduleHref={todayScheduleHref} />
    </AppShell>
  );
}

async function AdminHome() {
  const db = getDb();
  const [profileCount, usersWithRolesCount, linkedProfilesCount, rolesCount, userRows, roleRows] = await Promise.all([
    scalarCount(db.select({ value: count() }).from(userProfiles)),
    scalarCount(db.select({ value: sql<number>`count(distinct ${userRoles.userId})` }).from(userRoles)),
    scalarCount(db.select({ value: count() }).from(userProfiles).where(isNotNull(userProfiles.employeeId))),
    scalarCount(db.select({ value: count() }).from(roles)),
    db.select({ id: users.id, username: users.username, email: users.email, createdAt: users.createdAt }).from(users).orderBy(asc(users.createdAt)),
    db.select({ userId: userRoles.userId }).from(userRoles)
  ]);
  const usersWithRoles = new Set(roleRows.map((row) => row.userId));
  const pendingUsers = userRows.filter((row) => !usersWithRoles.has(row.id));

  return (
    <AppShell>
      <SectionHeader title="Административен преглед" description="Потребители, роли и системно състояние." />
      <QuickActions actions={[{ href: "/admin", label: "Админ панел" }, { href: "/employees", label: "Служители" }]} />
      <div className="mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat href="/admin" icon={<UsersRound className="h-5 w-5" />} label="Профили" value={String(profileCount)} />
        <Stat href="/admin" icon={<ShieldCheck className="h-5 w-5" />} label="Потребители с роля" value={String(usersWithRolesCount)} />
        <Stat href="/admin" icon={<UsersRound className="h-5 w-5" />} label="Профили със служител" value={String(linkedProfilesCount)} />
        <Stat href="/admin" icon={<BadgeCheck className="h-5 w-5" />} label="Роли" value={String(rolesCount)} />
      </div>
      <Panel title="Чакащи потребители за роля" count={pendingUsers.length} href="/admin">
        {pendingUsers.length ? pendingUsers.map((row) => (
          <article key={row.id} className="flex items-center justify-between gap-3 border-b border-rail-line px-4 py-3 text-sm last:border-b-0">
            <div>
              <p className="font-medium">{row.username || row.email}</p>
              <p className="mt-1 text-xs text-slate-500">{row.createdAt ? row.createdAt.toLocaleString("bg-BG") : "-"}</p>
            </div>
            <span className="rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">чака</span>
          </article>
        )) : <Empty text="Няма чакащи потребители." />}
      </Panel>
    </AppShell>
  );
}

async function TransportHome({ mode }: { mode: UserMode }) {
  const today = todayInSofia();
  const { start } = monthBounds(today);
  const db = getDb();
  const [absenceRows, employeeRows, plannedRows, actualRows] = await Promise.all([
    db
      .select({
        id: employeeAbsences.id,
        startDate: employeeAbsences.startDate,
        endDate: employeeAbsences.endDate,
        employeeFirstName: employees.firstName,
        employeeLastName: employees.lastName,
        reasonName: absenceReasons.name
      })
      .from(employeeAbsences)
      .leftJoin(employees, eq(employeeAbsences.employeeId, employees.id))
      .leftJoin(absenceReasons, eq(employeeAbsences.reasonId, absenceReasons.id))
      .where(and(lte(employeeAbsences.startDate, today), gte(employeeAbsences.endDate, today))),
    db
      .select({
        id: employees.id,
        firstName: employees.firstName,
        lastName: employees.lastName,
        psychologicalAssessmentExpiry: employees.psychologicalAssessmentExpiry,
        medicalCertificateExpiry: employees.medicalCertificateExpiry,
        licenseExpiry: employees.licenseExpiry
      })
      .from(employees)
      .where(eq(employees.isActive, true))
      .orderBy(asc(employees.lastName), asc(employees.firstName)),
    db
      .select({ employeeId: plannedDuties.employeeId, startTime: duties.startTime, endTime: duties.endTime, breakStartTime: duties.breakStartTime, breakEndTime: duties.breakEndTime })
      .from(plannedDuties)
      .leftJoin(duties, eq(plannedDuties.dutyId, duties.id))
      .where(and(gte(plannedDuties.date, start), lte(plannedDuties.date, today))),
    db
      .select({ employeeId: actualDuties.employeeId, startTimeOverride: actualDuties.startTimeOverride, endTimeOverride: actualDuties.endTimeOverride, dutyStartTime: duties.startTime, dutyEndTime: duties.endTime, breakStartTime: duties.breakStartTime, breakEndTime: duties.breakEndTime })
      .from(actualDuties)
      .leftJoin(duties, eq(actualDuties.dutyId, duties.id))
      .where(and(gte(actualDuties.date, start), lte(actualDuties.date, today)))
  ]);

  const certificates = employeeRows.flatMap((employee) => {
    const employeeName = fullName(employee.firstName, employee.lastName);
    return [
      documentStatus("Психологическа годност", employee.psychologicalAssessmentExpiry),
      documentStatus("Медицинско", employee.medicalCertificateExpiry),
      documentStatus("Лиценз", employee.licenseExpiry)
    ].filter(Boolean).map((item) => ({ employeeName, ...item! }));
  });
  const soonCertificates = certificates.filter((item) => item.status === "soon").sort((a, b) => a.date.localeCompare(b.date));
  const expiredCertificates = certificates.filter((item) => item.status === "expired").sort((a, b) => a.date.localeCompare(b.date));
  const plannedByEmployee = new Map<string, number>();
  const actualByEmployee = new Map<string, number>();
  plannedRows.forEach((row) => row.employeeId && plannedByEmployee.set(row.employeeId, (plannedByEmployee.get(row.employeeId) ?? 0) + dutyMinutes(row)));
  actualRows.forEach((row) => row.employeeId && actualByEmployee.set(row.employeeId, (actualByEmployee.get(row.employeeId) ?? 0) + actualDutyMinutes(row)));
  const normMinutes = countBulgarianWorkdays(start, today) * 8 * 60;
  const workloadRows = employeeRows
    .map((employee) => {
      const actual = actualByEmployee.get(employee.id) ?? 0;
      const deviation = actual - normMinutes;
      return {
        id: employee.id,
        employeeName: fullName(employee.firstName, employee.lastName),
        planned: plannedByEmployee.get(employee.id) ?? 0,
        actual,
        norm: normMinutes,
        deviation
      };
    })
    .sort((a, b) => Math.abs(b.deviation) - Math.abs(a.deviation));
  const absenceGroups = Map.groupBy(absenceRows, (row) => row.reasonName || "Без посочена причина");

  return (
    <AppShell>
      <SectionHeader title={mode === "instructor" ? "Инструкторски преглед" : "Транспортен преглед"} description="Акцент върху сертификати, отсъствия и натовареност." />
      <QuickActions actions={[
        { href: "/plan-schedule", label: "План-график" },
        { href: "/schedule", label: "График" },
        { href: "/planned-duties", label: "Планирани повески" },
        { href: "/actual-duties", label: "Реални повески" }
      ]} />
      <div className="mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat href="/employee-absences" icon={<UserRoundX className="h-5 w-5" />} label="Активни отсъствия" value={String(absenceRows.length)} />
        <Stat href="/employees" icon={<UsersRound className="h-5 w-5" />} label="Активни служители" value={String(employeeRows.length)} />
        <Stat href="/employees" icon={<FileWarning className="h-5 w-5" />} label="Изтичат до 30 дни" value={String(soonCertificates.length)} />
        <Stat href="/employees" icon={<AlertTriangle className="h-5 w-5" />} label="Вече изтекли" value={String(expiredCertificates.length)} />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <CertificatePanel title="Сертификати: изтичат до 30 дни" rows={soonCertificates} />
        <CertificatePanel title="Сертификати: вече изтекли" rows={expiredCertificates} />
        <Panel title="Отсъстващи по причина" count={absenceRows.length} href="/employee-absences">
          {[...absenceGroups.entries()].length ? [...absenceGroups.entries()].map(([reason, rows]) => (
            <article key={reason} className="border-b border-rail-line px-4 py-3 text-sm last:border-b-0">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">{reason}</p>
                <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium">{rows.length}</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">{rows.map((row) => fullName(row.employeeFirstName, row.employeeLastName)).join(", ")}</p>
            </article>
          )) : <Empty text="Няма активни отсъствия." />}
        </Panel>
        <Panel title={`Натовареност към ${formatDate(today)}`} count={workloadRows.length} href="/actual-duties">
          {workloadRows.slice(0, 12).map((row) => (
            <article key={row.id} className="grid gap-2 border-b border-rail-line px-4 py-3 text-sm last:border-b-0 md:grid-cols-[1fr_80px_80px_80px_90px]">
              <p className="font-medium">{row.employeeName}</p>
              <p>{formatMinutes(row.planned)}</p>
              <p>{formatMinutes(row.actual)}</p>
              <p>{formatMinutes(row.norm)}</p>
              <span className={`w-fit rounded px-2 py-1 text-xs font-medium ${deviationClass(row.deviation)}`}>{formatSignedMinutes(row.deviation)}</span>
            </article>
          ))}
        </Panel>
      </div>
    </AppShell>
  );
}

async function CrewHome({ user }: { user: CurrentUser }) {
  const today = todayInSofia();
  const { start, end } = monthBounds(today);
  const employeeId = user.employeeId;
  const db = getDb();

  if (!employeeId) {
    return (
      <AppShell>
        <SectionHeader title="Моите повески" description="Профилът ти още не е свързан със служител." />
        <Empty text="Свържи профила със служител от админ панела, за да се покаже личният календар." />
      </AppShell>
    );
  }

  const [plannedRows, actualRows, absenceRows] = await Promise.all([
    db
      .select({ id: plannedDuties.id, date: plannedDuties.date, assignmentRole: plannedDuties.assignmentRole, dutyId: duties.id, dutyName: duties.name, startTime: duties.startTime, endTime: duties.endTime, breakStartTime: duties.breakStartTime, breakEndTime: duties.breakEndTime, dutyTypeName: dutyTypes.name })
      .from(plannedDuties)
      .leftJoin(duties, eq(plannedDuties.dutyId, duties.id))
      .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
      .where(and(eq(plannedDuties.employeeId, employeeId), gte(plannedDuties.date, start), lte(plannedDuties.date, end)))
      .orderBy(asc(plannedDuties.date), asc(duties.startTime)),
    db
      .select({ id: actualDuties.id, date: actualDuties.date, assignmentRole: actualDuties.assignmentRole, dutyId: duties.id, dutyName: duties.name, startTimeOverride: actualDuties.startTimeOverride, endTimeOverride: actualDuties.endTimeOverride, dutyStartTime: duties.startTime, dutyEndTime: duties.endTime, breakStartTime: duties.breakStartTime, breakEndTime: duties.breakEndTime, dutyTypeName: dutyTypes.name })
      .from(actualDuties)
      .leftJoin(duties, eq(actualDuties.dutyId, duties.id))
      .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
      .where(and(eq(actualDuties.employeeId, employeeId), gte(actualDuties.date, start), lte(actualDuties.date, end)))
      .orderBy(asc(actualDuties.date), asc(duties.startTime)),
    db
      .select({ id: employeeAbsences.id, startDate: employeeAbsences.startDate, endDate: employeeAbsences.endDate, reasonName: absenceReasons.name })
      .from(employeeAbsences)
      .leftJoin(absenceReasons, eq(employeeAbsences.reasonId, absenceReasons.id))
      .where(and(eq(employeeAbsences.employeeId, employeeId), lte(employeeAbsences.startDate, end), gte(employeeAbsences.endDate, start)))
  ]);

  const plannedToday = plannedRows.filter((row) => row.date === today);
  const actualToday = actualRows.filter((row) => row.date === today);
  const absencesToday = absenceRows.filter((row) => row.startDate <= today && row.endDate >= today);
  const plannedMinutes = plannedRows.reduce((sum, row) => sum + dutyMinutes(row), 0);
  const actualMinutes = actualRows.reduce((sum, row) => sum + actualDutyMinutes(row), 0);
  const normMinutes = countBulgarianWorkdays(start, today) * 8 * 60;

  return (
    <AppShell>
      <SectionHeader title="Моите повески за месеца" description="Личен календар за планирани и реални повески." />
      <QuickActions actions={[{ href: "/planned-duties", label: "Планирани повески" }, { href: "/actual-duties", label: "Реални повески" }]} />
      <div className="mb-5 grid gap-4 md:grid-cols-4">
        <Stat href="/planned-duties" icon={<CalendarDays className="h-5 w-5" />} label="Планирани часове" value={formatMinutes(plannedMinutes)} />
        <Stat href="/actual-duties" icon={<Clock3 className="h-5 w-5" />} label="Реални часове" value={formatMinutes(actualMinutes)} />
        <Stat href="/schedule" icon={<BarChart3 className="h-5 w-5" />} label="Норма до дата" value={formatMinutes(normMinutes)} />
        <Stat href="/actual-duties" icon={<BadgeCheck className="h-5 w-5" />} label="Отклонение" value={formatSignedMinutes(actualMinutes - normMinutes)} />
      </div>
      <section className="mb-5 rounded border border-rail-line bg-white p-4 shadow-panel">
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-slate-500">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((day) => <span key={day}>{day}</span>)}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-2">
          {daysInMonth(today).map((day) => {
            const planned = plannedRows.filter((row) => row.date === day).length;
            const actual = actualRows.filter((row) => row.date === day).length;
            const absent = absenceRows.some((row) => row.startDate <= day && row.endDate >= day);
            return (
              <div key={day} className={`min-h-20 rounded border p-2 text-sm ${day === today ? "border-rail-route bg-blue-50" : "border-rail-line"}`}>
                <div className="font-medium">{Number(day.slice(8, 10))}</div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {planned ? <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs text-blue-800">П {planned}</span> : null}
                  {actual ? <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-800">Р {actual}</span> : null}
                  {absent ? <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-800">О</span> : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <div className="grid gap-5 xl:grid-cols-2">
        <DutyListPanel title="Планирани за днес" rows={plannedToday} href="/planned-duties" />
        <DutyListPanel title="Реални за днес" rows={actualToday} href="/actual-duties" actual />
        <Panel title="Отсъствия за днес" count={absencesToday.length} href="/employee-absences">
          {absencesToday.length ? absencesToday.map((row) => (
            <article key={row.id} className="border-b border-rail-line px-4 py-3 text-sm last:border-b-0">
              <p className="font-medium">{row.reasonName ?? "-"}</p>
              <p className="mt-1 text-xs text-slate-500">{formatDate(row.startDate)} - {formatDate(row.endDate)}</p>
            </article>
          )) : <Empty text="Няма отсъствия за избрания ден." />}
        </Panel>
      </div>
    </AppShell>
  );
}

function OperationalPanels({ actualRows, absenceRows, changeRows, todayScheduleHref }: { actualRows: Array<any>; absenceRows: Array<any>; changeRows: Array<any>; todayScheduleHref: Route }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <section className="space-y-5">
        <DutyListPanel title="Днешни реални повески" rows={actualRows} href={todayScheduleHref} actual />
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
              <p className="mt-1 text-xs text-slate-500">{formatDate(row.startDate)} - {formatDate(row.endDate)}</p>
            </article>
          )) : <Empty text="Няма отсъстващи днес." />}
        </Panel>
      </aside>
    </div>
  );
}

function DutyListPanel({ title, rows, href, actual = false }: { title: string; rows: Array<any>; href: Route; actual?: boolean }) {
  return (
    <Panel title={title} count={rows.length} href={href}>
      {rows.length ? rows.slice(0, 12).map((row) => {
        const startTime = actual ? row.startTimeOverride ?? row.dutyStartTime : row.startTime;
        const endTime = actual ? row.endTimeOverride ?? row.dutyEndTime : row.endTime;
        return (
          <article key={row.id} className="grid gap-3 border-b border-rail-line px-4 py-3 text-sm last:border-b-0 md:grid-cols-[140px_1fr_150px]">
            <div className="font-medium">{asTime(startTime)} - {asTime(endTime)}</div>
            <div>
              {row.dutyId ? <Link href={`/duties/${row.dutyId}`} className="font-medium text-rail-route hover:underline">{row.dutyName ?? "-"}</Link> : <span className="font-medium">{row.dutyName ?? "-"}</span>}
              <div className="mt-1 text-xs text-slate-500">{row.dutyTypeName ?? "Без тип"}</div>
            </div>
            <div>
              {"employeeId" in row && row.employeeId ? <Link href={`/employees/${row.employeeId}`} className="text-rail-route hover:underline">{fullName(row.employeeFirstName, row.employeeLastName)}</Link> : null}
              <div className="mt-1 text-xs text-slate-500">{roleLabels[(row.assignmentRole ?? "conductor") as keyof typeof roleLabels] ?? row.assignmentRole ?? "-"}</div>
            </div>
          </article>
        );
      }) : <Empty text="Няма записи." />}
    </Panel>
  );
}

function CertificatePanel({ title, rows }: { title: string; rows: Array<{ employeeName: string; label: string; date: string; status: "soon" | "expired" }> }) {
  return (
    <Panel title={title} count={rows.length} href="/employees">
      {rows.length ? rows.slice(0, 12).map((row) => (
        <article key={`${row.employeeName}-${row.label}-${row.date}`} className="grid gap-2 border-b border-rail-line px-4 py-3 text-sm last:border-b-0 md:grid-cols-[1fr_170px_120px]">
          <p className="font-medium">{row.employeeName}</p>
          <p>{row.label}</p>
          <p className="text-slate-600">{formatDate(row.date)}</p>
        </article>
      )) : <Empty text="Няма служители в тази група." />}
    </Panel>
  );
}

function Warnings({ scheduleWarnings, documentWarnings }: { scheduleWarnings: string[]; documentWarnings: string[] }) {
  if (!scheduleWarnings.length && !documentWarnings.length) return null;
  return (
    <section className="mb-5 rounded border border-amber-200 bg-amber-50 p-4 text-amber-900">
      <div className="flex items-center gap-2 font-semibold">
        <AlertTriangle className="h-5 w-5" />
        Предупреждения
      </div>
      <div className="mt-3 grid gap-3 xl:grid-cols-2">
        <WarningGroup title="График" items={[...new Set(scheduleWarnings)]} emptyText="Няма предупреждения за днешния график." />
        <WarningGroup title="Документи" items={documentWarnings.slice(0, 8)} emptyText="Няма изтичащи или липсващи валидности." />
      </div>
    </section>
  );
}

function QuickActions({ actions }: { actions: Array<{ href: Route; label: string }> }) {
  return (
    <div className="mb-5 flex flex-wrap gap-2">
      {actions.map((action) => (
        <Link key={action.href} href={action.href} className="rounded border border-rail-line bg-white px-3 py-2 text-sm font-medium hover:border-rail-route hover:bg-slate-50">
          {action.label}
        </Link>
      ))}
    </div>
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
