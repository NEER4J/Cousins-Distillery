"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

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

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      id="company"
      ref={sectionRef}
      className="relative min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden bg-black px-6 lg:px-12 py-20 lg:py-24"
    >
      {/* Full-bleed background image - slightly darker */}
      <img
        src="/lady-with-glass.jpg"
        alt="Philosophy background"
        className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/70" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6 reveal">
            <span className="h-[1px] w-12 bg-[#D1BB8A]" />
            <p className="font-body text-[11px] font-bold uppercase tracking-[0.4em] text-[#D1BB8A]">
              The Core Philosophy
            </p>
            <span className="h-[1px] w-12 bg-[#D1BB8A]" />
          </div>

          <blockquote className="font-heading text-[clamp(1.75rem,4.5vw,3.5rem)] font-semibold tracking-[1px] text-white leading-[1.5] mb-10 reveal reveal-delay-1">
            "Refinement is not <br /> extravagance — <br /> 
            <span className="text-[#D1BB8A]">It is discipline."</span>
          </blockquote>

          <div className="max-w-xl mx-auto space-y-6 reveal reveal-delay-2">
            <p className="font-body text-[15px] lg:text-[18px] font-normal leading-[1.8] text-white/70">
              For those who recognize that true distinction is found in the spirit of unity and uncompromising craft. Home-grown. Authentically sourced. Masterfully distilled.
            </p>
            
            <Link
              href="/contact"
              className="inline-flex items-center group pt-4"
            >
              <span className="h-[2px] w-12 bg-[#D1BB8A] mr-6 group-hover:w-20 transition-all duration-500" />
              <span className="font-body text-[12px] font-bold uppercase tracking-[0.3em] text-white group-hover:text-[#D1BB8A] transition-colors">
                Our Story
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom accent label - Smaller */}
      <div className="absolute bottom-10 left-10 lg:left-20 hidden lg:block">
         <p className="font-heading text-[60px] font-bold text-white/5 leading-none select-none">
          FAMILY FIRST
        </p>
      </div>
    </section>
  );
}
