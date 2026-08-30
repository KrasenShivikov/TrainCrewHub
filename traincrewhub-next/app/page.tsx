import { AppShell } from "@/components/app-shell";
import { SectionHeader } from "@/components/section-header";

const modules = [
  ["График", "Реални назначения, промени, публикуване и потвърждение."],
  ["План-график", "Планирани повески, отсъствия и печат."],
  ["Повески", "Профили, влакове, прикачени файлове и втори ден."],
  ["Администрация", "Роли, права, профили и логове."]
];

export default function HomePage() {
  return (
    <AppShell>
      <SectionHeader
        title="Работен плот"
        description="Начален екран за новата Next.js версия. Модулите ще се пренасят поетапно от текущото Vite приложение."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {modules.map(([title, description]) => (
          <article key={title} className="rounded border border-rail-line bg-white p-4 shadow-panel">
            <h3 className="text-base font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
