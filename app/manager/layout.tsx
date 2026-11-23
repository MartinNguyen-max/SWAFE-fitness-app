import { requireRole } from "@/lib/auth";

export default async function ManagerLayout({ children }: LayoutProps<"/manager">) {
  await requireRole("Manager");
  return children;
}
