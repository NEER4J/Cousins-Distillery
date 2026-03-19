"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { useState, useRef } from "react";
import { subscribeNewsletter } from "@/app/actions/newsletter";
import { PRODUCTS } from "@/lib/products";

function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        const result = await subscribeNewsletter(email);

        if (result.success) {
            setStatus("success");
            setMessage(result.message);
            setEmail("");
        } else {
            setStatus("error");
            setMessage(result.message);
        }
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading" || status === "success"}
                className="w-full px-4 py-3 bg-white border border-zinc-300 font-body text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#9f860e] disabled:opacity-60 transition-colors"
            />
            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-4 h-[50px] bg-[#C9AF72] text-black uppercase font-body text-[13px] font-bold tracking-[0.2em] hover:bg-[#b89a5e] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {status === 'loading' ? 'Joining...' : 'Subscribe'}
            </button>
            {message && (
                <p className={`font-body text-[13px] leading-snug ${status === "success" ? "text-emerald-600" : "text-red-500"}`}>
                    {message}
                </p>
            )}
            <p className="font-body text-[10px] text-zinc-400 mt-2 leading-relaxed opacity-60">
                By subscribing, you agree to our <Link href="/privacy" className="hover:text-[#D1BB8A] underline decoration-zinc-300">Privacy Policy</Link>.
            </p>
        </form>
    );
}

