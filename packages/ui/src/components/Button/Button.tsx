import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ children, className, disabled, onClick }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`flex items-center gap-2 border border-(--border) px-3 py-1.5 rounded-md text-sm cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
