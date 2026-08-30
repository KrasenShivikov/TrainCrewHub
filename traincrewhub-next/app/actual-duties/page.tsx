import { asc, desc, eq } from "drizzle-orm";
import { Plus, Save, Trash2 } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { ConfirmSubmit } from "@/components/confirm-submit";
import { SectionHeader } from "@/components/section-header";
import { getDb } from "@/db";
import { actualDuties, duties, dutyTypes, employees } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { createActualDutyAction, deleteActualDutyAction, updateActualDutyAction } from "./actions";

const roleLabels = {
  chief: "Началник влак",
  conductor: "Кондуктор"
};

function asTime(value: string | null) {
  return value ? value.slice(0, 5) : "";
}

export default async function ActualDutiesPage() {
  await requirePermission("actual_duties", "view");
  const db = getDb();

  const [rows, employeeRows, dutyRows] = await Promise.all([
    db
      .select({
        id: actualDuties.id,
        date: actualDuties.date,
        employeeId: actualDuties.employeeId,
        dutyId: actualDuties.dutyId,
        assignmentRole: actualDuties.assignmentRole,
        startTimeOverride: actualDuties.startTimeOverride,
        endTimeOverride: actualDuties.endTimeOverride,
        employeeFirstName: employees.firstName,
        employeeLastName: employees.lastName,
        dutyName: duties.name,
        dutyStartTime: duties.startTime,
        dutyEndTime: duties.endTime,
        dutyTypeName: dutyTypes.name
      })
      .from(actualDuties)
      .leftJoin(employees, eq(actualDuties.employeeId, employees.id))
      .leftJoin(duties, eq(actualDuties.dutyId, duties.id))
      .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
      .orderBy(desc(actualDuties.date)),
    db.select().from(employees).orderBy(asc(employees.lastName), asc(employees.firstName)),
    db
      .select({ id: duties.id, name: duties.name, typeName: dutyTypes.name })
      .from(duties)
      .leftJoin(dutyTypes, eq(duties.dutyTypeId, dutyTypes.id))
      .orderBy(asc(duties.displayOrder), asc(duties.name))
  ]);

  return (
    <AppShell>
      <SectionHeader title="Реални повески" description="Реално изпълнение с възможни корекции на началния и крайния час." />

      <div className="grid gap-5 xl:grid-cols-[420px_1fr]">
        <ActualDutyForm action={createActualDutyAction} title="Ново реално назначение" buttonLabel="Добави" employees={employeeRows} duties={dutyRows} />

        <section className="overflow-hidden rounded border border-rail-line bg-white shadow-panel">
          <div className="border-b border-rail-line px-4 py-3">
            <h3 className="text-base font-semibold">Списък реални повески</h3>
            <p className="text-sm text-slate-600">Общо: {rows.length}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1040px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Дата</th>
                  <th className="px-4 py-3">Служител</th>
                  <th className="px-4 py-3">Роля</th>
                  <th className="px-4 py-3">Повеска</th>
                  <th className="px-4 py-3">Часове</th>
                  <th className="px-4 py-3 text-right">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rail-line">
                {rows.length ? rows.map((row) => (
                  <tr key={row.id} className="align-top">
                    <td className="px-4 py-3 font-medium">{row.date}</td>
                    <td className="px-4 py-3">{[row.employeeFirstName, row.employeeLastName].filter(Boolean).join(" ") || "-"}</td>
                    <td className="px-4 py-3">{roleLabels[(row.assignmentRole ?? "conductor") as keyof typeof roleLabels]}</td>
                    <td className="px-4 py-3">{row.dutyName ?? "-"}{row.dutyTypeName ? <span className="text-slate-500"> · {row.dutyTypeName}</span> : null}</td>
                    <td className="px-4 py-3">
                      <p>{asTime(row.startTimeOverride) || asTime(row.dutyStartTime)} - {asTime(row.endTimeOverride) || asTime(row.dutyEndTime)}</p>
                      {(row.startTimeOverride || row.endTimeOverride) ? <p className="mt-1 text-xs text-rail-signal">коригирано</p> : null}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <details className="text-left">
                          <summary className="cursor-pointer rounded border border-rail-line px-3 py-2 text-sm font-medium hover:bg-slate-100">Редакция</summary>
                          <div className="absolute right-8 z-10 mt-2 w-[min(520px,calc(100vw-2rem))] rounded border border-rail-line bg-white p-4 shadow-lg">
                            <ActualDutyForm action={updateActualDutyAction} title="Редакция" buttonLabel="Запази" actualDuty={row} employees={employeeRows} duties={dutyRows} />
                          </div>
                        </details>
                        <form action={deleteActualDutyAction}>
                          <input type="hidden" name="id" value={row.id} />
                          <ConfirmSubmit message="Да изтрия ли това реално назначение?" className="inline-flex h-10 items-center gap-2 rounded border border-red-200 px-3 text-sm font-medium text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" /> Изтрий
                          </ConfirmSubmit>
                        </form>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={6} className="px-4 py-10 text-center text-slate-500">Няма реални назначения.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function ActualDutyForm({
  action,
  title,
  buttonLabel,
  actualDuty,
  employees: employeeOptions,
  duties: dutyOptions
}: {
  action: (formData: FormData) => Promise<void>;
  title: string;
  buttonLabel: string;
  actualDuty?: {
    id: string;
    date: string;
    employeeId: string | null;
    dutyId: string | null;
    assignmentRole: string | null;
    startTimeOverride: string | null;
    endTimeOverride: string | null;
  };
  employees: Array<typeof employees.$inferSelect>;
  duties: Array<{ id: string; name: string; typeName: string | null }>;
}) {
  return (
    <form action={action} className="rounded border border-rail-line bg-white p-4 shadow-panel">
      <h3 className="text-base font-semibold">{title}</h3>
      {actualDuty ? <input type="hidden" name="id" value={actualDuty.id} /> : null}
      <div className="mt-4 grid gap-3">
        <Field name="date" label="Дата" type="date" defaultValue={actualDuty?.date} />
        <SelectField name="employeeId" label="Служител" defaultValue={actualDuty?.employeeId ?? ""}>
          <option value="">Избери служител</option>
          {employeeOptions.map((employee) => <option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</option>)}
        </SelectField>
        <SelectField name="assignmentRole" label="Роля" defaultValue={actualDuty?.assignmentRole ?? "conductor"}>
          <option value="conductor">Кондуктор</option>
          <option value="chief">Началник влак</option>
        </SelectField>
        <SelectField name="dutyId" label="Повеска" defaultValue={actualDuty?.dutyId ?? ""}>
          <option value="">Избери повеска</option>
          {dutyOptions.map((duty) => <option key={duty.id} value={duty.id}>{duty.name}{duty.typeName ? ` · ${duty.typeName}` : ""}</option>)}
        </SelectField>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field name="startTimeOverride" label="Начало корекция" type="time" defaultValue={asTime(actualDuty?.startTimeOverride ?? null)} />
          <Field name="endTimeOverride" label="Край корекция" type="time" defaultValue={asTime(actualDuty?.endTimeOverride ?? null)} />
        </div>
      </div>
      <button className="mt-4 inline-flex h-10 items-center gap-2 rounded bg-rail-ink px-4 text-sm font-medium text-white hover:bg-slate-700">
        {actualDuty ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        {buttonLabel}
      </button>
    </form>
  );
}

function SelectField({ name, label, defaultValue, children }: { name: string; label: string; defaultValue: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium" htmlFor={name}>{label}</label>
      <select id={name} name={name} defaultValue={defaultValue} className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route">
        {children}
      </select>
    </div>
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
