# Decision log

Every important choice we make is written here with the date and the reason. Newest at the bottom.

---

### D1 – Group number and prefix (2026-11-20)

**Decision:** Group `10`, prefix `g10` (same as hand-in 1).
**Result:** The manager login is `g10_boss@fitness.dk`. See the user table in [hand-in-2.md](hand-in-2.md#using-the-api).

### D2 – Framework: Next.js with the App Router (2026-11-20)

**Decision:** Use the newest Next.js with the App Router (the `app/` folder).
**Why:** The assignment requires Next.js with server and client components. Server components only exist in the App Router. It is also what we used in lesson 9.

### D3 – Styling: Tailwind CSS (2026-11-20)

**Decision:** Tailwind CSS.
**Why:** It is the default in `create-next-app`, and it was used in lesson 9 and in the rick-and-morty project, so it is already familiar.

### D4 – Package manager: npm (2026-11-20)

**Decision:** npm.
**Why:** It is installed by default and works without extra setup on Vercel and for whoever unzips the submission.
**Considered:** pnpm (taught in the lectures). It is faster, saves disk space and is stricter about undeclared imports. Those advantages are small for a project this size, so we kept npm (2026-11-20).

### D5 – Authentication: JWT in an httpOnly cookie (2026-11-20)

**Decision:** The login form calls a server action. The server action gets the JWT from the backend and saves it in an httpOnly cookie. Server components read the cookie and call the backend.
**Why:** The goal is "what the assignment requires, as simply as possible".
- With `localStorage` (like the Angular hand-in), only client components can read the token. Then all data fetching has to happen in the browser, and we would have almost no real server components. That breaks the requirement.
- NextAuth/Auth.js (used in the lesson 9 tutorial) needs more setup than we need.
- A cookie needs only a few lines of code with `cookies()` from `next/headers`.

**Alternatives rejected:** localStorage, NextAuth.

### D6 – Route protection in layouts (2026-11-20)

**Decision:** Each role section (`/manager`, `/trainer`, `/client`) has a `layout.tsx` that calls `requireRole(...)`. That function redirects to `/login` if the user is not logged in or has the wrong role.
**Why:** It is easy to understand. We do not need `proxy.ts` (called `middleware.ts` before Next.js 16) for an assignment of this size.

### D7 – Documentation lives in `docs/` (2026-11-20)

**Decision:** All markdown documentation goes into `docs/`. The original `hand-in-1.md` (format reference) was moved to `docs/reference/`. The empty `Readme.md` was deleted.
**Why:** `create-next-app` refuses to run in a folder that contains files, but a `docs/` folder is allowed. `create-next-app` creates its own `README.md`.

### D8 – Repetitions *or* time for exercises (2026-11-20)

**Decision:** The add-exercise form has a choice of "Repetitions" or "Time". Only the chosen field is sent to the backend; the other is `null`.
**Why:** The assignment says "number of repetitions **or** the time". The backend has both fields (`repetitions: int`, `time: string`).
**Display:** The table shows `time` if it is set, otherwise `repetitions`. The backend's own seeded data sometimes has `repetitions: 0` together with a time, or `time: ""` together with repetitions.

### D9 – `cacheComponents` turned off (2026-11-20)

**Decision:** We removed `cacheComponents: true` and `partialPrefetching: true` from the `next.config.ts` that `create-next-app` generated.
**Why:** With `cacheComponents`, every page that reads cookies (all our pages) must be wrapped in its own `<Suspense>`, or the build fails. Our data is per user and must never be cached, so the feature gives us nothing and only adds complexity.

### D10 – No list of trainers for the manager (F2.2 dropped) (2026-11-20)

**Decision:** The manager page only has the "create trainer" form.
**Why:** F2.2 was optional. `GET /api/Users` returns the users of **every** group (111 users when tested), and `UserDto` has no group field, so we cannot reliably show only our own trainers.

### D11 – `loading.tsx` only inside `/trainer` and `/client` (2026-11-20)

**Decision:** There is no `app/loading.tsx` in the root. There is one in `app/trainer/` and one in `app/client/`.
**Why:** A root `loading.tsx` wraps the role layouts in Suspense. The page then starts streaming before `requireRole()` runs, so the auth redirect turns into a client-side redirect (status 200) instead of a real HTTP 307. With the loading files below the layouts, the auth redirects are real 307s, and the data pages still get a loading state.

### D12 – Expired token -> `/logout` route handler (2026-11-20)

**Decision:** If the backend answers `401`, `apiFetch()` redirects to `/logout`. That is a route handler (`app/logout/route.ts`) that deletes the cookie and redirects to `/login`.
**Why:** A server component is not allowed to change cookies, but a route handler is. Without this, an expired cookie would make every page fail.

### D13 – One shared "create user" form and action (2026-11-20)

**Decision:** The manager and the trainer use the same `CreateUserForm` and `createUser()` action. The action decides the account type from the logged-in user's role: a manager creates a `PersonalTrainer`, and a trainer creates a `Client` with `personalTrainerId` set to their own id.
**Why:** Less code. The browser cannot choose the account type, so a trainer cannot create another trainer by changing the form.

### D14 – Git commits (2026-11-20)

**Decision:** Commits are made with the user's own git identity, with no extra co-author lines. `AGENTS.md` (generated automatically by `next dev` for AI coding tools) is in `.gitignore`.
