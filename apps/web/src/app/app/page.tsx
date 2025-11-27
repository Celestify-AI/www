"use client";

import { HomeHeader } from "@repo/ui/home-header";
import { NotificationCard } from "@repo/ui/notification-card";
import { Plus } from "lucide-react";
import { OAuthModal } from "@repo/ui/oauth-modal";
import { useState } from "react";

export default function AppHome() {
  const [oauthModalOpen, setOAuthModalOpen] = useState(false);
  return (
    <main className="min-h-screen w-full flex justify-center px-8">
      <div className="flex flex-col gap-24 items-center h-full w-full max-w-lg pt-32 pb-16">
        <HomeHeader userName="Kyle" />
        <div className="flex flex-col gap-4">
          <button
            className="cursor-pointer w-fit"
            onClick={() => setOAuthModalOpen(true)}
          >
            <h3 className="w-fit group flex items-center gap-2 font-mono text-(--muted)">
              <Plus
                size={16}
                className="group-hover:rotate-90 transition-transform"
              />
              Add integration
            </h3>
          </button>
          <OAuthModal
            isOpen={oauthModalOpen}
            onClose={() => setOAuthModalOpen(false)}
          />
          <div className="flex flex-col gap-2">
            <NotificationCard
              redirect="/app/task"
              platform="google-drive"
              title="Team Sync Update"
              description="New agenda posted for tomorrow’s sync. Review action points before the meeting."
            />
          </div>
        </div>
      </div>
    </main>
  );
}
