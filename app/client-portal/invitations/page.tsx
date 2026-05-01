import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import StudioClient from "./StudioClient";

export default async function InvitationStudioPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/client-portal/login");
  }

  // Fetch the active event
  const { data: clientData } = await supabase
    .from("clients")
    .select("events(id, title, slug, event_date, location)")
    .eq("user_id", user.id)
    .single();

  const activeEvent = clientData?.events?.[0];

  if (!activeEvent) {
    return (
      <div className="min-h-screen bg-[var(--color-warm-white)] pt-32 pb-12 text-center">
        <h1 className="font-display text-3xl text-[var(--color-charcoal)]">No Active Event Found</h1>
        <p className="mt-4 text-[var(--color-muted)]">Please contact your event coordinator to set up your dashboard.</p>
      </div>
    );
  }

  return <StudioClient activeEvent={activeEvent} />;
}
