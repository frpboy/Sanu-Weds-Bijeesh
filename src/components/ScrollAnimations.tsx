"use client";
import { useEffect } from "react";

/**
 * Replicates the legacy IntersectionObserver scroll-animation logic.
 * Elements matching the selector start invisible and fade/slide up
 * when they enter the viewport.
 */
export default function ScrollAnimations() {
  useEffect(() => {
    const selector =
      ".section-title, .timeline-item, .event-card, .gallery-item";
    const elements = document.querySelectorAll<HTMLElement>(selector);

    // Set initial hidden state
    elements.forEach((el) => {
      el.style.opacity = "0";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("animate-slide-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
