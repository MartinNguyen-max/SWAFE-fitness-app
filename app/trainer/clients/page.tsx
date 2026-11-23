import CreateUserForm from "@/components/CreateUserForm";
import { Card } from "@/components/ui";
import { apiFetch } from "@/lib/api";
import type { User } from "@/lib/types";

// Server component: fetches the clients on the server
export default async function ClientsPage() {
  const clients = await apiFetch<User[]>("/api/Users/Clients");

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">My clients</h1>
        <Card>
          {clients.length === 0 ? (
            <p className="text-sm text-gray-500">You have no clients yet.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 text-gray-600">
                <tr>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.userId} className="border-b border-gray-100">
                    <td className="py-2 pr-4">
                      {client.firstName} {client.lastName}
                    </td>
                    <td className="py-2 text-gray-700">{client.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Create client</h2>
        <Card>
          <CreateUserForm buttonText="Create client" />
        </Card>
      </section>
    </div>
  );
}
