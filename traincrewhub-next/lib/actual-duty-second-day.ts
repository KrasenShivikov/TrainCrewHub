import { and, asc, eq } from "drizzle-orm";

import { getDb } from "@/db";
import { actualDuties, duties, scheduleChangeEvents } from "@/db/schema";

export type SecondDayActualDutyResult =
  | { status: "created"; date: string; dutyId: string }
  | { status: "updated"; date: string; dutyId: string }
  | { status: "missing-second-day-duty" }
  | { status: "missing-linked-second-day-duty" }
  | { status: "already-created"; date: string; dutyId: string }
  | { status: "employee-conflict"; date: string }
  | { status: "slot-conflict"; date: string; dutyId: string };

function nextDateIso(date: string) {
  const value = new Date(`${date}T00:00:00`);
  value.setDate(value.getDate() + 1);

  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export async function createSecondDayActualDutyForParent({
  date,
  employeeId,
  dutyId,
  assignmentRole,
  sourceActualDutyId,
  createdBy
}: {
  date: string;
  employeeId: string;
  dutyId: string;
  assignmentRole: string | null;
  sourceActualDutyId: string;
  createdBy: string;
}): Promise<SecondDayActualDutyResult> {
  if (!assignmentRole) {
    return { status: "missing-second-day-duty" };
  }

  const db = getDb();
  const [secondDayDuty] = await db
    .select({ id: duties.id })
    .from(duties)
    .where(and(eq(duties.parentDutyId, dutyId), eq(duties.isSecondDay, true)))
    .orderBy(asc(duties.displayOrder), asc(duties.name))
    .limit(1);

  if (!secondDayDuty) {
    return { status: "missing-second-day-duty" };
  }

  const secondDate = nextDateIso(date);
  const [existingSecondDay] = await db
    .select({ id: actualDuties.id })
    .from(actualDuties)
    .where(
      and(
        eq(actualDuties.date, secondDate),
        eq(actualDuties.employeeId, employeeId),
        eq(actualDuties.dutyId, secondDayDuty.id),
        eq(actualDuties.assignmentRole, assignmentRole)
      )
    )
    .limit(1);

  if (existingSecondDay) {
    return { status: "already-created", date: secondDate, dutyId: secondDayDuty.id };
  }

  const [employeeConflict] = await db
    .select({ id: actualDuties.id })
    .from(actualDuties)
    .where(and(eq(actualDuties.employeeId, employeeId), eq(actualDuties.date, secondDate)))
    .limit(1);

  if (employeeConflict) {
    return { status: "employee-conflict", date: secondDate };
  }

  const [slotConflict] = await db
    .select({ id: actualDuties.id })
    .from(actualDuties)
    .where(and(eq(actualDuties.date, secondDate), eq(actualDuties.dutyId, secondDayDuty.id), eq(actualDuties.assignmentRole, assignmentRole)))
    .limit(1);

  if (slotConflict) {
    return { status: "slot-conflict", date: secondDate, dutyId: secondDayDuty.id };
  }

  await db.insert(actualDuties).values({
    date: secondDate,
    employeeId,
    dutyId: secondDayDuty.id,
    assignmentRole,
    originalEmployeeId: employeeId,
    originalDutyId: secondDayDuty.id,
    originalAssignmentRole: assignmentRole,
    sourceActualDutyId,
    reportedAt: new Date()
  });
  await db.insert(scheduleChangeEvents).values({
    date: secondDate,
    employeeId,
    dutyId: secondDayDuty.id,
    action: "actual_second_day_created",
    createdBy
  });

  return { status: "created", date: secondDate, dutyId: secondDayDuty.id };
}

export async function syncSecondDayActualDutyFromParent({
  date,
  employeeId,
  dutyId,
  assignmentRole,
  sourceActualDutyId,
  createdBy,
  ignoreSourceActualDutyIds = []
}: {
  date: string;
  employeeId: string;
  dutyId: string;
  assignmentRole: string | null;
  sourceActualDutyId: string;
  createdBy: string;
  ignoreSourceActualDutyIds?: string[];
}): Promise<SecondDayActualDutyResult> {
  if (!assignmentRole) {
    return { status: "missing-second-day-duty" };
  }

  const db = getDb();
  const [linkedSecondDay] = await db
    .select()
    .from(actualDuties)
    .where(eq(actualDuties.sourceActualDutyId, sourceActualDutyId))
    .limit(1);

  if (!linkedSecondDay) {
    return createSecondDayActualDutyForParent({
      date,
      employeeId,
      dutyId,
      assignmentRole,
      sourceActualDutyId,
      createdBy
    });
  }

  const [secondDayDuty] = await db
    .select({ id: duties.id })
    .from(duties)
    .where(and(eq(duties.parentDutyId, dutyId), eq(duties.isSecondDay, true)))
    .orderBy(asc(duties.displayOrder), asc(duties.name))
    .limit(1);

  if (!secondDayDuty) {
    return { status: "missing-linked-second-day-duty" };
  }

  const secondDate = nextDateIso(date);
  const ignoredSources = new Set([sourceActualDutyId, ...ignoreSourceActualDutyIds]);
  const employeeConflicts = await db
    .select({ id: actualDuties.id, sourceActualDutyId: actualDuties.sourceActualDutyId })
    .from(actualDuties)
    .where(and(eq(actualDuties.employeeId, employeeId), eq(actualDuties.date, secondDate)));
  const employeeConflict = employeeConflicts.find((row) => row.id !== linkedSecondDay.id && !ignoredSources.has(row.sourceActualDutyId ?? ""));

  if (employeeConflict) {
    return { status: "employee-conflict", date: secondDate };
  }

  const slotConflicts = await db
    .select({ id: actualDuties.id, sourceActualDutyId: actualDuties.sourceActualDutyId })
    .from(actualDuties)
    .where(and(eq(actualDuties.date, secondDate), eq(actualDuties.dutyId, secondDayDuty.id), eq(actualDuties.assignmentRole, assignmentRole)));
  const slotConflict = slotConflicts.find((row) => row.id !== linkedSecondDay.id && !ignoredSources.has(row.sourceActualDutyId ?? ""));

  if (slotConflict) {
    return { status: "slot-conflict", date: secondDate, dutyId: secondDayDuty.id };
  }

  await db
    .update(actualDuties)
    .set({
      date: secondDate,
      employeeId,
      dutyId: secondDayDuty.id,
      assignmentRole
    })
    .where(eq(actualDuties.id, linkedSecondDay.id));
  await db.insert(scheduleChangeEvents).values({
    date: secondDate,
    employeeId,
    dutyId: secondDayDuty.id,
    action: "actual_second_day_synced",
    createdBy
  });

  return { status: "updated", date: secondDate, dutyId: secondDayDuty.id };
}

export function secondDayFlashSuffix(result: SecondDayActualDutyResult) {
  if (result.status === "created") {
    return " Създадена е и повеската за втори ден.";
  }

  if (result.status === "updated") {
    return " Обновена е и повеската за втори ден.";
  }

  if (result.status === "employee-conflict") {
    return ` Повеската за втори ден не е създадена, защото служителят има запис за ${result.date}.`;
  }

  if (result.status === "slot-conflict") {
    return ` Повеската за втори ден не е създадена, защото ролята вече е попълнена за ${result.date}.`;
  }

  return "";
}
