"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Tribute() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tribute-text", {
        opacity: 0,
        y: 50,
        duration: 2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleBlessing = async () => {
    const confetti = (await import("canvas-confetti")).default;
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#ffffff", "#8b0000"],
    });
    
    // Optional: Add WhatsApp redirect
    // window.open("https://wa.me/YOUR_PHONE_NUMBER?text=Congratulations Sanu and Bijeesh!", "_blank");
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen flex-col items-center justify-center bg-transparent p-12 text-center"
    >
      <div className="tribute-text">
        <h2 className="mb-8 font-great-vibes text-4xl italic text-white md:text-7xl">
          To a Lifetime of Happiness
        </h2>
        <p className="mx-auto max-w-2xl font-montserrat leading-relaxed text-white/70 md:text-xl">
          Wishing you both a marriage filled with love, laughter, and endless
          joy. May your union be a source of strength and inspiration to
          everyone around you.
        </p>
        <button
          onClick={handleBlessing}
          className="mt-12 overflow-hidden rounded-full bg-[#d4af37] px-12 py-5 font-serif text-lg text-black transition-all duration-500 hover:scale-110 hover:bg-white"
        >
          Send Blessings
        </button>
      </div>
      
      {/* Decorative Nebula Effect Overlay (Simplified) */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] blur-3xl opacity-50"></div>
    </section>
  );
}
