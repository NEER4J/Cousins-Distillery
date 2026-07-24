'use server';

import { revalidatePath } from 'next/cache';
import { requireSection } from '@/lib/auth/requireAdmin';
import { createAdminSupabase } from '@/lib/supabase/admin';

export interface ScriptsFormState {
    ok: boolean;
    message: string;
}

export async function saveScripts(
    _prev: ScriptsFormState | null,
    formData: FormData
): Promise<ScriptsFormState> {
    await requireSection('scripts');

    const payload = {
        header_scripts: String(formData.get('header_scripts') ?? ''),
        body_start_scripts: String(formData.get('body_start_scripts') ?? ''),
        footer_scripts: String(formData.get('footer_scripts') ?? ''),
        updated_at: new Date().toISOString(),
    };

    let admin;
    try {
        admin = createAdminSupabase();
    } catch {
        return { ok: false, message: 'Server is missing SUPABASE_SERVICE_ROLE_KEY.' };
    }

    // Ensure the singleton row exists, then update it.
    const { error } = await admin.from('site_settings').upsert({ id: 1, ...payload });
    if (error) {
        return { ok: false, message: `Could not save: ${error.message}` };
    }

    // Scripts live in the root layout — refresh every page that shares it.
    revalidatePath('/', 'layout');
    return { ok: true, message: 'Scripts saved — changes are live on the site.' };
}
