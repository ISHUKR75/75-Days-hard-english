# 75 Days Hard English

A 75-day English learning challenge app (Hindi → English), built with Next.js 16 (App Router) + React 19 + Tailwind. Huge scaffold: 75 day folders under `data/challenge/day-01..75`, dozens of route groups under `app/(main)`, `app/(auth)`, `app/(admin)`, `app/(marketing)`, `app/(onboarding)`, plus `app/api/*` route handlers for every feature area (vocabulary, grammar, speaking, writing, assessment, gamification, etc.).

**Current state (imported project):** the app shell, routing, and folder structure exist, but almost all `data/**/*.json` content files (lessons, practice questions, vocabulary, essays) are empty placeholders — this is scaffolding, not populated content yet.

## Run & Operate

- `npm install --legacy-peer-deps` — install dependencies (the `--legacy-peer-deps` flag is required due to a peer-dep conflict between `@eslint/js@10` and `eslint@9`). Use **npm**, not pnpm — `package-lock.json` is the authoritative lockfile even though a stray `pnpm-lock.yaml` also exists (left in place per user request not to remove files).
- `npm run dev` — start the dev server on port 5000 (bound to 0.0.0.0, required for Replit's proxy)
- `npm run build` / `npm run start` — production build/start

## User preferences

- Do not delete or remove any existing files/folders in this project; only add new ones.
- Wants the full site eventually filled with real (non-placeholder) content for every day/topic — but generating genuinely useful content for 75 days × many subtopics × 500-1000 questions each is a large body of work that must be done incrementally in scoped batches, not literally as single 50,000-line files (that file size is an anti-pattern that hurts editability, not a real target).
