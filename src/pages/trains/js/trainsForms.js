import { toTimeInputValue, escapeHtml } from './helpers.js';
import { dedupeTimetableEntries, deriveTimetableLabel, parseTimetableEntries, serializeTimetableEntries } from './trainsTimetableEntries.js';
import { initTooltips } from '../../../utils/tooltips.js';

export function populateTrainForm(container, train) {
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

export function resetTrainForm(container) {
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

export function updateCurrentTimetablePreview(container, entries) {
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
                data-bs-toggle="tooltip"
                data-bs-title="Преглед"
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
  initTooltips(linksContainer);
}
