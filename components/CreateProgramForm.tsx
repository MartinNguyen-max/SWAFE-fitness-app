"use client";

import { useActionState } from "react";
import { createProgram } from "@/lib/actions";
import type { User } from "@/lib/types";
import { buttonClass, Field, FormMessage, inputClass } from "./ui";

export default function CreateProgramForm({ clients }: { clients: User[] }) {
  const [state, formAction, pending] = useActionState(createProgram, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <Field label="Client">
        <select name="clientId" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Choose a client
          </option>
          {clients.map((client) => (
            <option key={client.userId} value={client.userId}>
              {client.firstName} {client.lastName} ({client.email})
            </option>
          ))}
        </select>
      </Field>
      <Field label="Program name">
        <input name="name" required maxLength={64} className={inputClass} />
      </Field>
      <Field label="Description">
        <textarea name="description" rows={3} className={inputClass} />
      </Field>
      <FormMessage state={state} />
      <button type="submit" disabled={pending} className={buttonClass}>
        {pending ? "Creating..." : "Create program"}
      </button>
    </form>
  );
}
