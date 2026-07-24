'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { createAdminSupabase } from '@/lib/supabase/admin';
import { KNOWN_ROUTES } from '@/lib/cms/seo';
import { uploadImage, type UploadResult } from '@/lib/cms/media';

export interface SeoFormState {
    ok: boolean;
    message: string;
}

/** Upload a share/OG image to Supabase Storage; returns its public URL. */
export async function uploadOgImage(formData: FormData): Promise<UploadResult> {
    await requireAdmin();
    const file = formData.get('file');
    if (!(file instanceof File)) {
        return { ok: false, message: 'No file selected.' };
    }
    return uploadImage(file, 'og');
}

export async function saveSeo(
    _prev: SeoFormState | null,
    formData: FormData
): Promise<SeoFormState> {
    await requireAdmin();

    const path = String(formData.get('path') ?? '').trim();
    if (!KNOWN_ROUTES.some((r) => r.path === path)) {
        return { ok: false, message: 'Unknown route.' };
    }

    const clean = (key: string) => {
        const v = String(formData.get(key) ?? '').trim();
        return v.length ? v : null;
    };

    let admin;
    try {
        admin = createAdminSupabase();
    } catch {
        return { ok: false, message: 'Server is missing SUPABASE_SERVICE_ROLE_KEY.' };
    }

    const { error } = await admin.from('seo_settings').upsert(
        {
            path,
            title: clean('title'),
            description: clean('description'),
            og_image: clean('og_image'),
            keywords: clean('keywords'),
            noindex: formData.get('noindex') === 'on',
            updated_at: new Date().toISOString(),
        },
        { onConflict: 'path' }
    );

    if (error) {
        return { ok: false, message: `Could not save: ${error.message}` };
    }

    revalidatePath(path);
    return { ok: true, message: 'Saved — live on the site.' };
}
