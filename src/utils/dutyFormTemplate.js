export function renderDutyFormFields({ idPrefix }) {
  return `
    <div class="col-md-6">
      <label for="${idPrefix}-name" class="form-label">Наименование</label>
      <input id="${idPrefix}-name" class="form-control" type="text" required />
    </div>

    <div class="col-md-6">
      <label for="${idPrefix}-type" class="form-label">Тип на повеската</label>
      <select id="${idPrefix}-type" class="form-select" required>
        <option value="">Избери тип</option>
      </select>
    </div>

    <div class="col-md-6">
      <label for="${idPrefix}-schedule-keys" class="form-label">Ключ-Графици</label>
      <select id="${idPrefix}-schedule-keys" class="form-select" multiple required size="5"></select>
      <div class="form-text">Може да избереш един или повече ключ-графика.</div>
    </div>

    <div class="col-md-6">
      <label for="${idPrefix}-trains" class="form-label">Влакове</label>
      <select id="${idPrefix}-trains" class="form-select" multiple size="5"></select>
      <div class="form-text">Избери един или повече влака за тази повеска.</div>
    </div>

    <div class="col-md-6">
      <label for="${idPrefix}-start" class="form-label">Начало</label>
      <input id="${idPrefix}-start" class="form-control" type="time" required />
    </div>

    <div class="col-md-6">
      <label for="${idPrefix}-end" class="form-label">Край</label>
      <input id="${idPrefix}-end" class="form-control" type="time" required />
    </div>

    <div class="col-md-6 d-flex align-items-end">
      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="${idPrefix}-second-day" />
        <label class="form-check-label" for="${idPrefix}-second-day">Втори ден</label>
      </div>
    </div>

    <div class="col-md-6">
      <label for="${idPrefix}-break-start" class="form-label">Начало на прекъсването</label>
      <input id="${idPrefix}-break-start" class="form-control" type="time" value="00:00" required />
    </div>

    <div class="col-md-6">
      <label for="${idPrefix}-break-end" class="form-label">Край на прекъсването</label>
      <input id="${idPrefix}-break-end" class="form-control" type="time" value="00:00" required />
    </div>

    <div class="col-12">
      <label for="${idPrefix}-notes" class="form-label">Бележки</label>
      <textarea id="${idPrefix}-notes" class="form-control" rows="3" placeholder="Въведи бележки (по избор)"></textarea>
    </div>
  `;
}