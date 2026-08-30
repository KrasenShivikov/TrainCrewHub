import { AppShell } from "@/components/app-shell";
import { SectionHeader } from "@/components/section-header";

export default function DutiesPage() {
  return (
    <AppShell>
      <SectionHeader
        title="Повески"
        description="Начална страница за пренасяне на повески, влакове към повеска, файлове и втори ден."
      />
      <div className="rounded border border-rail-line bg-white p-4 text-sm text-slate-600 shadow-panel">
        Очаква миграция от `src/pages/duties` и `src/pages/schedule-key-duties`.
      </div>
    </AppShell>
  );
}
