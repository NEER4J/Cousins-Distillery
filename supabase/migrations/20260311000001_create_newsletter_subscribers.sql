-- ============================================================
-- Cousins Distillery: Newsletter Subscribers Table
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. Create the table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  email       text        NOT NULL,
  created_at  timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT newsletter_subscribers_email_key UNIQUE (email)
);

-- 2. Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 3. Allow anyone to insert
CREATE POLICY "allow_public_insert_newsletter"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 4. Only service role can read
CREATE POLICY "service_role_select_newsletter"
  ON public.newsletter_subscribers
  FOR SELECT
  TO service_role
  USING (true);

-- 5. Index
CREATE INDEX IF NOT EXISTS newsletter_subscribers_email_idx ON public.newsletter_subscribers (email);
