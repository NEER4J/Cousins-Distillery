import { requireAdmin } from '@/lib/auth/requireAdmin';
import { listSubscribers, type NewsletterSubscriber } from '@/lib/cms/submissions';
import { NewsletterList } from '../../../_components/NewsletterList';
import { ErrorNote } from '../../../_components/ErrorNote';
import { InboxToolbar } from '../../../_components/InboxToolbar';

export default async function NewsletterPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    await requireAdmin();
    const { q } = await searchParams;

    let rows: NewsletterSubscriber[] = [];
    let loadError = false;
    try {
        rows = await listSubscribers(q);
    } catch {
        loadError = true;
    }

    return (
        <div>
            <div style={{ marginBottom: '1.25rem' }}>
                <h1 className="admin-h1">Newsletter Subscribers</h1>
                <p className="admin-sub">{rows.length} subscriber{rows.length === 1 ? '' : 's'}{q ? ` matching “${q}”` : ''}.</p>
            </div>

            <InboxToolbar
                query={q}
                placeholder="Search by email…"
                exportHref={`/admin/submissions/export/newsletter${q ? `?q=${encodeURIComponent(q)}` : ''}`}
            />

            {loadError ? (
                <ErrorNote />
            ) : rows.length === 0 ? (
                <p style={{ color: 'var(--admin-muted)', fontSize: '0.9rem' }}>No subscribers found.</p>
            ) : (
                <NewsletterList rows={rows} />
            )}
        </div>
    );
}
