-- ==============================================================================
-- AuraDent Studio Dental Clinic - Supabase Database Schema
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Create the Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id TEXT PRIMARY KEY,
    patient_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    service TEXT NOT NULL,
    doctor TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    address TEXT,
    symptoms TEXT,
    status TEXT NOT NULL DEFAULT 'Confirmed',
    promo_applied TEXT DEFAULT 'None',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Index on Date and Status for Fast Queries
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings (date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings (created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
-- Allow anyone (public patients) to submit a new booking
CREATE POLICY "Allow public booking insert" 
ON public.bookings 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow public read of bookings (for demo / admin panel view)
CREATE POLICY "Allow public read of bookings" 
ON public.bookings 
FOR SELECT 
TO public 
USING (true);

-- Allow public update of booking status (for receptionist / admin panel)
CREATE POLICY "Allow public update of bookings" 
ON public.bookings 
FOR UPDATE 
TO public 
USING (true);

-- Allow public deletion of bookings (for receptionist / admin panel)
CREATE POLICY "Allow public delete of bookings" 
ON public.bookings 
FOR DELETE 
TO public 
USING (true);

-- 5. Insert Initial Sample Data for the Clinic
INSERT INTO public.bookings (id, patient_name, phone, email, service, doctor, date, time, address, symptoms, status, promo_applied)
VALUES
    ('AUR-9102', 'Gaurav Chawla', '+91 98112 45890', 'gaurav.c@gmail.com', 'Single-Day Dental Implants', 'Dr. Sameer Mehra', CURRENT_DATE + INTERVAL '1 day', '10:30 PM', 'Inderlok, Delhi', 'Missing lower molar, needs permanent replacement', 'Confirmed', 'NEWIND30 (30% OFF Applied)'),
    ('AUR-9103', 'Meenakshi Joshi', '+91 99581 23412', 'meenakshi.j@outlook.com', 'Invisible Clear Aligners', 'Dr. Rhea Singhania', CURRENT_DATE + INTERVAL '1 day', '11:30 PM', 'Rohini Sector 9, Delhi', 'Upper teeth crowding, wants invisible braces consultation', 'Pending', 'NEWIND30 (30% OFF Applied)'),
    ('AUR-9104', 'Harshit Verma', '+91 88004 12399', 'harshitv@gmail.com', '24/7 Night Dental Emergency', 'Dr. Anirudh Varma', CURRENT_DATE, '01:00 AM', 'Pitampura, Delhi', 'Acute throbbing pain in upper left wisdom tooth', 'Completed', 'NEWIND30 (30% OFF Applied)'),
    ('AUR-9105', 'Sunita Roy', '+91 98734 56123', 'sunitaproy@yahoo.com', 'Laser Teeth Whitening', 'Dr. Sameer Mehra', CURRENT_DATE + INTERVAL '2 day', '09:30 PM', 'Karol Bagh, Delhi', 'Teeth yellowing before family anniversary', 'Confirmed', 'NEWIND30 (30% OFF Applied)')
ON CONFLICT (id) DO NOTHING;
