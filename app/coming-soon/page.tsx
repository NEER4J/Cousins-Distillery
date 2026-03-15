"use client";

import { useState } from "react";
import Link from "next/link";
import { Send } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";

export default function ComingSoonPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function handleSubscribe(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        // Reusing the existing contact action for the newsletter signup
        const result = await submitContactForm({
            name: "Newsletter Subscriber",
            email: email,
            subject: "Newsletter Subscription (Coming Soon)",
            message: "I want to be notified when the site launches.",
        });

        if (result.success) {
            setStatus("success");
            setMessage("Thank you. You will be the first to know.");
            setEmail("");
        } else {
            setStatus("error");
            setMessage("Something went wrong. Please try again.");
        }
    }

    return (
        <main className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-[#0F0A08]">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/agave.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 animate-[pulse_10s_ease-in-out_infinite]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A08] via-[#0F0A08]/80 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0F0A08_100%)] opacity-80" />
            </div>

            {/* Header / Logo (Absolute Positioning) */}
            <header className="absolute top-0 left-0 right-0 z-20 w-full p-6 lg:p-12 flex justify-center lg:justify-start pointer-events-none">
                <div className="flex items-center gap-4">
                    <img src="/logo.svg" alt="Cousins Distillery" className="h-32 sm:h-36 w-auto invert brightness-0 pointer-events-auto" />
                </div>
            </header>

            {/* Main Content */}
            <section className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col justify-center">
                <div className="max-w-[800px]">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="h-[2px] w-12 bg-[#D1BB8A]" aria-hidden />
                        <p className="font-body text-[12px] sm:text-[14px] font-bold uppercase tracking-[0.4em] text-[#D1BB8A]">
                            Under Construction
                        </p>
                    </div>

                    <h1 className="font-heading text-[clamp(3.5rem,8vw,6.5rem)] font-bold text-white leading-[0.9] italic tracking-tight mb-6 mt-4">
                        Cultivating <br />
                        <span className="text-white/40">Something Special.</span>
                    </h1>

                    <p className="font-body text-[16px] sm:text-[18px] font-light leading-[1.8] text-white/70 max-w-2xl mb-12">
                        We are currently refining our digital experience. From bloodline to bottle, great things take time. Join our inner circle to be notified the moment we launch.
                    </p>

                    {/* Newsletter Form */}
                    <div className="max-w-[500px]">
                        {status === "success" ? (
                            <div className="border border-[#D1BB8A]/30 bg-[#D1BB8A]/10 p-6 flex flex-col items-center justify-center text-center">
                                <p className="font-heading text-[24px] italic text-[#D1BB8A] mb-2">Welcome to the inner circle.</p>
                                <p className="font-body text-[14px] text-white/70 font-light">{message}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="relative group">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    disabled={status === "loading"}
                                    className="w-full h-[60px] bg-transparent border-b-2 border-white/20 font-body text-[16px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#D1BB8A] transition-colors pr-16 rounded-none disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center text-white/60 hover:text-[#D1BB8A] transition-colors disabled:opacity-50"
                                    aria-label="Subscribe"
                                >
                                    {status === "loading" ? (
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-[#D1BB8A] rounded-full animate-spin" />
                                    ) : (
                                        <Send size={20} className="transform -rotate-45" />
                                    )}
                                </button>
                                {status === "error" && (
                                    <p className="absolute -bottom-8 left-0 font-body text-[13px] text-red-500">{message}</p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="absolute bottom-0 left-0 right-0 z-20 w-full p-6 lg:p-12 border-t border-white/5 flex flex-col items-center justify-center gap-4 bg-gradient-to-t from-[#0F0A08] to-transparent">
                <div className="flex gap-6">
                    <a href="#" className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-[#D1BB8A] transition-colors">Instagram</a>
                    <a href="#" className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-[#D1BB8A] transition-colors">Facebook</a>
                </div>
            </footer>
        </main>
    );
}
