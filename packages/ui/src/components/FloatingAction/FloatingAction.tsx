interface FloatingActionProps {
  primaryLabel: string;
  secondaryLabel: string;
  className?: string;
}

const FloatingAction = ({
  primaryLabel,
  secondaryLabel,
  className,
}: FloatingActionProps) => {
  return (
    <div
      className={`z-50 flex p-1.5 gap-2 bg-(--background) border border-(--border) font-medium text-sm rounded-xl ${className}`}
    >
      <button className="text-(--muted) px-2 py-1.5 cursor-pointer rounded-lg">
        {secondaryLabel}
      </button>
      <button className="px-2 py-1.5 bg-(--primary) border border-(--primary-border) cursor-pointer rounded-lg">
        {primaryLabel}
      </button>
    </div>
  );
};

export { FloatingAction };
