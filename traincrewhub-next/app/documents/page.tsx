import { and, asc, count, desc, eq, ilike, or, type SQL } from "drizzle-orm";
import { ExternalLink, Plus, Save, Trash2, Upload } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { ConfirmSubmit } from "@/components/confirm-submit";
import { EditDialog } from "@/components/edit-dialog";
import { ListFilters, SelectFilter } from "@/components/list-filters";
import { Pagination } from "@/components/pagination";
import { SectionHeader } from "@/components/section-header";
import { getDb } from "@/db";
import { documentCategories, documents } from "@/db/schema";
import { requirePermission } from "@/lib/auth/permissions";
import { defaultPageSize, pageOffset, paginationMeta, parsePage } from "@/lib/pagination";
import {
  createDocumentAction,
  createDocumentCategoryAction,
  deleteDocumentAction,
  deleteDocumentCategoryAction,
  updateDocumentAction
} from "./actions";

export default async function DocumentsPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; categoryId?: string; page?: string }>;
}) {
  await requirePermission("documents", "view");
  const { q: rawQ, categoryId = "", page: rawPage } = await searchParams;
  const q = (rawQ ?? "").trim();
  const page = parsePage(rawPage);
  const db = getDb();
  const filters: SQL[] = [];

  if (q) {
    const term = `%${q}%`;
    const queryFilter = or(
      ilike(documents.title, term),
      ilike(documentCategories.name, term),
      ilike(documents.notes, term),
      ilike(documents.documentUrl, term)
    );

    if (queryFilter) filters.push(queryFilter);
  }

  if (categoryId) {
    filters.push(eq(documents.categoryId, categoryId));
  }

  const where = filters.length ? and(...filters) : undefined;
  const [{ totalItems }] = await db
    .select({ totalItems: count() })
    .from(documents)
    .leftJoin(documentCategories, eq(documents.categoryId, documentCategories.id))
    .where(where);
  const paginatedDocuments = paginationMeta(totalItems, page);

  const [documentRows, categoryRows] = await Promise.all([
    db
      .select({
        id: documents.id,
        title: documents.title,
        categoryId: documents.categoryId,
        categoryName: documentCategories.name,
        documentUrl: documents.documentUrl,
        storagePath: documents.storagePath,
        notes: documents.notes,
        createdAt: documents.createdAt
      })
      .from(documents)
      .leftJoin(documentCategories, eq(documents.categoryId, documentCategories.id))
      .where(where)
      .orderBy(desc(documents.createdAt))
      .limit(defaultPageSize)
      .offset(pageOffset(paginatedDocuments.page)),
    db.select().from(documentCategories).orderBy(asc(documentCategories.name))
  ]);

  return (
    <AppShell>
      <SectionHeader title="Документи" description="Категории, линкове и локално качени файлове." />

      <ListFilters q={rawQ}>
        <SelectFilter
          name="categoryId"
          label="Категория"
          value={categoryId}
          options={[
            { value: "", label: "Всички" },
            ...categoryRows.map((category) => ({ value: category.id, label: category.name }))
          ]}
        />
      </ListFilters>

      <div className="grid gap-5 xl:grid-cols-[420px_1fr]">
        <section className="space-y-5">
          <DocumentForm action={createDocumentAction} title="Нов документ" buttonLabel="Добави" categories={categoryRows} />

          <form action={createDocumentCategoryAction} className="rounded border border-rail-line bg-white p-4 shadow-panel">
            <h3 className="text-base font-semibold">Нова категория</h3>
            <Field name="name" label="Име" />
            <div className="mt-3">
              <label className="block text-sm font-medium" htmlFor="description">Описание</label>
              <textarea id="description" name="description" rows={2} className="mt-1 w-full rounded border border-rail-line px-3 py-2 outline-none focus:border-rail-route" />
            </div>
            <button className="mt-4 inline-flex h-10 items-center gap-2 rounded border border-rail-line px-4 text-sm font-medium hover:bg-slate-100">
              <Plus className="h-4 w-4" /> Добави категория
            </button>
          </form>
        </section>

        <section className="space-y-5">
          <div className="overflow-hidden rounded border border-rail-line bg-white shadow-panel">
            <div className="border-b border-rail-line px-4 py-3">
              <h3 className="text-base font-semibold">Списък документи</h3>
              <p className="text-sm text-slate-600">Общо: {paginatedDocuments.totalItems}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[940px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Заглавие</th>
                    <th className="px-4 py-3">Категория</th>
                    <th className="px-4 py-3">Файл</th>
                    <th className="px-4 py-3">Бележки</th>
                    <th className="px-4 py-3 text-right">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rail-line">
                  {documentRows.length ? documentRows.map((document) => (
                    <tr key={document.id} className="align-top">
                      <td className="px-4 py-3 font-medium">{document.title}</td>
                      <td className="px-4 py-3">{document.categoryName ?? "-"}</td>
                      <td className="px-4 py-3">
                        {document.documentUrl ? (
                          <a href={document.documentUrl} target="_blank" className="inline-flex items-center gap-1 text-rail-route hover:underline">
                            <ExternalLink className="h-4 w-4" /> Отвори
                          </a>
                        ) : "-"}
                      </td>
                      <td className="max-w-xs px-4 py-3 text-slate-600">{document.notes || "-"}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <EditDialog>
                            <DocumentForm action={updateDocumentAction} title="Редакция" buttonLabel="Запази" document={document} categories={categoryRows} />
                          </EditDialog>
                          <form action={deleteDocumentAction}>
                            <input type="hidden" name="id" value={document.id} />
                            <ConfirmSubmit message="Да изтрия ли този документ?" className="inline-flex h-10 items-center gap-2 rounded border border-red-200 px-3 text-sm font-medium text-red-700 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" /> Изтрий
                            </ConfirmSubmit>
                          </form>
                        </div>
                      </td>
                    </tr>
                  )) : <tr><td colSpan={5} className="px-4 py-10 text-center text-slate-500">Няма документи.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination pathname="/documents" params={{ q: rawQ, categoryId }} {...paginatedDocuments} />

          <div className="rounded border border-rail-line bg-white shadow-panel">
            <div className="border-b border-rail-line px-4 py-3">
              <h3 className="text-base font-semibold">Категории</h3>
            </div>
            <div className="divide-y divide-rail-line">
              {categoryRows.length ? categoryRows.map((category) => (
                <div key={category.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                  <div>
                    <p className="font-medium">{category.name}</p>
                    {category.description ? <p className="text-slate-600">{category.description}</p> : null}
                  </div>
                  <form action={deleteDocumentCategoryAction}>
                    <input type="hidden" name="id" value={category.id} />
                    <ConfirmSubmit message="Да изтрия ли тази категория?" className="inline-flex h-9 items-center gap-2 rounded border border-red-200 px-3 text-sm font-medium text-red-700 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" /> Изтрий
                    </ConfirmSubmit>
                  </form>
                </div>
              )) : <p className="p-4 text-sm text-slate-500">Няма категории.</p>}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function DocumentForm({
  action,
  title,
  buttonLabel,
  document,
  categories
}: {
  action: (formData: FormData) => Promise<void>;
  title: string;
  buttonLabel: string;
  document?: {
    id: string;
    title: string;
    categoryId: string | null;
    documentUrl: string | null;
    notes: string | null;
  };
  categories: Array<typeof documentCategories.$inferSelect>;
}) {
  return (
    <form action={action} className="rounded border border-rail-line bg-white p-4 shadow-panel">
      <h3 className="text-base font-semibold">{title}</h3>
      {document ? <input type="hidden" name="id" value={document.id} /> : null}
      <div className="mt-4 grid gap-3">
        <Field name="title" label="Заглавие" defaultValue={document?.title} />
        <div>
          <label className="block text-sm font-medium" htmlFor="categoryId">Категория</label>
          <select id="categoryId" name="categoryId" defaultValue={document?.categoryId ?? ""} className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route">
            <option value="">Без категория</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </div>
        <Field name="documentUrl" label="Външен URL" defaultValue={document?.documentUrl ?? ""} />
        <div>
          <label className="block text-sm font-medium" htmlFor="file">Файл</label>
          <input id="file" name="file" type="file" className="mt-1 block w-full rounded border border-rail-line px-3 py-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-rail-ink file:px-3 file:py-2 file:text-sm file:font-medium file:text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="notes">Бележки</label>
          <textarea id="notes" name="notes" rows={3} defaultValue={document?.notes ?? ""} className="mt-1 w-full rounded border border-rail-line px-3 py-2 outline-none focus:border-rail-route" />
        </div>
      </div>
      <button className="mt-4 inline-flex h-10 items-center gap-2 rounded bg-rail-ink px-4 text-sm font-medium text-white hover:bg-slate-700">
        {document ? <Save className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
        {buttonLabel}
      </button>
    </form>
  );
}

function Field({ name, label, defaultValue = "" }: { name: string; label: string; defaultValue?: string | null }) {
  return (
    <div>
      <label className="block text-sm font-medium" htmlFor={name}>{label}</label>
      <input id={name} name={name} defaultValue={defaultValue ?? ""} className="mt-1 h-10 w-full rounded border border-rail-line px-3 outline-none focus:border-rail-route" />
    </div>
  );
}
