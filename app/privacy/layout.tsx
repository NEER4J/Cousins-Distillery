import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cousinsdistillery.com";

export const metadata: Metadata = {
  title: "Privacy Policy | Cousins Distillery",
  description:
    "Read the Cousins Distillery Privacy Policy to understand how we collect, use, and protect your personal data.",
  keywords: ["privacy policy", "data protection", "cousins distillery legal"],
  openGraph: {
    title: "Privacy Policy | Cousins Distillery",
    description:
      "Understand how Cousins Distillery protects your privacy and manages your data.",
    url: `${siteUrl}/privacy`,
    images: [{ url: "/bottle%20in%20field.png", alt: "Cousins Distillery Legal" }],
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
