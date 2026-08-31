"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { getDb } from "@/db";
import { scheduleChangeEvents, schedulePublications } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { setFlash } from "@/lib/flash";

function revalidateScheduleViews(date: string) {
  revalidatePath("/schedule");
  revalidatePath(`/schedule/${date}`);
}

export async function publishScheduleAction(formData: FormData) {
  const { user } = await requirePermission("schedule_publications", "create");
  const date = String(formData.get("date") ?? "");

  if (!date) {
    await setFlash({ kind: "error", text: "Избери дата за публикуване." });
    return;
  }

  const db = getDb();
  await db
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
  await db.insert(scheduleChangeEvents).values({
    date,
    action: "schedule_published",
    createdBy: user.id
  });

  await setFlash({ kind: "success", text: "Графикът е публикуван." });
  revalidateScheduleViews(date);
}

export async function confirmScheduleAction(formData: FormData) {
  const { user } = await requirePermission("schedule_publications", "edit");
  const date = String(formData.get("date") ?? "");

  if (!date) {
    await setFlash({ kind: "error", text: "Избери дата за потвърждение." });
    return;
  }

  const db = getDb();
  await db
    .update(schedulePublications)
    .set({
      confirmedAt: new Date(),
      confirmedBy: user.id
    })
    .where(eq(schedulePublications.date, date));
  await db.insert(scheduleChangeEvents).values({
    date,
    action: "schedule_confirmed",
    createdBy: user.id
  });

  await setFlash({ kind: "success", text: "Графикът е потвърден." });
  revalidateScheduleViews(date);
}
