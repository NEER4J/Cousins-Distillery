import type { Metadata } from "next";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ProductPageContent } from "@/app/components/ProductPageContent";
import { getProduct } from "@/lib/products";

const product = getProduct("vodka")!;

export const metadata: Metadata = {
  title: product.metaTitle,
  description: product.metaDescription,
};

export default function VodkaPage() {
  return (
    <div className="min-h-screen bg-[#F9F8F3]">
      <Header />
      <ProductPageContent product={product} />
      <Footer />
    </div>
  );
}
