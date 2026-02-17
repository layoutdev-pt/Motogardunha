-- ============================================================
-- Motogardunha — Supabase Database Schema v2
-- Run this SQL in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. Motorcycles table
CREATE TABLE IF NOT EXISTS motorcycles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,                    -- Marca e Modelo (Nome)
  year INTEGER NOT NULL,                 -- Ano de Fabrico
  logo_url TEXT,                         -- Logótipo
  brand TEXT NOT NULL,                   -- Marca
  price NUMERIC NOT NULL,                -- Preço
  mileage INTEGER DEFAULT 0,            -- KMs
  gearbox_type TEXT,                     -- Tipo de Caixa
  segment TEXT,                          -- Segmento
  horsepower TEXT,                       -- Potência
  engine_cc INTEGER NOT NULL,            -- Cilindrada
  engine TEXT,                           -- Motor
  transmission_type TEXT,                -- Tipo de Transmissão
  fuel_type TEXT,                        -- Tipo de Combustível
  max_torque TEXT,                       -- Binário Máximo
  avg_consumption TEXT,                  -- Consumo Médio
  tank_capacity TEXT,                    -- Capacidade do Depósito
  seats INTEGER DEFAULT 2,              -- Lugares
  primary_color TEXT,                    -- Cor Principal
  secondary_color TEXT,                  -- Cor Secundária
  description_title TEXT,                -- Título da Descrição
  description TEXT,                      -- Descrição
  images TEXT[] DEFAULT '{}',            -- Imagens
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
  title TEXT NOT NULL,                   -- Título
  description TEXT,                      -- Descrição
  product_type TEXT,                     -- Tipo de Produto
  category TEXT NOT NULL,                -- Categoria
  price NUMERIC NOT NULL,                -- Preço
  compare_price NUMERIC,                 -- Preço de Comparação
  is_featured BOOLEAN DEFAULT FALSE,     -- Destaque
  images TEXT[] DEFAULT '{}',            -- Imagens
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

-- 4. Row Level Security (RLS)
ALTER TABLE motorcycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gear_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Public read access for motorcycles and gear (website)
CREATE POLICY "Public can read motorcycles" ON motorcycles FOR SELECT USING (true);
CREATE POLICY "Public can read gear products" ON gear_products FOR SELECT USING (true);

-- Allow all operations via anon key (admin uses anon key with password-based auth)
CREATE POLICY "Anon can insert motorcycles" ON motorcycles FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon can update motorcycles" ON motorcycles FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anon can delete motorcycles" ON motorcycles FOR DELETE USING (true);

CREATE POLICY "Anon can insert gear products" ON gear_products FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon can update gear products" ON gear_products FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anon can delete gear products" ON gear_products FOR DELETE USING (true);

CREATE POLICY "Public can insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon can read leads" ON leads FOR SELECT USING (true);
CREATE POLICY "Anon can update leads" ON leads FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anon can delete leads" ON leads FOR DELETE USING (true);
