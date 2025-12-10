"use client";

import { IntegrationCard } from "@repo/ui";
import { useState, useEffect } from "react";

interface Provider {
  platformSlug: string;
  platformName: string;
  description: string;
  connected: boolean;
  oauthUrl: string;
}

const ProviderList = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/integration/providers")
      .then((res) => res.json())
      .then((data) => setProviders(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mt-8 text-center font-mono text-(--muted)">
        Loading Integrations...
      </div>
    );
  }

  return (
    <div className="w-full mt-8 flex flex-col gap-4 items-center px-4">
      {providers.map((p) => (
        <IntegrationCard
          key={p.platformSlug}
          platformSlug={p.platformSlug}
          platformName={p.platformName}
          description={p.description}
          connected={p.connected}
          oauthUrl={p.oauthUrl}
        />
      ))}
    </div>
  );
};

export { ProviderList };
