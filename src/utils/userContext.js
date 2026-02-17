import { supabase } from '../services/supabaseClient.js';
import { isCrewRole } from './roleMode.js';

let cachedUserId = '';
let cachedRoles = null;

export async function getCurrentUserRoles() {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    cachedUserId = '';
    cachedRoles = [];
    return [];
  }

  const userId = sessionData?.session?.user?.id || '';
  if (!userId) {
    cachedUserId = '';
    cachedRoles = [];
    return [];
  }

  if (cachedRoles && cachedUserId === userId) {
    return cachedRoles;
  }

  const { data: roleRows, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId);

  if (error) {
    cachedUserId = userId;
    cachedRoles = [];
    return [];
  }

  const roles = [...new Set((roleRows || []).map((row) => String(row?.role || '').trim()).filter(Boolean))];
  cachedUserId = userId;
  cachedRoles = roles;
  return roles;
}

export async function isCurrentUserCrew() {
  const roles = await getCurrentUserRoles();
  return isCrewRole(roles);
}
