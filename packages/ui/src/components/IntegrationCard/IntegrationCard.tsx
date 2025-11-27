import { PlatformLogo } from "@repo/ui/platform-logo";
import { Check, Plug } from "lucide-react";

interface IntegrationCardProps {
  platformSlug: string;
  platformName: string;
  description: string;
  connected: boolean;
  oauthUrl: string;
}

const IntegrationCard = ({
  platformSlug,
  platformName,
  description,
  connected,
  oauthUrl,
}: IntegrationCardProps) => {
  const fetchOAuthLink = async () => {
    try {
      const res = await fetch(oauthUrl, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to get OAuth URL");
      window.location.href = data.oauthUrl;
    } catch (err) {
      console.error("Failed to generate OAuth URL: ", err);
    }
  };
  return (
    <article
      className={`bg-(--background) w-full border-2 border-(--border) rounded-2xl flex items-center gap-4 p-2 shadow-md/75 max-w-lg`}
    >
      <div className="w-16 h-16 bg-(--background) border-2 border-(--border) rounded-xl flex items-center justify-center shrink-0">
        <PlatformLogo platform={platformSlug} className="w-10 h-10" />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="font-bold text-lg line-clamp-1 capitalize text-left">
          {platformName}
        </h3>
        <p className="font-medium text-xs text-(--muted) line-clamp-2 text-left">
          {description}
        </p>
      </div>
      {connected ? (
        <div className="ml-auto mr-2 font-medium text-sm px-3 py-1.5 rounded-lg bg-(--primary-muted) border-2 border-(--primary-muted-border) flex gap-1.5 items-center">
          Connected
          <Check size={14} />
        </div>
      ) : (
        <button
          disabled={connected}
          onClick={fetchOAuthLink}
          className="ml-auto mr-2 font-medium text-sm px-3 py-1.5 rounded-lg bg-(--primary) border-2 border-(--primary-border) flex gap-1.5 items-center cursor-pointer whitespace-nowrap"
        >
          Connect
          <Plug size={14} />
        </button>
      )}
    </article>
  );
};

export { IntegrationCard };
