import Link from "next/link";
import type { User, WorkoutProgram } from "@/lib/types";

type Props = {
  programs: WorkoutProgram[];
  basePath: string; // "/trainer/programs" or "/client/programs"
  clients?: User[]; // when given, the client's name is shown
};

export default function ProgramList({ programs, basePath, clients }: Props) {
  if (programs.length === 0) {
    return <p className="text-sm text-gray-500">No workout programs yet.</p>;
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {programs.map((program) => {
        const client = clients?.find((c) => c.userId === program.clientId);
        return (
          <li key={program.workoutProgramId}>
            <Link
              href={`${basePath}/${program.workoutProgramId}`}
              className="block h-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:border-emerald-600"
            >
              <h3 className="font-semibold">{program.name}</h3>
              {program.description && <p className="mt-1 text-sm text-gray-600">{program.description}</p>}
              <p className="mt-2 text-xs text-gray-500">
                {program.exercises?.length ?? 0} exercises
                {clients && ` · Client: ${client ? `${client.firstName} ${client.lastName}` : "unknown"}`}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
