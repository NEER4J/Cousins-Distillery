import Link from "next/link";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { PRODUCTS } from "@/lib/products";

export default function ShopPage() {
    return (
        <div className="min-h-screen bg-[#F9F8F3]">
            <Header />

            {/* Hero Banner */}
            <section className="relative bg-[#0F0A08] pt-24 pb-20 lg:pt-32 lg:pb-24 px-6 lg:px-12 text-center flex flex-col items-center overflow-hidden">
                <img
                    src="/all-bottles.jpeg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />

                <div className="relative z-10 mx-auto max-w-[1000px]">
                    <div className="flex items-center justify-center gap-6 mb-8">
                        <span className="h-[2px] w-16 bg-[#D1BB8A]" aria-hidden />
                        <p className="font-body text-[11px] font-bold uppercase tracking-[0.4em] text-[#D1BB8A]">
                            The Collection
                        </p>
                        <span className="h-[2px] w-16 bg-[#D1BB8A]" aria-hidden />
                    </div>

                    <h1 className="font-heading text-[clamp(4rem,10vw,8rem)] font-bold tracking-tight leading-[1.2] text-white mb-8">
                        Order <span className="text-[#D1BB8A] block">Now.</span>
                    </h1>

                    <p className="font-body text-[15px] lg:text-[18px] font-normal leading-[1.8] text-white/70 max-w-2xl mx-auto">
                        Four small-batch expressions, each refined through our thirteen-stage process. Browse the retail collection below and place an order — our team will follow up to confirm payment and delivery.
                    </p>

                    <div className="mt-10 inline-flex flex-col items-center gap-3 rounded-sm border border-[#D1BB8A]/40 bg-[#D1BB8A]/10 px-8 py-5 backdrop-blur-sm">
                        <p className="font-body text-[10px] font-bold uppercase tracking-[0.4em] text-[#D1BB8A]">
                            Coming Soon
                        </p>
                        <p className="font-body text-[13px] lg:text-[15px] font-medium text-white/90">
                            Online ordering &amp; availability at <span className="text-[#D1BB8A] font-bold">LCBO</span>.
                        </p>
                    </div>
                </div>

                {/* Decorative Accent Label */}
                <div className="absolute bottom-10 left-6 lg:left-12 pointer-events-none z-10 opacity-30">
                    <p className="font-heading text-[clamp(3rem,8vw,6rem)] font-bold text-white/5 leading-none select-none tracking-tighter">
                        COUSINS
                    </p>
                </div>
            </section>

            {/* Product Grid */}
            <section className="py-20 lg:py-24 px-6 lg:px-12 bg-[#FEFEF6]">
                <div className="mx-auto max-w-[1400px]">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 lg:mb-16">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="h-[1px] w-12 bg-[#D1BB8A]" aria-hidden />
                                <p className="font-body text-[11px] font-bold uppercase tracking-[0.4em] text-[#D1BB8A]">
                                    Retail Collection
                                </p>
                            </div>
                            <h2 className="font-heading text-[clamp(1.75rem,4.5vw,3rem)] font-semibold tracking-[1px] text-[#0F0A08] leading-[1.5]">
                                Four spirits. <span className="text-[#D1BB8A]">One standard.</span>
                            </h2>
                        </div>
                        <p className="font-body text-[13px] text-zinc-500 max-w-xs">
                            All prices shown are retail. Shipping and applicable taxes are confirmed by our team after submission.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                        {PRODUCTS.map((product) => (
                            <article
                                key={product.slug}
                                className="group flex flex-col bg-white border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#D1BB8A] to-[#0F0A08]" />

                                <div className="relative h-[340px] bg-[#F9F8F3] flex items-center justify-center overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.shortName}
                                        className="max-h-[280px] max-w-[80%] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2"
                                    />
                                </div>

                                <div className="flex flex-col flex-1 p-6 lg:p-7 gap-4">
                                    <div>
                                        <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#D1BB8A] mb-2">
                                            {product.subtitle}
                                        </p>
                                        <h3 className="font-heading text-[22px] lg:text-[24px] font-bold text-[#0F0A08] leading-tight">
                                            {product.shortName}
                                        </h3>
                                    </div>

                                    <div className="border-t border-zinc-200 pt-4 flex items-baseline justify-between gap-3">
                                        <span className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                                            Retail
                                        </span>
                                        <span className="font-heading text-[22px] font-bold text-[#0F0A08]">
                                            ${product.retailPrice.toFixed(2)}
                                        </span>
                                    </div>

                                    <div
                                        aria-disabled="true"
                                        className="flex items-center justify-center gap-3 w-full h-[52px] bg-zinc-200 text-zinc-500 font-body text-[12px] font-bold uppercase tracking-[0.2em] cursor-not-allowed mt-1"
                                    >
                                        Ordering — Coming Soon
                                    </div>

                                    <Link
                                        href={`/${product.slug}`}
                                        className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500 hover:text-[#0F0A08] transition-colors text-center"
                                    >
                                        Learn more
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Order CTA Banner */}
            <section className="relative bg-[#0F0A08] py-20 lg:py-24 px-6 lg:px-12 overflow-hidden">
                <img src="/cornone.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />

                <div className="relative z-10 mx-auto max-w-[1000px] text-center">
                    <div className="flex items-center justify-center gap-6 mb-8">
                        <span className="h-[2px] w-16 bg-[#D1BB8A]" aria-hidden />
                        <p className="font-body text-[11px] font-bold uppercase tracking-[0.4em] text-[#D1BB8A]">
                            Place an order
                        </p>
                        <span className="h-[2px] w-16 bg-[#D1BB8A]" aria-hidden />
                    </div>

                    <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[1px] text-white leading-[1.4] mb-8">
                        Ordering is <span className="text-[#D1BB8A]">coming soon.</span>
                    </h2>

                    <p className="font-body text-[15px] lg:text-[17px] text-white/70 leading-[1.8] mb-12 max-w-xl mx-auto">
                        Online ordering and availability at <span className="text-white font-semibold">LCBO</span> are on the way. Check back shortly to place your order.
                    </p>

                    <div
                        aria-disabled="true"
                        className="inline-flex items-center justify-center gap-3 h-[56px] px-12 bg-white/10 text-white/60 border border-white/20 font-body text-[13px] font-bold uppercase tracking-[0.2em] cursor-not-allowed"
                    >
                        Coming Soon
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
