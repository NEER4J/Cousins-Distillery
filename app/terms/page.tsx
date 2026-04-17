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

export default function TermsConditions() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <main className="min-h-screen bg-[#FEFEF6]">
            <Header />

            {/* Hero / Header Section */}
            <section className="relative bg-[#0F0A08] pt-24 pb-20 lg:pt-32 lg:pb-24 px-6 lg:px-12 text-center overflow-hidden">
                <img src="/agave-v2.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A08] via-transparent to-transparent" />
                
                <div className="relative z-10 mx-auto max-w-4xl">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="h-[1px] w-8 bg-[#D1BB8A]" />
                        <p className="font-body text-[11px] font-bold uppercase tracking-[0.4em] text-[#D1BB8A]">
                            Legal
                        </p>
                        <span className="h-[1px] w-8 bg-[#D1BB8A]" />
                    </div>
                    <h1 className="font-heading text-[clamp(2.5rem,7vw,5rem)] font-bold text-white tracking-tight leading-[1.2]">
                        Terms & <span className="text-[#D1BB8A]">Conditions.</span>
                    </h1>
                </div>
            </section>

            {/* Content Section */}
            <section ref={sectionRef} className="py-20 lg:py-24 px-6 lg:px-12 max-w-4xl mx-auto">
                <div className="space-y-16 reveal reveal-delay-2">
                    
                    <div className="space-y-6">
                        <h2 className="font-heading text-[26px] lg:text-[30px] font-semibold tracking-[1px] text-zinc-900">
                            1. Acceptance of Terms
                        </h2>
                        <p className="font-body text-[16px] lg:text-[18px] font-light leading-[1.8] text-zinc-700">
                            By accessing and using this website, you agree to be bound by these Terms & Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="font-heading text-[26px] lg:text-[30px] font-semibold tracking-[1px] text-zinc-900">
                            2. Age Verification
                        </h2>
                        <p className="font-body text-[16px] lg:text-[18px] font-normal leading-[1.8] text-zinc-700 border-l-4 border-[#D1BB8A] pl-6 py-2">
                            You must be of legal drinking age in your country of residence to use this website. By entering this site, you affirm that you meet the age requirements for the purchase and consumption of alcohol.
                        </p>
                        <p className="font-body text-[16px] lg:text-[18px] font-light leading-[1.8] text-zinc-700">
                            Cousins Distillery Ltd. encourages responsible drinking. For more information, please visit local organizations dedicated to responsible alcohol consumption.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="font-heading text-[26px] lg:text-[30px] font-semibold tracking-[1px] text-zinc-900">
                            3. Intellectual Property
                        </h2>
                        <p className="font-body text-[16px] lg:text-[18px] font-light leading-[1.8] text-zinc-700">
                            All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Cousins Distillery Ltd. or its content suppliers and is protected by international copyright laws.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="font-heading text-[26px] lg:text-[30px] font-semibold tracking-[1px] text-zinc-900">
                            4. Use license
                        </h2>
                        <p className="font-body text-[16px] lg:text-[18px] font-light leading-[1.8] text-zinc-700">
                            Permission is granted to temporarily download one copy of the materials on Cousins Distillery's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="font-heading text-[26px] lg:text-[30px] font-semibold tracking-[1px] text-zinc-900">
                            5. Disclaimer
                        </h2>
                        <p className="font-body text-[16px] lg:text-[18px] font-light leading-[1.8] text-zinc-700">
                            The materials on this website are provided on an 'as is' basis. Cousins Distillery Ltd. makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties of merchantability or fitness for a particular purpose.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="font-heading text-[26px] lg:text-[30px] font-semibold tracking-[1px] text-zinc-900">
                            6. Governing Law
                        </h2>
                        <p className="font-body text-[16px] lg:text-[18px] font-light leading-[1.8] text-zinc-700">
                            Any claim relating to Cousins Distillery's website shall be governed by the laws of the country in which the distillery is registered, without regard to its conflict of law provisions.
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
