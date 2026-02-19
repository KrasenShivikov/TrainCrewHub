import { showToast } from '../../../components/toast/toast.js';
import { closeModal, escapeHtml, openModal } from './helpers.js';

export function openDutyAttachmentPreview(container, url, label) {
  const previewModal = container.querySelector('#duty-attachment-preview-modal');
  const frame = container.querySelector('#duty-attachment-preview-frame');
  const textWrap = container.querySelector('#duty-attachment-preview-text-wrap');
  const textPreview = container.querySelector('#duty-attachment-preview-text');
  const csvWrap = container.querySelector('#duty-attachment-preview-csv-wrap');
  const csvNote = container.querySelector('#duty-attachment-preview-csv-note');
  const csvHead = container.querySelector('#duty-attachment-preview-csv-head');
  const csvBody = container.querySelector('#duty-attachment-preview-csv-body');
  const title = container.querySelector('#duty-attachment-preview-title');
  const fallback = container.querySelector('#duty-attachment-preview-fallback');
  const directOpenLink = container.querySelector('#duty-attachment-preview-open');
  if (!previewModal || !frame || !textWrap || !textPreview || !csvWrap || !csvNote || !csvHead || !csvBody || !title || !fallback || !directOpenLink) {
    return;
  }

  const safeUrl = String(url || '').trim();
  if (!safeUrl) {
    showToast('Липсва линк за преглед.', 'warning');
    return;
  }

  const previewUrl = resolveAttachmentPreviewUrl(safeUrl);
  const extension = getFileExtensionFromUrl(safeUrl);
  const isCsvPreview = extension === 'csv';
  const isTextPreview = ['txt', 'csv', 'json'].includes(extension);

  title.textContent = label ? `Преглед: ${label}` : 'Преглед на файл';
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
    void loadAttachmentCsvPreview(safeUrl, csvHead, csvBody, csvNote, fallback);
  } else if (isTextPreview) {
    textWrap.classList.remove('d-none');
    frame.classList.add('d-none');
    textPreview.textContent = 'Зареждане...';
    void loadAttachmentTextPreview(safeUrl, textPreview, fallback);
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

export function closeDutyAttachmentPreview(container) {
  const previewModal = container.querySelector('#duty-attachment-preview-modal');
  const frame = container.querySelector('#duty-attachment-preview-frame');
  const textWrap = container.querySelector('#duty-attachment-preview-text-wrap');
  const textPreview = container.querySelector('#duty-attachment-preview-text');
  const csvWrap = container.querySelector('#duty-attachment-preview-csv-wrap');
  const csvNote = container.querySelector('#duty-attachment-preview-csv-note');
  const csvHead = container.querySelector('#duty-attachment-preview-csv-head');
  const csvBody = container.querySelector('#duty-attachment-preview-csv-body');
  const fallback = container.querySelector('#duty-attachment-preview-fallback');
  const directOpenLink = container.querySelector('#duty-attachment-preview-open');
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

async function loadAttachmentCsvPreview(url, csvHeadElement, csvBodyElement, csvNoteElement, fallbackElement) {
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();
    const rows = parseAttachmentCsvRows(text);
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
      <tr>${headerCells.map((cell) => `<th>${escapeHtml(cell)}</th>`).join('')}</tr>
    `;
    csvBodyElement.innerHTML = bodyRows
      .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`)
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

function parseAttachmentCsvRows(text) {
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

async function loadAttachmentTextPreview(url, targetElement, fallbackElement) {
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

function resolveAttachmentPreviewUrl(url) {
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
