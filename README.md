# Sanu Weds Bijeesh

> A cinematic, interactive wedding website for the union of Sanu & Bijeesh — April 8th, 2026, Mannarmala, Kerala.

Live: **[sanu-weds-bijeesh.vercel.app](https://sanu-weds-bijeesh.vercel.app)**

---

## About

A fully custom digital wedding invitation built with Next.js. The experience guides guests through the couple's story, event details, and RSVP — wrapped in a dark, gold-accented aesthetic with ambient music, particle effects, and smooth scroll animations.

---

## Features

### Live Event Phases (Hero)
The hero section adapts in real time based on the current date and time (IST):

| Time | Display |
|------|---------|
| Before April 8, 10:30 AM | "Save the Date" + countdown timer |
| 10:30 – 11:30 AM | Live badge · "The Ceremony is Happening Now" · Immu Auditorium |
| 11:30 AM – 4:30 PM | "Just Married!" + countdown to reception |
| 4:30 – 7:30 PM | Live badge · "Reception is Happening Now" · River View Auditorium |
| After 7:30 PM | Romantic post-wedding quote |

### Photo Reveal
A countdown-gated photo reveal that unlocks after the wedding ceremony. Displays the couple's photos with a cinematic animation once the moment arrives.

### Our Journey
A horizontal scroll timeline presenting the couple's story as a series of memory cards with glassmorphism styling and scroll-triggered animations.

### Events
Detailed cards for both events with venue, time, map embed, and calendar integration (`.ics` download + Google Calendar link):
- **Wedding Ceremony** — Immu Auditorium, Mannarmala, Kerala · 10:30 AM – 11:30 AM IST
- **Wedding Reception** — River View Auditorium, Nattyamangalam, Kerala · 4:30 PM – 7:30 PM IST

### Photo Gallery / Carousel
An auto-playing carousel of couple photos with blur placeholder support via `next/image`.

### RSVP & Wishes
Guests can RSVP (attending / regretfully declining), set headcount, and leave a message. Submissions are stored in a Neon Postgres database and displayed live in a scrolling wall of wishes.

### Ambient Touches
- **3D star-field background** (Three.js) with depth and parallax
- **Mouse trail** particle effect
- **Ambient music** with a toggle control
- **Confetti** on wish submission
- **Scroll-to-top** button
- **Save the Date modal** on first load
- **MS Clarity** analytics + **Vercel Analytics**

---

## Tech Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| 3D | Three.js (direct) |
| Database | Neon Serverless Postgres (`@neondatabase/serverless`) |
| Analytics | Vercel Analytics, Microsoft Clarity |
| Confetti | canvas-confetti |
| Images | next/image + sharp |
| Styling | CSS Modules / global CSS, Tailwind CSS |
| Fonts | Google Fonts — Montserrat, Cinzel, Great Vibes (via `next/font`) |
| Icons | Font Awesome 6 (CDN) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites
- Node.js 20+ LTS
- A [Neon](https://neon.tech) Postgres database

### Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL=postgresql://...   # Neon connection string
```

### Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
  app/
    api/
      og/          OG image generation
      time/        Server time endpoint
      wishes/      RSVP & wishes API (GET + POST)
    globals.css
    layout.tsx
    page.tsx
  components/
    Countdown.tsx         Pre-wedding countdown timer
    Events.tsx            Ceremony & reception event cards
    Footer.tsx
    Gallery.tsx
    Hero.tsx              Live phase-aware hero section
    Journey.tsx           Horizontal scroll timeline
    MouseTrail.tsx        Cursor particle trail
    MusicToggle.tsx       Ambient music control
    PhotoCarousel.tsx     Auto-playing photo carousel
    PhotoReveal.tsx       Post-ceremony photo unlock
    SaveTheDateModal.tsx  First-load modal
    ScrollAnimations.tsx  Intersection observer animations
    ScrollToTop.tsx
    ThreeBackground.tsx   Three.js star-field
    Wishes.tsx            RSVP form + wishes wall
  lib/
    db.ts                 Neon database client
public/
  wedding.mp3            Ambient music
  *.ics                  Calendar invite files
```

---

## Deployment

Deployed on Vercel. Push to `main` triggers an automatic production deploy.

Required environment variable in Vercel dashboard: `DATABASE_URL`.
