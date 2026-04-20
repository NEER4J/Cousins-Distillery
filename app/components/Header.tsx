"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

const NAV_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Company", href: "#company" },
  { label: "Contact Us", href: "/contact" },
];

const SCROLL_THRESHOLD = 24;

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [productsMobileOpen, setProductsMobileOpen] = useState(false);
  const productsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearProductsTimeout = () => {
    if (productsTimeoutRef.current) {
      clearTimeout(productsTimeoutRef.current);
      productsTimeoutRef.current = null;
    }
  };

  const handleProductsEnter = () => {
    clearProductsTimeout();
    setProductsOpen(true);
  };

  const handleProductsLeave = () => {
    productsTimeoutRef.current = setTimeout(() => setProductsOpen(false), 200);
  };

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => () => clearProductsTimeout(), []);

  const getHref = (href: string) => {
    if (href.startsWith("#")) return pathname === "/" ? href : `/${href}`;
    return href;
  };

  const linkClass = "font-body text-[14px] lg:text-[15px] font-bold uppercase tracking-[0.2em] text-zinc-900 hover:text-[#9f860e] transition-colors relative group";
  const ctaClass = "group flex items-center justify-center gap-3 border border-zinc-900 bg-white h-[56px] px-10 font-body text-[13px] font-bold uppercase tracking-[0.2em] text-zinc-900 transition-all hover:bg-zinc-900 hover:text-white";

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/70 backdrop-blur-xl transition-[height,background-color] duration-500 ease-out ${
          scrolled ? "h-20 sm:h-24 shadow-sm" : "h-28 sm:h-36"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 lg:px-12">
          
          {/* Logo */}
          <Link href="/" className="relative flex shrink-0 items-center">
            <img
              src="/logo.svg"
              alt="Cousins Distillery Ltd. – Crafting Quality Spirits"
              className={`w-auto object-contain object-left transition-[height,max-width] duration-500 ease-out ${
                scrolled
                  ? "h-[50px] max-w-[170px] sm:h-[60px] sm:max-w-[200px]"
                  : "h-[85px] max-w-[250px] sm:h-[100px] sm:max-w-[280px]"
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-12">
            <nav className="flex items-center gap-10" aria-label="Main">
              <Link href={getHref("/")} className={linkClass}>
                Home
                <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#9f860e] transition-all duration-300 group-hover:w-full" />
              </Link>
              
              {/* Products Mega Menu */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={handleProductsEnter}
                onMouseLeave={handleProductsLeave}
              >
                <button
                  type="button"
                  className={`${linkClass} flex items-center gap-2 border-0 bg-transparent p-0 cursor-pointer h-full py-10`}
                  aria-expanded={productsOpen}
                  aria-haspopup="true"
                >
                  Collection
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${productsOpen ? "-rotate-180 text-[#9f860e]" : ""}`}
                  />
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-[#9f860e] transition-all duration-300 ${productsOpen ? "w-full" : "w-0"}`} />
                </button>

                {/* Mega Menu Panel - Full Width Modern */}
                <div
                  className={`fixed left-0 right-0 w-screen bg-white shadow-2xl transition-all duration-300 ease-out origin-top border-t border-zinc-200 ${
                    scrolled ? "top-20" : "top-28"
                  } ${
                    productsOpen ? "opacity-100 visible scale-y-100" : "opacity-0 invisible pointer-events-none scale-y-95"
                  }`}
                >
                  <div className="mx-auto max-w-[1400px] w-full bg-[#FEFEF6] p-6 lg:p-8">
                    <div className="grid grid-cols-4 gap-6">
                      {PRODUCTS.map((product) => (
                        <Link
                          key={product.slug}
                          href={`/${product.slug}`}
                          className="group relative flex flex-col p-5 lg:p-6 border border-zinc-200 bg-white overflow-hidden h-full min-h-[280px] transition-all duration-300 ease-out hover:border-zinc-300 hover:shadow-md"
                          onClick={() => setProductsOpen(false)}
                        >
                          <div className="flex-1 min-h-[120px] flex items-center justify-center p-3 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                              <img src={product.image || "/bottle in field.png"} alt="" className="max-w-full max-h-[170px] object-contain drop-shadow-2xl" />
                          </div>

                          <div className="flex flex-col gap-1 mt-3 flex-shrink-0">
                            <span className="font-heading text-[18px] font-bold text-zinc-900 block transition-colors duration-300 group-hover:text-[#9f860e]">
                              {product.name}
                            </span>
                            <span className="font-body text-[11px] font-bold uppercase tracking-widest text-[#9f860e] mt-2 flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-all duration-300">
                              Explore <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={getHref(link.href)}
                  className={linkClass}
                >
                  {link.label}
                  <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#9f860e] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <Link href="/contact" className={ctaClass}>
              <span className="relative z-10">Shop Now</span>
              <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="xl:hidden flex items-center justify-center p-3 text-zinc-900 hover:text-[#9f860e] transition-colors"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={32} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${menuOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 h-full w-[85vw] max-w-[400px] bg-[#0F0A08] flex flex-col transition-transform duration-500 ease-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-8 py-8 border-b border-white/10">
            <span className="font-heading text-[24px] font-bold text-[#D1BB8A]">Cousins.</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-[#D1BB8A] transition-colors"
              aria-label="Close menu"
            >
              <X size={32} />
            </button>
          </div>

          <nav className="flex flex-col gap-0 px-8 py-10 overflow-y-auto" aria-label="Mobile navigation">
            <Link
              href={getHref("/")}
              onClick={() => setMenuOpen(false)}
              className="font-heading text-[32px] font-bold text-white hover:text-[#D1BB8A] transition-colors py-4 border-b border-white/10"
            >
              Home
            </Link>
            
            <div className="border-b border-white/10 py-4">
              <button
                type="button"
                onClick={() => setProductsMobileOpen((o) => !o)}
                className="flex w-full items-center justify-between font-heading text-[32px] font-bold text-white hover:text-[#D1BB8A] transition-colors"
              >
                Collection
                <ChevronDown
                  size={24}
                  className={`transition-transform duration-300 ${productsMobileOpen ? "rotate-180 text-[#D1BB8A]" : ""}`}
                />
              </button>
              
              <div
                className={`flex flex-col gap-4 overflow-hidden transition-all duration-500 ease-in-out ${productsMobileOpen ? "max-h-[500px] mt-6 opacity-100" : "max-h-0 opacity-0"}`}
              >
                {PRODUCTS.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/${product.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4 group"
                  >
                     <div className="w-10 h-14 bg-white/5 flex items-center justify-center p-1 overflow-hidden">
                        <img src={product.image || "/bottle in field.png"} alt="" className="w-full h-full object-contain mix-blend-screen opacity-100 group-hover:scale-110 transition-all" />
                     </div>
                     <span className="font-body text-[14px] font-bold uppercase tracking-[0.2em] text-[#D1BB8A]/70 group-hover:text-[#D1BB8A] transition-colors">
                      {product.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={getHref(link.href)}
                onClick={() => setMenuOpen(false)}
                className="font-heading text-[32px] font-bold text-white hover:text-[#D1BB8A] transition-colors py-4 border-b border-white/10 last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="px-8 mt-auto pb-12 pt-6">
            <Link
              href="/contact"
              className="flex w-full items-center justify-center border border-[#D1BB8A] bg-[#D1BB8A] h-[56px] px-10 font-body text-[13px] font-bold uppercase tracking-[0.2em] text-black hover:bg-white transition-all"
              onClick={() => setMenuOpen(false)}
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
