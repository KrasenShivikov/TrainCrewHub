"use server";

import { revalidatePath } from "next/cache";
import { and, eq, gte, inArray, lte, ne, or } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/db";
import { absenceReasons, actualDuties, employeeAbsences, scheduleChangeEvents } from "@/db/schema";
import { createSecondDayActualDutyForParent, secondDayFlashSuffix, syncSecondDayActualDutyFromParent } from "@/lib/actual-duty-second-day";
import { findActualDutyRestConflict } from "@/lib/actual-duty-rest-window";
import { requirePermission } from "@/lib/auth/permissions";
import { setFlash } from "@/lib/flash";

const roleSchema = z.enum(["chief", "conductor"]);

const actualDutySchema = z.object({
  date: z.string().trim().min(1),
  employeeId: z.string().uuid(),
  dutyId: z.string().uuid(),
  assignmentRole: roleSchema,
  startTimeOverride: z.string().trim().optional().transform((value) => value || null),
  endTimeOverride: z.string().trim().optional().transform((value) => value || null)
});

function parseActualDuty(formData: FormData) {
  return actualDutySchema.safeParse({
    date: formData.get("date"),
    employeeId: formData.get("employeeId"),
    dutyId: formData.get("dutyId"),
    assignmentRole: formData.get("assignmentRole"),
    startTimeOverride: formData.get("startTimeOverride"),
    endTimeOverride: formData.get("endTimeOverride")
  });
}

function revalidateActualDutyViews(date: string, employeeId?: string | null, dutyId?: string | null) {
  revalidatePath("/actual-duties");
  revalidatePath("/schedule");
  revalidatePath(`/schedule/${date}`);

  if (employeeId) {
    revalidatePath(`/employees/${employeeId}`);
  }

  if (dutyId) {
    revalidatePath(`/duties/${dutyId}`);
  }
}

