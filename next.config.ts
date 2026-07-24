import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Allow admin image uploads (media.ts caps files at 5 MB) — the default
      // Server Action body limit is only 1 MB.
      bodySizeLimit: "8mb",
    },
  },
};

export default nextConfig;
