"use client";

import { useActionState, useState } from "react";
import { addExercise } from "@/lib/actions";
import { buttonClass, Field, FormMessage, inputClass } from "./ui";

export default function AddExerciseForm({ programId }: { programId: number }) {
  // bind() passes the program id as the first argument to the server action
  const [state, formAction, pending] = useActionState(addExercise.bind(null, programId), undefined);
  // An exercise has either repetitions or a time
  const [type, setType] = useState<"reps" | "time">("reps");

  return (
    <form action={formAction} className="space-y-4">
      <Field label="Exercise name">
        <input name="name" required maxLength={64} className={inputClass} />
      </Field>
      <Field label="Description">
        <textarea name="description" required rows={3} className={inputClass} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Sets">
          <input name="sets" type="number" min={1} required className={inputClass} />
        </Field>
        <Field label="Measured in">
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value as "reps" | "time")}
            className={inputClass}
          >
            <option value="reps">Repetitions</option>
            <option value="time">Time</option>
          </select>
        </Field>
        {type === "reps" ? (
          <Field label="Repetitions">
            <input name="repetitions" type="number" min={1} required className={inputClass} />
          </Field>
        ) : (
          <Field label="Time">
            <input name="time" required maxLength={32} placeholder="e.g. 30 sec" className={inputClass} />
          </Field>
        )}
      </div>
      <FormMessage state={state} />
      <button type="submit" disabled={pending} className={buttonClass}>
        {pending ? "Adding..." : "Add exercise"}
      </button>
    </form>
  );
}
