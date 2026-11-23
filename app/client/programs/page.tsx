import { redirect } from "next/navigation";
import ProgramList from "@/components/ProgramList";
import { apiFetch } from "@/lib/api";
import type { WorkoutProgram } from "@/lib/types";

export default async function ClientProgramsPage() {
  const programs = await apiFetch<WorkoutProgram[]>("/api/WorkoutPrograms");

  // Only one program: show it directly (F6.1.2)
  if (programs.length === 1) {
    redirect(`/client/programs/${programs[0].workoutProgramId}`);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">My workout programs</h1>
      {programs.length > 1 && <p className="text-sm text-gray-600">Choose a program to see the exercises.</p>}
      <ProgramList programs={programs} basePath="/client/programs" />
    </div>
  );
}
