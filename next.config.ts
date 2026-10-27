import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  // L'adresse Vercel renvoie vers le domaine officiel : une seule adresse indexée par Google.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "site-ad-vainqueurs.vercel.app" }],
        destination: "https://www.advainqueurs.org/:path*",
        permanent: true,
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;