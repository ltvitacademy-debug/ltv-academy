"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getSessionAccessToken } from "@/lib/mockInterviewClientAuth";

type CategoryScores = { technicalKnowledge: number; projectOwnership: number; scenarioReasoning: number; communication: number };
type DetailedAnswer = {
  itemId: string;
  itemType: "competency" | "technical-question" | "project-ownership" | "scenario" | "communication";
  questionAsked: string;
  studentAnswer: string;
  rubric: string;
  verdict: "met" | "not-met" | "needs-review";
  score: number;
  explanation: string;
  recommendedLessons: { label: string; url: string }[];
};
type StudentReport = {
  sessionId: string;
  careerPath: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  outcome: "pass" | "fail" | "incomplete" | "needs-review";
  resultLabel: string;
  overallScore: number;
  categoryScores: CategoryScores;
  strengths: DetailedAnswer[];
  weaknesses: DetailedAnswer[];
  detailedAnswers: DetailedAnswer[];
  competencyResults: { competencyId: string; name: string; met: boolean | null; evidence: string | null; recommendedLessons: { label: string; url: string }[] }[];
  projectOwnershipEvaluation: DetailedAnswer | null;
  itemsNeedingReview: DetailedAnswer[];
  certificate: { certificateNumber: string; issuedAt: string; verifyUrl: string } | null;
};

const CATEGORY_LABELS: Record<keyof CategoryScores, string> = {
  technicalKnowledge: "Technical Knowledge",
  projectOwnership: "Project Ownership",
  scenarioReasoning: "Scenario Reasoning",
  communication: "Professional Communication",
};

function outcomeColor(outcome: StudentReport["outcome"]): string {
  if (outcome === "pass") return "text-crimson-deep";
  if (outcome === "needs-review") return "text-gold";
  if (outcome === "incomplete") return "text-stone";
  return "text-crimson";
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-ink">{label}</span>
        <span className="font-semibold text-crimson-deep">{value}/100</span>
      </div>
      <div className="mt-1 h-2 w-full bg-ink/10">
        <div className="h-full bg-crimson" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    </div>
  );
}

