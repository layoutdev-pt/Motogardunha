-- ============================================================
-- Motogardunha — Supabase Database Schema v2 (idempotent RLS policy creation)
-- ============================================================

-- 1. Motorcycles table
CREATE TABLE IF NOT EXISTS motorcycles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  year INTEGER NOT NULL,
  logo_url TEXT,
  brand TEXT NOT NULL,
  price NUMERIC NOT NULL,
  mileage INTEGER DEFAULT 0,
  gearbox_type TEXT,
  segment TEXT,
  horsepower TEXT,
  engine_cc INTEGER NOT NULL,
  engine TEXT,
  transmission_type TEXT,
  fuel_type TEXT,
  max_torque TEXT,
  avg_consumption TEXT,
  tank_capacity TEXT,
  seats INTEGER DEFAULT 2,
  primary_color TEXT,
  secondary_color TEXT,
  description_title TEXT,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  cover_image TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold')),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Gear Products table (Loja)
CREATE TABLE IF NOT EXISTS gear_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  product_type TEXT,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  compare_price NUMERIC,
  is_featured BOOLEAN DEFAULT FALSE,
  images TEXT[] DEFAULT '{}',
  cover_image TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  interested_model TEXT,
  source TEXT NOT NULL DEFAULT 'website' CHECK (source IN ('website', 'referral', 'social_media', 'walk_in', 'direct_mail')),
  status TEXT NOT NULL DEFAULT 'new_lead' CHECK (status IN ('new_lead', 'contacted', 'negotiation', 'test_ride', 'sold', 'lost')),
  lead_score INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Settings table (key/value store for runtime config)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default password row (only if not already present)
INSERT INTO settings (key, value)
VALUES ('admin_password_hash', '')
ON CONFLICT (key) DO NOTHING;

-- 5. Row Level Security (RLS)
ALTER TABLE motorcycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gear_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- ─── Drop old open policies if they exist ──────────────────────────────────
DROP POLICY IF EXISTS "Anon can insert motorcycles" ON motorcycles;
DROP POLICY IF EXISTS "Anon can update motorcycles" ON motorcycles;
DROP POLICY IF EXISTS "Anon can delete motorcycles" ON motorcycles;
DROP POLICY IF EXISTS "Anon can insert gear products" ON gear_products;
DROP POLICY IF EXISTS "Anon can update gear products" ON gear_products;
DROP POLICY IF EXISTS "Anon can delete gear products" ON gear_products;
DROP POLICY IF EXISTS "Anon can read leads" ON leads;
DROP POLICY IF EXISTS "Anon can update leads" ON leads;
DROP POLICY IF EXISTS "Anon can delete leads" ON leads;
DROP POLICY IF EXISTS "Public can read motorcycles" ON motorcycles;
DROP POLICY IF EXISTS "Public can read gear products" ON gear_products;
DROP POLICY IF EXISTS "Public can submit leads" ON leads;

-- ─── Motorcycles: public read only ─────────────────────────────────────────
DROP POLICY IF EXISTS "Public can read motorcycles" ON motorcycles;
CREATE POLICY "Public can read motorcycles"
  ON motorcycles FOR SELECT
  USING (true);

-- ─── Gear Products: public read only ───────────────────────────────────────
DROP POLICY IF EXISTS "Public can read gear products" ON gear_products;
CREATE POLICY "Public can read gear products"
  ON gear_products FOR SELECT
  USING (true);

-- ─── Leads: public INSERT only (contact form), no public read/update/delete ─
-- Ensure we drop the policy first, then create it. Also include an IF NOT EXISTS guard.
DROP POLICY IF EXISTS "Public can submit leads" ON leads;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'leads' AND policyname = 'Public can submit leads'
  ) THEN
    CREATE POLICY "Public can submit leads"
      ON leads FOR INSERT
      WITH CHECK (true);
  END IF;
END;
$$;

-- 6. Orders table (click & collect reservations)
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT NOT NULL,
  customer_address TEXT DEFAULT 'Levantamento em Loja',
  notes TEXT,
  items JSONB NOT NULL DEFAULT '[]',
  total NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'ready', 'collected', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for orders: public INSERT (order form), admin via service role
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can submit orders" ON orders;
CREATE POLICY "Public can submit orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- 7. Custom Brands table (for admin-added motorcycle brands)
CREATE TABLE IF NOT EXISTS custom_brands (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  logo_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for custom_brands: public read, admin write
ALTER TABLE custom_brands ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read custom brands" ON custom_brands;
CREATE POLICY "Public can read custom brands"
  ON custom_brands FOR SELECT
  USING (true);

-- OPTIONAL: inspect existing policies for the leads table
-- Run manually if you want to verify
-- SELECT policyname, schemaname, tablename, permissive, roles, qual, with_check
-- FROM pg_policies WHERE tablename = 'leads';