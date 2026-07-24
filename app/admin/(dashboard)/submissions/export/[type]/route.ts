import { type NextRequest, NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/auth/requireAdmin';
import { listContacts, listSubscribers, listOrders } from '@/lib/cms/submissions';

function toCsv(rows: Record<string, unknown>[], columns: string[]): string {
    const escape = (v: unknown) => {
        const s = v === null || v === undefined ? '' : String(v);
        return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const header = columns.join(',');
    const body = rows.map((r) => columns.map((c) => escape(r[c])).join(',')).join('\n');
    return `${header}\n${body}`;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ type: string }> }
) {
    // Middleware ensures the caller is authenticated; verify they're an admin.
    const admin = await getAdminUser();
    if (!admin) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { type } = await params;
    const q = request.nextUrl.searchParams.get('q') ?? undefined;

    let csv: string;
    let filename: string;

    try {
        if (type === 'contacts') {
            const rows = await listContacts(q);
            csv = toCsv(rows as unknown as Record<string, unknown>[], [
                'name', 'email', 'subject', 'message', 'is_read', 'created_at',
            ]);
            filename = 'contact-submissions.csv';
        } else if (type === 'newsletter') {
            const rows = await listSubscribers(q);
            csv = toCsv(rows as unknown as Record<string, unknown>[], ['email', 'is_read', 'created_at']);
            filename = 'newsletter-subscribers.csv';
        } else if (type === 'orders') {
            const status = request.nextUrl.searchParams.get('status') ?? undefined;
            const rows = await listOrders(q, status);
            csv = toCsv(rows as unknown as Record<string, unknown>[], [
                'created_at', 'status', 'name', 'email', 'phone', 'product_name', 'product_slug',
                'quantity', 'unit_price', 'total_price', 'address_line1', 'address_line2',
                'city', 'province', 'postal_code', 'country', 'notes',
            ]);
            filename = 'orders.csv';
        } else {
            return new NextResponse('Unknown export type', { status: 404 });
        }
    } catch {
        return new NextResponse('Failed to build export', { status: 500 });
    }

    return new NextResponse(csv, {
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Cache-Control': 'no-store',
        },
    });
}
