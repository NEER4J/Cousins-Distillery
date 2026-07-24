import 'server-only';

import { randomUUID } from 'node:crypto';
import { createAdminSupabase } from '@/lib/supabase/admin';

/** Public bucket that holds CMS-uploaded images (OG/share images, etc.). */
export const MEDIA_BUCKET = 'cms-media';

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME = [
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/gif',
    'image/avif',
];

export interface UploadResult {
    ok: boolean;
    url?: string;
    message?: string;
}

// Create the public bucket on first use so no manual dashboard/migration step
// is needed. Safe to call repeatedly.
async function ensureBucket(admin: ReturnType<typeof createAdminSupabase>) {
    const { data } = await admin.storage.getBucket(MEDIA_BUCKET);
    if (data) return;
    await admin.storage.createBucket(MEDIA_BUCKET, {
        public: true,
        fileSizeLimit: MAX_BYTES,
        allowedMimeTypes: ALLOWED_MIME,
    });
}

/** Upload an image to the media bucket and return its public URL. */
export async function uploadImage(file: File, folder = 'uploads'): Promise<UploadResult> {
    if (!(file instanceof File) || file.size === 0) {
        return { ok: false, message: 'No file selected.' };
    }
    if (!ALLOWED_MIME.includes(file.type)) {
        return { ok: false, message: 'Please choose a PNG, JPG, WEBP, GIF or AVIF image.' };
    }
    if (file.size > MAX_BYTES) {
        return { ok: false, message: 'Image must be under 5 MB.' };
    }

    let admin;
    try {
        admin = createAdminSupabase();
    } catch {
        return { ok: false, message: 'Server is missing SUPABASE_SERVICE_ROLE_KEY.' };
    }

    try {
        await ensureBucket(admin);
    } catch {
        // Bucket likely already exists (or a race) — proceed to upload.
    }

    const ext = (file.name.split('.').pop() ?? 'png')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .slice(0, 5) || 'png';
    const path = `${folder}/${randomUUID()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await admin.storage
        .from(MEDIA_BUCKET)
        .upload(path, buffer, { contentType: file.type, upsert: false });

    if (error) {
        return { ok: false, message: `Upload failed: ${error.message}` };
    }

    const { data } = admin.storage.from(MEDIA_BUCKET).getPublicUrl(path);
    return { ok: true, url: data.publicUrl };
}
