import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const serviceSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const providerId = url.searchParams.get("provider");
    if (!providerId) {
      return NextResponse.json(
        { error: "Missing provider param" },
        { status: 400 }
      );
    }
    console.log("Generating OAuth URL for ", providerId);

    const { data: provider, error: providerError } = await serviceSupabase
      .from("oauth_providers")
      .select("*")
      .eq("id", providerId)
      .maybeSingle();

    if (providerError || !provider) {
      return NextResponse.json(
        { error: "Provider not found" },
        { status: 404 }
      );
    }

    let scopes: string[] = [];
    if (provider.scope) {
      if (typeof provider.scope === "string") {
        scopes = JSON.parse(provider.scope)?.scopes || [];
      } else if (typeof provider.scope === "object") {
        scopes = provider.scope.scopes || [];
      }
    }

    let additionalParams: Record<string, unknown> = {};
    if (provider.additional_params) {
      if (typeof provider.additional_params === "string") {
        additionalParams = JSON.parse(provider.additional_params);
      } else if (typeof provider.additional_params === "object") {
        additionalParams = provider.additional_params;
      }
    }

    const additionalParamsString: Record<string, string> = {};
    for (const [key, value] of Object.entries(additionalParams)) {
      additionalParamsString[key] = String(value);
    }

    const csrf = crypto.randomBytes(32).toString("hex");
    const state = `${csrf}:${providerId}`;

    const queryParams = new URLSearchParams({
      client_id: provider.client_id,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/integration/callback`,
      scope: scopes.join(" "),
      state,
      ...additionalParams,
    });

    const oauthUrl = `${provider.auth_url}?${queryParams.toString()}`;
    console.log("Generated OAuth URL:", oauthUrl);
    const response = NextResponse.json({ oauthUrl }, { status: 200 });
    const expires = new Date(Date.now() + 10 * 60 * 1000);
    const isDev = process.env.NODE_ENV === "development";

    response.cookies.set("oauth_state", state, {
      httpOnly: true,
      secure: !isDev,
      path: "/",
      sameSite: "lax",
      expires,
    });
    return response;
  } catch (err) {
    console.error("Error generating OAuth URL:", err);
    return NextResponse.json(
      { error: "Failed to generate OAuth URL" },
      { status: 500 }
    );
  }
}
