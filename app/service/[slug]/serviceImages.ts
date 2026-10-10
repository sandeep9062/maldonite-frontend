// 🖼️ Service images sourced from the local `public/` folder, keyed by service slug.
// Keeps the service detail page fast & reliable (no dependency on CMS/remote URLs).

export const SERVICE_IMAGES_BY_SLUG: Record<string, string> = {
  "website-design-development": "/images/web-bg.png",
  "ecommerce-solutions": "/images/ecommerce-bg.png",
  "landing-pages-funnels": "/images/landing-bg.png",
  "ui-ux-audits": "/images/ux-bg.png",
  "saas-app-development": "/images/saas-bg.png",
  "ai-powered-web": "/images/ai-bg.png",
  "api-integration-automation": "/images/api-bg.png",
  "seo-digital-marketing": "/images/seo-bg.png",
  "branding-graphic-design": "/images/branding-bg.png",
  "web-hosting-maintenance": "/images/hosting-bg.png",
  "enterprise-solutions": "/images/enterprise-bg.png",
  "startup-tech-partner": "/images/startup-bg.png",
};

// Fallback used when a slug has no dedicated local image.
export const DEFAULT_SERVICE_IMAGE = "/images/maldonite.png";

/**
 * Resolve the public image path for a service slug.
 * Falls back to DEFAULT_SERVICE_IMAGE for unknown slugs.
 */
export function getServiceImageBySlug(slug?: string | null): string {
  if (slug && SERVICE_IMAGES_BY_SLUG[slug]) {
    return SERVICE_IMAGES_BY_SLUG[slug];
  }
  return DEFAULT_SERVICE_IMAGE;
}
