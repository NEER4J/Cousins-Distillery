'use client';

import { useTransition } from 'react';
import { RowActions } from './RowActions';
import { useSelection, SelectAll, BulkBar } from './Selection';
import { bulkSetReadState, bulkDelete } from '../(dashboard)/submissions/actions';
import { formatDate } from '@/lib/cms/format';
import type { ContactSubmission } from '@/lib/cms/submissions';

const TABLE = 'contact_submissions';

export function ContactsList({ rows }: { rows: ContactSubmission[] }) {
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
                {rows.map((r) => {
                    const isSel = sel.selected.has(r.id);
                    return (
                        <div
                            key={r.id}
                            className="admin-scard"
                            data-unread={!r.is_read}
                            data-selected={isSel}
                        >
                            <div className="admin-scard-header">
                                <div className="admin-scard-hl">
                                    <input
                                        type="checkbox"
                                        className="admin-check"
                                        checked={isSel}
                                        onChange={() => sel.toggle(r.id)}
                                        aria-label={`Select message from ${r.name}`}
                                    />
                                    {!r.is_read && <span className="admin-dot" />}
                                    <span style={{ fontWeight: r.is_read ? 500 : 600, fontSize: '0.95rem' }}>{r.name}</span>
                                    {!r.is_read && (
                                        <span className="admin-badge" style={{ background: 'var(--admin-accent-weak)', color: '#8a6d2f' }}>
                                            New
                                        </span>
                                    )}
                                </div>
                                <div className="admin-scard-hr">
                                    <span style={{ fontSize: '0.78rem', color: 'var(--admin-muted)', whiteSpace: 'nowrap' }}>
                                        {formatDate(r.created_at)}
                                    </span>
                                    <RowActions table={TABLE} id={r.id} isRead={r.is_read} />
                                </div>
                            </div>

                            <div className="admin-scard-body">
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'max-content 1fr',
                                        columnGap: '1.1rem',
                                        rowGap: '0.5rem',
                                        fontSize: '0.88rem',
                                        alignItems: 'baseline',
                                    }}
                                >
                                    <span className="admin-cardlabel" style={{ margin: 0 }}>Email</span>
                                    <a href={`mailto:${r.email}`} style={{ color: 'var(--admin-accent)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {r.email}
                                    </a>
                                    <span className="admin-cardlabel" style={{ margin: 0 }}>Subject</span>
                                    <span style={{ fontWeight: 500 }}>{r.subject}</span>
                                    <span className="admin-cardlabel" style={{ margin: 0 }}>Message</span>
                                    <span style={{ color: '#344054', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{r.message}</span>
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
                    if (confirm(`Delete ${sel.selected.size} message(s) permanently?`)) {
                        runBulk(() => bulkDelete(TABLE, chosen()));
                    }
                }}
                onClear={sel.clear}
            />
        </>
    );
}
