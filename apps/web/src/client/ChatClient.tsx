"use client";

import { useState, useRef } from "react";
import { Plus, CornerDownLeft } from "lucide-react";

interface Message {
  id: string;
  conversation_id: string;
  author_role: "user" | "agent";
  content: string;

  isStreaming?: boolean;
  isComplete?: boolean;
}

export default function Chat() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [messages] = useState<Message[]>([
    {
      id: "1",
      conversation_id: "conv-123",
      author_role: "user",
      content: "I need help integrating Flowglad, a payment processor.",
    },
    {
      id: "2",
      conversation_id: "conv-123",
      author_role: "agent",
      content:
        "I'd be happy to help you integrate Flowglad! To provide the most useful guidance, I need to search for their current documentation and integration methods since this is a specific payment processor.",
    },
  ]);

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  // Group messages into pairs
  const pairMessages = () => {
    const pairs: Message[][] = [];
    let currentPair: Message[] = [];

    messages.forEach((message, index) => {
      currentPair.push(message);

      if (message.author_role === "agent" || index === messages.length - 1) {
        pairs.push([...currentPair]);
        currentPair = [];
      }
    });
    return pairs;
  };

  const messagePairs = pairMessages();

  return (
    <div className="min-h-screen w-full flex justify-center px-8">
      <div className="w-full max-w-3xl py-16 px-10">
        {/* Messages */}
        <div className="w-full flex flex-col gap-12 font-slab">
          {messagePairs.map((pair, pairIndex) => (
            <div key={pairIndex} className="flex flex-col gap-6">
              {pair.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.author_role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-3 ${message.author_role === "user" ? "bg-(--card-background) rounded-md border border-(--border)" : ""}`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Chatbox */}
        <div className="fixed bottom-0 left-0 flex py-16 justify-center bg-transparent w-screen pointer-events-none px-4">
          <div className="relative border border-(--border) bg-(--background) rounded-xl w-full px-4 py-3 max-w-3xl pointer-events-auto shadow-md/75">
            <textarea
              ref={textareaRef}
              rows={2}
              onInput={handleInput}
              placeholder="Prompt Celestia..."
              className="w-full bg-transparent outline-none resize-none max-h-32 overflow-y-auto mb-10"
            />
            <div className="absolute bottom-2 left-2 flex gap-2">
              <button className="cursor-pointer text-(--muted) bg-(--background) border border-(--border) p-1.5 rounded-md">
                <Plus size={18} />
              </button>
            </div>
            <button className="absolute bottom-2 right-2 cursor-pointer text-(--light-background-text) bg-(--primary) border border-(--primary-border) p-1.5 rounded-md">
              <CornerDownLeft size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
