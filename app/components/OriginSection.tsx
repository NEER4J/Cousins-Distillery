"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

function useScrollReveal(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
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
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef]);
}

export function OriginSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#FEFEF6] py-20 lg:py-24 overflow-hidden scroll-mt-20 px-6 lg:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        
        {/* Statement Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 reveal">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-[1px] w-8 bg-[#9f860e]" aria-hidden />
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.4em] text-[#9f860e]">
                House of Spirits
              </p>
            </div>
            <h2 className="font-heading text-[clamp(2.2rem,4.5vw,3rem)] font-semibold tracking-[1px] leading-[1.5] text-black mb-10">
              Cousins Distillery Ltd. was born from a shared belief: spirits should be as refined as the moments they accompany.
            </h2>
            
            <p className="font-body text-[16px] lg:text-[18px] font-normal leading-[1.8] text-zinc-700 mb-6">
              Founded by kindred spirits with a deep respect for craftsmanship, we began with a vision to create spirits of exceptional purity, balance, and character. This commitment led us to develop our signature 13-stage distillation process, a disciplined method that removes impurities while preserving the subtle aromas and silky texture that define our house style.
            </p>
            <p className="font-body text-[16px] lg:text-[18px] font-normal leading-[1.8] text-zinc-700">
              Today, Cousins Distillery is no longer just about vodka; it is a house of spirits. We craft vodka, Blue Agave Spirit, tequila, and whiskey under the same exacting standards.
            </p>
          </div>

          <div className="lg:col-span-6 reveal reveal-delay-2">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-[#A89530] shadow-2xl">
              <img
                src="/origin-one.jpg"
                alt="Distillery Heritage"
                className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-90 transition-transform duration-1000 hover:scale-105"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
