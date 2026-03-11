import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cousinsdistillery.com";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Cousins Distillery. Inquiries about our craft vodka, private events, wholesale, or partnerships — we'd love to hear from you.",
  openGraph: {
    title: "Contact Us | Cousins Distillery",
    description:
      "Get in touch with Cousins Distillery. Inquiries about craft vodka, private events, wholesale, or partnerships.",
    url: `${siteUrl}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
