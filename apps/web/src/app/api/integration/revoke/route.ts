import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const serviceSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

interface RevokeSchema {
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  url: string;
  headers: Record<string, string>;
  params: Record<string, string>;
  body_format: "json" | "form";
  auth: "basic" | "bearer" | null;
}

function injectVars(
  schema: RevokeSchema,
  vars: Record<string, string>
): RevokeSchema {
  const replaceVars = (str: string): string => {
    return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return vars[key] ?? match;
    });
  };

  const processObject = (
    obj: Record<string, string>
  ): Record<string, string> => {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = replaceVars(value);
    }
    return result;
  };

  return {
    ...schema,
    url: replaceVars(schema.url),
    headers: processObject(schema.headers),
    params: processObject(schema.params),
  };
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const platformSlug = url.searchParams.get("platform_slug");

    if (!platformSlug) {
      return NextResponse.json(
        { error: "Missing platform parameter" },
        { status: 400 }
      );
    }

    // Get platform ID
    const { data: platformData, error: platformError } = await serviceSupabase
      .from("oauth_providers")
      .select("id")
      .eq("slug", platformSlug)
      .single();

    if (!platformData || platformError) {
      return NextResponse.json(
        { error: "Provider not found" },
        { status: 404 }
      );
    }

    const platformId = platformData?.id;

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

    if (!user) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    const userId = user?.sub;

    // Set revoked to true
    const { data: revokedData, error: revokedError } = await serviceSupabase
      .from("user_integrations")
      .update({ revoked: true })
      .eq("user_id", userId)
      .eq("provider_id", platformId);

    if (revokedError) {
      return NextResponse.json({ error: "DB update failed" }, { status: 500 });
    }
    console.log(revokedData);
    // Fetch the access token
    const { data: tokenData, error: tokenError } = await serviceSupabase
      .from("user_integrations")
      .select("access_token")
      .eq("user_id", userId)
      .eq("provider_id", platformId)
      .single();

    if (!tokenData || tokenError) {
      return NextResponse.json(
        { error: "Access token not found" },
        { status: 404 }
      );
    }

    // Disable the token with the revoking endpoint
    const { data: providerData, error: providerError } = await serviceSupabase
      .from("oauth_providers")
      .select("revoke_schema, client_id, client_secret, revoke_endpoint")
      .eq("id", platformId)
      .single();

    if (!providerData || providerError) {
      return NextResponse.json(
        { error: "Provider data not found" },
        { status: 404 }
      );
    }

    const revokeSchema = providerData.revoke_schema as RevokeSchema;

    // Inject variables into the schema
    const injectedSchema = injectVars(revokeSchema, {
      revoke_endpoint: providerData.revoke_endpoint,
      access_token: tokenData.access_token,
      client_id: providerData.client_id,
      client_secret: providerData.client_secret,
    });

    // Build the request URL with query params if method is GET
    let requestUrl = injectedSchema.url;
    if (
      injectedSchema.method === "GET" &&
      Object.keys(injectedSchema.params).length > 0
    ) {
      const urlObj = new URL(injectedSchema.url);
      Object.entries(injectedSchema.params).forEach(([key, value]) => {
        urlObj.searchParams.set(key, value);
      });
      requestUrl = urlObj.toString();
    }

    const headers: Record<string, string> = { ...injectedSchema.headers };

    if (
      injectedSchema.auth === "basic" &&
      providerData.client_id &&
      providerData.client_secret
    ) {
      const credentials = Buffer.from(
        `${providerData.client_id}:${providerData.client_secret}`
      ).toString("base64");
      headers["Authorization"] = `Basic ${credentials}`;
    } else if (injectedSchema.auth === "bearer" && tokenData.access_token) {
      headers["Authorization"] = `Bearer ${tokenData.access_token}`;
    }

    let body: string | URLSearchParams | undefined;
    if (["POST", "PUT", "PATCH"].includes(injectedSchema.method)) {
      if (injectedSchema.body_format === "form") {
        body = new URLSearchParams(injectedSchema.params);
      } else {
        body = JSON.stringify(injectedSchema.params);
        if (!headers["Content-Type"]) {
          headers["Content-Type"] = "application/json";
        }
      }
    }

    const revokeResponse = await fetch(requestUrl, {
      method: injectedSchema.method,
      headers,
      body,
    });

    if (!revokeResponse.ok) {
      console.error(
        "Revoke request failed:",
        revokeResponse.status,
        revokeResponse.statusText
      );
    }

    const redirectUrl = new URL("/app", req.url);
    redirectUrl.searchParams.set("oauth_modal_open", "true");

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to revoke the OAuth integration" },
      { status: 500 }
    );
  }
}
