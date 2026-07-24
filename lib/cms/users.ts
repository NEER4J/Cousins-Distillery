import 'server-only';

import { createAdminSupabase } from '@/lib/supabase/admin';
import { normalizeRole, type Role } from '@/lib/auth/roles';

export interface CmsUser {
    email: string;
    role: Role;
    created_at: string;
}

/** List all CMS users (allowlist entries) with their roles. */
export async function listCmsUsers(): Promise<CmsUser[]> {
    const admin = createAdminSupabase();
    const { data, error } = await admin
        .from('cms_admins')
        .select('email, role, created_at')
        .order('created_at', { ascending: true });

    if (error) throw error;

    return (data ?? []).map((r) => ({
        email: r.email,
        role: normalizeRole(r.role),
        created_at: r.created_at,
    }));
}
