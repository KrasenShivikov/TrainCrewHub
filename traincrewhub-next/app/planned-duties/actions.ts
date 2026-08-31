"use server";

import { revalidatePath } from "next/cache";
import { and, asc, eq, gte, inArray, lte, ne } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/db";
import { absenceReasons, actualDuties, duties, employeeAbsences, plannedDuties, scheduleChangeEvents, scheduleKeyDuties } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { setFlash } from "@/lib/flash";

const assignmentRoleSchema = z.enum(["chief", "conductor"]);

const plannedDutySchema = z.object({
  date: z.string().trim().min(1),
  employeeId: z.string().uuid(),
  dutyId: z.string().uuid(),
  assignmentRole: assignmentRoleSchema
});

const autoPlannedDutySchema = z.object({
  employeeId: z.string().uuid(),
  assignmentRole: assignmentRoleSchema,
  dateFrom: z.string().trim().min(1),
  dateTo: z.string().trim().min(1),
  scheduleKeyId: z.string().uuid(),
  startDutyId: z.string().uuid(),
  overwriteExisting: z.boolean()
});

function parsePlannedDuty(formData: FormData) {
  return plannedDutySchema.safeParse({
    date: formData.get("date"),
    employeeId: formData.get("employeeId"),
    dutyId: formData.get("dutyId"),
    assignmentRole: formData.get("assignmentRole")
  });
}

function revalidatePlannedDutyViews(date?: string, employeeId?: string | null, dutyId?: string | null) {
  revalidatePath("/planned-duties");
  revalidatePath("/plan-schedule");

  if (date) {
    revalidatePath(`/schedule/${date}`);
  }

  if (employeeId) {
    revalidatePath(`/employees/${employeeId}`);
  }

  if (dutyId) {
    revalidatePath(`/duties/${dutyId}`);
  }
}

function buildDateRange(dateFrom: string, dateTo: string) {
  const result: string[] = [];
  const from = new Date(`${dateFrom}T00:00:00`);
  const to = new Date(`${dateTo}T00:00:00`);

  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime()) || from > to) {
    return result;
  }

  for (const current = new Date(from); current <= to; current.setDate(current.getDate() + 1)) {
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, "0");
    const day = String(current.getDate()).padStart(2, "0");
    result.push(`${year}-${month}-${day}`);
  }

  return result;
}

async function findPlannedDutyConflict(date: string, employeeId: string, ignoreId?: string) {
  const db = getDb();
  const plannedWhere = ignoreId
    ? and(eq(plannedDuties.employeeId, employeeId), eq(plannedDuties.date, date), ne(plannedDuties.id, ignoreId))
    : and(eq(plannedDuties.employeeId, employeeId), eq(plannedDuties.date, date));

  const [existingPlanned] = await db.select({ id: plannedDuties.id }).from(plannedDuties).where(plannedWhere).limit(1);

  if (existingPlanned) {
    return "Служителят вече има планирана повеска за тази дата.";
  }

  const [absence] = await db
    .select({
      reasonName: absenceReasons.name,
      startDate: employeeAbsences.startDate,
      endDate: employeeAbsences.endDate
    })
    .from(employeeAbsences)
    .leftJoin(absenceReasons, eq(employeeAbsences.reasonId, absenceReasons.id))
    .where(and(eq(employeeAbsences.employeeId, employeeId), lte(employeeAbsences.startDate, date), gte(employeeAbsences.endDate, date)))
    .limit(1);

  if (absence) {
    return `Служителят е в отсъствие за тази дата (${absence.reasonName ?? "без причина"}, ${absence.startDate} - ${absence.endDate}).`;
  }

  return null;
}

async function findActualDutyConflict(date: string, employeeId: string) {
  const [existingActual] = await getDb()
    .select({ id: actualDuties.id })
    .from(actualDuties)
    .where(and(eq(actualDuties.employeeId, employeeId), eq(actualDuties.date, date)))
    .limit(1);

  return existingActual ? "Служителят вече има действителна повеска за тази дата." : null;
}

export async function createPlannedDutyAction(formData: FormData) {
  const { user } = await requirePermission("planned_duties", "create");
  const parsed = parsePlannedDuty(formData);

  if (!parsed.success) {
    await setFlash({ kind: "error", text: "Провери данните за планираната повеска." });
    return;
  }

  const conflict = await findPlannedDutyConflict(parsed.data.date, parsed.data.employeeId);
  if (conflict) {
    await setFlash({ kind: "error", text: conflict });
    return;
  }

  await getDb().insert(plannedDuties).values({
    ...parsed.data,
    createdFrom: user.id
  });

  await setFlash({ kind: "success", text: "Планираната повеска е добавена." });
  revalidatePlannedDutyViews(parsed.data.date, parsed.data.employeeId, parsed.data.dutyId);
}

