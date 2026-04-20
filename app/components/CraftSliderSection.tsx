"use client";

import { useRef, useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import "swiper/css";

const SLIDES = [
  { id: 1, type: "video", url: "/new-media/the-barrels.mp4", label: "The Barrels", sub: "Noble Oak Maturation" },
  { id: 2, type: "video", url: "/new-media/the-mills.mp4", label: "The Mill", sub: "Grain to Gold" },
  { id: 3, type: "video", url: "/new-media/the-stills.mp4", label: "The Stills", sub: "Ethereal Vapor" },
  { id: 4, type: "video", url: "/main-vid.mp4", label: "The Process", sub: "Pure Alchemy" },
];

export function CraftSliderSection() {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = useCallback(() => {
    swiperRef.current?.swiper?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.swiper?.slideNext();
  }, []);

  return (
    <section id="explore" className="bg-black py-20 lg:py-24 overflow-hidden scroll-mt-20">
      
      {/* Immersive Header - Compact */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 mb-10 lg:mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className="h-[1px] w-12 bg-[#D1BB8A]" />
            <p className="font-body text-[11px] font-bold uppercase tracking-[0.4em] text-[#D1BB8A]">
              Gallery of the House
            </p>
          </div>
          <h2 className="font-heading text-[clamp(2.2rem,5.5vw,3.5rem)] font-semibold tracking-[1px] text-white leading-[1.5]">
            The <span className="text-[#D1BB8A]">Collection.</span>
          </h2>
        </div>
        
        {/* Controls - Compact */}
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            className="group flex h-14 w-14 items-center justify-center border border-white/20 transition-colors hover:border-white hover:bg-white/10 text-white"
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M5 12l7-7M5 12l7 7"/></svg>
          </button>
          <button
            onClick={handleNext}
            className="group flex h-14 w-14 items-center justify-center border border-[#D1BB8A] bg-[#D1BB8A] text-black transition-all hover:bg-white"
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M19 12l-7-7M19 12l-7 7"/></svg>
          </button>
        </div>
      </div>

      {/* Slider - Height constrained */}
      <div className="w-full relative px-6 lg:px-12">
        <Swiper
          ref={swiperRef}
          spaceBetween={25}
          slidesPerView={1.2}
          breakpoints={{
            768: { slidesPerView: 2.2 },
            1280: { slidesPerView: 2.8 },
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="!overflow-visible"
        >
          {SLIDES.map((slide, idx) => (
            <SwiperSlide key={slide.id}>
              <div className="group relative aspect-[14/15] lg:max-h-[60vh] w-full overflow-hidden bg-zinc-900 shadow-2xl border border-white/5">
                <video
                  src={slide.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-60 transition-transform duration-[3s] group-hover:scale-110"
                />
                
                <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black via-black/40 to-transparent p-6 lg:p-8 flex flex-col justify-end">
                   <p className="font-body text-[10px] font-bold tracking-[0.3em] uppercase text-[#D1BB8A] mb-2">
                    {slide.sub}
                  </p>
                  <h3 className="font-heading text-[24px] lg:text-[32px] font-bold text-white">
                    {slide.label}
                  </h3>
                </div>

                <span className="absolute top-6 right-6 font-heading text-[20px] font-bold text-white/20">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 mt-12">
        <div className="w-full h-[2px] bg-white/5 relative">
          <div
            className="absolute top-0 left-0 h-full bg-[#D1BB8A] transition-all duration-700 ease-out"
            style={{ width: `${((activeIndex + 1) / SLIDES.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
