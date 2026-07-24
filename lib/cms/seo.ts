import type { Metadata } from 'next';
import { getSupabaseClient } from '@/lib/supabase';

export interface SeoOverride {
    path: string;
    title: string | null;
    description: string | null;
    og_image: string | null;
    keywords: string | null;
    noindex: boolean;
}

export interface KnownRoute {
    path: string;
    label: string;
}

/** Every route the SEO editor can manage. */
export const KNOWN_ROUTES: KnownRoute[] = [
    { path: '/', label: 'Home' },
    { path: '/whiskey', label: 'Whiskey' },
    { path: '/tequila', label: 'Tequila' },
    { path: '/vodka', label: 'Vodka' },
    { path: '/blue-agave-spirit', label: 'Blue Agave Spirit' },
    { path: '/shop', label: 'Shop' },
    { path: '/shop/order', label: 'Place an Order' },
    { path: '/contact', label: 'Contact' },
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms & Conditions' },
    { path: '/coming-soon', label: 'Coming Soon' },
];

/** Fresh (uncached) read of all overrides — used by the admin editor. */
export async function fetchSeoOverrides(): Promise<Record<string, SeoOverride>> {
    try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
            .from('seo_settings')
            .select('path, title, description, og_image, keywords, noindex');
        if (error || !data) return {};
        const map: Record<string, SeoOverride> = {};
        for (const row of data) map[row.path] = row as SeoOverride;
        return map;
    } catch {
        // Table may not exist yet (migrations not run) — behave as "no overrides".
        return {};
    }
}

export async function getSeoOverride(path: string): Promise<SeoOverride | null> {
    const all = await fetchSeoOverrides();
    return all[path] ?? null;
}

/**
 * Merge a CMS SEO override on top of a route's hardcoded metadata.
 * Any field the admin left blank falls back to the code-defined value, so
 * nothing regresses when there's no override.
 */
export async function buildMetadata(path: string, fallback: Metadata): Promise<Metadata> {
    const o = await getSeoOverride(path);
    if (!o) return fallback;

    const meta: Metadata = { ...fallback };

    if (o.title) meta.title = { absolute: o.title };
    if (o.description) meta.description = o.description;
    if (o.keywords) {
        meta.keywords = o.keywords
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
    }

    const ogFallback = (fallback.openGraph ?? {}) as Record<string, unknown>;
    meta.openGraph = {
        ...ogFallback,
        ...(o.title ? { title: o.title } : {}),
        ...(o.description ? { description: o.description } : {}),
        ...(o.og_image ? { images: [{ url: o.og_image }] } : {}),
    };

    const twFallback = (fallback.twitter ?? {}) as Record<string, unknown>;
    meta.twitter = {
        ...twFallback,
        ...(o.title ? { title: o.title } : {}),
        ...(o.description ? { description: o.description } : {}),
        ...(o.og_image ? { images: [o.og_image] } : {}),
    };

    if (o.noindex) {
        meta.robots = { index: false, follow: false };
    }

    return meta;
}
