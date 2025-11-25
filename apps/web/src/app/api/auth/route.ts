export async function GET() {
  const token = "local_dev_token";

  try {
    const response = await fetch(
      "https://zuuwhpvpzr.us-east-1.awsapprunner.com/auth/google/link",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `Server responded with ${response.status}` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    console.error("Error fetching auth link:", err);

    // Narrow the unknown type
    const message =
      err instanceof Error ? err.message : "Unknown error occurred";

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
