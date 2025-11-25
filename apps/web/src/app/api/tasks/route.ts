import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = "local_dev_token";
    const query = `Tell me about yourself`;

    const response = await fetch(
      "https://zuuwhpvpzr.us-east-1.awsapprunner.com/chat",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `External API responded with ${response.status}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
