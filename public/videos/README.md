# Videos Directory

This folder contains video files used throughout the Motogardunha website.

## Structure

- `/hero` - Hero section background videos
- `/banners` - Banner and promotional videos
- `/products` - Product demonstration videos

## Usage

Videos in this folder can be referenced in your components like:

```jsx
<video src="/videos/hero/motorcycle-hero.mp4" />
```

## Recommendations

- Use MP4 format for best browser compatibility
- Compress videos to reduce file size and improve loading times
- Recommended resolution: 1920x1080 (Full HD) or 1280x720 (HD)
- Keep file sizes under 10MB when possible
- Use tools like HandBrake or FFmpeg to optimize videos

## Adding Videos

1. Place your video file in the appropriate subfolder
2. Reference it in your component using the path `/videos/[subfolder]/[filename].mp4`
3. Always include fallback images for browsers that don't support video

## Example

```jsx
<video autoPlay loop muted playsInline>
  <source src="/videos/hero/motorcycle-ride.mp4" type="video/mp4" />
</video>
```
