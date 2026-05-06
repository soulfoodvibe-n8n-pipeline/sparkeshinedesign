import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string || 'sk_test_dummy', {
      apiVersion: '2023-10-16' as any,
    });

    const { eventId } = await req.json();
    
    if (!eventId) {
      return NextResponse.json({ error: 'Missing event ID' }, { status: 400 });
    }

    // 1. Fetch the event and balance due from Supabase
    const supabase = await createClient();
    const { data: event, error } = await supabase
      .from('events')
      .select('title, balance_due')
      .eq('id', eventId)
      .single();

    if (error || !event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // If there is no balance, or it's 0, don't create a checkout session
    if (!event.balance_due || event.balance_due <= 0) {
      return NextResponse.json({ error: 'No balance due for this event' }, { status: 400 });
    }

    // 2. Create the Stripe Checkout Session
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
    
    // Convert balance to cents (Stripe requires integer amounts in the smallest currency unit)
    const amountInCents = Math.round(event.balance_due * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Final Balance: ${event.title}`,
              description: 'Angel\'s Sparkle & Shine Design Co.',
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/client-portal?payment=success`,
      cancel_url: `${origin}/client-portal?payment=cancelled`,
      metadata: {
        eventId: eventId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
