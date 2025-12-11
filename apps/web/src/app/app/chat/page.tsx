import type { Metadata } from "next";
import ChatClient from "../../../client/ChatClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Celestify • Chat",
  description: "Directly chat with Celestify's AI Agent, Celestia.",
};

export default function AppHome() {
  return (
    <>
      <Suspense
        fallback={
          <div className="w-screen h-screen flex items-center justify-center font-mono">
            Loading...
          </div>
        }
      >
        <ChatClient />
      </Suspense>
    </>
  );
}
