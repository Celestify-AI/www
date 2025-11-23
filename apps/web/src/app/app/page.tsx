import type { Metadata } from "next";
import { HomeHeader } from "@repo/ui/home-header";
import { NotificationCard } from "@repo/ui/notification-card";

export const metadata: Metadata = {
  title: "Celestify • App",
  description: "Access your atomic tasks in the Celestify dashboard.",
};

export default function AppHome() {
  return (
    <main className="min-h-screen w-full flex justify-center px-8">
      <div className="flex flex-col gap-24 items-center h-full w-full max-w-lg pt-16">
        <HomeHeader userName="Kyle" />
        <div className="flex flex-col gap-2">
          <NotificationCard
            platform="gmail"
            title="Celestify Marketing Strategies"
            description="Kyle suggests hiring ABGs to advertise the product on Instagram Reels. Yash thinks it’s a great idea."
          />
        </div>
      </div>
    </main>
  );
}
