import 'server-only';

import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';
import { createAdminSupabase } from '@/lib/supabase/admin';

export interface AdminUser {
    id: string;
    email: string;
}

/** True if the email is present in the cms_admins allowlist. */
export async function isAdminEmail(email: string | null | undefined): Promise<boolean> {
    if (!email) return false;
    try {
        const admin = createAdminSupabase();
        const { data, error } = await admin
            .from('cms_admins')
            .select('email')
            .eq('email', email.toLowerCase())
            .maybeSingle();

        if (error) {
            console.error('[auth] cms_admins lookup error:', error.message);
            return false;
        }
        return !!data;
    } catch (err) {
        // Missing service-role key or unreachable DB — deny rather than crash.
        console.error('[auth] admin check failed:', (err as Error).message);
        return false;
    }
}

/** Returns the logged-in admin user, or null if not authenticated / not an admin. */
export async function getAdminUser(): Promise<AdminUser | null> {
    const supabase = await createServerSupabase();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) return null;
    if (!(await isAdminEmail(user.email))) return null;

    return { id: user.id, email: user.email };
}

/** Guard for admin pages/actions. Redirects to /admin/login if not an admin. */
export async function requireAdmin(): Promise<AdminUser> {
    const user = await getAdminUser();
    if (!user) redirect('/admin/login');
    return user;
}
