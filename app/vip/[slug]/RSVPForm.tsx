"use client";

import { useState } from "react";
import { createClient } from '@/lib/supabase/client';

export default function RSVPForm({ eventId, activeTheme }: { eventId: string, activeTheme: any }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    guest_name: "",
    email: "",
    attending: true,
    party_size: 1,
    dietary_needs: "none",
    special_notes: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const supabase = createClient();
    
    const { error } = await supabase
      .from('rsvps')
      .insert({
        event_id: eventId,
        guest_name: formData.guest_name,
        email: formData.email,
        attending: formData.attending,
        party_size: formData.attending ? formData.party_size : 0,
        dietary_needs: formData.dietary_needs,
        special_notes: formData.special_notes
      });
      
    if (error) {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="glass-card p-12 text-center" style={{ borderColor: activeTheme.borderColor }}>
        <h3 className="font-script text-5xl mb-4" style={{ color: activeTheme.textColor }}>Thank You!</h3>
        <p className="font-editorial text-xl" style={{ color: activeTheme.accentColor }}>
          {formData.attending 
            ? "Your RSVP has been received. We can't wait to see you!" 
            : "We're sorry you can't make it, but thank you for letting us know."}
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 md:p-12 relative overflow-hidden" style={{ borderColor: activeTheme.borderColor || 'var(--color-border-light)' }}>
      <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: activeTheme.accentColor }}></div>
      
      <h3 className="font-display text-3xl mb-2" style={{ color: activeTheme.textColor }}>RSVP</h3>
      <p className="text-sm mb-8" style={{ color: activeTheme.accentColor, opacity: 0.8 }}>Please let us know if you'll be joining us.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: activeTheme.accentColor }}>Full Name *</label>
            <input 
              type="text" 
              required
              value={formData.guest_name}
              onChange={e => setFormData({...formData, guest_name: e.target.value})}
              className="w-full bg-white/50 border border-[var(--color-border-light)] rounded px-4 py-3 focus:outline-none focus:border-[var(--color-charcoal)] transition-colors"
              placeholder="Jane & John Doe"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: activeTheme.accentColor }}>Email Address</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-white/50 border border-[var(--color-border-light)] rounded px-4 py-3 focus:outline-none focus:border-[var(--color-charcoal)] transition-colors"
              placeholder="jane@example.com"
            />
          </div>
        </div>

        {/* Attending Toggle */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: activeTheme.accentColor }}>Will you be attending?</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setFormData({...formData, attending: true})}
              className={`flex-1 py-3 border rounded text-sm font-bold uppercase tracking-widest transition-colors ${formData.attending ? 'text-white' : 'bg-white/50 hover:bg-white'}`}
              style={{ 
                backgroundColor: formData.attending ? activeTheme.accentColor : '',
                borderColor: formData.attending ? activeTheme.accentColor : 'var(--color-border-light)',
                color: formData.attending ? 'white' : 'var(--color-charcoal)'
              }}
            >
              Joyfully Accept
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, attending: false})}
              className={`flex-1 py-3 border rounded text-sm font-bold uppercase tracking-widest transition-colors ${!formData.attending ? 'text-white' : 'bg-white/50 hover:bg-white'}`}
              style={{ 
                backgroundColor: !formData.attending ? activeTheme.accentColor : '',
                borderColor: !formData.attending ? activeTheme.accentColor : 'var(--color-border-light)',
                color: !formData.attending ? 'white' : 'var(--color-charcoal)'
              }}
            >
              Regretfully Decline
            </button>
          </div>
        </div>

        {/* Conditional Fields if Attending */}
        {formData.attending && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--color-border-light)]">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: activeTheme.accentColor }}>Total Party Size</label>
              <select 
                value={formData.party_size}
                onChange={e => setFormData({...formData, party_size: parseInt(e.target.value)})}
                className="w-full bg-white/50 border border-[var(--color-border-light)] rounded px-4 py-3 focus:outline-none focus:border-[var(--color-charcoal)] transition-colors"
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: activeTheme.accentColor }}>Dietary Restrictions</label>
              <select 
                value={formData.dietary_needs}
                onChange={e => setFormData({...formData, dietary_needs: e.target.value})}
                className="w-full bg-white/50 border border-[var(--color-border-light)] rounded px-4 py-3 focus:outline-none focus:border-[var(--color-charcoal)] transition-colors"
              >
                <option value="none">None</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten_free">Gluten Free</option>
                <option value="nut_allergy">Nut Allergy</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}

        {/* Special Notes */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: activeTheme.accentColor }}>A Message for the Host (Optional)</label>
          <textarea 
            rows={3}
            value={formData.special_notes}
            onChange={e => setFormData({...formData, special_notes: e.target.value})}
            className="w-full bg-white/50 border border-[var(--color-border-light)] rounded px-4 py-3 focus:outline-none focus:border-[var(--color-charcoal)] transition-colors resize-none"
            placeholder="Any song requests or special notes?"
          />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: activeTheme.textColor, color: activeTheme.bgColor === 'white' ? 'white' : activeTheme.bgColor }}
          >
            {loading ? "Submitting..." : "Send RSVP"}
          </button>
        </div>

      </form>
    </div>
  );
}
