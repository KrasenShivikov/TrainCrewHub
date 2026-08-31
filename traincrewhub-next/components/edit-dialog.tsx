"use client";

import { useRef } from "react";
import { Pencil, X } from "lucide-react";

export function EditDialog({
  title = "Редакция",
  buttonLabel = "Редакция",
  children
}: {
  title?: string;
  buttonLabel?: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="inline-flex h-10 items-center gap-2 rounded border border-rail-line px-3 text-sm font-medium hover:bg-slate-100"
      >
        <Pencil className="h-4 w-4" />
        {buttonLabel}
      </button>
      <dialog ref={dialogRef} className="w-[min(640px,calc(100vw-2rem))] rounded border border-rail-line bg-white p-0 shadow-xl backdrop:bg-slate-900/40">
        <div className="flex items-center justify-between border-b border-rail-line px-4 py-3">
          <h3 className="text-base font-semibold">{title}</h3>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="grid h-8 w-8 place-items-center rounded hover:bg-slate-100"
            aria-label="Затвори"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4" onSubmitCapture={() => dialogRef.current?.close()}>{children}</div>
      </dialog>
    </>
  );
}
