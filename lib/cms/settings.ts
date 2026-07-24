import { getSupabaseClient } from '@/lib/supabase';

export interface SiteSettings {
    header_scripts: string;
    body_start_scripts: string;
    footer_scripts: string;
}

const EMPTY: SiteSettings = {
    header_scripts: '',
    body_start_scripts: '',
    footer_scripts: '',
};

/**
 * Read the site's custom scripts. Read directly (no cache) so an admin save is
 * reflected on the next request. Fails soft to empty if the table is missing.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
    try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
            .from('site_settings')
            .select('header_scripts, body_start_scripts, footer_scripts')
            .eq('id', 1)
            .maybeSingle();

        if (error || !data) return EMPTY;

        return {
            header_scripts: data.header_scripts ?? '',
            body_start_scripts: data.body_start_scripts ?? '',
            footer_scripts: data.footer_scripts ?? '',
        };
    } catch {
        return EMPTY;
    }
}
