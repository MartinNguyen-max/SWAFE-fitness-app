import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logout } from "@/lib/actions";
import type { Role } from "@/lib/types";
import NavLink from "./NavLink";

const links: Record<Role, { href: string; label: string }[]> = {
  Manager: [{ href: "/manager", label: "Create trainer" }],
  PersonalTrainer: [
    { href: "/trainer/programs", label: "Programs" },
    { href: "/trainer/clients", label: "Clients" },
  ],
  Client: [{ href: "/client/programs", label: "My programs" }],
};

const roleNames: Record<Role, string> = {
  Manager: "Manager",
  PersonalTrainer: "Personal trainer",
  Client: "Client",
};

// Server component: reads the session from the cookie
export default async function Navbar() {
  const session = await getSession();

  return (
    <header className="bg-gray-900">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center gap-2 px-4 py-3">
        <Link href="/" className="mr-4 text-lg font-bold text-white">
          Fitness
        </Link>
        {session &&
          links[session.role].map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        {session && (
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-gray-300">
              {session.name} ({roleNames[session.role]})
            </span>
            <form action={logout}>
              <button className="rounded-md border border-gray-600 px-3 py-1 text-sm text-gray-200 hover:bg-gray-700">
                Log out
              </button>
            </form>
          </div>
        )}
      </nav>
    </header>
  );
}
