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

// Helper to render title with italics based on `*text*` markers
function renderTitle(title: string) {
  const parts = title.split("*");
  if (parts.length === 1) return title;
  return (
    <>
      {parts[0]}
      <span className="block sm:inline">{parts[1]}</span>
      {parts[2]}
    </>
  );
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
      <section className="relative min-h-[75svh] w-full overflow-hidden bg-[#0F0A08] flex items-center pt-24 pb-20 lg:pt-32 lg:pb-24">
        {/* Primary Source Image Background */}
        <div className="absolute inset-0 z-0">
          <img src={sourceImg} alt="Source Background" className="w-full h-full object-cover opacity-50" />
        </div>

        {/* Flat Overlays matching Homepage */}
        <div className="absolute inset-0 bg-black/60 z-0" aria-hidden />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center h-full">
          <div className="lg:col-span-7 flex flex-col justify-center">
            {product.eyebrow && (
              <div className="inline-block border border-[#AA921E]/30 font-body text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#AA921E] px-4 py-2 mb-6 w-max reveal drop-shadow-sm">
                {product.eyebrow}
              </div>
            )}



            <h1 className="font-heading font-bold text-white leading-[0.9] mb-4 reveal reveal-delay-1" style={{ fontSize: "clamp(3.5rem, 8vw, 5.5rem)" }}>
              {product.headline}
            </h1>

            {product.subtitle && (
              <p className="font-body text-[1rem] sm:text-[1.25rem] font-bold text-[#AA921E] mb-6 reveal reveal-delay-2 drop-shadow-md">
                {product.subtitle}
              </p>
            )}

            <div className="max-w-3xl font-body text-[15px] sm:text-[18px] font-normal leading-[1.8] text-white/95 mb-10 reveal reveal-delay-2 whitespace-pre-wrap drop-shadow-md">
              {product.subheading}
            </div>

            {product.stats && product.stats.length > 0 && (
              <div className="flex flex-wrap border-t border-[#AA921E]/20 pt-6 mt-4 gap-y-6 reveal reveal-delay-3 w-full">
                {product.stats.map((stat, i) => (
                  <div key={i} className={`flex-1 min-w-[120px] px-2 sm:px-6 ${i !== 0 ? 'border-l border-[#AA921E]/20' : 'pl-0'}`}>
                    <div className="font-body text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-white/70 mb-1 sm:mb-2 drop-shadow-sm">{stat.label}</div>
                    <div className="font-heading text-[18px] sm:text-[22px] text-white font-bold">{stat.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Primary/Secondary CTA removed from HTML ref, but we keep them here below stats for continuity if needed, or hide if not explicitly required by new design. We'll leave them hidden to match the HTML strictly, HTML has no CTA here except scroll/back */}
          </div>

          <div className="lg:col-span-5 relative h-[50vh] sm:h-[60vh] lg:h-[80vh] flex items-center justify-center reveal reveal-delay-2">
            <img
              src={bottleImg}
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-[1.15]"
            />
          </div>
        </div>

        {/* Accent Label */}
        <div className="absolute bottom-10 left-6 lg:left-12 pointer-events-none z-10 hidden lg:block">
          <p className="font-heading text-[clamp(4rem,9vw,8rem)] font-bold text-white/5 leading-none select-none tracking-tighter">
            {accentLabel}
          </p>
        </div>
      </section>

      {/* Story Sections */}
      {product.storySections && product.storySections.length > 0 && (
        <section className="bg-[#1C1A14] py-20 lg:py-24 px-6 lg:px-12 relative">
          <div className="mx-auto max-w-[1300px] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {product.storySections.map((section, idx) => (
              <div key={idx} className={`reveal ${idx > 0 ? "reveal-delay-1" : ""}`}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-[1px] w-8 bg-[#AA921E]" aria-hidden />
                  <p className="font-body text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#AA921E]">
                    {section.label}
                  </p>
                </div>
                <h2 className="font-heading text-[clamp(2.2rem,4vw,3.5rem)] text-white mb-8 leading-[1.1]">
                  {renderTitle(section.title)}
                </h2>
                <div className="space-y-6">
                  {section.body.map((para, i) => (
                    <p key={i} className="font-body text-[16px] xl:text-[18px] font-normal leading-[1.9] tracking-[0.03em] text-[#A09C96]">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Varieties (e.g. Tequila Expressions) */}
      {product.varieties && product.varieties.length > 0 && (
        <section className="bg-[#13110C] py-20 lg:py-24 px-6 lg:px-12 relative overflow-hidden">
          <div className="mx-auto max-w-[1300px]">
            <div className="flex items-center gap-4 mb-4 reveal">
              <span className="h-[1px] w-8 bg-[#AA921E]" aria-hidden />
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.3em] text-[#AA921E]">
                Three Expressions
              </p>
            </div>
            <h2 className="font-heading text-[clamp(2.5rem,5vw,3.5rem)] text-white mb-16 leading-[1.1] reveal">
              One agave.<br /><span className="block mt-2 text-[#AA921E]">Three remarkable chapters.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#AA921E]/10 reveal reveal-delay-1">
              {product.varieties.map((v, i) => (
                <div key={i} className="group bg-[#1a1813] p-10 lg:p-12 relative flex flex-col transition-colors hover:bg-[#201e18]">
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#AA921E] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />

                  <div className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#AA921E] mb-6">
                    {v.number}
                  </div>

                  <div className="self-start inline-block font-body text-[10px] font-medium uppercase tracking-[0.2em] text-white border border-[#AA921E]/30 px-3 py-1.5 mb-6">
                    {v.subtitle}
                  </div>

                  <h3 className="font-heading font-bold text-[28px] lg:text-[32px] text-white tracking-[0.02em] mb-2">{v.name}</h3>
                  <div className="font-body text-[16px] text-[#A09C96] mb-8">{v.type}</div>

                  <div className="font-body text-[14px] lg:text-[15px] font-normal leading-[1.8] text-[#A09C96] flex-1 mb-8 space-y-4">
                    {v.body.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>

                  {(v.idealForHeader || v.idealForBody) && (
                    <div className="mt-auto border-t border-[#AA921E]/20 pt-6">
                      <div className="font-body text-[10px] uppercase font-bold tracking-[0.2em] text-[#AA921E] mb-3">{v.idealForHeader}</div>
                      <p className="font-body text-[13px] font-normal leading-[1.7] text-[#A09C96]">{v.idealForBody}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tasting Notes */}
      {product.tastingNotes && (
        <section className="bg-[#1C1A14] py-20 lg:py-24 px-6 lg:px-12 relative">
          <div className="mx-auto max-w-[1300px]">
            <div className="flex items-center gap-4 mb-4 reveal">
              <span className="h-[1px] w-8 bg-[#AA921E]" aria-hidden />
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.3em] text-[#AA921E]">
                {product.tastingNotes.label}
              </p>
            </div>
            <h2 className="font-heading text-[clamp(2.5rem,5vw,3.5rem)] text-white mb-16 leading-[1.1] reveal">
              {renderTitle(product.tastingNotes.title)}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#AA921E]/10 reveal reveal-delay-1">
              {product.tastingNotes.notes.map((note, i) => (
                <div key={i} className="bg-[#1a1813] p-10 lg:p-12 flex flex-col">
                  <div className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#AA921E] mb-4">
                    {note.type}
                  </div>
                  <h3 className="font-heading font-medium text-[26px] lg:text-[28px] text-white mb-6">
                    {note.title}
                  </h3>
                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {note.tags.map((tag, idx) => (
                        <span key={idx} className="font-body text-[10px] font-medium tracking-[0.1em] text-[#AA921E] border border-[#AA921E]/30 px-3 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="font-body text-[15px] lg:text-[16px] font-normal leading-[1.8] tracking-[0.02em] text-[#A09C96] flex-1">
                    {note.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


    </div>
  );
}
