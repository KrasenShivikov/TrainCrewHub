import { AppShell } from "@/components/app-shell";
import { SectionHeader } from "@/components/section-header";

export default function DocumentsPage() {
  return (
    <AppShell>
      <SectionHeader
        title="Документи"
        description="Страница за категории, файлове и управление на документи."
      />
      <div className="rounded border border-rail-line bg-white p-4 text-sm text-slate-600 shadow-panel">
        Очаква миграция от `src/pages/documents`.
      </div>
    </AppShell>
  );
}
