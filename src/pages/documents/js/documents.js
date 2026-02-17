import pageHtml from '../documents.html?raw';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { closeModal, openModal, setupModalEscapeHandler } from './helpers.js';
import { documentsState } from './state.js';
import {
  loadDocumentCategories,
  loadDocuments,
  renderDocumentCategoriesTable,
  renderDocumentCategoryOptions,
  renderDocumentsTable
} from './table.js';

const DOCUMENTS_BUCKET = 'documents-files';

export async function renderDocumentsPage(container) {
  container.innerHTML = pageHtml;
  attachDocumentsHandlers(container);
  await refreshDocumentsData(container);
}

async function refreshDocumentsData(container) {
  await loadDocumentCategories(container);
  await loadDocuments(container);
}

function attachDocumentsHandlers(container) {
  const createCategoryButton = container.querySelector('#open-create-document-category');
  const createDocumentButton = container.querySelector('#open-create-document');
  const categoryModal = container.querySelector('#document-category-modal');
  const documentModal = container.querySelector('#document-modal');
  const categoryDeleteModal = container.querySelector('#document-category-delete-modal');
  const documentDeleteModal = container.querySelector('#document-delete-modal');
  const documentPreviewModal = container.querySelector('#document-preview-modal');

  const categoryForm = container.querySelector('#document-category-form');
  const documentForm = container.querySelector('#document-form');
  const categoriesBody = container.querySelector('#document-categories-table-body');
  const documentsBody = container.querySelector('#documents-table-body');
  const searchInput = container.querySelector('#documents-search');
  const categoryFilterInput = container.querySelector('#documents-category-filter');

  createCategoryButton?.addEventListener('click', () => {
    resetCategoryForm(container);
    openModal(categoryModal);
  });

  createDocumentButton?.addEventListener('click', () => {
    if (!(documentsState.categories || []).length) {
      showToast('Добави първо категория.', 'warning');
      return;
    }

    resetDocumentForm(container);
    renderDocumentCategoryOptions(container);
    openModal(documentModal);
  });

  categoryForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveCategory(container);
  });

  documentForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveDocument(container);
  });

  container.querySelector('#document-category-modal-close')?.addEventListener('click', () => closeModal(categoryModal));
  container.querySelector('#document-category-cancel-btn')?.addEventListener('click', () => closeModal(categoryModal));
  container.querySelector('#document-modal-close')?.addEventListener('click', () => closeModal(documentModal));
  container.querySelector('#document-cancel-btn')?.addEventListener('click', () => closeModal(documentModal));
  container.querySelector('#document-category-delete-cancel')?.addEventListener('click', () => closeModal(categoryDeleteModal));
  container.querySelector('#document-delete-cancel')?.addEventListener('click', () => closeModal(documentDeleteModal));
  container.querySelector('#document-preview-close')?.addEventListener('click', () => closeDocumentPreview(container));

  container.querySelector('#document-category-delete-confirm')?.addEventListener('click', async () => {
    const categoryId = container.querySelector('#document-category-delete-id').value;
    await deleteCategory(container, categoryId);
  });

  container.querySelector('#document-delete-confirm')?.addEventListener('click', async () => {
    const documentId = container.querySelector('#document-delete-id').value;
    await deleteDocument(container, documentId);
  });

  categoriesBody?.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button[data-category-action]');
    if (!actionButton) {
      return;
    }

    const action = actionButton.getAttribute('data-category-action');
    if (action === 'edit') {
      populateCategoryForm(container, {
        id: actionButton.getAttribute('data-id'),
        name: actionButton.getAttribute('data-name')
      });
      openModal(categoryModal);
      return;
    }

    if (action === 'delete') {
      container.querySelector('#document-category-delete-id').value = actionButton.getAttribute('data-id') || '';
      openModal(categoryDeleteModal);
    }
  });

  documentsBody?.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button[data-document-action]');
    if (!actionButton) {
      return;
    }

    const action = actionButton.getAttribute('data-document-action');
    if (action === 'edit') {
      populateDocumentForm(container, {
        id: actionButton.getAttribute('data-id'),
        title: actionButton.getAttribute('data-title'),
        categoryId: actionButton.getAttribute('data-category-id'),
        url: actionButton.getAttribute('data-url'),
        storagePath: actionButton.getAttribute('data-storage-path'),
        notes: actionButton.getAttribute('data-notes')
      });
      openModal(documentModal);
      return;
    }

    if (action === 'delete') {
      container.querySelector('#document-delete-id').value = actionButton.getAttribute('data-id') || '';
      openModal(documentDeleteModal);
      return;
    }

    if (action === 'preview') {
      const previewUrl = String(actionButton.getAttribute('data-url') || '').trim();
      const previewTitle = String(actionButton.getAttribute('data-title') || '').trim();
      openDocumentPreview(container, previewUrl, previewTitle);
    }
  });

  searchInput?.addEventListener('input', (event) => {
    documentsState.searchQuery = event.target.value.trim().toLowerCase();
    renderDocumentsTable(container);
  });

  categoryFilterInput?.addEventListener('change', (event) => {
    documentsState.categoryFilter = event.target.value || '';
    renderDocumentsTable(container);
  });

  setupModalEscapeHandler('documents-page', [
    documentPreviewModal,
    documentDeleteModal,
    categoryDeleteModal,
    documentModal,
    categoryModal
  ]);
}

