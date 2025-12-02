import { NextResponse, NextRequest } from "next/server";
import { createServiceClient } from "@repo/utils/server";
import crypto from "crypto";

const serviceSupabase = createServiceClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const providerId = url.searchParams.get("provider");
    if (!providerId) {
      return NextResponse.json(
        { error: "Missing provider param" },
        { status: 400 },
      );
    }
    console.log("Generating OAuth URL for ", providerId);

    const { data: providerData, error: providerError } = await serviceSupabase
      .from("oauth_providers")
      .select("*")
      .eq("id", providerId)
      .maybeSingle();

    if (providerError || !providerData) {
      return NextResponse.json(
        { error: "Provider not found" },
        { status: 404 },
      );
    }

    const scopes: string[] = Array.isArray(providerData.scope?.scopes)
      ? providerData.scope.scopes
      : [];

    const additionalParams: Record<string, unknown> =
      providerData.additional_params &&
      typeof providerData.additional_params === "object" &&
      !Array.isArray(providerData.additional_params)
        ? providerData.additional_params
        : {};

    const additionalParamsString: Record<string, string> = {};
    for (const [key, value] of Object.entries(additionalParams)) {
      additionalParamsString[key] = String(value);
    }

    const csrf = crypto.randomBytes(32).toString("hex");
    const state = `${csrf}:${providerId}`;

    const queryParams = new URLSearchParams({
      client_id: providerData.client_id,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/integration/callback`,
      scope: scopes.join(" "),
      state,
      ...additionalParamsString,
    });

    const oauthUrl = `${providerData.auth_url}?${queryParams.toString()}`;
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
      { status: 500 },
    );
  }
}
