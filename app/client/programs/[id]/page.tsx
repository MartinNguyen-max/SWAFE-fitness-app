import Link from "next/link";
import ExerciseTable from "@/components/ExerciseTable";
import { Card } from "@/components/ui";
import { apiFetch } from "@/lib/api";
import type { WorkoutProgram } from "@/lib/types";

export default async function ClientProgramPage({ params }: PageProps<"/client/programs/[id]">) {
  const { id } = await params;
  const [program, programs] = await Promise.all([
    apiFetch<WorkoutProgram>(`/api/WorkoutPrograms/${id}`),
    apiFetch<WorkoutProgram[]>("/api/WorkoutPrograms"),
  ]);

  return (
    <div className="space-y-6">
      <div>
        {/* Only show the link back to the list if there is more than one program */}
        {programs.length > 1 && (
          <Link href="/client/programs" className="text-sm text-emerald-700 hover:underline">
            ← All my programs
          </Link>
        )}
        <h1 className="mt-2 text-2xl font-semibold">{program.name}</h1>
        {program.description && <p className="mt-1 text-gray-600">{program.description}</p>}
      </div>
      <Card>
        <ExerciseTable exercises={program.exercises ?? []} />
      </Card>
    </div>
  );
}
