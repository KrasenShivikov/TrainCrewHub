"use client";

import { useMemo, useState } from "react";
import { WandSparkles } from "lucide-react";

type EmployeeOption = {
  id: string;
  firstName: string;
  lastName: string;
};

type ScheduleKeyOption = {
  id: string;
  name: string;
  crewRole: string | null;
};

type CycleDutyOption = {
  id: string;
  name: string;
  scheduleKeyId: string;
};

export function AutoPlannedDutyForm({
  action,
  employees,
  scheduleKeys,
  cycleDuties
}: {
  action: (formData: FormData) => Promise<void>;
  employees: EmployeeOption[];
  scheduleKeys: ScheduleKeyOption[];
  cycleDuties: CycleDutyOption[];
}) {
  const [scheduleKeyId, setScheduleKeyId] = useState("");
  const filteredDuties = useMemo(
    () => cycleDuties.filter((duty) => duty.scheduleKeyId === scheduleKeyId),
    [cycleDuties, scheduleKeyId]
  );

  return (
    <form action={action} className="rounded border border-rail-line bg-white p-4 shadow-panel">
      <div className="mb-4 flex items-center gap-2">
        <WandSparkles className="h-5 w-5 text-rail-route" />
        <h3 className="text-base font-semibold">Автоматично планиране</h3>
      </div>

      <div className="grid gap-3">
        <div>
          <label className="block text-sm font-medium" htmlFor="autoEmployeeId">Служител</label>
          <select id="autoEmployeeId" name="employeeId" className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route" required>
            <option value="">Избери служител</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <div>
            <label className="block text-sm font-medium" htmlFor="autoAssignmentRole">Роля</label>
            <select id="autoAssignmentRole" name="assignmentRole" defaultValue="conductor" className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route" required>
              <option value="conductor">Кондуктор</option>
              <option value="chief">Началник влак</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="autoScheduleKeyId">Ключ-график</label>
            <select
              id="autoScheduleKeyId"
              name="scheduleKeyId"
              value={scheduleKeyId}
              onChange={(event) => setScheduleKeyId(event.target.value)}
              className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route"
              required
            >
              <option value="">Избери ключ-график</option>
              {scheduleKeys.map((key) => (
                <option key={key.id} value={key.id}>
                  {key.name}{key.crewRole ? ` (${key.crewRole})` : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <Field name="dateFrom" label="От дата" type="date" />
          <Field name="dateTo" label="До дата" type="date" />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="autoStartDutyId">Стартова повеска</label>
          <select id="autoStartDutyId" name="startDutyId" className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route" required disabled={!scheduleKeyId}>
            <option value="">{scheduleKeyId ? "Избери стартова повеска" : "Първо избери ключ-график"}</option>
            {filteredDuties.map((duty) => (
              <option key={duty.id} value={duty.id}>
                {duty.name}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-start gap-2 text-sm text-slate-700">
          <input name="overwriteExisting" type="checkbox" value="1" className="mt-0.5 h-4 w-4 rounded border-rail-line text-rail-route" />
          <span>Презапиши съществуващите планирания за служителя в периода</span>
        </label>
      </div>

      <button className="mt-4 inline-flex h-10 items-center gap-2 rounded bg-rail-ink px-4 text-sm font-medium text-white hover:bg-slate-700">
        <WandSparkles className="h-4 w-4" />
        Генерирай
      </button>
    </form>
  );
}

function Field({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium" htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route" required />
    </div>
  );
}
