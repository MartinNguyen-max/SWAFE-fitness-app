import LoginForm from "@/components/LoginForm";
import { Card } from "@/components/ui";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm">
      <Card>
        <h1 className="mb-6 text-2xl font-semibold">Log in</h1>
        <LoginForm />
      </Card>
    </div>
  );
}
