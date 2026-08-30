"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/db";
import { scheduleKeys } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { setFlash } from "@/lib/flash";

const scheduleKeySchema = z.object({
  name: z.string().trim().min(1),
  type: z.enum(["seasonal", "ad-hoc", "temporary"]),
  validFrom: z.string().trim().min(1),
  validTo: z.string().trim().min(1),
  crewRole: z.string().trim().optional().transform((value) => value || null),
  isActive: z.boolean()
});

function parseScheduleKey(formData: FormData) {
  return scheduleKeySchema.safeParse({
    name: formData.get("name"),
    type: formData.get("type"),
    validFrom: formData.get("validFrom"),
    validTo: formData.get("validTo"),
    crewRole: formData.get("crewRole"),
    isActive: formData.get("isActive") === "on"
  });
}

export async function createScheduleKeyAction(formData: FormData) {
  const { user } = await requirePermission("schedule_keys", "create");
  const parsed = parseScheduleKey(formData);
  if (!parsed.success) {
    await setFlash({ kind: "error", text: "Попълни данните за ключ-графика." });
    return;
  }

  await getDb().insert(scheduleKeys).values({ ...parsed.data, createdFrom: user.id });
  await setFlash({ kind: "success", text: "Ключ-графикът е добавен." });
  revalidatePath("/schedule-keys");
}

export async function updateScheduleKeyAction(formData: FormData) {
  await requirePermission("schedule_keys", "edit");
  const id = String(formData.get("id") ?? "");
  const parsed = parseScheduleKey(formData);
  if (!id || !parsed.success) {
    await setFlash({ kind: "error", text: "Провери данните за ключ-графика." });
    return;
  }

  await getDb().update(scheduleKeys).set(parsed.data).where(eq(scheduleKeys.id, id));
  await setFlash({ kind: "success", text: "Ключ-графикът е обновен." });
  revalidatePath("/schedule-keys");
}

export async function deleteScheduleKeyAction(formData: FormData) {
  await requirePermission("schedule_keys", "delete");
  const id = String(formData.get("id") ?? "");
  if (!id) {
    await setFlash({ kind: "error", text: "Липсва ключ-график за изтриване." });
    return;
  }

  await getDb().delete(scheduleKeys).where(eq(scheduleKeys.id, id));
  await setFlash({ kind: "success", text: "Ключ-графикът е изтрит." });
  revalidatePath("/schedule-keys");
}
