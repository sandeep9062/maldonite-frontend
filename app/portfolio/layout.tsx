import type { Metadata } from 'next';
import React from 'react';

// Define metadata for the Portfolio/Our Work page
export const metadata: Metadata = {
  title: 'Maldonite Portfolio | Our Work, Products & Milestones',
  description: 'Explore Maldonite\'s portfolio of successful projects, innovative products, and key company milestones. See how we deliver scalable full-stack development, AI solutions, and digital excellence for our clients.',
  keywords: [
    'Maldonite portfolio',
    'our work',
    'tech projects',
    'software development case studies',
    'web development portfolio',
    'AI solutions showcase',
    'Maldonite products',
    'company milestones',
    'digital solutions examples'
  ],
  openGraph: {
    title: 'Maldonite Portfolio | Our Work, Products & Milestones',
    description: 'Explore Maldonite\'s portfolio of successful projects, innovative products, and key company milestones. See how we deliver scalable full-stack development, AI solutions, and digital excellence for our clients.',
    url: 'https://www.maldonite.com/portfolio', // Make sure this matches your actual URL
    siteName: 'Maldonite',
    images: [
      {
        url: 'https://www.maldonite.com/images/og-image-portfolio.jpg', // A relevant image for the portfolio page (e.g., a collage of project screenshots, team working)
        width: 1200,
        height: 630,
        alt: 'Maldonite Portfolio - Digital Projects Showcase',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maldonite Portfolio | Our Work, Products & Milestones',
    description: 'Explore Maldonite\'s portfolio of successful projects, innovative products, and key company milestones. See how we deliver scalable full-stack development, AI solutions, and digital excellence for our clients.',
    images: ['https://www.maldonite.com/images/twitter-card-portfolio.jpg'], // A relevant image for Twitter shares
    creator: '@maldoniteHQ', // Your Twitter handle
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* The actual page component (now page.tsx) will be rendered as children */}
      {children}
    </section>
  );
}
