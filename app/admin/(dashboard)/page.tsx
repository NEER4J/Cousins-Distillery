import Link from 'next/link';
import { getSubmissionStats, getRecentContacts, type ContactSubmission, type SubmissionStats } from '@/lib/cms/submissions';
import { ErrorNote } from '../_components/ErrorNote';
import { formatDate } from '@/lib/cms/format';
import { Mail, Users, ShoppingBag, Code2, Search, ArrowRight } from 'lucide-react';

export default async function DashboardPage() {
    let stats: SubmissionStats | null = null;
    let recent: ContactSubmission[] = [];
    let loadError = false;

    try {
        [stats, recent] = await Promise.all([getSubmissionStats(), getRecentContacts(6)]);
    } catch {
        loadError = true;
    }

    const cards = stats
        ? [
              { label: 'Contact Forms', href: '/admin/submissions/contacts', icon: Mail, ...stats.contacts },
              { label: 'Newsletter Subscribers', href: '/admin/submissions/newsletter', icon: Users, ...stats.newsletter },
              { label: 'Orders', href: '/admin/submissions/orders', icon: ShoppingBag, ...stats.orders },
          ]
        : [];

    return (
        <div style={{ display: 'grid', gap: '1.75rem' }}>
            <div>
                <h1 className="admin-h1">Dashboard</h1>
                <p className="admin-sub">Overview of your site&rsquo;s activity.</p>
            </div>

            {loadError && (
                <ErrorNote title="Couldn't load submission stats">
                    Add <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env.local</code> and run the CMS
                    migrations in the Supabase SQL Editor, then reload this page.
                </ErrorNote>
            )}

            {stats && (
                <div className="admin-stat-grid">
                    {cards.map((c) => {
                        const Icon = c.icon;
                        return (
                            <Link key={c.href} href={c.href} className="admin-card admin-stat" style={{ display: 'block' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Icon size={20} style={{ color: 'var(--admin-accent)' }} />
                                    {c.unread > 0 && (
                                        <span
                                            className="admin-badge"
                                            style={{ background: 'var(--admin-accent-weak)', color: '#8a6d2f' }}
                                        >
                                            {c.unread} new
                                        </span>
                                    )}
                                </div>
                                <div className="admin-stat-value" style={{ marginTop: '0.6rem' }}>{c.total}</div>
                                <div className="admin-stat-label">{c.label}</div>
                            </Link>
                        );
                    })}
                </div>
            )}

            <div className="admin-card" style={{ overflow: 'hidden' }}>
                <div style={{ padding: '0.95rem 1.25rem', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.92rem' }}>Recent contact messages</strong>
                    <Link href="/admin/submissions/contacts" style={{ fontSize: '0.8rem', color: 'var(--admin-accent)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        View all <ArrowRight size={14} />
                    </Link>
                </div>
                {recent.length === 0 ? (
                    <p style={{ padding: '1.25rem', fontSize: '0.85rem', color: 'var(--admin-muted)' }}>
                        No contact messages yet.
                    </p>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Subject</th>
                                <th>Received</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recent.map((r) => (
                                <tr key={r.id}>
                                    <td>
                                        <div style={{ fontWeight: r.is_read ? 400 : 600 }}>{r.name}</div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--admin-muted)' }}>{r.email}</div>
                                    </td>
                                    <td style={{ maxWidth: 320 }}>{r.subject}</td>
                                    <td style={{ whiteSpace: 'nowrap', color: 'var(--admin-muted)' }}>{formatDate(r.created_at)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <Link href="/admin/scripts" className="admin-card" style={{ padding: '1.1rem 1.25rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <Code2 size={20} style={{ color: 'var(--admin-accent)' }} />
                    <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Custom Scripts</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--admin-muted)' }}>Header, body &amp; footer code</div>
                    </div>
                </Link>
                <Link href="/admin/seo" className="admin-card" style={{ padding: '1.1rem 1.25rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <Search size={20} style={{ color: 'var(--admin-accent)' }} />
                    <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>SEO</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--admin-muted)' }}>Per-page titles &amp; meta</div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
