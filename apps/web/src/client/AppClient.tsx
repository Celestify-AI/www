"use client";

import { HomeHeader, NotificationCard, OAuthModal } from "@repo/ui";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function AppClient() {
  const params = useSearchParams();
  const [oauthModalOpen, setOAuthModalOpen] = useState(false);
  const [givenName, setGivenName] = useState<string | null>(null);

  useEffect(() => {
    const raw = params.get("oauth_modal_open");
    if (raw === null) {
      setOAuthModalOpen(false);
      return;
    }
    setOAuthModalOpen(raw === "true");
  }, [params]);

  useEffect(() => {
    const name = Cookies.get("given_name") ?? null;
    setGivenName(name);
  }, []);

  if (!givenName) setGivenName("Kyle");

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
