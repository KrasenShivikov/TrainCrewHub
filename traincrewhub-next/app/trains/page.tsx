import { AppShell } from "@/components/app-shell";
import { SectionHeader } from "@/components/section-header";

export default function TrainsPage() {
  return (
    <AppShell>
      <SectionHeader
        title="Влакове"
        description="Страница за пренасяне на влакове, разписания и връзки към повески."
      />
      <div className="rounded border border-rail-line bg-white p-4 text-sm text-slate-600 shadow-panel">
        Очаква миграция от `src/pages/trains` и `src/pages/trains-for-duties`.
      </div>
    </AppShell>
  );
}
