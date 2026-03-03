import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

function json(status: number, payload: Record<string, unknown>) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json'
    }
  });
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY');

  if (!supabaseUrl || !serviceRoleKey || !anonKey) {
    return json(500, { error: 'Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / SUPABASE_ANON_KEY' });
  }

  const authHeader = req.headers.get('Authorization') || '';
  if (!authHeader.startsWith('Bearer ')) {
    return json(401, { error: 'Missing bearer token' });
  }

  const callerClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const { data: callerUserData, error: callerUserError } = await callerClient.auth.getUser();
  if (callerUserError || !callerUserData?.user?.id) {
    return json(401, { error: 'Invalid token' });
  }

  const callerUserId = callerUserData.user.id;

  const { data: adminRows, error: adminError } = await adminClient
    .from('user_roles')
    .select('id')
    .eq('user_id', callerUserId)
    .eq('role', 'admin')
    .limit(1);

  if (adminError) {
    return json(500, { error: adminError.message });
  }

  if (!Array.isArray(adminRows) || adminRows.length === 0) {
    return json(403, { error: 'Only admins can change user emails' });
  }

  let body: { userId?: string; newEmail?: string } = {};
  try {
    body = await req.json();
  } catch {
    return json(400, { error: 'Invalid JSON body' });
  }

  const targetUserId = String(body.userId || '').trim();
  const newEmail = String(body.newEmail || '').trim().toLowerCase();

  if (!targetUserId || !isUuid(targetUserId)) {
    return json(400, { error: 'Invalid userId' });
  }

  if (!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
    return json(400, { error: 'Invalid email address' });
  }

  const { data: targetUserData, error: targetUserError } = await adminClient.auth.admin.getUserById(targetUserId);
  if (targetUserError || !targetUserData?.user) {
    return json(404, { error: 'Target user not found' });
  }

  const { error: authUpdateError } = await adminClient.auth.admin.updateUserById(targetUserId, {
    email: newEmail,
    email_confirm: true
  });

  if (authUpdateError) {
    return json(500, { error: authUpdateError.message });
  }

  const { error: profileUpdateError } = await adminClient
    .from('user_profiles')
    .update({ email: newEmail, updated_at: new Date().toISOString() })
    .eq('id', targetUserId);

  if (profileUpdateError) {
    // auth.users is already updated — return partial success so the caller knows
    return json(207, {
      ok: false,
      partialSuccess: true,
      authUpdated: true,
      error: `auth.users updated but user_profiles sync failed: ${profileUpdateError.message}`
    });
  }

  return json(200, { ok: true, userId: targetUserId, email: newEmail });
});
