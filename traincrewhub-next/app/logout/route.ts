import { redirect } from "next/navigation";

import { deleteCurrentSession } from "@/lib/auth/session";

export async function POST() {
  await deleteCurrentSession();
  redirect("/login");
}

export async function GET() {
  await deleteCurrentSession();
  redirect("/login");
}
