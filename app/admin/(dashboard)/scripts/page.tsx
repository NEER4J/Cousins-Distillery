import { requireSection } from '@/lib/auth/requireAdmin';
import { createAdminSupabase } from '@/lib/supabase/admin';
import { ScriptsForm } from './ScriptsForm';
import { ErrorNote } from '../../_components/ErrorNote';

export default async function ScriptsPage() {
    await requireSection('scripts');

    let initial = { header_scripts: '', body_start_scripts: '', footer_scripts: '' };
    let loadError = false;

    try {
        const admin = createAdminSupabase();
        const { data, error } = await admin
            .from('site_settings')
            .select('header_scripts, body_start_scripts, footer_scripts')
            .eq('id', 1)
            .maybeSingle();
        if (error) throw error;
        if (data) {
            initial = {
                header_scripts: data.header_scripts ?? '',
                body_start_scripts: data.body_start_scripts ?? '',
                footer_scripts: data.footer_scripts ?? '',
            };
        }
    } catch {
        loadError = true;
    }

    return (
        <div>
            <div style={{ marginBottom: '1.25rem' }}>
                <h1 className="admin-h1">Custom Scripts</h1>
                <p className="admin-sub">
                    Add tracking, analytics and third-party code to every page — like the WordPress
                    &ldquo;Insert Headers and Footers&rdquo; plugin. Scripts run on the public site only, never in this admin.
                </p>
            </div>

            {loadError ? (
                <ErrorNote title="Couldn't load current scripts" />
            ) : (
                <ScriptsForm initial={initial} />
            )}
        </div>
    );
}
