import { NextResponse } from "next/server";
import {
  createServiceClient,
  createClient as createServerClient,
} from "@repo/utils/server";

const serviceSupabase = createServiceClient();

export async function GET() {
  try {
    const supabase = await createServerClient();

    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;
    const userId = user?.sub;

    const { data: userIntegrations } = await serviceSupabase
      .from("user_integrations")
      .select("provider_id, revoked")
      .eq("user_id", userId);

    const connectedProviderIds = new Set(
      userIntegrations?.filter((ui) => !ui.revoked).map((ui) => ui.provider_id),
    );

    const { data: allProviders, error: providersError } = await serviceSupabase
      .from("oauth_providers")
      .select("*");

    if (providersError || !allProviders) {
      throw providersError || new Error("Failed to fetch providers");
    }

    const result = allProviders.map((p) => ({
      platformSlug: p.slug,
      platformName: p.name,
      description: p.description,
      connected: connectedProviderIds.has(p.id),
      oauthUrl: `/api/integration/url-generator?provider=${p.id}`,
    }));

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch user providers" },
      { status: 500 },
    );
  }
}
