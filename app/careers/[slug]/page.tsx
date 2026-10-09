import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CAREER_PATHS, getCareerPath } from "@/lib/career-paths";
import { hasInterviewBank } from "@/lib/interviewPrep";
import PathDetailRedesign from "@/components/careers/PathDetailRedesign";

export function generateStaticParams() {
  return CAREER_PATHS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = getCareerPath(slug);
  if (!path) return {};
  return {
    title: path.title,
    description: path.description,
  };
}

export default async function CareerPathPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = getCareerPath(slug);
  if (!path) notFound();

  return <PathDetailRedesign path={path} hasInterviewPrep={hasInterviewBank(path.slug)} />;
}
