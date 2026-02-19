-- ============================================================
-- Motogardunha — Supabase Seed Data
-- Run this in Supabase Dashboard → SQL Editor AFTER running supabase-schema.sql
-- ============================================================

-- Clear existing data (safe to re-run)
TRUNCATE TABLE motorcycles RESTART IDENTITY CASCADE;
TRUNCATE TABLE gear_products RESTART IDENTITY CASCADE;

-- ============================================================
-- MOTORCYCLES
-- ============================================================
INSERT INTO motorcycles (name, brand, year, price, mileage, engine_cc, horsepower, max_torque, primary_color, segment, description, images, cover_image, slug, status, is_featured, created_at, updated_at) VALUES

('Aprilia SR GT 200', 'Aprilia', 2024, 4499, 0, 174, '17 cv', '16 Nm', 'Cinzento', 'Scooters',
 'A Aprilia SR GT 200 é a scooter adventure que combina estilo e performance para a cidade e além.',
 ARRAY['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80'],
 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80',
 'aprilia-sr-gt-200', 'available', true, '2024-01-15T00:00:00Z', '2024-01-15T00:00:00Z'),

('Vespa GTS 300', 'Vespa', 2024, 6999, 0, 278, '24 cv', '26 Nm', 'Verde Racing', 'Scooters',
 'O ícone italiano. A Vespa GTS 300 é a referência absoluta em scooters premium.',
 ARRAY['https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800&q=80'],
 'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800&q=80',
 'vespa-gts-300', 'available', true, '2024-01-10T00:00:00Z', '2024-01-10T00:00:00Z'),

('Zontes 703F', 'Zontes', 2024, 8450, 0, 693, '75 cv', '68 Nm', 'Preto', 'Trail',
 'A Zontes 703F é uma adventure tourer moderna com excelente relação qualidade-preço.',
 ARRAY['https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80'],
 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80',
 'zontes-703f', 'available', true, '2024-02-01T00:00:00Z', '2024-02-01T00:00:00Z'),

('Honda PCX 125', 'Honda', 2024, 3299, 0, 125, '12 cv', '12 Nm', 'Branco Pérola', 'Scooters',
 'A rainha da cidade. Eficiente, fiável e com um design elegante.',
 ARRAY['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80'],
 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80',
 'honda-pcx-125', 'available', false, '2024-01-20T00:00:00Z', '2024-01-20T00:00:00Z'),

('Yamaha TMAX 560', 'Yamaha', 2023, 12999, 0, 562, '47 cv', '56 Nm', 'Azul Icon', 'Scooters',
 'O desportivo das maxiscooters. Performance e conforto ao mais alto nível.',
 ARRAY['https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=800&q=80'],
 'https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=800&q=80',
 'yamaha-tmax-560', 'available', true, '2024-02-10T00:00:00Z', '2024-02-10T00:00:00Z'),

('Voge 500DS', 'Voge', 2024, 5990, 0, 494, '47 cv', '44 Nm', 'Preto Mate', 'Trail',
 'Uma adventure acessível com equipamento de topo. Ideal para explorar on e off-road.',
 ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80'],
 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
 'voge-500ds', 'available', false, '2024-03-01T00:00:00Z', '2024-03-01T00:00:00Z'),

('Piaggio Beverly 400', 'Piaggio', 2024, 7599, 0, 399, '35 cv', '37.7 Nm', 'Cinzento Titanium', 'Scooters',
 'A GT scooter por excelência. Conforto premium para viagens longas.',
 ARRAY['https://images.unsplash.com/photo-1571646750472-46f94e5c6551?w=800&q=80'],
 'https://images.unsplash.com/photo-1571646750472-46f94e5c6551?w=800&q=80',
 'piaggio-beverly-400', 'available', false, '2024-02-20T00:00:00Z', '2024-02-20T00:00:00Z'),

('Kawasaki Z650', 'Kawasaki', 2023, 7899, 3500, 649, '68 cv', '63.7 Nm', 'Verde Kawasaki', 'Naked',
 'A naked desportiva da Kawasaki. Potência controlável e design agressivo.',
 ARRAY['https://images.unsplash.com/photo-1580310614729-ccd69652491d?w=800&q=80'],
 'https://images.unsplash.com/photo-1580310614729-ccd69652491d?w=800&q=80',
 'kawasaki-z650-2023', 'available', false, '2024-03-15T00:00:00Z', '2024-03-15T00:00:00Z');

-- ============================================================
-- GEAR PRODUCTS
-- ============================================================
INSERT INTO gear_products (title, category, description, price, compare_price, images, cover_image, slug, is_featured, status, created_at, updated_at) VALUES

('AGV Pista GP RR Carbon', 'helmets',
 'Capacete de competição com fibra de carbono. Aerodinâmica superior e proteção máxima.',
 1450, NULL,
 ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80'],
 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
 'agv-pista-gp-rr-carbon', true, 'active', '2024-01-01T00:00:00Z', '2024-01-01T00:00:00Z'),

('Alpinestars Missile v2 Leather Jacket', 'jackets',
 'Casaco de couro premium com proteções CE Nível 2. Ideal para uso em estrada e pista.',
 599.95, NULL,
 ARRAY['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80'],
 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
 'alpinestars-missile-v2', true, 'active', '2024-01-05T00:00:00Z', '2024-01-05T00:00:00Z'),

('Dainese Carbon 3 Long Gloves', 'gloves',
 'Luvas em carbono com proteção de dedos e palma reforçada. Conforto e segurança.',
 179.95, NULL,
 ARRAY['https://images.unsplash.com/photo-1590502160462-58b41354f588?w=600&q=80'],
 'https://images.unsplash.com/photo-1590502160462-58b41354f588?w=600&q=80',
 'dainese-carbon-3-long', true, 'active', '2024-02-01T00:00:00Z', '2024-02-01T00:00:00Z'),

('TCX Street 3 Air Shoes', 'boots',
 'Botas urbanas com proteção de tornozelo e sola antiderrapante.',
 169.99, NULL,
 ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'],
 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
 'tcx-street-3-air', false, 'active', '2024-01-10T00:00:00Z', '2024-01-10T00:00:00Z'),

('Rev''It Eclipse Mesh Jacket', 'jackets',
 'Casaco de verão em mesh com proteções CE e ventilação máxima.',
 151.99, 189.99,
 ARRAY['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80'],
 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
 'revit-eclipse-mesh', false, 'active', '2024-01-15T00:00:00Z', '2024-01-15T00:00:00Z'),

('Shoei RF-1400 Helmet', 'helmets',
 'O sucessor do lendário RF-1200. Aerodinâmica superior e campo de visão alargado.',
 579.99, NULL,
 ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80'],
 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
 'shoei-rf-1400', true, 'active', '2024-03-01T00:00:00Z', '2024-03-01T00:00:00Z');
