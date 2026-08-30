"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/db";
import { actualDuties, plannedDuties } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";

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

export async function createPlannedDutyAction(formData: FormData) {
  const { user } = await requirePermission("planned_duties", "create");
  const parsed = parsePlannedDuty(formData);

  if (!parsed.success) return;

  await getDb().insert(plannedDuties).values({
    ...parsed.data,
    createdFrom: user.id
  });

  revalidatePath("/planned-duties");
}

export async function updatePlannedDutyAction(formData: FormData) {
  await requirePermission("planned_duties", "edit");
  const id = String(formData.get("id") ?? "");
  const parsed = parsePlannedDuty(formData);

  if (!id || !parsed.success) return;

  await getDb().update(plannedDuties).set(parsed.data).where(eq(plannedDuties.id, id));
  revalidatePath("/planned-duties");
}

export async function deletePlannedDutyAction(formData: FormData) {
  await requirePermission("planned_duties", "delete");
  const id = String(formData.get("id") ?? "");

  if (!id) return;

  await getDb().delete(plannedDuties).where(eq(plannedDuties.id, id));
  revalidatePath("/planned-duties");
}

export async function copyPlannedToActualAction(formData: FormData) {
  await requirePermission("planned_duties", "create");
  await requirePermission("actual_duties", "create");
  const id = String(formData.get("id") ?? "");

  if (!id) return;

  const [planned] = await getDb()
    .select()
    .from(plannedDuties)
    .where(eq(plannedDuties.id, id))
    .limit(1);

  if (!planned || !planned.employeeId || !planned.dutyId) return;

  await getDb()
    .insert(actualDuties)
    .values({
      date: planned.date,
      employeeId: planned.employeeId,
      dutyId: planned.dutyId,
      assignmentRole: planned.assignmentRole,
      reportedAt: new Date()
    })
    .onConflictDoNothing();

  revalidatePath("/planned-duties");
  revalidatePath("/actual-duties");
}
