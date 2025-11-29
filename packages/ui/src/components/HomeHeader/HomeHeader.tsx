import { ClockClient } from "@repo/ui";

interface HomeHeaderProps {
  userName: string;
}

const HomeHeader = ({ userName }: HomeHeaderProps) => {
  return (
    <header className="flex flex-col gap-4 items-center">
      <div className="flex flex-col items-center">
        <ClockClient />
        <h1 className="font-headline text-6xl text-center capitalize">{`Hey, ${userName}!`}</h1>
      </div>
      <h2 className="font-mono text-(--muted) text-center">{`Let's get started.`}</h2>
    </header>
  );
};

export { HomeHeader };
