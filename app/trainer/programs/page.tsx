import Link from "next/link";
import ProgramList from "@/components/ProgramList";
import { buttonClass } from "@/components/ui";
import { apiFetch } from "@/lib/api";
import type { User, WorkoutProgram } from "@/lib/types";

export default async function TrainerProgramsPage() {
  // Fetch programs and clients at the same time
  const [programs, clients] = await Promise.all([
    apiFetch<WorkoutProgram[]>("/api/WorkoutPrograms/trainer"),
    apiFetch<User[]>("/api/Users/Clients"),
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Workout programs</h1>
        <Link href="/trainer/programs/new" className={buttonClass}>
          New program
        </Link>
      </div>
      <ProgramList programs={programs} clients={clients} basePath="/trainer/programs" />
    </div>
  );
}
