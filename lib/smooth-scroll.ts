import type Lenis from "lenis";

/**
 * smooth-scroll.ts — the single source of truth for programmatic smooth scrolling.
 *
 * The Lenis instance is created by <SmoothScroll /> (mounted once in the root
 * layout) and stashed on `window.__lenis`. Any component that needs to scroll
 * imperatively — the ScrollToTopButton, "Get a quote" CTAs, anchor links, etc. —
 * should call the helpers here instead of touching the instance directly.
 *
 * Each helper uses the live Lenis instance when it exists (smooth, momentum
 * scrolling) and gracefully falls back to native scrolling otherwise (before
 * mount, after destroy, or when the user prefers reduced motion and Lenis was
 * intentionally skipped).
 */

// The live Lenis instance. Typed via the package's own default export so
// callers get full IntelliSense on `scrollTo(...)` options. Declared here only
// (single source of truth) — <SmoothScroll /> imports this module, so it picks
// up the same global type without re-declaring it.
declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

// Ease-out expo — fast start, soft landing. Feels premium without being floaty.
// Kept in sync with <SmoothScroll /> (which passes it to the instance too).
export const EASING = (t: number): number =>
  Math.min(1, 1.001 - Math.pow(2, -10 * t));

/** Returns the active Lenis instance, or null when smoothing is unavailable. */
export function getLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  return window.__lenis ?? null;
}

/**
 * Smooth-scroll back to the very top of the page.
 * Used by the ScrollToTopButton.
 */
export function scrollToTop(): void {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.2, easing: EASING });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/**
 * Smooth-scroll to an element (or CSS selector), offsetting for the fixed
 * navbar via the `--navbar-height` custom property so `#hash` anchors aren't
 * hidden underneath it. Falls back to native smooth scrolling without Lenis.
 */
export function scrollToElement(
  target: string | HTMLElement,
  { gap = 12, duration = 1.2 }: { gap?: number; duration?: number } = {},
): void {
  const lenis = getLenis();
  const el =
    typeof target === "string" ? document.querySelector(target) : target;

  if (!el) {
    scrollToTop();
    return;
  }

  if (lenis) {
    const navOffset =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--navbar-height",
        ),
      ) || 0;
    lenis.scrollTo(el as HTMLElement, {
      offset: -(navOffset + gap),
      duration,
      easing: EASING,
    });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
