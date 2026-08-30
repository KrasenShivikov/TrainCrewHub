"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/db";
import { absenceReasons, employeeAbsences } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";

const absenceSchema = z.object({
  employeeId: z.string().uuid(),
  reasonId: z.string().uuid(),
  startDate: z.string().trim().min(1),
  endDate: z.string().trim().min(1),
  notes: z.string().trim().optional().transform((value) => value || null)
});

function parseAbsence(formData: FormData) {
  return absenceSchema.safeParse({
    employeeId: formData.get("employeeId"),
    reasonId: formData.get("reasonId"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    notes: formData.get("notes")
  });
}

export async function createAbsenceReasonAction(formData: FormData) {
  const { user } = await requirePermission("absence_reasons", "create");
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;

  if (!name) return;

  await getDb().insert(absenceReasons).values({ name, description, createdFrom: user.id });
  revalidatePath("/employee-absences");
}

export async function createEmployeeAbsenceAction(formData: FormData) {
  const { user } = await requirePermission("employee_absences", "create");
  const parsed = parseAbsence(formData);
  if (!parsed.success) return;

  await getDb().insert(employeeAbsences).values({ ...parsed.data, createdFrom: user.id });
  revalidatePath("/employee-absences");
  revalidatePath("/plan-schedule");
}

export async function updateEmployeeAbsenceAction(formData: FormData) {
  await requirePermission("employee_absences", "edit");
  const id = String(formData.get("id") ?? "");
  const parsed = parseAbsence(formData);
  if (!id || !parsed.success) return;

  await getDb().update(employeeAbsences).set(parsed.data).where(eq(employeeAbsences.id, id));
  revalidatePath("/employee-absences");
  revalidatePath("/plan-schedule");
}

export async function deleteEmployeeAbsenceAction(formData: FormData) {
  await requirePermission("employee_absences", "delete");
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await getDb().delete(employeeAbsences).where(eq(employeeAbsences.id, id));
  revalidatePath("/employee-absences");
  revalidatePath("/plan-schedule");
}

export async function deleteAbsenceReasonAction(formData: FormData) {
  await requirePermission("absence_reasons", "delete");
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await getDb().delete(absenceReasons).where(eq(absenceReasons.id, id));
  revalidatePath("/employee-absences");
}
