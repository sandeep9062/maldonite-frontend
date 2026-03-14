import type { Metadata } from 'next';
import React from 'react';

// Define metadata for the About page
export const metadata: Metadata = {
  title: 'About Maldonite - Our Story & Mission',
  description: 'Learn about Maldonite, our mission to build scalable software and digital products. Discover our story, values, and what makes us a leading partner in web development, AI integration, and digital marketing.',
  keywords: ['About Maldoninte', 'Maldonite team', 'our story', 'company mission', 'software development company', 'web design agency', 'digital marketing agency', 'tech partner'],
  openGraph: {
    title: 'About Maldonite - Our Story & Mission',
    description: 'Learn about Maldonite, our mission to build scalable software and digital products. Discover our story, values, and what makes us a leading partner in web development, AI integration, and digital marketing.',
    url: 'https://www.madlonite.com/about', // Replace with your actual URL
    type: 'website',
    images: [
      {
        url: 'https://www.maldonite.com/images/og-image-about.jpg', // Replace with your Open Graph image
        width: 1200,
        height: 630,
        alt: 'Maldonite Office & Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Maldonite - Our Story & Mission',
    description: 'Learn about Maldonite, our mission to build scalable software and digital products. Discover our story, values, and what makes us a leading partner in web development, AI integration, and digital marketing.',
    images: ['https://www.maldonite.com/images/twitter-card-about.jpg'], // Replace with your Twitter Card image
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
}