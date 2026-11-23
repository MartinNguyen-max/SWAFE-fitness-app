import { redirect } from "next/navigation";
import { getToken } from "./auth";

const API_URL = process.env.API_URL ?? "https://assignment2.swafe.dk";

export class ApiError extends Error {}

type Options = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
};

// Calls the backend with the JWT from the cookie. Only runs on the server.
export async function apiFetch<T>(path: string, options: Options = {}): Promise<T> {
  const token = await getToken();

  const res = await fetch(`${API_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    cache: "no-store",
  });

  // Token expired or invalid -> clear the cookie and go to login
  if (res.status === 401 && token) redirect("/logout");

  if (!res.ok) throw new ApiError(await readError(res));

  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

// The backend returns errors in different shapes, e.g. {"": ["Invalid login"]}
// or {"title": "...", "errors": {"Email": ["..."]}}. Collect the messages.
async function readError(res: Response): Promise<string> {
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    const messages = Object.values(data.errors ?? data)
      .flat()
      .filter((m) => typeof m === "string");
    if (messages.length > 0) return messages.join(" ");
    if (typeof data.title === "string") return data.title;
  } catch {
    // not JSON
  }
  return text.slice(0, 200) || `Request failed (${res.status})`;
}
