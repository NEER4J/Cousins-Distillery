'use client';

import { useActionState, useRef, useState, useTransition } from 'react';
import { saveSeo, uploadOgImage, type SeoFormState } from './actions';
import type { KnownRoute, SeoOverride } from '@/lib/cms/seo';
import { ChevronDown, Loader2, CheckCircle2, AlertCircle, Save, Upload, X } from 'lucide-react';

export function SeoRouteCard({
    route,
    override,
}: {
    route: KnownRoute;
    override: SeoOverride | null;
}) {
    const [state, formAction, pending] = useActionState<SeoFormState | null, FormData>(
        saveSeo,
        null
    );

    const [ogImage, setOgImage] = useState(override?.og_image ?? '');
    const [uploading, startUpload] = useTransition();
    const [uploadError, setUploadError] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        e.target.value = ''; // allow re-selecting the same file later
        if (!file) return;
        setUploadError(null);
        const fd = new FormData();
        fd.append('file', file);
        startUpload(async () => {
            const res = await uploadOgImage(fd);
            if (res.ok && res.url) setOgImage(res.url);
            else setUploadError(res.message ?? 'Upload failed.');
        });
    }

    const customised = !!(override && (override.title || override.description || override.og_image || override.keywords || override.noindex));

    return (
        <details className="admin-card" style={{ padding: 0 }}>
            <summary
                style={{
                    padding: '0.85rem 1.15rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                }}
            >
                <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: '0.92rem' }}>{route.label}</strong>
                    <code style={{ fontSize: '0.78rem', color: 'var(--admin-muted)' }}>{route.path}</code>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                    <span
                        className="admin-badge"
                        style={
                            customised
                                ? { background: 'var(--admin-accent-weak)', color: '#8a6d2f' }
                                : { background: '#f2f4f7', color: 'var(--admin-muted)' }
                        }
                    >
                        {customised ? 'Customised' : 'Default'}
                    </span>
                    <ChevronDown size={16} className="admin-chevron" />
                </span>
            </summary>

            <form
                action={formAction}
                style={{ padding: '0 1.15rem 1.2rem', borderTop: '1px solid var(--admin-border)', display: 'grid', gap: '0.9rem' }}
            >
                <input type="hidden" name="path" value={route.path} />

                <div style={{ marginTop: '1rem' }}>
                    <label className="admin-flabel" htmlFor={`title-${route.path}`}>Title</label>
                    <input
                        id={`title-${route.path}`}
                        name="title"
                        className="admin-input"
                        defaultValue={override?.title ?? ''}
                        placeholder="Leave blank to use the built-in title"
                    />
                </div>

                <div>
                    <label className="admin-flabel" htmlFor={`desc-${route.path}`}>Meta description</label>
                    <textarea
                        id={`desc-${route.path}`}
                        name="description"
                        className="admin-textarea"
                        style={{ fontFamily: 'inherit', minHeight: 70 }}
                        rows={3}
                        defaultValue={override?.description ?? ''}
                        placeholder="Leave blank to use the built-in description"
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.9rem' }}>
                    <div>
                        <label className="admin-flabel" htmlFor={`og-${route.path}`}>Social share image</label>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                            <input
                                id={`og-${route.path}`}
                                name="og_image"
                                className="admin-input"
                                value={ogImage}
                                onChange={(e) => setOgImage(e.target.value)}
                                placeholder="Paste an image URL, or upload →"
                            />
                            <button
                                type="button"
                                className="admin-btn admin-btn-ghost"
                                style={{ flexShrink: 0 }}
                                disabled={uploading}
                                onClick={() => fileRef.current?.click()}
                            >
                                {uploading ? <Loader2 size={15} className="admin-spin" /> : <Upload size={15} />}
                                Upload
                            </button>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                                hidden
                                onChange={handleFile}
                            />
                        </div>
                        {uploadError && (
                            <p style={{ fontSize: '0.78rem', color: 'var(--admin-danger)', marginTop: '0.35rem' }}>
                                {uploadError}
                            </p>
                        )}
                        {ogImage && (
                            <div style={{ position: 'relative', display: 'inline-block', marginTop: '0.55rem' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={ogImage}
                                    alt="Share preview"
                                    style={{ height: 60, borderRadius: 6, border: '1px solid var(--admin-border)', objectFit: 'cover', display: 'block' }}
                                />
                                <button
                                    type="button"
                                    title="Remove image"
                                    onClick={() => setOgImage('')}
                                    style={{
                                        position: 'absolute',
                                        top: -8,
                                        right: -8,
                                        width: 20,
                                        height: 20,
                                        borderRadius: '50%',
                                        background: 'var(--admin-sidebar)',
                                        color: '#fff',
                                        display: 'grid',
                                        placeItems: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="admin-flabel" htmlFor={`kw-${route.path}`}>Keywords (comma-separated)</label>
                        <input
                            id={`kw-${route.path}`}
                            name="keywords"
                            className="admin-input"
                            defaultValue={override?.keywords ?? ''}
                            placeholder="craft vodka, small-batch spirits"
                        />
                    </div>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <input type="checkbox" name="noindex" defaultChecked={override?.noindex ?? false} />
                    Hide this page from search engines (noindex)
                </label>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button type="submit" className="admin-btn admin-btn-primary" disabled={pending}>
                        {pending ? <Loader2 size={16} className="admin-spin" /> : <Save size={16} />}
                        Save
                    </button>
                    {state && (
                        <span
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                fontSize: '0.85rem',
                                color: state.ok ? 'var(--admin-success)' : 'var(--admin-danger)',
                            }}
                        >
                            {state.ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                            {state.message}
                        </span>
                    )}
                </div>
            </form>
        </details>
    );
}
