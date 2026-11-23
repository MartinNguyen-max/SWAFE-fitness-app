import Link from "next/link";
import CreateProgramForm from "@/components/CreateProgramForm";
import { Card } from "@/components/ui";
import { apiFetch } from "@/lib/api";
import type { User } from "@/lib/types";

export default async function NewProgramPage() {
  const clients = await apiFetch<User[]>("/api/Users/Clients");

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-2xl font-semibold">New workout program</h1>
      <Card>
        {clients.length === 0 ? (
          <p className="text-sm text-gray-600">
            You need a client first.{" "}
            <Link href="/trainer/clients" className="text-emerald-700 hover:underline">
              Create a client
            </Link>
          </p>
        ) : (
          <CreateProgramForm clients={clients} />
        )}
      </Card>
    </div>
  );
}
