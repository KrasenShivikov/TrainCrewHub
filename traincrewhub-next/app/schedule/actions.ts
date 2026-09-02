"use server";

import { revalidatePath } from "next/cache";
import { and, eq, gte, lte, ne } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/db";
import { absenceReasons, actualDuties, employeeAbsences, scheduleChangeEvents, schedulePublications } from "@/db/schema";
import { createSecondDayActualDutyForParent, secondDayFlashSuffix, syncSecondDayActualDutyFromParent, type SecondDayActualDutyResult } from "@/lib/actual-duty-second-day";
import { findActualDutyRestConflict } from "@/lib/actual-duty-rest-window";
import { requirePermission } from "@/lib/auth/permissions";
import { setFlash } from "@/lib/flash";

const missingAssignmentSchema = z.object({
  date: z.string().trim().min(1),
  employeeId: z.string().uuid(),
  dutyId: z.string().uuid(),
  assignmentRole: z.enum(["chief", "conductor"]),
  sourceActualDutyId: z.string().uuid().optional().or(z.literal(""))
});

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

export async function assignMissingActualDutyAction(formData: FormData) {
  const { user } = await requirePermission("actual_duties", "create");
  const parsed = missingAssignmentSchema.safeParse({
    date: formData.get("date"),
    employeeId: formData.get("employeeId"),
    dutyId: formData.get("dutyId"),
    assignmentRole: formData.get("assignmentRole"),
    sourceActualDutyId: formData.get("sourceActualDutyId")
  });

  if (!parsed.success) {
    await setFlash({ kind: "error", text: "Провери данните за назначението." });
    return;
  }

  const db = getDb();
  const { date, employeeId, dutyId, assignmentRole } = parsed.data;
  const sourceActualDutyId = parsed.data.sourceActualDutyId || null;

  const [sourceAssignment] = sourceActualDutyId
    ? await db.select().from(actualDuties).where(eq(actualDuties.id, sourceActualDutyId)).limit(1)
    : [];

  if (sourceActualDutyId && (!sourceAssignment || sourceAssignment.date !== date || sourceAssignment.employeeId !== employeeId)) {
    await setFlash({ kind: "error", text: "Изходното назначение не е намерено." });
    return;
  }

  const [employeeConflict] = sourceAssignment
    ? []
    : await db
        .select({ id: actualDuties.id })
        .from(actualDuties)
        .where(and(eq(actualDuties.employeeId, employeeId), eq(actualDuties.date, date)))
        .limit(1);

  if (!sourceAssignment && employeeConflict) {
    await setFlash({ kind: "error", text: "Служителят вече има действителна повеска за тази дата." });
    return;
  }

  const [targetAssignment] = await db
    .select()
    .from(actualDuties)
    .where(and(eq(actualDuties.date, date), eq(actualDuties.dutyId, dutyId), eq(actualDuties.assignmentRole, assignmentRole)))
    .limit(1);

  if (!sourceAssignment && targetAssignment) {
    await setFlash({ kind: "error", text: "Тази роля вече е попълнена. За разместване плъзни вече назначено име." });
    return;
  }

  const [absence] = await db
    .select({
      reasonName: absenceReasons.name,
      startDate: employeeAbsences.startDate,
      endDate: employeeAbsences.endDate
    })
    .from(employeeAbsences)
    .leftJoin(absenceReasons, eq(employeeAbsences.reasonId, absenceReasons.id))
    .where(and(eq(employeeAbsences.employeeId, employeeId), lte(employeeAbsences.startDate, date), gte(employeeAbsences.endDate, date)))
    .limit(1);

  if (absence) {
    await setFlash({
      kind: "error",
      text: `Служителят е в отсъствие за тази дата (${absence.reasonName ?? "без причина"}, ${absence.startDate} - ${absence.endDate}).`
    });
    return;
  }

  const secondDayResults: SecondDayActualDutyResult[] = [];

  if (sourceAssignment) {
    if (targetAssignment?.id === sourceAssignment.id) {
      await setFlash({ kind: "info", text: "Назначението остава без промяна." });
      return;
    }

    if (targetAssignment?.employeeId) {
      const sourceRestConflict = sourceAssignment.dutyId
        ? await findActualDutyRestConflict({
            date: sourceAssignment.date,
            employeeId: targetAssignment.employeeId,
            dutyId: sourceAssignment.dutyId,
            startTimeOverride: sourceAssignment.startTimeOverride,
            endTimeOverride: sourceAssignment.endTimeOverride,
            ignoreActualDutyIds: [sourceAssignment.id, targetAssignment.id]
          })
        : null;
      const targetRestConflict = targetAssignment.dutyId
        ? await findActualDutyRestConflict({
            date: targetAssignment.date,
            employeeId,
            dutyId: targetAssignment.dutyId,
            startTimeOverride: targetAssignment.startTimeOverride,
            endTimeOverride: targetAssignment.endTimeOverride,
            ignoreActualDutyIds: [sourceAssignment.id, targetAssignment.id]
          })
        : null;

      if (sourceRestConflict || targetRestConflict) {
        await setFlash({ kind: "error", text: sourceRestConflict ?? targetRestConflict ?? "Няма 12 часа почивка между повеските." });
        return;
      }

      await db.update(actualDuties).set({ employeeId: targetAssignment.employeeId }).where(eq(actualDuties.id, sourceAssignment.id));
      await db.update(actualDuties).set({ employeeId }).where(eq(actualDuties.id, targetAssignment.id));
      if (sourceAssignment.dutyId && sourceAssignment.assignmentRole) {
        secondDayResults.push(await syncSecondDayActualDutyFromParent({
          date: sourceAssignment.date,
          employeeId: targetAssignment.employeeId,
          dutyId: sourceAssignment.dutyId,
          assignmentRole: sourceAssignment.assignmentRole,
          sourceActualDutyId: sourceAssignment.id,
          createdBy: user.id,
          ignoreSourceActualDutyIds: [targetAssignment.id]
        }));
      }
      if (targetAssignment.dutyId && targetAssignment.assignmentRole) {
        secondDayResults.push(await syncSecondDayActualDutyFromParent({
          date: targetAssignment.date,
          employeeId,
          dutyId: targetAssignment.dutyId,
          assignmentRole: targetAssignment.assignmentRole,
          sourceActualDutyId: targetAssignment.id,
          createdBy: user.id,
          ignoreSourceActualDutyIds: [sourceAssignment.id]
        }));
      }
    } else {
      const restConflict = await findActualDutyRestConflict({
        date,
        employeeId,
        dutyId,
        ignoreActualDutyIds: [sourceAssignment.id]
      });
      if (restConflict) {
        await setFlash({ kind: "error", text: restConflict });
        return;
      }

      await db.update(actualDuties).set({ dutyId, assignmentRole }).where(eq(actualDuties.id, sourceAssignment.id));
      secondDayResults.push(await syncSecondDayActualDutyFromParent({
        date,
        employeeId,
        dutyId,
        assignmentRole,
        sourceActualDutyId: sourceAssignment.id,
        createdBy: user.id
      }));
    }
  } else {
    const restConflict = await findActualDutyRestConflict({ date, employeeId, dutyId });
    if (restConflict) {
      await setFlash({ kind: "error", text: restConflict });
      return;
    }

    const [createdActual] = await db.insert(actualDuties).values({
      date,
      employeeId,
      dutyId,
      assignmentRole,
      originalEmployeeId: employeeId,
      originalDutyId: dutyId,
      originalAssignmentRole: assignmentRole,
      reportedAt: new Date()
    }).returning({ id: actualDuties.id });
    secondDayResults.push(await createSecondDayActualDutyForParent({
      date,
      employeeId,
      dutyId,
      assignmentRole,
      sourceActualDutyId: createdActual.id,
      createdBy: user.id
    }));
  }

  await db.insert(scheduleChangeEvents).values({
    date,
    employeeId,
    dutyId,
    action: sourceAssignment ? "actual_duty_reassigned_from_schedule" : "actual_duty_assigned_from_schedule",
    createdBy: user.id
  });

  await setFlash({
    kind: "success",
    text: sourceAssignment
      ? `Графикът е разменен.${secondDayResults.map(secondDayFlashSuffix).join("")}`
      : `Служителят е добавен към повеската.${secondDayResults.map(secondDayFlashSuffix).join("")}`
  });
  revalidateScheduleViews(date);
  secondDayResults.forEach((result) => {
    if (result.status === "created" || result.status === "updated" || result.status === "already-created" || result.status === "slot-conflict") {
      revalidateScheduleViews(result.date);
    }
  });
  revalidatePath("/actual-duties");
  revalidatePath(`/employees/${employeeId}`);
  revalidatePath(`/duties/${dutyId}`);
}

