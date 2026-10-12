import Link from "next/link";
import { notFound } from "next/navigation";
import { CAREER_PATHS, getCareerPath } from "@/lib/career-paths";
import { loadLearningPlanner, hasLearningPlanner } from "@/lib/learningPlanner";
import LearningPlannerView from "@/components/app/LearningPlanner";

export function generateStaticParams() {
  return CAREER_PATHS.filter((p) => hasLearningPlanner(p.slug)).map((p) => ({ path: p.slug }));
}

export default async function LearningPlannerPage({ params }: { params: Promise<{ path: string }> }) {
  const { path: pathSlug } = await params;
  const careerPath = getCareerPath(pathSlug);
  if (!careerPath) notFound();

  const plan = loadLearningPlanner(pathSlug);
  if (!plan) notFound();

  const totalMonths = Math.ceil(plan.totalHours / (plan.hoursPerWeek * 4));
  const totalCourses = new Set(plan.slots.map((s) => s.courseSlug)).size;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app" className="hover:text-crimson">
          Learning center
        </Link>
        {" · "}
        <Link href={`/careers/${careerPath.slug}`} className="hover:text-crimson">
          {careerPath.title}
        </Link>
        {" · "}
        <span>{plan.totalWeeks}-week planner</span>
      </nav>

      <p className="eyebrow mb-3">{plan.totalWeeks}-Week Learning Planner</p>
      <h1 className="display text-3xl sm:text-4xl">
        {careerPath.title} <span className="text-crimson">schedule</span>
      </h1>
      <p className="mt-4 max-w-2xl text-stone">
        {plan.totalWeeks} weeks · {plan.studyDaysPerWeek} study days/week, Monday–Friday · {plan.hoursPerDay}{" "}
        hours/day · {plan.hoursPerWeek} hours/week · {plan.totalHours} scheduled hours total, built from every real
        lesson in {plan.workloadAudit.totalLessons} lessons across the program&apos;s {totalCourses} Job-Ready
        courses.
      </p>

      <div className="mt-5 rounded-[2px] border border-ink/15 bg-white/30 p-4 text-sm text-stone">
        <p>
          <span className="font-semibold text-ink">Workload check:</span> real recorded video across all{" "}
          {plan.workloadAudit.totalLessons} lessons totals about {plan.workloadAudit.realVideoHours} hours —{" "}
          {plan.workloadAudit.lessonsWithEstimatedDuration} of those lessons (mostly conceptual career-prep lessons)
          don&apos;t have a recording yet, so their time is a labeled estimate. The remaining{" "}
          {plan.workloadAudit.practiceAndLabHours} hours of the {plan.totalHours}-hour schedule are real, scheduled
          guided practice, labs, and the capstone build — not more video. A 3-minute lesson is never counted as a
          1-hour session on its own.
        </p>
        {plan.excludedCourses.length > 0 && (
          <p className="mt-2">
            <span className="font-semibold text-ink">Not in this {totalMonths}-month plan:</span>{" "}
            {plan.excludedCourses.map((c) => c.title).join(", ")} — {plan.excludedCourses[0].reason}
          </p>
        )}
        <p className="mt-2">
          Progress below is saved on this device (the same way lesson completion already works across the site).
          There&apos;s no account system yet, so it won&apos;t follow you to a different browser or device — that
          needs real accounts, which this platform doesn&apos;t have built yet.
        </p>
      </div>

      <div className="mt-8">
        <LearningPlannerView plan={plan} />
      </div>
    </main>
  );
}
