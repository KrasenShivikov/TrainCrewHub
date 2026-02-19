export function deriveTimetableLabel(url, index) {
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

export function normalizeTimetableEntry(item, index) {
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

export function parseTimetableEntries(value) {
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

export function dedupeTimetableEntries(entries) {
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

export function serializeTimetableEntries(entries) {
  const normalized = dedupeTimetableEntries(entries);
  if (!normalized.length) {
    return null;
  }

  return JSON.stringify(normalized);
}
