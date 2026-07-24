import type { Metadata } from "next";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ProductPageContent } from "@/app/components/ProductPageContent";
import { getProduct } from "@/lib/products";
import { buildMetadata } from "@/lib/cms/seo";

const product = getProduct("tequila")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/tequila", {
    title: product.metaTitle,
    description: product.metaDescription,
    keywords: product.metaKeywords,
    alternates: { canonical: "/tequila" },
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
  });
}

export default function TequilaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductPageContent product={product} />
      <Footer />
    </div>
  );
}
