"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useScrollReveal(sectionRef);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-50"
        aria-hidden
      >
        <source src="/main-vid.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay — flat */}
      <div className="absolute inset-0 bg-black/40" aria-hidden />

      {/* Gold bottom border accent — solid */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D1BB8A]/60" />

      {/* Content — centered in viewport */}
      <div className="relative min-h-screen flex flex-col justify-center items-center px-6 pb-24 sm:px-12 lg:px-12">
        <div className="max-w-[900px] text-center">
          {/* Eyebrow — flanking lines like PhilosophySection */}
          <div className="flex items-center justify-center gap-4 mb-6 reveal">
            <span className="h-[1px] w-12 bg-[#D1BB8A]" aria-hidden />
            <p className="font-body text-[11px] font-bold uppercase tracking-[0.4em] text-[#D1BB8A]">
              Rooted in Family. Refined in Spirit.
            </p>
            <span className="h-[1px] w-12 bg-[#D1BB8A]" aria-hidden />
          </div>

          {/* Massive H1 */}
          <h1
            className="font-heading font-bold text-white leading-[1.2] reveal reveal-delay-1"
            style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
          >
            COUSIN<br />
            DISTILLERY
          </h1>

          <p className="font-body text-[1rem] sm:text-[1.25rem] font-bold text-[#D1BB8A] mt-6 reveal reveal-delay-2 tracking-wide">
            Field to Bottle · España · Est. 2019
          </p>

          {/* Body copy */}
          <p className="max-w-2xl mx-auto font-body text-[15px] lg:text-[18px] font-normal leading-[1.8] text-white/80 mt-8 mb-12 reveal reveal-delay-3">
            Two cousins. Four premium spirits. Thirteen stages of unwavering obsession. Distilled from our own organic farms in rural Spain — nothing in between.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 reveal reveal-delay-4 w-full px-2 sm:px-0">
            <Link
              href="/#our-spirits"
              className="group flex h-[56px] w-full sm:w-auto items-center justify-center bg-[#D1BB8A] px-10 font-body text-[13px] font-bold uppercase tracking-[0.2em] text-[#1A130F] transition-all hover:bg-white hover:scale-[1.02]"
            >
              Explore the Collection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-3 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="#process"
              className="flex h-[56px] w-full sm:w-auto items-center justify-center border border-white/40 px-10 font-body text-[13px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white hover:bg-white/10"
            >
              Our 13-Stage Process
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-10 right-10 flex flex-col items-center gap-2 transition-opacity duration-500 hidden lg:flex"
          style={{ opacity: scrolled ? 0 : 1, pointerEvents: "none" }}
          aria-hidden
        >
          <div className="animate-bounce-slow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(209,187,138,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
          <span className="font-body text-[9px] uppercase tracking-[0.35em] text-[#D1BB8A]/50 [writing-mode:vertical-rl]">
            Scroll
          </span>
        </div>
      </div>

      {/* Bottom accent label — matches PhilosophySection */}
      <div className="absolute bottom-10 left-10 lg:left-20 hidden lg:block pointer-events-none">
        <p className="font-heading text-[60px] font-bold text-white/5 leading-none select-none">
          COUSINS
        </p>
      </div>
    </section>
  );
}
