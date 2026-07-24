import type { Metadata } from "next";
import { buildMetadata } from "@/lib/cms/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cousinsdistilleryltd.com";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/terms", {
    title: "Terms & Conditions | Cousins Distillery",
    description:
      "Read the Cousins Distillery Terms & Conditions governing use of our website, age verification requirements, and intellectual property rights.",
    keywords: ["terms and conditions", "cousins distillery legal", "alcohol age verification", "distillery terms of use"],
    openGraph: {
      title: "Terms & Conditions | Cousins Distillery",
      description:
        "Review the terms governing your use of the Cousins Distillery website.",
      url: `${siteUrl}/terms`,
      images: [{ url: "/new-media/4-bottom-with-bg.jpeg", alt: "Cousins Distillery" }],
    },
    alternates: {
      canonical: `${siteUrl}/terms`,
    },
  });
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
