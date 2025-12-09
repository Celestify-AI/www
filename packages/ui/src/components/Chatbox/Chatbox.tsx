"use client";

import { useRef } from "react";
import { Plus, ArrowUp } from "lucide-react";

const Chatbox = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  return (
    <div className="relative transition-all border border-(--border) px-4 py-3 rounded-xl shadow-md/75 bg-(--background) w-full">
      <textarea
        ref={textareaRef}
        rows={2}
        placeholder="Ask Celestia about..."
        onInput={handleInput}
        className="w-full bg-transparent outline-none resize-none max-h-32 overflow-y-auto mb-10"
      ></textarea>
      <div className="absolute bottom-2 left-2 flex gap-2">
        <button className="cursor-pointer text-(--muted) bg-(--background) border border-(--border) p-1.5 rounded-md">
          <Plus size={18} />
        </button>
      </div>
      <button className="absolute bottom-2 right-2 cursor-pointer text-(--muted) bg-(--primary) border border-(--primary-border) p-1.5 rounded-md">
        <ArrowUp size={18} />
      </button>
    </div>
  );
};

export { Chatbox };
