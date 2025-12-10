import { v4 as uuid } from "uuid";
import { createClient as createServerClient, createServiceClient } from "@repo/utils/server";
import { NextResponse, NextRequest } from "next/server";

const serviceSupabase = createServiceClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const userText = body.userText;
    const attachments = body.attachments;

    // Basic validation of input
    if (typeof userText !== "string") {
      return NextResponse.json({ error: "User inputted text that was not a string"}, { status: 400 });
    }

    if (!Array.isArray(attachments) || !attachments.every(a => typeof a === "string")) {
      return NextResponse.json({ error: "Attachments were invalid" }, { status: 400 });
    }

    // Acquire User UUID
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    const conversationId = uuid();

    const { error: conversationError } = await serviceSupabase
      .from("agent_conversations")
      .insert({
        id: conversationId,
        user_id: userId
      });
    
    if (conversationError) {
      console.error(conversationError);
      return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 });
    }

    // Insert initial message
    const { error: msgError } = await serviceSupabase
      .from("agent_messages")
      .insert({
        id: uuid(),
        conversation_id: conversationId,
        author_role: "user",
        content: userText,
        attachments,
      });

    if (msgError) {
      console.error(msgError);
      return NextResponse.json({ error: "Failed to write message" }, { status: 500 });
    }

    return NextResponse.json({ conversationId });
    
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}