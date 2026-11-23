// Types matching the backend DTOs (see docs/api.md)

export type Role = "Manager" | "PersonalTrainer" | "Client";

export type User = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  personalTrainerId: number | null;
  accountType: Role;
};

export type Exercise = {
  exerciseId: number;
  name: string | null;
  description: string | null;
  sets: number | null;
  repetitions: number | null;
  time: string | null;
  workoutProgramId: number | null;
};

export type WorkoutProgram = {
  workoutProgramId: number;
  name: string | null;
  description: string | null;
  exercises: Exercise[] | null;
  personalTrainerId: number;
  clientId: number | null;
};

// The logged-in user, decoded from the JWT
export type Session = {
  userId: number;
  name: string;
  role: Role;
};

// Returned by server actions to the forms
export type FormState = { error?: string; success?: string } | undefined;
