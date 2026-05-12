"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cousins-age-verified";

export function AgeGate() {
  const [open, setOpen] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    try {
      const verified = sessionStorage.getItem(STORAGE_KEY);
      if (verified !== "true") {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (open || denied) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open, denied]);

  function handleConfirm() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setOpen(false);
  }

  function handleDeny() {
    setDenied(true);
  }

  if (!open && !denied) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" aria-hidden />

      <div className="relative w-full max-w-[480px] bg-[#0c0c0c] border border-[#D1BB8A]/30 px-8 py-12 sm:px-12 sm:py-14 text-center shadow-2xl">
        <div className="flex justify-center mb-8">
          <img
            src="/logo.svg"
            alt="Cousins Distillery Ltd."
            className="h-[60px] w-auto object-contain"
          />
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-[1px] w-10 bg-[#D1BB8A]" aria-hidden />
          <p className="font-body text-[11px] font-bold uppercase tracking-[0.4em] text-[#D1BB8A]">
            Age Verification
          </p>
          <span className="h-[1px] w-10 bg-[#D1BB8A]" aria-hidden />
        </div>

        {!denied ? (
          <>
            <h2
              id="age-gate-title"
              className="font-heading text-[clamp(1.6rem,4vw,2.2rem)] font-semibold tracking-[0.5px] text-white leading-[1.3] mb-6"
            >
              Are You Of Legal<br />Drinking Age?
            </h2>
            <p className="font-body text-[14px] text-white/60 leading-[1.8] mb-10">
              You must be of legal drinking age in your country of residence to enter this site.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={handleConfirm}
                className="flex h-[52px] w-full sm:flex-1 px-8 items-center justify-center bg-[#D1BB8A] font-body text-[12px] font-bold uppercase tracking-[0.25em] text-black transition-all hover:bg-white"
              >
                I Am Of Age
              </button>
              <button
                type="button"
                onClick={handleDeny}
                className="flex h-[52px] w-full sm:flex-1 px-8 items-center justify-center border border-white/30 bg-transparent font-body text-[12px] font-bold uppercase tracking-[0.25em] text-white transition-all hover:bg-white/10"
              >
                I Am Under Age
              </button>
            </div>

            <p className="font-body text-[11px] text-white/40 mt-10 leading-relaxed">
              By entering this site, you accept our{" "}
              <a href="/terms" className="underline hover:text-[#D1BB8A] transition-colors">
                Terms
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline hover:text-[#D1BB8A] transition-colors">
                Privacy Policy
              </a>
              .
            </p>
          </>
        ) : (
          <>
            <h2
              id="age-gate-title"
              className="font-heading text-[clamp(1.6rem,4vw,2.2rem)] font-semibold tracking-[0.5px] text-white leading-[1.3] mb-6"
            >
              We&apos;re Sorry
            </h2>
            <p className="font-body text-[14px] text-white/60 leading-[1.8]">
              You must be of legal drinking age to access this site. Please come back when you are old enough to enjoy our spirits responsibly.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
