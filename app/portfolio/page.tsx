import type { Metadata } from "next";
import PortfolioPageClient from "./PortfolioPageClient";

export const metadata: Metadata = {
  title: "Portfolio | Maldonite",
  description:
    "Explore Maldonite's portfolio showcasing projects, SaaS products, and milestones across web development, AI, mobile apps, and digital marketing.",
  openGraph: {
    title: "Portfolio | Maldonite - Projects & SaaS Products",
    description:
      "Browse Maldonite's portfolio of featured projects, SaaS products, and company milestones.",
    url: "https://www.maldonite.com/portfolio",
    images: [
      {
        url: "https://www.maldonite.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maldonite Portfolio - Projects & SaaS Products",
      },
    ],
  },
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
