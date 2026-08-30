import { asc, desc, eq } from "drizzle-orm";
import { Save, Trash2 } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { ConfirmSubmit } from "@/components/confirm-submit";
import { SectionHeader } from "@/components/section-header";
import { getDb } from "@/db";
import { employees, roles, userProfiles, userRoleAuditLogs, userRoles, users } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import {
  deleteInactiveUserAction,
  linkUserEmployeeAction,
  updateUserRoleAction,
  updateUserStatusAction
} from "./actions";

export default async function AdminPage() {
  await requirePermission("admin", "view");
  const db = getDb();

  const [userRows, roleRows, employeeRows, auditRows] = await Promise.all([
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
      .limit(20)
  ]);

  const roleAssignments = await db.select().from(userRoles);
  const rolesByUser = Map.groupBy(roleAssignments, (row) => row.userId);

  return (
    <AppShell>
      <SectionHeader title="Админ" description="Активиране на потребители, роли и връзка към служител." />

      <div className="grid gap-5 2xl:grid-cols-[1fr_360px]">
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

        <aside className="rounded border border-rail-line bg-white shadow-panel">
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
        </aside>
      </div>
    </AppShell>
  );
}
