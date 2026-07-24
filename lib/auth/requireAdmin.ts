import 'server-only';

import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';
import { createAdminSupabase } from '@/lib/supabase/admin';
import { type Role, roleCan, normalizeRole } from '@/lib/auth/roles';

export type { Role };

export interface AdminUser {
    id: string;
    email: string;
    role: Role;
}

/** Return the CMS role for an email, or null if it isn't an allowlisted user. */
export async function getAdminRole(email: string | null | undefined): Promise<Role | null> {
    if (!email) return null;
    try {
        const admin = createAdminSupabase();
        const { data, error } = await admin
            .from('cms_admins')
            .select('role')
            .eq('email', email.toLowerCase())
            .maybeSingle();

        if (error) {
            // The `role` column may not exist yet (roles migration not run).
            // Fall back to plain allowlist membership → treat as admin.
            const { data: fallback } = await admin
                .from('cms_admins')
                .select('email')
                .eq('email', email.toLowerCase())
                .maybeSingle();
            return fallback ? 'admin' : null;
        }
        if (!data) return null;
        return normalizeRole(data.role);
    } catch (err) {
        console.error('[auth] admin check failed:', (err as Error).message);
        return null;
    }
}

/** True if the email is an allowlisted CMS user. */
export async function isAdminEmail(email: string | null | undefined): Promise<boolean> {
    return (await getAdminRole(email)) !== null;
}

/** The logged-in CMS user (with role), or null if not authenticated / not allowlisted. */
export async function getAdminUser(): Promise<AdminUser | null> {
    const supabase = await createServerSupabase();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) return null;
    const role = await getAdminRole(user.email);
    if (!role) return null;

    return { id: user.id, email: user.email, role };
}

/** Guard for any admin page/action. Redirects to /admin/login if not allowlisted. */
export async function requireAdmin(): Promise<AdminUser> {
    const user = await getAdminUser();
    if (!user) redirect('/admin/login');
    return user;
}

/** Guard a specific CMS section. Redirects allowlisted users without access to the dashboard. */
export async function requireSection(section: string): Promise<AdminUser> {
    const user = await requireAdmin();
    if (!roleCan(user.role, section)) redirect('/admin');
    return user;
}
