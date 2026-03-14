// app/sitemap.xml/route.ts
// This file dynamically generates your sitemap.xml.
// It's a Route Handler, acting like an API endpoint that returns XML.

// IMPORTANT: Ensure your 'services' data and 'blogs' data are accessible server-side.
// If they rely on client-side hooks, you'll need to create server-side
// functions to fetch this data (e.g., direct API calls or database queries).

import { NextResponse } from 'next/server';
// Assuming 'services' data is available for server-side import
import { services } from '../services/services-data'; // Adjust path as necessary

// Server-side function to fetch blog data
async function getBlogsServerSide() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/blogs`);
  if (!res.ok) {
    throw new Error('Failed to fetch blogs for sitemap');
  }
  const data = await res.json();
  return data.blogs;
}

// Server-side function to fetch project data
async function getProjectsServerSide() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/projects`);
  if (!res.ok) {
    throw new Error('Failed to fetch projects for sitemap');
  }
  const data = await res.json();
  return data.projects; // Assuming the API returns { projects: [...] }
}

interface Blog {
  slug: string;
  updatedAt: string;
}

interface Project {
  slug: string;
  updatedAt: string;
}

interface Service {
  slug: string;
}

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
}

// Define your base URL
const WEBSITE_URL = 'https://www.maldonite.com';

export async function GET() {
  const lastModDate = new Date().toISOString(); // Use current date for last modification

  // Fetch dynamic data for blogs and services
  let blogEntries: SitemapEntry[] = [];
  try {
    const blogs = await getBlogsServerSide(); // Fetch your actual blog data
    blogEntries = blogs.map((blog: Blog) => ({
      url: `${WEBSITE_URL}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7, // Adjust priority based on importance
    }));
  } catch (error) {
    console.error('Failed to fetch blogs for sitemap:', error);
    // Optionally, handle error by not including blogs or logging it
  }

  let projectEntries: SitemapEntry[] = [];
  try {
    const projects = await getProjectsServerSide(); // Fetch your actual project data
    if (Array.isArray(projects)) {
      projectEntries = projects.map((project: Project) => ({
        url: `${WEBSITE_URL}/projects/${project.slug}`,
        lastModified: new Date(project.updatedAt).toISOString(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch projects for sitemap:', error);
  }

  const serviceEntries = services.map((service: Service) => ({
    url: `${WEBSITE_URL}/services/${service.slug}`,
    lastModified: lastModDate, // Use a consistent date or service-specific last updated date
    changeFrequency: 'monthly', // Services might not change as frequently as blogs
    priority: 0.8,
  }));

  // Define static pages
  const staticPages = [
    {
      url: `${WEBSITE_URL}/`,
      lastModified: lastModDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${WEBSITE_URL}/about`,
      lastModified: lastModDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${WEBSITE_URL}/services`,
      lastModified: lastModDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${WEBSITE_URL}/portfolio`, // Assuming you have a /portfolio route
      lastModified: lastModDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${WEBSITE_URL}/projects`,
      lastModified: lastModDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${WEBSITE_URL}/blog`, // Main blog listing page
      lastModified: lastModDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${WEBSITE_URL}/contact`,
      lastModified: lastModDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Add any other static pages here
  ];

  // Combine all entries
  const allEntries = [...staticPages, ...serviceEntries, ...blogEntries, ...projectEntries];

  // Generate the XML string for the sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allEntries
        .map(
          (entry) => `
        <url>
          <loc>${entry.url}</loc>
          <lastmod>${entry.lastModified}</lastmod>
          <changefreq>${entry.changeFrequency}</changefreq>
          <priority>${entry.priority}</priority>
        </url>
      `
        )
        .join('')}
    </urlset>`;

  // Return the XML sitemap with appropriate headers
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200', // Cache for 24 hours
    },
  });
}
