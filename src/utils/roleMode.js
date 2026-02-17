function normalizeRole(role) {
  return String(role || '').trim().toLowerCase();
}

function hasRole(roles, values) {
  const normalized = (roles || []).map((role) => normalizeRole(role));
  return values.some((value) => normalized.includes(value));
}

export function isCrewRole(roles) {
  return hasRole(roles, ['crew', 'crew_member', 'user']);
}

export function resolveUserMode(roles) {
  if (hasRole(roles, ['admin'])) {
    return 'admin';
  }

  if (hasRole(roles, ['head_of_transport'])) {
    return 'head_of_transport';
  }

  if (hasRole(roles, ['crew_instructor', 'instructor'])) {
    return 'instructor';
  }

  if (hasRole(roles, ['crew_manager'])) {
    return 'manager';
  }

  if (isCrewRole(roles)) {
    return 'crew';
  }

  return 'default';
}

export function isTransportAnalyticsMode(mode) {
  return mode === 'head_of_transport' || mode === 'instructor';
}
