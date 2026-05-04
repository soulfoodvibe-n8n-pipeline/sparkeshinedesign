import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
  try {
    const { eventId, amount } = await req.json();
    
    if (!eventId || !amount || amount < 1) {
      return NextResponse.json({ error: 'Missing event ID or invalid amount' }, { status: 400 });
    }

    // 1. Fetch the event to get the title
    const supabase = await createClient();
    const { data: event, error } = await supabase
      .from('events')
      .select('title, slug')
      .eq('id', eventId)
      .single();

    if (error || !event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // 2. Create the Stripe Checkout Session
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
    
    // Convert tip amount to cents
    const amountInCents = Math.round(amount * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Gift / Tip: ${event.title}`,
              description: 'Angel\'s Sparkle & Shine Design Co.',
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/vip/${event.slug}?tip=success`,
      cancel_url: `${origin}/vip/${event.slug}?tip=cancelled`,
      metadata: {
        eventId: eventId,
        type: 'tip'
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Tip Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
