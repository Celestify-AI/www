import { createClient as createServerClient } from "@repo/utils/server";
import { NextResponse, NextRequest } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { timezone, initial_message } = body;

    // Acquire User UUID and access token
    const supabase = await createServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const token = session.access_token;

    // Create conversation via external API
    const response = await fetch(`${process.env.BACKEND_API_BASE_URL}/agent/conversations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        timezone,
        initial_message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to create conversation:", errorText);
      return NextResponse.json(
        { error: "Failed to create conversation" },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json({ conversationId: data.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
