import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable compression and optimization
  compress: true,

  // Enable React strict mode for development
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 750, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "maldonite.com",
        pathname: "/**",
      },
    ],
  },

  // Enable standalone output for smaller Docker images
  output: "standalone",

  // Experimental optimizations
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-select",
      "@radix-ui/react-label",
      "@radix-ui/react-separator",
      "react-icons",
      "antd",
    ],
    scrollRestoration: true,
  },

  // Improve performance with preload hints and caching headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
