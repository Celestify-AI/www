"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { formatTime } from "@repo/utils/time";

interface HomeHeaderProps {
  userName: string;
}

const HomeHeader = ({ userName }: HomeHeaderProps) => {
  const [time, setTime] = useState<Date | null>(null);
  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const now = new Date();
      setTime(now);
      const msUntilNextMinute =
        (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
      timerId = setTimeout(tick, msUntilNextMinute);
    };

    tick();

    return () => clearTimeout(timerId);
  }, []);

  if (!time) return null;

  return (
    <header className="flex flex-col gap-4 items-center">
      <div className="flex flex-col items-center">
        <time
          dateTime={time.toISOString()}
          className="flex items-center gap-2 font-mono text-(--muted)"
        >
          <Clock size={18} />
          {formatTime(time)}
        </time>
        <h1 className="font-headline text-6xl text-center">{`Hey, ${userName}!`}</h1>
      </div>
      <h2 className="font-mono text-(--muted) text-center">{`Let's get started.`}</h2>
    </header>
  );
};

export { HomeHeader };
