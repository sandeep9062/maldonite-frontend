import type { Metadata } from "next";
import type { ReactNode } from "react";

// Comprehensive SEO metadata for the Terms of Service page
export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read Maldonite's Terms of Service to understand the terms and conditions governing your use of our website and services. Covers eligibility, accounts, acceptable use, intellectual property, payments, and more.",
  keywords: [
    "terms of service",
    "terms and conditions",
    "Maldonite terms",
    "website terms",
    "service agreement",
    "legal terms",
    "user agreement",
    "Maldonite legal",
    "software development terms",
    "Maldonite terms of use",
  ],
  openGraph: {
    title: "Terms of Service | Maldonite",
    description:
      "Read Maldonite's Terms of Service to understand the terms and conditions governing your use of our website and services.",
    url: "https://www.maldonite.com/terms",
    siteName: "Maldonite",
    images: [
      {
        url: "https://www.maldonite.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maldonite Terms of Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@maldoniteHQ",
    creator: "@maldoniteHQ",
    title: "Terms of Service | Maldonite",
    description:
      "Read Maldonite's Terms of Service to understand the terms and conditions governing your use of our website and services.",
    images: ["https://www.maldonite.com/images/twitter-card.jpg"],
  },
  alternates: {
    canonical: "https://www.maldonite.com/terms",
  },
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
