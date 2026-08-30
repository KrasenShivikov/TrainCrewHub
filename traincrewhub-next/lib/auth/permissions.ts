import "server-only";

import { and, eq, inArray } from "drizzle-orm";

import { getDb } from "@/db";
import { rolePermissions } from "@/db/schema";
import { type CurrentUser, requireUser } from "./session";

export type PermissionAction = "view" | "create" | "edit" | "delete";

const actionColumns = {
  view: rolePermissions.canView,
  create: rolePermissions.canCreate,
  edit: rolePermissions.canEdit,
  delete: rolePermissions.canDelete
};

export async function getPermission(user: CurrentUser, resource: string, action: PermissionAction) {
  if (user.roles.includes("admin")) {
    return { allowed: true, scope: "all" };
  }

  if (user.roles.length === 0) {
    return { allowed: false, scope: "none" };
  }

  const [permission] = await getDb()
    .select({
      canView: rolePermissions.canView,
      canCreate: rolePermissions.canCreate,
      canEdit: rolePermissions.canEdit,
      canDelete: rolePermissions.canDelete,
      viewScope: rolePermissions.viewScope,
      createScope: rolePermissions.createScope,
      editScope: rolePermissions.editScope,
      deleteScope: rolePermissions.deleteScope
    })
    .from(rolePermissions)
    .where(
      and(
        inArray(rolePermissions.role, user.roles),
        eq(rolePermissions.resource, resource),
        eq(actionColumns[action], true)
      )
    )
    .limit(1);

  if (!permission) {
    return { allowed: false, scope: "none" };
  }

  const scope = {
    view: permission.viewScope,
    create: permission.createScope,
    edit: permission.editScope,
    delete: permission.deleteScope
  }[action];

  return { allowed: true, scope: scope ?? "none" };
}

export async function requirePermission(resource: string, action: PermissionAction) {
  const user = await requireUser();
  const permission = await getPermission(user, resource, action);

  if (!permission.allowed) {
    throw new Error(`Missing permission: ${resource}.${action}`);
  }

  return { user, permission };
}
