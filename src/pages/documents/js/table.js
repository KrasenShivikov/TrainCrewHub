import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml } from './helpers.js';
import { documentsState } from './state.js';
import { bindPaginationButtons, paginateRows, syncPaginationUi } from '../../../utils/pagination.js';
import { initTooltips } from '../../../utils/tooltips.js';

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

function getDocumentCountPerCategory() {
  const counts = {};
  (documentsState.documents || []).forEach((doc) => {
    if (doc.category_id) {
      counts[String(doc.category_id)] = (counts[String(doc.category_id)] || 0) + 1;
    }
  });
  return counts;
}

function getFileIcon(url) {
  const ext = (url || '').split('?')[0].split('.').pop().toLowerCase();
  if (ext === 'pdf') return 'bi-file-earmark-pdf text-danger';
  if (['doc', 'docx'].includes(ext)) return 'bi-file-earmark-word text-primary';
  if (['xls', 'xlsx', 'csv'].includes(ext)) return 'bi-file-earmark-excel text-success';
  if (['ppt', 'pptx'].includes(ext)) return 'bi-file-earmark-ppt text-warning';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'bi-file-earmark-image text-info';
  if (['zip', 'rar', '7z'].includes(ext)) return 'bi-file-earmark-zip text-secondary';
  return 'bi-file-earmark-text text-secondary';
}

export function renderDocumentCategoriesTable(container, explicitEmptyMessage) {
  const menu = container.querySelector('#document-categories-menu');
  const emptyState = container.querySelector('#document-categories-empty');

  const rows = documentsState.categories || [];
  if (!rows.length) {
    if (menu) menu.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || 'Няма въведени категории.';
    return;
  }

  emptyState.classList.add('d-none');
  if (!menu) return;

  const activeCategoryId = String(documentsState.categoryFilter || '');
  const allActive = activeCategoryId === '';
  const counts = getDocumentCountPerCategory();
  const totalDocs = (documentsState.documents || []).length;

  menu.innerHTML = [
    `<div
        class="list-group-item list-group-item-action d-flex align-items-center gap-2 py-2 px-3 ${allActive ? 'active' : ''}"
        data-category-select="true" data-id="">
        <i class="bi bi-folder2-open ${allActive ? 'text-white' : 'text-primary'} me-1"></i>
        <span class="flex-grow-1 fw-semibold" style="font-size:0.9rem;">Всички</span>
        <span class="badge rounded-pill ${allActive ? 'bg-white text-primary' : 'bg-primary-subtle text-primary-emphasis'}">${totalDocs}</span>
      </div>`,
    ...rows.map((item) => {
      const isActive = String(item.id) === activeCategoryId;
      const count = counts[String(item.id)] || 0;
      return `<div
          class="list-group-item list-group-item-action d-flex align-items-center gap-2 py-2 px-3 ${isActive ? 'active' : ''}"
          data-category-select="true" data-id="${item.id}">
          <i class="bi bi-folder ${isActive ? 'text-white' : 'text-secondary'} me-1"></i>
          <span class="flex-grow-1" style="font-size:0.9rem;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(item.name || '-')}</span>
          <span class="badge rounded-pill ${isActive ? 'bg-white text-primary' : 'bg-secondary-subtle text-secondary-emphasis'} me-1">${count}</span>
          <button
            type="button"
            class="btn btn-sm p-0 lh-1 flex-shrink-0 ${isActive ? 'text-white border-0 opacity-75' : 'text-primary border-0'}"
            data-category-action="edit"
            data-id="${item.id}"
            data-name="${escapeHtml(item.name || '')}"
            data-bs-toggle="tooltip" data-bs-title="Редакция" aria-label="Редакция"
            style="background:transparent;width:1.6rem;height:1.6rem;"
          ><i class="bi bi-pencil" style="font-size:0.78rem;"></i></button>
          <button
            type="button"
            class="btn btn-sm p-0 lh-1 flex-shrink-0 ${isActive ? 'text-white border-0 opacity-75' : 'text-danger border-0'}"
            data-category-action="delete"
            data-id="${item.id}"
            data-bs-toggle="tooltip" data-bs-title="Изтрий" aria-label="Изтрий"
            style="background:transparent;width:1.6rem;height:1.6rem;"
          ><i class="bi bi-trash" style="font-size:0.78rem;"></i></button>
        </div>`;
    })
  ].join('');
  if (menu) initTooltips(menu);
}

