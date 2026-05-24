import type { Metadata } from "next";
import QuoteClient from "./QuoteClient";

export const metadata: Metadata = {
  title: "Get a Custom Quote | Maldonite",
  description:
    "Request a custom quote from Maldonite for your next project. Full-stack development, AI integration, UI/UX design, and digital marketing. Get a detailed quote within 24 hours.",
  openGraph: {
    title: "Get a Custom Quote | Maldonite",
    description:
      "Tell us about your project and get a detailed, tailored quote from Maldonite within 24 hours.",
    url: "https://www.maldonite.com/quote",
    images: [
      {
        url: "https://www.maldonite.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Get a Custom Quote from Maldonite",
      },
    ],
  },
};

export default function QuotePage() {
  return <QuoteClient />;
}
