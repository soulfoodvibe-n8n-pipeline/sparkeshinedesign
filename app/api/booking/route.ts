import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // The webhook URL will be configured via n8n later.
    // For now, it falls back to a sandbox/mock or throws safely if undefined, 
    // but we simulate success locally so the form flow doesn't break for Angel's testing.
    const N8N_WEBHOOK_URL = process.env.N8N_BOOKING_WEBHOOK_URL;

    if (N8N_WEBHOOK_URL) {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "website_booking_flow",
          timestamp: new Date().toISOString(),
          lead: data,
        }),
      });

      if (!response.ok) {
        throw new Error("n8n webhook responded with an error");
      }
    } else {
      // Simulate network delay for local testing without the webhook
      console.log("No N8N_BOOKING_WEBHOOK_URL configured. Payload logged below:");
      console.dir(data, { depth: null });
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Booking API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit booking inquiry." },
      { status: 500 }
    );
  }
}
