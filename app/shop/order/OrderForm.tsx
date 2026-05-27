"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Send, Minus, Plus } from "lucide-react";
import { PRODUCTS, getProduct, type ProductSlug } from "@/lib/products";
import { submitOrderForm } from "@/app/actions/order";

const CANADIAN_PROVINCES = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Northwest Territories",
    "Nunavut",
    "Yukon",
];

interface OrderFormProps {
    initialProductSlug: ProductSlug;
}

export function OrderForm({ initialProductSlug }: OrderFormProps) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        productSlug: initialProductSlug as string,
        quantity: 1,
        addressLine1: "",
        addressLine2: "",
        city: "",
        province: "Ontario",
        postalCode: "",
        country: "Canada",
        notes: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [responseMessage, setResponseMessage] = useState("");

    const selectedProduct = useMemo(
        () => getProduct(form.productSlug) ?? getProduct(initialProductSlug)!,
        [form.productSlug, initialProductSlug]
    );

    const total = useMemo(
        () => selectedProduct.retailPrice * form.quantity,
        [selectedProduct, form.quantity]
    );

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function updateQuantity(delta: number) {
        setForm((prev) => ({
            ...prev,
            quantity: Math.max(1, Math.min(99, prev.quantity + delta)),
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");
        setResponseMessage("");

        const result = await submitOrderForm({
            ...form,
            quantity: Number(form.quantity),
        });

        if (result.success) {
            setStatus("success");
            setResponseMessage(result.message);
            setForm({
                name: "",
                email: "",
                phone: "",
                productSlug: initialProductSlug,
                quantity: 1,
                addressLine1: "",
                addressLine2: "",
                city: "",
                province: "Ontario",
                postalCode: "",
                country: "Canada",
                notes: "",
            });
        } else {
            setStatus("error");
            setResponseMessage(result.message);
        }
    }

    const inputClass =
        "w-full px-5 py-4 bg-transparent border-b-2 border-zinc-200 font-body text-[15px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#0F0A08] transition-colors disabled:opacity-60 rounded-none";
    const labelClass =
        "font-body text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900";

    return (
        <section className="py-20 lg:py-24 px-6 lg:px-12 bg-[#FEFEF6] relative">
            <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                {/* Order Summary — Left */}
                <aside className="lg:col-span-5 lg:sticky lg:top-32">
                    <div className="bg-[#0F0A08] text-white p-6 sm:p-8 lg:p-10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#D1BB8A] to-white/30" />

                        <p className="font-body text-[11px] font-bold uppercase tracking-[0.3em] text-[#D1BB8A] mb-4">
                            Your Selection
                        </p>

                        <div className="bg-white/5 p-5 mb-8 flex items-center gap-5">
                            <div className="w-[80px] h-[120px] flex-shrink-0 flex items-center justify-center">
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.shortName}
                                    className="max-h-[120px] max-w-full object-contain drop-shadow-xl"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-[#D1BB8A] mb-2">
                                    {selectedProduct.subtitle}
                                </p>
                                <h3 className="font-heading text-[20px] font-bold text-white leading-tight mb-2">
                                    {selectedProduct.shortName}
                                </h3>
                                <p className="font-body text-[13px] text-white/60">
                                    Retail ${selectedProduct.retailPrice.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        {/* Choose a different product */}
                        <div className="mb-8">
                            <label htmlFor="productSlug" className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-white/60 mb-3 block">
                                Change product
                            </label>
                            <select
                                id="productSlug"
                                name="productSlug"
                                value={form.productSlug}
                                onChange={handleChange}
                                disabled={status === "loading"}
                                className="w-full px-4 py-3 bg-white/5 border border-white/15 font-body text-[14px] text-white focus:outline-none focus:border-[#D1BB8A] transition-colors cursor-pointer"
                            >
                                {PRODUCTS.map((p) => (
                                    <option key={p.slug} value={p.slug} className="text-zinc-900">
                                        {p.shortName} — Retail ${p.retailPrice.toFixed(2)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="mb-8">
                            <label className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-white/60 mb-3 block">
                                Quantity
                            </label>
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => updateQuantity(-1)}
                                    disabled={status === "loading" || form.quantity <= 1}
                                    aria-label="Decrease quantity"
                                    className="flex h-12 w-12 items-center justify-center border border-white/20 text-white hover:bg-[#D1BB8A] hover:text-black hover:border-[#D1BB8A] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="font-heading text-[24px] font-bold text-white w-12 text-center">
                                    {form.quantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => updateQuantity(1)}
                                    disabled={status === "loading" || form.quantity >= 99}
                                    aria-label="Increase quantity"
                                    className="flex h-12 w-12 items-center justify-center border border-white/20 text-white hover:bg-[#D1BB8A] hover:text-black hover:border-[#D1BB8A] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="border-t border-white/15 pt-6 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="font-body text-[13px] text-white/60">
                                    {selectedProduct.shortName} × {form.quantity}
                                </span>
                                <span className="font-body text-[14px] text-white">
                                    ${(selectedProduct.retailPrice * form.quantity).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between items-baseline pt-3 border-t border-white/10">
                                <span className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-[#D1BB8A]">
                                    Retail Total
                                </span>
                                <span className="font-heading text-[28px] font-bold text-white">
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                            <p className="font-body text-[11px] text-white/40 leading-relaxed pt-2">
                                Shipping and applicable taxes confirmed by our team prior to fulfillment.
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Form — Right */}
                <div className="lg:col-span-7">
                    <div className="bg-white border border-zinc-200 shadow-xl p-6 sm:p-8 lg:p-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#D1BB8A] to-[#0F0A08]" />

                        {status === "success" ? (
                            <div className="flex flex-col items-center justify-center text-center py-20 gap-8">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#D1BB8A] text-[#D1BB8A]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                                <h2 className="font-heading text-[36px] font-semibold tracking-[1px] text-zinc-900">
                                    Order Received.
                                </h2>
                                <p className="font-body text-[16px] text-zinc-600 max-w-[460px] leading-[1.8] font-light">
                                    {responseMessage}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="flex h-[56px] px-10 items-center justify-center border border-zinc-900 font-body text-[13px] font-bold uppercase tracking-[0.2em] text-zinc-900 transition-all hover:bg-zinc-900 hover:text-white"
                                    >
                                        Place Another Order
                                    </button>
                                    <Link
                                        href="/shop"
                                        className="flex h-[56px] px-10 items-center justify-center bg-[#0F0A08] font-body text-[13px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#D1BB8A] hover:text-black"
                                    >
                                        Back to Collection
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="mb-10">
                                    <h2 className="font-heading text-[28px] font-semibold tracking-[1px] text-[#0F0A08] mb-2">
                                        Your details
                                    </h2>
                                    <p className="font-body text-[14px] text-zinc-500 font-light">
                                        All fields marked with an asterisk (*) are required.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="name" className={labelClass}>Full Name *</label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your name"
                                                disabled={status === "loading"}
                                                className={inputClass}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="email" className={labelClass}>Email *</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="you@example.com"
                                                disabled={status === "loading"}
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 mt-2">
                                        <label htmlFor="phone" className={labelClass}>Phone *</label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={form.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="+1 905 555 0000"
                                            disabled={status === "loading"}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div className="pt-6 mt-2 border-t border-zinc-100">
                                        <h3 className="font-heading text-[18px] font-semibold text-[#0F0A08] mb-1">Shipping Address</h3>
                                        <p className="font-body text-[12px] text-zinc-500 mb-6 font-light">Where would you like your order delivered?</p>

                                        <div className="flex flex-col gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="addressLine1" className={labelClass}>Address Line 1 *</label>
                                                <input
                                                    id="addressLine1"
                                                    name="addressLine1"
                                                    type="text"
                                                    value={form.addressLine1}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Street address"
                                                    disabled={status === "loading"}
                                                    className={inputClass}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="addressLine2" className={labelClass}>Address Line 2</label>
                                                <input
                                                    id="addressLine2"
                                                    name="addressLine2"
                                                    type="text"
                                                    value={form.addressLine2}
                                                    onChange={handleChange}
                                                    placeholder="Apt, suite, unit (optional)"
                                                    disabled={status === "loading"}
                                                    className={inputClass}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="city" className={labelClass}>City *</label>
                                                    <input
                                                        id="city"
                                                        name="city"
                                                        type="text"
                                                        value={form.city}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="City"
                                                        disabled={status === "loading"}
                                                        className={inputClass}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="province" className={labelClass}>Province *</label>
                                                    <select
                                                        id="province"
                                                        name="province"
                                                        value={form.province}
                                                        onChange={handleChange}
                                                        disabled={status === "loading"}
                                                        className={`${inputClass} cursor-pointer appearance-none`}
                                                    >
                                                        {CANADIAN_PROVINCES.map((p) => (
                                                            <option key={p} value={p}>{p}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="postalCode" className={labelClass}>Postal Code *</label>
                                                    <input
                                                        id="postalCode"
                                                        name="postalCode"
                                                        type="text"
                                                        value={form.postalCode}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="L7L 2Y6"
                                                        disabled={status === "loading"}
                                                        className={inputClass}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="country" className={labelClass}>Country *</label>
                                                    <input
                                                        id="country"
                                                        name="country"
                                                        type="text"
                                                        value={form.country}
                                                        onChange={handleChange}
                                                        required
                                                        disabled={status === "loading"}
                                                        className={inputClass}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 pt-6 mt-2 border-t border-zinc-100">
                                        <label htmlFor="notes" className={labelClass}>Order Notes</label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            rows={4}
                                            value={form.notes}
                                            onChange={handleChange}
                                            placeholder="Anything we should know? (Optional)"
                                            disabled={status === "loading"}
                                            className="w-full px-5 py-4 bg-transparent border-2 border-zinc-200 font-body text-[15px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#0F0A08] transition-colors resize-none disabled:opacity-60 rounded-none mt-2"
                                        />
                                    </div>

                                    {status === "error" && responseMessage && (
                                        <p className="font-body text-[13px] text-red-500 mt-2">
                                            {responseMessage}
                                        </p>
                                    )}

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
                                                Submitting…
                                            </>
                                        ) : (
                                            <>
                                                Submit Order — ${total.toFixed(2)}
                                                <Send size={16} className="transition-transform group-hover:translate-x-1" />
                                            </>
                                        )}
                                    </button>
                                    <p className="font-body text-[11px] text-zinc-400 mt-4 leading-relaxed text-center opacity-70">
                                        By submitting, you agree to our <Link href="/privacy" className="hover:text-[#0F0A08] underline decoration-zinc-200">Privacy Policy</Link> and <Link href="/terms" className="hover:text-[#0F0A08] underline decoration-zinc-200">Terms</Link>. Our team will reach out to confirm payment and delivery.
                                    </p>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
