"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCareerPath } from "@/lib/career-paths";

// The persistent Student Learning Center bar already links back to
// /careers generally. This is the more specific link: when a course was
// reached by clicking through from one particular career path's page
// (the ?path=<slug> the career path page appends to its course links),
// show a second link back to that exact path — since the same course
// (T-SQL Development, say) sits inside almost every path, this can't be
// a fixed property of the course itself.
export default function CoursePathBreadcrumb() {
  const searchParams = useSearchParams();
  const pathSlug = searchParams.get("path");
  const path = pathSlug ? getCareerPath(pathSlug) : undefined;

  return (
    <nav className="mb-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
      <Link href="/careers" className="text-stone underline underline-offset-4 hover:text-crimson">
        ← All career paths
      </Link>
      {path && (
        <Link
          href={`/careers/${path.slug}`}
          className="text-stone underline underline-offset-4 hover:text-crimson"
        >
          ← {path.title}
        </Link>
      )}
    </nav>
  );
}
