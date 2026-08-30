import { AppShell } from "@/components/app-shell";
import { SectionHeader } from "@/components/section-header";

export default function EmployeesPage() {
  return (
    <AppShell>
      <SectionHeader
        title="Служители"
        description="Тук ще бъде пренесен модулът за служители, позиции, снимки и валидност на документи."
      />
      <div className="rounded border border-rail-line bg-white p-4 text-sm text-slate-600 shadow-panel">
        Очаква миграция от `src/pages/employees`.
      </div>
    </AppShell>
  );
}
