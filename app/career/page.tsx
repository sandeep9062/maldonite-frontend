import type { Metadata } from "next";
import CareersPageClient from "./CareersPageClient";

export const metadata: Metadata = {
  title: "Careers | Maldonite",
  description:
    "Join Maldonite — explore career opportunities in full-stack development, AI/ML engineering, business operations, and more. Build the future with a team that values competence over credentials.",
  openGraph: {
    title: "Careers at Maldonite | Join Our Team",
    description:
      "We're hiring passionate engineers and operators. Explore open positions at Maldonite and help us build high-performance custom software and intelligent AI systems.",
    url: "https://www.maldonite.com/career",
    images: [
      {
        url: "https://www.maldonite.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Careers at Maldonite - Join Our Team",
      },
    ],
  },
};

export default function CareersPage() {
  return <CareersPageClient />;
}
