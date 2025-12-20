import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@repo/utils/server";

export async function GET() {
  try {
    // Fetch user JWT
    const supabase = await createServerClient();
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;
    const userJWT = sessionData?.session?.access_token;

    // Send request to backend
    try {
      const res = await fetch(
        `${process.env.BACKEND_API_BASE_URL}/api/v1/workflows/list?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userJWT}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error(
          `Failed to fetch suggested workflows: ${res.statusText}`,
        );
      }

      const suggestedWorkflows = await res.json();
      console.log(suggestedWorkflows);
      return NextResponse.json(suggestedWorkflows.workflows, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { error: "Failed to fetch suggested workflows" },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
