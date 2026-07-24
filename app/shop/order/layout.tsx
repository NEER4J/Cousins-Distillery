import type { Metadata } from "next";
import { buildMetadata } from "@/lib/cms/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cousinsdistilleryltd.com";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/shop/order", {
    title: "Place an Order | Cousins Distillery",
    description:
      "Place a retail order for Cousins Distillery's small-batch craft spirits. Our team will follow up to confirm payment and shipping details.",
    openGraph: {
      title: "Place an Order | Cousins Distillery",
      description:
        "Order Cousins Distillery's craft spirits. Our team will follow up to confirm payment and delivery.",
      url: `${siteUrl}/shop/order`,
      images: [{ url: "/all-bottles.jpeg", alt: "Cousins Distillery Order" }],
    },
  });
}

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
