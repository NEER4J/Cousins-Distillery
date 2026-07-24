-- ============================================================
-- Cousins Distillery CMS: Admin Allowlist
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================
-- Only emails in this table can access /admin. Auth itself is
-- handled by Supabase Auth; this table gates who is an admin.

-- 1. Create the table
CREATE TABLE IF NOT EXISTS public.cms_admins (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  email       text        NOT NULL,
  created_at  timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT cms_admins_email_key UNIQUE (email)
);

-- 2. Enable Row Level Security (no public policies → only the
--    service_role key, used server-side, can read/write this table).
ALTER TABLE public.cms_admins ENABLE ROW LEVEL SECURITY;

-- 3. Seed the first admin. Change / add emails as needed.
INSERT INTO public.cms_admins (email)
VALUES ('neeraj.kumar@virtualxcellence.com')
ON CONFLICT (email) DO NOTHING;
