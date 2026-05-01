import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function ClientPortal() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/client-portal/login");
  }

  // Fetch the client record and their associated event
  const { data: clientData } = await supabase
    .from("clients")
    .select(`
      first_name,
      last_name,
      events (
        id,
        title,
        event_date,
        location,
        slug
      )
    `)
    .eq("user_id", user.id)
    .single();

  const activeEvent = clientData?.events?.[0] || null;

  // Fetch RSVP stats if an event exists
  let rsvpCount = 0;
  let galleryCount = 0;

  if (activeEvent) {
    const { count: rsvpC } = await supabase
      .from("rsvps")
      .select("*", { count: "exact", head: true })
      .eq("event_id", activeEvent.id);
    
    rsvpCount = rsvpC || 0;

    const { count: galC } = await supabase
      .from("gallery_images")
      .select("*", { count: "exact", head: true })
      .eq("event_id", activeEvent.id);
    
    galleryCount = galC || 0;
  }

  return <DashboardClient user={user} clientData={clientData} activeEvent={activeEvent} rsvpCount={rsvpCount} galleryCount={galleryCount} />;
}
