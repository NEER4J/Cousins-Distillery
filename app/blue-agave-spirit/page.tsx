import type { Metadata } from "next";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ProductPageContent } from "@/app/components/ProductPageContent";
import { getProduct } from "@/lib/products";
import { buildMetadata } from "@/lib/cms/seo";

const product = getProduct("blue-agave-spirit")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/blue-agave-spirit", {
    title: product.metaTitle,
    description: product.metaDescription,
    keywords: product.metaKeywords,
    alternates: { canonical: "/blue-agave-spirit" },
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

export default function BlueAgaveSpiritPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductPageContent product={product} />
      <Footer />
    </div>
  );
}
