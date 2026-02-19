import pageHtml from '../trains.html?raw';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { closeModal, openModal, setupModalEscapeHandler, toTimeInputValue } from './helpers.js';
import { trainsState } from './state.js';
import { loadTrains, renderTrainsTable } from './table.js';

const TRAIN_TIMETABLES_BUCKET = 'train-timetables';
const MAX_TRAIN_TIMETABLE_ITEMS = 5;

export async function renderTrainsPage(container) {
  container.innerHTML = pageHtml;

  attachTrainsHandlers(container);
  await loadTrains(container);
}

function attachTrainsHandlers(container) {
  const createButton = container.querySelector('#open-create-train');
  const form = container.querySelector('#train-form');
  const cancelButton = container.querySelector('#train-cancel-btn');
  const tableBody = container.querySelector('#trains-table-body');
  const modal = container.querySelector('#train-modal');
  const deleteModal = container.querySelector('#train-delete-modal');
  const previewModal = container.querySelector('#train-timetable-preview-modal');
  const modalCloseButton = container.querySelector('#train-modal-close');
  const deleteConfirmButton = container.querySelector('#train-delete-confirm');
  const deleteCancelButton = container.querySelector('#train-delete-cancel');
  const previewCloseButton = container.querySelector('#train-timetable-preview-close');
  const searchInput = container.querySelector('#trains-search');
  const originFilterInput = container.querySelector('#trains-origin-filter');
  const destinationFilterInput = container.querySelector('#trains-destination-filter');
  const filterResetButton = container.querySelector('#trains-filter-reset');
  const timetableFileInput = container.querySelector('#train-timetable-file');
  const currentTimetableLinks = container.querySelector('#train-current-timetable-links');

  createButton?.addEventListener('click', () => {
    resetTrainForm(container);
    openModal(modal);
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveTrain(container);
  });

  cancelButton?.addEventListener('click', () => {
    closeModal(modal);
  });

  modalCloseButton?.addEventListener('click', () => {
    closeModal(modal);
  });

  deleteCancelButton?.addEventListener('click', () => {
    closeModal(deleteModal);
  });

  previewCloseButton?.addEventListener('click', () => {
    closeTrainTimetablePreview(container);
  });

  searchInput?.addEventListener('input', (event) => {
    trainsState.searchQuery = event.target.value.trim().toLowerCase();
    renderTrainsTable(container);
  });

  originFilterInput?.addEventListener('change', (event) => {
    trainsState.originFilter = event.target.value || '';
    renderTrainsTable(container);
  });

  destinationFilterInput?.addEventListener('change', (event) => {
    trainsState.destinationFilter = event.target.value || '';
    renderTrainsTable(container);
  });

  filterResetButton?.addEventListener('click', () => {
    trainsState.searchQuery = '';
    trainsState.originFilter = '';
    trainsState.destinationFilter = '';

    if (searchInput) searchInput.value = '';
    if (originFilterInput) originFilterInput.value = '';
    if (destinationFilterInput) destinationFilterInput.value = '';

    renderTrainsTable(container);
  });

  timetableFileInput?.addEventListener('change', () => {
    if (timetableFileInput.files?.length) {
      if (timetableFileInput.files.length > MAX_TRAIN_TIMETABLE_ITEMS) {
        showToast(`Може да избереш до ${MAX_TRAIN_TIMETABLE_ITEMS} файла наведнъж.`, 'warning');
        timetableFileInput.value = '';
        return;
      }

    }
  });

  currentTimetableLinks?.addEventListener('input', (event) => {
    const input = event.target.closest('.train-existing-timetable-label');
    if (!input) {
      return;
    }

    const index = Number(input.getAttribute('data-index'));
    if (!Number.isInteger(index) || index < 0) {
      return;
    }

    const draftInput = container.querySelector('#train-draft-timetable-url');
    const entries = parseTimetableEntries(draftInput?.value || '');
    if (!entries[index]) {
      return;
    }

    entries[index].label = input.value;
    if (draftInput) {
      draftInput.value = serializeTimetableEntries(entries) || '';
    }
  });

  currentTimetableLinks?.addEventListener('click', (event) => {
    const previewButton = event.target.closest('.train-existing-timetable-preview');
    if (previewButton) {
      const previewUrl = String(previewButton.getAttribute('data-url') || '').trim();
      const previewLabel = String(previewButton.getAttribute('data-label') || '').trim();
      openTrainTimetablePreview(container, previewUrl, previewLabel);
      return;
    }

    const removeButton = event.target.closest('.train-existing-timetable-remove');
    if (!removeButton) {
      return;
    }

    const index = Number(removeButton.getAttribute('data-index'));
    if (!Number.isInteger(index) || index < 0) {
      return;
    }

    const draftInput = container.querySelector('#train-draft-timetable-url');
    const entries = parseTimetableEntries(draftInput?.value || '');
    if (!entries[index]) {
      return;
    }

    entries.splice(index, 1);
    updateCurrentTimetablePreview(container, entries);
  });

  setupModalEscapeHandler('trains', [
    previewModal,
    deleteModal,
    modal
  ]);

  deleteConfirmButton?.addEventListener('click', async () => {
    const id = container.querySelector('#train-delete-id').value;
    await deleteTrain(id, container);
  });

  tableBody?.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button[data-action]');
    if (!actionButton) {
      return;
    }

    const action = actionButton.getAttribute('data-action');
    if (action === 'edit') {
      populateTrainForm(container, {
        id: actionButton.getAttribute('data-id'),
        number: actionButton.getAttribute('data-number'),
        originStation: actionButton.getAttribute('data-origin-station'),
        destinationStation: actionButton.getAttribute('data-destination-station'),
        departureTime: actionButton.getAttribute('data-departure-time'),
        arrivalTime: actionButton.getAttribute('data-arrival-time'),
        timetableUrl: decodeURIComponent(actionButton.getAttribute('data-timetable-url') || '')
      });
      openModal(modal);
      return;
    }

    if (action === 'delete') {
      const id = actionButton.getAttribute('data-id');
      container.querySelector('#train-delete-id').value = id;
      openModal(deleteModal);
      return;
    }

    if (action === 'preview-timetable') {
      const previewUrl = decodeURIComponent(actionButton.getAttribute('data-preview-url') || '');
      const previewLabel = decodeURIComponent(actionButton.getAttribute('data-preview-label') || '');
      openTrainTimetablePreview(container, previewUrl, previewLabel);
    }
  });
}