export async function autoGeneratePlannedDutiesAction(formData: FormData) {
  const { user } = await requirePermission("planned_duties", "create");
  const parsed = autoPlannedDutySchema.safeParse({
    employeeId: formData.get("employeeId"),
    assignmentRole: formData.get("assignmentRole"),
    dateFrom: formData.get("dateFrom"),
    dateTo: formData.get("dateTo"),
    scheduleKeyId: formData.get("scheduleKeyId"),
    startDutyId: formData.get("startDutyId"),
    overwriteExisting: formData.get("overwriteExisting") === "1"
  });

  if (!parsed.success) {
    await setFlash({ kind: "error", text: "Провери данните за автоматично планиране." });
    return;
  }

  const { employeeId, assignmentRole, dateFrom, dateTo, scheduleKeyId, startDutyId, overwriteExisting } = parsed.data;

  if (dateTo < dateFrom) {
    await setFlash({ kind: "error", text: "Полето \"До дата\" трябва да е след или равно на \"От дата\"." });
    return;
  }

  const dates = buildDateRange(dateFrom, dateTo);
  if (!dates.length) {
    await setFlash({ kind: "error", text: "Невалиден период за автоматично планиране." });
    return;
  }

  const db = getDb();
  const cycleDuties = await db
    .select({
      id: duties.id,
      name: duties.name,
      displayOrder: duties.displayOrder
    })
    .from(scheduleKeyDuties)
    .innerJoin(duties, eq(scheduleKeyDuties.dutyId, duties.id))
    .where(eq(scheduleKeyDuties.scheduleKeyId, scheduleKeyId))
    .orderBy(asc(scheduleKeyDuties.displayOrder), asc(duties.displayOrder), asc(duties.name));

  if (!cycleDuties.length) {
    await setFlash({ kind: "error", text: "Няма повески за избрания ключ-график." });
    return;
  }

  const startIndex = cycleDuties.findIndex((duty) => duty.id === startDutyId);
  if (startIndex < 0) {
    await setFlash({ kind: "error", text: "Избери валидна стартова повеска от избрания ключ-график." });
    return;
  }

  const [existingRows, absenceRows] = await Promise.all([
    db
      .select({ id: plannedDuties.id, date: plannedDuties.date })
      .from(plannedDuties)
      .where(and(eq(plannedDuties.employeeId, employeeId), gte(plannedDuties.date, dateFrom), lte(plannedDuties.date, dateTo))),
    db
      .select({ startDate: employeeAbsences.startDate, endDate: employeeAbsences.endDate })
      .from(employeeAbsences)
      .where(and(eq(employeeAbsences.employeeId, employeeId), lte(employeeAbsences.startDate, dateTo), gte(employeeAbsences.endDate, dateFrom)))
  ]);

  const existingDates = new Set(existingRows.map((row) => row.date));
  const absenceDates = new Set<string>();
  absenceRows.forEach((absence) => {
    buildDateRange(absence.startDate > dateFrom ? absence.startDate : dateFrom, absence.endDate < dateTo ? absence.endDate : dateTo).forEach((date) => {
      absenceDates.add(date);
    });
  });

  const skippedExisting = overwriteExisting ? 0 : dates.filter((date) => existingDates.has(date)).length;
  const skippedAbsences = dates.filter((date) => absenceDates.has(date)).length;
  const payload = dates.flatMap((date, dayIndex) => {
    if (absenceDates.has(date) || (!overwriteExisting && existingDates.has(date))) {
      return [];
    }

    const duty = cycleDuties[(startIndex + dayIndex) % cycleDuties.length];
    return {
      date,
      employeeId,
      assignmentRole,
      dutyId: duty.id,
      createdFrom: user.id
    };
  });

  if (!payload.length) {
    await setFlash({
      kind: "error",
      text: "Няма нови записи за създаване. За периода вече има планиране или служителят е в отсъствие."
    });
    return;
  }

  if (overwriteExisting && existingRows.length) {
    await db.delete(plannedDuties).where(inArray(plannedDuties.id, existingRows.map((row) => row.id)));
  }

  const insertedRows: Array<{ id: string; date: string; dutyId: string | null }> = [];
  for (let index = 0; index < payload.length; index += 200) {
    const chunk = payload.slice(index, index + 200);
    const inserted = await db.insert(plannedDuties).values(chunk).returning({
      id: plannedDuties.id,
      date: plannedDuties.date,
      dutyId: plannedDuties.dutyId
    });
    insertedRows.push(...inserted);
  }

  revalidatePath("/planned-duties");
  revalidatePath("/plan-schedule");
  revalidatePath("/schedule");
  revalidatePath(`/employees/${employeeId}`);
  insertedRows.forEach((row) => {
    revalidatePath(`/schedule/${row.date}`);
    if (row.dutyId) {
      revalidatePath(`/duties/${row.dutyId}`);
    }
  });

  const parts = [`Създадени записи: ${insertedRows.length}`];
  if (overwriteExisting && existingRows.length) {
    parts.push(`презаписани дати: ${existingRows.length}`);
  }
  if (skippedExisting) {
    parts.push(`пропуснати съществуващи: ${skippedExisting}`);
  }
  if (skippedAbsences) {
    parts.push(`пропуснати отсъствия: ${skippedAbsences}`);
  }

  await setFlash({ kind: "success", text: `${parts.join(". ")}.` });
}

