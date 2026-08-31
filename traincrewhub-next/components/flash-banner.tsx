"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

type FlashMessage = {
  kind: "success" | "error" | "info";
  text: string;
};

const styles = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-900 shadow-emerald-950/10",
  error: "border-red-200 bg-red-50 text-red-900 shadow-red-950/10",
  info: "border-sky-200 bg-sky-50 text-sky-900 shadow-sky-950/10"
};

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info
};

export function FlashBanner({ message }: { message: FlashMessage | null }) {
  const [visible, setVisible] = useState(Boolean(message));
  const Icon = message ? icons[message.kind] : Info;

  useEffect(() => {
    if (message) {
      setVisible(true);
      document.cookie = "tch_flash=; Max-Age=0; path=/; SameSite=Lax";
    }
  }, [message]);

  useEffect(() => {
    if (!message) {
      return;
    }

    const timeout = window.setTimeout(() => setVisible(false), 4500);
    return () => window.clearTimeout(timeout);
  }, [message]);

  if (!message || !visible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 w-[min(420px,calc(100vw-2rem))]">
      <div className={`pointer-events-auto flex items-start gap-3 rounded border px-4 py-3 text-sm font-medium shadow-xl ${styles[message.kind]}`}>
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />
        <p className="min-w-0 flex-1 leading-6">{message.text}</p>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="grid h-6 w-6 shrink-0 place-items-center rounded hover:bg-black/5"
          aria-label="Затвори"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
