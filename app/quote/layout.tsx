import type { Metadata } from 'next';
import React from 'react';

// Define metadata for the Quote/Inquiry page
export const metadata: Metadata = {
  title: 'Get a Custom Quote | Maldonite',
  description: 'Request a free, no-obligation quote for your next project. Tell us about your web development, AI integration, or digital marketing needs, and we\'ll provide a detailed and transparent estimate.',
  keywords: [
    'get a quote',
    'project quote',
    'request for proposal',
    'web development quote',
    'AI project cost',
    'digital marketing pricing',
    'Maldonite quote',
    'contact for project',
    'free consultation'
  ],
  openGraph: {
    title: 'Get a Custom Quote | Maldonite',
    description: 'Request a free, no-obligation quote for your next project. Tell us about your web development, AI integration, or digital marketing needs, and we\'ll provide a detailed and transparent estimate.',
    url: 'https://www.maldonite.com/quote', // Ensure this matches your actual URL
    siteName: 'Maldonite',
    images: [
      {
        url: 'https://www.maldonite.com/images/og-image-quote.jpg', // A relevant image for the quote page (e.g., a hand on a keyboard, a document with a golden pen)
        width: 1200,
        height: 630,
        alt: 'Maldonite Custom Quote Request',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get a Custom Quote | Maldonite',
    description: 'Request a free, no-obligation quote for your next project. Tell us about your web development, AI integration, or digital marketing needs, and we\'ll provide a detailed and transparent estimate.',
    images: ['https://www.maldonite.com/images/twitter-card-quote.jpg'], // A relevant image for Twitter shares
    creator: '@maldoniteHQ',
  },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* The actual Quote component (now page.tsx) will be rendered as children */}
      {children}
    </section>
  );
}
