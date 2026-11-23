import { requireRole } from "@/lib/auth";

export default async function ClientLayout({ children }: LayoutProps<"/client">) {
  await requireRole("Client");
  return children;
}
