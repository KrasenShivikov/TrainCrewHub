import { getDb } from "@/db";
import { rolePermissions, roles } from "@/db/schema";

export const permissionResources = [
  { key: "employees", label: "Служители" },
  { key: "positions", label: "Позиции" },
  { key: "trains", label: "Влакове" },
  { key: "duty_types", label: "Типове повески" },
  { key: "schedule_keys", label: "Ключ-графици" },
  { key: "duties", label: "Повески" },
  { key: "planned_duties", label: "Планирани" },
  { key: "employee_absences", label: "Отсъствия" },
  { key: "absence_reasons", label: "Причини" },
  { key: "actual_duties", label: "Реални" },
  { key: "schedule_publications", label: "Публикации" },
  { key: "documents", label: "Документи" },
  { key: "admin", label: "Админ" }
];

const defaultRoles = [
  { name: "admin", displayName: "Administrator", displayNameBg: "Администратор" },
  { name: "head_of_transport", displayName: "Head of Transport", displayNameBg: "Началник транспорт" },
  { name: "instructor", displayName: "Instructor", displayNameBg: "Инструктор" },
  { name: "user", displayName: "User", displayNameBg: "Потребител" }
];

type PermissionSeed = typeof rolePermissions.$inferInsert;

function permission(
  role: string,
  resource: string,
  canView = false,
  canCreate = false,
  canEdit = false,
  canDelete = false
): PermissionSeed {
  return {
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
  };
}

export async function seedDefaultRolesAndPermissions() {
  const db = getDb();

  await db.insert(roles).values(defaultRoles).onConflictDoNothing();

  const resources = permissionResources.map((resource) => resource.key);
  const adminPermissions = resources.map((resource) => permission("admin", resource, true, true, true, true));
  const headPermissions = resources
    .filter((resource) => resource !== "admin")
    .map((resource) => permission("head_of_transport", resource, true, true, true, true));
  const instructorPermissions = [
    "employees",
    "trains",
    "duty_types",
    "schedule_keys",
    "duties",
    "planned_duties",
    "employee_absences",
    "actual_duties",
    "schedule_publications",
    "documents"
  ].map((resource) => permission("instructor", resource, true, false, false, false));
  const userPermissions = [
    "employees",
    "trains",
    "duties",
    "planned_duties",
    "employee_absences",
    "actual_duties",
    "schedule_publications",
    "documents"
  ].map((resource) => permission("user", resource, true, false, false, false));

  await db
    .insert(rolePermissions)
    .values([...adminPermissions, ...headPermissions, ...instructorPermissions, ...userPermissions])
    .onConflictDoNothing();
}
