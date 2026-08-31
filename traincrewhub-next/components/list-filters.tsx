export function ListFilters({
  q,
  children
}: {
  q?: string;
  children?: React.ReactNode;
}) {
  return (
    <form className="mb-5 flex flex-wrap items-end gap-3 rounded border border-rail-line bg-white p-4 shadow-panel">
      <div className="min-w-64 flex-1">
        <label className="block text-sm font-medium" htmlFor="q">Търсене</label>
        <input
          id="q"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Име, номер, повеска..."
          className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route"
        />
      </div>
      {children}
      <button className="h-10 rounded bg-rail-ink px-4 text-sm font-medium text-white hover:bg-slate-700">
        Филтрирай
      </button>
    </form>
  );
}

export function SelectFilter({
  name,
  label,
  value,
  options
}: {
  name: string;
  label: string;
  value?: string;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div>
      <label className="block text-sm font-medium" htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        defaultValue={value ?? ""}
        className="mt-1 h-10 rounded border border-rail-line px-3 outline-none focus:border-rail-route"
      >
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </div>
  );
}

export function DateFilter({ name, label, value }: { name: string; label: string; value?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type="date"
        defaultValue={value ?? ""}
        className="mt-1 h-10 rounded border border-rail-line px-3 outline-none focus:border-rail-route"
      />
    </div>
  );
}
