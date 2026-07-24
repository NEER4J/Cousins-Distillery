'use client';

import { useTransition } from 'react';
import { Eye, EyeOff, Trash2, Loader2 } from 'lucide-react';
import { setReadState, deleteSubmission, setOrderStatus } from '../(dashboard)/submissions/actions';

export function RowActions({
    table,
    id,
    isRead,
}: {
    table: string;
    id: string;
    isRead: boolean;
}) {
    const [pending, start] = useTransition();

    return (
        <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
                type="button"
                className="admin-btn admin-btn-ghost admin-btn-sm"
                disabled={pending}
                onClick={() => start(() => setReadState(table, id, !isRead))}
            >
                {isRead ? <EyeOff size={14} /> : <Eye size={14} />}
                {isRead ? 'Mark unread' : 'Mark read'}
            </button>
            <button
                type="button"
                className="admin-btn admin-btn-danger admin-btn-sm"
                disabled={pending}
                onClick={() => {
                    if (confirm('Delete this submission permanently? This cannot be undone.')) {
                        start(() => deleteSubmission(table, id));
                    }
                }}
            >
                {pending ? <Loader2 size={14} className="admin-spin" /> : <Trash2 size={14} />}
                Delete
            </button>
        </div>
    );
}

const STATUS_OPTIONS = [
    { value: 'new', label: 'New' },
    { value: 'processing', label: 'Processing' },
    { value: 'fulfilled', label: 'Fulfilled' },
    { value: 'cancelled', label: 'Cancelled' },
];

export function OrderStatusSelect({ id, status }: { id: string; status: string }) {
    const [pending, start] = useTransition();
    return (
        <select
            className="admin-input"
            style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem', width: 'auto' }}
            defaultValue={status}
            disabled={pending}
            onChange={(e) => {
                const value = e.target.value;
                start(() => setOrderStatus(id, value));
            }}
        >
            {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
    );
}
