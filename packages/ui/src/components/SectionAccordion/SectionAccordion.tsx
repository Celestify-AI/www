"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface SectionAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const SectionAccordion = ({
  title,
  children,
  defaultOpen = false,
  className,
}: SectionAccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group font-mono text-sm text-(--muted) flex items-center gap-2 cursor-pointer"
      >
        <div className="bg-transparent p-1 rounded-sm group-hover:bg-(--highlight-background)">
          <ChevronRight size={16} className={isOpen ? "rotate-90" : ""} />
        </div>
        {title}
      </button>
      {isOpen && <div className={`py-4 ${className}`}>{children}</div>}
    </div>
  );
};

export { SectionAccordion };
