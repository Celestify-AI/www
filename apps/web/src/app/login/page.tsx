import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Celestify • Sign In",
  description: "Sign in to Google to access Celestify.",
};

export default function Home() {
  return (
    <main className="min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col gap-2 items-center h-full w-5/6 max-w-lg">
        <h1 className="text-lg font-semibold">Sign into Google</h1>
        <h2 className="font-mono text-(--muted)">
          Sign in to Google to access Celestify
        </h2>
        <Link
          href="/"
          className="border border-(--border) px-3 py-1.5 rounded-md"
        >
          Sign in with Google
        </Link>
      </div>
    </main>
  );
}
