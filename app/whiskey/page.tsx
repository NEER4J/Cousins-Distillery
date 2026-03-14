import type { Metadata } from "next";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ProductPageContent } from "@/app/components/ProductPageContent";
import { getProduct } from "@/lib/products";

const product = getProduct("whiskey")!;

export const metadata: Metadata = {
  title: product.metaTitle,
  description: product.metaDescription,
  keywords: product.metaKeywords,
  openGraph: {
    title: product.metaTitle,
    description: product.metaDescription,
    images: [{ url: product.image, alt: product.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: product.metaTitle,
    description: product.metaDescription,
    images: [product.image],
  },
};

export default function WhiskeyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductPageContent product={product} />
      <Footer />
    </div>
  );
}
