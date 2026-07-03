# Productat backend setup

The hackathon backend adds GitHub sign-in, roles (hacker / judge / admin),
project submission, a configurable judging rubric, and a Devpost-style quality
loop (submit → judge → score → publish). It runs inside this same Next.js app
on Vercel.

Stack: Next.js App Router, Auth.js (NextAuth v5) with GitHub OAuth, Prisma on
serverless Postgres.

The landing page keeps working with zero config. The /login, /dashboard,
/judge, /admin, and /leaderboard routes need the environment variables below.

## 1. Create a Postgres database (Neon)

1. Go to https://neon.tech, sign in, and create a project (pick a region near
   your users).
2. Copy two connection strings from the dashboard:
   - The **pooled** string → `DATABASE_URL`
   - The **direct** string → `DIRECT_URL` (used only for schema pushes)

Vercel Postgres works too: use `POSTGRES_PRISMA_URL` for `DATABASE_URL` and
`POSTGRES_URL_NON_POOLING` for `DIRECT_URL`.

## 2. Create a GitHub OAuth app

1. Go to https://github.com/settings/developers → **New OAuth App**.
2. Homepage URL: `https://productat.com`
3. Authorization callback URL: `https://productat.com/api/auth/callback/github`
   - For local dev, create a second app (or add the URL) with
     `http://localhost:3000/api/auth/callback/github`.
4. Copy the **Client ID** → `AUTH_GITHUB_ID` and generate a **Client secret** →
   `AUTH_GITHUB_SECRET`.

## 3. Set environment variables

Generate an auth secret:

```bash
openssl rand -base64 32
```

Set these in Vercel (Project → Settings → Environment Variables) and, for local
dev, in a `.env` file (copy `.env.example`):

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | Neon pooled connection string |
| `DIRECT_URL` | Neon direct connection string |
| `AUTH_SECRET` | output of the openssl command |
| `AUTH_GITHUB_ID` | GitHub OAuth client id |
| `AUTH_GITHUB_SECRET` | GitHub OAuth client secret |
| `ADMIN_EMAILS` | your email, e.g. `subashraj411@gmail.com` |

`ADMIN_EMAILS` is a comma-separated allowlist. Anyone who signs in with one of
those emails becomes an admin.

## 4. Push the schema and seed the rubric

With `DATABASE_URL` and `DIRECT_URL` in your local `.env`:

```bash
npm install
npx prisma db push     # creates the tables
npm run db:seed        # seeds the 4 default metrics + settings
```

`db push` is idempotent. The seed only adds metrics if none exist yet, so it
won't clobber a rubric you've edited.

## 5. Run it

```bash
npm run dev
```

Open http://localhost:3000/login and sign in with GitHub. On Vercel, just
redeploy after setting the env vars.

## How the roles and quality loop work

- **Hacker** (default): create projects, edit drafts, and submit them for
  judging from the project page.
- **Judge**: added by an admin via the judge list (by email). On their next
  sign-in they get the judge role and the judging console at `/judge`.
- **Admin**: set via `ADMIN_EMAILS`. Manages the judge list, the rubric
  (metrics + weights), and the event phases.

The loop, driven from `/admin`:

1. **Submissions open** → hackers submit. A project goes `DRAFT → SUBMITTED`.
2. **Judging open** → judges score each metric (a slider per metric) and leave
   feedback. First score flips a project to `UNDER_REVIEW`.
3. **Publish results** → projects with scores become `SCORED`, judging locks,
   and scores + feedback become visible to hackers. The `/leaderboard` ranks
   projects by weighted score (judges/admins see live standings before then).

Scoring math (`lib/scoring.ts`): each judge's metric values are weighted and
normalized to 0–100, then averaged across judges, so extra judges don't inflate
a score.

## Customizing

- **Rubric**: edit metrics, weights, and max scores in `/admin` (or seed
  defaults in `prisma/seed.ts`).
- **Tracks**: `lib/constants.ts`.
- **Schema**: `prisma/schema.prisma` (run `npx prisma db push` after changes).
