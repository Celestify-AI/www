"use client";

import { ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

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
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    setHeight(isOpen ? `${contentRef.current?.scrollHeight}px` : "0px");
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group font-mono text-sm text-(--muted) flex items-center gap-2 cursor-pointer"
      >
        <div className="bg-transparent p-1 rounded-sm group-hover:bg-(--highlight-background) transition-colors">
          <ChevronRight
            size={16}
            className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
          />
        </div>
        {title}
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-100 ease-in-out"
        style={{ maxHeight: height }}
      >
        <div className={`py-4 ${className}`}>{children}</div>
      </div>
    </div>
  );
};

export { SectionAccordion };
