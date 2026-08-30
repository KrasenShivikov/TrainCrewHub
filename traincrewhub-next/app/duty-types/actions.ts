"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { getDb } from "@/db";
import { dutyTypes } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { setFlash } from "@/lib/flash";

export async function createDutyTypeAction(formData: FormData) {
  const { user } = await requirePermission("duty_types", "create");
  const name = String(formData.get("name") ?? "").trim();

  if (!name) {
    await setFlash({ kind: "error", text: "Въведи име на тип повеска." });
    return;
  }

  await getDb().insert(dutyTypes).values({ name, createdFrom: user.id }).onConflictDoNothing();
  await setFlash({ kind: "success", text: "Типът повеска е добавен." });
  revalidatePath("/duty-types");
}

export async function updateDutyTypeAction(formData: FormData) {
  await requirePermission("duty_types", "edit");
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();

  if (!id || !name) {
    await setFlash({ kind: "error", text: "Провери данните за типа повеска." });
    return;
  }

  await getDb().update(dutyTypes).set({ name }).where(eq(dutyTypes.id, id));
  await setFlash({ kind: "success", text: "Типът повеска е обновен." });
  revalidatePath("/duty-types");
}

export async function deleteDutyTypeAction(formData: FormData) {
  await requirePermission("duty_types", "delete");
  const id = String(formData.get("id") ?? "");

  if (!id) {
    await setFlash({ kind: "error", text: "Липсва тип за изтриване." });
    return;
  }

  await getDb().delete(dutyTypes).where(eq(dutyTypes.id, id));
  await setFlash({ kind: "success", text: "Типът повеска е изтрит." });
  revalidatePath("/duty-types");
}
