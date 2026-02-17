# Images Directory Structure

This directory contains all static images for the Motogardunha website.

## Folder Organization

### `/partners`
Partner and motorcycle brand logos
- Motorcycle brand logos (Aprilia, Kawasaki, Piaggio, etc.)
- Partner company logos
- Dealer network logos

### `/branding`
Motogardunha company branding assets
- Company logo variations
- Brand colors and guidelines
- Marketing materials

### `/motorcycles`
Motorcycle product images
- Individual motorcycle photos
- Multiple angles and views
- Detail shots

### `/products`
Gear and equipment product images
- Helmets
- Jackets
- Gloves
- Accessories

### `/banners`
Hero banners and promotional images
- Homepage hero images
- Section background images
- Campaign banners

### `/team`
Team member photos
- Staff photos
- Workshop team
- About us section images

### `/gallery`
General gallery and showcase images
- Workshop photos
- Customer bikes
- Events and activities
- Showroom photos

## Usage

To use images in your components:

```tsx
// Next.js Image component
import Image from 'next/image';

<Image 
  src="/images/branding/motogardunha-logo.png" 
  alt="Motogardunha"
  width={200}
  height={60}
/>

// Partner logos
<img src="/images/partners/aprilia.png" alt="Aprilia" />

// Standard img tag
<img src="/images/motorcycles/bike-1.jpg" alt="Motorcycle" />
```

## Image Guidelines

- **Format**: Use WebP for modern browsers, with JPG/PNG fallbacks
- **Optimization**: Compress images before uploading
- **Naming**: Use descriptive, lowercase names with hyphens (e.g., `honda-pcx-125-red.jpg`)
- **Size**: Keep file sizes under 500KB for web performance