async function saveTrain(container) {
  const idInput = container.querySelector('#train-id');
  const numberInput = container.querySelector('#train-number');
  const originStationInput = container.querySelector('#train-origin-station');
  const destinationStationInput = container.querySelector('#train-destination-station');
  const departureTimeInput = container.querySelector('#train-departure-time');
  const arrivalTimeInput = container.querySelector('#train-arrival-time');
  const timetableFileInput = container.querySelector('#train-timetable-file');
  const existingTimetableUrlInput = container.querySelector('#train-existing-timetable-url');
  const draftTimetableUrlInput = container.querySelector('#train-draft-timetable-url');
  const saveButton = container.querySelector('#train-save-btn');

  const number = numberInput.value.trim();
  const originStation = originStationInput.value.trim();
  const destinationStation = destinationStationInput.value.trim();
  const departureTime = departureTimeInput.value;
  const arrivalTime = arrivalTimeInput.value;
  const previousEntries = parseTimetableEntries(existingTimetableUrlInput.value);
  const draftEntries = parseTimetableEntries(draftTimetableUrlInput.value);
  const timetableFiles = Array.from(timetableFileInput?.files || []);
  const editingId = idInput.value;

  if (!number || !originStation || !destinationStation || !departureTime || !arrivalTime) {
    showToast('Моля, попълни всички задължителни полета.', 'warning');
    return;
  }

  const originalText = saveButton.innerHTML;
  saveButton.disabled = true;
  saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';

  const recordId = editingId || crypto.randomUUID();
  const nextEntries = dedupeTimetableEntries(draftEntries);
  const uploadedObjectPaths = [];

  const projectedTotalItems = nextEntries.length + timetableFiles.length;
  if (projectedTotalItems > MAX_TRAIN_TIMETABLE_ITEMS) {
    saveButton.disabled = false;
    saveButton.innerHTML = originalText;
    showToast(`Максимум ${MAX_TRAIN_TIMETABLE_ITEMS} файла/линка за един влак.`, 'warning');
    return;
  }

  if (timetableFiles.length) {
    const uploadedEntries = await uploadTrainTimetables(timetableFiles, recordId);
    if (!uploadedEntries) {
      saveButton.disabled = false;
      saveButton.innerHTML = originalText;
      return;
    }

    uploadedEntries.forEach((entry) => {
      if (entry?.url) {
        nextEntries.push({
          url: entry.url,
          label: entry.label || deriveTimetableLabel(entry.url, nextEntries.length)
        });
      }

      if (entry?.objectPath) {
        uploadedObjectPaths.push(entry.objectPath);
      }
    });
  }

  const finalEntries = dedupeTimetableEntries(nextEntries);

  const payload = {
    number,
    origin_station: originStation,
    destination_station: destinationStation,
    departure_time: departureTime,
    arrival_time: arrivalTime,
    timetable_url: serializeTimetableEntries(finalEntries)
  };

  let error;

  if (editingId) {
    ({ error } = await supabase.from('trains').update(payload).eq('id', editingId));
  } else {
    const { data: userData } = await supabase.auth.getUser();
    const createdFrom = userData?.user?.email ?? 'web_app';
    ({ error } = await supabase.from('trains').insert({ ...payload, id: recordId, created_from: createdFrom }));
  }

  saveButton.disabled = false;
  saveButton.innerHTML = originalText;

  if (error) {
    if (uploadedObjectPaths.length) {
      await removeTrainTimetableObjects(uploadedObjectPaths);
    }
    showToast(error.message, 'error');
    return;
  }

  if (editingId) {
    const previousObjectPaths = previousEntries
      .map((entry) => extractTrainTimetableObjectPath(entry.url))
      .filter(Boolean);
    const currentObjectPaths = finalEntries
      .map((entry) => extractTrainTimetableObjectPath(entry.url))
      .filter(Boolean);

    const currentSet = new Set(currentObjectPaths);
    const obsoletePaths = previousObjectPaths.filter((path) => !currentSet.has(path));
    if (obsoletePaths.length) {
      await removeTrainTimetableObjects(obsoletePaths);
    }
  }

  showToast(editingId ? 'Влакът е обновен.' : 'Влакът е създаден.', 'success');
  closeModal(container.querySelector('#train-modal'));
  resetTrainForm(container);
  await loadTrains(container);
}

