'use client';

import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser Supabase client for client components (e.g. the admin login form).
 * Uses the public publishable key and stores the session in cookies so the
 * server/middleware can read it.
 */
export function createBrowserSupabase() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
}
