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
                className="w-full px-4 py-3 bg-white border border-zinc-300 rounded font-body text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#9f860e] disabled:opacity-60 transition-colors"
            />
            <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full px-4 py-3 bg-[#C9AF72] text-white uppercase font-body text-[13px] font-semibold tracking-widest rounded hover:bg-[#b89a5e] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {status === "loading" ? "Subscribing…" : status === "success" ? "Subscribed ✓" : "Subscribe"}
            </button>
            {message && (
                <p className={`font-body text-[13px] leading-snug ${status === "success" ? "text-emerald-600" : "text-red-500"}`}>
                    {message}
                </p>
            )}
        </form>
    );
}

export function Footer() {
    return (
        <>
            {/* Join The Legacy CTA */}
            <section className="bg-[#41380E] px-4 py-20 sm:px-6 lg:px-8 text-center text-white">
                <div className="mx-auto max-w-[1400px]">

                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="h-[1px] w-12 bg-[#8C8567]" aria-hidden />
                        <p className="font-heading text-[32px] font-bold italic tracking-wider text-[#A89E74]">
                            Join The Legacy
                        </p>
                        <span className="h-[1px] w-12 bg-[#8C8567]" aria-hidden />
                    </div>

                    <h2 className="font-body text-[20px] sm:text-[26px] font-bold tracking-[0.1em] text-white mt-4 mb-5">
                        Raise A Glass To Heritage <span className="mx-2 text-white/60 font-normal">|</span> Honor Craftsmanship <span className="mx-2 text-white/60 font-normal">|</span> Share The Moment.
                    </h2>

                    <p className="font-body text-[15px] lg:text-[16px] font-medium tracking-[0.05em] text-[#C4C2B4] leading-[1.9] mb-10 max-w-[560px] mx-auto">
                        Cousins Vodka Offers A Gentle Sweetness, Exceptional Smoothness, And A Finish That Lingers With Quiet Authority.
                    </p>

                    <div className="mb-10">
                        <p className="font-heading text-[18px] lg:text-[24px] font-bold italic tracking-wider text-[#C4C2B4]">
                            This Is Not Just Vodka.
                        </p>
                        <p className="font-heading text-[18px] lg:text-[24px] font-bold italic tracking-wider text-white">
                            This Is Cultivated Excellence.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="#explore"
                            className="flex h-[50px] min-w-[220px] px-8 items-center justify-center rounded-full bg-white font-body text-[13px] font-semibold tracking-widest text-[#222222] transition hover:bg-zinc-200"
                        >
                            Explore the Collection
                        </Link>
                        <Link
                            href="/contact"
                            className="flex h-[50px] min-w-[220px] px-8 items-center justify-center rounded-full border border-[#6F6B50]/40 bg-[#5E5B42]/70 font-body text-[13px] font-semibold tracking-widest text-[#C4C2B4] transition hover:bg-[#68644A]"
                        >
                            Request Private Access
                        </Link>
                    </div>
                </div>
            </section>

            {/* Actual Footer */}
            <footer className="bg-[#F5F2E8] px-4 py-14 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[1400px]">

                    {/* Main grid — Brand, Quick Links, Products, Newsletter */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">

                        {/* Col 1 — Brand */}
                        <div className="flex flex-col">
                            <Link href="/" className="mb-5">
                                <img
                                    src="/logo.svg"
                                    alt="Cousins Distillery Ltd."
                                    className="h-[80px] w-auto object-contain object-left"
                                />
                            </Link>
                            <p className="font-body text-[14px] text-zinc-600 leading-[1.8] mb-6">
                                At Cousins Distillery, vodka is not merely distilled — it is cultivated. Crafted through devotion, refined through thirteen stages, and destined for those who recognize true distinction.
                            </p>
                            {/* Social Icons */}
                            <div className="flex gap-3">
                                <Link
                                    href="https://www.facebook.com/share/18Kx2THJ1e/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-500 hover:border-[#9f860e] hover:text-[#9f860e] transition-colors"
                                >
                                    <Facebook size={16} />
                                </Link>
                                <Link
                                    href="https://www.instagram.com/cousinsdistilleryltd?igsh=MXUyY3kzdmg4czZudw=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-500 hover:border-[#9f860e] hover:text-[#9f860e] transition-colors"
                                >
                                    <Instagram size={16} />
                                </Link>
                                <Link
                                    href="https://www.tiktok.com/@cousins.distiller?_r=1&_t=ZS-94drLAaduqK"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="TikTok"
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-500 hover:border-[#9f860e] hover:text-[#9f860e] transition-colors"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Col 2 — Quick Links (match header: Home, About, Company, Contact, Explore) */}
                        <div className="flex flex-col">
                            <h3 className="font-body text-[13px] font-semibold uppercase tracking-widest text-zinc-900 mb-5">
                                Quick Links
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { label: 'Home', href: '/' },
                                    { label: 'About Us', href: '#about' },
                                    { label: 'Company', href: '#company' },
                                    { label: 'Explore', href: '#explore' },
                                    { label: 'Find Us', href: '#visit' },
                                    { label: 'Contact Us', href: '/contact' },
                                ].map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="font-body text-[14px] text-zinc-500 hover:text-[#9f860e] transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 3 — Products */}
                        <div className="flex flex-col">
                            <h3 className="font-body text-[13px] font-semibold uppercase tracking-widest text-zinc-900 mb-5">
                                Products
                            </h3>
                            <ul className="space-y-3">
                                {PRODUCTS.map((product) => (
                                    <li key={product.slug}>
                                        <Link
                                            href={`/${product.slug}`}
                                            className="font-body text-[14px] text-zinc-500 hover:text-[#9f860e] transition-colors"
                                        >
                                            {product.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 4 — Newsletter */}
                        <div className="flex flex-col">
                            <h3 className="font-body text-[13px] font-semibold uppercase tracking-widest text-zinc-900 mb-5">
                                Newsletter
                            </h3>
                            <p className="font-body text-[14px] text-zinc-500 mb-5 leading-[1.7]">
                                Get updates &amp; special announcements.
                            </p>
                            <NewsletterForm />
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-zinc-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                        <p className="font-body text-[12px] text-zinc-400">
                            © All Rights Reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link href="#" className="font-body text-[12px] text-zinc-400 hover:text-[#9f860e] transition-colors">Privacy Policy</Link>
                            <Link href="#" className="font-body text-[12px] text-zinc-400 hover:text-[#9f860e] transition-colors">Terms &amp; Conditions</Link>
                        </div>
                    </div>

                </div>
            </footer>
        </>
    );
}
