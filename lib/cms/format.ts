export function formatDate(iso: string): string {
    try {
        return new Date(iso).toLocaleString('en-CA', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    } catch {
        return iso;
    }
}

export function formatDateShort(iso: string): string {
    try {
        return new Date(iso).toLocaleDateString('en-CA', { dateStyle: 'medium' });
    } catch {
        return iso;
    }
}

export function formatMoney(n: number): string {
    return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
    }).format(Number(n) || 0);
}
