// 🖼️ SaaS product images sourced from the local `public/` folder, keyed by product slug.
// Keeps the products pages fast & reliable (no dependency on CMS/remote URLs).

export const PRODUCT_IMAGES_BY_SLUG: Record<string, string> = {
  "real-estate-crm": "/images/real-estate-crm.jpg",
  "healthtech-portal": "/images/healthtech-portal.jpg",
  "retail-saas-pos": "/images/retail-saas-pos.jpg",
  "ai-assistant-bot": "/images/ai-assistant-bot.jpg",
  "edusaas-lms": "/images/edusaas-lms.jpg",
};

// Fallback used when a slug has no dedicated local image.
export const DEFAULT_PRODUCT_IMAGE = "/images/maldonite.png";

/**
 * Resolve the public image path for a product slug.
 * Falls back to DEFAULT_PRODUCT_IMAGE for unknown slugs.
 */
export function getProductImageBySlug(slug?: string | null): string {
  if (slug && PRODUCT_IMAGES_BY_SLUG[slug]) {
    return PRODUCT_IMAGES_BY_SLUG[slug];
  }
  return DEFAULT_PRODUCT_IMAGE;
}
