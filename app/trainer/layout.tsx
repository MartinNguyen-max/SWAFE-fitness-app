import { requireRole } from "@/lib/auth";

export default async function TrainerLayout({ children }: LayoutProps<"/trainer">) {
  await requireRole("PersonalTrainer");
  return children;
}
