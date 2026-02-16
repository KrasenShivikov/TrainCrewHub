export function buildDutyProfileContent({
  duty,
  scheduleKeyNames,
  trainNumbers,
  escapeHtml,
  intervalToTimeInput,
  formatInterval
}) {
  const startTime = (duty?.start_time || '-').slice(0, 5) || '-';
  const endTime = (duty?.end_time || '-').slice(0, 5) || '-';
  const breakStartTime = (intervalToTimeInput(duty?.break_start_time || '00:00:00') || '-').slice(0, 5) || '-';
  const breakEndTime = (intervalToTimeInput(duty?.break_end_time || '00:00:00') || '-').slice(0, 5) || '-';

  return `
    <div class="row g-3">
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Наименование</div>
          <div class="fw-semibold">${escapeHtml(duty?.name || '-')}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Тип</div>
          <div class="fw-semibold">${escapeHtml(duty?.duty_types?.name || '-')}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Ключ-графици</div>
          <div class="fw-semibold">${escapeHtml(scheduleKeyNames?.length ? scheduleKeyNames.join(', ') : '-')}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Влакове</div>
          <div class="fw-semibold">${escapeHtml(trainNumbers?.length ? trainNumbers.join(', ') : '-')}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Начало</div>
          <div class="fw-semibold">${escapeHtml(startTime)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Край</div>
          <div class="fw-semibold">${escapeHtml(endTime)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Втори ден</div>
          <div class="fw-semibold">${duty?.second_day ? 'Да' : 'Не'}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Начало на прекъсване</div>
          <div class="fw-semibold">${escapeHtml(breakStartTime)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Край на прекъсване</div>
          <div class="fw-semibold">${escapeHtml(breakEndTime)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Прекъсване</div>
          <div class="fw-semibold">${escapeHtml(formatInterval(duty?.break_duration_interval))}</div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Времетраене</div>
          <div class="fw-semibold">${escapeHtml(formatInterval(duty?.duration_interval))}</div>
        </div>
      </div>
    </div>
  `;
}