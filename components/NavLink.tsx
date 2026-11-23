"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Client component: needs usePathname() to highlight the active link
export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`rounded-md px-3 py-2 text-sm ${active ? "bg-gray-700 text-white" : "text-gray-300 hover:text-white"}`}
    >
      {children}
    </Link>
  );
}
