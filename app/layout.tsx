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

export const metadata: Metadata = {
  title: "Cousins Distillery | Craft Spirits",
  description: "Small-batch spirits crafted with care. Discover our range and plan a visit.",
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