async function findActualDutyConflict(date: string, employeeId: string, ignoreId?: string) {
  const db = getDb();
  const actualWhere = ignoreId
    ? and(eq(actualDuties.employeeId, employeeId), eq(actualDuties.date, date), ne(actualDuties.id, ignoreId))
    : and(eq(actualDuties.employeeId, employeeId), eq(actualDuties.date, date));

  const [existingActual] = await db.select({ id: actualDuties.id }).from(actualDuties).where(actualWhere).limit(1);

  if (existingActual) {
    return "Служителят вече има действителна повеска за тази дата.";
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

export async function createActualDutyAction(formData: FormData) {
  const { user } = await requirePermission("actual_duties", "create");
  const parsed = parseActualDuty(formData);
  if (!parsed.success) {
    await setFlash({ kind: "error", text: "Провери данните за действителната повеска." });
    return;
  }

  const conflict = await findActualDutyConflict(parsed.data.date, parsed.data.employeeId);
  if (conflict) {
    await setFlash({ kind: "error", text: conflict });
    return;
  }

  const restConflict = await findActualDutyRestConflict(parsed.data);
  if (restConflict) {
    await setFlash({ kind: "error", text: restConflict });
    return;
  }

  const db = getDb();
  const [createdActual] = await db.insert(actualDuties).values({
    ...parsed.data,
    originalEmployeeId: parsed.data.employeeId,
    originalDutyId: parsed.data.dutyId,
    originalAssignmentRole: parsed.data.assignmentRole,
    reportedAt: new Date()
  }).returning({ id: actualDuties.id });
  await db.insert(scheduleChangeEvents).values({
    date: parsed.data.date,
    employeeId: parsed.data.employeeId,
    dutyId: parsed.data.dutyId,
    action: "actual_duty_created",
    createdBy: user.id
  });
  const secondDayResult = await createSecondDayActualDutyForParent({
    date: parsed.data.date,
    employeeId: parsed.data.employeeId,
    dutyId: parsed.data.dutyId,
    assignmentRole: parsed.data.assignmentRole,
    sourceActualDutyId: createdActual.id,
    createdBy: user.id
  });

  await setFlash({ kind: "success", text: `Действителната повеска е добавена.${secondDayFlashSuffix(secondDayResult)}` });
  revalidateActualDutyViews(parsed.data.date, parsed.data.employeeId, parsed.data.dutyId);
  if (secondDayResult.status === "created" || secondDayResult.status === "updated" || secondDayResult.status === "already-created" || secondDayResult.status === "slot-conflict") {
    revalidateActualDutyViews(secondDayResult.date, parsed.data.employeeId, secondDayResult.dutyId);
  }
}

export async function updateActualDutyAction(formData: FormData) {
  const { user } = await requirePermission("actual_duties", "edit");
  const id = String(formData.get("id") ?? "");
  const parsed = parseActualDuty(formData);
  if (!id || !parsed.success) {
    await setFlash({ kind: "error", text: "Провери данните за действителната повеска." });
    return;
  }

  const conflict = await findActualDutyConflict(parsed.data.date, parsed.data.employeeId, id);
  if (conflict) {
    await setFlash({ kind: "error", text: conflict });
    return;
  }

  const restConflict = await findActualDutyRestConflict({ ...parsed.data, ignoreActualDutyIds: [id] });
  if (restConflict) {
    await setFlash({ kind: "error", text: restConflict });
    return;
  }

  const db = getDb();
  const [existing] = await db.select().from(actualDuties).where(eq(actualDuties.id, id)).limit(1);

  await db.update(actualDuties).set(parsed.data).where(eq(actualDuties.id, id));
  await db.insert(scheduleChangeEvents).values({
    date: parsed.data.date,
    employeeId: parsed.data.employeeId,
    dutyId: parsed.data.dutyId,
    action: "actual_duty_updated",
    createdBy: user.id
  });
  const secondDayResult = existing?.sourceActualDutyId
    ? null
    : await syncSecondDayActualDutyFromParent({
        date: parsed.data.date,
        employeeId: parsed.data.employeeId,
        dutyId: parsed.data.dutyId,
        assignmentRole: parsed.data.assignmentRole,
        sourceActualDutyId: id,
        createdBy: user.id
      });

  await setFlash({ kind: "success", text: `Действителната повеска е обновена.${secondDayResult ? secondDayFlashSuffix(secondDayResult) : ""}` });
  revalidateActualDutyViews(parsed.data.date, parsed.data.employeeId, parsed.data.dutyId);
  if (secondDayResult?.status === "created" || secondDayResult?.status === "updated" || secondDayResult?.status === "already-created" || secondDayResult?.status === "slot-conflict") {
    revalidateActualDutyViews(secondDayResult.date, parsed.data.employeeId, secondDayResult.dutyId);
  }

  if (existing?.date && existing.date !== parsed.data.date) {
    revalidateActualDutyViews(existing.date, existing.employeeId, existing.dutyId);
  }
}

export async function deleteActualDutyAction(formData: FormData) {
  const { user } = await requirePermission("actual_duties", "delete");
  const id = String(formData.get("id") ?? "");
  if (!id) {
    await setFlash({ kind: "error", text: "Липсва действителна повеска за изтриване." });
    return;
  }

  const db = getDb();
  const [existing] = await db.select().from(actualDuties).where(eq(actualDuties.id, id)).limit(1);

  if (!existing) {
    await setFlash({ kind: "error", text: "Действителната повеска не е намерена." });
    return;
  }

  await db.delete(actualDuties).where(eq(actualDuties.id, id));
  await db.insert(scheduleChangeEvents).values({
    date: existing.date,
    employeeId: existing.employeeId,
    dutyId: existing.dutyId,
    action: "actual_duty_deleted",
    createdBy: user.id
  });

  await setFlash({ kind: "success", text: "Действителната повеска е изтрита." });
  revalidateActualDutyViews(existing.date, existing.employeeId, existing.dutyId);
}

export async function deleteSelectedActualDutiesAction(formData: FormData) {
  const { user } = await requirePermission("actual_duties", "delete");
  const ids = formData.getAll("ids").map(String).filter(Boolean);

  if (!ids.length) {
    await setFlash({ kind: "error", text: "Избери поне една реална повеска за изтриване." });
    return;
  }

  const db = getDb();
  const rowsToDelete = await db
    .select()
    .from(actualDuties)
    .where(or(inArray(actualDuties.id, ids), inArray(actualDuties.sourceActualDutyId, ids)));

  if (!rowsToDelete.length) {
    await setFlash({ kind: "error", text: "Избраните реални повески не са намерени." });
    return;
  }

  await db.delete(actualDuties).where(inArray(actualDuties.id, rowsToDelete.map((row) => row.id)));

  for (const row of rowsToDelete) {
    await db.insert(scheduleChangeEvents).values({
      date: row.date,
      employeeId: row.employeeId,
      dutyId: row.dutyId,
      action: "actual_duty_deleted",
      createdBy: user.id
    });
    revalidateActualDutyViews(row.date, row.employeeId, row.dutyId);
  }

  const linkedCount = rowsToDelete.filter((row) => row.sourceActualDutyId && ids.includes(row.sourceActualDutyId)).length;
  const parts = [`Изтрити реални повески: ${rowsToDelete.length}`];
  if (linkedCount) {
    parts.push(`включително втори дни: ${linkedCount}`);
  }

  await setFlash({ kind: "success", text: `${parts.join(". ")}.` });
}
