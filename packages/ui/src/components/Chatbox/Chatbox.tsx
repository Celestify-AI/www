"use client";

import { useRef } from "react";
import { Plus, CornerDownLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Chatbox = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const handleSubmit = async () => {
    const text = textareaRef.current?.value.trim();
    if (!text) return;

    try {
      const res = await fetch("/api/chat/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userText: text,
          attachments: [],
        }),
      });

      if (!res.ok) {
        console.error("Create convo failed");
        return;
      }

      const data = await res.json();
      const conversationId = data.conversationId;

      router.push(`/app/chat/${conversationId}`);
    } catch (err) {
      console.error("Submit error: ", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative transition-all border border-(--border) px-4 py-3 rounded-xl shadow-md/75 bg-(--background) w-full">
      <textarea
        ref={textareaRef}
        rows={2}
        placeholder="Ask Celestia about..."
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent outline-none resize-none max-h-32 overflow-y-auto mb-10"
      ></textarea>
      <div className="absolute bottom-2 left-2 flex gap-2">
        <button className="cursor-pointer text-(--muted) bg-(--background) border border-(--border) p-1.5 rounded-md">
          <Plus size={18} />
        </button>
      </div>
      <button
        onClick={handleSubmit}
        className="absolute bottom-2 right-2 cursor-pointer text-(--muted) bg-(--primary) border border-(--primary-border) p-1.5 rounded-md"
      >
        <CornerDownLeft size={18} />
      </button>
    </div>
  );
};

export { Chatbox };
