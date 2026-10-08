"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCareerPath, getPrimaryCareerPathForCourse } from "@/lib/career-paths";

// One smart "back" link: prefer the specific path the student actually
// came from (the ?path=<slug> a career-path page appends to its course
// links) over this course's own default path, since the same course sits
// inside several paths — but always land somewhere specific rather than
// the generic /careers index when we can tell which path makes sense.
export default function CoursePathBreadcrumb({ courseSlug }: { courseSlug: string }) {
  const searchParams = useSearchParams();
  const pathSlug = searchParams.get("path");
  const path = (pathSlug ? getCareerPath(pathSlug) : undefined) ?? getPrimaryCareerPathForCourse(courseSlug);

  return (
    <nav className="mb-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
      <Link
        href={path ? `/careers/${path.slug}` : "/careers"}
        className="text-stone underline underline-offset-4 hover:text-crimson"
      >
        ← {path ? path.title : "All career paths"}
      </Link>
    </nav>
  );
}