export async function updatePlannedDutyAction(formData: FormData) {
  await requirePermission("planned_duties", "edit");
  const id = String(formData.get("id") ?? "");
  const parsed = parsePlannedDuty(formData);

  if (!id || !parsed.success) {
    await setFlash({ kind: "error", text: "Провери данните за планираната повеска." });
    return;
  }

  const conflict = await findPlannedDutyConflict(parsed.data.date, parsed.data.employeeId, id);
  if (conflict) {
    await setFlash({ kind: "error", text: conflict });
    return;
  }

  const db = getDb();
  const [existing] = await db.select().from(plannedDuties).where(eq(plannedDuties.id, id)).limit(1);

  await db.update(plannedDuties).set(parsed.data).where(eq(plannedDuties.id, id));
  await setFlash({ kind: "success", text: "Планираната повеска е обновена." });
  revalidatePlannedDutyViews(parsed.data.date, parsed.data.employeeId, parsed.data.dutyId);

  if (existing?.date && existing.date !== parsed.data.date) {
    revalidatePlannedDutyViews(existing.date, existing.employeeId, existing.dutyId);
  }
}

export async function deletePlannedDutyAction(formData: FormData) {
  await requirePermission("planned_duties", "delete");
  const id = String(formData.get("id") ?? "");

  if (!id) {
    await setFlash({ kind: "error", text: "Липсва планирана повеска за изтриване." });
    return;
  }

  const db = getDb();
  const [existing] = await db.select().from(plannedDuties).where(eq(plannedDuties.id, id)).limit(1);

  await db.delete(plannedDuties).where(eq(plannedDuties.id, id));
  await setFlash({ kind: "success", text: "Планираната повеска е изтрита." });
  revalidatePlannedDutyViews(existing?.date, existing?.employeeId, existing?.dutyId);
}

export async function copyPlannedToActualAction(formData: FormData) {
  await requirePermission("planned_duties", "create");
  const { user } = await requirePermission("actual_duties", "create");
  const id = String(formData.get("id") ?? "");

  if (!id) {
    await setFlash({ kind: "error", text: "Липсва планирана повеска за копиране." });
    return;
  }

  const db = getDb();
  const [planned] = await db.select().from(plannedDuties).where(eq(plannedDuties.id, id)).limit(1);

  if (!planned || !planned.employeeId || !planned.dutyId) {
    await setFlash({ kind: "error", text: "Планираната повеска не може да бъде копирана." });
    return;
  }

  const conflict = await findActualDutyConflict(planned.date, planned.employeeId);
  if (conflict) {
    await setFlash({ kind: "error", text: conflict });
    return;
  }

  await db.insert(actualDuties).values({
    date: planned.date,
    employeeId: planned.employeeId,
    dutyId: planned.dutyId,
    assignmentRole: planned.assignmentRole,
    reportedAt: new Date()
  });
  await db.insert(scheduleChangeEvents).values({
    date: planned.date,
    employeeId: planned.employeeId,
    dutyId: planned.dutyId,
    action: "planned_duty_copied_to_actual",
    createdBy: user.id
  });

  await setFlash({ kind: "success", text: "Планираната повеска е копирана в действителни." });
  revalidatePath("/actual-duties");
  revalidatePath("/schedule");
  revalidatePlannedDutyViews(planned.date, planned.employeeId, planned.dutyId);
}
