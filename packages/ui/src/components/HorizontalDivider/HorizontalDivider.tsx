const HorizontalDivider = () => {
  return (
    <div className="w-64 relative">
      <div className="h-px bg-gradient-to-r from-transparent via-(--horizontal-divider) to-transparent"></div>
    </div>
  );
};

export { HorizontalDivider };
