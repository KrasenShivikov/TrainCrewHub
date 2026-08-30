import { getDb } from "@/db";
import { rolePermissions, roles } from "@/db/schema";

const defaultRoles = [
  { name: "admin", displayName: "Administrator", displayNameBg: "Администратор" },
  { name: "head_of_transport", displayName: "Head of Transport", displayNameBg: "Началник транспорт" },
  { name: "instructor", displayName: "Instructor", displayNameBg: "Инструктор" },
  { name: "user", displayName: "User", displayNameBg: "Потребител" }
];

const resources = [
  "employees",
  "positions",
  "trains",
  "duty_types",
  "schedule_keys",
  "duties",
  "planned_duties",
  "employee_absences",
  "absence_reasons",
  "actual_duties",
  "schedule_publications",
  "documents",
  "admin"
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
