"use client";

import { HomeHeader, NotificationCard, OAuthModal } from "@repo/ui";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { ArrowUp } from "lucide-react";

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

  if (!givenName) return null;

  return (
    <main className="min-h-screen w-full flex justify-center px-8">
      <div className="flex flex-col gap-24 items-center h-full w-full max-w-lg pt-32 pb-16">
        <HomeHeader userName={givenName} />
        <div className="flex flex-col gap-10">
          <div className="flex bg-(--background) border border-(--border) px-4 py-3 rounded-xl shadow-sm/75">
            <input
              type="text"
              placeholder="Ask Celestia about..."
              className="outline-none flex-1"
            ></input>
            <button className="cursor-pointer text-(--muted) ml-auto bg-(--primary) border border-(--primary-border) p-1.5 rounded-md">
              <ArrowUp />
            </button>
          </div>
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
      </div>
    </main>
  );
}
