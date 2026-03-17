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

const ITEMS = [
  { icon: "/noun-gluten-free.png", label: "Pure Ingredients" },
  { icon: "/noun-distillation.png", label: "13-Stage Process" },
  { icon: "/noun-corn.png", label: "Finest Grains & Agave" },
  { icon: "/noun-prepared-in-small-batches.png", label: "Small Batch" },
];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      id="visit"
      ref={sectionRef}
      className="relative bg-black px-6 lg:px-12 py-20 lg:py-24 overflow-hidden scroll-mt-20 flex flex-col justify-center"
    >
      {/* Mega Background Text - Scale reduced */}
      <div className="absolute top-0 right-0 h-full flex flex-col justify-center pointer-events-none z-0">
        <p className="font-heading text-[15vw] font-bold text-white/[0.03] leading-none [writing-mode:vertical-rl] rotate-180 transform translate-x-1/4">
          DISTINCTIVE
        </p>
      </div>

      <div className="relative mx-auto max-w-[1400px] z-10 w-full">

        {/* Header - Compact */}
        <div className="max-w-2xl mb-16 reveal">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-[2px] w-12 bg-[#D1BB8A]" />
            <p className="font-body text-[11px] font-bold uppercase tracking-[0.45em] text-[#D1BB8A]">
              The Experience
            </p>
          </div>
          <h2 className="font-heading text-[clamp(1.75rem,5.5vw,3.5rem)] font-semibold tracking-[1px] text-white leading-[1.5] mb-6">
            Spirit of <span className="text-[#D1BB8A]">Distinction.</span>
          </h2>
          <p className="font-body text-[15px] lg:text-[18px] font-normal text-white/50 leading-[1.8] max-w-lg">
            Exceptional smoothness and a finish that lingers. For those who acknowledge true craftsmanship.
          </p>
        </div>

        {/* Central Display - Height constrained */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">

          {/* Bottle Showcased */}
          <div className="lg:col-span-7 relative reveal reveal-delay-1 order-2 lg:order-1">
            <div className="relative group max-h-[70vh] sm:max-h-[55vh] lg:max-h-[60vh] flex items-center">
              <img
                src="/all-bottole-transperent.png"
                alt="Cousins Spirits"
                className="w-full h-auto max-h-[70vh] sm:max-h-[75vh] object-contain mx-auto drop-shadow-[0_40px_100px_rgba(209,187,138,0.25)] mix-blend-screen animate-float"
              />
              <div className="absolute inset-0 bg-radial from-[#D1BB8A]/20 to-transparent opacity-40 blur-3xl pointer-events-none" />
            </div>
          </div>

          {/* Feature List - Compact Gap */}
          <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-10 order-1 lg:order-2">
            {ITEMS.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 sm:gap-5 reveal reveal-delay-2 group">
                <div className="h-14 w-14 sm:h-18 sm:w-18 flex-shrink-0 flex items-center justify-center border border-white/10 group-hover:border-[#D1BB8A]/50 transition-colors">
                  <img
                    src={item.icon}
                    alt=""
                    className="w-7 h-7 sm:w-10 sm:h-10 object-contain invert opacity-50 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div>
                  <p className="font-body text-[9px] font-bold tracking-[0.3em] uppercase text-[#D1BB8A]/60 mb-1">
                    Feature
                  </p>
                  <h4 className="font-heading text-[16px] sm:text-[20px] lg:text-[24px] font-bold text-white leading-none">
                    {item.label}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
