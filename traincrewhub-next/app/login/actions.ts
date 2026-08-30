"use server";

import { redirect } from "next/navigation";
import { eq, or } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/db";
import { users } from "@/db/schema";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

const loginSchema = z.object({
  login: z.string().trim().min(1),
  password: z.string().min(1)
});

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    login: formData.get("login"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    redirect("/login?error=missing");
  }

  const login = parsed.data.login.toLowerCase();
  const [user] = await getDb()
    .select()
    .from(users)
    .where(or(eq(users.email, login), eq(users.username, login)))
    .limit(1);

  if (!user) {
    redirect("/login?error=invalid");
  }

  const validPassword = await verifyPassword(parsed.data.password, user.passwordHash);

  if (!validPassword) {
    redirect("/login?error=invalid");
  }

  if (!user.isActive) {
    redirect("/pending-access");
  }

  await getDb().update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id));
  await createSession(user.id);

  redirect("/");
}
