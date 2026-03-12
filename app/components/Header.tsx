"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#about" },
  { label: "Company", href: "#company" },
  { label: "Contact Us", href: "/contact" },
];

const SCROLL_THRESHOLD = 24;

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shrink header after user scrolls
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    handleScroll(); // run once for SSR/hydration
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Use full page URL for hash links when not on home (so browser shows spinner and navigation works)
  const getHref = (href: string) => {
    if (href.startsWith("#")) return pathname === "/" ? href : `/${href}`;
    return href;
  };

  const linkClass = "font-body text-sm font-medium uppercase tracking-[0.18em] text-zinc-800 hover:text-[#9f860e] transition-colors";
  const ctaClass = "rounded-full bg-[#D1BB8A] px-7 py-3 font-body text-[13px] font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90";

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b border-zinc-200 bg-white transition-[height] duration-300 ease-out ${
          scrolled ? "h-20" : "h-28 sm:h-32"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo — native anchor so navigation shows browser spinner */}
          <a href="/" className="relative flex shrink-0 items-center">
            <img
              src="/logo.svg"
              alt="Cousins Distillery Ltd. – Crafting Quality Spirits"
              className={`w-auto object-contain object-left transition-[height,max-width] duration-300 ease-out ${
                scrolled
                  ? "h-[52px] max-w-[180px] sm:h-[56px] sm:max-w-[200px]"
                  : "h-[88px] max-w-[260px] sm:h-[96px] sm:max-w-[280px]"
              }`}
            />
          </a>

          {/* Desktop: Nav + CTA on right */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-8" aria-label="Main">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={getHref(link.href)}
                  className={linkClass}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href={getHref("#visit")}
              className={ctaClass}
            >
              Find Us
            </a>
          </div>

          {/* Mobile: hamburger */}
          <button
            className="lg:hidden flex items-center justify-center p-2 text-zinc-800 hover:text-[#9f860e] transition-colors"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${menuOpen ? "visible" : "invisible"}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Slide-in panel from right */}
        <div
          className={`absolute top-0 right-0 h-full w-[300px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
            <img
              src="/logo.svg"
              alt="Cousins Distillery"
              className="h-[48px] w-auto object-contain"
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-zinc-500 hover:text-zinc-900 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav links — native anchors so navigation shows browser spinner */}
          <nav className="flex flex-col gap-1 px-6 py-8" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={getHref(link.href)}
                onClick={() => setMenuOpen(false)}
                className="font-body text-[15px] font-medium uppercase tracking-[0.18em] text-zinc-800 hover:text-[#9f860e] transition-colors py-3 border-b border-zinc-100 last:border-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA at bottom */}
          <div className="px-6 mt-auto pb-10">
            <a
              href={getHref("#visit")}
              onClick={() => setMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-[#D1BB8A] px-7 py-3.5 font-body text-[13px] font-semibold uppercase tracking-wider text-white hover:opacity-90 transition-opacity"
            >
              Find Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
