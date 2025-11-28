import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";

const serviceSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return req.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              req.cookies.set(name, value)
            );
          },
        },
      }
    );

    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = user.sub;

    const { data: userIntegrations } = await serviceSupabase
      .from("user_integrations")
      .select("provider_id, revoked")
      .eq("user_id", userId);

    const connectedProviderIds = new Set(
      userIntegrations?.filter((ui) => !ui.revoked).map((ui) => ui.provider_id)
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
      { status: 500 }
    );
  }
}
