'use client';

import { useActionState } from 'react';
import { saveScripts, type ScriptsFormState } from './actions';
import { Loader2, CheckCircle2, AlertCircle, Save } from 'lucide-react';

interface Field {
    name: 'header_scripts' | 'body_start_scripts' | 'footer_scripts';
    label: string;
    hint: string;
    placeholder: string;
}

const FIELDS: Field[] = [
    {
        name: 'header_scripts',
        label: 'Header',
        hint: 'Injected into <head> on every page. Use for analytics, verification <meta> tags, and custom <style>.',
        placeholder: '<!-- e.g. Google Analytics, site verification meta tags -->',
    },
    {
        name: 'body_start_scripts',
        label: 'Body (after opening tag)',
        hint: 'Injected immediately after <body> opens. Use for GTM <noscript> or chat widgets.',
        placeholder: '<!-- e.g. Google Tag Manager (noscript) -->',
    },
    {
        name: 'footer_scripts',
        label: 'Footer (before closing tag)',
        hint: 'Injected right before </body>. Use for deferred analytics or third-party scripts.',
        placeholder: '<!-- e.g. chat widget, tracking pixels -->',
    },
];

export function ScriptsForm({ initial }: { initial: Record<Field['name'], string> }) {
    const [state, formAction, pending] = useActionState<ScriptsFormState | null, FormData>(
        saveScripts,
        null
    );

    return (
        <form action={formAction} style={{ display: 'grid', gap: '1.25rem' }}>
            {FIELDS.map((f) => (
                <div key={f.name} className="admin-card" style={{ padding: '1.1rem 1.25rem' }}>
                    <label htmlFor={f.name} style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                        {f.label}
                    </label>
                    <p style={{ fontSize: '0.8rem', color: 'var(--admin-muted)', margin: '0.2rem 0 0.7rem', lineHeight: 1.55 }}>
                        {f.hint}
                    </p>
                    <textarea
                        id={f.name}
                        name={f.name}
                        className="admin-textarea"
                        rows={6}
                        defaultValue={initial[f.name]}
                        placeholder={f.placeholder}
                        spellCheck={false}
                    />
                </div>
            ))}

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={pending}>
                    {pending ? <Loader2 size={16} className="admin-spin" /> : <Save size={16} />}
                    Save changes
                </button>
                {state && (
                    <span
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontSize: '0.85rem',
                            color: state.ok ? 'var(--admin-success)' : 'var(--admin-danger)',
                        }}
                    >
                        {state.ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        {state.message}
                    </span>
                )}
            </div>
        </form>
    );
}
