const ROLE_LABELS_BG = {
  admin: 'Админ',
  crew_manager: 'Ръководител екип',
  head_of_transport: 'Ръководител транспорт',
  crew_instructor: 'Инструктор екип',
  instructor: 'Инструктор',
  crew: 'Екип',
  crew_member: 'Член екип',
  user: 'Потребител'
};

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function getProfileDisplayLabel(profile) {
  const username = String(profile?.username || '').trim();
  const id = String(profile?.id || '').trim();
  const isInactive = profile?.is_active === false;
  if (username && id) {
    return `${username} (${id})${isInactive ? ' (деактивиран)' : ''}`;
  }

  const fallback = username || id || '-';
  return isInactive && fallback !== '-' ? `${fallback} (деактивиран)` : fallback;
}

export function getEmployeeDisplayLabel(employee) {
  const firstName = String(employee?.first_name || '').trim();
  const lastName = String(employee?.last_name || '').trim();
  const fullName = `${firstName} ${lastName}`.trim();
  if (!fullName) {
    return '-';
  }

  return employee?.is_active === false ? `${fullName} (неактивен)` : fullName;
}

export function getRoleLabel(role) {
  const normalized = String(role || '').trim().toLowerCase();
  if (!normalized) {
    return '-';
  }

  return ROLE_LABELS_BG[normalized] || role;
}
