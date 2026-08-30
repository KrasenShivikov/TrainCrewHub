"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { getDb } from "@/db";
import { schedulePublications } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";

export async function publishScheduleAction(formData: FormData) {
  const { user } = await requirePermission("schedule_publications", "create");
  const date = String(formData.get("date") ?? "");

  if (!date) return;

  await getDb()
    .insert(schedulePublications)
    .values({
      date,
      publishedBy: user.id,
      publishedAt: new Date(),
      invalidatedAt: null
    })
    .onConflictDoUpdate({
      target: schedulePublications.date,
      set: {
        publishedBy: user.id,
        publishedAt: new Date(),
        confirmedAt: null,
        confirmedBy: null,
        invalidatedAt: null
      }
    });

  revalidatePath("/schedule");
}

export async function confirmScheduleAction(formData: FormData) {
  const { user } = await requirePermission("schedule_publications", "edit");
  const date = String(formData.get("date") ?? "");

  if (!date) return;

  await getDb()
    .update(schedulePublications)
    .set({
      confirmedAt: new Date(),
      confirmedBy: user.id
    })
    .where(eq(schedulePublications.date, date));

  revalidatePath("/schedule");
}
