import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

/**
 * Service-role Supabase client — bypasses RLS. SERVER ONLY.
 * Used by admin server actions / server components after `requireAdmin()`.
 * Never import this into a client component.
 */
export function createAdminSupabase(): SupabaseClient {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
    if (!key) {
        throw new Error(
            'Missing SUPABASE_SERVICE_ROLE_KEY. Add it to .env.local — Supabase Dashboard → Project Settings → API → service_role secret.'
        );
    }

    if (!cached) {
        cached = createClient(url, key, {
            auth: { persistSession: false, autoRefreshToken: false },
        });
    }
    return cached;
}
