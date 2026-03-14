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
        className={`sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md transition-[height,background-color] duration-500 ease-out ${
          scrolled ? "h-20 sm:h-24 shadow-sm" : "h-28 sm:h-36"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 lg:px-12">
          
          {/* Logo */}
          <a href="/" className="relative flex shrink-0 items-center">
            <img
              src="/logo.svg"
              alt="Cousins Distillery Ltd. – Crafting Quality Spirits"
              className={`w-auto object-contain object-left transition-[height,max-width] duration-500 ease-out ${
                scrolled
                  ? "h-[50px] max-w-[170px] sm:h-[60px] sm:max-w-[200px]"
                  : "h-[85px] max-w-[250px] sm:h-[100px] sm:max-w-[280px]"
              }`}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-12">
            <nav className="flex items-center gap-10" aria-label="Main">
              <a href={getHref("/")} className={linkClass}>
                Home
                <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#9f860e] transition-all duration-300 group-hover:w-full" />
              </a>
              
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
                  className={`fixed left-0 right-0 top-[var(--header-height)] w-screen bg-white shadow-2xl transition-all duration-300 ease-out origin-top border-t border-zinc-200 ${
                    productsOpen ? "opacity-100 visible scale-y-100" : "opacity-0 invisible pointer-events-none scale-y-95"
                  }`}
                  style={{ '--header-height': scrolled ? '80px' : '112px' } as any}
                >
                  <div className="mx-auto max-w-[1400px] flex min-h-[450px]">
                    {/* Featured side menu */}
                    <div className="w-1/3 bg-[#0F0A08] p-12 lg:p-16 flex flex-col justify-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/corntwo.jpg')] opacity-20 mix-blend-overlay object-cover" />
                        <div className="relative z-10">
                            <h3 className="font-heading text-[clamp(2rem,3vw,3rem)] italic leading-tight mb-6">
                                The <br/> <span className="text-[#D1BB8A]">House</span> <br/> Classics.
                            </h3>
                            <p className="font-body text-[14px] text-white/60 leading-relaxed font-light max-w-sm">
                                Discover our meticulously categorized expressions of purity, grain, and agave.
                            </p>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="w-2/3 grid grid-cols-2 lg:grid-cols-4 p-8 lg:p-12 gap-6 bg-[#FEFEF6]">
                      {PRODUCTS.map((product) => (
                        <Link
                          key={product.slug}
                          href={`/${product.slug}`}
                          className="group relative flex flex-col justify-end p-6 lg:p-8 border border-transparent hover:border-zinc-200 hover:bg-white bg-transparent transition-all overflow-hidden h-full"
                          onClick={() => setProductsOpen(false)}
                        >
                           {/* Product Image preview - Large */}
                          <div className="absolute inset-x-0 top-0 bottom-[130px] opacity-100 transition-all duration-500 transform group-hover:-translate-y-2 flex items-center justify-center p-6">
                              <img src={product.image || "/bottle in field.png"} alt="" className="max-w-full max-h-full object-contain drop-shadow-2xl" />
                          </div>

                          {/* Bottom text block - flex column, no overlap */}
                          <div className="relative z-10 flex flex-col gap-1">
                            <span className="font-heading text-[22px] font-bold italic text-zinc-900 block group-hover:text-[#9f860e] transition-colors">
                              {product.name}
                            </span>
                            <span className="font-body text-[12px] text-zinc-500 leading-relaxed font-medium line-clamp-2">
                              {product.metaDescription}
                            </span>
                            <span className="font-body text-[11px] font-bold uppercase tracking-widest text-[#9f860e] mt-2 flex items-center gap-2 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                              Explore <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={getHref(link.href)}
                  className={linkClass}
                >
                  {link.label}
                  <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#9f860e] transition-all duration-300 group-hover:w-full" />
                </a>
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
            <span className="font-heading text-[24px] italic text-[#D1BB8A]">Cousins.</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-[#D1BB8A] transition-colors"
              aria-label="Close menu"
            >
              <X size={32} />
            </button>
          </div>

          <nav className="flex flex-col gap-0 px-8 py-10 overflow-y-auto" aria-label="Mobile navigation">
            <a
              href={getHref("/")}
              onClick={() => setMenuOpen(false)}
              className="font-heading text-[32px] italic text-white hover:text-[#D1BB8A] transition-colors py-4 border-b border-white/10"
            >
              Home
            </a>
            
            <div className="border-b border-white/10 py-4">
              <button
                type="button"
                onClick={() => setProductsMobileOpen((o) => !o)}
                className="flex w-full items-center justify-between font-heading text-[32px] italic text-white hover:text-[#D1BB8A] transition-colors"
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
              <a
                key={link.label}
                href={getHref(link.href)}
                onClick={() => setMenuOpen(false)}
                className="font-heading text-[32px] italic text-white hover:text-[#D1BB8A] transition-colors py-4 border-b border-white/10 last:border-0"
              >
                {link.label}
              </a>
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
