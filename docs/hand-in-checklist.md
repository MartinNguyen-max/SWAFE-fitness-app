# Hand-in checklist

What is left before hand-in, how to deploy, and which requirements are fulfilled.
**Delete this file before zipping** (see step 5).

**Deadline:** 28th November · **Prefix:** `g10` · **Zip name:** `au742737.zip`

---

## ▶ Do this now – in order

1. [ ] **Click-test locally:** run `npm run dev` and follow [section 2](#2-test-locally-click-test)
2. [ ] **Create an empty GitHub repo** called `fitness-app` (no README)
3. [ ] **Push the app to GitHub:** from `c:\SW7\swafe`, run the two commands in [section 3a](#3a-put-only-fitness-app-on-github)
4. [ ] **Deploy on Vercel:** import the repo and add `API_URL` ([section 3b](#3b-import-in-vercel))
5. [ ] **Click-test the deployed URL**, and write the URL in `README.md`
6. [ ] **Record the demo video** on the deployed URL ([section 4](#4-demo-video))
7. [ ] **Clean up the docs** ([section 5](#5-clean-up-the-docs-before-zipping))
8. [ ] **Zip and upload** ([section 6](#6-zip-and-submit))

---

## 1. Requirements – status

### Functional requirements

| Requirement (from the assignment) | Status | How |
| --- | --- | --- |
| The user can login | ✅ | `/login` → `LoginForm` (client) → `login()` server action → JWT in an httpOnly cookie → redirect by role |
| Manager can create users (personal trainers) | ✅ | `/manager` → `CreateUserForm` → `createUser()` sends `accountType: "PersonalTrainer"` |
| Trainer can create users (clients) | ✅ | `/trainer/clients` → same form; the action sends `accountType: "Client"` and `personalTrainerId` = trainer's id |
| Trainer can create a workout program for a client | ✅ | `/trainer/programs/new` → `CreateProgramForm` with a client dropdown → `POST /api/WorkoutPrograms` |
| Trainer can add exercises to a program (name, description, sets, reps **or** time) | ✅ | `/trainer/programs/[id]` → `AddExerciseForm` with a "Repetitions / Time" switch → `POST /api/Exercises/Program/{id}` |
| Trainer can see a list of workout programs | ✅ | `/trainer/programs` → `GET /api/WorkoutPrograms/trainer`, shown as cards with the client's name |
| Trainer can see a specific workout program | ✅ | `/trainer/programs/[id]` → `ExerciseTable` (Exercise / Description / Sets / Reps/time, like the example in the PDF) |
| Trainer can see a list of clients | ✅ | `/trainer/clients` → `GET /api/Users/Clients` |
| Client can see their workout program | ✅ | `/client/programs/[id]` → same `ExerciseTable` |
| Client with more than one program sees a list and can choose | ✅ | `/client/programs` shows a list; with exactly one program it opens it directly |

Extras: role-based navbar, pages protected per role, logout, error and loading pages, form validation and error messages.

### Technology requirements

| Requirement | Status | How |
| --- | --- | --- |
| Uses Next.js | ✅ | Next.js 16.4, App Router |
| Both server-side and client-side components | ✅ | **Server:** all pages, layouts, `Navbar`, `ExerciseTable`, `ProgramList` (fetch data on the server). **Client:** `LoginForm`, `CreateUserForm`, `CreateProgramForm`, `AddExerciseForm`, `NavLink`, `error.tsx` |
| Uses the backend API | ✅ | `lib/api.ts` → `apiFetch()` with Bearer token |
| Deployed to a public cloud | ❌ **not yet** | Vercel – see step 3 |

---

## 2. Test locally (click-test)

Run `npm run dev` and go through this:

- [ ] Manager `g10_boss@fitness.dk` / `asdfQWER` → create a trainer
- [ ] Trainer `g10_m@fit.dk` / `aQ` → see clients → create a client
- [ ] Trainer → create a program for John Doe → add an exercise with **repetitions** and one with **time**
- [ ] Trainer → program list → open a program
- [ ] Client `g10_c1@fit.dk` / `aA` → with 1 program it opens directly, with 2+ programs a list is shown
- [ ] Log out works, and `/trainer/programs` without login sends you to `/login`

---

## 3. Deploy to Vercel (via GitHub)

**Why GitHub:** The course repo is on `gitlab.au.dk`. Vercel's GitLab connection only works with gitlab.com, not with self-hosted GitLab like AU's, so it can't import this repo. GitHub works out of the box.

### 3a. Put only `fitness-app` on GitHub

1. On github.com: **New repository** → name e.g. `fitness-app` → **Private** is fine → do **not** add a README
2. In a terminal, from `c:\SW7\swafe` (the course repo root):

   ```bash
   git subtree split --prefix fitness-app -b fitness-app-only
   git push git@github.com:<your-github-user>/fitness-app.git fitness-app-only:main
   ```

   `subtree split` makes a branch that only contains the `fitness-app` folder (as the root) with its commit history. Your GitLab repo is not changed.

3. Later changes: commit in the course repo as normal, then run the two commands again (add `-f` to the push if it complains).

### 3b. Import in Vercel

1. vercel.com → log in with GitHub → **Add New → Project** → choose the `fitness-app` repo
2. Framework: Next.js (detected automatically). Root directory: leave it as is.
3. **Environment Variables:** `API_URL` = `https://assignment2.swafe.dk`
4. **Deploy** → copy the URL (e.g. `https://fitness-app-xxx.vercel.app`)
5. Repeat the click-test from step 2 on the deployed URL

*Alternative without GitHub:* in `fitness-app`, run `npx vercel` and then `npx vercel --prod`, and add `API_URL` in the Vercel dashboard.

---

## 4. Demo video

Record the screen while you follow the script in [plan.md](plan.md#demo-video-script-draft). Use the **deployed** URL. Show every row of the requirements table above, and briefly show one server component and one client component in the code.

- [ ] Video recorded

---

## 5. Clean up the docs before zipping

| File | Keep? | Why |
| --- | --- | --- |
| `README.md` (root) | ✅ Keep | How to run + test users. Add the deployed URL. |
| `docs/hand-in-2.md` | ✅ Keep | Our requirement spec (F0–F6). Fine to hand in. |
| `docs/architecture.md` | ✅ Keep | Shows the server/client design. Good for the examiner. |
| `docs/api.md` | ✅ Keep | The backend endpoints and our findings |
| `docs/decisions.md` | ✅ Keep, but **delete D7 and D14** | D7 is about the old hand-in file, and D14 is about git/AGENTS.md. Neither is relevant to the examiner. |
| `docs/setup.md` | ✅ Keep | How to create, run and deploy |
| `docs/README.md` | ✅ Keep, but **update the table** | Remove the rows for the deleted files |
| `docs/reference/hand-in-1.md` | ❌ Delete | The old hand-in (credit cards) – not relevant |
| `docs/plan.md` | ❌ Delete | Internal to-do list |
| `docs/hand-in-checklist.md` | ❌ Delete | This file |

---

## 6. Zip and submit

- [ ] Deployed URL written in `README.md`
- [ ] Docs cleaned up (step 5)
- [ ] `participants.txt` in the root contains `au742737 Martin Trinh Nguyen` (check that the AUID is right)
- [ ] Delete `node_modules` and `.next`
- [ ] Check that `.env.local` is not in the zip (not secret, but not needed either)
- [ ] Zip the `fitness-app` folder with **zip** (not rar/7z) → `au742737.zip`
- [ ] Upload to Brightspace: **zip + video + deployed URL + prefix `g10`**
