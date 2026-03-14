import type { Metadata } from "next";
import React from "react";

// Define metadata for the Services page
export const metadata: Metadata = {
  title:
    "Maldonite Services | Full-Stack Development, AI, UI/UX & Digital Marketing",
  description:
    "Explore Maldonite's comprehensive services: custom full-stack web development, AI-powered solutions, intuitive UI/UX design, e-commerce platforms, SEO, and digital marketing strategies for startups and enterprises.",
  keywords: [
    "Maldonite services",
    "web development services",
    "AI integration services",
    "UI/UX design agency",
    "e-commerce solutions",
    "SEO services",
    "digital marketing",
    "digital marketing agency",
    "SaaS development services",
    "API integration",
    "web hosting & maintenance",
    "branding & graphic design",
    "startup tech partner",
    "enterprise solutions",
  ],
  openGraph: {
    title:
      "Maldonite Services | Full-Stack Development, AI, UI/UX & Digital Marketing",
    description:
      "Explore Maldonite's comprehensive services: custom full-stack web development, AI-powered solutions, intuitive UI/UX design, e-commerce platforms, SEO, and digital marketing strategies for startups and enterprises.",
    url: "https://www.maldonite.com/services", // Ensure this matches your actual URL
    siteName: "Maldonite",
    images: [
      {
        url: "https://www.maldonite.com/images/og-image-services.jpg", // A relevant image for the services page (e.g., a collage of service icons, team collaborating)
        width: 1200,
        height: 630,
        alt: "Maldonite Services - Digital Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Maldonite Services | Full-Stack Development, AI, UI/UX & Digital Marketing",
    description:
      "Explore Maldonite's comprehensive services: custom full-stack web development, AI-powered solutions, intuitive UI/UX design, e-commerce platforms, SEO, and digital marketing strategies for startups and enterprises.",
    images: ["https://www.maldonite.com/images/twitter-card-services.jpg"], // A relevant image for Twitter shares
    creator: "@maldoniteHQ", // Your Twitter handle
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Any shared UI elements specific to the services section can go here.
          For instance, a hero banner specific to services or a common navigation.
          The actual ServicesPage component (now page.tsx) will be rendered as children. */}
      {children}
    </section>
  );
}
