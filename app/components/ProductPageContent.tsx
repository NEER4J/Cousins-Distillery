import Link from "next/link";
import type { Product } from "@/lib/products";

interface ProductPageContentProps {
  product: Product;
}

export function ProductPageContent({ product }: ProductPageContentProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#41380E] py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-[760px]">
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="h-[1px] w-10 bg-[#8C8567]" aria-hidden />
            <p className="font-heading text-[15px] font-medium italic tracking-[0.2em] text-[#A89E74] uppercase">
              {product.name}
            </p>
            <span className="h-[1px] w-10 bg-[#8C8567]" aria-hidden />
          </div>
          <h1 className="font-heading text-[36px] sm:text-[48px] lg:text-[56px] font-bold italic tracking-tight leading-[1.1] text-white mb-5">
            {product.headline}
          </h1>
          <p className="font-body text-[15px] sm:text-[17px] text-[#C4C2B4] leading-[1.9] max-w-[520px] mx-auto mb-8">
            {product.subheading}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={product.primaryCta.href}
              className="flex h-[52px] min-w-[200px] px-8 items-center justify-center rounded-full bg-[#D1BB8A] font-body text-[13px] font-semibold uppercase tracking-widest text-white transition hover:opacity-90"
            >
              {product.primaryCta.label}
            </Link>
            <Link
              href={product.secondaryCta.href}
              className="flex h-[52px] min-w-[200px] px-8 items-center justify-center rounded-full border-2 border-[#8C8567] bg-transparent font-body text-[13px] font-semibold uppercase tracking-widest text-white transition hover:bg-white/10"
            >
              {product.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* Content sections */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[720px] space-y-16">
          {product.sections.map((section, i) => (
            <div key={i}>
              <h2 className="font-heading text-[28px] sm:text-[32px] font-bold italic text-[#222222] mb-4">
                {section.title}
              </h2>
              {section.body && (
                <p className="font-body text-[15px] sm:text-[17px] text-[#444444] leading-[1.9] mb-4">
                  {section.body}
                </p>
              )}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mb-4 space-y-2">
                  {section.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-2 items-start">
                      <span
                        className="mt-[7px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#9f860e] text-[#9f860e]"
                        aria-hidden
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                      <span className="font-body text-[15px] sm:text-[17px] text-[#444444] leading-[1.8]">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {section.bodyAfter && (
                <p className="font-body text-[15px] sm:text-[17px] text-[#444444] leading-[1.9] mb-4">
                  {section.bodyAfter}
                </p>
              )}
              {section.cta && (
                <Link
                  href={section.cta.href}
                  className="inline-block font-body text-[13px] font-semibold uppercase tracking-widest text-[#9f860e] hover:text-[#7a6a0c] transition-colors mt-2"
                >
                  {section.cta.label} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* For partners / venues */}
      <section className="bg-white border-t border-zinc-200 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="font-heading text-[28px] sm:text-[32px] font-bold italic text-[#222222] mb-4">
            {product.forPartnersTitle}
          </h2>
          <p className="font-body text-[15px] sm:text-[17px] text-[#444444] leading-[1.9] mb-8">
            {product.forPartnersBody}
          </p>
          <Link
            href={product.forPartnersCta.href}
            className="inline-flex h-[52px] px-8 items-center justify-center rounded-full bg-[#41380E] font-body text-[13px] font-semibold uppercase tracking-widest text-white transition hover:bg-[#332d0b]"
          >
            {product.forPartnersCta.label}
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#41380E] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-[640px]">
          <h2 className="font-heading text-[28px] sm:text-[36px] font-bold italic text-white mb-6">
            {product.finalCtaHeadline}
          </h2>
          <Link
            href={product.finalCtaHref}
            className="inline-flex h-[52px] px-8 items-center justify-center rounded-full bg-[#D1BB8A] font-body text-[13px] font-semibold uppercase tracking-widest text-white transition hover:opacity-90"
          >
            {product.finalCtaLabel}
          </Link>
        </div>
      </section>
    </>
  );
}
