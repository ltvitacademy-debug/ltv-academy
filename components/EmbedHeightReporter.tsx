"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// This site is embedded on the live Wix site via a fixed-height iframe
// ("Self Study Courses" page -> HTML embed of /careers). Wix has no way to
// know how tall our content actually is, so a short page leaves blank space
// below it and a long page gets clipped. We report our real height to the
// parent frame on every navigation and whenever the content's height
// changes, and ask the parent to scroll back to the top of the embed on
// navigation (the embed's own scroll position resets via ScrollToTop, but
// the WIX PAGE's scroll position does not, and only the parent page can fix
// that). The companion code lives in Wix Velo on the embedding page.
const MESSAGE_TYPE = "ltv-embed-resize";

export default function EmbedHeightReporter() {
  const pathname = usePathname();
  const lastHeight = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined" || window.parent === window) return;

    function reportHeight(scrollToTop: boolean) {
      const height = document.documentElement.scrollHeight;
      if (!scrollToTop && height === lastHeight.current) return;
      lastHeight.current = height;
      window.parent.postMessage({ type: MESSAGE_TYPE, height, scrollToTop }, "*");
    }

    function onResize() {
      reportHeight(false);
    }

    // Report immediately on navigation, then again a few times as fonts,
    // images, and client-rendered content finish settling.
    reportHeight(true);
    const settleTimers = [100, 400, 1000, 2000].map((ms) =>
      window.setTimeout(() => reportHeight(false), ms)
    );

    const observer = new ResizeObserver(() => reportHeight(false));
    observer.observe(document.documentElement);
    window.addEventListener("resize", onResize);

    return () => {
      settleTimers.forEach((id) => window.clearTimeout(id));
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  return null;
}
