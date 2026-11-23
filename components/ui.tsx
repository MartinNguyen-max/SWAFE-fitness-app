// Small shared UI pieces. No "use client", so they work in both server and client components.

import type { FormState } from "@/lib/types";

export const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600";

export const buttonClass =
  "inline-block rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50";

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">{children}</div>;
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      {children}
    </label>
  );
}

export function FormMessage({ state }: { state: FormState }) {
  if (state?.error) return <p className="text-sm text-red-600">{state.error}</p>;
  if (state?.success) return <p className="text-sm text-emerald-700">{state.success}</p>;
  return null;
}
