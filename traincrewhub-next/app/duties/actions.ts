"use server";

import { revalidatePath } from "next/cache";
import { eq, inArray, sql } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/db";
import { duties, dutyTrains, scheduleKeyDuties } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { setFlash } from "@/lib/flash";

const nullableUuid = z
  .string()
  .trim()
  .transform((value) => value || null);

const nullableText = z
  .string()
  .trim()
  .transform((value) => value || null);

const dutySchema = z.object({
  name: z.string().trim().min(1),
  dutyTypeId: nullableUuid,
  startTime: z.string().trim().min(1),
  endTime: z.string().trim().min(1),
  breakStartTime: z.string().trim().optional().transform((value) => value || null),
  breakEndTime: z.string().trim().optional().transform((value) => value || null),
  breakDuration: z.string().trim().optional().transform((value) => value || null),
  isSecondDay: z.boolean(),
  parentDutyId: nullableUuid,
  notes: nullableText,
  scheduleKeyIds: z.array(z.string().uuid()).min(1),
  trainIds: z.array(z.string().uuid())
});

function parseDuty(formData: FormData) {
  return dutySchema.safeParse({
    name: formData.get("name"),
    dutyTypeId: formData.get("dutyTypeId"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    breakStartTime: formData.get("breakStartTime"),
    breakEndTime: formData.get("breakEndTime"),
    breakDuration: formData.get("breakDuration"),
    isSecondDay: formData.get("isSecondDay") === "on",
    parentDutyId: formData.get("parentDutyId"),
    notes: formData.get("notes"),
    scheduleKeyIds: formData.getAll("scheduleKeyIds").map(String).filter(Boolean),
    trainIds: formData.getAll("trainIds").map(String).filter(Boolean)
  });
}

async function syncDutyLinks(dutyId: string, scheduleKeyIds: string[], trainIds: string[]) {
  const db = getDb();

  await db.delete(scheduleKeyDuties).where(eq(scheduleKeyDuties.dutyId, dutyId));
  await db.delete(dutyTrains).where(eq(dutyTrains.dutyId, dutyId));

  if (scheduleKeyIds.length) {
    await db.insert(scheduleKeyDuties).values(
      scheduleKeyIds.map((scheduleKeyId, index) => ({
        dutyId,
        scheduleKeyId,
        displayOrder: index + 1
      }))
    );
  }

  if (trainIds.length) {
    await db.insert(dutyTrains).values(
      trainIds.map((trainId, index) => ({
        dutyId,
        trainId,
        sequenceOrder: index + 1
      }))
    );
  }
}

export async function createDutyAction(formData: FormData) {
  const { user } = await requirePermission("duties", "create");
  const parsed = parseDuty(formData);

  if (!parsed.success) {
    await setFlash({ kind: "error", text: "Провери данните за повеската." });
    return;
  }

  const db = getDb();
  const [orderRow] = await db
    .select({ maxOrder: sql<number>`coalesce(max(${duties.displayOrder}), 0)` })
    .from(duties);

  const [createdDuty] = await db
    .insert(duties)
    .values({
      name: parsed.data.name,
      dutyTypeId: parsed.data.dutyTypeId,
      scheduleKeyId: parsed.data.scheduleKeyIds[0],
      startTime: parsed.data.startTime,
      endTime: parsed.data.endTime,
      breakStartTime: parsed.data.breakStartTime,
      breakEndTime: parsed.data.breakEndTime,
      breakDuration: parsed.data.breakDuration,
      isSecondDay: parsed.data.isSecondDay,
      parentDutyId: parsed.data.isSecondDay ? parsed.data.parentDutyId : null,
      notes: parsed.data.notes,
      displayOrder: Number(orderRow?.maxOrder ?? 0) + 1,
      createdFrom: user.id
    })
    .returning({ id: duties.id });

  await syncDutyLinks(createdDuty.id, parsed.data.scheduleKeyIds, parsed.data.trainIds);
  await setFlash({ kind: "success", text: "Повеската е добавена." });
  revalidatePath("/duties");
}

export async function updateDutyAction(formData: FormData) {
  await requirePermission("duties", "edit");
  const dutyId = String(formData.get("id") ?? "");
  const parsed = parseDuty(formData);

  if (!dutyId || !parsed.success) {
    await setFlash({ kind: "error", text: "Провери данните за повеската." });
    return;
  }

  await getDb()
    .update(duties)
    .set({
      name: parsed.data.name,
      dutyTypeId: parsed.data.dutyTypeId,
      scheduleKeyId: parsed.data.scheduleKeyIds[0],
      startTime: parsed.data.startTime,
      endTime: parsed.data.endTime,
      breakStartTime: parsed.data.breakStartTime,
      breakEndTime: parsed.data.breakEndTime,
      breakDuration: parsed.data.breakDuration,
      isSecondDay: parsed.data.isSecondDay,
      parentDutyId: parsed.data.isSecondDay ? parsed.data.parentDutyId : null,
      notes: parsed.data.notes
    })
    .where(eq(duties.id, dutyId));

  await syncDutyLinks(dutyId, parsed.data.scheduleKeyIds, parsed.data.trainIds);
  await setFlash({ kind: "success", text: "Повеската е обновена." });
  revalidatePath("/duties");
}

export async function deleteDutyAction(formData: FormData) {
  await requirePermission("duties", "delete");
  const dutyId = String(formData.get("id") ?? "");

  if (!dutyId) {
    await setFlash({ kind: "error", text: "Липсва повеска за изтриване." });
    return;
  }

  await getDb().delete(duties).where(eq(duties.id, dutyId));
  await setFlash({ kind: "success", text: "Повеската е изтрита." });
  revalidatePath("/duties");
}

export async function reorderDutiesAction(formData: FormData) {
  await requirePermission("duties", "edit");
  const ids = formData.getAll("dutyIds").map(String).filter(Boolean);

  if (!ids.length) {
    await setFlash({ kind: "error", text: "Няма избрани повески за подреждане." });
    return;
  }

  const db = getDb();
  const existingRows = await db.select({ id: duties.id }).from(duties).where(inArray(duties.id, ids));
  const existingIds = new Set(existingRows.map((row) => row.id));

  await Promise.all(
    ids
      .filter((id) => existingIds.has(id))
      .map((id, index) => db.update(duties).set({ displayOrder: index + 1 }).where(eq(duties.id, id)))
  );

  await setFlash({ kind: "success", text: "Редът на повеските е обновен." });
  revalidatePath("/duties");
}
