"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions";
import { buttonClass, Field, FormMessage, inputClass } from "./ui";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <Field label="Email">
        <input name="email" type="email" required autoComplete="username" className={inputClass} />
      </Field>
      <Field label="Password">
        <input name="password" type="password" required autoComplete="current-password" className={inputClass} />
      </Field>
      <FormMessage state={state} />
      <button type="submit" disabled={pending} className={`${buttonClass} w-full`}>
        {pending ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
