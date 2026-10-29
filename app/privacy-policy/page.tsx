import type { Metadata } from "next";
import PrivacyPolicyPageClient from "./PrivacyPolicyPageClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Maldonite",
  description:
    "Read Maldonite's Privacy Policy to understand how we collect, use, disclose, and protect your personal information when you visit our website or use our services.",
  openGraph: {
    title: "Privacy Policy | Maldonite",
    description:
      "Learn how Maldonite handles your personal information, data collection practices, and your rights under this Privacy Policy.",
    url: "https://www.maldonite.com/privacy-policy",
    images: [
      {
        url: "https://www.maldonite.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maldonite Privacy Policy",
      },
    ],
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageClient />;
}
