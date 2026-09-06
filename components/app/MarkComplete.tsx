"use client";

import { useEffect, useState } from "react";

/*
 * Progress lives in localStorage until accounts exist; the same keys will
 * seed the lesson_progress table when the backend lands.
 * Also records "last visited" so the dashboard can offer Continue.
 */
export default function MarkComplete({
  storageKey,
  lessonHref,
  lessonTitle,
  courseSlug,
}: {
  storageKey: string;
  lessonHref: string;
  lessonTitle: string;
  courseSlug: string;
}) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      setDone(Boolean(localStorage.getItem(storageKey)));
      localStorage.setItem(
        "ltv:last-lesson",
        JSON.stringify({ href: lessonHref, title: lessonTitle, courseSlug, at: Date.now() })
      );
    } catch {}
  }, [storageKey, lessonHref, lessonTitle, courseSlug]);

  function toggle() {
    try {
      if (done) localStorage.removeItem(storageKey);
      else localStorage.setItem(storageKey, String(Date.now()));
    } catch {}
    setDone(!done);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`rounded-[2px] px-6 py-3 text-sm font-semibold transition-colors ${
        done
          ? "bg-gold text-crimson-deep hover:bg-gold-pale"
          : "bg-crimson text-parchment hover:bg-crimson-deep"
      }`}
    >
      {done ? "✓ Completed — tap to undo" : "Mark lesson complete"}
    </button>
  );
}
