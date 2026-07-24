import { requireAdmin } from '@/lib/auth/requireAdmin';
import { listContacts, type ContactSubmission } from '@/lib/cms/submissions';
import { ContactsList } from '../../../_components/ContactsList';
import { ErrorNote } from '../../../_components/ErrorNote';
import { InboxToolbar } from '../../../_components/InboxToolbar';

export default async function ContactsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    await requireAdmin();
    const { q } = await searchParams;

    let rows: ContactSubmission[] = [];
    let loadError = false;
    try {
        rows = await listContacts(q);
    } catch {
        loadError = true;
    }

    return (
        <div>
            <div style={{ marginBottom: '1.25rem' }}>
                <h1 className="admin-h1">Contact Forms</h1>
                <p className="admin-sub">{rows.length} message{rows.length === 1 ? '' : 's'}{q ? ` matching “${q}”` : ''}.</p>
            </div>

            <InboxToolbar
                query={q}
                placeholder="Search name, email, subject or message…"
                exportHref={`/admin/submissions/export/contacts${q ? `?q=${encodeURIComponent(q)}` : ''}`}
            />

            {loadError ? (
                <ErrorNote />
            ) : rows.length === 0 ? (
                <p style={{ color: 'var(--admin-muted)', fontSize: '0.9rem' }}>No messages found.</p>
            ) : (
                <ContactsList rows={rows} />
            )}
        </div>
    );
}
