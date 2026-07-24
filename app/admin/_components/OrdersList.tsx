'use client';

import { useTransition } from 'react';
import { RowActions, OrderStatusSelect } from './RowActions';
import { useSelection, SelectAll, BulkBar } from './Selection';
import { bulkSetReadState, bulkDelete } from '../(dashboard)/submissions/actions';
import { formatDate, formatMoney } from '@/lib/cms/format';
import type { Order } from '@/lib/cms/submissions';

const TABLE = 'orders';

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
    new: { bg: 'var(--admin-accent-weak)', color: '#8a6d2f' },
    processing: { bg: '#eff8ff', color: '#175cd3' },
    fulfilled: { bg: '#ecfdf3', color: 'var(--admin-success)' },
    cancelled: { bg: '#fef3f2', color: 'var(--admin-danger)' },
};

export function OrdersList({ rows }: { rows: Order[] }) {
    const ids = rows.map((r) => r.id);
    const sel = useSelection(ids);
    const [pending, start] = useTransition();

    const runBulk = (fn: () => Promise<void>) =>
        start(async () => {
            await fn();
            sel.clear();
        });

    const chosen = () => [...sel.selected];

    return (
        <>
            {rows.length > 1 && (
                <div style={{ marginBottom: '0.75rem' }}>
                    <SelectAll
                        allSelected={sel.allSelected}
                        someSelected={sel.someSelected}
                        onToggle={sel.toggleAll}
                        label={sel.selected.size ? `${sel.selected.size} selected` : 'Select all'}
                    />
                </div>
            )}

            <div style={{ display: 'grid', gap: '0.85rem' }}>
                {rows.map((o) => {
                    const sc = STATUS_COLORS[o.status] ?? STATUS_COLORS.new;
                    const isSel = sel.selected.has(o.id);
                    return (
                        <div
                            key={o.id}
                            className="admin-scard"
                            data-unread={!o.is_read}
                            data-selected={isSel}
                        >
                            <div className="admin-scard-header">
                                <div className="admin-scard-hl">
                                    <input
                                        type="checkbox"
                                        className="admin-check"
                                        checked={isSel}
                                        onChange={() => sel.toggle(o.id)}
                                        aria-label={`Select order from ${o.name}`}
                                    />
                                    {!o.is_read && <span className="admin-dot" />}
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                                                {o.product_name}{' '}
                                                <span style={{ color: 'var(--admin-muted)', fontWeight: 400 }}>× {o.quantity}</span>
                                            </span>
                                            <span className="admin-badge" style={sc}>{o.status}</span>
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--admin-muted)' }}>
                                            {formatMoney(o.total_price)} total · {formatMoney(o.unit_price)} each
                                        </div>
                                    </div>
                                </div>
                                <div className="admin-scard-hr">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <span className="admin-cardlabel" style={{ margin: 0 }}>Status</span>
                                        <OrderStatusSelect id={o.id} status={o.status} />
                                    </div>
                                    <RowActions table={TABLE} id={o.id} isRead={o.is_read} />
                                </div>
                            </div>

                            <div className="admin-scard-body">
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                        gap: '0.75rem 1.5rem',
                                        fontSize: '0.85rem',
                                    }}
                                >
                                    <div>
                                        <div className="admin-cardlabel">Customer</div>
                                        <div style={{ fontWeight: 500 }}>{o.name}</div>
                                        <a href={`mailto:${o.email}`} style={{ color: 'var(--admin-accent)', display: 'block' }}>{o.email}</a>
                                        <a href={`tel:${o.phone}`} style={{ color: 'inherit' }}>{o.phone}</a>
                                    </div>
                                    <div>
                                        <div className="admin-cardlabel">Ship to</div>
                                        <div style={{ lineHeight: 1.55 }}>
                                            {o.address_line1}
                                            {o.address_line2 ? <>, {o.address_line2}</> : null}
                                            <br />
                                            {o.city}, {o.province} {o.postal_code}
                                            <br />
                                            {o.country}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="admin-cardlabel">Placed</div>
                                        <div>{formatDate(o.created_at)}</div>
                                        {o.notes ? (
                                            <div style={{ marginTop: '0.4rem', color: '#344054' }}>
                                                <span style={{ color: 'var(--admin-muted)' }}>Notes:</span> {o.notes}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <BulkBar
                count={sel.selected.size}
                pending={pending}
                onMarkRead={() => runBulk(() => bulkSetReadState(TABLE, chosen(), true))}
                onMarkUnread={() => runBulk(() => bulkSetReadState(TABLE, chosen(), false))}
                onDelete={() => {
                    if (confirm(`Delete ${sel.selected.size} order(s) permanently?`)) {
                        runBulk(() => bulkDelete(TABLE, chosen()));
                    }
                }}
                onClear={sel.clear}
            />
        </>
    );
}
