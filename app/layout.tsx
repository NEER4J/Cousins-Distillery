import type { Metadata } from "next";
import { Poppins, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "600", "700"],
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cousinsdistillery.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cousins Distillery | Craft Vodka & Spirits",
    template: "%s | Cousins Distillery",
  },
  description:
    "Cousins Vodka is cultivated, not merely distilled. Small-batch spirits crafted through thirteen stages of refinement. Discover our craft vodka and plan a visit.",
  keywords: [
    "Cousins Distillery",
    "Cousins Vodka",
    "craft vodka",
    "small-batch spirits",
    "distillery",
    "premium vodka",
  ],
  authors: [{ name: "Cousins Distillery Ltd." }],
  creator: "Cousins Distillery Ltd.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Cousins Distillery",
    title: "Cousins Distillery | Craft Vodka & Spirits",
    description:
      "Cousins Vodka is cultivated, not merely distilled. Small-batch spirits crafted through thirteen stages of refinement.",
    images: [
      {
        url: "/bottle%20in%20field.png",
        width: 1200,
        height: 630,
        alt: "Cousins Vodka bottle in a golden field — craft spirits from the land.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cousins Distillery | Craft Vodka & Spirits",
    description:
      "Cousins Vodka is cultivated, not merely distilled. Small-batch spirits crafted through thirteen stages of refinement.",
    images: ["/bottle%20in%20field.png"],
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${cormorant.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
