"use server";

import { revalidatePath } from "next/cache";
import { and, eq, ne } from "drizzle-orm";

import { getDb } from "@/db";
import { rolePermissions, userProfiles, userRoleAuditLogs, userRoles, users } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { setFlash } from "@/lib/flash";

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

  if (!userId) {
    await setFlash({ kind: "error", text: "Липсва потребител за промяна." });
    return;
  }

  if (await wouldRemoveLastActiveAdmin(userId, undefined, isActive)) {
    await setFlash({ kind: "error", text: "Не може да деактивираш последния активен администратор." });
    return;
  }

  await getDb().update(users).set({ isActive, updatedAt: new Date() }).where(eq(users.id, userId));
  await setFlash({ kind: "success", text: "Статусът на потребителя е обновен." });
  revalidatePath("/admin");
}

export async function updateUserRoleAction(formData: FormData) {
  const { user } = await requirePermission("admin", "edit");
  const targetUserId = String(formData.get("userId") ?? "");
  const role = String(formData.get("role") ?? "");

  if (!targetUserId || !role) {
    await setFlash({ kind: "error", text: "Избери потребител и роля." });
    return;
  }

  if (await wouldRemoveLastActiveAdmin(targetUserId, role)) {
    await setFlash({ kind: "error", text: "Не може да смениш ролята на последния активен администратор." });
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

  await setFlash({ kind: "success", text: "Ролята на потребителя е обновена." });
  revalidatePath("/admin");
}

export async function linkUserEmployeeAction(formData: FormData) {
  await requirePermission("admin", "edit");
  const userId = String(formData.get("userId") ?? "");
  const employeeId = String(formData.get("employeeId") ?? "") || null;

  if (!userId) {
    await setFlash({ kind: "error", text: "Липсва потребител за свързване." });
    return;
  }

  await getDb()
    .update(userProfiles)
    .set({ employeeId, updatedAt: new Date() })
    .where(eq(userProfiles.id, userId));

  await setFlash({ kind: "success", text: "Профилът е свързан със служител." });
  revalidatePath("/admin");
}

export async function deleteInactiveUserAction(formData: FormData) {
  await requirePermission("admin", "delete");
  const userId = String(formData.get("userId") ?? "");

  if (!userId) {
    await setFlash({ kind: "error", text: "Липсва потребител за изтриване." });
    return;
  }

  if (await wouldRemoveLastActiveAdmin(userId, undefined, false)) {
    await setFlash({ kind: "error", text: "Не може да изтриеш последния активен администратор." });
    return;
  }

  await getDb().delete(users).where(and(eq(users.id, userId), ne(users.isActive, true)));
  await setFlash({ kind: "success", text: "Неактивният потребител е изтрит." });
  revalidatePath("/admin");
}

export async function updateRolePermissionAction(formData: FormData) {
  await requirePermission("admin", "edit");
  const role = String(formData.get("role") ?? "");
  const resource = String(formData.get("resource") ?? "");

  if (!role || !resource) {
    await setFlash({ kind: "error", text: "Избери роля и ресурс за права." });
    return;
  }

  if (role === "admin") {
    await setFlash({ kind: "info", text: "Администраторската роля има пълен достъп по подразбиране." });
    return;
  }

  const canView = formData.get("canView") === "on";
  const canCreate = formData.get("canCreate") === "on";
  const canEdit = formData.get("canEdit") === "on";
  const canDelete = formData.get("canDelete") === "on";

  await getDb()
    .insert(rolePermissions)
    .values({
      role,
      resource,
      canView,
      canCreate,
      canEdit,
      canDelete,
      viewScope: canView ? "all" : "none",
      createScope: canCreate ? "all" : "none",
      editScope: canEdit ? "all" : "none",
      deleteScope: canDelete ? "all" : "none"
    })
    .onConflictDoUpdate({
      target: [rolePermissions.role, rolePermissions.resource],
      set: {
        canView,
        canCreate,
        canEdit,
        canDelete,
        viewScope: canView ? "all" : "none",
        createScope: canCreate ? "all" : "none",
        editScope: canEdit ? "all" : "none",
        deleteScope: canDelete ? "all" : "none",
        updatedAt: new Date()
      }
    });

  await setFlash({ kind: "success", text: "Правата за ролята са обновени." });
  revalidatePath("/admin");
}
