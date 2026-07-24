import { requireAdmin } from '@/lib/auth/requireAdmin';
import { ROLE_LABELS } from '@/lib/auth/roles';
import { signOut } from '../actions';
import { AdminSidebar } from '../_components/AdminSidebar';
import { LogOut } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const admin = await requireAdmin();

    return (
        <div className="admin-shell">
            <AdminSidebar role={admin.role} />

            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <header className="admin-topbar">
                    <div style={{ fontSize: '0.82rem', color: 'var(--admin-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Signed in as <strong style={{ color: 'var(--admin-text)' }}>{admin.email}</strong>
                        <span className="admin-badge" style={{ background: 'var(--admin-accent-weak)', color: '#8a6d2f' }}>
                            {ROLE_LABELS[admin.role]}
                        </span>
                    </div>
                    <form action={signOut}>
                        <button type="submit" className="admin-btn admin-btn-ghost" style={{ padding: '0.4rem 0.8rem' }}>
                            <LogOut size={15} />
                            Sign out
                        </button>
                    </form>
                </header>

                <main className="admin-content">{children}</main>
            </div>
        </div>
    );
}
