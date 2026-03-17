"use client";

import { useState } from "react";
import Link from "next/link";
import { submitContactForm } from "@/app/actions/contact";
import { Send } from "lucide-react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

const SUBJECTS = [
    "General Inquiry",
    "Private Events & Tastings",
    "Wholesale & Distribution",
    "Press & Media",
    "Partnership Opportunities",
    "Other",
];

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: SUBJECTS[0],
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [responseMessage, setResponseMessage] = useState("");

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");
        setResponseMessage("");

        const result = await submitContactForm(form);

        if (result.success) {
            setStatus("success");
            setResponseMessage(result.message);
            setForm({ name: "", email: "", subject: SUBJECTS[0], message: "" });
        } else {
            setStatus("error");
            setResponseMessage(result.message);
        }
    }

    return (
        <div className="min-h-screen bg-[#F9F8F3]">
            <Header />

            {/* Hero Banner - Dark & Dramatic */}
            <section className="relative bg-[#0F0A08] pt-24 pb-20 lg:pt-32 lg:pb-24 px-6 lg:px-12 text-center flex flex-col items-center overflow-hidden">
            {/* Hero Background */}
                <img src="/cornone.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                
                <div className="relative z-10 mx-auto max-w-[1000px]">
                    <div className="flex items-center justify-center gap-6 mb-8">
                        <span className="h-[2px] w-16 bg-[#D1BB8A]" aria-hidden />
                        <p className="font-body text-[11px] font-bold uppercase tracking-[0.4em] text-[#D1BB8A]">
                            Get In Touch
                        </p>
                        <span className="h-[2px] w-16 bg-[#D1BB8A]" aria-hidden />
                    </div>
                    
                    <h1 className="font-heading text-[clamp(4rem,10vw,8rem)] font-bold tracking-tight leading-[1.2] text-white mb-8">
                        Get In <span className="text-[#D1BB8A] block">Touch.</span>
                    </h1>
                    
                    <p className="font-body text-[15px] lg:text-[18px] font-normal leading-[1.8] text-white/70 max-w-2xl mx-auto">
                        Whether you&apos;re inquiring about our exclusive collections, interested in private events, or seeking a partnership — we invite you to connect with our team.
                    </p>
                </div>

                {/* Decorative Accent Label */}
                <div className="absolute bottom-10 left-6 lg:left-12 pointer-events-none z-10 opacity-30">
                    <p className="font-heading text-[clamp(3rem,8vw,6rem)] font-bold text-white/5 leading-none select-none tracking-tighter">
                        COUSINS
                    </p>
                </div>
            </section>

            {/* Main Content — Asymmetric Form Layout */}
            <section className="py-20 lg:py-24 px-6 lg:px-12 bg-[#FEFEF6] relative">
                <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-start">
                    
                    {/* Left Column Text/Graphics */}
                    <div className="lg:col-span-5 flex flex-col justify-start">
                        <h2 className="font-heading text-[clamp(2.2rem,4.5vw,3.5rem)] font-semibold tracking-[1px] text-zinc-900 leading-[1.5] mb-8">
                            We value every <br/> conversation.
                        </h2>
                        <p className="font-body text-[15px] lg:text-[18px] font-normal leading-[1.8] text-zinc-600 mb-12 max-w-md">
                            We aim to respond to all inquiries within 1-2 business days. For immediate assistance regarding an existing order, please include your order number.
                        </p>
                        
                        <div className="border-t border-zinc-200 pt-10 space-y-8">
                            <div>
                                <h3 className="font-body text-[11px] font-bold uppercase tracking-[0.3em] text-[#D1BB8A] mb-3">Distillery Location</h3>
                                <p className="font-body text-[15px] text-zinc-800 font-medium">123 Heritage Way,<br/>Craft District, CA 90210</p>
                            </div>
                            <div>
                                <h3 className="font-body text-[11px] font-bold uppercase tracking-[0.3em] text-[#D1BB8A] mb-3">Direct Inquiries</h3>
                                <p className="font-body text-[15px] text-zinc-800 font-medium">info@cousinsdistillery.com<br/>+1 (555) 123-4567</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column Form */}
                    <div className="lg:col-span-7 lg:col-start-6">
                        <div className="bg-white border border-zinc-200 shadow-xl p-6 sm:p-8 lg:p-12 relative overflow-hidden">
                            {/* Decorative Line */}
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#D1BB8A] to-[#0F0A08]" />

                            {status === "success" ? (
                                <div className="flex flex-col items-center justify-center text-center py-20 gap-8">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#D1BB8A] text-[#D1BB8A]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    </div>
                                    <h2 className="font-heading text-[36px] font-semibold tracking-[1px] text-zinc-900">
                                        Message Sent.
                                    </h2>
                                    <p className="font-body text-[16px] text-zinc-600 max-w-[400px] leading-[1.8] font-light">
                                        {responseMessage}
                                    </p>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="mt-6 flex h-[56px] px-10 items-center justify-center border border-zinc-900 font-body text-[13px] font-bold uppercase tracking-[0.2em] text-zinc-900 transition-all hover:bg-zinc-900 hover:text-white"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-10">
                                        <h2 className="font-heading text-[28px] font-semibold tracking-[1px] text-[#0F0A08] mb-2">
                                            Send a message
                                        </h2>
                                        <p className="font-body text-[14px] text-zinc-500 font-light">
                                            All fields marked with an asterisk (*) are required.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                        {/* Name + Email */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="name" className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900">
                                                    Full Name *
                                                </label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Your name"
                                                    disabled={status === "loading"}
                                                    className="w-full px-5 py-4 bg-transparent border-b-2 border-zinc-200 font-body text-[15px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#0F0A08] transition-colors disabled:opacity-60 rounded-none"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="email" className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900">
                                                    Email Address *
                                                </label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="you@example.com"
                                                    disabled={status === "loading"}
                                                    className="w-full px-5 py-4 bg-transparent border-b-2 border-zinc-200 font-body text-[15px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#0F0A08] transition-colors disabled:opacity-60 rounded-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Subject */}
                                        <div className="flex flex-col gap-2 mt-4">
                                            <label htmlFor="subject" className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900">
                                                Inquiry Type *
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={form.subject}
                                                onChange={handleChange}
                                                disabled={status === "loading"}
                                                className="w-full px-5 py-4 bg-transparent border-b-2 border-zinc-200 font-body text-[15px] text-zinc-900 focus:outline-none focus:border-[#0F0A08] transition-colors disabled:opacity-60 rounded-none cursor-pointer appearance-none"
                                            >
                                                {SUBJECTS.map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Message */}
                                        <div className="flex flex-col gap-2 mt-4">
                                            <label htmlFor="message" className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900">
                                                Message *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={5}
                                                value={form.message}
                                                onChange={handleChange}
                                                required
                                                placeholder="Please provide details..."
                                                disabled={status === "loading"}
                                                className="w-full px-5 py-4 bg-transparent border-2 border-zinc-200 font-body text-[15px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#0F0A08] transition-colors resize-none disabled:opacity-60 rounded-none mt-2"
                                            />
                                        </div>

                                        {/* Error message */}
                                        {status === "error" && responseMessage && (
                                            <p className="font-body text-[13px] text-red-500 mt-2">
                                                {responseMessage}
                                            </p>
                                        )}

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={status === "loading"}
                                            className="group flex items-center justify-center gap-4 w-full h-[56px] bg-[#0F0A08] text-white font-body text-[13px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-[#D1BB8A] hover:text-black disabled:opacity-60 disabled:cursor-not-allowed mt-6"
                                        >
                                            {status === "loading" ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                    Sending…
                                                </>
                                            ) : (
                                                <>
                                                    Submit Inquiry
                                                    <Send size={16} className="transition-transform group-hover:translate-x-1" />
                                                </>
                                            )}
                                        </button>
                                        <p className="font-body text-[11px] text-zinc-400 mt-4 leading-relaxed text-center opacity-70">
                                            By submitting, you agree to our <Link href="/privacy" className="hover:text-[#0F0A08] underline decoration-zinc-200">Privacy Policy</Link> and <Link href="/terms" className="hover:text-[#0F0A08] underline decoration-zinc-200">Terms</Link>.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
