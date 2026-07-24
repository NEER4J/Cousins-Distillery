-- ============================================================
-- Cousins Distillery CMS: Add read/status tracking to submissions
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================
-- Adds is_read + updated_at to all submission tables, and an
-- order status workflow column. Reads/updates from the CMS use
-- the service_role key, so no new RLS policies are required.

-- Contact submissions
ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS is_read    boolean     DEFAULT false NOT NULL,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now() NOT NULL;

-- Newsletter subscribers
ALTER TABLE public.newsletter_subscribers
  ADD COLUMN IF NOT EXISTS is_read    boolean     DEFAULT false NOT NULL,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now() NOT NULL;

-- Orders (+ status workflow: new | processing | fulfilled | cancelled)
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS is_read    boolean     DEFAULT false NOT NULL,
  ADD COLUMN IF NOT EXISTS status     text        DEFAULT 'new' NOT NULL,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now() NOT NULL;

CREATE INDEX IF NOT EXISTS contact_submissions_is_read_idx ON public.contact_submissions (is_read);
CREATE INDEX IF NOT EXISTS orders_status_idx ON public.orders (status);