function AnswerCard({ answer }: { answer: DetailedAnswer }) {
  const verdictLabel = answer.verdict === "met" ? "Strong" : answer.verdict === "not-met" ? "Needs work" : "Pending review";
  const verdictClass = answer.verdict === "met" ? "bg-crimson-deep" : answer.verdict === "not-met" ? "bg-crimson" : "bg-gold text-ink";
  return (
    <div className="border border-ink/15 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <span className={`rounded-[2px] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-parchment ${verdictClass}`}>{verdictLabel}</span>
        <span className="text-xs font-semibold text-stone">{answer.score}/100</span>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-sm font-semibold text-ink">{answer.questionAsked}</p>
      <p className="mt-2 whitespace-pre-wrap text-sm text-stone">
        <span className="font-semibold text-ink">Your answer: </span>
        {answer.studentAnswer || "(no response recorded)"}
      </p>
      <p className="mt-2 whitespace-pre-wrap text-xs text-stone">
        <span className="font-semibold text-ink">Rubric: </span>
        {answer.rubric}
      </p>
      <p className="mt-2 whitespace-pre-wrap text-sm text-ink">
        <span className="font-semibold">Why this score: </span>
        {answer.explanation}
      </p>
      {answer.recommendedLessons.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {answer.recommendedLessons.map((lesson) => (
            <Link key={lesson.url} href={lesson.url} className="rounded-[2px] bg-gold/15 px-2 py-1 text-xs font-semibold text-crimson-deep hover:bg-gold/30">
              Review: {lesson.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ReportPageInner() {
  const params = useSearchParams();
  const sessionId = params.get("sessionId") ?? "";
  const [report, setReport] = useState<StudentReport | null | "loading">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("Missing session id.");
      setReport(null);
      return;
    }
    const accessToken = getSessionAccessToken(sessionId);
    if (!accessToken) {
      setError("This report can only be opened on the device/browser that took the interview.");
      setReport(null);
      return;
    }
    fetch(`/api/mock-interview-report?sessionId=${encodeURIComponent(sessionId)}&accessToken=${encodeURIComponent(accessToken)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setReport(null);
        } else {
          setReport(data.report);
        }
      })
      .catch(() => setError("Something went wrong loading your report."));
  }, [sessionId]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app/mock-interview" className="hover:text-crimson">
          Professional Mock Interview
        </Link>
        {" · "}
        <Link href="/app/mock-interview/history" className="hover:text-crimson">
          My history
        </Link>
      </nav>

      {error && (
        <div className="border border-crimson/30 bg-crimson/5 p-6 text-sm text-crimson">{error}</div>
      )}

      {report === "loading" && !error && <p className="text-stone">Loading your report…</p>}

      {report === null && !error && (
        <div className="border border-gold/40 bg-gold/10 p-6 text-sm text-ink">
          Your report hasn&apos;t been generated yet — grading runs once the formal assessment is
          complete and the administrator has enabled live grading. Check back shortly.
        </div>
      )}

      {report && report !== "loading" && (
        <>
          <p className="eyebrow mb-2">Professional Mock Interview Report</p>
          <h1 className="display text-3xl">
            Result: <span className={outcomeColor(report.outcome)}>{report.resultLabel}</span>
          </h1>
          <p className="mt-2 text-sm text-stone capitalize">
            {report.careerPath.replace(/-/g, " ")} — {report.difficulty} difficulty
          </p>

          {report.itemsNeedingReview.length > 0 && (
            <div className="mt-4 border border-gold/40 bg-gold/10 p-4 text-sm text-ink">
              {report.itemsNeedingReview.length} of your answers couldn&apos;t be confidently graded and have been
              sent to an administrator for manual review rather than being counted against you. You&apos;ll be
              notified once that&apos;s resolved.
            </div>
          )}

          <div className="mt-8 border border-ink/15 bg-parchment p-6">
            <p className="eyebrow mb-3">Overall score</p>
            <ScoreBar label="Overall" value={report.overallScore} />
            <div className="mt-4 space-y-3">
              {(Object.keys(report.categoryScores) as (keyof CategoryScores)[]).map((key) => (
                <ScoreBar key={key} label={CATEGORY_LABELS[key]} value={report.categoryScores[key]} />
              ))}
            </div>
          </div>

          {report.certificate && (
            <div className="mt-6 border border-gold/40 bg-gold/10 p-6 text-center">
              <p className="display text-xl">Certificate of Successful Completion</p>
              <p className="mt-1 text-sm text-stone">No. {report.certificate.certificateNumber}</p>
              <a
                href={`/api/mock-interview-certificate?sessionId=${encodeURIComponent(report.sessionId)}&accessToken=${encodeURIComponent(getSessionAccessToken(report.sessionId) ?? "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-[2px] bg-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-gold/80"
              >
                Download certificate (PDF)
              </a>
            </div>
          )}

          {report.competencyResults.length > 0 && (
            <section className="mt-10">
              <p className="eyebrow mb-3">Critical competency results</p>
              <div className="space-y-2">
                {report.competencyResults.map((c) => (
                  <div key={c.competencyId} className="flex items-center justify-between border border-ink/10 bg-white p-3 text-sm">
                    <span className="text-ink">{c.name}</span>
                    <span className={c.met === true ? "font-semibold text-crimson-deep" : c.met === false ? "font-semibold text-crimson" : "font-semibold text-gold"}>
                      {c.met === true ? "Met" : c.met === false ? "Not met" : "Pending review"}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {report.projectOwnershipEvaluation && (
            <section className="mt-10">
              <p className="eyebrow mb-3">Project explanation &amp; technical ownership</p>
              <AnswerCard answer={report.projectOwnershipEvaluation} />
            </section>
          )}

          {report.weaknesses.length > 0 && (
            <section className="mt-10">
              <p className="eyebrow mb-3">Areas to strengthen</p>
              <div className="space-y-4">
                {report.weaknesses.map((a) => (
                  <AnswerCard key={a.itemId} answer={a} />
                ))}
              </div>
            </section>
          )}

          {report.strengths.length > 0 && (
            <section className="mt-10">
              <p className="eyebrow mb-3">Strengths</p>
              <div className="space-y-4">
                {report.strengths.map((a) => (
                  <AnswerCard key={a.itemId} answer={a} />
                ))}
              </div>
            </section>
          )}

          <section className="mt-10">
            <p className="eyebrow mb-3">Full answer review</p>
            <div className="space-y-4">
              {report.detailedAnswers.map((a) => (
                <AnswerCard key={a.itemId} answer={a} />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default function MockInterviewReportPage() {
  return (
    <Suspense fallback={null}>
      <ReportPageInner />
    </Suspense>
  );
}
