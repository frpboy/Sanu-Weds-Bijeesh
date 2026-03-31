"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import blurs from "@/data/photo-blurs.json";

const PHOTOS = Array.from({ length: 10 }, (_, i) => `/photos/photo${i + 1}.jpg`);
const BLUR_MAP = blurs as Record<string, string>;
const INTERVAL = 4500;

function vibrate() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(10);
  }
}

export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => {
    vibrate();
    setCurrent((c) => (c - 1 + PHOTOS.length) % PHOTOS.length);
  }, []);

  const next = useCallback(() => {
    vibrate();
    setCurrent((c) => (c + 1) % PHOTOS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % PHOTOS.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div
      className="carousel-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="carousel-track">
        {PHOTOS.map((src, i) => (
          <div
            key={src}
            className={`carousel-slide${i === current ? " active" : ""}`}
            aria-hidden={i !== current}
          >
            <Image
              src={src}
              alt={`Save the date photo ${i + 1}`}
              fill
              sizes="(max-width: 600px) 92vw, 480px"
              style={{ objectFit: "cover", objectPosition: "center center" }}
              priority={i === 0}
              placeholder="blur"
              blurDataURL={BLUR_MAP[`photo${i + 1}`]}
            />
            <div className="carousel-vignette" />
          </div>
        ))}
      </div>

      <button className="carousel-arrow left" onClick={prev} aria-label="Previous photo">
        <i className="fas fa-chevron-left" />
      </button>
      <button className="carousel-arrow right" onClick={next} aria-label="Next photo">
        <i className="fas fa-chevron-right" />
      </button>

      <div className="carousel-dots">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === current ? " active" : ""}`}
            onClick={() => { vibrate(); setCurrent(i); }}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
