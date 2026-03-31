"use client";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import PhotoCarousel from "./PhotoCarousel";

// April 4, 2026 5:00 PM IST = 11:30 AM UTC
const REVEAL_TIME = new Date("2026-04-04T11:30:00Z").getTime();

type Phase = "locked" | "opening" | "revealed";

function fireConfetti() {
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.55 },
    colors: ["#d4af37", "#e8c547", "#f5d76e", "#ffffff", "#fff8dc"],
    gravity: 0.9,
    scalar: 1.1,
  });
  // Second burst slightly delayed for depth
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.5, x: 0.3 },
      colors: ["#d4af37", "#e8c547", "#ffffff"],
      gravity: 0.8,
    });
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.5, x: 0.7 },
      colors: ["#d4af37", "#e8c547", "#ffffff"],
      gravity: 0.8,
    });
  }, 250);
}

export default function PhotoReveal() {
  const [phase, setPhase] = useState<Phase>("locked");
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: "00", hours: "00", minutes: "00", seconds: "00",
  });
  const [serverOffset, setServerOffset] = useState<number | null>(null);

  useEffect(() => {
    if (localStorage.getItem("photos-revealed")) {
      setPhase("revealed");
      return;
    }

    const clientBefore = Date.now();
    fetch("/api/time")
      .then((r) => r.json())
      .then(({ now: serverNow }: { now: number }) => {
        const clientMid = Math.round((clientBefore + Date.now()) / 2);
        setServerOffset(serverNow - clientMid);
      })
      .catch(() => setServerOffset(0));
  }, []);

  useEffect(() => {
    if (serverOffset === null) return;

    function now() { return Date.now() + serverOffset!; }

    let timer: ReturnType<typeof setInterval>;

    function tick() {
      const diff = REVEAL_TIME - now();
      if (diff <= 0) {
        clearInterval(timer);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            setPhase("opening");
            setCurtainOpen(true);
            fireConfetti();
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

  return (
    <section id="gallery" className="section">
      <div className="container">
        <h2 className="section-title">Save the Date</h2>

        {phase === "revealed" ? (
          <PhotoCarousel />
        ) : (
          <div className="curtain-stage">
            {phase === "opening" && (
              <div className="curtain-carousel-under">
                <PhotoCarousel />
              </div>
            )}

            <div className={`curtain-panel curtain-panel-left${curtainOpen ? " curtain-panel-open" : ""}`}>
              <div className="curtain-sheen" />
            </div>
            <div className={`curtain-panel curtain-panel-right${curtainOpen ? " curtain-panel-open" : ""}`}>
              <div className="curtain-sheen curtain-sheen-r" />
            </div>

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
        )}
      </div>
    </section>
  );
}
