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
    <main ref={mainRef} className="relative min-h-screen bg-black overflow-x-hidden">
      {!started && <IntroGate onEnter={handleEnter} />}

      {started && (
        <>
          <Scene currentTime={currentTime} isWarpSpeed={isWarpSpeed} />

          <div className={`relative z-10 w-full transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            <section className="h-screen flex flex-col items-center justify-center text-center p-6 bg-transparent">
              <div className="fade-content opacity-0 translate-y-10">
                <p className="text-[#d4af37] tracking-[0.5em] uppercase text-xs mb-6 font-montserrat">
                  A New Chapter Begins
                </p>
                <h1 className="text-5xl md:text-8xl lg:text-9xl font-cinzel text-white mb-12 opacity-90 italic drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                  Sanu & Bijeesh
                </h1>
                <Countdown />
              </div>

              <div className="fade-content opacity-0 translate-y-10 absolute bottom-10 animate-bounce text-white/30">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </section>

            <div className="fade-content opacity-0 translate-y-10">
              <StorySection />
            </div>

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
