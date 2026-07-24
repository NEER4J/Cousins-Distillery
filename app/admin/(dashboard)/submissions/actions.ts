'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { createAdminSupabase } from '@/lib/supabase/admin';
import { SUBMISSION_TABLES, type SubmissionTable } from '@/lib/cms/submissions';

const ORDER_STATUSES = ['new', 'processing', 'fulfilled', 'cancelled'] as const;

function assertTable(table: string): SubmissionTable {
    if (!SUBMISSION_TABLES.includes(table as SubmissionTable)) {
        throw new Error(`Invalid submissions table: ${table}`);
    }
    return table as SubmissionTable;
}

export async function setReadState(table: string, id: string, isRead: boolean): Promise<void> {
    await requireAdmin();
    const t = assertTable(table);
    const admin = createAdminSupabase();
    const { error } = await admin
        .from(t)
        .update({ is_read: isRead, updated_at: new Date().toISOString() })
        .eq('id', id);
    if (error) throw error;
    revalidatePath('/admin', 'layout');
}

export async function deleteSubmission(table: string, id: string): Promise<void> {
    await requireAdmin();
    const t = assertTable(table);
    const admin = createAdminSupabase();
    const { error } = await admin.from(t).delete().eq('id', id);
    if (error) throw error;
    revalidatePath('/admin', 'layout');
}

export async function bulkSetReadState(
    table: string,
    ids: string[],
    isRead: boolean
): Promise<void> {
    await requireAdmin();
    const t = assertTable(table);
    if (!ids.length) return;
    const admin = createAdminSupabase();
    const { error } = await admin
        .from(t)
        .update({ is_read: isRead, updated_at: new Date().toISOString() })
        .in('id', ids);
    if (error) throw error;
    revalidatePath('/admin', 'layout');
}

export async function bulkDelete(table: string, ids: string[]): Promise<void> {
    await requireAdmin();
    const t = assertTable(table);
    if (!ids.length) return;
    const admin = createAdminSupabase();
    const { error } = await admin.from(t).delete().in('id', ids);
    if (error) throw error;
    revalidatePath('/admin', 'layout');
}

export async function setOrderStatus(id: string, status: string): Promise<void> {
    await requireAdmin();
    if (!ORDER_STATUSES.includes(status as (typeof ORDER_STATUSES)[number])) {
        throw new Error(`Invalid order status: ${status}`);
    }
    const admin = createAdminSupabase();
    const { error } = await admin
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
    if (error) throw error;
    revalidatePath('/admin/submissions/orders');
}
