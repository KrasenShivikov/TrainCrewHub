"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { getDb } from "@/db";
import { schedulePublications } from "@/db/schema";
import { requireUser } from "@/lib/auth/session";

export async function publishScheduleAction(formData: FormData) {
  const user = await requireUser();
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
  const user = await requireUser();
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
