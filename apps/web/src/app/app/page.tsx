import type { Metadata } from "next";
import { HomeHeader } from "@repo/ui/home-header";

export const metadata: Metadata = {
  title: "Celestify • App",
  description: "Access your atomic tasks in the Celestify dashboard.",
};

export default function AppHome() {
  return (
    <main className="min-h-screen w-full flex justify-center px-8">
      <div className="flex flex-col gap-24 items-center h-full w-5/6 max-w-lg pt-16">
        <HomeHeader userName="Kyle" />
        <div></div>
      </div>
    </main>
  );
}
