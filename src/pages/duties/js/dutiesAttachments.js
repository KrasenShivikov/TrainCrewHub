import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { escapeHtml } from './helpers.js';
import { DUTY_FILES_BUCKET } from './dutiesConstants.js';

export function updateCurrentAttachmentsPreview(container, entries) {
  const wrap = container.querySelector('#duty-current-attachments-wrap');
  const linksContainer = container.querySelector('#duty-current-attachments-links');
  const draftInput = container.querySelector('#duty-draft-attachments');
  if (!wrap || !linksContainer || !draftInput) {
    return;
  }

  const normalized = dedupeAttachmentEntries(entries);
  draftInput.value = serializeAttachmentEntries(normalized) || '';

  if (!normalized.length) {
    wrap.classList.add('d-none');
    linksContainer.innerHTML = '';
    return;
  }

  wrap.classList.remove('d-none');
  linksContainer.innerHTML = normalized
    .map((entry, index) => {
      const label = entry.label || deriveAttachmentLabel(entry.url, index);
      return `
        <div class="border rounded p-2 w-100">
          <div class="mb-2 d-flex align-items-center justify-content-between gap-2">
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <a href="${escapeHtml(entry.url)}" target="_blank" rel="noopener noreferrer">Отвори</a>
              <button
                type="button"
                class="btn btn-link btn-sm p-0 lh-1 text-decoration-none duty-existing-attachment-preview"
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
              class="btn btn-sm btn-outline-danger duty-existing-attachment-remove"
              data-index="${index}"
            >
              Премахни
            </button>
          </div>
          <input
            type="text"
            class="form-control form-control-sm duty-existing-attachment-label"
            data-index="${index}"
            value="${escapeHtml(label)}"
            placeholder="Име на файла/линка"
          />
        </div>
      `;
    })
    .join('');
}

export function parseAttachmentEntries(value) {
  if (Array.isArray(value)) {
    return value
      .map((item, index) => normalizeAttachmentEntry(item, index))
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
          .map((item, index) => normalizeAttachmentEntry(item, index))
          .filter((entry) => entry.url);
      }
    } catch {
      return [{ url: raw, label: deriveAttachmentLabel(raw, 0) }];
    }
  }

  return raw
    .split('\n')
    .map((item, index) => normalizeAttachmentEntry(item, index))
    .filter((entry) => entry.url);
}

function normalizeAttachmentEntry(item, index) {
  if (item && typeof item === 'object' && !Array.isArray(item)) {
    const url = String(item.url || '').trim();
    const label = String(item.label || '').trim() || deriveAttachmentLabel(url, index);
    return { url, label };
  }

  const url = String(item || '').trim();
  return {
    url,
    label: deriveAttachmentLabel(url, index)
  };
}

export function serializeAttachmentEntries(entries) {
  const normalized = dedupeAttachmentEntries(entries);
  if (!normalized.length) {
    return '';
  }

  return JSON.stringify(normalized);
}

export function dedupeAttachmentEntries(entries) {
  const unique = [];
  const seen = new Set();

  for (const entry of entries || []) {
    const normalized = normalizeAttachmentEntry(entry, unique.length);
    if (!normalized.url) {
      continue;
    }

    const key = normalized.url.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    unique.push(normalized);
  }

  return unique;
}

export function deriveAttachmentLabel(url, index) {
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

export async function uploadDutyAttachments(files, dutyId) {
  if (!Array.isArray(files) || !files.length || !dutyId) {
    return [];
  }

  const uploaded = [];

  for (const file of files) {
    const extension = (file.name?.split('.').pop() || 'pdf').toLowerCase();
    const safeExtension = extension.replace(/[^a-z0-9]/g, '') || 'pdf';
    const randomSuffix = Math.random().toString(36).slice(2, 10);
    const filePath = `${dutyId}/${Date.now()}-${randomSuffix}.${safeExtension}`;

    const { error } = await supabase.storage
      .from(DUTY_FILES_BUCKET)
      .upload(filePath, file, { upsert: true, contentType: file.type || undefined });

    if (error) {
      if (uploaded.length) {
        await removeDutyAttachmentObjects(uploaded.map((item) => item.objectPath));
      }
      showToast(error.message, 'error');
      return null;
    }

    const { data } = supabase.storage.from(DUTY_FILES_BUCKET).getPublicUrl(filePath);
    if (!data?.publicUrl) {
      await removeDutyAttachmentObjects([filePath, ...uploaded.map((item) => item.objectPath)]);
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

export function extractDutyAttachmentObjectPath(value) {
  const raw = String(value || '').trim();
  if (!raw) {
    return '';
  }

  if (!/^https?:\/\//i.test(raw)) {
    const normalized = raw.replace(/^\/+/, '');
    const bucketPrefix = `${DUTY_FILES_BUCKET}/`;
    return normalized.startsWith(bucketPrefix) ? normalized.slice(bucketPrefix.length) : '';
  }

  try {
    const url = new URL(raw);
    const marker = `/storage/v1/object/public/${DUTY_FILES_BUCKET}/`;
    const index = url.pathname.indexOf(marker);
    if (index === -1) {
      return '';
    }

    return decodeURIComponent(url.pathname.slice(index + marker.length));
  } catch {
    return '';
  }
}

export async function removeDutyAttachmentObjects(objectPaths) {
  const uniquePaths = Array.from(new Set((objectPaths || []).filter(Boolean)));
  if (!uniquePaths.length) {
    return;
  }

  await supabase.storage
    .from(DUTY_FILES_BUCKET)
    .remove(uniquePaths);
}
