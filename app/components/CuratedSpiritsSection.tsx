"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const SPIRITS = [
  { name: "Blue Agave", href: "/blue-agave-spirit", image: "/blue-agave.png" },
  { name: "Vodka", href: "/vodka", image: "/vodka.png" },
  { name: "Tequila", href: "/tequila", image: "/taquila.png" },
  { name: "Whiskey", href: "/whiskey", image: "/wishky.png" },
];

function useScrollReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const elements = container.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}

export function CuratedSpiritsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      id="our-spirits"
      ref={sectionRef}
      className="relative bg-[#F9F8F3] px-4 py-20 lg:py-24 overflow-hidden scroll-mt-20"
    >
      <div className="relative mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 lg:mb-16 reveal">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="h-[1px] w-12 bg-[#D1BB8A]" aria-hidden />
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.4em] text-[#D1BB8A]">
                Our Spirits
              </p>
            </div>
            <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold text-[#0F0A08] leading-tight mb-3">
              Curated <span className="italic text-[#D1BB8A]">Collections.</span>
            </h2>
            <p className="font-body text-[15px] lg:text-[16px] text-[#0F0A08]/70 max-w-md">
              Handpicked selections, perfectly balanced and ready to enjoy.
            </p>
          </div>
          <Link
            href="#our-spirits"
            className="inline-flex items-center justify-center h-[56px] px-10 font-body text-[13px] font-bold uppercase tracking-widest bg-[#0F0A08] text-white border border-[#0F0A08] transition-colors hover:bg-white hover:text-[#0F0A08] shrink-0"
          >
            View All
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {SPIRITS.map((spirit, i) => (
            <Link
              key={spirit.href}
              href={spirit.href}
              className="group block reveal reveal-delay-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D1BB8A] focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#0F0A08]/5">
                <img
                  src={spirit.image}
                  alt={`Cousins ${spirit.name}`}
                  className="absolute inset-0 w-[80%] h-[80%] m-auto object-contain object-center drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2"
                />
                {/* Flat overlay bar at bottom - no gradient */}
                <div className="absolute inset-x-0 bottom-0 bg-[#0F0A08] py-4 px-5">
                  <span className="font-heading text-[20px] lg:text-[22px] font-bold text-white">
                    {spirit.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
