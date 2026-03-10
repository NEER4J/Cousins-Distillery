"use client";

import { useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SLIDES = [
  { id: 1, type: "video", url: "main-vid.mp4" }, // The Barrels
  { id: 2, type: "video", url: "main-vid.mp4" }, // The Mill
  { id: 3, type: "video", url: "main-vid.mp4" }, // The Stills
  { id: 4, type: "video", url: "main-vid.mp4" }, // The Process
];

export function CraftSliderSection() {
  const swiperRef = useRef<any>(null);

  const handlePrev = useCallback(() => {
    swiperRef.current?.swiper?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.swiper?.slideNext();
  }, []);

  return (
    <section className="bg-[#FEFEF6] py-8 overflow-hidden">
      <div className="w-full">
        <Swiper
          ref={swiperRef}
          spaceBetween={10}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
          className=""
        >
          {SLIDES.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="group relative aspect-[8/9] w-full overflow-hidden bg-zinc-800">
                <video src={slide.url} autoPlay loop muted playsInline className="w-full h-full object-cover mix-blend-multiply opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <button
                    type="button"
                    className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#E5E5E5]/90 text-[#333333] transition-all shadow-md hover:bg-white"
                    aria-label="Play Video"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-2">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex justify-end gap-10">
          <button
            type="button"
            onClick={handlePrev}
            className="flex items-center justify-center text-[#9f860e] transition-opacity hover:opacity-70"
            aria-label="Previous slide"
          >
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M40 12H2M2 12L12 2M2 12L12 22" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center justify-center text-[#9f860e] transition-opacity hover:opacity-70"
            aria-label="Next slide"
          >
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M0 12H38M38 12L28 2M38 12L28 22" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
