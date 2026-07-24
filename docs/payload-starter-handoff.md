# Handoff Prompt — Standalone Payload CMS Starter (Next.js + Supabase + Vercel)

Paste everything under the line into a fresh Claude Code session opened in a new, empty project directory.

---

## PROMPT START

You are setting up a **clean, standalone, reusable Payload CMS 3 starter** in the current directory. It must run **entirely on Vercel + Supabase — no separate server or VPS**. I will clone this per client project, so keep it generic, well-documented, and easy to fork.

Before running anything, **check the current Payload 3 docs and the latest package versions** (the CLI flags and adapters change) and adapt the commands below if they've moved. Payload is a real external tool — verify, don't guess.

### Goal
A Next.js (App Router) app with Payload 3 integrated, using:
- **Supabase Postgres** as the database — Payload owns its **own `payload` schema** (isolated from any app tables in `public`).
- **Supabase Storage** (S3-compatible) for all media uploads (Vercel's disk is ephemeral).
- **Deployable to Vercel** with zero extra infrastructure.
- Starter collections: **Users** (auth), **Media**, **Pages**, **Products**.
- REST (`/api/*`), GraphQL (`/api/graphql`), and Local API exposed so any frontend can consume the content.

### What you need from me first — ask for these, use placeholders until I provide them
1. **Supabase project** connection details:
   - The **Session pooler** connection string (Supabase Dashboard → Project Settings → Database → Connection string → **Session pooler**, port `5432`). ⚠️ Do NOT use the Transaction pooler (port `6543`) — it breaks Drizzle prepared statements that Payload relies on.
   - **S3 storage credentials** (Supabase Dashboard → Storage → S3 Connection → enable it, then create access keys): endpoint, region, access key ID, secret.
   - A **storage bucket** name (create one, e.g. `media`).
2. A **`PAYLOAD_SECRET`** — generate a long random string.
3. My Vercel account/project for deploy (I'll connect it).

### Steps
1. **Scaffold** into the current directory:
   `npx create-payload-app@latest . --db postgres --template blank`
   (App Router Next.js app with Payload wired in. If the flags changed, use the interactive prompts and choose: Postgres DB, blank template.)

2. **Add** the media storage adapter: `@payloadcms/storage-s3`. Confirm `@payloadcms/db-postgres` and `@payloadcms/richtext-lexical` are installed.

3. **Configure `payload.config.ts`:**
   - Database:
     ```ts
     db: postgresAdapter({
       pool: { connectionString: process.env.DATABASE_URI },
       schemaName: 'payload', // isolate CMS tables from the app's public schema
     })
     ```
   - Media → Supabase Storage (S3-compatible):
     ```ts
     s3Storage({
       collections: { media: true },
       bucket: process.env.S3_BUCKET,
       config: {
         endpoint: process.env.S3_ENDPOINT,   // e.g. https://<ref>.supabase.co/storage/v1/s3
         region: process.env.S3_REGION,        // your Supabase project region
         forcePathStyle: true,
         credentials: {
           accessKeyId: process.env.S3_ACCESS_KEY_ID,
           secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
         },
       },
     })
     ```
   - `secret: process.env.PAYLOAD_SECRET`, `editor: lexicalEditor()`.

4. **Collections:**
   - `Users` — `auth: true` (CMS admins).
   - `Media` — `upload: true` (used by the S3 adapter; add alt text field).
   - `Pages` — `title`, `slug` (unique, indexed), `hero` group, `content` (lexical rich text), `seo` group (`metaTitle`, `metaDescription`, `ogImage` → relationTo media), plus **drafts/versions enabled** with a `_status` (draft/published) workflow.
   - `Products` — example content type: `name`, `slug`, `price` (number), `images` (array → relationTo media), `description` (rich text), `featured` (checkbox). This is the "edit me per project" collection.

5. **Env vars** (`.env` + document them in the README):
   `DATABASE_URI` (Supabase session pooler), `PAYLOAD_SECRET`, `S3_BUCKET`, `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `NEXT_PUBLIC_SERVER_URL` (+ `PAYLOAD_PUBLIC_SERVER_URL`).

6. **Migrations (important for Vercel/production):** In dev, Payload's Postgres adapter can auto-push schema. For production, generate migrations (`payload migrate:create`) and run them on deploy — set the Vercel build command to `payload migrate && next build`. Make sure the DB role can create the `payload` schema (the Supabase `postgres` role can).

7. **Verify locally:** `npm run dev` → open `/admin` → create the first admin user → create a Page and a Product → upload an image and **confirm the file appears in the Supabase Storage bucket** → hit `/api/pages` and `/api/products` and confirm JSON content is returned.

8. **Deploy to Vercel:** add all env vars in Vercel, set the build command to run migrations then build, use the **session pooler** connection string, and confirm media uploads land in Supabase Storage. Note Vercel's serverless request body size limit — for **large files** (e.g. video), upload direct-to-Storage/presigned rather than through the Payload API.

### Non-negotiable gotchas (honor all of these)
- Supabase **session pooler** (5432), never transaction pooler (6543).
- `schemaName: 'payload'` so CMS tables never collide with app tables.
- Media **must** go to Supabase Storage — Vercel disk is ephemeral/read-only.
- Run Payload **migrations on deploy**; don't rely on dev auto-push in production.
- `sharp` (image resizing) is required — Payload installs it; it works on Vercel.
- Set `NEXT_PUBLIC_SERVER_URL` / `PAYLOAD_PUBLIC_SERVER_URL` to the deployed URL.

### Deliverable
A running Payload admin at `/admin`, content stored in Supabase Postgres (`payload` schema), media in Supabase Storage, deployable to Vercel with **no other server**. Include a concise **README** covering: required env vars, local run steps, deploy steps, and a "clone this per project" checklist (new Supabase project → new bucket + S3 keys → new `PAYLOAD_SECRET` → new Vercel project). Do a production build at the end to confirm it's green.

## PROMPT END

---

### Notes for me (not part of the prompt)
- This is the **per-project** model: each client gets its own Payload install + its own Supabase project + its own Vercel project. No multi-tenancy, no shared backend.
- To connect an **existing** site: install Payload into it (or run this starter as a sibling app), point it at that site's Supabase with `schemaName: 'payload'`, move hardcoded content into collections, and have the site read from Payload's API/Local API. Existing app-data tables (forms, orders) stay in Supabase untouched.
- If the target project already uses `/admin` (like the Cousins Distillery site), set Payload's admin route to `/cms` via `routes: { admin: '/cms' }` to avoid a collision.
