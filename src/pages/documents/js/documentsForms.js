import { renderDocumentCategoryOptions } from './table.js';

export function populateCategoryForm(container, category) {
  container.querySelector('#document-category-id').value = category.id || '';
  container.querySelector('#document-category-name').value = category.name || '';
  container.querySelector('#document-category-form-title').textContent = 'Редакция на категория';
  container.querySelector('#document-category-save-btn').textContent = 'Запази';
}

export function resetCategoryForm(container) {
  container.querySelector('#document-category-id').value = '';
  container.querySelector('#document-category-name').value = '';
  container.querySelector('#document-category-form-title').textContent = 'Нова категория';
  container.querySelector('#document-category-save-btn').textContent = 'Създай';
}

export function populateDocumentForm(container, documentRow) {
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

export function resetDocumentForm(container) {
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
