// app/sitemap.xml/route.ts
// Comprehensive sitemap generator for Maldonite website
// Fetches dynamic content (blogs, projects, services, products) and combines with static pages

import { NextResponse } from "next/server";

const WEBSITE_URL = "https://www.maldonite.com";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
}

interface BlogPost {
  slug: string;
  updatedAt: string;
}

interface ProjectItem {
  slug: string;
  updatedAt: string;
}

interface ServiceItem {
  slug: string;
  updatedAt?: string;
}

interface ProductItem {
  slug: string;
  updatedAt: string;
}

// Server-side fetch functions
async function fetchFromApi(endpoint: string) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!res.ok) {
      console.error(`Sitemap fetch failed for ${endpoint}: ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error(`Sitemap fetch error for ${endpoint}:`, error);
    return null;
  }
}

async function getBlogs(): Promise<BlogPost[]> {
  const data = await fetchFromApi("/api/v1/blogs");
  // API response structure: { blogs: BlogPost[] }
  return data?.blogs ?? [];
}

async function getProjects(): Promise<ProjectItem[]> {
  const data = await fetchFromApi("/api/v1/projects");
  // API might return direct array or { projects: ProjectItem[] }
  if (Array.isArray(data)) return data;
  return data?.projects ?? [];
}

async function getServices(): Promise<ServiceItem[]> {
  const data = await fetchFromApi("/api/v1/services");
  // API response structure: { services: ServiceItem[] }
  return data?.services ?? [];
}

async function getProducts(): Promise<ProductItem[]> {
  const data = await fetchFromApi("/api/v1/products");
  // API might return direct array or need transformation
  return data?.products ?? data ?? [];
}

export async function GET() {
  const lastModDate = new Date().toISOString();

  // Fetch all dynamic data in parallel
  const [blogs, projects, services, products] = await Promise.all([
    getBlogs(),
    getProjects(),
    getServices(),
    getProducts(),
  ]);

  // --- Static Pages ---
  const staticPages: SitemapEntry[] = [
    {
      url: WEBSITE_URL,
      lastModified: lastModDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${WEBSITE_URL}/about`,
      lastModified: lastModDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${WEBSITE_URL}/services`,
      lastModified: lastModDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${WEBSITE_URL}/portfolio`,
      lastModified: lastModDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${WEBSITE_URL}/projects`,
      lastModified: lastModDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${WEBSITE_URL}/blog`,
      lastModified: lastModDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${WEBSITE_URL}/contact`,
      lastModified: lastModDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${WEBSITE_URL}/quote`,
      lastModified: lastModDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${WEBSITE_URL}/products`,
      lastModified: lastModDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${WEBSITE_URL}/service`,
      lastModified: lastModDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // --- Dynamic Blog Pages ---
  const blogEntries: SitemapEntry[] = Array.isArray(blogs)
    ? blogs.map((blog: BlogPost) => ({
        url: `${WEBSITE_URL}/blog/${blog.slug}`,
        lastModified: blog.updatedAt
          ? new Date(blog.updatedAt).toISOString()
          : lastModDate,
        changeFrequency: "weekly",
        priority: 0.7,
      }))
    : [];

  // --- Dynamic Project Pages ---
  const projectEntries: SitemapEntry[] = Array.isArray(projects)
    ? projects.map((project: ProjectItem) => ({
        url: `${WEBSITE_URL}/projects/${project.slug}`,
        lastModified: project.updatedAt
          ? new Date(project.updatedAt).toISOString()
          : lastModDate,
        changeFrequency: "weekly",
        priority: 0.8,
      }))
    : [];

  // --- Dynamic Service Pages ---
  const serviceEntries: SitemapEntry[] = Array.isArray(services)
    ? services.map((service: ServiceItem) => ({
        url: `${WEBSITE_URL}/services/${service.slug}`,
        lastModified: service.updatedAt
          ? new Date(service.updatedAt).toISOString()
          : lastModDate,
        changeFrequency: "monthly",
        priority: 0.8,
      }))
    : [];

  // --- Dynamic Service Pages (under /service/[slug] route) ---
  const serviceAltEntries: SitemapEntry[] = Array.isArray(services)
    ? services.map((service: ServiceItem) => ({
        url: `${WEBSITE_URL}/service/${service.slug}`,
        lastModified: service.updatedAt
          ? new Date(service.updatedAt).toISOString()
          : lastModDate,
        changeFrequency: "monthly",
        priority: 0.7,
      }))
    : [];

  // --- Dynamic Product Pages ---
  const productEntries: SitemapEntry[] = Array.isArray(products)
    ? products.map((product: ProductItem) => ({
        url: `${WEBSITE_URL}/products/${product.slug}`,
        lastModified: product.updatedAt
          ? new Date(product.updatedAt).toISOString()
          : lastModDate,
        changeFrequency: "weekly",
        priority: 0.7,
      }))
    : [];

  // Combine all entries
  const allEntries = [
    ...staticPages,
    ...blogEntries,
    ...projectEntries,
    ...serviceEntries,
    ...serviceAltEntries,
    ...productEntries,
  ];

  // Generate the XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allEntries
        .map(
          (entry) => `
        <url>
          <loc>${entry.url}</loc>
          <lastmod>${entry.lastModified}</lastmod>
          <changefreq>${entry.changeFrequency}</changefreq>
          <priority>${entry.priority.toFixed(1)}</priority>
        </url>`,
        )
        .join("")}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
