"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const confettiTriggeredRef = useRef(false);

  const handleEnter = (sound: Howl) => {
    unmute();
    setStarted(true);
  };

  useEffect(() => {
    if (!started || !sound) return;

    const interval = setInterval(() => {
      setCurrentTime(sound.seek() as number);
    }, 500);

    return () => clearInterval(interval);
  }, [started, sound]);

  const triggerChorusConfetti = useCallback(async () => {
    if (confettiTriggeredRef.current) return;
    confettiTriggeredRef.current = true;

    const confetti = (await import("canvas-confetti")).default;

    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#d4af37", "#f4d03f", "#ffffff", "#e8c36d"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        startVelocity: 40,
        origin: { x: 0, y: 0.7 },
        colors: colors,
        shapes: ['circle'],
        scalar: 2,
        drift: 2,
        ticks: 200,
        gravity: 0.5,
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        startVelocity: 40,
        origin: { x: 1, y: 0.7 },
        colors: colors,
        shapes: ['circle'],
        scalar: 2,
        drift: -2,
        gravity: 0.5,
      });

      requestAnimationFrame(frame);
    };

    frame();

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
      shapes: ['circle'],
      scalar: 1.5,
      gravity: 0.8,
      drift: 0,
    });

  }, []);

  useEffect(() => {
    if (started && currentTime >= 90 && !hasTriggeredConfetti) {
      setHasTriggeredConfetti(true);
      triggerChorusConfetti();
    }
  }, [started, currentTime, hasTriggeredConfetti, triggerChorusConfetti]);

  const showContent = started && currentTime > 0.5;
  const isWarpSpeed = currentTime >= 90;

  useEffect(() => {
    if (showContent) {
      gsap.to(".fade-content", {
        opacity: 1,
        y: 0,
        duration: 2,
        stagger: 0.3,
        ease: "power2.out"
      });
    }
  }, [showContent]);

  return (
    <main className="relative bg-black w-full min-h-screen overflow-x-hidden">
      {/* 1. THE 3D BACKGROUND (Fixed behind everything) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene currentTime={currentTime} isWarpSpeed={isWarpSpeed} />
      </div>

      {!started ? (
        <IntroGate onEnter={handleEnter} />
      ) : (
        /* 2. THE CONTENT LAYER (Scrollable, z-10) */
        <div className="relative z-10 w-full">
          
          {/* Hero Section */}
          <section className="h-screen w-full flex flex-col items-center justify-center text-center p-6 snap-start">
            <div className="fade-content opacity-0 translate-y-10">
              <p className="text-[#d4af37] tracking-[0.5em] uppercase text-xs mb-6 font-montserrat">
                A New Chapter Begins
              </p>
              <h1 className="text-5xl md:text-8xl lg:text-9xl font-cinzel text-white mb-12 opacity-90 italic drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                Sanu & Bijeesh
              </h1>
              <Countdown />
            </div>

            <div className="fade-content opacity-0 translate-y-10 mt-20 animate-bounce text-white/50 tracking-widest text-xs">
              SCROLL TO EXPLORE THE JOURNEY ↓
            </div>
          </section>

          {/* Story Section */}
          <div className="fade-content opacity-0 translate-y-10">
            <StorySection />
          </div>

          {/* Tribute Section */}
          <div className="fade-content opacity-0 translate-y-10">
            <Tribute />
          </div>

          {/* Footer */}
          <footer className="py-10 text-center text-white/20 text-[10px] tracking-[0.5em] uppercase bg-black/50 backdrop-blur-sm">
            April 8, 2026 • Forever
          </footer>
        </div>
      )}
    </main>
  );
}
