import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia", // Current Stripe API Version
});

export async function POST(req: Request) {
  try {
    const { items, successUrl, cancelUrl, customerEmail, metadata } = await req.json();

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe Secret Key is missing in environment variables." },
        { status: 500 }
      );
    }

    // Map checkout items to Stripe line_items format
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
          description: item.description || undefined,
          // Attach custom personalization info to the product metadata in Stripe
          metadata: {
            size: item.size || "N/A",
            personalization: item.personalization || "N/A",
            printfulSku: item.printfulSku || "N/A",
          },
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects cents
      },
      quantity: item.quantity || 1,
    }));

    // Create the Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/shop?success=true`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/shop?canceled=true`,
      customer_email: customerEmail,
      metadata: metadata, // Pass root metadata (e.g. orderType: 'deposit' or 'merch')
    });

    return NextResponse.json({ id: session.id, url: session.url }, { status: 200 });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
