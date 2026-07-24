import { requireSection } from '@/lib/auth/requireAdmin';
import { listCmsUsers, type CmsUser } from '@/lib/cms/users';
import { UsersManager } from './UsersManager';
import { ErrorNote } from '../../_components/ErrorNote';

export default async function UsersPage() {
    const me = await requireSection('users');

    let users: CmsUser[] = [];
    let loadError = false;
    try {
        users = await listCmsUsers();
    } catch {
        loadError = true;
    }

    return (
        <div>
            <div style={{ marginBottom: '1.25rem' }}>
                <h1 className="admin-h1">Users</h1>
                <p className="admin-sub">
                    Create CMS accounts and control what each person can access. <strong>Admin</strong> = full access,
                    <strong> Manager</strong> = everything except users, <strong>Editor</strong> = submissions &amp; SEO.
                </p>
            </div>

            {loadError ? (
                <ErrorNote title="Couldn't load users">
                    Make sure the roles migration (<code>20260724000005_add_cms_roles.sql</code>) has been run in the
                    Supabase SQL Editor, and that <code>SUPABASE_SERVICE_ROLE_KEY</code> is set.
                </ErrorNote>
            ) : (
                <UsersManager users={users} currentEmail={me.email} />
            )}
        </div>
    );
}
