import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // 👈 Import Script component
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteTransitionWrapper from "@/components/RouteTransitionWrapper";
//import MaldoChat from "./components/MaldoChat";
import ClientProvider from "./ClientProvider";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Maldonite | Full-Stack Development, AI, and Digital Solutions",
    template: "%s | Maldonite",
  },
  description:
    "Maldonite specializes in crafting scalable software and digital products for startups and enterprises. We offer full-stack development (Next.js, MERN), UI/UX design, AI integration, and growth-focused digital marketing to help your business innovate and grow.",
  keywords: [
    "Maldonite",
    "Maldonite.com",
    "software development agency",
    "full-stack development",
    "Next.js development",
    "website development",
    "MERN stack",
    "AI integration",
    "SaaS development",
    "web design",
    "digital marketing",
    "marketing",
    "SEO services",
    "startup tech partner",
  ],
  authors: [{ name: "Maldonite Team" }],
  openGraph: {
    title: "Maldonite | Full-Stack Development, AI, and Digital Solutions",
    description:
      "Maldonite specializes in crafting scalable software and digital products for startups and enterprises. We offer full-stack development (Next.js, MERN), UI/UX design, AI integration, and growth-focused digital marketing.",
    url: "https://www.maldonite.com",
    siteName: "Maldonite",
    images: [
      {
        url: "https://www.maldonite.com/images/og-image.jpg", // A visually appealing image,image display when somebody share link on social media
        width: 1200,
        height: 630,
        alt: "Maldonite | Igniting Innovation with Scalable Code",
      },
      {
        url: "https://www.maldonite.com/images/og-image-alt.jpg",
        width: 1080,
        height: 1080,
        alt: "Maldonite - Building the Future of Web",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@maldoniteHQ", // if you have a Twitter handle
    creator: "@maldoniteHQ",
    title: "Maldonite | Full-Stack Development, AI, and Digital Solutions",
    description:
      "Maldonite specializes in crafting scalable software and digital products for startups and enterprises. We offer full-stack development (Next.js, MERN), UI/UX design, AI integration, and growth-focused digital marketing.",
    images: ["https://www.maldonite.com/images/twitter-card.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Maldonite",
    url: "https://www.maldonite.com",
    logo: "https://www.maldonite.com/images/logo.png",
    sameAs: [
      "https://twitter.com/maldoniteHQ", // Replace with your social profiles
      "https://www.linkedin.com/company/maldonite",
      // ... more social links
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-555-5555", // Replace with your phone number
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "en",
    },
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-white dark:bg-black">
        <ClientProvider>
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
          <RouteTransitionWrapper>
            <Navbar />
            {children}
            <Footer />
            <WhatsAppWidget />
            {/* <MaldoChat /> */}
          </RouteTransitionWrapper>
        </ClientProvider>
      </body>
    </html>
  );
}
