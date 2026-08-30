"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/db";
import { employees, positions } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { setFlash } from "@/lib/flash";

const nullableDate = z
  .string()
  .trim()
  .transform((value) => value || null);

const employeeSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  positionId: z
    .string()
    .trim()
    .transform((value) => value || null),
  isActive: z.boolean(),
  psychologicalAssessmentExpiry: nullableDate,
  medicalCertificateExpiry: nullableDate,
  licenseExpiry: nullableDate
});

export async function createPositionAction(formData: FormData) {
  const { user } = await requirePermission("positions", "create");
  const title = String(formData.get("title") ?? "").trim();

  if (!title) {
    await setFlash({ kind: "error", text: "Въведи име на позиция." });
    return;
  }

  await getDb().insert(positions).values({
    title,
    createdFrom: user.id
  });

  await setFlash({ kind: "success", text: "Позицията е добавена." });
  revalidatePath("/employees");
}

export async function createEmployeeAction(formData: FormData) {
  const { user } = await requirePermission("employees", "create");
  const parsed = employeeSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    positionId: formData.get("positionId"),
    isActive: formData.get("isActive") === "on",
    psychologicalAssessmentExpiry: formData.get("psychologicalAssessmentExpiry"),
    medicalCertificateExpiry: formData.get("medicalCertificateExpiry"),
    licenseExpiry: formData.get("licenseExpiry")
  });

  if (!parsed.success) {
    await setFlash({ kind: "error", text: "Попълни име и фамилия на служителя." });
    return;
  }

  await getDb().insert(employees).values({
    ...parsed.data,
    createdFrom: user.id
  });

  await setFlash({ kind: "success", text: "Служителят е добавен." });
  revalidatePath("/employees");
}

export async function updateEmployeeAction(formData: FormData) {
  await requirePermission("employees", "edit");
  const employeeId = String(formData.get("id") ?? "");
  const parsed = employeeSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    positionId: formData.get("positionId"),
    isActive: formData.get("isActive") === "on",
    psychologicalAssessmentExpiry: formData.get("psychologicalAssessmentExpiry"),
    medicalCertificateExpiry: formData.get("medicalCertificateExpiry"),
    licenseExpiry: formData.get("licenseExpiry")
  });

  if (!employeeId || !parsed.success) {
    await setFlash({ kind: "error", text: "Провери данните за служителя." });
    return;
  }

  await getDb()
    .update(employees)
    .set({
      ...parsed.data,
      updatedAt: new Date()
    })
    .where(eq(employees.id, employeeId));

  await setFlash({ kind: "success", text: "Служителят е обновен." });
  revalidatePath("/employees");
}

export async function deleteEmployeeAction(formData: FormData) {
  await requirePermission("employees", "delete");
  const employeeId = String(formData.get("id") ?? "");

  if (!employeeId) {
    await setFlash({ kind: "error", text: "Липсва служител за изтриване." });
    return;
  }

  await getDb().delete(employees).where(eq(employees.id, employeeId));
  await setFlash({ kind: "success", text: "Служителят е изтрит." });
  revalidatePath("/employees");
}
