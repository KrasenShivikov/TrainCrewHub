"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type AssignmentRole = "chief" | "conductor";

type AssignmentRow = {
  id: string;
  dutyId: string | null;
  employeeId: string | null;
  assignmentRole: string | null;
  startTimeOverride: string | null;
  endTimeOverride: string | null;
  employeeFirstName: string | null;
  employeeLastName: string | null;
  originalEmployeeId: string | null;
  originalAssignmentRole: string | null;
  originalEmployeeFirstName: string | null;
  originalEmployeeLastName: string | null;
  dutyName: string | null;
  dutyStartTime: string | null;
  dutyEndTime: string | null;
  dutyTypeName: string | null;
};

type AvailableEmployee = {
  id: string;
  firstName: string;
  lastName: string;
  positionTitle: string | null;
};

const roleLabels: Record<AssignmentRole, string> = {
  chief: "Началник влак",
  conductor: "Кондуктор"
};

function asTime(value: string | null) {
  return value ? value.slice(0, 5) : "";
}

function employeeName(firstName: string | null, lastName: string | null) {
  return [firstName, lastName].filter(Boolean).join(" ") || "-";
}

export function ScheduleAssignmentBoard({
  date,
  assignments,
  employees,
  assignAction,
  restoreAction
}: {
  date: string;
  assignments: AssignmentRow[];
  employees: AvailableEmployee[];
  assignAction: (formData: FormData) => void | Promise<void>;
  restoreAction: (formData: FormData) => void | Promise<void>;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const employeeIdRef = useRef<HTMLInputElement>(null);
  const dutyIdRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);
  const sourceActualDutyIdRef = useRef<HTMLInputElement>(null);
  const [draggingEmployeeId, setDraggingEmployeeId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);

  const grouped = Map.groupBy(assignments, (row) => row.dutyTypeName || "Без тип");
  const hasAssignments = [...grouped.entries()].length > 0;

  function dragPayload(employeeId: string, sourceActualDutyId?: string) {
    return JSON.stringify({ employeeId, sourceActualDutyId: sourceActualDutyId ?? "" });
  }

  function parseDragPayload(value: string) {
    try {
      const parsed = JSON.parse(value) as { employeeId?: string; sourceActualDutyId?: string };
      return { employeeId: parsed.employeeId ?? "", sourceActualDutyId: parsed.sourceActualDutyId ?? "" };
    } catch {
      return { employeeId: value, sourceActualDutyId: "" };
    }
  }

  function assignDroppedEmployee(payload: string, dutyId: string | null, role: AssignmentRole) {
    const { employeeId, sourceActualDutyId } = parseDragPayload(payload);

    if (!employeeId || !dutyId) {
      return;
    }

    if (employeeIdRef.current && dutyIdRef.current && roleRef.current && sourceActualDutyIdRef.current) {
      employeeIdRef.current.value = employeeId;
      dutyIdRef.current.value = dutyId;
      roleRef.current.value = role;
      sourceActualDutyIdRef.current.value = sourceActualDutyId;
      formRef.current?.requestSubmit();
    }
  }

  return (
    <div className="space-y-5">
      <form ref={formRef} action={assignAction} className="hidden">
        <input type="hidden" name="date" value={date} />
        <input ref={employeeIdRef} type="hidden" name="employeeId" />
        <input ref={dutyIdRef} type="hidden" name="dutyId" />
        <input ref={roleRef} type="hidden" name="assignmentRole" />
        <input ref={sourceActualDutyIdRef} type="hidden" name="sourceActualDutyId" />
      </form>

      <section className="rounded border border-rail-line bg-white p-4 shadow-panel">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold">Свободни служители</h3>
            <p className="text-sm text-slate-600">Плъзни служител към роля или размени две назначени имена.</p>
          </div>
          <span className="rounded bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">{employees.length}</span>
        </div>
        {employees.length ? (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {employees.map((employee) => (
              <button
                key={employee.id}
                type="button"
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData("text/plain", dragPayload(employee.id));
                  event.dataTransfer.effectAllowed = "move";
                  setDraggingEmployeeId(employee.id);
                }}
                onDragEnd={() => {
                  setDraggingEmployeeId(null);
                  setDropTarget(null);
                }}
                className={`cursor-grab rounded border px-3 py-2 text-left text-sm shadow-sm transition active:cursor-grabbing ${
                  draggingEmployeeId === employee.id
                    ? "border-rail-route bg-emerald-50 text-emerald-900"
                    : "border-rail-line bg-white hover:border-rail-route hover:bg-slate-50"
                }`}
              >
                <span className="block font-semibold">{employeeName(employee.firstName, employee.lastName)}</span>
                <span className="mt-1 block text-xs text-slate-500">{employee.positionTitle ?? "Без позиция"}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="rounded border border-dashed border-rail-line px-4 py-6 text-center text-sm text-slate-500">
            Няма свободни активни служители за тази дата.
          </p>
        )}
      </section>

      {hasAssignments ? (
        [...grouped.entries()].map(([typeName, rows]) => (
          <section key={typeName} className="overflow-hidden rounded border border-rail-line bg-white shadow-panel">
            <div className="border-b border-rail-line px-4 py-3">
              <h3 className="text-base font-semibold">{typeName}</h3>
              <p className="text-sm text-slate-600">Реални назначения: {rows.length}</p>
            </div>
            <div className="grid gap-px bg-rail-line md:grid-cols-2 xl:grid-cols-3">
              {[...Map.groupBy(rows, (row) => row.dutyId ?? row.dutyName ?? row.id).entries()].map(([dutyKey, dutyRows]) => {
                const base = dutyRows[0];

                return (
                  <article key={dutyKey} className="bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-semibold">{base?.dutyName ?? "-"}</h4>
                        <p className="mt-1 text-sm text-slate-600">
                          {asTime(base?.startTimeOverride ?? null) || asTime(base?.dutyStartTime ?? null)} -{" "}
                          {asTime(base?.endTimeOverride ?? null) || asTime(base?.dutyEndTime ?? null)}
                        </p>
                      </div>
                      {base?.dutyId ? (
                        <Link href={`/duties/${base.dutyId}`} className="text-xs font-medium text-rail-route hover:underline">
                          Детайли
                        </Link>
                      ) : null}
                    </div>
                    <div className="mt-4 grid gap-2">
                      {(["chief", "conductor"] as const).map((role) => {
                        const assigned = dutyRows.find((row) => row.assignmentRole === role);
                        const assignedEmployeeId = assigned?.employeeId ?? null;
                        const assignedId = assigned?.id ?? "";
                        const assignedName = employeeName(assigned?.employeeFirstName ?? null, assigned?.employeeLastName ?? null);
                        const originalName = employeeName(assigned?.originalEmployeeFirstName ?? null, assigned?.originalEmployeeLastName ?? null);
                        const isChangedFromOriginal = Boolean(
                          assigned &&
                          ((assigned.originalEmployeeId && assigned.originalEmployeeId !== assigned.employeeId) ||
                            (assigned.originalAssignmentRole && assigned.originalAssignmentRole !== assigned.assignmentRole))
                        );
                        const targetKey = `${dutyKey}-${role}`;
                        const isActiveTarget = dropTarget === targetKey;

                        return (
                          <div
                            key={role}
                            onDragOver={(event) => {
                              if (base?.dutyId) {
                                event.preventDefault();
                                event.dataTransfer.dropEffect = "move";
                              }
                            }}
                            onDragEnter={() => {
                              if (base?.dutyId) {
                                setDropTarget(targetKey);
                              }
                            }}
                            onDragLeave={() => setDropTarget(null)}
                            onDrop={(event) => {
                              event.preventDefault();
                              setDropTarget(null);
                              assignDroppedEmployee(event.dataTransfer.getData("text/plain"), base?.dutyId ?? null, role);
                            }}
                            className={`min-h-[64px] rounded border px-3 py-2 transition ${
                              isActiveTarget
                                ? "border-rail-route bg-emerald-50"
                                : assigned
                                  ? "border-rail-line bg-slate-50"
                                  : "border-dashed border-slate-300 bg-white"
                            }`}
                          >
                            <p className="text-xs font-medium text-slate-500">{roleLabels[role]}</p>
                            {assignedEmployeeId && assignedId ? (
                              <>
                                <button
                                  type="button"
                                  draggable
                                  onDragStart={(event) => {
                                    event.dataTransfer.setData("text/plain", dragPayload(assignedEmployeeId, assignedId));
                                    event.dataTransfer.effectAllowed = "move";
                                    setDraggingEmployeeId(assignedEmployeeId);
                                  }}
                                  onDragEnd={() => {
                                    setDraggingEmployeeId(null);
                                    setDropTarget(null);
                                  }}
                                  className={`mt-1 block cursor-grab rounded px-2 py-1 text-left text-sm font-semibold transition active:cursor-grabbing ${
                                    draggingEmployeeId === assignedEmployeeId ? "bg-emerald-100 text-emerald-900" : "hover:bg-white"
                                  }`}
                                >
                                  {assignedName}
                                </button>
                                {isChangedFromOriginal ? (
                                  <div className="mt-2 rounded border border-amber-200 bg-amber-50 px-2 py-1.5">
                                    <p className="text-xs text-amber-800">по график: {originalName}</p>
                                    <form action={restoreAction} className="mt-2">
                                      <input type="hidden" name="id" value={assignedId} />
                                      <button className="text-xs font-semibold text-amber-900 hover:underline">Върни по график</button>
                                    </form>
                                  </div>
                                ) : null}
                              </>
                            ) : (
                              <p className="mt-1 text-sm font-semibold">Пусни служител тук</p>
                            )}
                            {assigned?.startTimeOverride || assigned?.endTimeOverride ? (
                              <p className="mt-1 text-xs text-rail-signal">коригирано</p>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))
      ) : (
        <div className="rounded border border-dashed border-rail-line bg-white px-4 py-12 text-center text-sm text-slate-500">
          Няма реални назначения за {date}.
        </div>
      )}
    </div>
  );
}
