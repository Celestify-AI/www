"use client";

import { HomeHeader, NotificationCard, OAuthModal, Chatbox } from "@repo/ui";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "motion/react";
import { SectionAccordion } from "@repo/ui";

export default function AppClient() {
  const params = useSearchParams();
  const [oauthModalOpen, setOAuthModalOpen] = useState(false);
  const [givenName, setGivenName] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState("Workflows");
  const tabs = ["Workflows", "Chat"];
  const tabWidths = [91.75, 49.5];

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
        <div className="flex flex-col gap-4 w-full">
          <div className="flex sm:flex-row flex-col gap-2 justify-between">
            <button
              className="cursor-pointer w-fit"
              onClick={() => setOAuthModalOpen(true)}
            >
              <h3 className="text-sm w-fit group flex items-center gap-2 font-mono text-(--muted)">
                <Plus
                  size={16}
                  className="group-hover:rotate-90 transition-transform"
                />
                Add integration
              </h3>
            </button>
            <div
              role="tablist"
              aria-label="Select view"
              className="relative w-fit flex gap-2 bg-(--background) border border-(--border) p-1 rounded-lg font-mono text-sm"
            >
              <motion.div
                className="absolute top-1 left-1 h-[calc(100%-0.5rem)] rounded-md bg-(--primary) border border-(--primary-border)"
                layout
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                animate={{
                  width: tabWidths[tabs.indexOf(activeTab)],
                  x: tabs.indexOf(activeTab) * 99.5,
                }}
              />
              {tabs.map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  className="relative z-10 px-2 py-1 rounded-md font-mono"
                  onClick={() => setActiveTab(tab)}
                >
                  <motion.span
                    animate={{
                      color:
                        activeTab === tab
                          ? "var(--foreground)"
                          : "var(--muted)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="cursor-pointer"
                  >
                    {tab}
                  </motion.span>
                </button>
              ))}
            </div>
          </div>
          <OAuthModal
            isOpen={oauthModalOpen}
            onClose={() => setOAuthModalOpen(false)}
          />
          <AnimatePresence mode="wait">
            {activeTab === "Workflows" ? (
              <motion.div
                key="workflows"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-2"
              >
                <SectionAccordion
                  title="Suggested"
                  defaultOpen={true}
                  className="flex flex-col gap-4"
                >
                  <NotificationCard
                    redirect="/app/task"
                    platform="google-drive"
                    title="Team Sync Update"
                    description="New agenda posted for tomorrow’s sync. Review action points before the meeting."
                    active={false}
                  />
                  <NotificationCard
                    redirect="/app/task"
                    platform="slack"
                    title="Payment Processor"
                    description="Need to choose between Stripe and Flowglad for SaaS payment processing."
                    active={false}
                  />
                </SectionAccordion>
                <SectionAccordion title="Active" defaultOpen={true}>
                  <NotificationCard
                    redirect="/app/task"
                    platform="gmail"
                    title="Incorporation Discussion"
                    description="Debating whether to incorporate as a C Corp in Delaware or in Wyoming."
                    active={true}
                  />
                </SectionAccordion>
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Chatbox />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
