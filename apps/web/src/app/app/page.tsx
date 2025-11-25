import type { Metadata } from "next";
import { HomeHeader } from "@repo/ui/home-header";
import { NotificationCard } from "@repo/ui/notification-card";

export const metadata: Metadata = {
  title: "Celestify • App",
  description: "Use Celestify, your personal AI knowledge base",
};

export default function AppHome() {
  return (
    <main className="min-h-screen w-full flex justify-center px-8">
      <div className="flex flex-col gap-24 items-center h-full w-full max-w-lg pt-32 pb-16">
        <HomeHeader userName="Kyle" />
        <div className="flex flex-col gap-2">
          <NotificationCard
            redirect="/app/task"
            platform="slack"
            title="Team Sync Update"
            description="New agenda posted for tomorrow’s sync. Review action points before the meeting."
          />
        </div>
      </div>
    </main>
  );
}
