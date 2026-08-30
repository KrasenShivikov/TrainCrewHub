"use server";

import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/db";
import { documentCategories, documents } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { setFlash } from "@/lib/flash";

const uploadRoot = path.join(process.cwd(), "public", "uploads", "documents");

const documentSchema = z.object({
  title: z.string().trim().min(1),
  categoryId: z.string().trim().transform((value) => value || null),
  notes: z.string().trim().optional().transform((value) => value || null),
  documentUrl: z.string().trim().optional().transform((value) => value || null)
});

async function saveDocumentFile(file: File | null) {
  if (!file || file.size === 0) {
    return null;
  }

  await mkdir(uploadRoot, { recursive: true });
  const extension = path.extname(file.name).replace(/[^a-zA-Z0-9.]/g, "") || ".bin";
  const baseName = `${Date.now()}-${crypto.randomUUID()}${extension}`;
  const targetPath = path.join(uploadRoot, baseName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(targetPath, buffer);

  return {
    storagePath: `uploads/documents/${baseName}`,
    documentUrl: `/uploads/documents/${baseName}`
  };
}

async function removeLocalDocument(storagePath: string | null) {
  if (!storagePath || !storagePath.startsWith("uploads/documents/")) {
    return;
  }

  const absolutePath = path.join(process.cwd(), "public", storagePath);

  try {
    await unlink(absolutePath);
  } catch {
    // Missing files should not block deleting the database row.
  }
}

function parseDocument(formData: FormData) {
  return documentSchema.safeParse({
    title: formData.get("title"),
    categoryId: formData.get("categoryId"),
    notes: formData.get("notes"),
    documentUrl: formData.get("documentUrl")
  });
}

export async function createDocumentCategoryAction(formData: FormData) {
  const { user } = await requirePermission("documents", "create");
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;

  if (!name) {
    await setFlash({ kind: "error", text: "Въведи име на категория." });
    return;
  }

  await getDb().insert(documentCategories).values({ name, description, createdFrom: user.id });
  await setFlash({ kind: "success", text: "Категорията е добавена." });
  revalidatePath("/documents");
}

export async function createDocumentAction(formData: FormData) {
  const { user } = await requirePermission("documents", "create");
  const parsed = parseDocument(formData);
  if (!parsed.success) {
    await setFlash({ kind: "error", text: "Въведи заглавие на документа." });
    return;
  }

  const fileData = await saveDocumentFile(formData.get("file") as File | null);

  await getDb().insert(documents).values({
    ...parsed.data,
    documentUrl: fileData?.documentUrl ?? parsed.data.documentUrl,
    storagePath: fileData?.storagePath ?? null,
    createdFrom: user.id
  });

  await setFlash({ kind: "success", text: "Документът е добавен." });
  revalidatePath("/documents");
}

export async function updateDocumentAction(formData: FormData) {
  await requirePermission("documents", "edit");
  const id = String(formData.get("id") ?? "");
  const parsed = parseDocument(formData);
  if (!id || !parsed.success) {
    await setFlash({ kind: "error", text: "Провери данните за документа." });
    return;
  }

  const [existing] = await getDb()
    .select({ storagePath: documents.storagePath })
    .from(documents)
    .where(eq(documents.id, id))
    .limit(1);

  const fileData = await saveDocumentFile(formData.get("file") as File | null);

  await getDb()
    .update(documents)
    .set({
      ...parsed.data,
      documentUrl: fileData?.documentUrl ?? parsed.data.documentUrl,
      storagePath: fileData?.storagePath ?? existing?.storagePath ?? null,
      updatedAt: new Date()
    })
    .where(eq(documents.id, id));

  if (fileData?.storagePath) {
    await removeLocalDocument(existing?.storagePath ?? null);
  }

  await setFlash({ kind: "success", text: "Документът е обновен." });
  revalidatePath("/documents");
}

export async function deleteDocumentAction(formData: FormData) {
  await requirePermission("documents", "delete");
  const id = String(formData.get("id") ?? "");
  if (!id) {
    await setFlash({ kind: "error", text: "Липсва документ за изтриване." });
    return;
  }

  const [existing] = await getDb()
    .select({ storagePath: documents.storagePath })
    .from(documents)
    .where(eq(documents.id, id))
    .limit(1);

  await getDb().delete(documents).where(eq(documents.id, id));
  await removeLocalDocument(existing?.storagePath ?? null);
  await setFlash({ kind: "success", text: "Документът е изтрит." });
  revalidatePath("/documents");
}

export async function deleteDocumentCategoryAction(formData: FormData) {
  await requirePermission("documents", "delete");
  const id = String(formData.get("id") ?? "");
  if (!id) {
    await setFlash({ kind: "error", text: "Липсва категория за изтриване." });
    return;
  }

  await getDb().delete(documentCategories).where(eq(documentCategories.id, id));
  await setFlash({ kind: "success", text: "Категорията е изтрита." });
  revalidatePath("/documents");
}
