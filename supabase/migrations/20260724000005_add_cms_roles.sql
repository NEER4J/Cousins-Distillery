-- ============================================================
-- Cousins Distillery CMS: Roles for CMS users
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================
-- Adds a role to each CMS user (admin | manager | editor).
-- Existing users default to 'admin' so nobody loses access.

ALTER TABLE public.cms_admins
    ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'admin';

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'cms_admins_role_check'
    ) THEN
        ALTER TABLE public.cms_admins
            ADD CONSTRAINT cms_admins_role_check CHECK (role IN ('admin', 'manager', 'editor'));
    END IF;
END $$;

-- Keep the first seeded user as an admin.
UPDATE public.cms_admins SET role = 'admin'
WHERE email = 'neeraj.kumar@virtualxcellence.com';
