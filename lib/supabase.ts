import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
    if (!key) throw new Error('Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
    return createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
    });
}

export { getSupabaseClient };
