# Motogardunha — Claude Code Instructions

## Project Context
Always read `.claude/skills/project-overview.md` at the start of every session.

## Skills to Use for This Project

### Always Active
- **`.claude/skills/project-overview.md`** — project-specific context, env vars, routes, DB schema, categories

### Frontend Work
- **`frontend-dev-guidelines`** — use for React components, Next.js pages, data fetching, TypeScript standards, styling

### Database / Query Work
- **`database-optimizer`** — use when writing or reviewing Supabase queries, indexes, or schema changes

### Shell / Automation
- **`bash-scripting`** — use when writing scripts, CI steps, or terminal commands

## Rules

1. **Never hardcode** brand names, motorcycle categories, or image URLs — always load from Supabase.
2. **Motorcycle segments** are exactly: `Scooters`, `Naked`, `Desportivas`, `Trail`, `Off-Road`. Do not add or rename.
3. **Admin routes** (`/admin/*`, `/api/admin/*`) are protected by `admin_session` cookie — always test with auth.
4. **Supabase uploads** use `createAdminClient()` (SERVICE_ROLE_KEY) — never the anon client for storage writes.
5. **Upload bucket** is `product-images`. Do not create or reference other buckets.
6. **Body size limit** is 52MB (set in `next.config.ts`) — do not lower it.
7. **`logo_url`** in `custom_brands` defaults to `""` — it is NOT NULL in the DB.
8. Always run `npm run build` before committing to catch TypeScript/lint errors.
9. Commit messages must follow conventional commits: `feat:`, `fix:`, `chore:`, etc.
10. Always push to `main` branch.

## Tech Constraints
- Next.js 16 App Router — no Pages Router patterns
- Tailwind CSS only — no inline styles, no CSS modules
- Supabase client must match context: `admin.ts` for API routes, `server.ts` for Server Components, `client.ts` for Client Components
