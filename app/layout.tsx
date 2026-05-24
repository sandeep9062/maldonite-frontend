import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientProvider from "./ClientProvider";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Maldonite | Full-Stack Development, AI, and Digital Solutions",
    template: "%s | Maldonite",
  },
  metadataBase: new URL("https://www.maldonite.com"),
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
        url: "https://www.maldonite.com/images/og-image.jpg",
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
    site: "@maldoniteHQ",
    creator: "@maldoniteHQ",
    title: "Maldonite | Full-Stack Development, AI, and Digital Solutions",
    description:
      "Maldonite specializes in crafting scalable software and digital products for startups and enterprises.",
    images: ["https://www.maldonite.com/images/twitter-card.jpg"],
  },
  alternates: {
    canonical: "https://www.maldonite.com",
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
      "https://twitter.com/maldoniteHQ",
      "https://www.linkedin.com/company/maldonite",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-555-5555",
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "en",
    },
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Preconnect to critical origins for faster resource loading */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="bg-white dark:bg-black">
        <ClientProvider>
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
          <BreadcrumbSchema />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppWidget />
        </ClientProvider>
      </body>
    </html>
  );
}
