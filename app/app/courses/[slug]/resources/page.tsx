import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, getCourse } from "@/lib/courses";
import { loadCourseResources, getDownloadAllHref, hasResourceVault } from "@/lib/resourceVault";
import ResourceVaultList from "@/components/app/ResourceVaultList";
import { DownloadIcon } from "@/components/app/DashboardIcons";

export function generateStaticParams() {
  return COURSES.filter((c) => c.chapters && hasResourceVault(c)).map((c) => ({ slug: c.slug }));
}

export default async function CourseResourceVaultPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course || !course.chapters) notFound();

  const resources = loadCourseResources(course);
  if (resources.length === 0) notFound();
  const downloadAllHref = getDownloadAllHref(course);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app" className="hover:text-crimson">
          Learning center
        </Link>
        {" · "}
        <Link href={`/app/courses/${course.slug}`} className="hover:text-crimson">
          {course.title}
        </Link>
        {" · "}
        <span>Resource Vault</span>
      </nav>

      <p className="eyebrow mb-3">
        Resource Vault · {resources.length} resource{resources.length === 1 ? "" : "s"}
      </p>
      <h1 className="display text-3xl sm:text-4xl">{course.title}</h1>
      <p className="mt-4 max-w-2xl text-stone">
        Datasets, templates, scripts, and reference materials pulled directly from this
        course&apos;s own lessons — download what you need for the labs and worked examples below.
      </p>

      {downloadAllHref && (
        <a
          href={downloadAllHref}
          download
          className="mt-6 inline-flex items-center gap-2 rounded-[2px] border-2 border-crimson bg-gold-pale px-5 py-2.5 text-sm font-semibold text-crimson-deep hover:border-crimson-deep"
        >
          <DownloadIcon className="h-4 w-4" />
          Download all {resources.length} files (.zip)
        </a>
      )}

      <div className="mt-10 border-t-2 border-gold pt-8">
        <ResourceVaultList resources={resources} />
      </div>

      <div className="mt-14 border-t border-ink/15 pt-6">
        <Link
          href={`/app/courses/${course.slug}`}
          className="text-sm font-semibold text-stone hover:text-crimson"
        >
          ← Back to {course.title}
        </Link>
      </div>
    </main>
  );
}
