"use client";

import { useActionState } from "react";
import { createUser } from "@/lib/actions";
import { buttonClass, Field, FormMessage, inputClass } from "./ui";

// Used by the manager (creates trainers) and the trainer (creates clients).
// The server action decides the account type from the logged-in user's role.
export default function CreateUserForm({ buttonText }: { buttonText: string }) {
  const [state, formAction, pending] = useActionState(createUser, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name">
          <input name="firstName" required maxLength={64} className={inputClass} />
        </Field>
        <Field label="Last name">
          <input name="lastName" required maxLength={32} className={inputClass} />
        </Field>
      </div>
      <Field label="Email">
        <input name="email" type="email" required className={inputClass} />
      </Field>
      <Field label="Password">
        <input name="password" type="password" required autoComplete="new-password" className={inputClass} />
      </Field>
      <FormMessage state={state} />
      <button type="submit" disabled={pending} className={buttonClass}>
        {pending ? "Creating..." : buttonText}
      </button>
    </form>
  );
}
