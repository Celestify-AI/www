import Link from "next/link";
import { PlatformLogo } from "@repo/ui";
import { X, Check } from "lucide-react";

interface NotificationCardProps {
  platform: string;
  title: string;
  description: string;
  redirect: string;
  active: boolean;
}

const NotificationCard = ({
  platform,
  title,
  description,
  redirect,
  active
}: NotificationCardProps) => {
  return (
    <Link href={redirect}>
      <article className="relative group border border-(--border) rounded-2xl flex items-center gap-4 p-4 w-full bg-(--background) shadow-md/75">
        {!active && (
          <div className="flex items-center hidden group-hover:flex absolute top-3 right-3 text-(--muted)">
            <button className="cursor-pointer hover:bg-(--highlight-background) p-1 rounded-sm hover:text-red-500"><X size={16} /></button>
            <button className="cursor-pointer hover:bg-(--highlight-background) p-1 rounded-sm hover:text-green-500"><Check size={16} /></button> 
          </div>
        )}
        <div className="w-16 h-16 bg-(--background) border border-(--border) rounded-xl flex items-center justify-center shrink-0">
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
