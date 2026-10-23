import Link from "next/link";
import { notFound } from "next/navigation";
import { CAREER_PATHS, getCareerPath } from "@/lib/career-paths";
import { loadPathResources, getPathDownloadAllHref, hasPathResourceVault } from "@/lib/pathResourceVault";
import ResourceVaultList from "@/components/app/ResourceVaultList";
import { DownloadIcon } from "@/components/app/DashboardIcons";

export function generateStaticParams() {
  return CAREER_PATHS.filter((p) => hasPathResourceVault(p.slug)).map((p) => ({ path: p.slug }));
}

export default async function PathResourceVaultPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path: pathSlug } = await params;
  const careerPath = getCareerPath(pathSlug);
  if (!careerPath) notFound();

  const resources = loadPathResources(pathSlug);
  if (resources.length === 0) notFound();
  const downloadAllHref = getPathDownloadAllHref(pathSlug);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app" className="hover:text-crimson">
          Learning center
        </Link>
        {" · "}
        <Link href={`/careers/${careerPath.slug}`} className="hover:text-crimson">
          {careerPath.title}
        </Link>
        {" · "}
        <span>Resource Vault</span>
      </nav>

      <p className="eyebrow mb-3">
        Path Resource Vault · {resources.length} resource{resources.length === 1 ? "" : "s"}
      </p>
      <h1 className="display text-3xl sm:text-4xl">{careerPath.title}</h1>
      <p className="mt-4 max-w-2xl text-stone">
        Reference diagrams and materials that apply across the whole {careerPath.title} path — not tied to
        any single course, so they&apos;re here no matter which course you&apos;re currently on.
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
          href={`/careers/${careerPath.slug}`}
          className="text-sm font-semibold text-stone hover:text-crimson"
        >
          ← Back to {careerPath.title}
        </Link>
      </div>
    </main>
  );
}
