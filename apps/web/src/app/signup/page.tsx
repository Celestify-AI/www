import type { Metadata } from "next";
import { Auth } from "@repo/ui/auth";

export const metadata: Metadata = {
  title: "Celestify • Sign Up",
  description: "Sign up with Google to access Celestify.",
};

export default function Home() {
  return (
    <main className="min-h-screen w-full flex justify-center items-center px-8">
      <Auth mode="signup" redirectTo="/app" />
    </main>
  );
}
