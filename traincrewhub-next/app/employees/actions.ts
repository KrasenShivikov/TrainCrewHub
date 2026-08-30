"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/db";
import { employees, positions } from "@/db/schema";
import { requireUser } from "@/lib/auth/session";

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
  const user = await requireUser();
  const title = String(formData.get("title") ?? "").trim();

  if (!title) {
    return;
  }

  await getDb().insert(positions).values({
    title,
    createdFrom: user.id
  });

  revalidatePath("/employees");
}

export async function createEmployeeAction(formData: FormData) {
  const user = await requireUser();
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
    return;
  }

  await getDb().insert(employees).values({
    ...parsed.data,
    createdFrom: user.id
  });

  revalidatePath("/employees");
}

export async function updateEmployeeAction(formData: FormData) {
  await requireUser();
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
    return;
  }

  await getDb()
    .update(employees)
    .set({
      ...parsed.data,
      updatedAt: new Date()
    })
    .where(eq(employees.id, employeeId));

  revalidatePath("/employees");
}

export async function deleteEmployeeAction(formData: FormData) {
  await requireUser();
  const employeeId = String(formData.get("id") ?? "");

  if (!employeeId) {
    return;
  }

  await getDb().delete(employees).where(eq(employees.id, employeeId));
  revalidatePath("/employees");
}