export function renderDocumentsTable(container, explicitEmptyMessage) {
  const cardsWrap = container.querySelector('#documents-cards-wrap');
  const emptyState = container.querySelector('#documents-empty');

  bindPaginationButtons(container, {
    rootSelector: '#documents-pagination',
    prevSelector: '#documents-pagination-prev',
    nextSelector: '#documents-pagination-next',
    onPrev: () => {
      documentsState.page = Math.max(1, (documentsState.page || 1) - 1);
      renderDocumentsTable(container);
    },
    onNext: () => {
      documentsState.page = (documentsState.page || 1) + 1;
      renderDocumentsTable(container);
    }
  });

  const filteredRows = (documentsState.documents || []).filter((item) => {
    const matchesSearch =
      !documentsState.searchQuery ||
      String(item?.title || '').toLowerCase().includes(documentsState.searchQuery);

    const matchesCategory =
      !documentsState.categoryFilter ||
      String(item?.category_id || '') === String(documentsState.categoryFilter || '');

    return matchesSearch && matchesCategory;
  });

  const { pageItems, page, totalItems, totalPages } = paginateRows(
    filteredRows,
    documentsState.page,
    documentsState.pageSize
  );
  documentsState.page = page;

  syncPaginationUi(container, {
    rootSelector: '#documents-pagination',
    prevSelector: '#documents-pagination-prev',
    nextSelector: '#documents-pagination-next',
    labelSelector: '#documents-pagination-label',
    page,
    totalItems,
    totalPages
  });

  // Update panel title
  const activeCategoryId = documentsState.categoryFilter || '';
  const panelTitle = container.querySelector('#documents-panel-title');
  const panelSubtitle = container.querySelector('#documents-panel-subtitle');
  if (panelTitle) {
    if (activeCategoryId) {
      const cat = (documentsState.categories || []).find((c) => String(c.id) === String(activeCategoryId));
      panelTitle.textContent = cat ? cat.name : 'Документи';
    } else {
      panelTitle.textContent = 'Всички документи';
    }
  }
  if (panelSubtitle) {
    panelSubtitle.textContent = filteredRows.length
      ? `${filteredRows.length} ${filteredRows.length === 1 ? 'документ' : 'документа'}`
      : '';
  }

  if (!filteredRows.length) {
    if (cardsWrap) cardsWrap.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.textContent = explicitEmptyMessage || (documentsState.searchQuery ? 'Няма намерени документи.' : 'Няма въведени документи.');
    return;
  }

  emptyState.classList.add('d-none');
  if (!cardsWrap) return;

  cardsWrap.innerHTML = pageItems
    .map((item) => {
      const iconClass = getFileIcon(item.document_url || '');
      const catName = escapeHtml(item.document_categories?.name || '');
      const notes = escapeHtml((item.notes || '').slice(0, 160));
      return `
        <div class="col-12 col-md-6 col-xl-4">
          <div class="card border shadow-sm document-card h-100">
            <div class="card-body d-flex flex-column gap-2 py-3 px-3">
              <div class="d-flex align-items-start gap-3">
                <div class="flex-shrink-0 text-center pt-1" style="width:2.2rem;">
                  <i class="bi ${iconClass}" style="font-size:1.7rem;"></i>
                </div>
                <div class="flex-grow-1" style="min-width:0;">
                  <div class="fw-semibold lh-sm" style="font-size:0.95rem;word-break:break-word;">${escapeHtml(item.title || '-')}</div>
                  ${catName ? `<span class="badge bg-primary-subtle text-primary-emphasis mt-1" style="font-size:0.72rem;">${catName}</span>` : ''}
                  ${notes ? `<div class="text-secondary mt-1" style="font-size:0.8rem;line-height:1.4;word-break:break-word;">${notes}</div>` : ''}
                </div>
              </div>
              <div class="d-flex gap-2 justify-content-end mt-auto pt-1 border-top">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary"
                  data-document-action="preview"
                  data-title="${escapeHtml(item.title || '')}"
                  data-url="${escapeHtml(item.document_url || '')}"
                  data-bs-toggle="tooltip" data-bs-title="Преглед" aria-label="Преглед"
                ><i class="bi bi-eye"></i></button>
                <a
                  href="${escapeHtml(item.document_url || '#')}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-sm btn-outline-secondary"
                  data-bs-toggle="tooltip" data-bs-title="Отвори файла" aria-label="Отвори файла"
                ><i class="bi bi-box-arrow-up-right"></i></a>
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
                  data-bs-toggle="tooltip" data-bs-title="Редакция" aria-label="Редакция"
                ><i class="bi bi-pencil"></i></button>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger"
                  data-document-action="delete"
                  data-id="${item.id}"
                  data-bs-toggle="tooltip" data-bs-title="Изтрий" aria-label="Изтрий"
                ><i class="bi bi-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join('');
  if (cardsWrap) initTooltips(cardsWrap);
}
