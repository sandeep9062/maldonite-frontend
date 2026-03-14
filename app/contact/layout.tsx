import type { Metadata } from 'next';
import React from 'react';

// Define metadata for the Contact Us page
export const metadata: Metadata = {
  title: 'Contact Maldonite | Get a Free Consultation & Quote',
  description: 'Reach out to Maldonite for expert full-stack web development, AI integration, UI/UX design, and digital marketing services. Get in touch for a free consultation, project quote, or partnership inquiry.',
  keywords: [
    'contact Maldonite',
    'Maldonite contact us',
    'get a web development quote',
    'AI project consultation',
    'digital marketing inquiry',
    'software agency contact',
    'tech partnership',
    'Maldonite email',
    'Maldonite phone number',
    'request a demo'
  ],
  openGraph: {
    title: 'Contact Maldonite | Get a Free Consultation & Quote',
    description: 'Reach out to Maldonite for expert full-stack web development, AI integration, UI/UX design, and digital marketing services. Get in touch for a free consultation, project quote, or partnership inquiry.',
    url: 'https://www.maldonite.com/contact',
    siteName: 'Maldonite',
    images: [
      {
        url: 'https://www.maldonite.com/images/og-image-contact.jpg', // A relevant image for the contact page (e.g., a hand reaching out, a contact form graphic, or your office)
        width: 1200,
        height: 630,
        alt: 'Contact Maldonite for Digital Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website', // or 'organization' if you prefer
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Maldonite | Get a Free Consultation & Quote',
    description: 'Reach out to Maldonite for expert full-stack web development, AI integration, UI/UX design, and digital marketing services. Get in touch for a free consultation, project quote, or partnership inquiry.',
    images: ['https://www.maldonite.com/images/twitter-card-contact.jpg'], // A relevant image for Twitter shares
    creator: '@maldoniteHQ', // Your Twitter handle
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* The actual Contact component (now page.tsx) will be rendered as children */}
      {children}
    </section>
  );
}
