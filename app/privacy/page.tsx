"use client";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { useEffect, useRef } from "react";

function useScrollReveal(ref: React.RefObject<HTMLElement | null>) {
    useEffect(() => {
        const container = ref.current;
        if (!container) return;
        const elements = container.querySelectorAll(".reveal");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [ref]);
}

export default function PrivacyPolicy() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <main className="min-h-screen bg-[#FEFEF6]">
            <Header />

            {/* Hero / Header Section */}
            <section className="relative bg-[#0F0A08] pt-24 pb-20 lg:pt-32 lg:pb-24 px-6 lg:px-12 text-center overflow-hidden">
                <img src="/cornone.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A08] via-transparent to-transparent" />
                
                <div className="relative z-10 mx-auto max-w-4xl">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="h-[1px] w-8 bg-[#D1BB8A]" />
                        <p className="font-body text-[11px] font-bold uppercase tracking-[0.4em] text-[#D1BB8A]">
                            Legal
                        </p>
                        <span className="h-[1px] w-8 bg-[#D1BB8A]" />
                    </div>
                    <h1 className="font-heading text-[clamp(2.5rem,7vw,5rem)] font-bold text-white tracking-tight leading-[1.1]">
                        Privacy <span className="text-[#D1BB8A]">Policy.</span>
                    </h1>
                </div>
            </section>

            {/* Content Section */}
            <section ref={sectionRef} className="py-20 lg:py-24 px-6 lg:px-12 max-w-4xl mx-auto">
                <div className="space-y-16 reveal reveal-delay-2">
                    
                    <div className="space-y-6">
                        <h2 className="font-heading text-[28px] lg:text-[32px] font-bold text-zinc-900">
                            1. Introduction
                        </h2>
                        <p className="font-body text-[16px] lg:text-[18px] font-light leading-[1.8] text-zinc-700">
                            At Cousins Distillery Ltd., we are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal data when you visit our website or interact with our services.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="font-heading text-[28px] lg:text-[32px] font-bold text-zinc-900">
                            2. Data Collection
                        </h2>
                        <p className="font-body text-[16px] lg:text-[18px] font-light leading-[1.8] text-zinc-700">
                            We may collect and process the following data:
                        </p>
                        <ul className="list-none space-y-4">
                            {[
                                "Contact information: Name, email address, and phone number when you fill out our contact form or subscribe to our newsletter.",
                                "Technical data: IP address, browser type, and operating system collected through cookies and analytical tools.",
                                "Usage data: Information about how you interact with our website to improve our user experience."
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-4">
                                    <span className="text-[#D1BB8A] font-bold mt-1">—</span>
                                    <span className="font-body text-[16px] lg:text-[18px] font-light leading-[1.8] text-zinc-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h2 className="font-heading text-[28px] lg:text-[32px] font-bold text-zinc-900">
                            3. Age Verification & Responsibility
                        </h2>
                        <p className="font-body text-[16px] lg:text-[18px] font-light leading-[1.8] text-zinc-700">
                            Cousins Distillery provides alcoholic beverages. Our website is intended for individuals who are of legal drinking age in their country of residence. We do not knowingly collect data from individuals under the legal age. By using this site, you confirm that you meet these requirements.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="font-heading text-[28px] lg:text-[32px] font-bold text-zinc-900">
                            4. Use of Information
                        </h2>
                        <p className="font-body text-[16px] lg:text-[18px] font-light leading-[1.8] text-zinc-700">
                            Your information is used to provide our services, communicate with you regarding your inquiries, send you marketing materials if you have opted in, and ensure the security of our website.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="font-heading text-[28px] lg:text-[32px] font-bold text-zinc-900">
                            5. Cookies
                        </h2>
                        <p className="font-body text-[16px] lg:text-[18px] font-light leading-[1.8] text-zinc-700">
                            We use cookies to enhance your experience. You can choose to disable cookies in your browser settings, although this may affect the functionality of some parts of the website.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="font-heading text-[28px] lg:text-[32px] font-bold text-zinc-900">
                            6. Contact Us
                        </h2>
                        <p className="font-body text-[16px] lg:text-[18px] font-light leading-[1.8] text-zinc-700">
                            If you have any questions about this Privacy Policy or our data practices, please contact us at <a href="mailto:hello@cousinsdistillery.com" className="text-[#D1BB8A] hover:underline">hello@cousinsdistillery.com</a>.
                        </p>
                    </div>

                    <div className="pt-12 border-t border-zinc-200">
                        <p className="font-body text-[14px] text-zinc-400">
                            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
