"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Forces the page to the top on every route change. Next.js normally does
// this on its own, but that built-in scroll reset is unreliable inside an
// iframe embed (e.g. the Wix "embed a website by URL" widget), so we force
// it explicitly here instead of relying on it.
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
