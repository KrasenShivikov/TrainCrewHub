"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/db";
import { actualDuties } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";

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

export async function createActualDutyAction(formData: FormData) {
  await requirePermission("actual_duties", "create");
  const parsed = parseActualDuty(formData);
  if (!parsed.success) return;

  await getDb().insert(actualDuties).values({
    ...parsed.data,
    reportedAt: new Date()
  });

  revalidatePath("/actual-duties");
  revalidatePath("/schedule");
}

export async function updateActualDutyAction(formData: FormData) {
  await requirePermission("actual_duties", "edit");
  const id = String(formData.get("id") ?? "");
  const parsed = parseActualDuty(formData);
  if (!id || !parsed.success) return;

  await getDb().update(actualDuties).set(parsed.data).where(eq(actualDuties.id, id));
  revalidatePath("/actual-duties");
  revalidatePath("/schedule");
}

export async function deleteActualDutyAction(formData: FormData) {
  await requirePermission("actual_duties", "delete");
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await getDb().delete(actualDuties).where(eq(actualDuties.id, id));
  revalidatePath("/actual-duties");
  revalidatePath("/schedule");
}
