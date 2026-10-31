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

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Next.js 16 (App Router) client for an assignment. Companion backend lives in the sibling repo `../assignment-eight-server` (Express 5 + MongoDB); this repo does not contain the API.

## Commands

- `npm run dev` — dev server on :3000 (Turbopack).
- `npm run build` — production build (also typechecks).
- `npm run lint` — ESLint.
- No test script or test suite exists.

## Backend dependency

- The `/Users` route (`src/app/Users/page.tsx`) fetches `${NEXT_PUBLIC_API_URL}/users` at render time. The page fails unless the backend is running.
- The `/add-new-user` route (`src/app/component/AddNewUser.tsx`) POSTs JSON `{ name, email }` to the same API.
- All API calls take the base URL from `NEXT_PUBLIC_API_URL` in **this repo's** `.env` (client-side vars must use the `NEXT_PUBLIC_` prefix to be inlined into the browser bundle). Never hardcode `localhost:5000`. If the env var is unset, requests hit a truncated URL and fail silently — check for a blanked-out host in `AddNewUser.tsx`'s error copy.
- The API is the sibling repo `../assignment-eight-server` and **persists users in MongoDB** (`insertOne` / `find` on db `assignment-eight`, collection `users`) via the `MONGODB_URI` in its `.env`. Users survive API restarts, but newly written docs only get `_id` — no numeric `id`.
- Start it with `node index.js` from `../assignment-eight-server` — there is **no `start`/`dev` script and no nodemon**; restart manually after edits. `connectToMongoDB()` runs via top-level await at startup.
- Start the backend before loading `/Users` or submitting the form, or the page renders an error filler.

## Stack quirks

- Tailwind **v4** loaded through `@tailwindcss/turbopack` in `next.config.ts` — there is no `tailwind.config.*`; theme/config lives as CSS variables in `src/app/globals.css`.
- React Compiler and `cacheComponents` are enabled in `next.config.ts` — don't add manual `useMemo`/`useCallback` wrappers reflexively.
- shadcn/ui with the `base-nova` style (`components.json`): primitives are built on `@base-ui/react`, generated components live in `src/components/ui`, path aliases: `@/components`, `@/hooks`, `@/lib` (`@/*` → `./src/*`).
- Shared components are in `src/app/component/` — a non-route folder inside the app dir (e.g. `src/app/component/Users.tsx` is not a route).
