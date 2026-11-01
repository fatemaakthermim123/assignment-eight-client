## Commands

- `npm run dev` — Turbopack dev server (localhost:3000).
- `npm run lint` — bare `eslint` run (flat config in `eslint.config.mjs` extends `eslint-config-next` core-web-vitals + typescript).
- `npm run build` — `next build`; this is also the typecheck step (no separate typecheck script; `npx tsc --noEmit` works for a fast check).
- No test framework or CI is configured. Do not introduce one unprompted.

## Stack quirks

- Next.js 16.4.3 with flags in `next.config.ts`: `cacheComponents`, `partialPrefetching`, `reactCompiler` (babel-plugin-react-compiler).
- Tailwind CSS v4, CSS-first config in `src/app/globals.css` (no `tailwind.config.*`). Loaded through Turbopack rules in `next.config.ts`, not PostCSS.
- shadcn UI with style `"base-nova"` (`components.json`): components in `src/components/ui` are built on `@base-ui/react` primitives, **not Radix** — offline knowledge of shadcn internals may not match. Add components with `npx shadcn add <name>`. Icons: lucide. Path aliases: `@/*` → `src/*`.
- Fonts: Playfair Display via `next/font/google`, exposed as CSS var `--font-heading` in the root layout.

## Auth (better-auth + MongoDB)

- Server config: `src/lib/auth.ts`; client: `src/lib/auth-client.ts`; route handler: `src/app/api/auth/[...all]/route.ts` (serves all auth endpoints — no other auth routes).
- Database is hardcoded to `assignment-eight` on the MongoDB client.
- Env vars required: `MONGODB_URI`, `BETTER_AUTH_URL` (see strict rules below — never read/edit `.env` yourself).

## Git

- The user handles all commits. Never stage, commit, or push.

<!-- BEGIN:nextjs-agent-rules -->


## Rules (strict)
1. Never read, open, print or search inside .env, .env.local, .env.* or any file with secrets/keys/passwords. Use process.env.NAME in code only.
2. If a new env variable is needed, ask me to fill the real value myself.
3. Never remove or weaken the .env lines in .gitignore.
4. Do not run git add, git commit, git push or any git command that changes history. I will commit myself.
5. Never put any secret into code, README, logs or chat replies.

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.
