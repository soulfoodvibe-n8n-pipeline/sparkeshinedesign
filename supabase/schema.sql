-- ==========================================
-- Angel's Sparkle & Shine: Event Ecosystem
-- Database Initialization Schema
-- ==========================================

-- 0. Clean slate (Drop existing tables/types to prevent 'already exists' errors)
DROP TABLE IF EXISTS public.gallery_images CASCADE;
DROP TABLE IF EXISTS public.rsvps CASCADE;
DROP TABLE IF EXISTS public.events CASCADE;
DROP TABLE IF EXISTS public.clients CASCADE;
DROP TYPE IF EXISTS dietary_restriction CASCADE;

-- 1. Create custom types
CREATE TYPE dietary_restriction AS ENUM ('none', 'vegetarian', 'vegan', 'gluten_free', 'nut_allergy', 'other');

-- 2. Create tables
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    facebook_access_token TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    slug TEXT UNIQUE NOT NULL, -- matches Sanity slug (e.g. 'smith-wedding')
    title TEXT NOT NULL,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    guest_name TEXT NOT NULL,
    email TEXT,
    party_size INTEGER DEFAULT 1,
    attending BOOLEAN DEFAULT true,
    dietary_needs dietary_restriction DEFAULT 'none',
    special_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT true,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Set up Row Level Security (RLS)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Clients can only read their own profile
CREATE POLICY "Clients can view own profile" 
    ON public.clients FOR SELECT 
    USING (auth.uid() = user_id);

-- Clients can only read their own events
CREATE POLICY "Clients can view own events" 
    ON public.events FOR SELECT 
    USING (client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid()));

-- Event RSVPs are viewable by the event owner
CREATE POLICY "Clients can view their event RSVPs" 
    ON public.rsvps FOR SELECT 
    USING (event_id IN (SELECT id FROM public.events WHERE client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())));

-- Anyone can insert an RSVP (public form)
CREATE POLICY "Anyone can RSVP" 
    ON public.rsvps FOR INSERT 
    WITH CHECK (true);

-- Gallery Images are viewable by the event owner
CREATE POLICY "Clients can view their event gallery images" 
    ON public.gallery_images FOR SELECT 
    USING (event_id IN (SELECT id FROM public.events WHERE client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())));

-- Approved gallery images are viewable by the public
CREATE POLICY "Public can view approved gallery images" 
    ON public.gallery_images FOR SELECT 
    USING (is_approved = true);

-- Event owners can update (approve/hide) their gallery images
CREATE POLICY "Clients can moderate their gallery images" 
    ON public.gallery_images FOR UPDATE 
    USING (event_id IN (SELECT id FROM public.events WHERE client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())));
