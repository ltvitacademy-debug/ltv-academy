"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getPrimaryCareerPathForCourse } from "@/lib/career-paths";

export default function LearningCenterBar() {
  // Always shown, even in embed mode (?embed=1) — this is the only way
  // back out once a viewer is a few lessons deep inside the iframe.
  // On any page under a specific course (course home, a lesson, the final
  // test, guided practice, flashcards), this falls back to that course's
  // own career path instead of the generic index — a student mid-course
  // almost always means "back to my path," not "show me all 23 paths."
  const pathname = usePathname();
  const courseSlug = pathname?.match(/^\/app\/courses\/([^/]+)/)?.[1];
  const path = courseSlug ? getPrimaryCareerPathForCourse(courseSlug) : undefined;

  return (
    <div className="border-b border-ink/10 bg-parchment">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <p className="eyebrow">Student Learning Center</p>
        <Link
          href={path ? `/careers/${path.slug}` : "/careers"}
          className="text-sm text-stone underline underline-offset-4 hover:text-crimson"
        >
          {path ? `← ${path.title}` : "← All career paths"}
        </Link>
      </div>
    </div>
  );
}
