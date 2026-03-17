"use client";

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

export function RoyalCraftSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0F0A08] px-6 lg:px-12 py-20 lg:py-24 overflow-hidden"
      id="process"
    >
      {/* Massive Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[25vw] font-bold text-white/[0.03] leading-none pointer-events-none select-none">
        13
      </div>

      <div className="relative mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-7 z-10">
          <div className="flex items-center gap-4 mb-6 reveal">
            <span className="h-[1px] w-12 bg-[#D1BB8A]" aria-hidden />
            <p className="font-body text-[11px] font-bold uppercase tracking-[0.4em] text-[#D1BB8A]">
              The Craft
            </p>
          </div>
          
          <h2 className="font-heading text-[clamp(1.75rem,5.5vw,3.5rem)] font-semibold tracking-[1px] text-white leading-[1.5] mb-10 reveal reveal-delay-1">
            Thirteen stages. <br />
            <span className="text-[#D1BB8A]">One obsession.</span>
          </h2>

          <div className="reveal reveal-delay-2 max-w-xl mb-10">
            <p className="font-body text-[15px] lg:text-[18px] font-normal text-white/70 leading-[1.8] mb-6">
              Most distilleries stop at three or four passes through the still. We run every spirit through thirteen precisely controlled stages — each one removing what is unwanted and concentrating what is extraordinary.
            </p>
            <p className="font-body text-[15px] lg:text-[18px] font-normal text-white/70 leading-[1.8]">
              The result is a depth of purity and flavour that cannot be replicated any other way. This is not efficiency. This is devotion.
            </p>
          </div>
        </div>

        {/* Right Imagery - Full range */}
        <div className="lg:col-span-5 relative reveal reveal-delay-2 mt-8 lg:mt-0">
          <div className="relative aspect-[4/3] max-h-[70vh] overflow-hidden mx-auto lg:ml-auto">
            <img
              src="/all-bottles.jpeg"
              alt="Cousins spirits: Vodka, Blue Agave, Tequila, and Whiskey — thirteen stages of refinement"
              className="w-full h-full object-cover object-center transition-transform duration-[2s] hover:scale-[1.02]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
