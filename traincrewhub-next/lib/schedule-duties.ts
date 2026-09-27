import "server-only";

import { and, asc, eq, gte, inArray, lte } from "drizzle-orm";

import { getDb } from "@/db";
import { duties, dutyTypes, scheduleKeyDuties, scheduleKeys } from "@/db/schema";

export type ScheduleDutyForDate = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  isSecondDay: boolean | null;
  displayOrder: number | null;
  dutyTypeName: string | null;
  scheduleKeyOrder: number | null;
};

const dutySelect = {
  id: duties.id,
  name: duties.name,
  startTime: duties.startTime,
  endTime: duties.endTime,
  isSecondDay: duties.isSecondDay,
  displayOrder: duties.displayOrder,
  dutyTypeName: dutyTypes.name
};

export async function loadDutiesForScheduleDate(date: string): Promise<ScheduleDutyForDate[]> {
  const db = getDb();
  const validKeys = await db
    .select({ id: scheduleKeys.id })
    .from(scheduleKeys)
    .where(and(lte(scheduleKeys.validFrom, date), gte(scheduleKeys.validTo, date)));

  const scheduleKeyIds = validKeys.map((key) => key.id);
  if (!scheduleKeyIds.length) {
    return [];
  }

  const [directDuties, mappedDuties] = await Promise.all([
    db
      .select({
        ...dutySelect,
        scheduleKeyOrder: duties.displayOrder
      })
      .from(duties)
      .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
      .where(inArray(duties.scheduleKeyId, scheduleKeyIds))
      .orderBy(asc(duties.displayOrder), asc(duties.startTime), asc(duties.name)),
    db
      .select({
        ...dutySelect,
        scheduleKeyOrder: scheduleKeyDuties.displayOrder
      })
      .from(scheduleKeyDuties)
      .innerJoin(duties, eq(scheduleKeyDuties.dutyId, duties.id))
      .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
      .where(inArray(scheduleKeyDuties.scheduleKeyId, scheduleKeyIds))
      .orderBy(asc(scheduleKeyDuties.displayOrder), asc(duties.displayOrder), asc(duties.startTime), asc(duties.name))
  ]);

  const byId = new Map<string, ScheduleDutyForDate>();

  directDuties.forEach((duty) => {
    byId.set(duty.id, duty);
  });

  mappedDuties.forEach((duty) => {
    if (!byId.has(duty.id)) {
      byId.set(duty.id, duty);
    }
  });

  return [...byId.values()].sort((left, right) => {
    const typeCompare = (left.dutyTypeName || "").localeCompare(right.dutyTypeName || "", "bg");
    if (typeCompare !== 0) return typeCompare;
    if (Number(left.isSecondDay) !== Number(right.isSecondDay)) return Number(left.isSecondDay) - Number(right.isSecondDay);
    if ((left.scheduleKeyOrder ?? 0) !== (right.scheduleKeyOrder ?? 0)) return (left.scheduleKeyOrder ?? 0) - (right.scheduleKeyOrder ?? 0);
    if ((left.displayOrder ?? 0) !== (right.displayOrder ?? 0)) return (left.displayOrder ?? 0) - (right.displayOrder ?? 0);
    return left.startTime.localeCompare(right.startTime);
  });
}
