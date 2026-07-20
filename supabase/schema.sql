-- Sekulić Cars - Supabase Database Schema
-- Pokrenite ovaj SQL u Supabase Dashboard > SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  mileage INTEGER NOT NULL,
  fuel_type TEXT NOT NULL CHECK (fuel_type IN ('benzin', 'dizel', 'hibrid', 'električni', 'lpg')),
  transmission TEXT NOT NULL CHECK (transmission IN ('manuelni', 'automatski', 'poluautomatski')),
  price INTEGER NOT NULL,
  description TEXT,
  engine_power INTEGER,
  color TEXT,
  body_type TEXT,
  doors INTEGER,
  seats INTEGER,
  registration_date DATE,
  is_sold BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vehicle images table
CREATE TABLE IF NOT EXISTS vehicle_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON vehicles
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_vehicles_is_sold ON vehicles(is_sold);
CREATE INDEX IF NOT EXISTS idx_vehicles_is_featured ON vehicles(is_featured);
CREATE INDEX IF NOT EXISTS idx_vehicles_created_at ON vehicles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_vehicle_images_vehicle_id ON vehicle_images(vehicle_id);

-- Row Level Security
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_images ENABLE ROW LEVEL SECURITY;

-- Public read access for available vehicles
CREATE POLICY "Public can view available vehicles"
  ON vehicles FOR SELECT
  USING (true);

CREATE POLICY "Public can view vehicle images"
  ON vehicle_images FOR SELECT
  USING (true);

-- Admin full access (authenticated users only)
CREATE POLICY "Admins can insert vehicles"
  ON vehicles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update vehicles"
  ON vehicles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete vehicles"
  ON vehicles FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert images"
  ON vehicle_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update images"
  ON vehicle_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete images"
  ON vehicle_images FOR DELETE
  TO authenticated
  USING (true);

-- Storage bucket for vehicle images
INSERT INTO storage.buckets (id, name, public)
VALUES ('vehicle-images', 'vehicle-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public can view vehicle images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'vehicle-images');

CREATE POLICY "Admins can upload vehicle images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'vehicle-images');

CREATE POLICY "Admins can update vehicle images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'vehicle-images');

CREATE POLICY "Admins can delete vehicle images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'vehicle-images');
