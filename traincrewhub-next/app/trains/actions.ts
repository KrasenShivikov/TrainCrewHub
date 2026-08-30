"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/db";
import { trains } from "@/db/schema";
import { requireUser } from "@/lib/auth/session";

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
  const user = await requireUser();
  const parsed = parseTrain(formData);
  if (!parsed.success) return;

  await getDb().insert(trains).values({ ...parsed.data, createdFrom: user.id });
  revalidatePath("/trains");
}

export async function updateTrainAction(formData: FormData) {
  await requireUser();
  const id = String(formData.get("id") ?? "");
  const parsed = parseTrain(formData);
  if (!id || !parsed.success) return;

  await getDb().update(trains).set(parsed.data).where(eq(trains.id, id));
  revalidatePath("/trains");
}

export async function deleteTrainAction(formData: FormData) {
  await requireUser();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await getDb().delete(trains).where(eq(trains.id, id));
  revalidatePath("/trains");
}
