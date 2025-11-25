"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { formatTime } from "@repo/utils/time";

const ClockClient = () => {
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

  return (
    <time
      dateTime={time?.toISOString() ?? ""}
      className="flex items-center gap-2 font-mono text-(--muted)"
    >
      <Clock size={18} />
      {time ? formatTime(time) : "--:-- --"}
    </time>
  );
};

export { ClockClient };
