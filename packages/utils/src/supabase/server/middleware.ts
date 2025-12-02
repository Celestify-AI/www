import { createClient as createServerClient } from "@repo/utils/server";
import { createServiceClient } from "@repo/utils/server";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const originalCookies = supabaseResponse.cookies.getAll();

  const serviceSupabase = createServiceClient();
  const supabase = await createServerClient();
  // IMPORTANT: Nothing between client creation and getClaims()
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  const userId = user?.sub;

  // Variables for cookies to set later
  let accountActivated = false;
  let givenName = "User";

  if (userId) {
    const { data: userRow, error: userError } = await serviceSupabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();
    if (!userRow || userError) {
      console.error("Error finding user information in database");
    }
    givenName = userRow?.given_name;
    accountActivated = Boolean(userRow?.account_activated);
  }

  if (request.nextUrl.pathname.startsWith("/app")) {
    if (!userId) {
      console.log(
        "The attempted login did not come from a user and they were redirected to login",
      );
      const url = request.nextUrl.clone();
      url.pathname = "/login";

      supabaseResponse = NextResponse.redirect(url);

      originalCookies.forEach((cookie) => {
        supabaseResponse.cookies.set(cookie.name, cookie.value);
      });

      return supabaseResponse;
    }
    if (!accountActivated) {
      console.log(
        "The user's account was not activated and redirected to pricing",
      );
      const url = request.nextUrl.clone();
      url.pathname = "/pricing";

      supabaseResponse = NextResponse.redirect(url);

      originalCookies.forEach((cookie) => {
        supabaseResponse.cookies.set(cookie.name, cookie.value);
      });

      return supabaseResponse;
    }
  }

  // Redirect logged-in activated users to app
  if (request.nextUrl.pathname === "/" && userId && accountActivated) {
    const url = request.nextUrl.clone();
    url.pathname = "/app";

    supabaseResponse = NextResponse.redirect(url);

    originalCookies.forEach((cookie) => {
      supabaseResponse.cookies.set(cookie.name, cookie.value);
    });

    return supabaseResponse;
  }

  // Drop cookies for client convenience
  supabaseResponse.cookies.set(
    "account_activated",
    accountActivated ? "true" : "false",
  );
  supabaseResponse.cookies.set("given_name", givenName);

  return supabaseResponse;
}
export const config = {
  matcher: "/app/:path*",
};
