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

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const horizontalSection = horizontalRef.current;
      if (!horizontalSection) return;

      const totalWidth = horizontalSection.scrollWidth;
      const windowWidth = window.innerWidth;

      gsap.to(horizontalSection, {
        x: () => -(totalWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Parallax effect for images
      gsap.utils.toArray<HTMLElement>(".memory-card img").forEach((img) => {
        gsap.to(img, {
          x: -50,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            containerAnimation: gsap.getById("horizontal-scroll") as any, // This is tricky with ScrollTrigger
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
        className="flex h-screen items-center px-[10vw]"
        style={{ width: `${memories.length * 80}vw` }}
      >
        {memories.map((memory, index) => (
          <div
            key={index}
            className="memory-card relative mx-[5vw] h-[60vh] w-[70vw] md:w-[40vw] flex-shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl transition-transform duration-500 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={memory.image}
                alt={memory.title}
                className="h-full w-full object-cover opacity-40 transition-transform duration-700 hover:scale-110"
              />
            </div>
            <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-12">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
                {memory.date}
              </p>
              <h3 className="mb-4 font-cinzel text-3xl text-white md:text-5xl">
                {memory.title}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-white/60 md:text-base">
                {memory.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
