"use server";

import { revalidatePath } from "next/cache";
import { and, eq, gte, lte, ne } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/db";
import { absenceReasons, actualDuties, employeeAbsences, plannedDuties, scheduleChangeEvents } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { setFlash } from "@/lib/flash";

const assignmentRoleSchema = z.enum(["chief", "conductor"]);

const plannedDutySchema = z.object({
  date: z.string().trim().min(1),
  employeeId: z.string().uuid(),
  dutyId: z.string().uuid(),
  assignmentRole: assignmentRoleSchema
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
