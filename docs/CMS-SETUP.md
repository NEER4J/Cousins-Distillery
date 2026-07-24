# Cousins Distillery — Admin CMS Setup

A WordPress-style admin at **`/admin`**, locked behind Supabase Auth. Lets you:

- See & manage form submissions (contacts, newsletter, orders) — search, mark read, delete, export CSV.
- Inject custom scripts into the **header**, **body**, and **footer** site-wide (analytics, pixels, verification tags).
- Edit **SEO** (title / description / social image / keywords / noindex) per page.

## One-time setup (3 steps)

### 1. Add the service-role key

In `.env.local`, fill in the value (Supabase Dashboard → **Project Settings → API → `service_role` secret**):

```
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # keep this secret — server-only, never exposed to the browser
```

Restart `npm run dev` after adding it.

### 2. Run the database migrations

In the Supabase Dashboard → **SQL Editor**, run these four files (in order):

1. `supabase/migrations/20260724000001_create_cms_admins.sql`  — admin allowlist (seeds `neeraj.kumar@virtualxcellence.com`)
2. `supabase/migrations/20260724000002_create_site_settings.sql` — header/body/footer scripts
3. `supabase/migrations/20260724000003_create_seo_settings.sql`  — per-page SEO overrides
4. `supabase/migrations/20260724000004_alter_submissions_add_status.sql` — read/status tracking on submissions

### 3. Create your admin password

Go to **`/admin/login`** → click **"Set your password"** → enter the allowlisted email and a password (8+ chars) → it creates your account and signs you in. From then on, use **Sign in**.

## Managing admins

Add or remove admins by editing the `cms_admins` table (Supabase → Table Editor). Only emails in that table can access `/admin`.

## How the pieces work

- **Auth**: `@supabase/ssr` cookie sessions. `middleware.ts` redirects unauthenticated `/admin/*` visits to the login page; each admin page also verifies the email against `cms_admins`.
- **Scripts**: authored in **Custom Scripts**, stored in `site_settings`, injected server-side by `app/layout.tsx` (so they actually execute). They run on the public site only — never inside `/admin`.
- **SEO**: each route's `generateMetadata()` merges any `seo_settings` override on top of its built-in metadata. Blank fields keep the code defaults. The **social share image** can be pasted as a URL or **uploaded** — uploads go to a public Supabase Storage bucket named `cms-media` (auto-created on first upload; no manual step), and the public URL is filled into the field.
- **Submissions**: read with the service-role key (the tables' RLS only allows the service role to read), behind the admin auth guard.

## Note

Reading the current path in the root layout makes public pages server-rendered on demand (not static). For this site that's fine; if full static generation is ever needed, the admin can be split into a separate root layout.
