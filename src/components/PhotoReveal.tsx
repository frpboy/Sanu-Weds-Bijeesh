"use client";
import { useState, useEffect } from "react";
import PhotoCarousel from "./PhotoCarousel";

// April 4, 2026 5:00 PM IST = 11:30 AM UTC
const REVEAL_TIME = new Date("2026-04-04T11:30:00Z").getTime();

type Phase = "locked" | "opening" | "revealed";

export default function PhotoReveal() {
  const [phase, setPhase] = useState<Phase>("locked");
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: "00", hours: "00", minutes: "00", seconds: "00",
  });
  // Difference between server clock and device clock (ms).
  // All countdown math uses Date.now() + serverOffset so the device
  // clock cannot be manipulated to unlock early.
  const [serverOffset, setServerOffset] = useState<number | null>(null);

  useEffect(() => {
    if (localStorage.getItem("photos-revealed")) {
      setPhase("revealed");
      return;
    }

    // Fetch server time once on mount; calculate offset
    const clientBefore = Date.now();
    fetch("/api/time")
      .then((r) => r.json())
      .then(({ now: serverNow }: { now: number }) => {
        const clientAfter = Date.now();
        // Midpoint estimate to account for round-trip
        const clientMid = Math.round((clientBefore + clientAfter) / 2);
        setServerOffset(serverNow - clientMid);
      })
      .catch(() => setServerOffset(0)); // fallback: trust device clock
  }, []);

  useEffect(() => {
    if (serverOffset === null) return; // wait until offset is known

    let timer: ReturnType<typeof setInterval>;

    function now() {
      return Date.now() + serverOffset!;
    }

    function tick() {
      const diff = REVEAL_TIME - now();
      if (diff <= 0) {
        clearInterval(timer);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            setPhase("opening");
            setCurtainOpen(true);
          })
        );
        setTimeout(() => {
          setPhase("revealed");
          localStorage.setItem("photos-revealed", "1");
        }, 1600);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000).toString().padStart(2, "0"),
        hours: Math.floor((diff % 86400000) / 3600000).toString().padStart(2, "0"),
        minutes: Math.floor((diff % 3600000) / 60000).toString().padStart(2, "0"),
        seconds: Math.floor((diff % 60000) / 1000).toString().padStart(2, "0"),
      });
    }

    tick();
    timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [serverOffset]);

  if (phase === "revealed") return <PhotoCarousel />;

  return (
    <div className="curtain-stage">
      {/* Carousel pre-mounted during opening so it's visible when curtain clears */}
      {phase === "opening" && (
        <div className="curtain-carousel-under">
          <PhotoCarousel />
        </div>
      )}

      {/* Left & right curtain panels */}
      <div className={`curtain-panel curtain-panel-left${curtainOpen ? " curtain-panel-open" : ""}`}>
        <div className="curtain-sheen" />
      </div>
      <div className={`curtain-panel curtain-panel-right${curtainOpen ? " curtain-panel-open" : ""}`}>
        <div className="curtain-sheen curtain-sheen-r" />
      </div>

      {/* Center content — hidden during the opening animation */}
      {phase === "locked" && (
        <div className="curtain-content">
          <div className="curtain-rope curtain-rope-l" />

          <i className="fas fa-camera curtain-icon" />
          <p className="curtain-eyebrow">Save the Date Gallery</p>
          <div className="curtain-divider" />
          <p className="curtain-sub">
            {serverOffset === null ? "Loading…" : "Photos revealed in"}
          </p>

          {serverOffset !== null && (
            <div className="curtain-cd">
              {[
                { v: timeLeft.days, l: "Days" },
                { v: timeLeft.hours, l: "Hrs" },
                { v: timeLeft.minutes, l: "Min" },
                { v: timeLeft.seconds, l: "Sec" },
              ].map(({ v, l }) => (
                <div key={l} className="curtain-cd-block">
                  <span>{v}</span>
                  <small>{l}</small>
                </div>
              ))}
            </div>
          )}

          <p className="curtain-reveal-date">
            <i className="fas fa-lock" /> April 4th, 2026 &middot; 5:00 PM IST
          </p>
        </div>
      )}
    </div>
  );
}
