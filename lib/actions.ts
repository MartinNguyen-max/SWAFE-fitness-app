"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { apiFetch, ApiError } from "./api";
import { decodeToken, getSession, homePath, TOKEN_COOKIE } from "./auth";
import type { FormState, WorkoutProgram } from "./types";

function text(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

// ---------- Login / logout (F1) ----------

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = text(formData, "email");
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Email and password are required." };

  let token: string;
  try {
    const data = await apiFetch<{ jwt: string }>("/api/Users/login", {
      method: "POST",
      body: { email, password },
    });
    token = data.jwt;
  } catch (e) {
    if (e instanceof ApiError) return { error: "Wrong email or password." };
    throw e;
  }

  const session = decodeToken(token);
  if (!session) return { error: "Unexpected response from the server." };

  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // the JWT is valid for 24 hours
  });

  redirect(homePath(session.role));
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE);
  redirect("/login");
}

// ---------- Create user (F2.1 manager -> trainer, F3.2 trainer -> client) ----------

export async function createUser(_prev: FormState, formData: FormData): Promise<FormState> {
  const session = await getSession();
  if (!session) redirect("/login");

  const firstName = text(formData, "firstName");
  const lastName = text(formData, "lastName");
  const email = text(formData, "email");
  const password = String(formData.get("password") ?? "");
  if (!firstName || !lastName || !email || !password) {
    return { error: "All fields are required." };
  }

  // The role of the logged-in user decides which kind of user is created
  let body;
  if (session.role === "Manager") {
    body = { firstName, lastName, email, password, accountType: "PersonalTrainer", personalTrainerId: null };
  } else if (session.role === "PersonalTrainer") {
    body = { firstName, lastName, email, password, accountType: "Client", personalTrainerId: session.userId };
  } else {
    return { error: "You are not allowed to create users." };
  }

  try {
    await apiFetch("/api/Users", { method: "POST", body });
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    throw e;
  }

  revalidatePath("/trainer/clients");
  return { success: `${firstName} ${lastName} was created.` };
}

// ---------- Create workout program (F4.2) ----------

export async function createProgram(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = text(formData, "name");
  const description = text(formData, "description");
  const clientId = Number(formData.get("clientId"));
  if (!name) return { error: "Name is required." };
  if (!clientId) return { error: "Choose a client." };

  let program: WorkoutProgram | null;
  try {
    program = await apiFetch<WorkoutProgram | null>("/api/WorkoutPrograms", {
      method: "POST",
      body: { name, description, clientId, exercises: [] },
    });
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    throw e;
  }

  revalidatePath("/trainer/programs");
  redirect(program?.workoutProgramId ? `/trainer/programs/${program.workoutProgramId}` : "/trainer/programs");
}

// ---------- Add exercise to a program (F5.1) ----------

export async function addExercise(
  programId: number,
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const name = text(formData, "name");
  const description = text(formData, "description");
  const sets = Number(formData.get("sets"));
  const type = formData.get("type"); // "reps" or "time"
  const repetitions = Number(formData.get("repetitions"));
  const time = text(formData, "time");

  if (!name || !description) return { error: "Name and description are required." };
  if (!Number.isInteger(sets) || sets < 1) return { error: "Sets must be a whole number of at least 1." };
  if (type === "reps" && (!Number.isInteger(repetitions) || repetitions < 1)) {
    return { error: "Repetitions must be a whole number of at least 1." };
  }
  if (type === "time" && !time) return { error: "Time is required, e.g. \"30 sec\"." };

  try {
    await apiFetch(`/api/Exercises/Program/${programId}`, {
      method: "POST",
      body: {
        name,
        description,
        sets,
        repetitions: type === "reps" ? repetitions : null,
        time: type === "time" ? time : null,
      },
    });
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    throw e;
  }

  revalidatePath(`/trainer/programs/${programId}`);
  return { success: `${name} was added.` };
}
