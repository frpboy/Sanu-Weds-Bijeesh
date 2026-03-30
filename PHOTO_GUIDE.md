# 📸 Adding Photos to the Cinematic Experience

## Current Setup

The photo portals are configured to use these files in the `/public` folder:

| Portal | File | Position | Title |
|--------|------|----------|-------|
| 1 | `photo1.jpg` | Z: -15 | "The First Meeting" |
| 2 | `photo2.jpg` | Z: -30 | "Engagement Day" |
| 3 | `photo3.jpg` | Z: -45 | "Building Dreams" |
| 4 | `photo4.jpg` | Z: -60 | "Family Traditions" |
| 5 | `photo5.jpg` | Z: -75 | "08.04.2026" |

## How to Add Your Photos

### Step 1: Prepare Your Images
- **Format**: JPG or PNG
- **Recommended Size**: 1200x1600 pixels (3:4 aspect ratio)
- **Max File Size**: 500KB per image (for fast loading)
- **Location**: Place in the `public/` folder

### Step 2: Copy Photos
Copy your photos and rename them:
```
public/
├── photo1.jpg  ← First meeting photo
├── photo2.jpg  ← Engagement photo
├── photo3.jpg  ← Pre-wedding/preparation
├── photo4.jpg  ← Family/traditions
└── photo5.jpg  ← Main couple photo or date announcement
```

### Step 3: Restart the Server
```bash
npm run dev
```

### Step 4: Test
1. Open http://localhost:3000
2. Click "Hear the Story of Sanu & Bijeesh"
3. Scroll down to fly through the photo portals

## Customizing Portal Positions

Edit `src/components/CinematicScene.tsx`:

```tsx
<Portal
  position={[3, -1, -30]}  // X, Y, Z coordinates
  url="/your-photo.jpg"
  title="Your Title"
/>
```

- **X**: Left (-) or Right (+)
- **Y**: Down (-) or Up (+)
- **Z**: Distance from camera (more negative = further away)

## Troubleshooting

### Black boxes instead of photos?
- Check that images are in the `/public` folder
- Verify file names match exactly (case-sensitive)
- Check browser console for 404 errors

### Photos loading slowly?
- Compress images to under 500KB
- Use JPG format for photos
- Consider using WebP format for better compression

### Want more photos?
Add more `<Portal />` components in `CinematicScene.tsx`:
```tsx
<Portal
  position={[-1, 2, -90]}
  url="/photo6.jpg"
  title="Honeymoon"
/>
```

And update the scroll pages in `page.tsx` if needed.
