"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ConfirmSubmitProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  message: string;
  children: ReactNode;
};

export function ConfirmSubmit({ message, children, onClick, ...props }: ConfirmSubmitProps) {
  return (
    <button
      {...props}
      type="submit"
      onClick={(event) => {
        if (!window.confirm(message)) {
          event.preventDefault();
          return;
        }

        onClick?.(event);
      }}
    >
      {children}
    </button>
  );
}
