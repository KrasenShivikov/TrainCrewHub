import Link from "next/link";
import { and, asc, count, eq, ilike, or, type SQL } from "drizzle-orm";
import { Eye, Plus, Save, Trash2, UserRoundPlus } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { ConfirmSubmit } from "@/components/confirm-submit";
import { EditDialog } from "@/components/edit-dialog";
import { ListFilters, SelectFilter } from "@/components/list-filters";
import { Pagination } from "@/components/pagination";
import { SectionHeader } from "@/components/section-header";
import { getDb } from "@/db";
import { employees, positions } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { defaultPageSize, pageOffset, paginationMeta, parsePage } from "@/lib/pagination";
import {
  createEmployeeAction,
  createPositionAction,
  deleteEmployeeAction,
  updateEmployeeAction
} from "./actions";

function dateValue(value: string | Date | null) {
  return value ? String(value).slice(0, 10) : "";
}

export default async function EmployeesPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  await requirePermission("employees", "view");
  const { q: rawQ, status = "", page: rawPage } = await searchParams;
  const q = (rawQ ?? "").trim();
  const page = parsePage(rawPage);
  const db = getDb();
  const filters: SQL[] = [];

  if (q) {
    const term = `%${q}%`;
    const queryFilter = or(
      ilike(employees.firstName, term),
      ilike(employees.lastName, term),
      ilike(positions.title, term)
    );

    if (queryFilter) filters.push(queryFilter);
  }

  if (status === "active") {
    filters.push(eq(employees.isActive, true));
  } else if (status === "inactive") {
    filters.push(eq(employees.isActive, false));
  }

  const where = filters.length ? and(...filters) : undefined;
  const [{ totalItems }] = await db
    .select({ totalItems: count() })
    .from(employees)
    .leftJoin(positions, eq(employees.positionId, positions.id))
    .where(where);
  const paginatedRows = paginationMeta(totalItems, page);

  const [employeeRows, positionRows] = await Promise.all([
    db
      .select({
        id: employees.id,
        firstName: employees.firstName,
        lastName: employees.lastName,
        positionId: employees.positionId,
        positionTitle: positions.title,
        isActive: employees.isActive,
        psychologicalAssessmentExpiry: employees.psychologicalAssessmentExpiry,
        medicalCertificateExpiry: employees.medicalCertificateExpiry,
        licenseExpiry: employees.licenseExpiry
      })
      .from(employees)
      .leftJoin(positions, eq(employees.positionId, positions.id))
      .where(where)
      .orderBy(asc(employees.lastName), asc(employees.firstName))
      .limit(defaultPageSize)
      .offset(pageOffset(paginatedRows.page)),
    db.select().from(positions).orderBy(asc(positions.title))
  ]);

  return (
    <AppShell>
      <SectionHeader title="Служители" description="Служители, позиции, статус и срокове на основните валидности." />
      <ListFilters q={rawQ}>
        <SelectFilter
          name="status"
          label="Статус"
          value={status}
          options={[
            { value: "", label: "Всички" },
            { value: "active", label: "Активни" },
            { value: "inactive", label: "Неактивни" }
          ]}
        />
      </ListFilters>

      <div className="grid gap-5 xl:grid-cols-[380px_1fr]">
        <section className="space-y-5">
          <form action={createEmployeeAction} className="rounded border border-rail-line bg-white p-4 shadow-panel">
            <div className="mb-4 flex items-center gap-2">
              <UserRoundPlus className="h-5 w-5 text-rail-route" />
              <h3 className="text-base font-semibold">Нов служител</h3>
            </div>
            <EmployeeFields positions={positionRows} />
            <button type="submit" className="mt-4 inline-flex h-10 items-center gap-2 rounded bg-rail-ink px-4 text-sm font-medium text-white hover:bg-slate-700">
              <Plus className="h-4 w-4" />
              Добави
            </button>
          </form>

          <form action={createPositionAction} className="rounded border border-rail-line bg-white p-4 shadow-panel">
            <h3 className="text-base font-semibold">Нова позиция</h3>
            <label className="mt-3 block text-sm font-medium" htmlFor="positionTitle">Наименование</label>
            <input id="positionTitle" name="title" className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route" />
            <button type="submit" className="mt-4 inline-flex h-10 items-center gap-2 rounded border border-rail-line bg-white px-4 text-sm font-medium hover:bg-slate-100">
              <Plus className="h-4 w-4" />
              Добави позиция
            </button>
          </form>
        </section>

        <section className="overflow-hidden rounded border border-rail-line bg-white shadow-panel">
          <div className="border-b border-rail-line px-4 py-3">
            <h3 className="text-base font-semibold">Списък служители</h3>
            <p className="text-sm text-slate-600">Общо: {paginatedRows.totalItems}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[940px] border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Име</th>
                  <th className="px-4 py-3 font-semibold">Позиция</th>
                  <th className="px-4 py-3 font-semibold">Статус</th>
                  <th className="px-4 py-3 font-semibold">Документи</th>
                  <th className="px-4 py-3 text-right font-semibold">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rail-line">
                {employeeRows.length ? employeeRows.map((employee) => (
                  <tr key={employee.id} className="align-top">
                    <td className="px-4 py-3 font-medium">{employee.firstName} {employee.lastName}</td>
                    <td className="px-4 py-3 text-slate-700">{employee.positionTitle ?? "-"}</td>
                    <td className="px-4 py-3">
                      <span className={employee.isActive ? "rounded bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700" : "rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"}>
                        {employee.isActive ? "Активен" : "Неактивен"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <DocumentDates
                        psychological={dateValue(employee.psychologicalAssessmentExpiry)}
                        medical={dateValue(employee.medicalCertificateExpiry)}
                        license={dateValue(employee.licenseExpiry)}
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/employees/${employee.id}`} className="inline-flex h-9 items-center gap-2 rounded border border-rail-line bg-white px-3 text-sm font-medium hover:bg-slate-100">
                          <Eye className="h-4 w-4" />
                          Детайли
                        </Link>
                        <EditDialog>
                          <form action={updateEmployeeAction} className="grid gap-3">
                            <input type="hidden" name="id" value={employee.id} />
                            <EmployeeFields employee={employee} positions={positionRows} />
                            <button type="submit" className="inline-flex h-9 w-fit items-center gap-2 rounded bg-rail-ink px-3 text-sm font-medium text-white hover:bg-slate-700">
                              <Save className="h-4 w-4" />
                              Запази
                            </button>
                          </form>
                        </EditDialog>
                        <form action={deleteEmployeeAction}>
                          <input type="hidden" name="id" value={employee.id} />
                          <ConfirmSubmit message="Да изтрия ли този служител?" className="inline-flex h-9 items-center gap-2 rounded border border-red-200 bg-white px-3 text-sm font-medium text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                            Изтрий
                          </ConfirmSubmit>
                        </form>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-slate-500">Няма въведени служители.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination pathname="/employees" params={{ q: rawQ, status }} {...paginatedRows} />
        </section>
      </div>
    </AppShell>
  );
}

type EmployeeFormRow = {
  firstName: string;
  lastName: string;
  positionId: string | null;
  isActive: boolean | null;
  psychologicalAssessmentExpiry: string | Date | null;
  medicalCertificateExpiry: string | Date | null;
  licenseExpiry: string | Date | null;
};

function EmployeeFields({ employee, positions: positionRows }: { employee?: EmployeeFormRow; positions: Array<typeof positions.$inferSelect> }) {
  return (
    <div className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        <Field name="firstName" label="Име" defaultValue={employee?.firstName} />
        <Field name="lastName" label="Фамилия" defaultValue={employee?.lastName} />
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="positionId">Позиция</label>
        <select id="positionId" name="positionId" defaultValue={employee?.positionId ?? ""} className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route">
          <option value="">Без позиция</option>
          {positionRows.map((position) => <option key={position.id} value={position.id}>{position.title}</option>)}
        </select>
      </div>
      <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
        <DateField name="psychologicalAssessmentExpiry" label="Психо" defaultValue={dateValue(employee?.psychologicalAssessmentExpiry ?? null)} />
        <DateField name="medicalCertificateExpiry" label="Медицинско" defaultValue={dateValue(employee?.medicalCertificateExpiry ?? null)} />
        <DateField name="licenseExpiry" label="Лиценз" defaultValue={dateValue(employee?.licenseExpiry ?? null)} />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input name="isActive" type="checkbox" defaultChecked={employee?.isActive ?? true} className="h-4 w-4 rounded border-rail-line text-rail-route" />
        Активен
      </label>
    </div>
  );
}

function Field({ name, label, defaultValue = "" }: { name: string; label: string; defaultValue?: string | null }) {
  return (
    <div>
      <label className="block text-sm font-medium" htmlFor={name}>{label}</label>
      <input id={name} name={name} defaultValue={defaultValue ?? ""} className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route" />
    </div>
  );
}

function DateField({ name, label, defaultValue }: { name: string; label: string; defaultValue?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600" htmlFor={name}>{label}</label>
      <input id={name} name={name} type="date" defaultValue={defaultValue} className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route" />
    </div>
  );
}

function DocumentDates({ psychological, medical, license }: { psychological: string; medical: string; license: string }) {
  return (
    <div className="space-y-1 text-xs">
      <p>Психо: {psychological || "-"}</p>
      <p>Медицинско: {medical || "-"}</p>
      <p>Лиценз: {license || "-"}</p>
    </div>
  );
}