function populateTrainForm(container, train) {
  const entries = parseTimetableEntries(train.timetableUrl);

  container.querySelector('#train-id').value = train.id;
  container.querySelector('#train-existing-timetable-url').value = serializeTimetableEntries(entries) || '';
  container.querySelector('#train-draft-timetable-url').value = serializeTimetableEntries(entries) || '';
  container.querySelector('#train-number').value = train.number ?? '';
  container.querySelector('#train-origin-station').value = train.originStation ?? '';
  container.querySelector('#train-destination-station').value = train.destinationStation ?? '';
  container.querySelector('#train-departure-time').value = toTimeInputValue(train.departureTime);
  container.querySelector('#train-arrival-time').value = toTimeInputValue(train.arrivalTime);
  container.querySelector('#train-timetable-file').value = '';
  updateCurrentTimetablePreview(container, entries);

  container.querySelector('#train-form-title').textContent = 'Редакция на влак';
  container.querySelector('#train-save-btn').textContent = 'Запази';
}

function resetTrainForm(container) {
  container.querySelector('#train-id').value = '';
  container.querySelector('#train-existing-timetable-url').value = '';
  container.querySelector('#train-draft-timetable-url').value = '';
  container.querySelector('#train-number').value = '';
  container.querySelector('#train-origin-station').value = '';
  container.querySelector('#train-destination-station').value = '';
  container.querySelector('#train-departure-time').value = '';
  container.querySelector('#train-arrival-time').value = '';
  container.querySelector('#train-timetable-file').value = '';
  updateCurrentTimetablePreview(container, []);

  container.querySelector('#train-form-title').textContent = 'Нов влак';
  container.querySelector('#train-save-btn').textContent = 'Създай';
}

