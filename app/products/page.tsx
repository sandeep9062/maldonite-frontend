import type { Metadata } from "next";
import ProductsPageClient from "./ProductsPageClient";

export const metadata: Metadata = {
  title: "SaaS Products | Maldonite",
  description:
    "Explore Maldonite's SaaS product portfolio. Innovative software solutions built with modern technology stacks including Next.js, AI, and cloud-native architecture.",
  openGraph: {
    title: "SaaS Products | Maldonite",
    description:
      "Discover Maldonite's suite of SaaS products — scalable, intelligent software solutions for modern businesses.",
    url: "https://www.maldonite.com/products",
    images: [
      {
        url: "https://www.maldonite.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maldonite SaaS Products",
      },
    ],
  },
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
