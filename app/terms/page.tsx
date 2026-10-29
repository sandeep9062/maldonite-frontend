import type { Metadata } from "next";
import TermsPageClient from "./TermsPageClient";

export const metadata: Metadata = {
  title: "Terms of Service | Maldonite",
  description:
    "Read Maldonite's Terms of Service to understand the terms and conditions governing your use of our website and services.",
  openGraph: {
    title: "Terms of Service | Maldonite",
    description:
      "Learn the terms and conditions that apply when you visit maldonite.com or use Maldonite's services.",
    url: "https://www.maldonite.com/terms",
    images: [
      {
        url: "https://www.maldonite.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maldonite Terms of Service",
      },
    ],
  },
};

export default function TermsPage() {
  return <TermsPageClient />;
}
