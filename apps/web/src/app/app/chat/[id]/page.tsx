import type { Metadata } from "next";
import ChatClient from "../../../../client/ChatClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Celestify • Chat",
  description: "Directly chat with Celestify's AI Agent, Celestia.",
};

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;

  return (
    <>
      <Suspense
        fallback={
          <div className="w-screen h-screen flex items-center justify-center font-mono">
            Loading...
          </div>
        }
      >
        <ChatClient conversationId={id} />
      </Suspense>
    </>
  );
}
