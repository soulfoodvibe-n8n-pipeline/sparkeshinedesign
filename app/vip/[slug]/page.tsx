import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import VIPClientPage from './VIPClientPage';

// Shared Themes (Must match StudioClient)
const templateThemes = [
  { layout: "elegant", bgColor: "var(--color-warm-white)", borderColor: "var(--color-rose-gold)", textColor: "var(--color-rose-gold)", accentColor: "var(--color-charcoal)", name: "Classic Rose" },
  { layout: "modern", bgColor: "white", borderColor: "var(--color-charcoal)", textColor: "var(--color-charcoal)", accentColor: "var(--color-charcoal)", name: "Monochrome Modern" },
  { layout: "floral", bgColor: "#F2F4F0", borderColor: "transparent", textColor: "#4A5D4E", accentColor: "#8C9B8F", name: "Sage Garden" },
  { layout: "elegant", bgColor: "#FDFBF7", borderColor: "#D4AF37", textColor: "#D4AF37", accentColor: "#111111", name: "Royal Gold" },
  { layout: "modern", bgColor: "#1A1A1A", borderColor: "var(--color-champagne)", textColor: "var(--color-champagne)", accentColor: "white", name: "Midnight Glamour" },
  { layout: "floral", bgColor: "#F5F0F6", borderColor: "transparent", textColor: "#6A4C93", accentColor: "#B594C4", name: "Lavender Dream" },
];

export default async function PublicVIPPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();

  // 1. Fetch Event by Slug
  const { data: event, error } = await supabase
    .from('events')
    .select('*, clients(*)')
    .eq('slug', params.slug)
    .single();

  if (error || !event) {
    notFound(); // 404 if event doesn't exist
  }

  // 2. Fetch Approved Gallery Images
  const { data: gallery } = await supabase
    .from('gallery_images')
    .select('*')
    .eq('event_id', event.id)
    .eq('is_approved', true)
    .order('uploaded_at', { ascending: false });

  // 3. Fallbacks for missing design data
  const themeIndex = event.theme_index || 0;
  const eventType = event.event_type || 'wedding';
  const activeTheme = templateThemes[themeIndex] || templateThemes[0];

  return (
    <VIPClientPage 
      event={event} 
      gallery={gallery || []} 
      activeTheme={activeTheme} 
      themeIndex={themeIndex}
      eventType={eventType}
    />
  );
}
