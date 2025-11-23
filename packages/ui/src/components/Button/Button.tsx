"use client";

import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className }: ButtonProps) => {
  return (
    <button
      className={`flex items-center gap-2 border border-(--border) px-3 py-1.5 rounded-md text-sm cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export { Button };
