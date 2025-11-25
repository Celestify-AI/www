import type { Metadata } from "next";
import { Auth } from "@repo/ui/auth";

export const metadata: Metadata = {
  title: "Celestify • Sign In",
  description: "Sign in to Google to access Celestify.",
};

export default function Login() {
  return (
    <main className="min-h-screen w-full flex justify-center items-center px-8">
      <Auth mode="login" />
    </main>
  );
}
