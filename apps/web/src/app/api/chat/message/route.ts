import { createClient as createServerClient } from "@repo/utils/server";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { conversation_id, message } = body;

    if (!conversation_id || !message) {
      return NextResponse.json(
        { error: "Missing conversation_id or message" },
        { status: 400 }
      );
    }

    // Acquire User access token
    const supabase = await createServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = session.access_token;

    // Send message to backend
    const response = await fetch(
      `${process.env.BACKEND_API_BASE_URL}/agent/conversations/${conversation_id}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to send message:", errorText);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

