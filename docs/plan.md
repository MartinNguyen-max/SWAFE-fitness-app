# Implementation plan

Tick off items as they are done. Requirement IDs (F1, F2 ...) refer to [hand-in-2.md](hand-in-2.md).

**Deadline:** 28th November
**Deployed URL:** _not deployed yet_
**Prefix:** `g10`

## Phase 0 – Setup

- [x] Write the documentation (`docs/`)
- [x] Register the group in the backend ([setup.md](setup.md) step 1)
- [x] Create the Next.js project ([setup.md](setup.md) step 2)
- [x] Add `.env.local` with `API_URL`
- [x] Log in once and write the JWT claim names in [api.md](api.md)

## Phase 1 – Foundation

- [x] `lib/types.ts` – TypeScript types for User, WorkoutProgram, Exercise
- [x] `lib/api.ts` – `apiFetch()` helper (base URL + Bearer token from the cookie)
- [x] `lib/auth.ts` – `getSession()` (decode JWT) and `requireRole()`
- [x] `lib/actions.ts` – `login()` and `logout()` server actions
- [x] Login page + login form (F1)
- [x] Root `page.tsx` redirects by role (F1.3)
- [x] Navbar with role-based links and logout (F0.1)
- [x] Role layouts with `requireRole()` (F0.2, F0.3)

## Phase 2 – Manager

- [x] Create personal trainer form (F2.1)
- [ ] ~~List of personal trainers (F2.2)~~ – dropped, see [decisions.md](decisions.md) D10

## Phase 3 – Personal trainer

- [x] Client list (F3.1)
- [x] Create client form (F3.2)
- [x] Program list (F4.1)
- [x] Create program form with client dropdown (F4.2)
- [x] Program details with exercise table (F4.3)
- [x] Add exercise form with reps/time choice (F5)

## Phase 4 – Client

- [x] Program list / auto-open when there is only one (F6.1)
- [x] Program details (F6.2) – reuses `ExerciseTable`

## Phase 5 – Polish & deploy

- [x] Error messages on all forms
- [x] Loading states (`loading.tsx` + the pending state of forms)
- [x] Consistent styling
- [x] `npm run build` and `eslint` pass with no errors
- [x] Automated check (2026-11-20): every page returns the right data or redirect for each role, and an invalid token is sent to `/logout`
- [ ] Manual click-test in the browser: login, create trainer, create client, create program, add exercise (reps and time)
- [ ] Deploy to Vercel ([setup.md](setup.md) step 5)
- [ ] Test all requirements on the deployed version

## Phase 6 – Submission

- [ ] Record the demo video (log in as manager → trainer → client and show every F-requirement)
- [x] `participants.txt` in the project root (AUID + name per line)
- [ ] Delete `node_modules` and `.next`
- [ ] Zip the project as `au742737.zip`
- [ ] Upload to Brightspace: zip + video + deployed URL + prefix `g10`

## Demo video script (draft)

1. Login as manager `g10_boss@fitness.dk` → create a personal trainer
2. Logout → login as trainer `g10_m@fit.dk` → show the client list → create a client
3. Create a workout program for a client → add 3 exercises (one with time, e.g. Plank)
4. Show the program list and the program details
5. Create a second program for John Doe (so he has more than one)
6. Logout → login as John Doe `g10_c1@fit.dk` → show the program list → open a program
7. Show the code briefly: a server component (e.g. `app/trainer/clients/page.tsx`) and a client component (e.g. `components/AddExerciseForm.tsx`)
