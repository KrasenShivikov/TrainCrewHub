import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  console.error('Missing Supabase env vars: VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY');
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
