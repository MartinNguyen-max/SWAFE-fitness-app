import CreateUserForm from "@/components/CreateUserForm";
import { Card } from "@/components/ui";

export default function ManagerPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-2xl font-semibold">Create personal trainer</h1>
      <Card>
        <CreateUserForm buttonText="Create trainer" />
      </Card>
    </div>
  );
}
