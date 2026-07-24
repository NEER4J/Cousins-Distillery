import { requireAdmin } from '@/lib/auth/requireAdmin';
import { listOrders, type Order } from '@/lib/cms/submissions';
import { OrdersList } from '../../../_components/OrdersList';
import { ErrorNote } from '../../../_components/ErrorNote';
import { InboxToolbar } from '../../../_components/InboxToolbar';

export default async function OrdersPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; status?: string }>;
}) {
    await requireAdmin();
    const { q, status } = await searchParams;

    let rows: Order[] = [];
    let loadError = false;
    try {
        rows = await listOrders(q, status);
    } catch {
        loadError = true;
    }

    const statusFilter = (
        <select className="admin-input" name="status" defaultValue={status ?? ''} style={{ width: 'auto' }}>
            <option value="">All statuses</option>
            <option value="new">New</option>
            <option value="processing">Processing</option>
            <option value="fulfilled">Fulfilled</option>
            <option value="cancelled">Cancelled</option>
        </select>
    );

    const exportQs = new URLSearchParams();
    if (q) exportQs.set('q', q);
    if (status) exportQs.set('status', status);

    return (
        <div>
            <div style={{ marginBottom: '1.25rem' }}>
                <h1 className="admin-h1">Orders</h1>
                <p className="admin-sub">{rows.length} order{rows.length === 1 ? '' : 's'}{q ? ` matching “${q}”` : ''}.</p>
            </div>

            <InboxToolbar
                query={q}
                placeholder="Search name, email or product…"
                exportHref={`/admin/submissions/export/orders${exportQs.toString() ? `?${exportQs}` : ''}`}
                extra={statusFilter}
            />

            {loadError ? (
                <ErrorNote />
            ) : rows.length === 0 ? (
                <p style={{ color: 'var(--admin-muted)', fontSize: '0.9rem' }}>No orders found.</p>
            ) : (
                <OrdersList rows={rows} />
            )}
        </div>
    );
}
