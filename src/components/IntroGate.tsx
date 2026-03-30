"use client";
import { useState, useEffect } from "react";
import { Howl } from "howler";

export default function IntroGate({ onEnter }: { onEnter: (sound: Howl) => void }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    const audio = new Howl({
      src: ["/music.flac"], // High quality FLAC in public folder
      html5: true, 
      preload: true,
      volume: 0,
      onload: () => setIsLoaded(true),
    });
    setSound(audio);

    return () => {
        if (audio) {
            audio.unload();
        }
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Visual: Single gold star as requested for the Intro */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#d4af37] rounded-full blur-[1px] animate-pulse"></div>
      
      <div className="text-center relative z-10">
        <h2 className="text-[#d4af37] font-serif text-2xl tracking-[0.4em] mb-12 uppercase animate-fade-in">
          Sanu & Bijeesh
        </h2>
        
        {isLoaded ? (
          <button
            onClick={() => sound && onEnter(sound)}
            className="group relative px-12 py-4 border border-[#d4af37] text-[#d4af37] rounded-full overflow-hidden transition-all hover:bg-[#d4af37] hover:text-black"
          >
            <span className="relative z-10 font-serif italic text-xl">Hear the Story of Sanu & Bijeesh</span>
            <div className="absolute inset-0 bg-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-48 h-[1px] bg-white/20 mb-4 overflow-hidden">
               <div className="w-full h-full bg-[#d4af37] animate-loading-bar"></div>
            </div>
            <p className="text-white/40 text-[10px] tracking-widest uppercase">Buffering High Quality Audio...</p>
          </div>
        )}
      </div>
    </div>
  );
}
