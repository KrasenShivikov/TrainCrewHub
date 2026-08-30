export function SectionHeader({
  title,
  description
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-semibold tracking-normal text-rail-ink">{title}</h2>
      {description ? <p className="mt-1 max-w-3xl text-sm text-slate-600">{description}</p> : null}
    </div>
  );
}
