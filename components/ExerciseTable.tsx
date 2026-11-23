import type { Exercise } from "@/lib/types";

// Shows "time" if it is set, otherwise the number of repetitions
function repsOrTime(exercise: Exercise): string {
  if (exercise.time) return exercise.time;
  if (exercise.repetitions) return String(exercise.repetitions);
  return "–";
}

export default function ExerciseTable({ exercises }: { exercises: Exercise[] }) {
  if (exercises.length === 0) {
    return <p className="text-sm text-gray-500">This program has no exercises yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-200 text-gray-600">
          <tr>
            <th className="py-2 pr-4">Exercise</th>
            <th className="py-2 pr-4">Description</th>
            <th className="py-2 pr-4">Sets</th>
            <th className="py-2">Reps/time</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr key={exercise.exerciseId} className="border-b border-gray-100 align-top">
              <td className="py-2 pr-4 font-medium">{exercise.name}</td>
              <td className="py-2 pr-4 text-gray-700">{exercise.description}</td>
              <td className="py-2 pr-4">{exercise.sets ?? "–"}</td>
              <td className="py-2">{repsOrTime(exercise)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
