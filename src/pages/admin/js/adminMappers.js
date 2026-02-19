import { getRoleLabel } from './helpers.js';
import { adminState } from './state.js';

export function mapRoleAuditLogs(logRows, profiles) {
  const profilesById = new Map((profiles || []).map((profile) => [profile.id, profile]));

  return (logRows || []).map((row) => {
    const actorProfile = profilesById.get(row.actor_user_id);
    const targetProfile = profilesById.get(row.target_user_id);
    const role = String(row?.role || '').trim();

    return {
      ...row,
      role_label: role ? getRoleLabel(role) : '-',
      actor_label: actorProfile?.username || row?.actor_user_id || '-',
      target_label: targetProfile?.username || row?.target_user_id || '-'
    };
  });
}

export function resolveCurrentUserProtectedAdminIds(roles) {
  const currentUserId = String(adminState.currentUserId || '').trim();
  if (!currentUserId) {
    return [];
  }

  const adminRows = (roles || []).filter((row) => String(row?.role || '').trim().toLowerCase() === 'admin');
  const grantorByUserId = new Map(
    adminRows.map((row) => [String(row?.user_id || '').trim(), String(row?.granted_by_user_id || '').trim()])
  );

  const adminRoleRow = (roles || []).find(
    (row) => String(row?.user_id || '').trim() === currentUserId && String(row?.role || '').trim().toLowerCase() === 'admin'
  );
  const firstGrantorId = String(adminRoleRow?.granted_by_user_id || '').trim();
  if (!firstGrantorId) {
    return [];
  }

  const protectedIds = [];
  const visited = new Set([currentUserId]);
  let cursorId = firstGrantorId;

  while (cursorId && !visited.has(cursorId)) {
    protectedIds.push(cursorId);
    visited.add(cursorId);

    const nextGrantorId = String(grantorByUserId.get(cursorId) || '').trim();
    if (!nextGrantorId || nextGrantorId === cursorId) {
      break;
    }

    cursorId = nextGrantorId;
  }

  return protectedIds;
}

export function mapRolesWithProfiles(roles, profiles) {
  const profilesById = new Map((profiles || []).map((profile) => [profile.id, profile]));

  return (roles || []).map((roleRow) => ({
    ...roleRow,
    username: profilesById.get(roleRow.user_id)?.username || '',
    granted_by_username: profilesById.get(roleRow.granted_by_user_id)?.username || ''
  }));
}

export function mapAllUsersWithRoles(roles, profiles) {
  const profilesById = new Map((profiles || []).map((profile) => [profile.id, profile]));
  const rolesByUserId = new Map();

  (roles || []).forEach((roleRow) => {
    if (!rolesByUserId.has(roleRow.user_id)) {
      rolesByUserId.set(roleRow.user_id, []);
    }
    rolesByUserId.get(roleRow.user_id).push(roleRow);
  });

  const result = [];
  (profiles || []).forEach((profile) => {
    const userRoles = rolesByUserId.get(profile.id) || [];

    if (userRoles.length > 0) {
      userRoles.forEach((roleRow) => {
        result.push({
          ...roleRow,
          username: profile.username,
          user_id: profile.id,
          granted_by_username: profilesById.get(roleRow.granted_by_user_id)?.username || ''
        });
      });
    } else {
      result.push({
        id: null,
        user_id: profile.id,
        role: null,
        username: profile.username,
        granted_by_user_id: null,
        granted_by_username: ''
      });
    }
  });

  return result;
}
