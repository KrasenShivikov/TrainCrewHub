import "server-only";

import { cookies } from "next/headers";

export type FlashKind = "success" | "error" | "info";

export type FlashMessage = {
  kind: FlashKind;
  text: string;
};

const flashCookieName = "tch_flash";

export async function setFlash(message: FlashMessage) {
  const cookieStore = await cookies();

  cookieStore.set(flashCookieName, JSON.stringify(message), {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 30
  });
}

export async function consumeFlash() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(flashCookieName)?.value;

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as FlashMessage;
  } catch {
    return null;
  }
}