async function uploadTrainTimetables(files, trainId) {
  if (!Array.isArray(files) || !files.length || !trainId) {
    return [];
  }

  const uploaded = [];

  for (const file of files) {
    const extension = (file.name?.split('.').pop() || 'pdf').toLowerCase();
    const safeExtension = extension.replace(/[^a-z0-9]/g, '') || 'pdf';
    const randomSuffix = Math.random().toString(36).slice(2, 10);
    const filePath = `${trainId}/${Date.now()}-${randomSuffix}.${safeExtension}`;

    const { error } = await supabase.storage
      .from(TRAIN_TIMETABLES_BUCKET)
      .upload(filePath, file, { upsert: true, contentType: file.type || undefined });

    if (error) {
      if (uploaded.length) {
        await removeTrainTimetableObjects(uploaded.map((item) => item.objectPath));
      }
      showToast(error.message, 'error');
      return null;
    }

    const { data } = supabase.storage.from(TRAIN_TIMETABLES_BUCKET).getPublicUrl(filePath);
    if (!data?.publicUrl) {
      await removeTrainTimetableObjects([filePath, ...uploaded.map((item) => item.objectPath)]);
      showToast('Файлът е качен, но не успях да генерирам публичен линк.', 'error');
      return null;
    }

    uploaded.push({
      url: data.publicUrl,
      label: file.name || '',
      objectPath: filePath
    });
  }

  return uploaded;
}

function extractTrainTimetableObjectPath(value) {
  const raw = String(value || '').trim();
  if (!raw) {
    return '';
  }

  if (!/^https?:\/\//i.test(raw)) {
    const normalized = raw.replace(/^\/+/, '');
    const bucketPrefix = `${TRAIN_TIMETABLES_BUCKET}/`;
    return normalized.startsWith(bucketPrefix) ? normalized.slice(bucketPrefix.length) : '';
  }

  try {
    const url = new URL(raw);
    const marker = `/storage/v1/object/public/${TRAIN_TIMETABLES_BUCKET}/`;
    const index = url.pathname.indexOf(marker);
    if (index === -1) {
      return '';
    }

    return decodeURIComponent(url.pathname.slice(index + marker.length));
  } catch {
    return '';
  }
}

async function removeTrainTimetableObjects(objectPaths) {
  const uniquePaths = Array.from(new Set((objectPaths || []).filter(Boolean)));
  if (!uniquePaths.length) {
    return;
  }

  await supabase.storage
    .from(TRAIN_TIMETABLES_BUCKET)
    .remove(uniquePaths);
}

