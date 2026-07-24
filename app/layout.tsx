import type { Metadata } from "next";
import { Poppins, Noto_Serif } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { AgeGate } from "./components/AgeGate";
import { CmsScripts } from "./components/CmsScripts";
import { getSiteSettings } from "@/lib/cms/settings";

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
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#organization`,
  "name": "Cousins Distillery",
  "description": "Premium small-batch craft spirits distillery producing vodka, tequila, blue agave spirit, and rye whiskey through a 13-stage refinement process.",
  "url": siteUrl,
  "logo": `${siteUrl}/logo.svg`,
  "image": `${siteUrl}/new-media/4-bottom-with-bg.jpeg`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "747 Appleby Line",
    "addressLocality": "Burlington",
    "addressRegion": "Ontario",
    "postalCode": "L7L 2Y6",
    "addressCountry": "CA"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-905-512-5943",
    "contactType": "customer service",
    "email": "contact@cousinsdistilleryltd.com"
  },
  "priceRange": "$$$$",
  "servesCuisine": "Distillery",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The admin CMS lives under /admin — it must NOT show the age gate or fire
  // the site's custom tracking scripts. Middleware forwards the path via header.
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");
  const settings = isAdmin ? null : await getSiteSettings();

  return (
    <html lang="en">
      <head>
        {!isAdmin && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          />
        )}
        {settings && <CmsScripts html={settings.header_scripts} position="head" />}
      </head>
      <body className={`${poppins.variable} ${notoSerif.variable} antialiased`}>
        {settings && <CmsScripts html={settings.body_start_scripts} position="body-start" />}
        {!isAdmin && <AgeGate />}
        {children}
        {settings && <CmsScripts html={settings.footer_scripts} position="footer" />}
      </body>
    </html>
  );
}
