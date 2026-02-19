-- ============================================================
-- Motogardunha — Supabase Storage Setup
-- Run this SQL in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. Create the product-images bucket (public read)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880,  -- 5 MB per file
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Public read policy — anyone can view uploaded images
CREATE POLICY "Public can view product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- 3. Service role upload policy — only server-side uploads allowed
--    (the service role key bypasses RLS, so this is a safety net for anon)
--    Anon key cannot upload — only the server action using service role can.
CREATE POLICY "No anon uploads to product-images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images'
    AND auth.role() = 'service_role'
  );

-- 4. Service role delete policy — only server-side deletes allowed
CREATE POLICY "No anon deletes from product-images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'product-images'
    AND auth.role() = 'service_role'
  );
