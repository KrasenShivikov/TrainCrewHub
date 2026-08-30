import { AppShell } from "@/components/app-shell";
import { SectionHeader } from "@/components/section-header";

export default function AdminPage() {
  return (
    <AppShell>
      <SectionHeader
        title="Админ"
        description="Страница за роли, права, потребителски профили и audit логове."
      />
      <div className="rounded border border-rail-line bg-white p-4 text-sm text-slate-600 shadow-panel">
        Очаква миграция от `src/pages/admin` и `src/pages/user-profiles`.
      </div>
    </AppShell>
  );
}
