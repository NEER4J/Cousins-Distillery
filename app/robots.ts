import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cousinsdistilleryltd.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/coming-soon", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
