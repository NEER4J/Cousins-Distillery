'use client';

import { useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase/client';
import { setupAdminPassword } from './actions';
import { Lock, Loader2 } from 'lucide-react';

type Mode = 'signin' | 'setup';

export default function AdminLoginPage() {
    const [mode, setMode] = useState<Mode>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [notice, setNotice] = useState<string | null>(null);

    const redirectTarget = () => {
        if (typeof window === 'undefined') return '/admin';
        const from = new URLSearchParams(window.location.search).get('redirectedFrom');
        return from && from.startsWith('/admin') && from !== '/admin/login' ? from : '/admin';
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setNotice(null);
        setBusy(true);

        try {
            if (mode === 'setup') {
                const res = await setupAdminPassword(email, password);
                if (!res.success) {
                    setError(res.message);
                    setBusy(false);
                    return;
                }
                setNotice(res.message);
            }

            const supabase = createBrowserSupabase();
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: email.toLowerCase().trim(),
                password,
            });

            if (signInError) {
                setError(
                    signInError.message.toLowerCase().includes('invalid')
                        ? 'Incorrect email or password.'
                        : signInError.message
                );
                setBusy(false);
                return;
            }

            // Full navigation so middleware picks up the fresh session cookie.
            window.location.assign(redirectTarget());
        } catch {
            setError('Something went wrong. Please try again.');
            setBusy(false);
        }
    }

    return (
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '1.5rem' }}>
            <div className="admin-card" style={{ width: '100%', maxWidth: 400, padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <span
                        style={{
                            display: 'grid',
                            placeItems: 'center',
                            width: 36,
                            height: 36,
                            borderRadius: 9,
                            background: 'var(--admin-accent-weak)',
                            color: 'var(--admin-accent)',
                        }}
                    >
                        <Lock size={18} />
                    </span>
                    <div>
                        <h1 style={{ fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.1 }}>Cousins CMS</h1>
                        <p style={{ fontSize: '0.78rem', color: 'var(--admin-muted)' }}>
                            {mode === 'signin' ? 'Sign in to continue' : 'Set up your admin password'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ marginTop: '1.25rem', display: 'grid', gap: '0.85rem' }}>
                    <label style={{ display: 'grid', gap: '0.3rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--admin-muted)' }}>Email</span>
                        <input
                            className="admin-input"
                            type="email"
                            autoComplete="username"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                    </label>

                    <label style={{ display: 'grid', gap: '0.3rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--admin-muted)' }}>Password</span>
                        <input
                            className="admin-input"
                            type="password"
                            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                            required
                            minLength={8}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={mode === 'setup' ? 'At least 8 characters' : '••••••••'}
                        />
                    </label>

                    {error && (
                        <p style={{ fontSize: '0.8rem', color: 'var(--admin-danger)' }}>{error}</p>
                    )}
                    {notice && (
                        <p style={{ fontSize: '0.8rem', color: 'var(--admin-success)' }}>{notice}</p>
                    )}

                    <button type="submit" className="admin-btn admin-btn-primary" disabled={busy} style={{ marginTop: '0.25rem' }}>
                        {busy && <Loader2 size={16} className="admin-spin" />}
                        {mode === 'signin' ? 'Sign in' : 'Create & sign in'}
                    </button>
                </form>

                <div style={{ marginTop: '1rem', fontSize: '0.78rem', color: 'var(--admin-muted)', textAlign: 'center' }}>
                    {mode === 'signin' ? (
                        <>
                            First time here?{' '}
                            <button
                                type="button"
                                onClick={() => { setMode('setup'); setError(null); setNotice(null); }}
                                style={{ color: 'var(--admin-accent)', fontWeight: 500 }}
                            >
                                Set your password
                            </button>
                        </>
                    ) : (
                        <>
                            Already set up?{' '}
                            <button
                                type="button"
                                onClick={() => { setMode('signin'); setError(null); setNotice(null); }}
                                style={{ color: 'var(--admin-accent)', fontWeight: 500 }}
                            >
                                Sign in
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
