import { asc, desc, eq } from "drizzle-orm";
import { Plus, Save, Trash2 } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { ConfirmSubmit } from "@/components/confirm-submit";
import { SectionHeader } from "@/components/section-header";
import { getDb } from "@/db";
import { absenceReasons, employeeAbsences, employees } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import {
  createAbsenceReasonAction,
  createEmployeeAbsenceAction,
  deleteAbsenceReasonAction,
  deleteEmployeeAbsenceAction,
  updateEmployeeAbsenceAction
} from "./actions";

export default async function EmployeeAbsencesPage() {
  await requirePermission("employee_absences", "view");
  const db = getDb();

  const [rows, employeeRows, reasonRows] = await Promise.all([
    db
      .select({
        id: employeeAbsences.id,
        employeeId: employeeAbsences.employeeId,
        reasonId: employeeAbsences.reasonId,
        startDate: employeeAbsences.startDate,
        endDate: employeeAbsences.endDate,
        notes: employeeAbsences.notes,
        employeeFirstName: employees.firstName,
        employeeLastName: employees.lastName,
        reasonName: absenceReasons.name
      })
      .from(employeeAbsences)
      .leftJoin(employees, eq(employeeAbsences.employeeId, employees.id))
      .leftJoin(absenceReasons, eq(employeeAbsences.reasonId, absenceReasons.id))
      .orderBy(desc(employeeAbsences.startDate)),
    db.select().from(employees).orderBy(asc(employees.lastName), asc(employees.firstName)),
    db.select().from(absenceReasons).orderBy(asc(absenceReasons.name))
  ]);

  return (
    <AppShell>
      <SectionHeader title="Отсъствия" description="Периоди на отсъствие и причини, използвани при планиране." />

      <div className="grid gap-5 xl:grid-cols-[420px_1fr]">
        <section className="space-y-5">
          <AbsenceForm
            action={createEmployeeAbsenceAction}
            title="Ново отсъствие"
            buttonLabel="Добави"
            employees={employeeRows}
            reasons={reasonRows}
          />

          <form action={createAbsenceReasonAction} className="rounded border border-rail-line bg-white p-4 shadow-panel">
            <h3 className="text-base font-semibold">Нова причина</h3>
            <Field name="name" label="Причина" />
            <div className="mt-3">
              <label className="block text-sm font-medium" htmlFor="description">Описание</label>
              <textarea id="description" name="description" rows={2} className="mt-1 w-full rounded border border-rail-line px-3 py-2 outline-none focus:border-rail-route" />
            </div>
            <button className="mt-4 inline-flex h-10 items-center gap-2 rounded border border-rail-line px-4 text-sm font-medium hover:bg-slate-100">
              <Plus className="h-4 w-4" /> Добави причина
            </button>
          </form>
        </section>

        <section className="space-y-5">
          <div className="overflow-hidden rounded border border-rail-line bg-white shadow-panel">
            <div className="border-b border-rail-line px-4 py-3">
              <h3 className="text-base font-semibold">Списък отсъствия</h3>
              <p className="text-sm text-slate-600">Общо: {rows.length}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Служител</th>
                    <th className="px-4 py-3">Причина</th>
                    <th className="px-4 py-3">Период</th>
                    <th className="px-4 py-3">Бележки</th>
                    <th className="px-4 py-3 text-right">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rail-line">
                  {rows.length ? rows.map((row) => (
                    <tr key={row.id} className="align-top">
                      <td className="px-4 py-3 font-medium">{[row.employeeFirstName, row.employeeLastName].filter(Boolean).join(" ") || "-"}</td>
                      <td className="px-4 py-3">{row.reasonName ?? "-"}</td>
                      <td className="px-4 py-3">{row.startDate} - {row.endDate}</td>
                      <td className="max-w-xs px-4 py-3 text-slate-600">{row.notes || "-"}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <details className="text-left">
                            <summary className="cursor-pointer rounded border border-rail-line px-3 py-2 text-sm font-medium hover:bg-slate-100">Редакция</summary>
                            <div className="absolute right-8 z-10 mt-2 w-[min(520px,calc(100vw-2rem))] rounded border border-rail-line bg-white p-4 shadow-lg">
                              <AbsenceForm
                                action={updateEmployeeAbsenceAction}
                                title="Редакция"
                                buttonLabel="Запази"
                                absence={row}
                                employees={employeeRows}
                                reasons={reasonRows}
                              />
                            </div>
                          </details>
                          <form action={deleteEmployeeAbsenceAction}>
                            <input type="hidden" name="id" value={row.id} />
                            <ConfirmSubmit message="Да изтрия ли това отсъствие?" className="inline-flex h-10 items-center gap-2 rounded border border-red-200 px-3 text-sm font-medium text-red-700 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" /> Изтрий
                            </ConfirmSubmit>
                          </form>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={5} className="px-4 py-10 text-center text-slate-500">Няма въведени отсъствия.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded border border-rail-line bg-white shadow-panel">
            <div className="border-b border-rail-line px-4 py-3">
              <h3 className="text-base font-semibold">Причини</h3>
            </div>
            <div className="divide-y divide-rail-line">
              {reasonRows.length ? reasonRows.map((reason) => (
                <div key={reason.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                  <div>
                    <p className="font-medium">{reason.name}</p>
                    {reason.description ? <p className="text-slate-600">{reason.description}</p> : null}
                  </div>
                  <form action={deleteAbsenceReasonAction}>
                    <input type="hidden" name="id" value={reason.id} />
                    <ConfirmSubmit message="Да изтрия ли тази причина?" className="inline-flex h-9 items-center gap-2 rounded border border-red-200 px-3 text-sm font-medium text-red-700 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" /> Изтрий
                    </ConfirmSubmit>
                  </form>
                </div>
              )) : <p className="px-4 py-6 text-sm text-slate-500">Няма въведени причини.</p>}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function AbsenceForm({
  action,
  title,
  buttonLabel,
  absence,
  employees: employeeOptions,
  reasons
}: {
  action: (formData: FormData) => Promise<void>;
  title: string;
  buttonLabel: string;
  absence?: {
    id: string;
    employeeId: string;
    reasonId: string;
    startDate: string;
    endDate: string;
    notes: string | null;
  };
  employees: Array<typeof employees.$inferSelect>;
  reasons: Array<typeof absenceReasons.$inferSelect>;
}) {
  return (
    <form action={action} className="rounded border border-rail-line bg-white p-4 shadow-panel">
      <h3 className="text-base font-semibold">{title}</h3>
      {absence ? <input type="hidden" name="id" value={absence.id} /> : null}
      <div className="mt-4 grid gap-3">
        <div>
          <label className="block text-sm font-medium" htmlFor="employeeId">Служител</label>
          <select id="employeeId" name="employeeId" defaultValue={absence?.employeeId ?? ""} className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route">
            <option value="">Избери служител</option>
            {employeeOptions.map((employee) => <option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="reasonId">Причина</label>
          <select id="reasonId" name="reasonId" defaultValue={absence?.reasonId ?? ""} className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route">
            <option value="">Избери причина</option>
            {reasons.map((reason) => <option key={reason.id} value={reason.id}>{reason.name}</option>)}
          </select>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field name="startDate" label="От дата" type="date" defaultValue={absence?.startDate} />
          <Field name="endDate" label="До дата" type="date" defaultValue={absence?.endDate} />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="notes">Бележки</label>
          <textarea id="notes" name="notes" rows={3} defaultValue={absence?.notes ?? ""} className="mt-1 w-full rounded border border-rail-line px-3 py-2 outline-none focus:border-rail-route" />
        </div>
      </div>
      <button className="mt-4 inline-flex h-10 items-center gap-2 rounded bg-rail-ink px-4 text-sm font-medium text-white hover:bg-slate-700">
        {absence ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
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
