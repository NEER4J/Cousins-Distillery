// Shared role definitions — safe to import from both server and client code
// (no server-only dependencies here).

export type Role = 'admin' | 'manager' | 'editor';

export const ROLES: Role[] = ['admin', 'manager', 'editor'];

export const ROLE_LABELS: Record<Role, string> = {
    admin: 'Admin',
    manager: 'Manager',
    editor: 'Editor',
};

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
    admin: 'Full access, including user management',
    manager: 'Everything except user management',
    editor: 'Submissions and SEO only',
};

/** Which CMS sections each role can access. */
export const ROLE_SECTIONS: Record<Role, string[]> = {
    admin: ['dashboard', 'submissions', 'scripts', 'seo', 'users'],
    manager: ['dashboard', 'submissions', 'scripts', 'seo'],
    editor: ['dashboard', 'submissions', 'seo'],
};

export function roleCan(role: Role, section: string): boolean {
    return ROLE_SECTIONS[role]?.includes(section) ?? false;
}

export function isRole(value: unknown): value is Role {
    return value === 'admin' || value === 'manager' || value === 'editor';
}

/** Coerce an unknown DB value into a valid role (defaults to admin). */
export function normalizeRole(value: unknown): Role {
    return isRole(value) ? value : 'admin';
}
