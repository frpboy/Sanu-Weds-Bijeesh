"use client";
import { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00", hours: "00", minutes: "00", seconds: "00"
  });

  useEffect(() => {
    const target = new Date("2026-04-08T10:30:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference < 0) {
        clearInterval(interval);
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d.toString().padStart(2, "0"),
        hours: h.toString().padStart(2, "0"),
        minutes: m.toString().padStart(2, "0"),
        seconds: s.toString().padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const Slot = ({ value, label }: { value: string, label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gold-500/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-black/40 backdrop-blur-md border border-white/10 px-4 py-6 md:px-8 md:py-8 rounded-xl min-w-[80px] md:min-w-[120px]">
          <span className="text-4xl md:text-6xl font-light tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            {value}
          </span>
        </div>
      </div>
      <span className="mt-4 text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#d4af37]">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex animate-fade-in">
      <Slot value={timeLeft.days} label="Days" />
      <Slot value={timeLeft.hours} label="Hours" />
      <Slot value={timeLeft.minutes} label="Mins" />
      <Slot value={timeLeft.seconds} label="Secs" />
    </div>
  );
}