export function Footer() {
    return (
        <>
                   {/* Join The Legacy CTA - Cinematic Moment */}
            <section className="relative px-6 lg:px-12 py-20 lg:py-24 text-center overflow-hidden bg-[#FEFEF6] flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/lady-with-glass.jpg')] opacity-10 scale-105 object-cover mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FEFEF6] via-[#FEFEF6]/80 to-transparent" />
                
                <div className="relative z-10 mx-auto max-w-[1400px]">
                    <div className="flex items-center justify-center gap-6 mb-8">
                        <span className="h-[2px] w-16 bg-[#D1BB8A]" aria-hidden />
                        <p className="font-body text-[12px] font-bold uppercase tracking-[0.4em] text-[#D1BB8A]">
                            Join The Legacy
                        </p>
                        <span className="h-[2px] w-16 bg-[#D1BB8A]" aria-hidden />
                    </div>

                    <h2 className="font-heading text-[clamp(2.2rem,5.5vw,4rem)] font-semibold tracking-[1px] text-zinc-900 mb-8 leading-[1.5]">
                        Raise A Glass To Heritage.<br />
                        <span className="text-[#D1BB8A]">Honor Craftsmanship.</span>
                    </h2>

                    <p className="font-body text-[15px] lg:text-[18px] font-normal tracking-wide text-zinc-600 leading-[1.8] mb-12 max-w-2xl mx-auto">
                        Cousins Vodka offers a gentle sweetness, exceptional smoothness, and a finish that lingers with quiet authority. This is not just vodka. This is cultivated excellence.
                    </p>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="flex h-[56px] w-full sm:w-auto sm:min-w-[240px] px-10 items-center justify-center bg-[#D1BB8A] font-body text-[13px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-white hover:scale-[1.02]"
                            >
                                Shop The Collection
                            </Link>
                            <Link
                                href="/contact"
                                className="group flex h-[56px] w-full sm:w-auto sm:min-w-[240px] px-10 items-center justify-center border border-zinc-900 bg-transparent font-body text-[13px] font-bold uppercase tracking-[0.2em] text-zinc-900 transition-all hover:bg-zinc-900 hover:text-white"
                            >
                                Partner With Us
                            </Link>
                        </div>
                </div>
            </section>

            {/* Actual Footer - Light High Contrast */}
            <footer className="bg-white px-6 lg:px-12 py-20 lg:py-24 border-t border-zinc-200 relative overflow-hidden">
                {/* Oversized Brand Backdrop */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none opacity-[0.03]">
                    <span className="font-heading text-[18vw] font-bold whitespace-nowrap leading-none tracking-tighter text-zinc-900">
                        COUSINS
                    </span>
                </div>

                <div className="relative z-10 mx-auto max-w-[1400px]">

                    {/* Main grid — Brand, Quick Links, Products, Newsletter */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">

                        {/* Col 1 — Brand */}
                        <div className="flex flex-col lg:col-span-4">
                            <Link href="/" className="mb-8">
                                <img
                                    src="/logo.svg"
                                    alt="Cousins Distillery Ltd."
                                    className="h-[60px] w-auto object-contain object-left opacity-90"
                                />
                            </Link>
                            <p className="font-body text-[14px] text-zinc-600 leading-[1.9] font-normal max-w-sm mb-6">
                                At Cousins Distillery, Canadian corn and rye. Mexican tequila. Thirteen stages of unwavering devotion. Distilled from our own farms, crafted by family, destined for those who recognize true distinction.
                            </p>
                            <div className="mb-10 space-y-2">
                                <p className="font-body text-[13px] text-zinc-800 font-medium">Cousins Distillery LTD</p>
                                <p className="font-body text-[13px] text-zinc-600">747 Appleby Line<br />Burlington, ON L7L 2Y6</p>
                                <p className="font-body text-[13px] text-zinc-600">
                                    <a href="mailto:contact@cousinsdistilleryltd.com" className="hover:text-[#D1BB8A] transition-colors">contact@cousinsdistilleryltd.com</a>
                                </p>
                                <p className="font-body text-[13px] text-zinc-600">
                                    <a href="tel:+19055125943" className="hover:text-[#D1BB8A] transition-colors">+1 905 512 5943</a>
                                </p>
                            </div>
                            {/* Social Icons */}
                            <div className="flex gap-4">
                                <Link
                                    href="https://www.facebook.com/share/18Kx2THJ1e/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 text-zinc-500 hover:border-[#D1BB8A] hover:bg-[#D1BB8A] hover:text-white transition-all"
                                >
                                    <Facebook size={18} />
                                </Link>
                                <Link
                                    href="https://www.instagram.com/cousinsdistilleryltd?igsh=MXUyY3kzdmg4czZudw=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 text-zinc-500 hover:border-[#D1BB8A] hover:bg-[#D1BB8A] hover:text-white transition-all"
                                >
                                    <Instagram size={18} />
                                </Link>
                                <Link
                                    href="https://www.tiktok.com/@cousins.distiller?_r=1&_t=ZS-94drLAaduqK"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="TikTok"
                                    className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 text-zinc-500 hover:border-[#D1BB8A] hover:bg-[#D1BB8A] hover:text-white transition-all"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Col 2 — Quick Links */}
                        <div className="flex flex-col lg:col-span-2 lg:col-start-6">
                            <h3 className="font-body text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-8">
                                Quick Links
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    { label: 'Home', href: '/' },
                                    { label: 'About Us', href: '#about' },
                                    { label: 'Company', href: '#company' },
                                    { label: 'Explore', href: '#explore' },
                                    { label: 'Find Us', href: '#visit' },
                                    { label: 'Contact Us', href: '/contact' },
                                ].map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="font-body text-[15px] font-medium tracking-wide text-zinc-900 hover:text-[#D1BB8A] transition-colors inline-block relative group">
                                            {link.label}
                                            <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#D1BB8A] transition-all duration-300 group-hover:w-full" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 3 — Products */}
                        <div className="flex flex-col lg:col-span-2 lg:col-start-8">
                            <h3 className="font-body text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-8">
                                Products
                            </h3>
                            <ul className="space-y-4">
                                {PRODUCTS.map((product) => (
                                    <li key={product.slug}>
                                        <Link
                                            href={`/${product.slug}`}
                                            className="font-body text-[15px] font-medium tracking-wide text-zinc-900 hover:text-[#D1BB8A] transition-colors inline-block relative group"
                                        >
                                            {product.name}
                                            <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#D1BB8A] transition-all duration-300 group-hover:w-full" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 4 — Newsletter */}
                        <div className="flex flex-col lg:col-span-3 lg:col-start-10">
                            <h3 className="font-body text-[11px] font-bold uppercase tracking-[0.3em] text-[#D1BB8A] mb-8">
                                The Inner Circle
                            </h3>
                            <p className="font-body text-[13px] text-zinc-500 mb-6 font-normal leading-relaxed">
                                Join our inner circle for exclusive allocations, event invitations, and distillery news.
                            </p>
                            <NewsletterForm />
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-zinc-200 pt-8 pb-4 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <p className="font-body text-[12px] text-zinc-400 uppercase tracking-widest font-semibold">
                            © 2026 Cousins Distillery Ltd. All rights reserved.
                        </p>
                        <div className="flex gap-8">
                            <Link href="/privacy" className="font-body text-[11px] text-zinc-400 uppercase tracking-widest font-semibold hover:text-[#D1BB8A] transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="font-body text-[11px] text-zinc-400 uppercase tracking-widest font-semibold hover:text-[#D1BB8A] transition-colors">Terms &amp; Conditions</Link>
                        </div>
                    </div>

                </div>
            </footer>
        </>
    );
}
