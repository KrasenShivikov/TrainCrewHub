"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, GripVertical, Link2, Plus, Save } from "lucide-react";

type DutyOrderItem = {
  dutyId: string;
  dutyName: string;
  dutyTypeName: string | null;
};

type DutyCatalogItem = {
  id: string;
  name: string;
  dutyTypeName: string | null;
};

type DutyTypeItem = {
  id: string;
  name: string;
};

export function ScheduleKeyDutyOrderForm({
  attachAction,
  createAction,
  reorderAction,
  scheduleKeyId,
  duties,
  dutyCatalog,
  dutyTypes
}: {
  attachAction: (formData: FormData) => Promise<void>;
  createAction: (formData: FormData) => Promise<void>;
  reorderAction: (formData: FormData) => Promise<void>;
  scheduleKeyId: string;
  duties: DutyOrderItem[];
  dutyCatalog: DutyCatalogItem[];
  dutyTypes: DutyTypeItem[];
}) {
  const [items, setItems] = useState(duties);
  const attachedDutyIds = new Set(items.map((item) => item.dutyId));
  const availableDuties = dutyCatalog.filter((duty) => !attachedDutyIds.has(duty.id));

  useEffect(() => {
    setItems(duties);
  }, [duties]);

  function move(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= items.length) {
      return;
    }

    const next = [...items];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    setItems(next);
  }

  return (
    <div className="space-y-5">
      <form action={attachAction} className="rounded border border-rail-line bg-slate-50 p-3">
        <input type="hidden" name="scheduleKeyId" value={scheduleKeyId} />
        <label className="block text-sm font-medium" htmlFor={`attach-duty-${scheduleKeyId}`}>
          Съществуваща повеска
        </label>
        <div className="mt-2 flex gap-2">
          <select
            id={`attach-duty-${scheduleKeyId}`}
            name="dutyId"
            className="h-10 min-w-0 flex-1 rounded border border-rail-line bg-white px-3 outline-none focus:border-rail-route"
            required
          >
            <option value="">Избери повеска</option>
            {availableDuties.map((duty) => (
              <option key={duty.id} value={duty.id}>
                {duty.name}{duty.dutyTypeName ? ` - ${duty.dutyTypeName}` : ""}
              </option>
            ))}
          </select>
          <button
            disabled={!availableDuties.length}
            className="inline-flex h-10 items-center gap-2 rounded border border-rail-line bg-white px-3 text-sm font-medium hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Link2 className="h-4 w-4" />
            Свържи
          </button>
        </div>
      </form>

      <form action={createAction} className="rounded border border-rail-line bg-white p-3">
        <input type="hidden" name="scheduleKeyId" value={scheduleKeyId} />
        <h4 className="text-sm font-semibold">Нова повеска</h4>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field name="name" label="Име" />
          <div>
            <label className="block text-sm font-medium" htmlFor={`new-duty-type-${scheduleKeyId}`}>
              Тип
            </label>
            <select
              id={`new-duty-type-${scheduleKeyId}`}
              name="dutyTypeId"
              className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route"
            >
              <option value="">Без тип</option>
              {dutyTypes.map((type) => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          <Field name="startTime" label="Начало" type="time" />
          <Field name="endTime" label="Край" type="time" />
          <Field name="breakStartTime" label="Начало прекъсване" type="time" required={false} />
          <Field name="breakEndTime" label="Край прекъсване" type="time" required={false} />
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input name="isSecondDay" type="checkbox" className="h-4 w-4 rounded border-rail-line text-rail-route" />
          Повеска за втори ден
        </label>
        <div className="mt-3">
          <label className="block text-sm font-medium" htmlFor={`new-duty-notes-${scheduleKeyId}`}>
            Бележки
          </label>
          <textarea
            id={`new-duty-notes-${scheduleKeyId}`}
            name="notes"
            rows={2}
            className="mt-1 w-full rounded border border-rail-line px-3 py-2 outline-none focus:border-rail-route"
          />
        </div>
        <button className="mt-3 inline-flex h-10 items-center gap-2 rounded bg-rail-ink px-4 text-sm font-medium text-white hover:bg-slate-700">
          <Plus className="h-4 w-4" />
          Създай и свържи
        </button>
      </form>

      <form action={reorderAction} className="space-y-4">
        <input type="hidden" name="scheduleKeyId" value={scheduleKeyId} />

        {items.length ? (
          <div className="divide-y divide-rail-line overflow-hidden rounded border border-rail-line">
            {items.map((duty, index) => (
              <div key={duty.dutyId} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 bg-white px-3 py-2 text-sm">
                <GripVertical className="h-4 w-4 text-slate-400" />
                <div className="min-w-0">
                  <input type="hidden" name="dutyIds" value={duty.dutyId} />
                  <p className="truncate font-medium">{index + 1}. {duty.dutyName}</p>
                  {duty.dutyTypeName ? <p className="truncate text-xs text-slate-500">{duty.dutyTypeName}</p> : null}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="grid h-8 w-8 place-items-center rounded border border-rail-line hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Нагоре"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                    className="grid h-8 w-8 place-items-center rounded border border-rail-line hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Надолу"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded border border-rail-line bg-slate-50 px-3 py-6 text-center text-sm text-slate-500">
            Няма прикрепени повески към този ключ-график.
          </p>
        )}

        <button
          disabled={!items.length}
          className="inline-flex h-10 items-center gap-2 rounded bg-rail-ink px-4 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          Запази реда
        </button>
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = true
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route"
      />
    </div>
  );
}
