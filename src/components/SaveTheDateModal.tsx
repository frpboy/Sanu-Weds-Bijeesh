"use client";
import { useState, useEffect } from "react";

export default function SaveTheDateModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("sanu-bijeesh-std")) {
      const t = setTimeout(() => setOpen(true), 2200);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    localStorage.setItem("sanu-bijeesh-std", "1");
    // Trigger music directly here — this runs inside the button's event
    // handler, so Android Chrome grants it the user-gesture trust needed
    // to call audio.play() without being blocked.
    (window as Window & { __startMusic?: () => void }).__startMusic?.();
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={dismiss}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <p className="modal-eyebrow">You are cordially invited</p>
        <h2 className="modal-names">Sanu <span>&amp;</span> Bijeesh</h2>
        <div className="modal-divider" />
        <p className="modal-date">April 8th, 2026</p>
        <p className="modal-venue">Mannarmala, Kerala</p>
        <button className="modal-btn" onClick={dismiss}>
          <i className="fas fa-heart" /> I&apos;ll be there!
        </button>
        <button className="modal-close" onClick={dismiss} aria-label="Close">
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  );
}
