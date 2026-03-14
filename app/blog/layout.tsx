import type { Metadata } from 'next';
import React from 'react';

// Define metadata for the Blog section
export const metadata: Metadata = {
  title: 'Maldonite Blog | Insights on SaaS, AI, Web Dev & Marketing',
  description: 'Explore the Maldonite blog for deep dives, expert insights, and articles on SaaS development, AI integration, UI/UX design, web development trends, SEO strategies, and startup growth.',
  keywords: [
    'Maldonite blog',
    'tech insights',
    'SaaS articles',
    'AI development blog',
    'web development blog',
    'UI/UX trends',
    'SEO strategies',
    'digital marketing insights',
    'startup growth',
    'MERN stack insights',
    'Next.js blog',
    'cloud & DevOps',
    'case studies'
  ],
  openGraph: {
    title: 'Maldonite Blog | Insights on SaaS, AI, Web Dev & Marketing',
    description: 'Explore the Maldonite blog for deep dives, expert insights, and articles on SaaS development, AI integration, UI/UX design, web development trends, SEO strategies, and startup growth.',
    url: 'https://www.maldonite.com/blog',
    siteName: 'Maldonite Blog',
    images: [
      {
        url: 'https://www.maldonite.com/images/og-image-blog.jpg', // A generic, eye-catching image for the blog home page
        width: 1200,
        height: 630,
        alt: 'Maldonite Blog - Latest Tech Insights',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maldonite Blog | Insights on SaaS, AI, Web Dev & Marketing',
    description: 'Explore the Maldonite blog for deep dives, expert insights, and articles on SaaS development, AI integration, UI/UX design, web development trends, SEO strategies, and startup growth.',
    images: ['https://www.maldonite.com/images/twitter-card-blog.jpg'], // A generic image for Twitter shares
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Any blog-specific UI that should wrap all blog pages can go here.
          For example, a banner, a sidebar with popular posts, or navigation specific to the blog.
          For now, we'll just render the children. */}
      {children}
    </section>
  );
}