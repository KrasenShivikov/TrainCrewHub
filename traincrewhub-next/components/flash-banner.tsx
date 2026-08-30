"use client";

import { useEffect } from "react";
import type { FlashMessage } from "@/lib/flash";

const styles = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  error: "border-red-200 bg-red-50 text-red-800",
  info: "border-sky-200 bg-sky-50 text-sky-800"
};

export function FlashBanner({ message }: { message: FlashMessage | null }) {
  useEffect(() => {
    if (message) {
      document.cookie = "tch_flash=; Max-Age=0; path=/; SameSite=Lax";
    }
  }, [message]);

  if (!message) {
    return null;
  }

  return (
    <div className={`mb-5 rounded border px-4 py-3 text-sm font-medium ${styles[message.kind]}`}>
      {message.text}
    </div>
  );
}
