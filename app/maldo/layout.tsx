import type { Metadata } from "next";
import React from "react";

// Define metadata for the Meet Maldo page
export const metadata: Metadata = {
  title: "Meet Maldo | Maldonite",
  description:
    "Maldo is Maldonite's resident builder — part hiker, part engineer, entirely obsessed with turning your vision into something gold-standard.",
  keywords: [
    "Meet Maldo",
    "Maldonite Maldo",
    "Maldonite team",
    "resident builder",
    "full-stack developer",
    "software engineer",
    "web development",
    "Maldonite",
  ],
  openGraph: {
    title: "Meet Maldo | Maldonite",
    description:
      "Maldo is Maldonite's resident builder — part hiker, part engineer, entirely obsessed with turning your vision into something gold-standard.",
    url: "https://www.maldonite.com/maldo",
    siteName: "Maldonite",
    images: [
      {
        url: "https://www.maldonite.com/images/og-image-maldo.jpg",
        width: 1200,
        height: 630,
        alt: "Meet Maldo - Maldonite's resident builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Maldo | Maldonite",
    description:
      "Maldo is Maldonite's resident builder — part hiker, part engineer, entirely obsessed with turning your vision into something gold-standard.",
    images: ["https://www.maldonite.com/images/twitter-card-maldo.jpg"],
    creator: "@maldoniteHQ",
  },
};

export default function MaldoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* The actual Maldo page component (now page.tsx) will be rendered as children */}
      {children}
    </section>
  );
}
