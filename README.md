# Sajivo Next

Production-oriented Next.js rebuild of the Sajivo interior marketplace.

## Stack

- Next.js App Router with TypeScript
- Tailwind CSS v4
- Supabase Auth, Postgres, Storage, and RLS
- Server Components, API Route Handlers, and client workflow components
- PWA manifest and service worker

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Without Supabase keys, the app renders with typed demo data. With Supabase keys, server repository methods read from the live project and auth routes call Supabase Auth.

## Database

The first migration is at:

```txt
supabase/migrations/001_sajivo_initial_schema.sql
```

It creates the Sajivo schema, indexes, RLS policies, seed services, and storage buckets for project files, portfolio media, and verification documents.
