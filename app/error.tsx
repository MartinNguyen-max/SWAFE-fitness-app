"use client";

import Link from "next/link";
import { buttonClass, Card } from "@/components/ui";

// Shown when a page fails, e.g. if the backend is down
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Card>
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-sm text-gray-600">{error.message}</p>
      <div className="mt-4 flex gap-3">
        <button onClick={reset} className={buttonClass}>
          Try again
        </button>
        <Link href="/" className="px-4 py-2 text-sm text-gray-700 hover:underline">
          Go to start page
        </Link>
      </div>
    </Card>
  );
}
