"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Forces the page to the top on every route change. Next.js normally does
// this on its own, but that built-in scroll reset is unreliable inside an
// iframe embed (e.g. the Wix "embed a website by URL" widget), so we force
// it explicitly here instead of relying on it.
//
// `behavior: "instant"` is required, not cosmetic: app/globals.css sets
// `html { scroll-behavior: smooth }` globally (for in-page anchor links
// elsewhere on the site), and that CSS property applies to EVERY scroll API
// including the plain two-argument `scrollTo(0, 0)` this used to call — so
// on a long lesson page, "jump to top" became a slow, easily-interrupted
// animation that frequently never finished, which is exactly what students
// were reporting ("I have to scroll to the top myself every time"). Passing
// `behavior: "instant"` explicitly overrides the CSS smooth-scroll for just
// this call, same as `prefers-reduced-motion` already overrides it globally.
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
