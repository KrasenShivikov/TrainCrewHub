"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { getDb } from "@/db";
import { dutyTypes } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";

export async function createDutyTypeAction(formData: FormData) {
  const { user } = await requirePermission("duty_types", "create");
  const name = String(formData.get("name") ?? "").trim();

  if (!name) return;

  await getDb().insert(dutyTypes).values({ name, createdFrom: user.id }).onConflictDoNothing();
  revalidatePath("/duty-types");
}

export async function updateDutyTypeAction(formData: FormData) {
  await requirePermission("duty_types", "edit");
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();

  if (!id || !name) return;

  await getDb().update(dutyTypes).set({ name }).where(eq(dutyTypes.id, id));
  revalidatePath("/duty-types");
}

export async function deleteDutyTypeAction(formData: FormData) {
  await requirePermission("duty_types", "delete");
  const id = String(formData.get("id") ?? "");

  if (!id) return;

  await getDb().delete(dutyTypes).where(eq(dutyTypes.id, id));
  revalidatePath("/duty-types");
}
