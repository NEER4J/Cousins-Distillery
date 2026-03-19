import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cousinsdistillery.com";

export const metadata: Metadata = {
  title: "Contact Us | Cousins Distillery",
  description:
    "Get in touch with Cousins Distillery for inquiries regarding our craft spirits, private tastings, wholesale opportunities, or partnership requests.",
  keywords: ["contact cousins distillery", "distillery inquiries", "private tastings", "wholesale spirits", "spirits partnership"],
  openGraph: {
    title: "Contact Us | Cousins Distillery",
    description:
      "Connect with our team for inquiries about craft vodka, tequila, private events, and wholesale partnerships.",
    url: `${siteUrl}/contact`,
    images: [{ url: "/bottle%20in%20field.png", alt: "Cousins Distillery Contact" }],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
