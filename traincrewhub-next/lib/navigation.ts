import {
  CalendarDays,
  ClipboardList,
  FileText,
  Gauge,
  ShieldCheck,
  Train,
  UsersRound
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Route } from "next";

type NavigationItem = {
  href: Route;
  label: string;
  icon: LucideIcon;
};

export const navigation = [
  { href: "/", label: "Начало", icon: Gauge },
  { href: "/schedule", label: "График", icon: CalendarDays },
  { href: "/schedule-keys", label: "Ключ-графици", icon: CalendarDays },
  { href: "/duties", label: "Повески", icon: ClipboardList },
  { href: "/duty-types", label: "Типове повески", icon: ClipboardList },
  { href: "/employees", label: "Служители", icon: UsersRound },
  { href: "/trains", label: "Влакове", icon: Train },
  { href: "/documents", label: "Документи", icon: FileText },
  { href: "/admin", label: "Админ", icon: ShieldCheck }
] satisfies NavigationItem[];
