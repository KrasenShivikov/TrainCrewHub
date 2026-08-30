import { AppShell } from "@/components/app-shell";
import { SectionHeader } from "@/components/section-header";

export default function SchedulePage() {
  return (
    <AppShell>
      <SectionHeader
        title="График"
        description="Тук ще се пренесе таблото с реални назначения, drag-and-drop, публикуване и PDF/print режим."
      />
      <div className="grid min-h-[420px] place-items-center rounded border border-dashed border-rail-line bg-white text-sm text-slate-600">
        Schedule board placeholder
      </div>
    </AppShell>
  );
}