async function deleteTrain(id, container) {
  const deleteButton = container.querySelector('#train-delete-confirm');
  const originalDeleteText = deleteButton.innerHTML;
  deleteButton.disabled = true;
  deleteButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';

  const { count, error: usageError } = await supabase
    .from('duty_trains')
    .select('duty_id', { count: 'exact', head: true })
    .eq('train_id', id);

  if (usageError) {
    deleteButton.disabled = false;
    deleteButton.innerHTML = originalDeleteText;
    showToast(usageError.message, 'error');
    return;
  }

  if ((count || 0) > 0) {
    deleteButton.disabled = false;
    deleteButton.innerHTML = originalDeleteText;
    showToast('Влакът не може да се изтрие, защото се използва в повески.', 'warning');
    return;
  }

  const { data: trainRow, error: trainLoadError } = await supabase
    .from('trains')
    .select('timetable_url')
    .eq('id', id)
    .maybeSingle();

  if (trainLoadError) {
    deleteButton.disabled = false;
    deleteButton.innerHTML = originalDeleteText;
    showToast(trainLoadError.message, 'error');
    return;
  }

  const { error } = await supabase.from('trains').delete().eq('id', id);

  deleteButton.disabled = false;
  deleteButton.innerHTML = originalDeleteText;

  if (error) {
    if (error.code === '23503') {
      showToast('Влакът не може да се изтрие, защото се използва в повески.', 'warning');
      return;
    }

    showToast(error.message, 'error');
    return;
  }

  const storedEntries = parseTimetableEntries(trainRow?.timetable_url);
  const objectPaths = storedEntries
    .map((entry) => extractTrainTimetableObjectPath(entry.url))
    .filter(Boolean);
  if (objectPaths.length) {
    await removeTrainTimetableObjects(objectPaths);
  }

  showToast('Влакът е изтрит.', 'success');
  closeModal(container.querySelector('#train-delete-modal'));
  resetTrainForm(container);
  await loadTrains(container);
}

function updateCurrentTimetablePreview(container, entries) {
  const wrap = container.querySelector('#train-current-timetable-wrap');
  const linksContainer = container.querySelector('#train-current-timetable-links');
  const draftInput = container.querySelector('#train-draft-timetable-url');
  if (!wrap || !linksContainer || !draftInput) {
    return;
  }

  const normalized = dedupeTimetableEntries(entries);
  draftInput.value = serializeTimetableEntries(normalized) || '';

  if (!normalized.length) {
    wrap.classList.add('d-none');
    linksContainer.innerHTML = '';
    return;
  }

  wrap.classList.remove('d-none');
  linksContainer.innerHTML = normalized
    .map((entry, index) => {
      const label = entry.label || deriveTimetableLabel(entry.url, index);
      return `
        <div class="border rounded p-2 w-100">
          <div class="mb-2 d-flex align-items-center justify-content-between gap-2">
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <a href="${escapeHtml(entry.url)}" target="_blank" rel="noopener noreferrer">Отвори</a>
              <button
                type="button"
                class="btn btn-link btn-sm p-0 lh-1 text-decoration-none train-existing-timetable-preview"
                data-url="${escapeHtml(entry.url)}"
                data-label="${escapeHtml(label)}"
                title="Преглед"
                aria-label="Преглед"
              >
                👁
              </button>
            </div>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger train-existing-timetable-remove"
              data-index="${index}"
            >
              Премахни
            </button>
          </div>
          <input
            type="text"
            class="form-control form-control-sm train-existing-timetable-label"
            data-index="${index}"
            value="${escapeHtml(label)}"
            placeholder="Име на файла/линка"
          />
        </div>
      `;
    })
    .join('');
}

function parseTimetableEntries(value) {
  if (Array.isArray(value)) {
    return value
      .map((item, index) => normalizeTimetableEntry(item, index))
      .filter((entry) => entry.url);
  }

  const raw = String(value || '').trim();
  if (!raw) {
    return [];
  }

  if (raw.startsWith('[')) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed
          .map((item, index) => normalizeTimetableEntry(item, index))
          .filter((entry) => entry.url);
      }
    } catch {
      return [{ url: raw, label: deriveTimetableLabel(raw, 0) }];
    }
  }

  return raw
    .split('\n')
    .map((item, index) => normalizeTimetableEntry(item, index))
    .filter((entry) => entry.url);
}

