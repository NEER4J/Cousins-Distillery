-- ============================================================
-- Cousins Distillery CMS: SEO Overrides (per-page metadata)
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================
-- One row per route path. Any non-null field overrides the
-- hardcoded metadata for that page; nulls fall back to code.

-- 1. Create the table
CREATE TABLE IF NOT EXISTS public.seo_settings (
  id           uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  path         text        NOT NULL,
  title        text,
  description  text,
  og_image     text,
  keywords     text,
  noindex      boolean     DEFAULT false NOT NULL,
  updated_at   timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT seo_settings_path_key UNIQUE (path)
);

-- 2. Enable Row Level Security
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

-- 3. Anyone can READ (metadata is public). Writes via service_role only.
CREATE POLICY "allow_public_select_seo_settings"
  ON public.seo_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 4. Index for fast lookups by path.
CREATE INDEX IF NOT EXISTS seo_settings_path_idx ON public.seo_settings (path);
