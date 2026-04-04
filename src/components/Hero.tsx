"use client";
import { useState, useEffect } from "react";
import Countdown from "./Countdown";

// All timestamps in UTC (IST = UTC+5:30)
const CEREMONY_START  = new Date("2026-04-08T05:00:00Z").getTime(); // 10:30 AM IST
const CEREMONY_END    = new Date("2026-04-08T06:00:00Z").getTime(); // 11:30 AM IST
const RECEPTION_START = new Date("2026-04-08T11:00:00Z").getTime(); // 4:30 PM IST
const RECEPTION_END   = new Date("2026-04-08T14:00:00Z").getTime(); // 7:30 PM IST

type Phase = "pre" | "ceremony" | "between" | "reception" | "post";

function getPhase(now: number): Phase {
  if (now < CEREMONY_START) return "pre";
  if (now < CEREMONY_END)   return "ceremony";
  if (now < RECEPTION_START) return "between";
  if (now < RECEPTION_END)  return "reception";
  return "post";
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function ReceptionCountdown() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const tick = () => {
      const diff = RECEPTION_START - Date.now();
      if (diff <= 0) { setLabel(""); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setLabel(`${pad(h)}:${pad(m)}:${pad(s)}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!label) return null;
  return (
    <div className="reception-countdown animate-fade-in">
      <p className="reception-countdown-label">Reception begins in</p>
      <p className="reception-countdown-timer">{label}</p>
      <p className="reception-countdown-sub">4:30 PM at River View Auditorium</p>
    </div>
  );
}

export default function Hero() {
  const [phase, setPhase] = useState<Phase>("pre");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => setPhase(getPhase(Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const showLive = mounted && (phase === "ceremony" || phase === "reception");

  return (
    <header className="hero">
      <div className="hero-content">

        {/* Live badge — above the title */}
        {showLive && (
          <div className="live-badge animate-fade-in">
            <span className="live-dot" />
            {phase === "ceremony" ? "LIVE · Wedding Ceremony" : "LIVE · Wedding Reception"}
          </div>
        )}

        <h2 className="animate-fade-in">
          {!mounted || phase === "pre"
            ? "Save the Date"
            : phase === "ceremony"
            ? "The Ceremony is Happening Now"
            : phase === "between"
            ? "Just Married!"
            : phase === "reception"
            ? "Reception is Happening Now"
            : "And so their forever begins"}
        </h2>

        <h1 className="couple-names animate-slide-up">
          Sanu <span className="ampersand">&amp;</span> Bijeesh
        </h1>

        <p className="date animate-fade-in">April 8th, 2026</p>

        {/* Phase-specific content */}
        {(!mounted || phase === "pre") && <Countdown />}

        {mounted && phase === "ceremony" && (
          <div className="event-live-info animate-fade-in">
            <p><i className="fas fa-map-marker-alt" />{" "}Immu Auditorium, Mannarmala, Kerala</p>
            <p><i className="fas fa-clock" />{" "}10:30 AM – 11:30 AM IST</p>
          </div>
        )}

        {mounted && phase === "between" && <ReceptionCountdown />}

        {mounted && phase === "reception" && (
          <div className="event-live-info animate-fade-in">
            <p><i className="fas fa-map-marker-alt" />{" "}River View Auditorium, Nattyamangalam, Kerala</p>
            <p><i className="fas fa-clock" />{" "}4:30 PM – 7:30 PM IST</p>
          </div>
        )}

        {mounted && phase === "post" && (
          <div className="post-wedding-quote animate-fade-in">
            <p className="post-wedding-text">
              &ldquo;Two souls, one heart &mdash; now writing the most beautiful chapter together.&rdquo;
            </p>
            <p className="post-wedding-byline">Married · April 8th, 2026</p>
          </div>
        )}

        <a href="#our-journey" className="scroll-btn" aria-label="Scroll down">
          <i className="fas fa-chevron-down" />
        </a>
      </div>
    </header>
  );
}