export async function restoreActualDutyOriginalAction(formData: FormData) {
  const { user } = await requirePermission("actual_duties", "edit");
  const id = String(formData.get("id") ?? "");

  if (!id) {
    await setFlash({ kind: "error", text: "Липсва назначение за възстановяване." });
    return;
  }

  const db = getDb();
  const [existing] = await db.select().from(actualDuties).where(eq(actualDuties.id, id)).limit(1);

  if (!existing || !existing.originalEmployeeId || !existing.originalDutyId || !existing.originalAssignmentRole) {
    await setFlash({ kind: "error", text: "Няма запазени оригинални данни за това назначение." });
    return;
  }

  const [employeeConflict] = await db
    .select({ id: actualDuties.id })
    .from(actualDuties)
    .where(and(eq(actualDuties.employeeId, existing.originalEmployeeId), eq(actualDuties.date, existing.date), ne(actualDuties.id, existing.id)))
    .limit(1);

  if (employeeConflict) {
    await setFlash({ kind: "error", text: "Оригиналният служител вече има реална повеска за тази дата." });
    return;
  }

  const [slotConflict] = await db
    .select({ id: actualDuties.id })
    .from(actualDuties)
    .where(
      and(
        eq(actualDuties.date, existing.date),
        eq(actualDuties.dutyId, existing.originalDutyId),
        eq(actualDuties.assignmentRole, existing.originalAssignmentRole),
        ne(actualDuties.id, existing.id)
      )
    )
    .limit(1);

  if (slotConflict) {
    await setFlash({ kind: "error", text: "Оригиналната роля вече е попълнена за тази повеска." });
    return;
  }

  const restConflict = await findActualDutyRestConflict({
    date: existing.date,
    employeeId: existing.originalEmployeeId,
    dutyId: existing.originalDutyId,
    startTimeOverride: existing.startTimeOverride,
    endTimeOverride: existing.endTimeOverride,
    ignoreActualDutyIds: [existing.id]
  });
  if (restConflict) {
    await setFlash({ kind: "error", text: restConflict });
    return;
  }

  await db
    .update(actualDuties)
    .set({
      employeeId: existing.originalEmployeeId,
      dutyId: existing.originalDutyId,
      assignmentRole: existing.originalAssignmentRole
    })
    .where(eq(actualDuties.id, existing.id));

  await db.insert(scheduleChangeEvents).values({
    date: existing.date,
    employeeId: existing.originalEmployeeId,
    dutyId: existing.originalDutyId,
    action: "actual_duty_restored_to_original",
    createdBy: user.id
  });

  const secondDayResult = existing.sourceActualDutyId
    ? null
    : await syncSecondDayActualDutyFromParent({
        date: existing.date,
        employeeId: existing.originalEmployeeId,
        dutyId: existing.originalDutyId,
        assignmentRole: existing.originalAssignmentRole,
        sourceActualDutyId: existing.id,
        createdBy: user.id
      });

  await setFlash({
    kind: "success",
    text: `Назначението е върнато по график.${secondDayResult ? secondDayFlashSuffix(secondDayResult) : ""}`
  });
  revalidateScheduleViews(existing.date);
  if (secondDayResult?.status === "created" || secondDayResult?.status === "updated" || secondDayResult?.status === "already-created" || secondDayResult?.status === "slot-conflict") {
    revalidateScheduleViews(secondDayResult.date);
  }
  revalidatePath("/actual-duties");
  revalidatePath(`/employees/${existing.originalEmployeeId}`);
  revalidatePath(`/duties/${existing.originalDutyId}`);
}
