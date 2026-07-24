import { Download, Search } from 'lucide-react';

/**
 * Search (GET form) + CSV export row shared by the submission inboxes.
 * `extra` lets a page add more form fields (e.g. an order status filter).
 */
export function InboxToolbar({
    query,
    placeholder,
    exportHref,
    extra,
}: {
    query?: string;
    placeholder: string;
    exportHref: string;
    extra?: React.ReactNode;
}) {
    return (
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.1rem' }}>
            <form style={{ flex: '1 1 260px', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search
                        size={15}
                        style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-muted)' }}
                    />
                    <input
                        className="admin-input"
                        name="q"
                        defaultValue={query ?? ''}
                        placeholder={placeholder}
                        style={{ paddingLeft: '2rem' }}
                    />
                </div>
                {extra}
                <button type="submit" className="admin-btn admin-btn-ghost">
                    Search
                </button>
            </form>
            <a href={exportHref} className="admin-btn admin-btn-ghost">
                <Download size={15} />
                Export CSV
            </a>
        </div>
    );
}
