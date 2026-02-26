-- Check what images are actually stored in motorcycles table
SELECT 
  name,
  slug,
  images,
  cover_image,
  CASE 
    WHEN cover_image LIKE '%product-images/uploads%' THEN 'PRODUCT IMAGE IN COVER'
    WHEN images::text LIKE '%product-images/uploads%' THEN 'PRODUCT IMAGE IN ARRAY'
    ELSE 'OK'
  END as status
FROM motorcycles 
LIMIT 5;
