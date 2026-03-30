"use client";
import { useState, useEffect } from "react";
import { Howl } from "howler";

interface Particle {
  id: number;
  top: number;
  left: number;
  animationDelay: number;
  animationDuration: number;
}

/**
 * IntroGate - The "Opening Gate" Experience
 *
 * Visual: Dark screen with a single gold star (humming intro visual)
 * Action: User clicks "Enter" → Audio plays muffled → Filter ramps to clear
 */
export default function IntroGate({ onEnter }: { onEnter: (sound: Howl) => void }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sound, setSound] = useState<Howl | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const audio = new Howl({
      src: ["/music.flac"],
      html5: true,
      preload: true,
      volume: 0,
      onload: () => setIsLoaded(true),
    });

    setSound(audio);

    // Generate random particles on client side only (fixes hydration)
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        animationDelay: Math.random() * 3,
        animationDuration: 2 + Math.random() * 2,
      }))
    );

    return () => {
      if (audio) {
        audio.unload();
      }
    };
  }, []);

  const handleEnter = () => {
    if (sound) {
      sound.play();
      onEnter(sound);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Single gold star - The "Humming/Intro" visual */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-1 h-1 bg-[#d4af37] rounded-full blur-[2px] animate-pulse shadow-[0_0_20px_2px_rgba(212,175,55,0.8)]"></div>
        <div className="absolute inset-0 w-1 h-1 bg-[#d4af37] rounded-full blur-[8px] opacity-30 animate-pulse"></div>
      </div>

      {/* Ambient floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-[1px] h-[1px] bg-white/20 rounded-full animate-twinkle"
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10 px-4">
        <h2 className="text-[#d4af37] font-serif text-2xl md:text-3xl tracking-[0.4em] mb-12 uppercase animate-fade-in">
          Sanu & Bijeesh
        </h2>

        {isLoaded ? (
          <button
            onClick={handleEnter}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative px-8 md:px-12 py-4 border border-[#d4af37]/50 text-[#d4af37] rounded-full overflow-hidden transition-all duration-500 hover:border-[#d4af37] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            <div
              className="absolute inset-0 bg-[#d4af37] transition-transform duration-500 ease-out"
              style={{
                transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
              }}
            />

            <span className="relative z-10 font-serif italic text-lg md:text-xl transition-colors duration-500">
              Hear the Story of Sanu & Bijeesh
            </span>
          </button>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-48 h-[1px] bg-white/10 mb-4 overflow-hidden rounded-full">
               <div className="w-full h-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent animate-loading-bar"></div>
            </div>
            <p className="text-white/40 text-[10px] tracking-widest uppercase">
              Loading Experience...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
