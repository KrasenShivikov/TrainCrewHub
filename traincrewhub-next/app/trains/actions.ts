"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/db";
import { trains } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { setFlash } from "@/lib/flash";

const trainSchema = z.object({
  number: z.string().trim().min(1),
  originStation: z.string().trim().min(1),
  destinationStation: z.string().trim().min(1),
  departureTime: z.string().trim().min(1),
  arrivalTime: z.string().trim().min(1),
  timetableUrl: z.string().trim().optional().transform((value) => value || null)
});

function parseTrain(formData: FormData) {
  return trainSchema.safeParse({
    number: formData.get("number"),
    originStation: formData.get("originStation"),
    destinationStation: formData.get("destinationStation"),
    departureTime: formData.get("departureTime"),
    arrivalTime: formData.get("arrivalTime"),
    timetableUrl: formData.get("timetableUrl")
  });
}

export async function createTrainAction(formData: FormData) {
  const { user } = await requirePermission("trains", "create");
  const parsed = parseTrain(formData);
  if (!parsed.success) {
    await setFlash({ kind: "error", text: "Попълни задължителните данни за влака." });
    return;
  }

  await getDb().insert(trains).values({ ...parsed.data, createdFrom: user.id });
  await setFlash({ kind: "success", text: "Влакът е добавен." });
  revalidatePath("/trains");
}

export async function updateTrainAction(formData: FormData) {
  await requirePermission("trains", "edit");
  const id = String(formData.get("id") ?? "");
  const parsed = parseTrain(formData);
  if (!id || !parsed.success) {
    await setFlash({ kind: "error", text: "Провери данните за влака." });
    return;
  }

  await getDb().update(trains).set(parsed.data).where(eq(trains.id, id));
  await setFlash({ kind: "success", text: "Влакът е обновен." });
  revalidatePath("/trains");
}

export async function deleteTrainAction(formData: FormData) {
  await requirePermission("trains", "delete");
  const id = String(formData.get("id") ?? "");
  if (!id) {
    await setFlash({ kind: "error", text: "Липсва влак за изтриване." });
    return;
  }

  await getDb().delete(trains).where(eq(trains.id, id));
  await setFlash({ kind: "success", text: "Влакът е изтрит." });
  revalidatePath("/trains");
}
