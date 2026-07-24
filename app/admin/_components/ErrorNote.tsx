import { AlertTriangle } from 'lucide-react';

/**
 * Friendly error/setup notice — shown when admin data can't be read (usually a
 * missing SUPABASE_SERVICE_ROLE_KEY or un-run migrations).
 */
export function ErrorNote({
    title = 'Could not load data',
    children,
}: {
    title?: string;
    children?: React.ReactNode;
}) {
    return (
        <div
            className="admin-card"
            style={{
                padding: '1.1rem 1.25rem',
                display: 'flex',
                gap: '0.8rem',
                background: '#fffaf5',
                borderColor: '#fed7aa',
            }}
        >
            <AlertTriangle size={20} style={{ color: '#c2410c', flexShrink: 0, marginTop: 2 }} />
            <div>
                <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{title}</p>
                <div style={{ fontSize: '0.85rem', color: 'var(--admin-muted)', lineHeight: 1.6 }}>
                    {children ?? (
                        <>
                            Make sure <code>SUPABASE_SERVICE_ROLE_KEY</code> is set in{' '}
                            <code>.env.local</code> and the CMS migrations have been run in the
                            Supabase SQL Editor.
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
