'use client';

import { useActionState, useTransition, useState } from 'react';
import {
    createCmsUser,
    updateCmsUserRole,
    deleteCmsUser,
    setCmsUserPassword,
    type UserActionState,
} from './actions';
import { ROLES, ROLE_LABELS, ROLE_DESCRIPTIONS } from '@/lib/auth/roles';
import type { CmsUser } from '@/lib/cms/users';
import { formatDate } from '@/lib/cms/format';
import { UserPlus, Loader2, CheckCircle2, AlertCircle, KeyRound, Trash2 } from 'lucide-react';

function UserRow({ user, currentEmail }: { user: CmsUser; currentEmail: string }) {
    const [pending, start] = useTransition();
    const [msg, setMsg] = useState<string | null>(null);
    const isSelf = user.email.toLowerCase() === currentEmail.toLowerCase();

    const run = (fn: () => Promise<UserActionState>) =>
        start(async () => {
            const res = await fn();
            setMsg(res.message);
        });

    return (
        <tr>
            <td>
                <span style={{ fontWeight: 500 }}>{user.email}</span>
                {isSelf && <span style={{ color: 'var(--admin-muted)', fontSize: '0.78rem' }}> (you)</span>}
                {msg && <div style={{ fontSize: '0.75rem', color: 'var(--admin-muted)', marginTop: 2 }}>{msg}</div>}
            </td>
            <td>
                <select
                    className="admin-input"
                    style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem', width: 'auto' }}
                    defaultValue={user.role}
                    disabled={pending}
                    onChange={(e) => {
                        const role = e.target.value;
                        run(() => updateCmsUserRole(user.email, role));
                    }}
                >
                    {ROLES.map((r) => (
                        <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                    ))}
                </select>
            </td>
            <td style={{ whiteSpace: 'nowrap', color: 'var(--admin-muted)' }}>{formatDate(user.created_at)}</td>
            <td>
                <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                    <button
                        type="button"
                        className="admin-btn admin-btn-ghost admin-btn-sm"
                        disabled={pending}
                        onClick={() => {
                            const pw = window.prompt(`Set a new password for ${user.email} (min 8 chars):`);
                            if (pw) run(() => setCmsUserPassword(user.email, pw));
                        }}
                    >
                        <KeyRound size={14} /> Password
                    </button>
                    <button
                        type="button"
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        disabled={pending || isSelf}
                        title={isSelf ? "You can't remove yourself" : 'Remove user'}
                        onClick={() => {
                            if (confirm(`Remove ${user.email}? They will lose all access.`)) {
                                run(() => deleteCmsUser(user.email));
                            }
                        }}
                    >
                        {pending ? <Loader2 size={14} className="admin-spin" /> : <Trash2 size={14} />} Remove
                    </button>
                </div>
            </td>
        </tr>
    );
}

export function UsersManager({ users, currentEmail }: { users: CmsUser[]; currentEmail: string }) {
    const [state, formAction, pending] = useActionState<UserActionState | null, FormData>(
        createCmsUser,
        null
    );

    return (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
            {/* Add user */}
            <div className="admin-card" style={{ padding: '1.15rem 1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.9rem' }}>
                    <UserPlus size={18} style={{ color: 'var(--admin-accent)' }} />
                    <strong style={{ fontSize: '0.95rem' }}>Add a user</strong>
                </div>

                <form action={formAction} style={{ display: 'grid', gap: '0.9rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.9rem' }}>
                        <div>
                            <label className="admin-flabel" htmlFor="new-email">Email</label>
                            <input id="new-email" name="email" type="email" required className="admin-input" placeholder="person@example.com" />
                        </div>
                        <div>
                            <label className="admin-flabel" htmlFor="new-password">Password</label>
                            <input id="new-password" name="password" type="text" required minLength={8} className="admin-input" placeholder="At least 8 characters" />
                        </div>
                        <div>
                            <label className="admin-flabel" htmlFor="new-role">Role</label>
                            <select id="new-role" name="role" className="admin-input" defaultValue="editor">
                                {ROLES.map((r) => (
                                    <option key={r} value={r}>{ROLE_LABELS[r]} — {ROLE_DESCRIPTIONS[r]}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button type="submit" className="admin-btn admin-btn-primary" disabled={pending}>
                            {pending ? <Loader2 size={16} className="admin-spin" /> : <UserPlus size={16} />}
                            Add user
                        </button>
                        {state && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: state.ok ? 'var(--admin-success)' : 'var(--admin-danger)' }}>
                                {state.ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                {state.message}
                            </span>
                        )}
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--admin-muted)' }}>
                        The account is created ready to sign in — no email verification. Share the email &amp; password with them.
                    </p>
                </form>
            </div>

            {/* Existing users */}
            <div className="admin-card" style={{ overflow: 'hidden' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Added</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <UserRow key={u.email} user={u} currentEmail={currentEmail} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
