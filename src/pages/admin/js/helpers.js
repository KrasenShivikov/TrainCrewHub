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
  if (username && id) {
    return `${username} (${id})`;
  }

  return username || id || '-';
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
  const normalized = String(role || '').trim();
  if (!normalized) {
    return '-';
  }

  return normalized;
}
