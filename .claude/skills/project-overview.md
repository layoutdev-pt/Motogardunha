# Motogardunha — Project Overview

## Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Database/Storage:** Supabase (PostgreSQL + Storage)
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Key Environment Variables (.env.local)
- `NEXT_PUBLIC_SUPABASE_URL` — https://oyszsvptojpqgxukgsjw.supabase.co
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — used server-side only (admin client)
- `ADMIN_PASSWORD` — M0toG@rDuNh4

## Supabase
- **Project ID:** oyszsvptojpqgxukgsjw
- **Storage bucket:** `product-images`
- Admin client: `src/lib/supabase/admin.ts` — uses SERVICE_ROLE_KEY, bypasses RLS
- Server client: `src/lib/supabase/server.ts`
- Browser client: `src/lib/supabase/client.ts`

## Auth
- Admin session via `admin_session` cookie (set by middleware)
- Middleware: `src/proxy.ts` — protects `/admin` routes and `/api/admin/*`

## Directory Structure
```
src/
  app/
    (public)/         # Public-facing pages
    admin/            # Admin panel pages
    api/admin/        # Admin API routes (upload, brands, etc.)
  components/
    ui/               # Shared UI components
    home/             # Homepage sections
    stand/            # Stand/listing page components
  lib/
    constants.ts      # MOTORCYCLE_SEGMENTS, MOTORCYCLE_TYPES, BRANDS, etc.
    supabase/         # Supabase client helpers
  types/              # TypeScript types (Motorcycle, etc.)
```

## Motorcycle Categories (canonical)
- Scooters, Naked, Desportivas, Trail, Off-Road
- Admin forms: 5 types only (no "Todos")
- Frontend filters: "Todos" + 5 types

## Upload Route
- `src/app/api/admin/upload/route.ts`
- Accepts `file`, `folder`, `bucket` fields in FormData
- Uses admin Supabase client for storage uploads
- Body size limit: 52MB (set in `next.config.ts` via `experimental.serverActions.bodySizeLimit`)

## Brands
- Table: `custom_brands` (id, name, logo_url TEXT NOT NULL, created_at, updated_at)
- API: `src/app/api/admin/brands/route.ts` (GET, POST, DELETE)
- `logo_url` defaults to `""` when not provided
- `AddBrandDialog` — name-only form, no logo upload
