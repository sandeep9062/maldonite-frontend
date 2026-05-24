import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Services | Maldonite",
  description:
    "Explore Maldonite's full range of services: full-stack development (Next.js, MERN), UI/UX design, AI integration, SaaS development, digital marketing, and more. Scalable solutions for startups and enterprises.",
  openGraph: {
    title: "Services | Maldonite - Full-Stack Development & Digital Solutions",
    description:
      "From design to deployment to AI automation — Maldonite builds powerful digital solutions that scale with your vision.",
    url: "https://www.maldonite.com/services",
    images: [
      {
        url: "https://www.maldonite.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maldonite Services - Full-Stack Development & Digital Solutions",
      },
    ],
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
