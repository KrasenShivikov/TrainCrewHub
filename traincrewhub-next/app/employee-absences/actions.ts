"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/db";
import { absenceReasons, employeeAbsences } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { setFlash } from "@/lib/flash";

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

  if (!name) {
    await setFlash({ kind: "error", text: "Въведи име на причина за отсъствие." });
    return;
  }

  await getDb().insert(absenceReasons).values({ name, description, createdFrom: user.id });
  await setFlash({ kind: "success", text: "Причината за отсъствие е добавена." });
  revalidatePath("/employee-absences");
}

export async function createEmployeeAbsenceAction(formData: FormData) {
  const { user } = await requirePermission("employee_absences", "create");
  const parsed = parseAbsence(formData);
  if (!parsed.success) {
    await setFlash({ kind: "error", text: "Провери данните за отсъствието." });
    return;
  }

  await getDb().insert(employeeAbsences).values({ ...parsed.data, createdFrom: user.id });
  await setFlash({ kind: "success", text: "Отсъствието е добавено." });
  revalidatePath("/employee-absences");
  revalidatePath("/plan-schedule");
}

export async function updateEmployeeAbsenceAction(formData: FormData) {
  await requirePermission("employee_absences", "edit");
  const id = String(formData.get("id") ?? "");
  const parsed = parseAbsence(formData);
  if (!id || !parsed.success) {
    await setFlash({ kind: "error", text: "Провери данните за отсъствието." });
    return;
  }

  await getDb().update(employeeAbsences).set(parsed.data).where(eq(employeeAbsences.id, id));
  await setFlash({ kind: "success", text: "Отсъствието е обновено." });
  revalidatePath("/employee-absences");
  revalidatePath("/plan-schedule");
}

export async function deleteEmployeeAbsenceAction(formData: FormData) {
  await requirePermission("employee_absences", "delete");
  const id = String(formData.get("id") ?? "");
  if (!id) {
    await setFlash({ kind: "error", text: "Липсва отсъствие за изтриване." });
    return;
  }

  await getDb().delete(employeeAbsences).where(eq(employeeAbsences.id, id));
  await setFlash({ kind: "success", text: "Отсъствието е изтрито." });
  revalidatePath("/employee-absences");
  revalidatePath("/plan-schedule");
}

export async function deleteAbsenceReasonAction(formData: FormData) {
  await requirePermission("absence_reasons", "delete");
  const id = String(formData.get("id") ?? "");
  if (!id) {
    await setFlash({ kind: "error", text: "Липсва причина за изтриване." });
    return;
  }

  await getDb().delete(absenceReasons).where(eq(absenceReasons.id, id));
  await setFlash({ kind: "success", text: "Причината за отсъствие е изтрита." });
  revalidatePath("/employee-absences");
}
