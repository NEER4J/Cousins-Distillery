import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

                                    <Link
                                        href={`/shop/order?product=${product.slug}`}
                                        className="group/btn flex items-center justify-center gap-3 w-full h-[52px] bg-[#0F0A08] text-white font-body text-[12px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-[#D1BB8A] hover:text-black mt-1"
                                    >
                                        Order Now
                                        <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                                    </Link>

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
                        Ready to <span className="text-[#D1BB8A]">order?</span>
                    </h2>

                    <p className="font-body text-[15px] lg:text-[17px] text-white/70 leading-[1.8] mb-12 max-w-xl mx-auto">
                        Tell us what you&rsquo;d like and where to send it. Our team will reach out within 1&ndash;2 business days to confirm payment and delivery details.
                    </p>

                    <Link
                        href="/shop/order"
                        className="group inline-flex items-center justify-center gap-3 h-[56px] px-12 bg-[#D1BB8A] text-black font-body text-[13px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-white"
                    >
                        Start Your Order
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
