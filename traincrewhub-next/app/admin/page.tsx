import { asc, desc, eq } from "drizzle-orm";
import { Save, Trash2 } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { ConfirmSubmit } from "@/components/confirm-submit";
import { SectionHeader } from "@/components/section-header";
import { getDb } from "@/db";
import { employees, rolePermissions, roles, userProfiles, userRoleAuditLogs, userRoles, users } from "@/db/schema";
import { permissionResources } from "@/lib/auth/default-permissions";
import { requirePermission } from "@/lib/auth/permissions";
import {
  deleteInactiveUserAction,
  linkUserEmployeeAction,
  updateRolePermissionAction,
  updateUserRoleAction,
  updateUserStatusAction
} from "./actions";

export default async function AdminPage() {
  await requirePermission("admin", "view");
  const db = getDb();

  const [userRows, roleRows, employeeRows, auditRows, permissionRows, roleAssignments] = await Promise.all([
    db
      .select({
        id: users.id,
        email: users.email,
        username: users.username,
        isActive: users.isActive,
        createdAt: users.createdAt,
        firstName: userProfiles.firstName,
        lastName: userProfiles.lastName,
        employeeId: userProfiles.employeeId
      })
      .from(users)
      .leftJoin(userProfiles, eq(userProfiles.id, users.id))
      .orderBy(desc(users.createdAt)),
    db.select().from(roles).orderBy(asc(roles.name)),
    db.select().from(employees).orderBy(asc(employees.lastName), asc(employees.firstName)),
    db
      .select({
        id: userRoleAuditLogs.id,
        targetUserId: userRoleAuditLogs.targetUserId,
        role: userRoleAuditLogs.role,
        action: userRoleAuditLogs.action,
        changedAt: userRoleAuditLogs.changedAt
      })
      .from(userRoleAuditLogs)
      .orderBy(desc(userRoleAuditLogs.changedAt))
      .limit(20),
    db.select().from(rolePermissions),
    db.select().from(userRoles)
  ]);

  const rolesByUser = Map.groupBy(roleAssignments, (row) => row.userId);
  const permissionByRoleResource = new Map(
    permissionRows.map((row) => [`${row.role}:${row.resource}`, row])
  );

  return (
    <AppShell>
      <SectionHeader title="Админ" description="Потребители, роли, права и връзка към служител." />

      <div className="space-y-5">
        <section className="overflow-hidden rounded border border-rail-line bg-white shadow-panel">
          <div className="border-b border-rail-line px-4 py-3">
            <h3 className="text-base font-semibold">Потребители</h3>
            <p className="text-sm text-slate-600">Общо: {userRows.length}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Потребител</th>
                  <th className="px-4 py-3">Име</th>
                  <th className="px-4 py-3">Статус</th>
                  <th className="px-4 py-3">Роля</th>
                  <th className="px-4 py-3">Служител</th>
                  <th className="px-4 py-3 text-right">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rail-line">
                {userRows.map((row) => {
                  const currentRole = rolesByUser.get(row.id)?.[0]?.role ?? "user";
                  return (
                    <tr key={row.id} className="align-top">
                      <td className="px-4 py-3">
                        <p className="font-medium">{row.username}</p>
                        <p className="text-xs text-slate-500">{row.email}</p>
                      </td>
                      <td className="px-4 py-3">{[row.firstName, row.lastName].filter(Boolean).join(" ") || "-"}</td>
                      <td className="px-4 py-3">
                        <form action={updateUserStatusAction} className="flex items-center gap-2">
                          <input type="hidden" name="userId" value={row.id} />
                          <input name="isActive" type="checkbox" defaultChecked={row.isActive} className="h-4 w-4 rounded border-rail-line text-rail-route" />
                          <button className="rounded border border-rail-line px-2 py-1 text-xs font-medium hover:bg-slate-100">Запази</button>
                        </form>
                      </td>
                      <td className="px-4 py-3">
                        <form action={updateUserRoleAction} className="flex items-center gap-2">
                          <input type="hidden" name="userId" value={row.id} />
                          <select name="role" defaultValue={currentRole} className="h-9 rounded border border-rail-line px-2 outline-none focus:border-rail-route">
                            {roleRows.map((role) => <option key={role.name} value={role.name}>{role.displayNameBg || role.displayName}</option>)}
                          </select>
                          <button className="inline-flex h-9 items-center gap-2 rounded border border-rail-line px-3 text-sm font-medium hover:bg-slate-100">
                            <Save className="h-4 w-4" /> Роля
                          </button>
                        </form>
                      </td>
                      <td className="px-4 py-3">
                        <form action={linkUserEmployeeAction} className="flex items-center gap-2">
                          <input type="hidden" name="userId" value={row.id} />
                          <select name="employeeId" defaultValue={row.employeeId ?? ""} className="h-9 rounded border border-rail-line px-2 outline-none focus:border-rail-route">
                            <option value="">Без служител</option>
                            {employeeRows.map((employee) => <option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</option>)}
                          </select>
                          <button className="rounded border border-rail-line px-2 py-1 text-xs font-medium hover:bg-slate-100">Запази</button>
                        </form>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {!row.isActive ? (
                          <form action={deleteInactiveUserAction}>
                            <input type="hidden" name="userId" value={row.id} />
                            <ConfirmSubmit message="Да изтрия ли този неактивен потребител?" className="inline-flex h-9 items-center gap-2 rounded border border-red-200 px-3 text-sm font-medium text-red-700 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" /> Изтрий
                            </ConfirmSubmit>
                          </form>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="overflow-hidden rounded border border-rail-line bg-white shadow-panel">
          <div className="border-b border-rail-line px-4 py-3">
            <h3 className="text-base font-semibold">Права по роли</h3>
            <p className="text-sm text-slate-600">Admin ролята е заключена с пълен достъп.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Роля</th>
                  <th className="px-4 py-3">Ресурс</th>
                  <th className="px-4 py-3">Преглед</th>
                  <th className="px-4 py-3">Създаване</th>
                  <th className="px-4 py-3">Редакция</th>
                  <th className="px-4 py-3">Изтриване</th>
                  <th className="px-4 py-3 text-right">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rail-line">
                {roleRows.flatMap((role) =>
                  permissionResources.map((resource) => {
                    const permission = permissionByRoleResource.get(`${role.name}:${resource.key}`);
                    const locked = role.name === "admin";

                    return (
                      <tr key={`${role.name}:${resource.key}`}>
                        <td className="px-4 py-3 font-medium">{role.displayNameBg || role.displayName}</td>
                        <td className="px-4 py-3">{resource.label}</td>
                        <form action={updateRolePermissionAction} className="contents">
                            <input type="hidden" name="role" value={role.name} />
                            <input type="hidden" name="resource" value={resource.key} />
                            <td className="px-4 py-3">
                            <Check name="canView" defaultChecked={locked || Boolean(permission?.canView)} disabled={locked} />
                            </td>
                            <td className="px-4 py-3">
                            <Check name="canCreate" defaultChecked={locked || Boolean(permission?.canCreate)} disabled={locked} />
                            </td>
                            <td className="px-4 py-3">
                            <Check name="canEdit" defaultChecked={locked || Boolean(permission?.canEdit)} disabled={locked} />
                            </td>
                            <td className="px-4 py-3">
                            <Check name="canDelete" defaultChecked={locked || Boolean(permission?.canDelete)} disabled={locked} />
                            </td>
                            <td className="px-4 py-3 text-right">
                            <button disabled={locked} className="inline-flex h-9 items-center justify-center gap-2 rounded border border-rail-line px-3 text-sm font-medium hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50">
                              <Save className="h-4 w-4" /> Запази
                            </button>
                            </td>
                        </form>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded border border-rail-line bg-white shadow-panel">
          <div className="border-b border-rail-line px-4 py-3">
            <h3 className="text-base font-semibold">Последни промени</h3>
          </div>
          <div className="divide-y divide-rail-line">
            {auditRows.length ? auditRows.map((row) => (
              <article key={row.id} className="p-4 text-sm">
                <p className="font-medium">{row.action} · {row.role}</p>
                <p className="mt-1 text-xs text-slate-500">{row.changedAt?.toISOString?.() ?? String(row.changedAt ?? "")}</p>
              </article>
            )) : <p className="p-4 text-sm text-slate-500">Няма записани промени.</p>}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Check({ name, defaultChecked, disabled }: { name: string; defaultChecked: boolean; disabled: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="h-4 w-4 rounded border-rail-line text-rail-route"
      />
      <span className="sr-only">{name}</span>
    </label>
  );
}
