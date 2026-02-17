function formatAssignmentRoleName(value) {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'chief') {
    return 'Началник влак';
  }

  if (normalized === 'conductor') {
    return 'Кондуктор';
  }

  if (!normalized) {
    return '-';
  }

  return normalized;
}

function formatEmployeeDisplayName(row) {
  const firstName = String(row?.first_name || '').trim();
  const lastName = String(row?.last_name || '').trim();
  return `${firstName} ${lastName}`.trim() || '-';
}

export async function loadSchedulePublicationDates(dbClient, startDate, endDate) {
  const { data, error } = await dbClient
    .from('schedule_publications')
    .select('schedule_date, is_confirmed')
    .gte('schedule_date', startDate)
    .lte('schedule_date', endDate);

  if (error) {
    return {
      confirmedDateSet: new Set(),
      pendingConfirmationDateSet: new Set(),
      error
    };
  }

  const confirmedDateSet = new Set();
  const pendingConfirmationDateSet = new Set();

  const normalizeIsoDateKey = (value) => {
    const raw = String(value || '').trim();
    const match = raw.match(/\d{4}-\d{2}-\d{2}/);
    return match ? match[0] : raw;
  };

  (data || []).forEach((row) => {
    const date = normalizeIsoDateKey(row?.schedule_date);
    if (!date) {
      return;
    }

    if (row?.is_confirmed) {
      confirmedDateSet.add(date);
      return;
    }

    pendingConfirmationDateSet.add(date);
  });

  return {
    confirmedDateSet,
    pendingConfirmationDateSet,
    error: null
  };
}

export async function loadScheduleChangesSummary(dbClient, startDate, endDate, formatDateTime) {
  const { data, error } = await dbClient
    .from('schedule_change_events')
    .select('schedule_date, action, old_duty_id, new_duty_id, old_employee_id, new_employee_id, old_assignment_role, new_assignment_role, changed_at')
    .gte('schedule_date', startDate)
    .lte('schedule_date', endDate)
    .order('changed_at', { ascending: false });

  if (error) {
    return {
      changeCountByDate: new Map(),
      changeEventsByDate: new Map(),
      error
    };
  }

  const dutyIds = new Set();
  const employeeIds = new Set();

  (data || []).forEach((row) => {
    if (row?.old_duty_id) {
      dutyIds.add(row.old_duty_id);
    }

    if (row?.new_duty_id) {
      dutyIds.add(row.new_duty_id);
    }

    if (row?.old_employee_id) {
      employeeIds.add(row.old_employee_id);
    }

    if (row?.new_employee_id) {
      employeeIds.add(row.new_employee_id);
    }
  });

  const [dutyResponse, employeeResponse] = await Promise.all([
    dutyIds.size
      ? dbClient.from('duties').select('id, name').in('id', Array.from(dutyIds))
      : Promise.resolve({ data: [], error: null }),
    employeeIds.size
      ? dbClient.from('employees').select('id, first_name, last_name').in('id', Array.from(employeeIds))
      : Promise.resolve({ data: [], error: null })
  ]);

  if (dutyResponse.error || employeeResponse.error) {
    return {
      changeCountByDate: new Map(),
      changeEventsByDate: new Map(),
      error: dutyResponse.error || employeeResponse.error
    };
  }

  const dutyNameById = new Map(
    (dutyResponse.data || [])
      .map((row) => [String(row?.id || ''), String(row?.name || '').trim() || '-'])
      .filter(([id]) => id)
  );

  const employeeNameById = new Map(
    (employeeResponse.data || [])
      .map((row) => [String(row?.id || ''), formatEmployeeDisplayName(row)])
      .filter(([id]) => id)
  );

  const counts = new Map();
  const eventsByDate = new Map();

  (data || []).forEach((row) => {
    const date = String(row?.schedule_date || '').trim();
    if (!date) {
      return;
    }

    const current = Number(counts.get(date) || 0);
    counts.set(date, current + 1);

    const oldDutyName = dutyNameById.get(String(row?.old_duty_id || '')) || '-';
    const newDutyName = dutyNameById.get(String(row?.new_duty_id || '')) || '-';
    const oldEmployeeName = employeeNameById.get(String(row?.old_employee_id || '')) || '-';
    const newEmployeeName = employeeNameById.get(String(row?.new_employee_id || '')) || '-';
    const oldRole = formatAssignmentRoleName(row?.old_assignment_role);
    const newRole = formatAssignmentRoleName(row?.new_assignment_role);
    const action = String(row?.action || '').trim().toLowerCase();
    const changedAt = row?.changed_at ? formatDateTime(new Date(row.changed_at)) : '-';

    let summary = '';
    if (action === 'insert') {
      summary = `Добавено: ${newEmployeeName} | ${newDutyName} | ${newRole}`;
    } else if (action === 'delete') {
      summary = `Премахнато: ${oldEmployeeName} | ${oldDutyName} | ${oldRole}`;
    } else {
      summary = `Промяна: ${oldEmployeeName} | ${oldDutyName} | ${oldRole} → ${newEmployeeName} | ${newDutyName} | ${newRole}`;
    }

    const entries = eventsByDate.get(date) || [];
    entries.push({
      summary,
      changedAt
    });
    eventsByDate.set(date, entries);
  });

  return {
    changeCountByDate: counts,
    changeEventsByDate: eventsByDate,
    error: null
  };
}
