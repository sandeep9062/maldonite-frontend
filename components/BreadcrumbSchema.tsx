"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const breadcrumbMap: Record<string, { name: string; path: string }[]> = {
  "/": [{ name: "Home", path: "/" }],
  "/about": [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ],
  "/services": [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ],
  "/portfolio": [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
  ],
  "/blog": [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ],
  "/projects": [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
  ],
  "/products": [
    { name: "Home", path: "/" },
    { name: "SaaS Products", path: "/products" },
  ],
  "/contact": [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ],
  "/quote": [
    { name: "Home", path: "/" },
    { name: "Get a Quote", path: "/quote" },
  ],
};

export default function BreadcrumbSchema() {
  const pathname = usePathname();

  // Check if this is a known static page
  const staticBreadcrumb = breadcrumbMap[pathname];
  if (staticBreadcrumb) {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: staticBreadcrumb.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `https://www.maldonite.com${item.path}`,
      })),
    };

    return (
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    );
  }

  // For dynamic pages (blog posts, services, projects, products)
  // Generate breadcrumb from the path segments
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length >= 2) {
    const items: { name: string; path: string }[] = [
      { name: "Home", path: "/" },
    ];

    let currentPath = "";
    for (let i = 0; i < segments.length; i++) {
      currentPath += `/${segments[i]}`;
      // Capitalize and format the segment name
      const name = segments[i]
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      items.push({ name, path: currentPath });
    }

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `https://www.maldonite.com${item.path}`,
      })),
    };

    return (
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    );
  }

  return null;
}
