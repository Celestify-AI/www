import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const serviceSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const incomingState = url.searchParams.get("state");
    const code = url.searchParams.get("code");

    if (!incomingState || !code) {
      return NextResponse.json(
        { error: "Missing state or code" },
        { status: 400 }
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

    const { data: authData } = await supabase.auth.getClaims();
    const user = authData?.claims;
    if (!user)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    const userId = user.sub;

    // Token exchange
    const { data: providerRow, error: providerError } = await serviceSupabase
      .from("oauth_providers")
      .select("*")
      .eq("id", providerId)
      .maybeSingle();

    if (providerError || !providerRow) {
      return NextResponse.json(
        { error: "Provider not found" },
        { status: 404 }
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
      Date.now() + tokenData.expires_in * 1000
    ).toISOString();

    const { data: integrationRow, error: integrationError } =
      await serviceSupabase.from("user_integrations").upsert({
        user_id: userId,
        provider_id: providerId,
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_at: expiresAt,
        revoked: false,
      });

    if (integrationError) {
      console.error("Upsert failed: ", integrationError);
      return NextResponse.json(
        { error: "Failed to store tokens" },
        { status: 500 }
      );
    }

    console.log("Upserted row:", integrationRow);

    const redirectUrl = new URL("/app", req.url);
    redirectUrl.searchParams.set("oauth_modal_open", "true");

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
