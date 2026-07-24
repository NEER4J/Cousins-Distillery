-- ============================================================
-- Cousins Distillery CMS: Site Settings (custom scripts)
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================
-- Single-row table holding the header / body / footer script
-- blobs injected site-wide (like "Insert Headers and Footers").

-- 1. Create the table (enforced single row via id = 1)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id                  integer     PRIMARY KEY DEFAULT 1,
  header_scripts      text        DEFAULT '',
  body_start_scripts  text        DEFAULT '',
  footer_scripts      text        DEFAULT '',
  updated_at          timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT site_settings_singleton CHECK (id = 1)
);

-- 2. Enable Row Level Security
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 3. Anyone can READ the scripts (they render on public pages anyway).
CREATE POLICY "allow_public_select_site_settings"
  ON public.site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 4. Writes happen only via the service_role key (admin, server-side).
--    No INSERT/UPDATE policy for anon/authenticated → writes are blocked.

-- 5. Seed the singleton row.
INSERT INTO public.site_settings (id, header_scripts, body_start_scripts, footer_scripts)
VALUES (1, '', '', '')
ON CONFLICT (id) DO NOTHING;
