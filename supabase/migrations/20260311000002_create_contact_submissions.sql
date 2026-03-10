-- ============================================================
-- Cousins Distillery: Contact Submissions Table
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. Create the table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text        NOT NULL,
  email       text        NOT NULL,
  subject     text        NOT NULL,
  message     text        NOT NULL,
  created_at  timestamptz DEFAULT now() NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- 3. Allow anyone to insert
CREATE POLICY "allow_public_insert_contact"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 4. Only service role can read
CREATE POLICY "service_role_select_contact"
  ON public.contact_submissions
  FOR SELECT
  TO service_role
  USING (true);

-- 5. Indexes
CREATE INDEX IF NOT EXISTS contact_submissions_email_idx ON public.contact_submissions (email);
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON public.contact_submissions (created_at DESC);
