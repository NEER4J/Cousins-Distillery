"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Product } from "@/lib/products";

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

interface ProductPageContentProps {
  product: Product;
}

export function ProductPageContent({ product }: ProductPageContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);

  const accentLabel = product.name.replace(/\s+/g, " ").toUpperCase();
  const bottleImg = product.image || "/bottle in field.png";
  const sourceImg = product.sourceImage || "/cornone.jpg";

  return (
    <div ref={containerRef} className="bg-[#FEFEF6]">
      <section className="relative min-h-[70svh] w-full overflow-hidden bg-[#0F0A08] flex items-center pt-20 pb-12 sm:pt-28">
        {/* Primary Source Image Background */}
        <div className="absolute inset-0 z-0">
          <img src={sourceImg} alt="Source Background" className="w-full h-full object-cover opacity-50" />
        </div>

        {/* Flat Overlays matching Homepage */}
        <div className="absolute inset-0 bg-black/40 z-0" aria-hidden />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center h-full">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4 sm:mb-8 reveal">
              <p className="font-body text-[12px] sm:text-[16px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#D1BB8A]">
                From Bloodline to Bottle
              </p>
            </div>

            <h1 className="font-heading font-bold text-white leading-[0.9] mb-4 sm:mb-8 reveal reveal-delay-1" style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}>
              <span className="block text-white/40 italic font-light tracking-tight mb-2 text-[clamp(1.8rem,5vw,5rem)]">The</span>
              {product.name}
            </h1>

            <p className="max-w-xl font-body text-[14px] sm:text-[17px] font-light leading-[1.8] text-white/70 mb-8 sm:mb-12 reveal reveal-delay-2">
              {product.subheading}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 reveal reveal-delay-3">
              <Link
                href={product.primaryCta.href}
                className="group flex h-[56px] w-full sm:w-auto sm:min-w-[220px] px-10 items-center justify-center bg-[#D1BB8A] font-body text-[13px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-white hover:scale-[1.02]"
              >
                {product.primaryCta.label}
              </Link>
              <Link
                href={product.secondaryCta.href}
                className="group flex h-[56px] w-full sm:w-auto sm:min-w-[220px] px-10 items-center justify-center border border-white/40 bg-transparent font-body text-[13px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white hover:bg-white/10"
              >
                {product.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-[40vh] sm:h-[50vh] lg:h-[70vh] flex items-center justify-center reveal reveal-delay-2">
            <img
              src={bottleImg}
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-110"
            />
          </div>
        </div>

        {/* Accent Label */}
        <div className="absolute bottom-10 left-6 lg:left-12 pointer-events-none z-10">
          <p className="font-heading text-[clamp(3rem,8vw,6rem)] font-bold text-white/5 leading-none select-none tracking-tighter">
            {accentLabel}
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="mx-auto max-w-[1400px]">
          {/* Featured Content Block */}
          {product.sections.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center mb-32 reveal">
              <div className="lg:col-span-6 relative">
                <div className="aspect-[4/5] bg-[#0F0A08] relative overflow-hidden">
                  <img src={sourceImg} alt="Source Material" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
                  <div className="absolute inset-0 flex items-center justify-center p-12 drop-shadow-2xl">
                    <img src={bottleImg} alt={product.name} className="w-full h-full object-contain scale-110 translate-y-8" />
                  </div>
                </div>
                {/* Decorative Accent */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#D1BB8A] opacity-20 blur-3xl rounded-full" />
              </div>

              <div className="lg:col-span-6">
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-[2px] w-12 bg-[#D1BB8A]" aria-hidden />
                  <p className="font-heading text-[20px] lg:text-[24px] font-bold italic text-[#D1BB8A]">
                    {product.name}
                  </p>
                </div>
                <h2 className="font-heading text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[1.1] text-[#0F0A08] mb-8 italic">
                  {product.sections[0].title}
                </h2>
                <p className="font-body text-[16px] lg:text-[18px] font-light leading-[1.8] text-zinc-600">
                  {product.sections[0].body}
                </p>
              </div>
            </div>
          )}

          {/* Remaining Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16 items-start">
            {product.sections.slice(1).map((section, i) => (
              <div key={i} className="reveal bg-white p-10 lg:p-14 border border-zinc-100 shadow-sm">
                <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-bold italic text-[#0F0A08] mb-6 leading-tight">
                  {section.title}
                </h2>
                {section.body && (
                  <p className="font-body text-[16px] lg:text-[17px] text-zinc-600 font-light leading-[1.8] mb-6">
                    {section.body}
                  </p>
                )}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mb-6 space-y-4">
                    {section.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-4 items-start">
                        <span className="mt-[8px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border border-[#D1BB8A] text-[#D1BB8A]" aria-hidden>
                          <span className="w-1.5 h-1.5 bg-[#D1BB8A] rounded-full" />
                        </span>
                        <span className="font-body text-[16px] lg:text-[17px] text-zinc-600 font-light leading-[1.8]">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.bodyAfter && (
                  <p className="font-body text-[16px] lg:text-[17px] text-zinc-600 font-light leading-[1.8] mb-6">
                    {section.bodyAfter}
                  </p>
                )}
                {section.cta && (
                  <Link
                    href={section.cta.href}
                    className="inline-flex items-center gap-3 font-body text-[12px] font-bold uppercase tracking-[0.2em] text-black hover:text-[#D1BB8A] transition-colors mt-4 group"
                  >
                    {section.cta.label}
                    <span className="w-8 h-[1px] bg-black group-hover:bg-[#D1BB8A] group-hover:w-12 transition-all" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Partners - High Impact Block */}
      <section className="bg-[#0F0A08] py-24 lg:py-32 px-6 lg:px-12 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lady-with-glass.jpg')] opacity-10 mix-blend-overlay object-cover" />
        <div className="mx-auto max-w-[800px] relative z-10">
          <div className="flex items-center justify-center gap-6 mb-8 reveal">
            <span className="h-[2px] w-12 bg-[#D1BB8A]" aria-hidden />
            <p className="font-body text-[12px] font-bold uppercase tracking-[0.4em] text-[#D1BB8A]">
              For Partners
            </p>
            <span className="h-[2px] w-12 bg-[#D1BB8A]" aria-hidden />
          </div>

          <h2 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold italic text-white mb-8 leading-[1.1] reveal reveal-delay-1">
            {product.forPartnersTitle}
          </h2>

          <p className="font-body text-[16px] lg:text-[18px] font-light tracking-wide text-white/60 leading-[1.8] mb-12 reveal reveal-delay-2">
            {product.forPartnersBody}
          </p>

          <div className="reveal reveal-delay-3">
            <Link
              href={product.forPartnersCta.href}
              className="inline-flex h-[56px] min-w-[240px] px-10 items-center justify-center bg-white font-body text-[13px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-[#D1BB8A] hover:scale-[1.02]"
            >
              {product.forPartnersCta.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
