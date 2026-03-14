"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  { num: "01", title: "Milled With Intention", desc: "Small batches, large purpose." },
  { num: "02", title: "Pristine Purity", desc: "Blended with mineral-rich water." },
  { num: "03", title: "The Breath", desc: "Given the silence it requires." },
  { num: "04", title: "Refined Brilliance", desc: "Polished thirteen times over." },
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

export function RoyalCraftSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0F0A08] px-4 py-16 lg:py-24 overflow-hidden"
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
              The Royal Craft
            </p>
          </div>
          
          <h2 className="font-heading text-[clamp(2rem,6vw,4rem)] font-bold text-white leading-[1.05] mb-10 reveal reveal-delay-1">
            Thirteen Stages <br />
            Of <span className="italic text-[#D1BB8A]">Refinement.</span>
          </h2>

          <div className="reveal reveal-delay-2 max-w-xl">
            <h3 className="font-heading text-[20px] sm:text-[24px] lg:text-[28px] font-bold italic text-white mb-6">
              At Cousins Distillery, craftsmanship lives in the details.
            </h3>
            <p className="font-body text-[15px] lg:text-[18px] font-light text-white/70 leading-[1.8] mb-6">
              Each spirit is refined through a 13-stage distillation process, a carefully calibrated sequence of purification, separation, and polishing. 
            </p>
            <p className="font-body text-[15px] lg:text-[18px] font-light text-white/70 leading-[1.8]">
              This method ensures a cleaner, smoother, more refined spirit while maintaining its natural character and depth. For the guest, this means a refined mouthfeel, a clean finish, and a sensory experience that feels truly elevated.
            </p>
          </div>
        </div>

        {/* Right Imagery - Full range */}
        <div className="lg:col-span-5 relative reveal reveal-delay-2">
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
