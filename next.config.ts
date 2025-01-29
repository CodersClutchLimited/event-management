import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // serverExternalPackages: ["mongoose"], // Correct key
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
