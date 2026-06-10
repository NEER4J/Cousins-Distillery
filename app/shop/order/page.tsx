import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

export default function OrderPage() {
    return (
        <div className="min-h-screen bg-[#F9F8F3]">
            <Header />

            {/* Hero Banner */}
            <section className="relative bg-[#0F0A08] pt-24 pb-20 lg:pt-32 lg:pb-24 px-6 lg:px-12 text-center flex flex-col items-center overflow-hidden">
                <img src="/cornone.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />

                <div className="relative z-10 mx-auto max-w-[1000px]">
                    <div className="flex items-center justify-center gap-6 mb-8">
                        <span className="h-[2px] w-16 bg-[#D1BB8A]" aria-hidden />
                        <p className="font-body text-[11px] font-bold uppercase tracking-[0.4em] text-[#D1BB8A]">
                            Coming Soon
                        </p>
                        <span className="h-[2px] w-16 bg-[#D1BB8A]" aria-hidden />
                    </div>

                    <h1 className="font-heading text-[clamp(4rem,10vw,8rem)] font-bold tracking-tight leading-[1.2] text-white mb-8">
                        Coming <span className="text-[#D1BB8A] block">Soon.</span>
                    </h1>

                    <p className="font-body text-[15px] lg:text-[18px] font-normal leading-[1.8] text-white/70 max-w-2xl mx-auto">
                        Online ordering and availability at <span className="text-white font-semibold">LCBO</span> are on the way. We&rsquo;re putting the finishing touches on our ordering experience — check back shortly to place your order.
                    </p>

                    <Link
                        href="/shop"
                        className="group mt-12 inline-flex items-center justify-center gap-3 h-[56px] px-12 bg-[#D1BB8A] text-black font-body text-[13px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-white"
                    >
                        Back to Collection
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="absolute bottom-10 left-6 lg:left-12 pointer-events-none z-10 opacity-30">
                    <p className="font-heading text-[clamp(3rem,8vw,6rem)] font-bold text-white/5 leading-none select-none tracking-tighter">
                        COUSINS
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
