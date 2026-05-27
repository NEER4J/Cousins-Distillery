import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { getProduct, PRODUCTS, type ProductSlug } from "@/lib/products";
import { OrderForm } from "./OrderForm";

interface OrderPageProps {
    searchParams: Promise<{ product?: string }>;
}

export default async function OrderPage({ searchParams }: OrderPageProps) {
    const params = await searchParams;
    const requested = params.product;
    const matched = requested ? getProduct(requested) : null;
    const initialProductSlug: ProductSlug = matched?.slug ?? PRODUCTS[0].slug;

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
                            Place An Order
                        </p>
                        <span className="h-[2px] w-16 bg-[#D1BB8A]" aria-hidden />
                    </div>

                    <h1 className="font-heading text-[clamp(4rem,10vw,8rem)] font-bold tracking-tight leading-[1.2] text-white mb-8">
                        Order <span className="text-[#D1BB8A] block">Details.</span>
                    </h1>

                    <p className="font-body text-[15px] lg:text-[18px] font-normal leading-[1.8] text-white/70 max-w-2xl mx-auto">
                        Confirm your selection and tell us where to ship. Our team will follow up within 1–2 business days to arrange payment and delivery.
                    </p>
                </div>

                <div className="absolute bottom-10 left-6 lg:left-12 pointer-events-none z-10 opacity-30">
                    <p className="font-heading text-[clamp(3rem,8vw,6rem)] font-bold text-white/5 leading-none select-none tracking-tighter">
                        COUSINS
                    </p>
                </div>
            </section>

            <OrderForm initialProductSlug={initialProductSlug} />

            <Footer />
        </div>
    );
}
