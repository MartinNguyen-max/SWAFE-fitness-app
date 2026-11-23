# Fitness – a Web App with Next.js

## SWAFE 2026 – Hand in 2

## Introduction

A new customer runs a fitness center where several personal trainers work with their individual clients. The owner wants a web app that the personal trainers can use to create individual workout programs for their clients.

Another team develops the backend. Their first release is ready, and we build the front end on top of it.

A workout program is a collection of exercises. Each exercise has a name, a description, a number of sets, and either a number of repetitions or a time.

Example workout program:

| Exercise | Description | Sets | Reps/time |
| --- | --- | --- | --- |
| Squat | Stand with your feet spread shoulder-width apart. Lower your body as far as you can by pushing your hips back and bending your knees. Pause, and then slowly push yourself back to the starting position. | 3 | 20 |
| Push ups | Place your hands on the floor with legs straight out behind you resting on your toes. Bend your arms and slowly … | 3 | 10 |
| Plank | Place your elbows on the floor shoulder-width apart with legs stretched out behind you so only your elbows and toes are in contact with the ground. Use your abdominal muscles to keep … | 1 | 30 sec |

## Requirement specification

The requirement IDs below are our own breakdown of the assignment text. They are used in [plan.md](plan.md) to track progress.

### Functional requirements

`F0` Application skeleton

- `F0.1` The app shall have a navigation bar
- `F0.1.1` The navigation bar shall only show links that are relevant for the logged-in user's role
- `F0.1.2` The navigation bar shall show who is logged in and contain a logout button
- `F0.2` Pages shall be protected so a user who is not logged in is redirected to the login page
- `F0.3` A user shall only be able to open the pages for their own role (manager, personal trainer, client)

`F1` Login (all users)

- `F1.1` Screen shall contain a login form with the fields `email` and `password`
- `F1.1.1` Field `email` is required and must be a valid email
- `F1.1.2` Field `password` is required
- `F1.2` An error message shall be shown when the login fails
- `F1.3` After login the user shall be sent to the start page for their role

`F2` Manager

- `F2.1` The manager can create a new user of type personal trainer
- `F2.1.1` Form fields: `firstName`, `lastName`, `email`, `password` (all required)
- `F2.2` *(optional, dropped – see [decisions.md](decisions.md) D10)* The manager can see a list of personal trainers

`F3` Personal trainer – clients

- `F3.1` The trainer can see a list of their clients
- `F3.1.1` Each list item shall show `firstName`, `lastName` and `email`
- `F3.2` The trainer can create a new user of type client
- `F3.2.1` Form fields: `firstName`, `lastName`, `email`, `password` (all required)
- `F3.2.2` The new client is automatically linked to the logged-in trainer (`personalTrainerId`)

`F4` Personal trainer – workout programs

- `F4.1` The trainer can see a list of their workout programs
- `F4.1.1` Each list item shall show the program `name`, `description` and the client it belongs to
- `F4.1.2` Clicking a program navigates to the program details screen
- `F4.2` The trainer can create a new workout program for a client
- `F4.2.1` Form fields: `name` (required), `description`, `client` (required, selected from the trainer's clients)
- `F4.3` The trainer can see a specific workout program (details screen)
- `F4.3.1` The details screen shows the program name, description and a table of exercises
- `F4.3.2` The exercise table has the columns: Exercise, Description, Sets, Reps/time (see the example above)

`F5` Personal trainer – exercises

- `F5.1` The trainer can add a new exercise to a workout program (from the program details screen)
- `F5.1.1` Form fields: `name` (required), `description` (required), `sets` (required, positive integer)
- `F5.1.2` The exercise has either `repetitions` (positive integer) or `time` (text, e.g. "30 sec"). Exactly one of them must be filled in.
- `F5.1.3` After the exercise is added, the exercise table shall show it

`F6` Client

- `F6.1` The client can see their workout program(s)
- `F6.1.1` If the client has more than one program, a list of programs is shown, and the client can select which program to display
- `F6.1.2` If the client has exactly one program, it is shown directly
- `F6.1.3` If the client has no programs, a message saying so is shown
- `F6.2` The program is displayed as an exercise table like `F4.3.2`

### Technology / design requirements

- [ ] The solution shall be implemented with **Next.js** (App Router)
- [ ] The app must include both **server components** and **client components**
- [ ] The app must use the backend API at <https://assignment2.swafe.dk/swagger/index.html> (not all endpoints are needed)
- [ ] The app must be **deployed to a public cloud** (Vercel)
- [ ] The application must be well structured (shared API/auth code in `lib/`, reusable components in `components/`)

## Using the API

See [api.md](api.md) for the endpoints we use and [setup.md](setup.md) for the step-by-step setup.

1. Go to <https://assignment2.swafe.dk/swagger/index.html>
2. Use the endpoint `POST /api/Groups` with your group number and prefix:

   ```json
   { "groupNumber": "10", "prefix": "g10" }
   ```

3. The following users are then seeded into the database (our prefix is `g10`):

   | Role | Email | Password | Name |
   | --- | --- | --- | --- |
   | Manager | `g10_boss@fitness.dk` | `asdfQWER` | Manager The Boss |
   | Personal trainer | `g10_m@fit.dk` | `aQ` | Superman Mars |
   | Personal trainer | `g10_w@fit.dk` | `aZ` | Superwoman Venus |
   | Client (trainer: Superman) | `g10_c1@fit.dk` | `aA` | John Doe |
   | Client (trainer: Superwoman) | `g10_c2@fit.dk` | `aA` | Jane Doe |

Backend errors can be reported to <per@ece.au.dk> or <jba@ece.au.dk>.

## Formalia

- Group size: 1-4 people
- Deadline: 28th November (the PDF says "november 28, 2025")

## Submission

The submission consists of 4 parts:

1. A **video** demonstrating that the app fulfills the requirements
2. The **solution as a zip** package (see below)
3. **Link** to the deployed app
4. The chosen **prefix** (`g10`)

Before submitting the solution, do the following:

1. Delete the `node_modules` folder in the workspace root folder (also delete `.next`)
2. Add a file `participants.txt` with a new line for each participant: AUID and name separated by whitespace
3. Add `participants.txt` to the root folder of the application
4. Archive and compress the application using `zip`. All other formats will result in a request for resubmission
5. The filename shall be `<AUID_1>-<AUID_2>-<AUID_3>.zip`. Example: `au01248-au84210.zip`
6. Upload it to Brightspace

Example `participants.txt` contents:

```
au01248 Alice
au84210 Bob
```
