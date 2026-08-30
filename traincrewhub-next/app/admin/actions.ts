"use server";

import { revalidatePath } from "next/cache";
import { and, eq, ne } from "drizzle-orm";

import { getDb } from "@/db";
import { userProfiles, userRoleAuditLogs, userRoles, users } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";

async function wouldRemoveLastActiveAdmin(targetUserId: string, nextRole?: string, nextIsActive?: boolean) {
  const db = getDb();
  const activeAdmins = await db
    .select({ id: users.id })
    .from(users)
    .innerJoin(userRoles, eq(userRoles.userId, users.id))
    .where(and(eq(users.isActive, true), eq(userRoles.role, "admin")));

  if (activeAdmins.length !== 1 || activeAdmins[0]?.id !== targetUserId) {
    return false;
  }

  if (nextIsActive === false) {
    return true;
  }

  return Boolean(nextRole && nextRole !== "admin");
}

export async function updateUserStatusAction(formData: FormData) {
  await requirePermission("admin", "edit");
  const userId = String(formData.get("userId") ?? "");
  const isActive = formData.get("isActive") === "on";

  if (!userId || (await wouldRemoveLastActiveAdmin(userId, undefined, isActive))) {
    return;
  }

  await getDb().update(users).set({ isActive, updatedAt: new Date() }).where(eq(users.id, userId));
  revalidatePath("/admin");
}

export async function updateUserRoleAction(formData: FormData) {
  const { user } = await requirePermission("admin", "edit");
  const targetUserId = String(formData.get("userId") ?? "");
  const role = String(formData.get("role") ?? "");

  if (!targetUserId || !role || (await wouldRemoveLastActiveAdmin(targetUserId, role))) {
    return;
  }

  const db = getDb();
  const existingRoles = await db.select().from(userRoles).where(eq(userRoles.userId, targetUserId));
  const hadRole = existingRoles.some((row) => row.role === role);

  await db.delete(userRoles).where(eq(userRoles.userId, targetUserId));
  await db.insert(userRoles).values({
    userId: targetUserId,
    role,
    grantedBy: user.id,
    createdFrom: user.id
  });

  if (!hadRole || existingRoles.length !== 1) {
    await db.insert(userRoleAuditLogs).values({
      targetUserId,
      role,
      action: "set",
      changedBy: user.id
    });
  }

  revalidatePath("/admin");
}

export async function linkUserEmployeeAction(formData: FormData) {
  await requirePermission("admin", "edit");
  const userId = String(formData.get("userId") ?? "");
  const employeeId = String(formData.get("employeeId") ?? "") || null;

  if (!userId) return;

  await getDb()
    .update(userProfiles)
    .set({ employeeId, updatedAt: new Date() })
    .where(eq(userProfiles.id, userId));

  revalidatePath("/admin");
}

export async function deleteInactiveUserAction(formData: FormData) {
  await requirePermission("admin", "delete");
  const userId = String(formData.get("userId") ?? "");

  if (!userId || (await wouldRemoveLastActiveAdmin(userId, undefined, false))) {
    return;
  }

  await getDb().delete(users).where(and(eq(users.id, userId), ne(users.isActive, true)));
  revalidatePath("/admin");
}
