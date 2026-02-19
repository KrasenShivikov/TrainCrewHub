import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { closeModal } from './helpers.js';
import {
  loadDocumentCategories,
  loadDocuments
} from './table.js';
import { resetCategoryForm, resetDocumentForm } from './documentsForms.js';

const DOCUMENTS_BUCKET = 'documents-files';

export async function refreshDocumentsData(container) {
  await loadDocumentCategories(container);
  await loadDocuments(container);
}

export async function saveCategory(container) {
  const id = container.querySelector('#document-category-id').value;
  const nameInput = container.querySelector('#document-category-name');
  const saveButton = container.querySelector('#document-category-save-btn');

  const name = nameInput.value.trim();
  if (!name) {
    showToast('Попълни име на категория.', 'warning');
    return;
  }

  const originalText = saveButton.innerHTML;
  saveButton.disabled = true;
  saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';

  let error = null;
  if (id) {
    ({ error } = await supabase
      .from('document_categories')
      .update({ name, updated_at: new Date().toISOString() })
      .eq('id', id));
  } else {
    const { data: userData } = await supabase.auth.getUser();
    const createdFrom = userData?.user?.id ?? userData?.user?.email ?? 'web_app';
    ({ error } = await supabase
      .from('document_categories')
      .insert({ name, created_from: createdFrom }));
  }

  saveButton.disabled = false;
  saveButton.innerHTML = originalText;

  if (error) {
    if (error.code === '23505') {
      showToast('Категория с това име вече съществува.', 'warning');
      return;
    }

    showToast(error.message, 'error');
    return;
  }

  closeModal(container.querySelector('#document-category-modal'));
  resetCategoryForm(container);
  await refreshDocumentsData(container);
  showToast(id ? 'Категорията е обновена.' : 'Категорията е създадена.', 'success');
}

export async function saveDocument(container) {
  const id = container.querySelector('#document-id').value;
  const title = container.querySelector('#document-title').value.trim();
  const categoryId = container.querySelector('#document-category').value || null;
  const existingUrl = container.querySelector('#document-current-file-link')?.getAttribute('href') || '';
  const existingStoragePath = container.querySelector('#document-current-file-link')?.dataset?.storagePath || '';
  const fileInput = container.querySelector('#document-file');
  const selectedFile = fileInput?.files?.[0] || null;
  const notes = container.querySelector('#document-notes').value.trim() || null;
  const saveButton = container.querySelector('#document-save-btn');

  if (!title || !categoryId) {
    showToast('Попълни всички задължителни полета.', 'warning');
    return;
  }

  if (!id && !selectedFile) {
    showToast('Качи файл за документа.', 'warning');
    return;
  }

  const originalText = saveButton.innerHTML;
  saveButton.disabled = true;
  saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';

  let error = null;
  let documentUrl = existingUrl;
  let storagePath = existingStoragePath;

  if (selectedFile) {
    const uploaded = await uploadDocumentFile(selectedFile);
    if (uploaded.error) {
      saveButton.disabled = false;
      saveButton.innerHTML = originalText;
      showToast(uploaded.error.message || 'Файлът не може да се качи.', 'error');
      return;
    }

    documentUrl = uploaded.publicUrl;
    storagePath = uploaded.path;
  }

  if (id) {
    ({ error } = await supabase
      .from('documents')
      .update({
        title,
        category_id: categoryId,
        document_url: documentUrl,
        storage_path: storagePath,
        notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id));
  } else {
    const { data: userData } = await supabase.auth.getUser();
    const createdFrom = userData?.user?.id ?? userData?.user?.email ?? 'web_app';
    ({ error } = await supabase
      .from('documents')
      .insert({
        title,
        category_id: categoryId,
        document_url: documentUrl,
        storage_path: storagePath,
        notes,
        created_from: createdFrom
      }));
  }

  saveButton.disabled = false;
  saveButton.innerHTML = originalText;

  if (error) {
    if (selectedFile && storagePath) {
      await supabase.storage.from(DOCUMENTS_BUCKET).remove([storagePath]);
    }
    showToast(error.message, 'error');
    return;
  }

  if (id && selectedFile && existingStoragePath && existingStoragePath !== storagePath) {
    await supabase.storage.from(DOCUMENTS_BUCKET).remove([existingStoragePath]);
  }

  closeModal(container.querySelector('#document-modal'));
  resetDocumentForm(container);
  await refreshDocumentsData(container);
  showToast(id ? 'Документът е обновен.' : 'Документът е създаден.', 'success');
}

export async function deleteCategory(container, categoryId) {
  const deleteButton = container.querySelector('#document-category-delete-confirm');
  const originalText = deleteButton.innerHTML;
  deleteButton.disabled = true;
  deleteButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';

  const { count, error: countError } = await supabase
    .from('documents')
    .select('id', { count: 'exact', head: true })
    .eq('category_id', categoryId);

  if (countError) {
    deleteButton.disabled = false;
    deleteButton.innerHTML = originalText;
    showToast(countError.message, 'error');
    return;
  }

  if ((count || 0) > 0) {
    deleteButton.disabled = false;
    deleteButton.innerHTML = originalText;
    showToast('Категорията не може да се изтрие, защото съдържа документи.', 'warning');
    return;
  }

  const { error } = await supabase.from('document_categories').delete().eq('id', categoryId);

  deleteButton.disabled = false;
  deleteButton.innerHTML = originalText;

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  closeModal(container.querySelector('#document-category-delete-modal'));
  await refreshDocumentsData(container);
  showToast('Категорията е изтрита.', 'success');
}

export async function deleteDocument(container, documentId) {
  const deleteButton = container.querySelector('#document-delete-confirm');
  const originalText = deleteButton.innerHTML;
  deleteButton.disabled = true;
  deleteButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';

  const { data: existingRow } = await supabase
    .from('documents')
    .select('storage_path')
    .eq('id', documentId)
    .maybeSingle();

  const { error } = await supabase.from('documents').delete().eq('id', documentId);

  deleteButton.disabled = false;
  deleteButton.innerHTML = originalText;

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  if (existingRow?.storage_path) {
    await supabase.storage.from(DOCUMENTS_BUCKET).remove([existingRow.storage_path]);
  }

  closeModal(container.querySelector('#document-delete-modal'));
  await refreshDocumentsData(container);
  showToast('Документът е изтрит.', 'success');
}

async function uploadDocumentFile(file) {
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData?.session?.user?.id || 'anonymous';
  const timestamp = Date.now();
  const fileName = String(file?.name || 'document').replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${userId}/${timestamp}_${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(DOCUMENTS_BUCKET)
    .upload(path, file, { upsert: false });

  if (uploadError) {
    return { error: uploadError };
  }

  const { data: publicData } = supabase.storage.from(DOCUMENTS_BUCKET).getPublicUrl(path);
  return {
    path,
    publicUrl: publicData?.publicUrl || '',
    error: null
  };
}
