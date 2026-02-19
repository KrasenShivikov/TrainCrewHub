import { showToast } from '../../../components/toast/toast.js';
import { closeModal, openModal, setupModalEscapeHandler } from './helpers.js';
import { documentsState } from './state.js';
import {
  renderDocumentCategoriesTable,
  renderDocumentCategoryOptions,
  renderDocumentsTable
} from './table.js';
import { populateCategoryForm, populateDocumentForm, resetCategoryForm, resetDocumentForm } from './documentsForms.js';
import { deleteCategory, deleteDocument, saveCategory, saveDocument } from './documentsData.js';
import { closeDocumentPreview, openDocumentPreview } from './documentsPreview.js';

export function attachDocumentsHandlers(container) {
  const createCategoryButton = container.querySelector('#open-create-document-category');
  const createDocumentButton = container.querySelector('#open-create-document');
  const categoryModal = container.querySelector('#document-category-modal');
  const documentModal = container.querySelector('#document-modal');
  const categoryDeleteModal = container.querySelector('#document-category-delete-modal');
  const documentDeleteModal = container.querySelector('#document-delete-modal');
  const documentPreviewModal = container.querySelector('#document-preview-modal');

  const categoryForm = container.querySelector('#document-category-form');
  const documentForm = container.querySelector('#document-form');
  const categoriesMenu = container.querySelector('#document-categories-menu');
  const documentsBody = container.querySelector('#documents-cards-wrap');
  const searchInput = container.querySelector('#documents-search');

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

  categoriesMenu?.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button[data-category-action]');
    if (actionButton) {
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

      return;
    }

    const selectTarget = event.target.closest('[data-category-select="true"]');
    if (!selectTarget) {
      return;
    }

    documentsState.categoryFilter = selectTarget.getAttribute('data-id') || '';
    documentsState.page = 1;
    renderDocumentsTable(container);
    renderDocumentCategoriesTable(container);
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

  setupModalEscapeHandler('documents-page', [
    documentPreviewModal,
    documentDeleteModal,
    categoryDeleteModal,
    documentModal,
    categoryModal
  ]);
}
