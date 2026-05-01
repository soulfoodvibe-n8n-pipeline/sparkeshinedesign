import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function RSVPsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/client-portal/login");
  }

  // Fetch the active event
  const { data: clientData } = await supabase
    .from("clients")
    .select("events(id, title)")
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

  // Fetch all RSVPs for this event
  const { data: rsvps } = await supabase
    .from("rsvps")
    .select("*")
    .eq("event_id", activeEvent.id)
    .order("created_at", { ascending: false });

  // Calculate stats
  const totalGuests = rsvps?.reduce((sum, rsvp) => sum + (rsvp.attending ? rsvp.party_size : 0), 0) || 0;
  const totalDeclined = rsvps?.filter(r => !r.attending).length || 0;

  return (
    <div className="min-h-screen bg-[var(--color-warm-white)]">
      {/* Header */}
      <section className="pt-32 pb-12 bg-hero-gradient text-white">
        <div className="container-glam">
          <Link href="/client-portal" className="text-sm uppercase tracking-widest font-bold text-white/70 hover:text-white mb-6 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="font-display text-4xl mb-2">Guest List Command Center</h1>
          <p className="font-editorial text-xl italic text-[var(--color-blush-light)]">
            Review your confirmed guests and dietary requirements.
          </p>
        </div>
      </section>

      {/* Stats Row */}
      <section className="py-12">
        <div className="container-glam max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 flex justify-between items-center border-l-4 border-[var(--color-rose-gold)]">
              <div>
                <p className="text-sm uppercase tracking-widest text-[var(--color-muted)] mb-1">Total Attending</p>
                <p className="font-display text-3xl text-[var(--color-charcoal)]">{totalGuests} Guests</p>
              </div>
            </div>
            <div className="glass-card p-6 flex justify-between items-center border-l-4 border-[var(--color-champagne)]">
              <div>
                <p className="text-sm uppercase tracking-widest text-[var(--color-muted)] mb-1">Total Responses</p>
                <p className="font-display text-3xl text-[var(--color-charcoal)]">{rsvps?.length || 0} Families</p>
              </div>
            </div>
            <div className="glass-card p-6 flex justify-between items-center border-l-4 border-[var(--color-charcoal)] opacity-70">
              <div>
                <p className="text-sm uppercase tracking-widest text-[var(--color-muted)] mb-1">Declined</p>
                <p className="font-display text-3xl text-[var(--color-charcoal)]">{totalDeclined} Families</p>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="glass-card overflow-hidden shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--color-blush-light)]/30 border-b border-[var(--color-border-light)]">
                    <th className="p-4 font-bold uppercase tracking-widest text-xs text-[var(--color-charcoal)]">Guest Name</th>
                    <th className="p-4 font-bold uppercase tracking-widest text-xs text-[var(--color-charcoal)]">Status</th>
                    <th className="p-4 font-bold uppercase tracking-widest text-xs text-[var(--color-charcoal)]">Party Size</th>
                    <th className="p-4 font-bold uppercase tracking-widest text-xs text-[var(--color-charcoal)]">Dietary Needs</th>
                    <th className="p-4 font-bold uppercase tracking-widest text-xs text-[var(--color-charcoal)]">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-light)]">
                  {rsvps && rsvps.length > 0 ? (
                    rsvps.map((rsvp) => (
                      <tr key={rsvp.id} className="hover:bg-white/50 transition-colors">
                        <td className="p-4 font-medium text-[var(--color-charcoal)]">{rsvp.guest_name}</td>
                        <td className="p-4">
                          {rsvp.attending ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                              Attending
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">
                              Declined
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-[var(--color-muted)]">{rsvp.attending ? rsvp.party_size : "-"}</td>
                        <td className="p-4">
                          {rsvp.dietary_needs !== 'none' ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800 uppercase">
                              {rsvp.dietary_needs.replace('_', ' ')}
                            </span>
                          ) : (
                            <span className="text-[var(--color-muted)] text-sm">None</span>
                          )}
                        </td>
                        <td className="p-4 text-sm text-[var(--color-muted)] italic max-w-xs truncate">
                          {rsvp.special_notes || "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-[var(--color-muted)]">
                        No RSVPs received yet. Share your digital invitation link to start collecting responses!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}
