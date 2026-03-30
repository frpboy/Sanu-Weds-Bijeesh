"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const memories = [
  {
    title: "The First Meeting",
    date: "Family Gathering",
    description: "Where our families first shared the vision of our union.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Engagement Day",
    date: "April 2025",
    description: "A beautiful day filled with promises and gold.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Preparations",
    date: "Late 2025",
    description: "Building our future home and planning the grand celebration.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Traditions",
    date: "Pre-Wedding",
    description: "Honoring our roots and family values.",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "The Big Day",
    date: "April 8, 2026",
    description: "The moment two souls and two families become one.",
    image: "https://images.unsplash.com/photo-1519225495810-75178319a13b?auto=format&fit=crop&w=800&q=80",
  },
];

/**
 * StorySection - Horizontal "Film Strip" Journey
 * 
 * Uses GSAP ScrollTrigger to pin the container and translate
 * horizontally as the user scrolls vertically.
 */
export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const horizontal = horizontalRef.current;
      
      if (!container || !horizontal) return;

      const cards = gsap.utils.toArray<HTMLElement>(".memory-card");
      const totalCards = cards.length;
      
      // Calculate the total scroll distance
      // Each card takes roughly 100vw of vertical scroll
      const scrollDistance = (horizontal.scrollWidth - window.innerWidth);
      
      // Create the horizontal scroll animation
      gsap.to(horizontal, {
        x: () => -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Parallax effect for images within cards
      cards.forEach((card, index) => {
        const img = card.querySelector("img");
        if (!img) return;

        gsap.fromTo(img, 
          { x: 50 },
          {
            x: -50,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getTweensOf(horizontal)[0],
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );

        // Stagger fade-in for card content
        gsap.from(card.querySelector(".card-content"), {
          opacity: 0,
          y: 30,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            containerAnimation: gsap.getTweensOf(horizontal)[0],
            start: "left center",
            end: "center center",
            scrub: true,
          },
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden bg-transparent">
      <div
        ref={horizontalRef}
        className="flex h-screen items-center"
        style={{ width: `${memories.length * 100}vw` }}
      >
        {/* Section title - visible at start */}
        <div className="memory-card relative mx-[5vw] h-[60vh] w-[70vw] md:w-[40vw] flex-shrink-0 overflow-hidden rounded-3xl border border-[#d4af37]/30 bg-black/40 backdrop-blur-xl">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12 card-content">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-[#d4af37]">
              Our Journey
            </p>
            <h3 className="font-cinzel text-4xl md:text-6xl text-white text-center">
              Two Paths, One Destination
            </h3>
            <div className="mt-8 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
          </div>
        </div>

        {/* Memory cards */}
        {memories.map((memory, index) => (
          <div
            key={index}
            className="memory-card relative mx-[5vw] h-[60vh] w-[70vw] md:w-[40vw] flex-shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl transition-transform duration-500 hover:scale-[1.02] hover:border-[#d4af37]/50"
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={memory.image}
                alt={memory.title}
                className="h-full w-full object-cover opacity-40 transition-transform duration-700 hover:scale-110"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>
            <div className="card-content relative z-10 flex h-full flex-col justify-end p-8 md:p-12">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
                {memory.date}
              </p>
              <h3 className="mb-4 font-cinzel text-3xl text-white md:text-5xl">
                {memory.title}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                {memory.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
