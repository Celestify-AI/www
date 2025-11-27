import Link from "next/link";
import { PlatformLogo } from "@repo/ui/platform-logo";

interface NotificationCardProps {
  platform: string;
  title: string;
  description: string;
  redirect: string;
}

const NotificationCard = ({
  platform,
  title,
  description,
  redirect,
}: NotificationCardProps) => {
  return (
    <Link href={redirect}>
      <article className="border-2 border-(--border) rounded-2xl flex items-center gap-4 p-4 w-full bg-(--background) shadow-md/75">
        <div className="w-16 h-16 bg-(--background) border-2 border-(--border) rounded-xl flex items-center justify-center shrink-0">
          <PlatformLogo platform={platform} className="w-10 h-10" />
        </div>
        <div>
          <h3 className="font-bold text-lg line-clamp-1">{title}</h3>
          <p className="font-medium text-xs text-(--muted) line-clamp-2">
            {description}
          </p>
        </div>
      </article>
    </Link>
  );
};

export { NotificationCard };
