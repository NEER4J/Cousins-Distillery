import { requireAdmin } from '@/lib/auth/requireAdmin';
import { KNOWN_ROUTES, fetchSeoOverrides, type SeoOverride } from '@/lib/cms/seo';
import { SeoRouteCard } from './SeoRouteCard';
import { ErrorNote } from '../../_components/ErrorNote';

export default async function SeoPage() {
    await requireAdmin();

    let overrides: Record<string, SeoOverride> = {};
    let loadError = false;
    try {
        overrides = await fetchSeoOverrides();
    } catch {
        loadError = true;
    }

    return (
        <div>
            <div style={{ marginBottom: '1.25rem' }}>
                <h1 className="admin-h1">SEO</h1>
                <p className="admin-sub">
                    Override the title, description, social image and indexing for any page. Blank fields
                    keep the site&rsquo;s built-in defaults.
                </p>
            </div>

            {loadError ? (
                <ErrorNote title="Couldn't load SEO settings" />
            ) : (
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {KNOWN_ROUTES.map((route) => (
                        <SeoRouteCard key={route.path} route={route} override={overrides[route.path] ?? null} />
                    ))}
                </div>
            )}
        </div>
    );
}
