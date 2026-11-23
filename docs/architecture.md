# Architecture

This describes how the app is built. Update it when the structure changes.

## Tech stack

| Part | Choice |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Package manager | npm |
| Hosting | Vercel |
| Backend | <https://assignment2.swafe.dk> (external, not ours) |

The reasons for the choices are in [decisions.md](decisions.md).

## Server vs. client components

The assignment requires both. The rule we follow:

- **Server components (default)**: all pages, layouts and the `Navbar`. They read the JWT from the cookie and call the backend directly on the server with `apiFetch()`. The browser never sees the token.
- **Client components (`"use client"`)**: only where we need interactivity or browser state:
  - `LoginForm`, `CreateUserForm`, `CreateProgramForm`, `AddExerciseForm` – use `useActionState` to show errors, success messages and a pending state
  - `AddExerciseForm` also uses `useState` to switch between "Repetitions" and "Time"
  - `NavLink` – uses `usePathname()` to highlight the active link
  - `app/error.tsx` – error boundaries must be client components
- **Server actions (`"use server"`, in `lib/actions.ts`)**: the forms submit to them. An action validates the input, calls the backend, and then calls `revalidatePath()` or `redirect()`.

## Authentication flow

```
LoginForm (client) ──submit──> login() server action
                                 │ POST /api/Users/login
                                 │ save the jwt in the httpOnly cookie "token" (24 h)
                                 └ redirect to the role's start page

Role layout (server) ──> requireRole() in lib/auth.ts
                           │ read cookie "token", decode the JWT payload
                           │ not logged in        -> redirect("/login")
                           └ wrong role           -> redirect(own start page)

apiFetch() gets 401 ──> redirect("/logout") ──> cookie deleted ──> /login

Log out button ──> logout() server action ──> cookie deleted ──> /login
```

The JWT is only decoded, not verified. That is fine here, because the backend verifies the token on every request anyway.

## Folder structure

```
fitness-app/
├─ app/
│  ├─ layout.tsx               root layout: Navbar + <main>
│  ├─ page.tsx                 "/" -> redirects to the role's start page or /login
│  ├─ error.tsx                error boundary (client)
│  ├─ login/page.tsx           F1
│  ├─ logout/route.ts          route handler: deletes the cookie (used on 401)
│  ├─ manager/
│  │  ├─ layout.tsx            requireRole("Manager")
│  │  └─ page.tsx              F2 create trainer
│  ├─ trainer/
│  │  ├─ layout.tsx            requireRole("PersonalTrainer")
│  │  ├─ loading.tsx
│  │  ├─ clients/page.tsx      F3 list + create client
│  │  └─ programs/
│  │     ├─ page.tsx           F4.1 list of programs
│  │     ├─ new/page.tsx       F4.2 create program
│  │     └─ [id]/page.tsx      F4.3 + F5 program details + add exercise
│  └─ client/
│     ├─ layout.tsx            requireRole("Client")
│     ├─ loading.tsx
│     └─ programs/
│        ├─ page.tsx           F6.1 list (redirects when there is only one)
│        └─ [id]/page.tsx      F6.2 program details
├─ components/
│  ├─ Navbar.tsx               server – links depend on role
│  ├─ NavLink.tsx              client – active link
│  ├─ LoginForm.tsx            client
│  ├─ CreateUserForm.tsx       client – used by both manager and trainer
│  ├─ CreateProgramForm.tsx    client
│  ├─ AddExerciseForm.tsx      client
│  ├─ ExerciseTable.tsx        server – the Exercise/Description/Sets/Reps-time table
│  ├─ ProgramList.tsx          server – program cards, used by trainer and client
│  └─ ui.tsx                   Card, Field, FormMessage + shared Tailwind classes
├─ lib/
│  ├─ api.ts                   apiFetch() – base URL + Bearer token, error messages
│  ├─ auth.ts                  getSession(), requireRole(), homePath()
│  ├─ actions.ts               server actions: login, logout, createUser, createProgram, addExercise
│  └─ types.ts                 TypeScript types matching the DTOs in api.md
├─ docs/                       all project documentation
└─ participants.txt
```

## Route overview

| Route | Role | Requirement |
| --- | --- | --- |
| `/login` | public | F1 |
| `/manager` | Manager | F2.1 |
| `/trainer/clients` | PersonalTrainer | F3 |
| `/trainer/programs` | PersonalTrainer | F4.1 |
| `/trainer/programs/new` | PersonalTrainer | F4.2 |
| `/trainer/programs/[id]` | PersonalTrainer | F4.3, F5 |
| `/client/programs` | Client | F6.1 |
| `/client/programs/[id]` | Client | F6.2 |

## Design

The design is plain and simple: a dark navigation bar, a light grey background, white cards, and an emerald accent colour for buttons and links. Tables are used for clients and exercises, and cards for programs.
