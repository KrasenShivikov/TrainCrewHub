import Link from "next/link";

export default async function ForbiddenPage({
  searchParams
}: {
  searchParams: Promise<{ resource?: string; action?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-rail-mist px-4">
      <section className="w-full max-w-md rounded border border-rail-line bg-white p-6 text-center shadow-panel">
        <h1 className="text-lg font-semibold">Нямаш достъп</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Липсва право за {params.resource ?? "ресурс"} / {params.action ?? "действие"}.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex h-10 items-center rounded bg-rail-ink px-4 text-sm font-medium text-white hover:bg-slate-700"
        >
          Към начало
        </Link>
      </section>
    </main>
  );
}
