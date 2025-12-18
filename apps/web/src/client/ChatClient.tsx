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
      content: "Hello! Can you help me with my project?",
    },
    {
      id: "2",
      conversation_id: "conv-123",
      author_role: "agent",
      content: "Of course! I'd be happy to help. What are you working on?",
    },
    {
      id: "3",
      conversation_id: "conv-123",
      author_role: "user",
      content: "My team is struggling with integrating the payment processor.",
    },
    {
      id: "4",
      conversation_id: "conv-123",
      author_role: "agent",
      content:
        "Totally get that! It's not always easy to integrate payment processing into SaaS apps. Looking through past data, it looks like your team is going with Flowglad. Additionally documents show that three pricing tiers have been decided on—Celestify Entry, Celestify Pro, and Celestify Max. Do you want me to look through your codebase for you?",
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
      <div className="w-full max-w-lg py-16">
        {/* Messages */}
        <div className="w-full flex flex-col gap-12 font-slab">
          {messagePairs.map((pair, pairIndex) => (
            <div key={pairIndex} className="flex flex-col gap-0">
              {pair.map((message) => (
                <div key={message.id}>
                  <div
                    className={`p-3 ${message.author_role === "user" ? "w-fit bg-(--card-background) rounded-md border border-(--border)" : ""}`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Chatbox */}
        <div className="fixed bottom-0 left-0 flex py-4 justify-center w-screen pointer-events-none">
          <div className="relative border border-(--border) bg-(--background) rounded-xl w-full px-4 py-3 max-w-lg pointer-events-auto shadow-md/75">
            <textarea
              ref={textareaRef}
              rows={2}
              onInput={handleInput}
              placeholder="Ask Celestia about..."
              className="w-full bg-transparent outline-none resize-none max-h-32 overflow-y-auto mb-10"
            />
            <div className="absolute bottom-2 left-2 flex gap-2">
              <button className="cursor-pointer text-(--muted) bg-(--background) border border-(--border) p-1.5 rounded-md">
                <Plus size={18} />
              </button>
            </div>
            <button className="absolute bottom-2 right-2 cursor-pointer text-(--muted) bg-(--primary) border border-(--primary-border) p-1.5 rounded-md">
              <CornerDownLeft size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
