"use client";

import { useState } from "react";
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

            {/* Hero Banner */}
            <section className="bg-[#41380E] py-20 px-4 sm:px-6 lg:px-8 text-center">
                <div className="mx-auto max-w-[760px]">
                    <div className="flex items-center justify-center gap-4 mb-5">
                        <span className="h-[1px] w-10 bg-[#8C8567]" aria-hidden />
                        <p className="font-heading text-[15px] font-medium italic tracking-[0.2em] text-[#A89E74] uppercase">
                            Get In Touch
                        </p>
                        <span className="h-[1px] w-10 bg-[#8C8567]" aria-hidden />
                    </div>
                    <h1 className="font-heading text-[48px] sm:text-[64px] font-bold italic tracking-tight leading-[1.0] text-white mb-5">
                        Contact Us
                    </h1>
                    <p className="font-body text-[15px] sm:text-[17px] text-[#C4C2B4] leading-[1.9] max-w-[520px] mx-auto">
                        Whether you&rsquo;re curious about our spirits, interested in private events, or seeking a partnership — we&rsquo;d love to hear from you.
                    </p>
                </div>
            </section>

            {/* Main Content — Form only */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[640px]">
                    <div className="bg-white rounded-2xl border border-zinc-200 p-8 sm:p-10">
                                {status === "success" ? (
                                    <div className="flex flex-col items-center justify-center text-center py-12 gap-6">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        <h2 className="font-heading text-[30px] font-bold italic text-[#222222]">
                                            Message Sent!
                                        </h2>
                                        <p className="font-body text-[15px] text-zinc-600 max-w-[380px] leading-[1.8]">
                                            {responseMessage}
                                        </p>
                                        <button
                                            onClick={() => setStatus("idle")}
                                            className="mt-2 font-body text-[13px] font-semibold uppercase tracking-widest text-[#9f860e] hover:text-[#7a6a0c] transition-colors"
                                        >
                                            Send another message →
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-8">
                                            <h2 className="font-heading text-[28px] font-bold italic text-[#222222] mb-1">
                                                Send us a message
                                            </h2>
                                            <p className="font-body text-[14px] text-zinc-500">
                                                We&rsquo;ll get back to you within 1–2 business days.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                            {/* Name + Email */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div className="flex flex-col gap-1.5">
                                                    <label htmlFor="name" className="font-body text-[12px] font-semibold uppercase tracking-widest text-zinc-500">
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
                                                        className="w-full px-4 py-3 bg-[#F9F8F3] border border-zinc-200 rounded-lg font-body text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#9f860e] focus:bg-white transition disabled:opacity-60"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <label htmlFor="email" className="font-body text-[12px] font-semibold uppercase tracking-widest text-zinc-500">
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
                                                        className="w-full px-4 py-3 bg-[#F9F8F3] border border-zinc-200 rounded-lg font-body text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#9f860e] focus:bg-white transition disabled:opacity-60"
                                                    />
                                                </div>
                                            </div>

                                            {/* Subject */}
                                            <div className="flex flex-col gap-1.5">
                                                <label htmlFor="subject" className="font-body text-[12px] font-semibold uppercase tracking-widest text-zinc-500">
                                                    Subject *
                                                </label>
                                                <select
                                                    id="subject"
                                                    name="subject"
                                                    value={form.subject}
                                                    onChange={handleChange}
                                                    disabled={status === "loading"}
                                                    className="w-full px-4 py-3 bg-[#F9F8F3] border border-zinc-200 rounded-lg font-body text-[14px] text-zinc-900 focus:outline-none focus:border-[#9f860e] focus:bg-white transition disabled:opacity-60 appearance-none cursor-pointer"
                                                >
                                                    {SUBJECTS.map((s) => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Message */}
                                            <div className="flex flex-col gap-1.5">
                                                <label htmlFor="message" className="font-body text-[12px] font-semibold uppercase tracking-widest text-zinc-500">
                                                    Message *
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    rows={6}
                                                    value={form.message}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Tell us how we can help…"
                                                    disabled={status === "loading"}
                                                    className="w-full px-4 py-3 bg-[#F9F8F3] border border-zinc-200 rounded-lg font-body text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#9f860e] focus:bg-white transition resize-none disabled:opacity-60"
                                                />
                                            </div>

                                            {/* Error message */}
                                            {status === "error" && responseMessage && (
                                                <p className="font-body text-[13px] text-red-500">
                                                    {responseMessage}
                                                </p>
                                            )}

                                            {/* Submit */}
                                            <button
                                                type="submit"
                                                disabled={status === "loading"}
                                                className="flex items-center justify-center gap-2 w-full h-[52px] bg-[#41380E] text-white font-body text-[13px] font-semibold uppercase tracking-widest rounded-lg hover:bg-[#332d0b] transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                                            >
                                                {status === "loading" ? (
                                                    <>
                                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                        </svg>
                                                        Sending…
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send size={15} />
                                                        Send Message
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </>
                                )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
