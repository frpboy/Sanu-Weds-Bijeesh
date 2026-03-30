# Project Eternal Scroll - Sanu & Bijeesh Wedding Website

## Project Overview

**Project Eternal Scroll** is a cinematic, immersive wedding tribute website celebrating the union of Sanu and Bijeesh (April 8, 2026). It transcends traditional wedding websites by creating an interactive 3D celestial journey synchronized to the song "Uyire."

### Key Experience Pillars

1. **The Star Tunnel** - Dynamic 3D starfield that moves with scroll, creating a "warp speed" effect
2. **Horizontal Storytelling** - GSAP-powered horizontal "film strip" timeline presenting their story
3. **Interactive Climax** - Gold hearts confetti explosion at the song's chorus (1:30 mark)
4. **Audio Sync Gate** - Low-pass filtered audio entry that clears as users "enter" the experience

### Technical Architecture

```
src/
├── app/
│   ├── layout.tsx      # Root layout with Google Fonts (Montserrat, Cinzel, Great Vibes)
│   ├── page.tsx        # Main page - orchestrates audio timeline & components
│   └── globals.css     # Custom animations & Tailwind utilities
├── components/
│   ├── IntroGate.tsx   # Entry screen with "Enter" button & single gold star
│   ├── Scene.tsx       # Three.js starfield with warp speed effect
│   ├── StorySection.tsx # Horizontal scroll timeline (GSAP ScrollTrigger)
│   ├── Countdown.tsx   # Wedding countdown timer
│   └── Tribute.tsx     # Final section with "Send Blessings" button
└── hooks/
    └── useAudio.ts     # Howler.js + Web Audio API low-pass filter hook
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| 3D Engine | React Three Fiber + @react-three/drei |
| Animation | GSAP + ScrollTrigger |
| Audio | Howler.js + Web Audio API (BiquadFilterNode) |
| Styling | Tailwind CSS |
| Effects | canvas-confetti, Framer Motion |
| Language | TypeScript |

## Building and Running

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

## Key Features Implementation

### Audio Engine (useAudio Hook)

The `useAudio` hook implements a cinematic low-pass filter effect:

- **Gate Closed**: Audio muffled at 400Hz
- **Gate Open**: Filter ramps to 20000Hz over 3 seconds
- **Volume**: Fades from 0 to 0.6 over 3 seconds

```typescript
// Usage in page.tsx
const { sound, isLoaded, unmute } = useAudio("/music.flac");

const handleEnter = (sound: Howl) => {
  sound.play();  // Start playback (muffled)
  unmute();      // Ramp filter + fade volume
};
```

### Song Timeline Sync

The experience is synchronized to "Uyire":

| Time | Phase | Visual |
|------|-------|--------|
| 0:00 - 0:45 | Intro/Humming | Opening Gate, single gold star |
| 0:45 - 1:30 | Verse | Stars fade in, slow camera movement |
| 1:30+ | Chorus | Warp speed + gold hearts confetti |

### 3D Starfield (Scene.tsx)

- **7000+ stars** with depth fading
- **Floating icosahedrons** (gold wireframes)
- **Warp speed effect** triggered at chorus
- **Scroll-reactive** camera movement

### Horizontal Story Section

Uses GSAP ScrollTrigger to convert vertical scroll into horizontal movement:

- 5 memory cards in a "film strip" layout
- Parallax image effects within cards
- Glassmorphism styling with gold accents

## Design System

### Color Palette

- **Primary**: Gold `#d4af37`
- **Background**: Black `#000000`
- **Text**: White with varying opacity

### Typography

```typescript
fontFamily: {
  montserrat: ["var(--font-montserrat)"],   // Body text, labels
  cinzel: ["var(--font-cinzel)"],           // Headings, titles
  "great-vibes": ["var(--font-great-vibes)"] // Script/accent text
}
```

### Custom Animations (globals.css)

- `animate-loading-bar` - Audio loading indicator
- `animate-fade-in` - Content entrance
- `animate-twinkle` - Ambient star particles
- `animate-bounce` - Scroll indicator
- `animate-float` - Decorative elements
- `animate-shimmer` - Border effects

## File Structure Reference

```
e:\K4NN4N\Sanu-Weds-Bijeesh\
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Countdown.tsx
│   │   ├── IntroGate.tsx
│   │   ├── Scene.tsx
│   │   ├── StorySection.tsx
│   │   └── Tribute.tsx
│   └── hooks/
│       └── useAudio.ts
├── public/
│   └── music.flac          # Audio file (must exist for audio to work)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── prd.md                  # Product requirements document
├── tech-stack.md           # Technology decisions
└── vercel.json             # Vercel deployment config
```

## Deployment

### Vercel Configuration

The project is configured for Vercel deployment. Key considerations:

1. **Audio File**: Ensure `music.flac` is in the `public/` folder
2. **OG Image**: Add `/og-image.jpg` for social sharing preview
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next`

```bash
# Deploy to Vercel
vercel deploy
```

## Development Conventions

### Code Style

- **TypeScript**: Strict mode enabled
- **Components**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Files**: Named exports matching filename

### Component Patterns

- All interactive components use `"use client"` directive
- 3D components use React Three Fiber declarative syntax
- GSAP animations use `gsap.context()` for proper cleanup

### Testing Practices

Currently no test suite configured. Recommended additions:
- Component unit tests (Jest + React Testing Library)
- E2E tests (Playwright or Cypress)

## Important Notes

1. **Audio Context**: Browser autoplay policies require user interaction before audio plays - handled by the "Enter" button
2. **Web Audio API**: The low-pass filter requires `html5: true` in Howler config to access the underlying audio element
3. **Performance**: Three.js Canvas is fixed position with `pointer-events-none` to allow scroll interaction
4. **Memory Management**: All GSAP animations use context cleanup (`ctx.revert()`)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [GSAP ScrollTrigger](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Howler.js Documentation](https://github.com/goldfire/howler.js)
