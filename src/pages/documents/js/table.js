import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml } from './helpers.js';
import { documentsState } from './state.js';

export async function loadDocumentCategories(container) {
  const { data, error } = await supabase
    .from('document_categories')
    .select('id, name')
    .order('name', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    documentsState.categories = [];
    renderDocumentCategoriesTable(container, 'Грешка при зареждане на категориите.');
    return;
  }

  documentsState.categories = data || [];
  renderDocumentCategoriesTable(container);
  renderDocumentCategoryOptions(container);
}

export async function loadDocuments(container) {
  const { data, error } = await supabase
    .from('documents')
    .select('id, title, document_url, storage_path, notes, category_id, document_categories(name)')
    .order('title', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    documentsState.documents = [];
    renderDocumentsTable(container, 'Грешка при зареждане на документите.');
    return;
  }

  documentsState.documents = data || [];
  renderDocumentsTable(container);
}

export function renderDocumentCategoryOptions(container) {
  const filterSelect = container.querySelector('#documents-category-filter');
  const formSelect = container.querySelector('#document-category');

  const options = (documentsState.categories || [])
    .map((item) => `<option value="${item.id}">${escapeHtml(item.name || '-')}</option>`)
    .join('');

  if (filterSelect) {
    filterSelect.innerHTML = '<option value="">Всички</option>' + options;
    filterSelect.value = documentsState.categoryFilter || '';
  }

  if (formSelect) {
    formSelect.innerHTML = '<option value="">Избери категория</option>' + options;
  }
}

export function renderDocumentCategoriesTable(container, explicitEmptyMessage) {
  const tableBody = container.querySelector('#document-categories-table-body');
  const emptyState = container.querySelector('#document-categories-empty');

  const rows = documentsState.categories || [];
  if (!rows.length) {
    tableBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма въведени категории.';
    return;
  }

  emptyState.classList.add('d-none');
  tableBody.innerHTML = rows
    .map((item) => `
      <tr>
        <td>${escapeHtml(item.name || '-')}</td>
        <td class="text-end">
          <div class="d-inline-flex gap-2">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary"
              data-category-action="edit"
              data-id="${item.id}"
              data-name="${escapeHtml(item.name || '')}"
            >
              Редакция
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger"
              data-category-action="delete"
              data-id="${item.id}"
            >
              Изтрий
            </button>
          </div>
        </td>
      </tr>
    `)
    .join('');
}

export function renderDocumentsTable(container, explicitEmptyMessage) {
  const tableBody = container.querySelector('#documents-table-body');
  const emptyState = container.querySelector('#documents-empty');

  const filteredRows = (documentsState.documents || []).filter((item) => {
    const matchesSearch =
      !documentsState.searchQuery ||
      String(item?.title || '').toLowerCase().includes(documentsState.searchQuery);

    const matchesCategory =
      !documentsState.categoryFilter ||
      String(item?.category_id || '') === String(documentsState.categoryFilter || '');

    return matchesSearch && matchesCategory;
  });

  if (!filteredRows.length) {
    tableBody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма въведени документи.';
    return;
  }

  emptyState.classList.add('d-none');
  tableBody.innerHTML = filteredRows
    .map((item) => `
      <tr>
        <td>${escapeHtml(item.title || '-')}</td>
        <td>${escapeHtml(item.document_categories?.name || '-')}</td>
        <td>
          <div class="d-inline-flex gap-2 align-items-center">
            <button
              type="button"
              class="btn btn-link btn-sm p-0 lh-1 text-decoration-none"
              data-document-action="preview"
              data-title="${escapeHtml(item.title || '')}"
              data-url="${escapeHtml(item.document_url || '')}"
              title="Преглед"
              aria-label="Преглед"
            >
              👁
            </button>
            <a href="${escapeHtml(item.document_url || '#')}" target="_blank" rel="noopener noreferrer">Отвори</a>
          </div>
        </td>
        <td class="text-end">
          <div class="d-inline-flex gap-2">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary"
              data-document-action="edit"
              data-id="${item.id}"
              data-title="${escapeHtml(item.title || '')}"
              data-category-id="${item.category_id || ''}"
              data-url="${escapeHtml(item.document_url || '')}"
              data-storage-path="${escapeHtml(item.storage_path || '')}"
              data-notes="${escapeHtml(item.notes || '')}"
            >
              Редакция
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger"
              data-document-action="delete"
              data-id="${item.id}"
            >
              Изтрий
            </button>
          </div>
        </td>
      </tr>
    `)
    .join('');
}
