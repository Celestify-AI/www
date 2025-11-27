import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const serviceSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );
  // IMPORTANT: Nothing between client creation and getClaims()
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  const userId = user?.sub;

  if (request.nextUrl.pathname.startsWith("/app")) {
    if (!user) {
      console.log(
        "The attempted login did not come from a user and they were redirected to login."
      );
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
  let accountActivated = false;
  if (userId) {
    const { data: userRow, error: userError } = await serviceSupabase
      .from("users")
      .select("account_activated")
      .eq("id", userId)
      .maybeSingle();
    if (userError) {
      console.error("Error checking author row:", userError);
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    accountActivated = Boolean(userRow?.account_activated);
  }

  if (request.nextUrl.pathname.startsWith("/app")) {
    console.log(
      "The attempted login came from a user, now determining whether subscribed or not."
    );
    if (!accountActivated) {
      console.log("The user was not subscribed.");
      const url = request.nextUrl.clone();
      url.pathname = "/pricing";
      return NextResponse.redirect(url);
    }
  }

  // Drop a cookie into the client to see if the user is authorized or not
  supabaseResponse.cookies.set(
    "account_activated",
    accountActivated ? "true" : "false"
  );

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
export const config = {
  matcher: "/app/:path*",
};
