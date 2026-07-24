'use server';

import { createAdminSupabase } from '@/lib/supabase/admin';
import { isAdminEmail } from '@/lib/auth/requireAdmin';

/**
 * First-run setup: create the Supabase Auth user for an allowlisted email so
 * the admin can self-provision a password without touching the Supabase
 * dashboard. Only emails present in `cms_admins` are allowed.
 */
export async function setupAdminPassword(
    email: string,
    password: string
): Promise<{ success: boolean; message: string }> {
    const normalized = email?.toLowerCase().trim();

    if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
        return { success: false, message: 'Please enter a valid email address.' };
    }
    if (!password || password.length < 8) {
        return { success: false, message: 'Password must be at least 8 characters.' };
    }
    if (!(await isAdminEmail(normalized))) {
        return {
            success: false,
            message: 'This email is not authorised for admin access.',
        };
    }

    let admin;
    try {
        admin = createAdminSupabase();
    } catch {
        return {
            success: false,
            message: 'Server is missing SUPABASE_SERVICE_ROLE_KEY. Add it to .env.local.',
        };
    }

    const { error } = await admin.auth.admin.createUser({
        email: normalized,
        password,
        email_confirm: true,
    });

    if (error) {
        const msg = error.message?.toLowerCase() ?? '';
        if (msg.includes('already') || msg.includes('registered') || msg.includes('exist')) {
            return {
                success: false,
                message: 'An account already exists for this email — use "Sign in" instead.',
            };
        }
        console.error('[admin setup] createUser error:', error.message);
        return { success: false, message: 'Could not create the account. Please try again.' };
    }

    return { success: true, message: 'Account created. Signing you in…' };
}
