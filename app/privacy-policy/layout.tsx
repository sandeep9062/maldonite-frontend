import type { Metadata } from "next";
import type { ReactNode } from "react";

// Comprehensive SEO metadata for the Privacy Policy page
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read Maldonite's Privacy Policy to understand how we collect, use, disclose, and protect your personal information when you visit our website or use our services.",
  keywords: [
    "privacy policy",
    "data protection",
    "personal information",
    "data collection",
    "cookie policy",
    "Maldonite privacy",
    "GDPR compliance",
    "CCPA compliance",
    "data rights",
    "privacy protection",
    "data security",
    "Maldonite data policy",
  ],
  openGraph: {
    title: "Privacy Policy | Maldonite",
    description:
      "Learn how Maldonite handles your personal information, data collection practices, and your rights under this Privacy Policy.",
    url: "https://www.maldonite.com/privacy-policy",
    siteName: "Maldonite",
    images: [
      {
        url: "https://www.maldonite.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maldonite Privacy Policy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@maldoniteHQ",
    creator: "@maldoniteHQ",
    title: "Privacy Policy | Maldonite",
    description:
      "Learn how Maldonite handles your personal information, data collection practices, and your rights under this Privacy Policy.",
    images: ["https://www.maldonite.com/images/twitter-card.jpg"],
  },
  alternates: {
    canonical: "https://www.maldonite.com/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
