"use server";

import { revalidatePath } from "next/cache";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/db";
import { duties, scheduleKeyDuties, scheduleKeys } from "@/db/schema";
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

const nullableUuid = z
  .string()
  .trim()
  .transform((value) => value || null);

const nullableText = z
  .string()
  .trim()
  .transform((value) => value || null);

const scheduleKeyDutySchema = z.object({
  scheduleKeyId: z.string().uuid(),
  name: z.string().trim().min(1),
  dutyTypeId: nullableUuid,
  startTime: z.string().trim().min(1),
  endTime: z.string().trim().min(1),
  breakStartTime: z.string().trim().optional().transform((value) => value || null),
  breakEndTime: z.string().trim().optional().transform((value) => value || null),
  isSecondDay: z.boolean(),
  notes: nullableText
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

async function nextScheduleKeyDutyOrder(scheduleKeyId: string) {
  const [orderRow] = await getDb()
    .select({ maxOrder: sql<number>`coalesce(max(${scheduleKeyDuties.displayOrder}), 0)` })
    .from(scheduleKeyDuties)
    .where(eq(scheduleKeyDuties.scheduleKeyId, scheduleKeyId));

  return Number(orderRow?.maxOrder ?? 0) + 1;
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

export async function reorderScheduleKeyDutiesAction(formData: FormData) {
  await requirePermission("schedule_keys", "edit");
  const scheduleKeyId = String(formData.get("scheduleKeyId") ?? "");
  const dutyIds = formData.getAll("dutyIds").map((value) => String(value)).filter(Boolean);

  if (!scheduleKeyId || !dutyIds.length) {
    await setFlash({ kind: "error", text: "Няма избрани повески за подреждане." });
    return;
  }

  const db = getDb();
  await Promise.all(
    dutyIds.map((dutyId, index) =>
      db
        .update(scheduleKeyDuties)
        .set({ displayOrder: index + 1 })
        .where(and(eq(scheduleKeyDuties.scheduleKeyId, scheduleKeyId), eq(scheduleKeyDuties.dutyId, dutyId)))
    )
  );

  await setFlash({ kind: "success", text: "Редът на повеските в ключ-графика е обновен." });
  revalidatePath("/schedule-keys");
  revalidatePath("/duties");
  revalidatePath("/planned-duties");
}

export async function attachDutyToScheduleKeyAction(formData: FormData) {
  await requirePermission("schedule_keys", "edit");
  const scheduleKeyId = String(formData.get("scheduleKeyId") ?? "");
  const dutyId = String(formData.get("dutyId") ?? "");

  if (!scheduleKeyId || !dutyId) {
    await setFlash({ kind: "error", text: "Избери ключ-график и повеска за свързване." });
    return;
  }

  const db = getDb();
  const [existing] = await db
    .select({ dutyId: scheduleKeyDuties.dutyId })
    .from(scheduleKeyDuties)
    .where(and(eq(scheduleKeyDuties.scheduleKeyId, scheduleKeyId), eq(scheduleKeyDuties.dutyId, dutyId)))
    .limit(1);

  if (existing) {
    await setFlash({ kind: "info", text: "Повеската вече е свързана към този ключ-график." });
    return;
  }

  await db.insert(scheduleKeyDuties).values({
    scheduleKeyId,
    dutyId,
    displayOrder: await nextScheduleKeyDutyOrder(scheduleKeyId)
  });

  await setFlash({ kind: "success", text: "Повеската е свързана към ключ-графика." });
  revalidatePath("/schedule-keys");
  revalidatePath("/duties");
  revalidatePath("/planned-duties");
}

export async function createDutyForScheduleKeyAction(formData: FormData) {
  const { user } = await requirePermission("duties", "create");
  await requirePermission("schedule_keys", "edit");
  const parsed = scheduleKeyDutySchema.safeParse({
    scheduleKeyId: formData.get("scheduleKeyId"),
    name: formData.get("name"),
    dutyTypeId: formData.get("dutyTypeId"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    breakStartTime: formData.get("breakStartTime"),
    breakEndTime: formData.get("breakEndTime"),
    isSecondDay: formData.get("isSecondDay") === "on",
    notes: formData.get("notes")
  });

  if (!parsed.success) {
    await setFlash({ kind: "error", text: "Провери данните за новата повеска." });
    return;
  }

  const db = getDb();
  const [orderRow] = await db
    .select({ maxOrder: sql<number>`coalesce(max(${duties.displayOrder}), 0)` })
    .from(duties);
  const scheduleKeyOrder = await nextScheduleKeyDutyOrder(parsed.data.scheduleKeyId);

  const [createdDuty] = await db
    .insert(duties)
    .values({
      name: parsed.data.name,
      dutyTypeId: parsed.data.dutyTypeId,
      scheduleKeyId: parsed.data.scheduleKeyId,
      startTime: parsed.data.startTime,
      endTime: parsed.data.endTime,
      breakStartTime: parsed.data.breakStartTime,
      breakEndTime: parsed.data.breakEndTime,
      isSecondDay: parsed.data.isSecondDay,
      notes: parsed.data.notes,
      displayOrder: Number(orderRow?.maxOrder ?? 0) + 1,
      createdFrom: user.id
    })
    .returning({ id: duties.id });

  await db.insert(scheduleKeyDuties).values({
    scheduleKeyId: parsed.data.scheduleKeyId,
    dutyId: createdDuty.id,
    displayOrder: scheduleKeyOrder
  });

  await setFlash({ kind: "success", text: "Новата повеска е създадена и свързана към ключ-графика." });
  revalidatePath("/schedule-keys");
  revalidatePath("/duties");
  revalidatePath("/planned-duties");
}
