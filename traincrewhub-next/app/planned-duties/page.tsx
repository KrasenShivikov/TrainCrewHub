import { and, asc, count, desc, eq, ilike, or, type SQL } from "drizzle-orm";
import { ArrowRight, Plus, Save, Trash2 } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { ConfirmSubmit } from "@/components/confirm-submit";
import { EditDialog } from "@/components/edit-dialog";
import { DateFilter, ListFilters, SelectFilter } from "@/components/list-filters";
import { Pagination } from "@/components/pagination";
import { SectionHeader } from "@/components/section-header";
import { getDb } from "@/db";
import { duties, dutyTypes, employees, plannedDuties } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { defaultPageSize, pageOffset, paginationMeta, parsePage } from "@/lib/pagination";
import {
  copyPlannedToActualAction,
  createPlannedDutyAction,
  deletePlannedDutyAction,
  updatePlannedDutyAction
} from "./actions";

const roleLabels = {
  chief: "Началник влак",
  conductor: "Кондуктор"
};

export default async function PlannedDutiesPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; date?: string; role?: string; page?: string }>;
}) {
  await requirePermission("planned_duties", "view");
  const { q: rawQ, date = "", role = "", page: rawPage } = await searchParams;
  const q = (rawQ ?? "").trim();
  const page = parsePage(rawPage);
  const db = getDb();
  const filters: SQL[] = [];

  if (q) {
    const term = `%${q}%`;
    const queryFilter = or(
      ilike(employees.firstName, term),
      ilike(employees.lastName, term),
      ilike(duties.name, term),
      ilike(dutyTypes.name, term)
    );

    if (queryFilter) filters.push(queryFilter);
  }

  if (date) {
    filters.push(eq(plannedDuties.date, date));
  }

  if (role) {
    filters.push(eq(plannedDuties.assignmentRole, role));
  }

  const where = filters.length ? and(...filters) : undefined;
  const [{ totalItems }] = await db
    .select({ totalItems: count() })
    .from(plannedDuties)
    .leftJoin(employees, eq(plannedDuties.employeeId, employees.id))
    .leftJoin(duties, eq(plannedDuties.dutyId, duties.id))
    .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
    .where(where);
  const paginatedRows = paginationMeta(totalItems, page);

  const [rows, employeeRows, dutyRows] = await Promise.all([
    db
      .select({
        id: plannedDuties.id,
        date: plannedDuties.date,
        employeeId: plannedDuties.employeeId,
        dutyId: plannedDuties.dutyId,
        assignmentRole: plannedDuties.assignmentRole,
        employeeFirstName: employees.firstName,
        employeeLastName: employees.lastName,
        dutyName: duties.name,
        dutyTypeName: dutyTypes.name
      })
      .from(plannedDuties)
      .leftJoin(employees, eq(plannedDuties.employeeId, employees.id))
      .leftJoin(duties, eq(plannedDuties.dutyId, duties.id))
      .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
      .where(where)
      .orderBy(desc(plannedDuties.date))
      .limit(defaultPageSize)
      .offset(pageOffset(paginatedRows.page)),
    db.select().from(employees).orderBy(asc(employees.lastName), asc(employees.firstName)),
    db
      .select({
        id: duties.id,
        name: duties.name,
        typeName: dutyTypes.name
      })
      .from(duties)
      .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
      .orderBy(asc(duties.displayOrder), asc(duties.name))
  ]);

  return (
    <AppShell>
      <SectionHeader title="Планирани повески" description="Планиране на служител, повеска, дата и роля." />

      <ListFilters q={rawQ}>
        <DateFilter name="date" label="Дата" value={date} />
        <SelectFilter
          name="role"
          label="Роля"
          value={role}
          options={[
            { value: "", label: "Всички" },
            { value: "chief", label: "Началник влак" },
            { value: "conductor", label: "Кондуктор" }
          ]}
        />
      </ListFilters>

      <div className="grid gap-5 xl:grid-cols-[420px_1fr]">
        <PlannedDutyForm
          action={createPlannedDutyAction}
          title="Ново планиране"
          buttonLabel="Добави"
          employees={employeeRows}
          duties={dutyRows}
        />

        <section className="overflow-hidden rounded border border-rail-line bg-white shadow-panel">
          <div className="border-b border-rail-line px-4 py-3">
            <h3 className="text-base font-semibold">Списък планирани повески</h3>
            <p className="text-sm text-slate-600">Общо: {paginatedRows.totalItems}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Дата</th>
                  <th className="px-4 py-3">Служител</th>
                  <th className="px-4 py-3">Роля</th>
                  <th className="px-4 py-3">Повеска</th>
                  <th className="px-4 py-3">Тип</th>
                  <th className="px-4 py-3 text-right">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rail-line">
                {rows.length ? rows.map((row) => (
                  <tr key={row.id} className="align-top">
                    <td className="px-4 py-3 font-medium">{row.date}</td>
                    <td className="px-4 py-3">{[row.employeeFirstName, row.employeeLastName].filter(Boolean).join(" ") || "-"}</td>
                    <td className="px-4 py-3">{roleLabels[(row.assignmentRole ?? "conductor") as keyof typeof roleLabels]}</td>
                    <td className="px-4 py-3">{row.dutyName ?? "-"}</td>
                    <td className="px-4 py-3">{row.dutyTypeName ?? "-"}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <form action={copyPlannedToActualAction}>
                          <input type="hidden" name="id" value={row.id} />
                          <button className="inline-flex h-10 items-center gap-2 rounded border border-rail-line px-3 text-sm font-medium hover:bg-slate-100">
                            <ArrowRight className="h-4 w-4" /> Към реални
                          </button>
                        </form>
                        <EditDialog>
                          <PlannedDutyForm
                            action={updatePlannedDutyAction}
                            title="Редакция"
                            buttonLabel="Запази"
                            plannedDuty={row}
                            employees={employeeRows}
                            duties={dutyRows}
                          />
                        </EditDialog>
                        <form action={deletePlannedDutyAction}>
                          <input type="hidden" name="id" value={row.id} />
                          <ConfirmSubmit message="Да изтрия ли това планиране?" className="inline-flex h-10 items-center gap-2 rounded border border-red-200 px-3 text-sm font-medium text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" /> Изтрий
                          </ConfirmSubmit>
                        </form>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-slate-500">Няма планирани повески.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination pathname="/planned-duties" params={{ q: rawQ, date, role }} {...paginatedRows} />
        </section>
      </div>
    </AppShell>
  );
}

function PlannedDutyForm({
  action,
  title,
  buttonLabel,
  plannedDuty,
  employees: employeeOptions,
  duties: dutyOptions
}: {
  action: (formData: FormData) => Promise<void>;
  title: string;
  buttonLabel: string;
  plannedDuty?: {
    id: string;
    date: string;
    employeeId: string | null;
    dutyId: string | null;
    assignmentRole: string | null;
  };
  employees: Array<typeof employees.$inferSelect>;
  duties: Array<{ id: string; name: string; typeName: string | null }>;
}) {
  return (
    <form action={action} className="rounded border border-rail-line bg-white p-4 shadow-panel">
      <h3 className="text-base font-semibold">{title}</h3>
      {plannedDuty ? <input type="hidden" name="id" value={plannedDuty.id} /> : null}
      <div className="mt-4 grid gap-3">
        <Field name="date" label="Дата" type="date" defaultValue={plannedDuty?.date} />
        <div>
          <label className="block text-sm font-medium" htmlFor="employeeId">Служител</label>
          <select id="employeeId" name="employeeId" defaultValue={plannedDuty?.employeeId ?? ""} className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route">
            <option value="">Избери служител</option>
            {employeeOptions.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="assignmentRole">Роля</label>
          <select id="assignmentRole" name="assignmentRole" defaultValue={plannedDuty?.assignmentRole ?? "conductor"} className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route">
            <option value="conductor">Кондуктор</option>
            <option value="chief">Началник влак</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="dutyId">Повеска</label>
          <select id="dutyId" name="dutyId" defaultValue={plannedDuty?.dutyId ?? ""} className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route">
            <option value="">Избери повеска</option>
            {dutyOptions.map((duty) => (
              <option key={duty.id} value={duty.id}>
                {duty.name}{duty.typeName ? ` · ${duty.typeName}` : ""}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="mt-4 inline-flex h-10 items-center gap-2 rounded bg-rail-ink px-4 text-sm font-medium text-white hover:bg-slate-700">
        {plannedDuty ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        {buttonLabel}
      </button>
    </form>
  );
}

function Field({ name, label, type = "text", defaultValue = "" }: { name: string; label: string; type?: string; defaultValue?: string | null }) {
  return (
    <div>
      <label className="block text-sm font-medium" htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} defaultValue={defaultValue ?? ""} className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route" />
    </div>
  );
}
