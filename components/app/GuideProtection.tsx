"use client";

import { useEffect } from "react";

// Blocks copy/cut and right-click specifically on the lesson guide text, on
// top of the CSS user-select: none on .book-page. Neither layer stops a
// determined person (view-source, reader mode, a screenshot), but together
// they remove the casual "select, copy, paste" path.
export default function GuideProtection() {
  useEffect(() => {
    const guide = document.querySelector(".book-page");
    if (!guide) return;

    const block = (e: Event) => e.preventDefault();
    guide.addEventListener("copy", block);
    guide.addEventListener("cut", block);
    guide.addEventListener("contextmenu", block);

    return () => {
      guide.removeEventListener("copy", block);
      guide.removeEventListener("cut", block);
      guide.removeEventListener("contextmenu", block);
    };
  }, []);

  return null;
}
