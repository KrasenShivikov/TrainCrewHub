"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/db";
import { roles, userProfiles, userRoles, users } from "@/db/schema";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

const registerSchema = z
  .object({
    email: z.string().trim().email(),
    username: z.string().trim().min(3).max(50),
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().min(1).max(100),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
  });

export async function registerAction(formData: FormData) {
  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword")
  });

  if (!parsed.success) {
    redirect("/register?error=invalid");
  }

  const email = parsed.data.email.toLowerCase();
  const username = parsed.data.username.toLowerCase();
  const db = getDb();

  const [existingUser] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser) {
    redirect("/register?error=exists");
  }

  const [firstUser] = await db.select({ id: users.id }).from(users).limit(1);
  const isBootstrapAdmin = !firstUser;

  await db
    .insert(roles)
    .values([
      { name: "admin", displayName: "Administrator", displayNameBg: "Администратор" },
      { name: "head_of_transport", displayName: "Head of Transport", displayNameBg: "Началник транспорт" },
      { name: "instructor", displayName: "Instructor", displayNameBg: "Инструктор" },
      { name: "user", displayName: "User", displayNameBg: "Потребител" }
    ])
    .onConflictDoNothing();

  const [createdUser] = await db
    .insert(users)
    .values({
      email,
      username,
      passwordHash: await hashPassword(parsed.data.password),
      isActive: isBootstrapAdmin
    })
    .returning({ id: users.id });

  await db.insert(userProfiles).values({
    id: createdUser.id,
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    createdFrom: createdUser.id
  });

  await db.insert(userRoles).values({
    userId: createdUser.id,
    role: isBootstrapAdmin ? "admin" : "user",
    grantedBy: isBootstrapAdmin ? createdUser.id : null,
    createdFrom: createdUser.id
  });

  if (!isBootstrapAdmin) {
    redirect("/pending-access");
  }

  await createSession(createdUser.id);
  redirect("/");
}
