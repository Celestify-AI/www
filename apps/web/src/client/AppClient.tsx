"use client";

import {
  HomeHeader,
  NotificationCard,
  OAuthModal,
  HomeChatbox,
} from "@repo/ui";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "motion/react";
import { SectionAccordion } from "@repo/ui";

interface Workflow {
  id: string;
  title: string;
  description: string;
  priority: number;
  status: "suggested" | "active" | string;
  ephemeral: boolean;
}

export default function AppClient() {
  const params = useSearchParams();
  const [workflows, setWorkflows] = useState<Workflow[] | null>(null);
  const suggestedWorkflows =
    workflows?.filter((w) => w.status === "suggested") ?? [];
  const activeWorkflows = workflows?.filter((w) => w.status === "active") ?? [];
  const [oauthModalOpen, setOAuthModalOpen] = useState(false);
  const [givenName, setGivenName] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState("Workflows");
  const tabs = ["Workflows", "Chat"];

  // List workflows from API
  useEffect(() => {
    fetch("/api/workflow/list")
      .then((res) => res.json())
      .then((data) => setWorkflows(Array.isArray(data) ? data : []));
  }, []);

  // Take OAuth Modal Open URL Param
  useEffect(() => {
    const raw = params.get("oauth_modal_open");
    if (raw === null) {
      setOAuthModalOpen(false);
      return;
    }
    setOAuthModalOpen(raw === "true");
  }, [params]);

  // Get user name from cookies
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
              {tabs.map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  className="relative px-2 py-1 rounded-md font-mono"
                  onClick={() => setActiveTab(tab)}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="active-tab-indicator"
                      className="absolute inset-0 rounded-md bg-(--primary)"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <motion.span
                    animate={{
                      color:
                        activeTab === tab
                          ? "var(--light-background-text)"
                          : "var(--muted)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative cursor-pointer"
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
                  {suggestedWorkflows.length === 0 ? (
                    <p className="text-sm text-(--muted) font-mono">
                      No suggested workflows
                    </p>
                  ) : (
                    suggestedWorkflows.map((w) => (
                      <NotificationCard
                        key={w.id}
                        redirect="/app/task"
                        platform="gmail"
                        title={w.title}
                        description={w.description}
                        active={false}
                      />
                    ))
                  )}
                </SectionAccordion>
                <SectionAccordion title="Active" defaultOpen={true}>
                  {activeWorkflows.length === 0 ? (
                    <p className="text-sm text-(--muted) font-mono">
                      No active workflows
                    </p>
                  ) : (
                    activeWorkflows.map((w) => (
                      <NotificationCard
                        key={w.id}
                        redirect="/app/task"
                        platform="gmail"
                        title={w.title}
                        description={w.description}
                        active={true}
                      />
                    ))
                  )}
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
                <HomeChatbox />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
