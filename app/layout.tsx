import type { Metadata } from "next";
import { Poppins, Noto_Serif } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cousinsdistilleryltd.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cousins Distillery | Small-Batch Craft Spirits",
    template: "%s | Cousins Distillery",
  },
  description:
    "Cousins Distillery: Cultivating premium small-batch spirits including Vodka, Tequila, Blue Agave Spirit, and Rye Whiskey. Crafted through 13 stages of refinement from bloodline to bottle.",
  keywords: [
    "Cousins Distillery",
    "Small-batch spirits",
    "Craft Vodka",
    "Blue Agave Spirit",
    "Artisanal Tequila",
    "Rye Whiskey",
    "Distillery North America",
    "Luxury Spirits",
  ],
  authors: [{ name: "Cousins Distillery" }],
  creator: "Cousins Distillery",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Cousins Distillery",
    title: "Cousins Distillery | Small-Batch Craft Spirits",
    description:
      "Cultivating premium spirits through 13 stages of refinement. Discover our craft vodka, tequila, agave spirit, and rye whiskey.",
    images: [
      {
        url: "/new-media/4-bottom-with-bg.jpeg",
        width: 1200,
        height: 630,
        alt: "Cousins Distillery premium spirits collection.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cousins Distillery | Small-Batch Craft Spirits",
    description:
      "Cultivating premium spirits through 13 stages of refinement. Discover our craft vodka, tequila, agave spirit, and rye whiskey.",
    images: ["/new-media/4-bottom-with-bg.jpeg"],
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      <body className={`${poppins.variable} ${notoSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
