import { supabase } from '../services/supabaseClient.js';

export async function getCurrentUserSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    return null;
  }

  return data.session || null;
}

export async function isUserAdmin(userId) {
  if (!userId) {
    return false;
  }

  const { data, error } = await supabase
    .from('user_roles')
    .select('id')
    .eq('user_id', userId)
    .eq('role', 'admin')
    .limit(1);

  if (error) {
    return false;
  }

  return Array.isArray(data) && data.length > 0;
}

export async function isCurrentUserAdmin() {
  const session = await getCurrentUserSession();
  const userId = session?.user?.id || '';
  if (!userId) {
    return false;
  }

  return isUserAdmin(userId);
}

export async function hasUserAssignedRole(userId) {
  if (!userId) {
    return false;
  }

  const { data, error } = await supabase
    .from('user_roles')
    .select('id')
    .eq('user_id', userId)
    .limit(1);

  if (error) {
    return false;
  }

  return Array.isArray(data) && data.length > 0;
}

export async function isUserProfileActive(userId) {
  if (!userId) {
    return false;
  }

  const { data, error } = await supabase
    .from('user_profiles')
    .select('is_active')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    return false;
  }

  if (!data) {
    return true;
  }

  return data.is_active !== false;
}

export async function ensureActiveUserSession() {
  const session = await getCurrentUserSession();
  const userId = session?.user?.id || '';
  if (!userId) {
    return { allowed: false, reason: 'no-session' };
  }

  const isActive = await isUserProfileActive(userId);
  if (isActive) {
    return { allowed: true, reason: '' };
  }

  await supabase.auth.signOut();
  return { allowed: false, reason: 'inactive-profile' };
}
