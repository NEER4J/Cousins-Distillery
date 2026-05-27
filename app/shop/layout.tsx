import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cousinsdistilleryltd.com";

export const metadata: Metadata = {
  title: "Order Now | Cousins Distillery",
  description:
    "Order Cousins Distillery's small-batch craft vodka, tequila, blue agave spirit, and rye whiskey. Browse our retail collection and place your order today.",
  keywords: [
    "order cousins distillery",
    "buy craft vodka",
    "order tequila online",
    "blue agave spirit",
    "rye whiskey",
    "retail spirits",
  ],
  openGraph: {
    title: "Order Now | Cousins Distillery",
    description:
      "Order our craft vodka, tequila, blue agave spirit, and rye whiskey at retail.",
    url: `${siteUrl}/shop`,
    images: [{ url: "/all-bottles.jpeg", alt: "Cousins Distillery Collection" }],
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
