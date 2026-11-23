import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Role, Session } from "./types";

export const TOKEN_COOKIE = "token";

export async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE)?.value;
}

// The JWT is only decoded, not verified - the backend verifies it on every request.
export function decodeToken(token: string): Session | null {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString()
    );
    return {
      userId: Number(payload.UserId),
      name: payload.Name,
      role: payload.Role,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const token = await getToken();
  return token ? decodeToken(token) : null;
}

// The start page for each role
export function homePath(role: Role): string {
  switch (role) {
    case "Manager":
      return "/manager";
    case "PersonalTrainer":
      return "/trainer/programs";
    case "Client":
      return "/client/programs";
  }
}

// Used in the role layouts: redirect if not logged in or wrong role
export async function requireRole(role: Role): Promise<Session> {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== role) redirect(homePath(session.role));
  return session;
}
