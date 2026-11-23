# Setup guide

Steps to go from an empty folder to a running and deployed app.

## Prerequisites

- Node.js (tested with v26.7.0) and npm (v12.0.2)
- A GitHub account and a Vercel account (for deployment)

## 1. Register the group in the backend (one time)

1. Open <https://assignment2.swafe.dk/swagger/index.html>
2. Expand `POST /api/Groups`, click **Try it out**, and send:

   ```json
   { "groupNumber": "10", "prefix": "g10" }
   ```

3. Check it worked: use `POST /api/Users/login` with
   `{ "email": "g10_boss@fitness.dk", "password": "asdfQWER" }`. The response should contain a `jwt`.

Status: ☑ done 2026-11-20 – manager, trainer and client logins verified.

## 2. Create the Next.js project

Run this **inside** the `fitness-app` folder (the folder may only contain `docs/`):

```bash
npx create-next-app@latest . --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm
```

| Flag | Meaning |
| --- | --- |
| `.` | create the project in the current folder |
| `--ts` | TypeScript |
| `--tailwind` | Tailwind CSS |
| `--eslint` | ESLint |
| `--app` | App Router (`app/` folder) |
| `--no-src-dir` | `app/` lies in the root, not in `src/` |
| `--import-alias "@/*"` | import with `@/lib/api` instead of `../../lib/api` |
| `--use-npm` | use npm |

If it asks more questions (e.g. Turbopack or React Compiler), choose the default (press Enter).

Because `fitness-app` is inside the `swafe` git repo, `create-next-app` does not create a new git repo. That is what we want.

## 3. Environment variable

Create `.env.local` in the project root:

```
API_URL=https://assignment2.swafe.dk
```

There is no `NEXT_PUBLIC_` prefix, because only the server calls the backend (see [decisions.md](decisions.md) D5). `.env.local` is ignored by git, so the same variable must also be added in Vercel (step 5).

## 4. Run locally

```bash
npm run dev
```

Open <http://localhost:3000>.

## 5. Deploy to Vercel

1. Push the repo to GitHub
2. On <https://vercel.com>: **Add New → Project** → import the repo
3. **Root Directory**: `fitness-app` (because the repo contains several projects)
4. **Environment Variables**: add `API_URL=https://assignment2.swafe.dk`
5. Deploy. Write the URL in [plan.md](plan.md) and in the submission.

## 6. Prepare the submission

See the checklist in [hand-in-2.md](hand-in-2.md#submission) and [plan.md](plan.md#phase-6--submission).
