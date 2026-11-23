import { redirect } from "next/navigation";
import { getSession, homePath } from "@/lib/auth";

// "/" sends the user to the start page for their role, or to login
export default async function Home() {
  const session = await getSession();
  redirect(session ? homePath(session.role) : "/login");
}
