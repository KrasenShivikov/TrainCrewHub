import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { closeModal } from './helpers.js';
import { loadTrains } from './table.js';
import { MAX_TRAIN_TIMETABLE_ITEMS, TRAIN_TIMETABLES_BUCKET } from './trainsConstants.js';
import {
  dedupeTimetableEntries,
  deriveTimetableLabel,
  parseTimetableEntries,
  serializeTimetableEntries
} from './trainsTimetableEntries.js';
import { resetTrainForm } from './trainsForms.js';

export async function saveTrain(container) {
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
  saveButton.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';

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

export async function deleteTrain(id, container) {
  const deleteButton = container.querySelector('#train-delete-confirm');
  const originalDeleteText = deleteButton.innerHTML;
  deleteButton.disabled = true;
  deleteButton.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';

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
