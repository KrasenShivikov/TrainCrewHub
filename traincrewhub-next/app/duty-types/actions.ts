"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { getDb } from "@/db";
import { dutyTypes } from "@/db/schema";
import { requireUser } from "@/lib/auth/session";

export async function createDutyTypeAction(formData: FormData) {
  const user = await requireUser();
  const name = String(formData.get("name") ?? "").trim();

  if (!name) return;

  await getDb().insert(dutyTypes).values({ name, createdFrom: user.id }).onConflictDoNothing();
  revalidatePath("/duty-types");
}

export async function updateDutyTypeAction(formData: FormData) {
  await requireUser();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();

  if (!id || !name) return;

  await getDb().update(dutyTypes).set({ name }).where(eq(dutyTypes.id, id));
  revalidatePath("/duty-types");
}

export async function deleteDutyTypeAction(formData: FormData) {
  await requireUser();
  const id = String(formData.get("id") ?? "");

  if (!id) return;

  await getDb().delete(dutyTypes).where(eq(dutyTypes.id, id));
  revalidatePath("/duty-types");
}
