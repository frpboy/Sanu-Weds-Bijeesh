"use client";
import { useState, useEffect, useRef } from "react";
import Scene from "@/components/Scene";
import IntroGate from "@/components/IntroGate";
import Countdown from "@/components/Countdown";
import StorySection from "@/components/StorySection";
import Tribute from "@/components/Tribute";
import { Howl } from "howler";
import { useAudio } from "@/hooks/useAudio";
import gsap from "gsap";

export default function Home() {
  const [started, setStarted] = useState(false);
  const { sound, isLoaded, unmute } = useAudio("/music.flac");
  const [currentTime, setCurrentTime] = useState(0);
  const mainRef = useRef<HTMLElement>(null);

  const handleEnter = (sound: Howl) => {
    unmute(); // This triggers the frequency ramp and volume fade
    setStarted(true);
  };

  useEffect(() => {
    if (!started || !sound) return;

    const interval = setInterval(() => {
      setCurrentTime(sound.seek() as number);
    }, 100);

    return () => clearInterval(interval);
  }, [started, sound]);

  // Sync visuals with "Uyire" song structure
  // 0:00 - 0:45 (The Humming/Intro): Opening Gate/Blurred scene
  // 0:45 - 1:30 (The Verse): Slow camera move, content appears
  // 1:30 - End (The Chorus/Crescendo): Warp speed/Confetti
  
  const showContent = started && currentTime > 0.5; // Slight delay for the gate transition
  const isWarpSpeed = currentTime > 90; // 1:30 mark

  useEffect(() => {
    if (showContent) {
      gsap.to(".fade-content", {
        opacity: 1,
        y: 0,
        duration: 2,
        stagger: 0.5,
        ease: "power2.out"
      });
    }
  }, [showContent]);

  return (
    <main ref={mainRef} className="relative min-h-screen bg-black overflow-x-hidden">
      {!started && <IntroGate onEnter={handleEnter} />}

      {started && (
        <>
          <Scene /> {/* Starfield dive is linked to scroll in the component */}
          
          <div className={`relative z-10 w-full transition-opacity duration-2000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            {/* HERO SECTION */}
            <section className="h-screen flex flex-col items-center justify-center text-center p-6 bg-transparent">
              <div className="fade-content opacity-0 translate-y-10">
                <p className="text-[#d4af37] tracking-[0.5em] uppercase text-xs mb-6 font-montserrat">
                  A New Chapter Begins
                </p>
                <h1 className="text-5xl md:text-8xl lg:text-9xl font-cinzel text-white mb-12 opacity-90 italic">
                  Sanu & Bijeesh
                </h1>
                <Countdown />
              </div>
              
              {/* Floating Scroll Indicator */}
              <div className="absolute bottom-10 animate-bounce text-white/30">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </section>

            {/* HORIZONTAL STORY JOURNEY */}
            <div className="fade-content opacity-0 translate-y-10">
              <StorySection />
            </div>

            {/* FINAL TRIBUTE SECTION */}
            <div className="fade-content opacity-0 translate-y-10">
              <Tribute />
            </div>

            <footer className="py-12 text-center text-white/30 border-t border-white/5 bg-black">
                <p className="text-xs tracking-widest uppercase mb-4 font-montserrat">
                  as a gift from <a href="https://github.com/frpboy" target="_blank" className="text-[#d4af37] hover:text-white underline transition-colors">Rahul</a> with love to you guys
                </p>
                <p className="text-[10px] uppercase tracking-[0.4em] font-montserrat">&copy; 2026 Sanu & Bijeesh</p>
            </footer>
          </div>
        </>
      )}
    </main>
  );
}
