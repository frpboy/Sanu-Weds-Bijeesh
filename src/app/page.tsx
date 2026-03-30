"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Events from "@/components/Events";
import PhotoCarousel from "@/components/PhotoCarousel";
import Wishes from "@/components/Wishes";
import Footer from "@/components/Footer";
import MusicToggle from "@/components/MusicToggle";
import ScrollAnimations from "@/components/ScrollAnimations";
import ScrollToTop from "@/components/ScrollToTop";
import SaveTheDateModal from "@/components/SaveTheDateModal";

// Three.js uses browser globals — skip SSR
const ThreeBackground = dynamic(
  () => import("@/components/ThreeBackground"),
  { ssr: false }
);

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Hide preloader ~1.5 s after mount (mirrors legacy window-load + 1s delay)
    const timer = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Fixed Three.js particle background */}
      <ThreeBackground />

      {/* Scroll-in animations (IntersectionObserver) */}
      <ScrollAnimations />

      {/* Preloader — fades out after 1.5 s */}
      <div
        id="preloader"
        style={{
          opacity: loaded ? 0 : 1,
          visibility: loaded ? "hidden" : "visible",
        }}
        aria-hidden={loaded}
      >
        <div className="loader-content">
          <h1 className="loader-text">S &amp; B</h1>
          <div className="heart-loader" />
        </div>
      </div>

      {/* Page content */}
      <Hero />

      <main>
        <Journey />
        <Events />
        <PhotoCarousel />
        <Wishes />
      </main>

      <Footer />

      {/* Floating music toggle */}
      <MusicToggle />

      {/* Scroll-to-top (appears after hero) */}
      <ScrollToTop />

      {/* First-visit Save the Date modal */}
      <SaveTheDateModal />
    </>
  );
}
