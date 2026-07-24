'use client';

import { useCallback, useState } from 'react';
import { Eye, EyeOff, Trash2, X, Loader2 } from 'lucide-react';

/** Multi-select state for a list of items keyed by id. */
export function useSelection(ids: string[]) {
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const toggle = useCallback((id: string) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }, []);

    const toggleAll = useCallback(() => {
        setSelected((prev) => (prev.size === ids.length ? new Set() : new Set(ids)));
    }, [ids]);

    const clear = useCallback(() => setSelected(new Set()), []);

    const allSelected = ids.length > 0 && selected.size === ids.length;
    const someSelected = selected.size > 0 && !allSelected;

    return { selected, toggle, toggleAll, clear, allSelected, someSelected };
}

export function SelectAll({
    allSelected,
    someSelected,
    onToggle,
    label,
}: {
    allSelected: boolean;
    someSelected: boolean;
    onToggle: () => void;
    label: string;
}) {
    return (
        <label className="admin-selectall">
            <input
                type="checkbox"
                className="admin-check"
                checked={allSelected}
                ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                }}
                onChange={onToggle}
            />
            {label}
        </label>
    );
}

export function BulkBar({
    count,
    pending,
    onMarkRead,
    onMarkUnread,
    onDelete,
    onClear,
}: {
    count: number;
    pending: boolean;
    onMarkRead: () => void;
    onMarkUnread: () => void;
    onDelete: () => void;
    onClear: () => void;
}) {
    if (count === 0) return null;
    return (
        <div className="admin-bulkbar">
            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{count} selected</span>
            <span className="admin-bulkdiv" />
            {pending && <Loader2 size={15} className="admin-spin" />}
            <button type="button" className="admin-bulkbtn" disabled={pending} onClick={onMarkRead}>
                <Eye size={14} /> Mark read
            </button>
            <button type="button" className="admin-bulkbtn" disabled={pending} onClick={onMarkUnread}>
                <EyeOff size={14} /> Mark unread
            </button>
            <button
                type="button"
                className="admin-bulkbtn admin-bulkbtn-danger"
                disabled={pending}
                onClick={onDelete}
            >
                <Trash2 size={14} /> Delete
            </button>
            <span className="admin-bulkdiv" />
            <button type="button" className="admin-bulkbtn" title="Clear selection" onClick={onClear}>
                <X size={14} />
            </button>
        </div>
    );
}
