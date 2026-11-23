# Backend API reference

Base URL: `https://assignment2.swafe.dk`
Swagger UI: <https://assignment2.swafe.dk/swagger/index.html>
OpenAPI JSON: `https://assignment2.swafe.dk/swagger/v1/swagger.json`

> **Note:** The server has a firewall (ModSecurity) that blocks requests that look like bots, for example plain `curl` without a browser `User-Agent`. Requests from the browser and from Next.js `fetch` should be fine, but keep it in mind if you get a strange `455` HTML error.

## Authentication

1. `POST /api/Users/login` with `{ "email": "...", "password": "..." }`
2. The response is `{ "jwt": "<token>" }`
3. Every other request must send the header `Authorization: Bearer <token>`

The JWT payload contains information about the user. We decode it in the app to know who is logged in. Example payload (logged in as `g10_m@fit.dk`, checked 2026-11-20):

```json
{
  "Name": "Superman",
  "Role": "PersonalTrainer",
  "UserId": "118",
  "GroupId": "bf252698-1deb-4add-bc4f-efcac45247a5",
  "nbf": "1795185670",
  "exp": "1795272070"
}
```

| Claim | Meaning | Note |
| --- | --- | --- |
| `Name` | First name | |
| `Role` | `Manager`, `PersonalTrainer` or `Client` | |
| `UserId` | The user's id | **A string**, so convert it with `Number(...)` |
| `exp` | Expiry time (unix seconds) | A string. The token is valid for **24 hours**, so the cookie gets the same lifetime |

Our seeded user ids (group g10): Manager = 117, Superman = 118, John Doe (client) = 120. The ids are **not** 2/3 as the PDF suggests, so never hard-code ids.

Roles (`accountType`): `Manager`, `PersonalTrainer`, `Client`.

## Endpoints we use

| Requirement | Method & path | Who | Notes |
| --- | --- | --- | --- |
| F1 Login | `POST /api/Users/login` | all | Returns `{ jwt }` |
| F2.1 Create trainer | `POST /api/Users` | manager | `accountType: "PersonalTrainer"` |
| F2.2 List trainers | `GET /api/Users` | manager | All users; filter on `accountType` |
| F3.1 List clients | `GET /api/Users/Clients` | trainer | The trainer's own clients |
| F3.2 Create client | `POST /api/Users` | trainer | `accountType: "Client"`, `personalTrainerId` = own id |
| F4.1 List programs | `GET /api/WorkoutPrograms/trainer` | trainer | Programs created by the trainer |
| F4.2 Create program | `POST /api/WorkoutPrograms` | trainer | Body: `CreateWorkoutDto` |
| F4.3 / F6 Program details | `GET /api/WorkoutPrograms/{id}` | trainer, client | Returns the program with exercises |
| F5.1 Add exercise | `POST /api/Exercises/Program/{programId}` | trainer | Body: `CreateExerciseDto` |
| F6.1 Client's programs | `GET /api/WorkoutPrograms` | client | "All programs associated with the current user" |

Endpoints we do **not** plan to use: `PUT/DELETE` on users, programs and exercises, `GET /api/Exercises*`, `PUT /api/Users/Password`, `GET /api/Users/Trainer`, `GET /api/WorkoutPrograms/client/{id}`.

## Backend behaviour we found while testing (2026-11-20)

- `GET /api/Users` returns users from **all groups** (111 users), not only ours. That is why F2.2 was dropped ([decisions.md](decisions.md) D10).
- `POST /api/WorkoutPrograms` returns `201` with the created `WorkoutProgram`, so we can redirect to its id.
- `POST /api/Exercises/Program/{id}` returns `201` with the created `Exercise`.
- When a group is registered, the backend seeds a sample program "Easy" for John Doe with two exercises (Push ups with reps, Plank with time).
- The seeded data is not consistent about reps/time: Push ups has `time: ""`, and Plank has `repetitions: 0`.
- Login errors come back as `{"": ["Invalid login"]}`.

## Data models (DTOs)

### `CreateUserDto` (POST /api/Users)

| Field | Type | Rules |
| --- | --- | --- |
| `firstName` | string | required, max 64 |
| `lastName` | string | required, max 32 |
| `email` | string (email) | required, max 254 |
| `password` | string | required, max 60 |
| `personalTrainerId` | number \| null | only for clients |
| `accountType` | string | `"PersonalTrainer"` or `"Client"` |

### `UserDto` (response)

Same as above plus `userId: number`.

### `CreateWorkoutDto` (POST /api/WorkoutPrograms)

| Field | Type | Rules |
| --- | --- | --- |
| `name` | string \| null | |
| `description` | string \| null | max 4096 |
| `exercises` | `CreateExerciseDto[]` \| null | can be empty; we add exercises afterwards |
| `clientId` | number \| null | the client the program is for |

### `WorkoutProgram` (response)

| Field | Type |
| --- | --- |
| `workoutProgramId` | number |
| `groupId` | string (uuid) |
| `name` | string \| null (max 64) |
| `description` | string \| null |
| `exercises` | `Exercise[]` \| null |
| `personalTrainerId` | number |
| `clientId` | number \| null |

### `CreateExerciseDto` (POST /api/Exercises/Program/{programId})

| Field | Type | Rules |
| --- | --- | --- |
| `name` | string \| null | max 64 |
| `description` | string \| null | max 4096 |
| `sets` | number \| null | integer |
| `repetitions` | number \| null | integer – use this **or** `time` |
| `time` | string \| null | max 32, e.g. `"30 sec"` |

### `Exercise` (response)

Same as `CreateExerciseDto` plus `exerciseId`, `groupId`, `workoutProgramId`, `personalTrainerId`.
