import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TOKEN_COOKIE } from "@/lib/auth";

// Used by apiFetch when the token has expired (401): clear the cookie and go to login
export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE);
  redirect("/login");
}
