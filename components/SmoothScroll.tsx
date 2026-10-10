"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { EASING } from "@/lib/smooth-scroll";

/**
 * SmoothScroll — buttery, momentum-based page scrolling powered by Lenis.
 *
 * - Initialised once on mount (autoRaf handles the rAF loop, no manual loop needed)
 * - Respects `prefers-reduced-motion` (skips smoothing for users who opt out)
 * - Scrolls to top on route change so new pages never open mid-way down
 * - Handles `#anchor` links with an offset for the fixed navbar
 * - Exposes the instance as `window.__lenis` so helpers in `@/lib/smooth-scroll`
 *   (e.g. ScrollToTopButton) can call `lenis.scrollTo()` when available, with a
 *   native fallback.
 *
 * The `window.__lenis` slot, the shared EASING curve, and the programmatic
 * scroll helpers all live in `@/lib/smooth-scroll` (single source of truth).
 */

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 1) Create / destroy the Lenis instance once.
  useEffect(() => {
    // Accessibility: don't hijack scrolling for users who prefer reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.15,
      easing: EASING,
      smoothWheel: true,
      touchMultiplier: 1.5,
      // Native-like on touch for perf; wheel/trackpad gets the smoothing.
      syncTouch: false,
      anchors: true,
    });

    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  // 2) On route change: jump straight to top (no animated sweep across pages).
  //    If the URL has a #hash, smooth-scroll to that element instead,
  //    offsetting for the fixed navbar via --navbar-height.
  useEffect(() => {
    const hash = window.location.hash;
    const lenis = window.__lenis;

    if (hash) {
      // Wait a tick so the new page's DOM is painted before measuring.
      const id = requestAnimationFrame(() => {
        const el = document.querySelector(hash);
        if (el) {
          if (lenis) {
            const navOffset =
              parseInt(
                getComputedStyle(document.documentElement).getPropertyValue(
                  "--navbar-height",
                ),
              ) || 0;
            lenis.scrollTo(el as HTMLElement, {
              offset: -(navOffset + 12),
              duration: 1.2,
              easing: EASING,
            });
          } else {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        } else if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      });
      return () => cancelAnimationFrame(id);
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
