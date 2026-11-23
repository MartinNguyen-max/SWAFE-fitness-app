import Link from "next/link";
import AddExerciseForm from "@/components/AddExerciseForm";
import ExerciseTable from "@/components/ExerciseTable";
import { Card } from "@/components/ui";
import { apiFetch } from "@/lib/api";
import type { User, WorkoutProgram } from "@/lib/types";

export default async function TrainerProgramPage({ params }: PageProps<"/trainer/programs/[id]">) {
  const { id } = await params;
  const [program, clients] = await Promise.all([
    apiFetch<WorkoutProgram>(`/api/WorkoutPrograms/${id}`),
    apiFetch<User[]>("/api/Users/Clients"),
  ]);
  const client = clients.find((c) => c.userId === program.clientId);

  return (
    <div className="space-y-8">
      <div>
        <Link href="/trainer/programs" className="text-sm text-emerald-700 hover:underline">
          ← All programs
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">{program.name}</h1>
        {program.description && <p className="mt-1 text-gray-600">{program.description}</p>}
        <p className="mt-1 text-sm text-gray-500">
          Client: {client ? `${client.firstName} ${client.lastName}` : "unknown"}
        </p>
      </div>

      <Card>
        <ExerciseTable exercises={program.exercises ?? []} />
      </Card>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Add exercise</h2>
        <Card>
          <AddExerciseForm programId={program.workoutProgramId} />
        </Card>
      </section>
    </div>
  );
}
