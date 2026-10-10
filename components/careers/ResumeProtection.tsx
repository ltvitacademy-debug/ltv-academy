"use client";

import { useEffect } from "react";

// Blocks copy/cut and right-click specifically on the sample resume text, on
// top of the CSS user-select: none on .resume-page. Same pattern as
// GuideProtection.tsx for lesson guides. Neither layer stops a determined
// person (view-source, reader mode, a screenshot), but together they remove
// the casual "select, copy, paste into my own resume" path.
export default function ResumeProtection() {
  useEffect(() => {
    const resume = document.querySelector(".resume-page");
    if (!resume) return;

    const block = (e: Event) => e.preventDefault();
    resume.addEventListener("copy", block);
    resume.addEventListener("cut", block);
    resume.addEventListener("contextmenu", block);

    return () => {
      resume.removeEventListener("copy", block);
      resume.removeEventListener("cut", block);
      resume.removeEventListener("contextmenu", block);
    };
  }, []);

  return null;
}
