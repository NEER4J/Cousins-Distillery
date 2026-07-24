import 'server-only';

import { createAdminSupabase } from '@/lib/supabase/admin';

export type SubmissionTable =
    | 'contact_submissions'
    | 'newsletter_subscribers'
    | 'orders';

export const SUBMISSION_TABLES: SubmissionTable[] = [
    'contact_submissions',
    'newsletter_subscribers',
    'orders',
];

export interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

export interface NewsletterSubscriber {
    id: string;
    email: string;
    is_read: boolean;
    created_at: string;
}

export interface Order {
    id: string;
    name: string;
    email: string;
    phone: string;
    product_slug: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    address_line1: string;
    address_line2: string | null;
    city: string;
    province: string;
    postal_code: string;
    country: string;
    notes: string | null;
    status: string;
    is_read: boolean;
    created_at: string;
}

export interface TableStat {
    total: number;
    unread: number;
}

async function countTable(table: SubmissionTable): Promise<TableStat> {
    const admin = createAdminSupabase();
    const [{ count: total }, { count: unread }] = await Promise.all([
        admin.from(table).select('*', { count: 'exact', head: true }),
        admin.from(table).select('*', { count: 'exact', head: true }).eq('is_read', false),
    ]);
    return { total: total ?? 0, unread: unread ?? 0 };
}

export interface SubmissionStats {
    contacts: TableStat;
    newsletter: TableStat;
    orders: TableStat;
}

export async function getSubmissionStats(): Promise<SubmissionStats> {
    const [contacts, newsletter, orders] = await Promise.all([
        countTable('contact_submissions'),
        countTable('newsletter_subscribers'),
        countTable('orders'),
    ]);
    return { contacts, newsletter, orders };
}

const like = (v: string) => `%${v.replace(/[%_,]/g, '')}%`;

export async function listContacts(search?: string): Promise<ContactSubmission[]> {
    const admin = createAdminSupabase();
    let q = admin
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500);
    if (search?.trim()) {
        const s = like(search.trim());
        q = q.or(`name.ilike.${s},email.ilike.${s},subject.ilike.${s},message.ilike.${s}`);
    }
    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as ContactSubmission[];
}

export async function listSubscribers(search?: string): Promise<NewsletterSubscriber[]> {
    const admin = createAdminSupabase();
    let q = admin
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(2000);
    if (search?.trim()) {
        q = q.ilike('email', like(search.trim()));
    }
    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as NewsletterSubscriber[];
}

export async function listOrders(search?: string, status?: string): Promise<Order[]> {
    const admin = createAdminSupabase();
    let q = admin
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500);
    if (search?.trim()) {
        const s = like(search.trim());
        q = q.or(`name.ilike.${s},email.ilike.${s},product_name.ilike.${s}`);
    }
    if (status?.trim()) {
        q = q.eq('status', status.trim());
    }
    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as Order[];
}

export async function getRecentContacts(limit = 5): Promise<ContactSubmission[]> {
    const admin = createAdminSupabase();
    const { data, error } = await admin
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
    if (error) throw error;
    return (data ?? []) as ContactSubmission[];
}
