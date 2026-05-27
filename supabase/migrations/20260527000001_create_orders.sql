-- ============================================================
-- Cousins Distillery: Orders Table
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. Create the table
CREATE TABLE IF NOT EXISTS public.orders (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  name            text        NOT NULL,
  email           text        NOT NULL,
  phone           text        NOT NULL,
  product_slug    text        NOT NULL,
  product_name    text        NOT NULL,
  quantity        integer     NOT NULL CHECK (quantity > 0),
  unit_price      numeric(10,2) NOT NULL,
  total_price     numeric(10,2) NOT NULL,
  address_line1   text        NOT NULL,
  address_line2   text,
  city            text        NOT NULL,
  province        text        NOT NULL,
  postal_code     text        NOT NULL,
  country         text        NOT NULL DEFAULT 'Canada',
  notes           text,
  created_at      timestamptz DEFAULT now() NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 3. Allow anyone to insert
CREATE POLICY "allow_public_insert_orders"
  ON public.orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 4. Only service role can read
CREATE POLICY "service_role_select_orders"
  ON public.orders
  FOR SELECT
  TO service_role
  USING (true);

-- 5. Indexes
CREATE INDEX IF NOT EXISTS orders_email_idx ON public.orders (email);
CREATE INDEX IF NOT EXISTS orders_product_slug_idx ON public.orders (product_slug);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON public.orders (created_at DESC);
