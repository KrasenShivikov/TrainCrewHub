import { eq } from "drizzle-orm";

import { getDb } from "@/db";
import { actualDuties, duties, dutyTypes } from "@/db/schema";

const minRestHours = 12;
const minRestMs = minRestHours * 60 * 60 * 1000;

function dateTime(date: string, time: string) {
  const [hours = "0", minutes = "0", seconds = "0"] = time.split(":");
  const value = new Date(`${date}T00:00:00`);
  value.setHours(Number(hours), Number(minutes), Number(seconds), 0);
  return value;
}

function dutyWindow(date: string, startTime: string, endTime: string) {
  const start = dateTime(date, startTime);
  const end = dateTime(date, endTime);

  if (end <= start) {
    end.setDate(end.getDate() + 1);
  }

  return { start, end };
}

function formatDateTime(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  const hours = String(value.getHours()).padStart(2, "0");
  const minutes = String(value.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export async function findActualDutyRestConflict({
  date,
  employeeId,
  dutyId,
  startTimeOverride,
  endTimeOverride,
  ignoreActualDutyIds = []
}: {
  date: string;
  employeeId: string;
  dutyId: string;
  startTimeOverride?: string | null;
  endTimeOverride?: string | null;
  ignoreActualDutyIds?: string[];
}) {
  const db = getDb();
  const [targetDuty] = await db
    .select({
      startTime: duties.startTime,
      endTime: duties.endTime,
      dutyTypeName: dutyTypes.name
    })
    .from(duties)
    .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
    .where(eq(duties.id, dutyId))
    .limit(1);

  if (!targetDuty || !targetDuty.dutyTypeName?.toLocaleLowerCase("bg-BG").includes("влак")) {
    return null;
  }

  const targetWindow = dutyWindow(date, startTimeOverride || targetDuty.startTime, endTimeOverride || targetDuty.endTime);
  const ignoredIds = new Set(ignoreActualDutyIds.filter(Boolean));
  const employeeDuties = await db
    .select({
      id: actualDuties.id,
      date: actualDuties.date,
      startTimeOverride: actualDuties.startTimeOverride,
      endTimeOverride: actualDuties.endTimeOverride,
      dutyName: duties.name,
      dutyStartTime: duties.startTime,
      dutyEndTime: duties.endTime,
      dutyTypeName: dutyTypes.name
    })
    .from(actualDuties)
    .innerJoin(duties, eq(actualDuties.dutyId, duties.id))
    .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
    .where(eq(actualDuties.employeeId, employeeId));

  const previous = employeeDuties
    .filter((row) => !ignoredIds.has(row.id))
    .filter((row) => row.dutyTypeName?.toLocaleLowerCase("bg-BG").includes("влак"))
    .map((row) => ({
      ...row,
      window: dutyWindow(row.date, row.startTimeOverride || row.dutyStartTime, row.endTimeOverride || row.dutyEndTime)
    }))
    .filter((row) => row.window.start < targetWindow.start)
    .sort((left, right) => right.window.end.getTime() - left.window.end.getTime())[0];

  if (!previous) {
    return null;
  }

  const restMs = targetWindow.start.getTime() - previous.window.end.getTime();
  if (restMs >= minRestMs) {
    return null;
  }

  const restHours = Math.max(0, restMs / 60 / 60 / 1000);
  return `Служителят няма 12 часа почивка. Последната му повеска "${previous.dutyName}" приключва на ${formatDateTime(previous.window.end)}, а новата започва на ${formatDateTime(targetWindow.start)} (${restHours.toFixed(1)} ч.).`;
}
