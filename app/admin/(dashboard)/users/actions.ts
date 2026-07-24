'use server';

import { revalidatePath } from 'next/cache';
import { requireSection } from '@/lib/auth/requireAdmin';
import { createAdminSupabase } from '@/lib/supabase/admin';
import { isRole } from '@/lib/auth/roles';
import type { SupabaseClient } from '@supabase/supabase-js';

export interface UserActionState {
    ok: boolean;
    message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function findAuthUserId(admin: SupabaseClient, email: string): Promise<string | null> {
    const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const u = data?.users?.find((x) => x.email?.toLowerCase() === email);
    return u?.id ?? null;
}

/** Create a CMS user: Supabase auth account (no email verification) + allowlist entry with a role. */
export async function createCmsUser(
    _prev: UserActionState | null,
    formData: FormData
): Promise<UserActionState> {
    await requireSection('users'); // admin only

    const email = String(formData.get('email') ?? '').toLowerCase().trim();
    const password = String(formData.get('password') ?? '');
    const role = String(formData.get('role') ?? 'editor');

    if (!EMAIL_RE.test(email)) return { ok: false, message: 'Enter a valid email address.' };
    if (password.length < 8) return { ok: false, message: 'Password must be at least 8 characters.' };
    if (!isRole(role)) return { ok: false, message: 'Please choose a valid role.' };

    let admin: SupabaseClient;
    try {
        admin = createAdminSupabase();
    } catch {
        return { ok: false, message: 'Server is missing SUPABASE_SERVICE_ROLE_KEY.' };
    }

    // Create the auth user (email pre-confirmed → no verification needed).
    const { error: createErr } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    });

    if (createErr) {
        const m = createErr.message?.toLowerCase() ?? '';
        if (m.includes('already') || m.includes('registered') || m.includes('exist')) {
            // Account already exists — set the password to the one just entered.
            const id = await findAuthUserId(admin, email);
            if (id) await admin.auth.admin.updateUserById(id, { password });
        } else {
            return { ok: false, message: `Could not create user: ${createErr.message}` };
        }
    }

    // Add / update the allowlist entry with the chosen role.
    const { error: upsertErr } = await admin
        .from('cms_admins')
        .upsert({ email, role }, { onConflict: 'email' });
    if (upsertErr) return { ok: false, message: `Could not save user: ${upsertErr.message}` };

    revalidatePath('/admin/users');
    return { ok: true, message: `${email} added as ${role}.` };
}

export async function updateCmsUserRole(email: string, role: string): Promise<UserActionState> {
    const me = await requireSection('users');
    if (!isRole(role)) return { ok: false, message: 'Invalid role.' };

    const target = email.toLowerCase().trim();
    if (target === me.email.toLowerCase() && role !== 'admin') {
        return { ok: false, message: "You can't change your own role." };
    }

    const admin = createAdminSupabase();
    const { error } = await admin.from('cms_admins').update({ role }).eq('email', target);
    if (error) return { ok: false, message: error.message };

    revalidatePath('/admin/users');
    return { ok: true, message: 'Role updated.' };
}

export async function deleteCmsUser(email: string): Promise<UserActionState> {
    const me = await requireSection('users');
    const target = email.toLowerCase().trim();

    if (target === me.email.toLowerCase()) {
        return { ok: false, message: "You can't remove your own account." };
    }

    const admin = createAdminSupabase();

    // Don't allow removing the last remaining admin.
    const { data: admins } = await admin.from('cms_admins').select('email').eq('role', 'admin');
    const adminEmails = (admins ?? []).map((a) => a.email.toLowerCase());
    if (adminEmails.length <= 1 && adminEmails.includes(target)) {
        return { ok: false, message: 'Cannot remove the only admin.' };
    }

    const { error } = await admin.from('cms_admins').delete().eq('email', target);
    if (error) return { ok: false, message: error.message };

    // Also delete the Supabase auth account so they can no longer sign in.
    try {
        const id = await findAuthUserId(admin, target);
        if (id) await admin.auth.admin.deleteUser(id);
    } catch {
        // Non-fatal: allowlist entry is gone, which already blocks access.
    }

    revalidatePath('/admin/users');
    return { ok: true, message: `Removed ${target}.` };
}

export async function setCmsUserPassword(email: string, password: string): Promise<UserActionState> {
    await requireSection('users');
    if (password.length < 8) return { ok: false, message: 'Password must be at least 8 characters.' };

    const admin = createAdminSupabase();
    try {
        const id = await findAuthUserId(admin, email.toLowerCase().trim());
        if (!id) return { ok: false, message: 'No sign-in account found for this user.' };
        const { error } = await admin.auth.admin.updateUserById(id, { password });
        if (error) return { ok: false, message: error.message };
    } catch (e) {
        return { ok: false, message: (e as Error).message };
    }
    return { ok: true, message: 'Password updated.' };
}
