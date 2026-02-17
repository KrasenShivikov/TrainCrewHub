function setKpiLabels(container, labels) {
  labels.forEach((label, index) => {
    const target = container.querySelector(`#index-kpi-label-${index + 1}`);
    if (target) {
      target.textContent = label;
    }
  });
}

export function applyRoleLayout(container, userContext, deps) {
  const { setText, isTransportAnalyticsMode, getTodayIsoDate } = deps;
  const managementSection = container.querySelector('#index-management-section');
  const crewSection = container.querySelector('#index-crew-section');
  const plannedKpiCard = container.querySelector('#index-kpi-card-planned');
  const actualKpiCard = container.querySelector('#index-kpi-card-actual');
  const absencesKpiCard = container.querySelector('#index-kpi-card-absences');
  const employeesKpiCard = container.querySelector('#index-kpi-card-employees');
  const certificatesPanel = container.querySelector('#index-certificates-panel');
  const absencesPanel = container.querySelector('#index-absences-panel');
  const workloadPanel = container.querySelector('#index-workload-panel');
  const pendingUsersPanel = container.querySelector('#index-pending-users-panel');
  const workloadDateInput = container.querySelector('#index-workload-date');
  const soonDetails = container.querySelector('#index-certificates-soon-details');
  const expiredDetails = container.querySelector('#index-certificates-expired-details');
  const quickActions = container.querySelector('#index-quick-actions');
  const mode = userContext?.mode || 'default';

  setText(container, '#index-management-title', 'Оперативен преглед за днес');
  setKpiLabels(container, ['Планирани повески', 'Реални повески', 'Активни отсъствия', 'Активни служители']);

  if (mode !== 'crew') {
    container.dataset.indexMode = mode;
    managementSection?.classList.remove('d-none');
    crewSection?.classList.add('d-none');
    plannedKpiCard?.classList.remove('d-none');
    actualKpiCard?.classList.remove('d-none');
    absencesKpiCard?.classList.remove('col-xl-6');
    absencesKpiCard?.classList.add('col-xl-3');
    employeesKpiCard?.classList.remove('col-xl-6');
    employeesKpiCard?.classList.add('col-xl-3');
    certificatesPanel?.classList.add('d-none');
    absencesPanel?.classList.add('d-none');
    workloadPanel?.classList.add('d-none');
    pendingUsersPanel?.classList.add('d-none');
    soonDetails?.classList.add('d-none');
    expiredDetails?.classList.add('d-none');

    if (quickActions) {
      if (mode === 'admin') {
        quickActions.innerHTML = `
          <a href="/admin" data-link class="btn btn-outline-danger">Админ Панел</a>
          <a href="/employees" data-link class="btn btn-outline-primary">Служители</a>
        `;
        setText(container, '#index-welcome-subtitle', 'Административен преглед на потребители, роли и системно състояние.');
        setText(container, '#index-management-title', 'Административен преглед');
        setKpiLabels(container, ['Профили', 'Потребители с роля', 'Профили със служител', 'Роли']);
        pendingUsersPanel?.classList.remove('d-none');
      } else if (mode === 'manager') {
        quickActions.innerHTML = `
          <a href="/plan-schedule" data-link class="btn btn-outline-primary">План-График</a>
          <a href="/schedule" data-link class="btn btn-outline-primary">График</a>
          <a href="/planned-duties" data-link class="btn btn-outline-primary">Планирани повески</a>
          <a href="/actual-duties" data-link class="btn btn-outline-primary">Реални повески</a>
        `;
        setText(container, '#index-welcome-subtitle', 'Оперативен преглед за управление на екипи и дневни повески.');
      } else if (isTransportAnalyticsMode(mode)) {
        quickActions.innerHTML = `
          <a href="/plan-schedule" data-link class="btn btn-outline-primary">План-График</a>
          <a href="/schedule" data-link class="btn btn-outline-primary">График</a>
          <a href="/planned-duties" data-link class="btn btn-outline-primary">Планирани повески</a>
          <a href="/actual-duties" data-link class="btn btn-outline-primary">Реални повески</a>
        `;
        setText(container, '#index-welcome-subtitle', 'Оперативен преглед с акцент върху празни позиции, сертификати и отсъствия.');
        plannedKpiCard?.classList.add('d-none');
        actualKpiCard?.classList.add('d-none');
        absencesKpiCard?.classList.remove('col-xl-3');
        absencesKpiCard?.classList.add('col-xl-6');
        employeesKpiCard?.classList.remove('col-xl-3');
        employeesKpiCard?.classList.add('col-xl-6');
        certificatesPanel?.classList.remove('d-none');
        absencesPanel?.classList.remove('d-none');
        workloadPanel?.classList.remove('d-none');
        if (workloadDateInput && !workloadDateInput.value) {
          workloadDateInput.value = getTodayIsoDate();
        }
      }
    }

    return;
  }

  container.dataset.indexMode = 'crew';
  container.dataset.indexEmployeeId = userContext.employeeId || '';
  managementSection?.classList.add('d-none');
  crewSection?.classList.remove('d-none');
  setText(container, '#index-welcome-subtitle', 'Виждаш своя месечен календар за планирани и реални повески.');

  if (quickActions) {
    quickActions.innerHTML = `
      <a href="/planned-duties" data-link class="btn btn-outline-primary">Планирани повески</a>
      <a href="/actual-duties" data-link class="btn btn-outline-primary">Реални повески</a>
    `;
  }
}
