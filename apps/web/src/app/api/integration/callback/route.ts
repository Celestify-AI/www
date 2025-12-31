import { NextRequest, NextResponse } from "next/server";
import {
  createServiceClient,
  createClient as createServerClient,
} from "@repo/utils/server";

const serviceSupabase = createServiceClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const incomingState = url.searchParams.get("state");
    const code = url.searchParams.get("code");

    if (!incomingState || !code) {
      return NextResponse.json(
        { error: "Missing state or code" },
        { status: 400 },
      );
    }

    // Verify state from cookie
    const cookieState = req.cookies.get("oauth_state")?.value;
    if (!cookieState) {
      throw new Error("Missing state cookie");
    }
    const [incomingCsrf, providerId] = incomingState.split(":");
    const [cookieCsrf] = cookieState.split(":");

    if (incomingCsrf !== cookieCsrf) {
      throw new Error("CSRF verification failed");
    }

    // Dispose of the cookie
    const response = NextResponse.json({ success: true });
    response.cookies.delete({ name: "oauth_state", path: "/" });

    // Get UUID
    const supabase = await createServerClient();
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;
    const userJWT = sessionData?.session?.access_token;

    // Token exchange
    const { data: providerRow, error: providerError } = await serviceSupabase
      .from("oauth_providers")
      .select("*")
      .eq("id", providerId)
      .maybeSingle();

    if (providerError || !providerRow) {
      return NextResponse.json(
        { error: "Provider not found" },
        { status: 404 },
      );
    }

    const tokenEndpoint = providerRow.token_endpoint;
    const clientId = providerRow.client_id;
    const clientSecret = providerRow.client_secret;

    const tokenParams: Record<string, string> = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/integration/callback`,
    };

    if (providerRow.additional_token_params) {
      Object.assign(tokenParams, providerRow.additional_token_params);
    }

    const body = new URLSearchParams(tokenParams);

    const tokenRes = await fetch(tokenEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const tokenData = await tokenRes.json();

    console.log(tokenData);

    const expiresAt = new Date(
      Date.now() + tokenData.expires_in * 1000,
    ).toISOString();

    const { data: integrationRow, error: integrationError } =
      await serviceSupabase
        .from("user_integrations")
        .upsert({
          user_id: userId,
          provider_id: providerId,
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_at: expiresAt,
          revoked: false,
        })
        .select()
        .single();

    if (integrationError) {
      console.error("Upsert failed: ", integrationError);
      return NextResponse.json(
        { error: "Failed to store tokens" },
        { status: 500 },
      );
    }

    console.log("DB response: ", integrationRow);

    // Onboard on backend
    try {
      await fetch(`${process.env.BACKEND_API_BASE_URL}/integrations/onboard`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userJWT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          id: integrationRow?.id,
        }),
      });
    } catch (err) {
      console.error("Onboarding trigger failed:", err);
    }

    const redirectUrl = new URL("/app", req.url);
    redirectUrl.searchParams.set("oauth_modal_open", "true");

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
