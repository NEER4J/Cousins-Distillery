'use client';

import { useTransition } from 'react';
import { RowActions } from './RowActions';
import { useSelection, BulkBar } from './Selection';
import { bulkSetReadState, bulkDelete } from '../(dashboard)/submissions/actions';
import { formatDate } from '@/lib/cms/format';
import type { NewsletterSubscriber } from '@/lib/cms/submissions';

const TABLE = 'newsletter_subscribers';

export function NewsletterList({ rows }: { rows: NewsletterSubscriber[] }) {
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
            <div className="admin-card" style={{ overflow: 'hidden' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th style={{ width: 40 }}>
                                <input
                                    type="checkbox"
                                    className="admin-check"
                                    checked={sel.allSelected}
                                    ref={(el) => {
                                        if (el) el.indeterminate = sel.someSelected;
                                    }}
                                    onChange={sel.toggleAll}
                                    aria-label="Select all subscribers"
                                />
                            </th>
                            <th>Email</th>
                            <th>Subscribed</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r) => (
                            <tr key={r.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        className="admin-check"
                                        checked={sel.selected.has(r.id)}
                                        onChange={() => sel.toggle(r.id)}
                                        aria-label={`Select ${r.email}`}
                                    />
                                </td>
                                <td style={{ fontWeight: r.is_read ? 400 : 600 }}>
                                    <a href={`mailto:${r.email}`} style={{ color: 'inherit' }}>{r.email}</a>
                                </td>
                                <td style={{ whiteSpace: 'nowrap', color: 'var(--admin-muted)' }}>{formatDate(r.created_at)}</td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <RowActions table={TABLE} id={r.id} isRead={r.is_read} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <BulkBar
                count={sel.selected.size}
                pending={pending}
                onMarkRead={() => runBulk(() => bulkSetReadState(TABLE, chosen(), true))}
                onMarkUnread={() => runBulk(() => bulkSetReadState(TABLE, chosen(), false))}
                onDelete={() => {
                    if (confirm(`Remove ${sel.selected.size} subscriber(s)?`)) {
                        runBulk(() => bulkDelete(TABLE, chosen()));
                    }
                }}
                onClear={sel.clear}
            />
        </>
    );
}
