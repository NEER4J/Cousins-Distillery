'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Mail,
    Users,
    ShoppingBag,
    Code2,
    Search,
    UserCog,
    type LucideIcon,
} from 'lucide-react';
import { roleCan, type Role } from '@/lib/auth/roles';

interface NavItem {
    href: string;
    label: string;
    icon: LucideIcon;
    section: string;
    exact?: boolean;
}

interface NavSection {
    title?: string;
    items: NavItem[];
}

const SECTIONS: NavSection[] = [
    {
        items: [{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard, section: 'dashboard', exact: true }],
    },
    {
        title: 'Submissions',
        items: [
            { href: '/admin/submissions/contacts', label: 'Contact Forms', icon: Mail, section: 'submissions' },
            { href: '/admin/submissions/newsletter', label: 'Newsletter', icon: Users, section: 'submissions' },
            { href: '/admin/submissions/orders', label: 'Orders', icon: ShoppingBag, section: 'submissions' },
        ],
    },
    {
        title: 'Site',
        items: [
            { href: '/admin/scripts', label: 'Custom Scripts', icon: Code2, section: 'scripts' },
            { href: '/admin/seo', label: 'SEO', icon: Search, section: 'seo' },
        ],
    },
    {
        title: 'Access',
        items: [{ href: '/admin/users', label: 'Users', icon: UserCog, section: 'users' }],
    },
];

export function AdminSidebar({ role }: { role: Role }) {
    const pathname = usePathname();

    const isActive = (item: NavItem) =>
        item.exact ? pathname === item.href : pathname.startsWith(item.href);

    return (
        <aside className="admin-sidebar">
            <div style={{ padding: '0.35rem 0.7rem 1rem' }}>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.98rem', letterSpacing: '0.02em' }}>
                    Cousins
                </span>
                <span style={{ color: 'var(--admin-accent)', fontWeight: 600, fontSize: '0.98rem' }}> CMS</span>
            </div>

            {SECTIONS.map((section, i) => {
                const items = section.items.filter((item) => roleCan(role, item.section));
                if (items.length === 0) return null;
                return (
                    <div key={i}>
                        {section.title && <div className="admin-nav-section">{section.title}</div>}
                        {items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="admin-navlink"
                                    data-active={isActive(item)}
                                >
                                    <Icon size={17} className="admin-navicon" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                );
            })}
        </aside>
    );
}