async function saveCategory(container) {
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

async function saveDocument(container) {
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

async function deleteCategory(container, categoryId) {
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

async function deleteDocument(container, documentId) {
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

function populateCategoryForm(container, category) {
  container.querySelector('#document-category-id').value = category.id || '';
  container.querySelector('#document-category-name').value = category.name || '';
  container.querySelector('#document-category-form-title').textContent = 'Редакция на категория';
  container.querySelector('#document-category-save-btn').textContent = 'Запази';
}

function resetCategoryForm(container) {
  container.querySelector('#document-category-id').value = '';
  container.querySelector('#document-category-name').value = '';
  container.querySelector('#document-category-form-title').textContent = 'Нова категория';
  container.querySelector('#document-category-save-btn').textContent = 'Създай';
}

function populateDocumentForm(container, documentRow) {
  renderDocumentCategoryOptions(container);
  const fileInput = container.querySelector('#document-file');
  const fileHelp = container.querySelector('#document-file-help');
  const currentFileWrap = container.querySelector('#document-current-file-wrap');
  const currentFileLink = container.querySelector('#document-current-file-link');

  container.querySelector('#document-id').value = documentRow.id || '';
  container.querySelector('#document-title').value = documentRow.title || '';
  container.querySelector('#document-category').value = documentRow.categoryId || '';
  container.querySelector('#document-notes').value = documentRow.notes || '';

  if (fileInput) {
    fileInput.value = '';
    fileInput.required = false;
  }

  if (fileHelp) {
    fileHelp.textContent = 'По избор: качи нов файл, за да замениш текущия.';
  }

  if (currentFileWrap && currentFileLink && documentRow.url) {
    currentFileWrap.classList.remove('d-none');
    currentFileLink.setAttribute('href', documentRow.url);
    currentFileLink.dataset.storagePath = documentRow.storagePath || '';
  }

  container.querySelector('#document-form-title').textContent = 'Редакция на документ';
  container.querySelector('#document-save-btn').textContent = 'Запази';
}

function resetDocumentForm(container) {
  const fileInput = container.querySelector('#document-file');
  const fileHelp = container.querySelector('#document-file-help');
  const currentFileWrap = container.querySelector('#document-current-file-wrap');
  const currentFileLink = container.querySelector('#document-current-file-link');

  container.querySelector('#document-id').value = '';
  container.querySelector('#document-title').value = '';
  container.querySelector('#document-category').value = '';
  container.querySelector('#document-notes').value = '';

  if (fileInput) {
    fileInput.value = '';
    fileInput.required = true;
  }

  if (fileHelp) {
    fileHelp.textContent = 'Качи файл за документа.';
  }

  if (currentFileWrap) {
    currentFileWrap.classList.add('d-none');
  }

  if (currentFileLink) {
    currentFileLink.setAttribute('href', '#');
    currentFileLink.dataset.storagePath = '';
  }

  container.querySelector('#document-form-title').textContent = 'Нов документ';
  container.querySelector('#document-save-btn').textContent = 'Създай';
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

function openDocumentPreview(container, url, titleText) {
  const previewModal = container.querySelector('#document-preview-modal');
  const frame = container.querySelector('#document-preview-frame');
  const textWrap = container.querySelector('#document-preview-text-wrap');
  const textPreview = container.querySelector('#document-preview-text');
  const csvWrap = container.querySelector('#document-preview-csv-wrap');
  const csvNote = container.querySelector('#document-preview-csv-note');
  const csvHead = container.querySelector('#document-preview-csv-head');
  const csvBody = container.querySelector('#document-preview-csv-body');
  const title = container.querySelector('#document-preview-title');
  const fallback = container.querySelector('#document-preview-fallback');
  const directOpenLink = container.querySelector('#document-preview-open');
  if (!previewModal || !frame || !textWrap || !textPreview || !csvWrap || !csvNote || !csvHead || !csvBody || !title || !fallback || !directOpenLink) {
    return;
  }

  const safeUrl = String(url || '').trim();
  if (!safeUrl) {
    showToast('Липсва файл за преглед.', 'warning');
    return;
  }

  const previewUrl = resolveDocumentPreviewUrl(safeUrl);
  const extension = getFileExtensionFromUrl(safeUrl);
  const isCsvPreview = extension === 'csv';
  const isTextPreview = ['txt', 'csv', 'json'].includes(extension);

  title.textContent = titleText ? `Преглед: ${titleText}` : 'Преглед на документ';
  directOpenLink.setAttribute('href', safeUrl);
  fallback.classList.add('d-none');
  textWrap.classList.add('d-none');
  csvWrap.classList.add('d-none');
  csvNote.textContent = '';
  csvHead.innerHTML = '';
  csvBody.innerHTML = '';
  textPreview.textContent = '';
  frame.classList.remove('d-none');
  frame.src = 'about:blank';

  if (isCsvPreview) {
    csvWrap.classList.remove('d-none');
    frame.classList.add('d-none');
    void loadCsvPreview(safeUrl, csvHead, csvBody, csvNote, fallback);
  } else if (isTextPreview) {
    textWrap.classList.remove('d-none');
    frame.classList.add('d-none');
    textPreview.textContent = 'Зареждане...';
    void loadTextPreview(safeUrl, textPreview, fallback);
  } else {
    frame.src = previewUrl;
    frame.onload = () => {
      if (previewUrl !== safeUrl) {
        fallback.classList.add('d-none');
        return;
      }

      const currentExtension = getFileExtensionFromUrl(safeUrl);
      const likelyNonRenderable = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(currentExtension);
      fallback.classList.toggle('d-none', !likelyNonRenderable);
    };
    frame.onerror = () => {
      fallback.classList.remove('d-none');
    };
  }

  openModal(previewModal);
}

function closeDocumentPreview(container) {
  const previewModal = container.querySelector('#document-preview-modal');
  const frame = container.querySelector('#document-preview-frame');
  const textWrap = container.querySelector('#document-preview-text-wrap');
  const textPreview = container.querySelector('#document-preview-text');
  const csvWrap = container.querySelector('#document-preview-csv-wrap');
  const csvNote = container.querySelector('#document-preview-csv-note');
  const csvHead = container.querySelector('#document-preview-csv-head');
  const csvBody = container.querySelector('#document-preview-csv-body');
  const fallback = container.querySelector('#document-preview-fallback');
  const directOpenLink = container.querySelector('#document-preview-open');
  if (!previewModal || !frame || !textWrap || !textPreview || !csvWrap || !csvNote || !csvHead || !csvBody || !fallback || !directOpenLink) {
    return;
  }

  frame.src = 'about:blank';
  frame.classList.remove('d-none');
  textWrap.classList.add('d-none');
  csvWrap.classList.add('d-none');
  textPreview.textContent = '';
  csvNote.textContent = '';
  csvHead.innerHTML = '';
  csvBody.innerHTML = '';
  directOpenLink.setAttribute('href', '#');
  fallback.classList.add('d-none');
  closeModal(previewModal);
}

async function loadCsvPreview(url, csvHeadElement, csvBodyElement, csvNoteElement, fallbackElement) {
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();
    const rows = parseCsvRows(text);
    if (!rows.length) {
      csvHeadElement.innerHTML = '';
      csvBodyElement.innerHTML = '';
      csvNoteElement.textContent = 'Файлът е празен.';
      fallbackElement.classList.add('d-none');
      return;
    }

    const MAX_PREVIEW_ROWS = 200;
    const previewRows = rows.slice(0, MAX_PREVIEW_ROWS);
    const headerCells = previewRows[0] || [];
    const bodyRows = previewRows.slice(1);

    csvHeadElement.innerHTML = `
      <tr>${headerCells.map((cell) => `<th>${escapeCell(cell)}</th>`).join('')}</tr>
    `;
    csvBodyElement.innerHTML = bodyRows
      .map((row) => `<tr>${row.map((cell) => `<td>${escapeCell(cell)}</td>`).join('')}</tr>`)
      .join('');

    if (rows.length > MAX_PREVIEW_ROWS) {
      csvNoteElement.textContent = `Показани са първите ${MAX_PREVIEW_ROWS} реда от общо ${rows.length}.`;
    } else {
      csvNoteElement.textContent = `Редове: ${rows.length}.`;
    }

    fallbackElement.classList.add('d-none');
  } catch {
    csvHeadElement.innerHTML = '';
    csvBodyElement.innerHTML = '';
    csvNoteElement.textContent = '';
    fallbackElement.classList.remove('d-none');
  }
}

function parseCsvRows(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === ',') {
      row.push(cell);
      cell = '';
      continue;
    }

    if (!inQuotes && (char === '\n' || char === '\r')) {
      if (char === '\r' && next === '\n') {
        i += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      continue;
    }

    cell += char;
  }

  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

async function loadTextPreview(url, targetElement, fallbackElement) {
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();
    targetElement.textContent = text || '(Празен файл)';
    fallbackElement.classList.add('d-none');
  } catch {
    targetElement.textContent = 'Неуспешно зареждане на текстов преглед.';
    fallbackElement.classList.remove('d-none');
  }
}

function resolveDocumentPreviewUrl(url) {
  const extension = getFileExtensionFromUrl(url);
  if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension)) {
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
  }

  return url;
}

function getFileExtensionFromUrl(url) {
  const value = String(url || '').trim();
  if (!value) {
    return '';
  }

  try {
    const parsedUrl = new URL(value);
    const filename = parsedUrl.pathname.split('/').pop() || '';
    const extension = filename.includes('.') ? filename.split('.').pop() : '';
    return String(extension || '').toLowerCase();
  } catch {
    return '';
  }
}

function escapeCell(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