function normalizeTimetableEntry(item, index) {
  if (item && typeof item === 'object' && !Array.isArray(item)) {
    const url = String(item.url || '').trim();
    const label = String(item.label || '').trim() || deriveTimetableLabel(url, index);
    return { url, label };
  }

  const url = String(item || '').trim();
  return {
    url,
    label: deriveTimetableLabel(url, index)
  };
}

function dedupeTimetableEntries(entries) {
  const seen = new Set();
  return (entries || [])
    .map((item, index) => normalizeTimetableEntry(item, index))
    .filter((entry) => {
      if (!entry.url) {
        return false;
      }

      if (seen.has(entry.url)) {
        return false;
      }

      seen.add(entry.url);
      return true;
    });
}

function serializeTimetableEntries(entries) {
  const normalized = dedupeTimetableEntries(entries);
  if (!normalized.length) {
    return null;
  }

  return JSON.stringify(normalized);
}

function deriveTimetableLabel(url, index) {
  const raw = String(url || '').trim();
  if (!raw) {
    return `Файл ${index + 1}`;
  }

  try {
    const parsedUrl = new URL(raw);
    const pathPart = parsedUrl.pathname.split('/').pop() || '';
    const decoded = decodeURIComponent(pathPart);
    if (decoded) {
      return decoded;
    }
  } catch {
    // ignore parsing errors
  }

  return `Файл ${index + 1}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function openTrainTimetablePreview(container, url, label) {
  const previewModal = container.querySelector('#train-timetable-preview-modal');
  const frame = container.querySelector('#train-timetable-preview-frame');
  const textWrap = container.querySelector('#train-timetable-preview-text-wrap');
  const textPreview = container.querySelector('#train-timetable-preview-text');
  const csvWrap = container.querySelector('#train-timetable-preview-csv-wrap');
  const csvNote = container.querySelector('#train-timetable-preview-csv-note');
  const csvHead = container.querySelector('#train-timetable-preview-csv-head');
  const csvBody = container.querySelector('#train-timetable-preview-csv-body');
  const title = container.querySelector('#train-timetable-preview-title');
  const fallback = container.querySelector('#train-timetable-preview-fallback');
  const directOpenLink = container.querySelector('#train-timetable-preview-open');
  if (!previewModal || !frame || !textWrap || !textPreview || !csvWrap || !csvNote || !csvHead || !csvBody || !title || !fallback || !directOpenLink) {
    return;
  }

  const safeUrl = String(url || '').trim();
  if (!safeUrl) {
    showToast('Липсва линк за преглед.', 'warning');
    return;
  }

  const previewUrl = resolveTimetablePreviewUrl(safeUrl);
  const extension = getFileExtensionFromUrl(safeUrl);
  const isCsvPreview = extension === 'csv';
  const isTextPreview = ['txt', 'csv', 'json'].includes(extension);

  title.textContent = label ? `Преглед: ${label}` : 'Преглед на разписание';
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

function closeTrainTimetablePreview(container) {
  const previewModal = container.querySelector('#train-timetable-preview-modal');
  const frame = container.querySelector('#train-timetable-preview-frame');
  const textWrap = container.querySelector('#train-timetable-preview-text-wrap');
  const textPreview = container.querySelector('#train-timetable-preview-text');
  const csvWrap = container.querySelector('#train-timetable-preview-csv-wrap');
  const csvNote = container.querySelector('#train-timetable-preview-csv-note');
  const csvHead = container.querySelector('#train-timetable-preview-csv-head');
  const csvBody = container.querySelector('#train-timetable-preview-csv-body');
  const fallback = container.querySelector('#train-timetable-preview-fallback');
  const directOpenLink = container.querySelector('#train-timetable-preview-open');
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

function resolveTimetablePreviewUrl(url) {
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
