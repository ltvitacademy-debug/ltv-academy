"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import MockInterviewChat from "@/components/app/MockInterviewChat";
import { getCareerPath } from "@/lib/career-paths";
import { MOCK_INTERVIEW_PATHS } from "@/lib/mockInterviewPaths";

// Client-rendered: this app is a static export (next.config.ts sets
// output: "export"), so there is no server available at request time to
// read searchParams on — session identity (path/difficulty, and later the
// real session id) lives entirely in client state, created against the
// Netlify Functions backend. useSearchParams() requires a Suspense boundary
// under output: "export" or the static build fails.
function SessionPageInner() {
  const params = useSearchParams();
  const path = params.get("path") ?? "";
  const difficulty = (params.get("difficulty") as "beginner" | "intermediate" | "advanced") || "beginner";
  const resume = params.get("resume") ?? undefined;
  const voiceParam = params.get("voice");
  const requestedVoiceMode = voiceParam === "hands-free" || voiceParam === "push-to-talk" ? voiceParam : undefined;
  const resumeAccessToken = params.get("token") ?? undefined;

  const careerPath = MOCK_INTERVIEW_PATHS.includes(path) ? getCareerPath(path) : undefined;

  if (!careerPath) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10 text-center sm:px-6">
        <p className="text-stone">That career path isn&apos;t available for the mock interview yet.</p>
        <Link href="/app/mock-interview" className="mt-4 inline-block text-crimson hover:text-crimson-deep">
          Back to selection
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app/mock-interview" className="hover:text-crimson">
          Professional Mock Interview
        </Link>
        {" · "}
        <span className="capitalize">{difficulty}</span>
      </nav>
      <MockInterviewChat
        pathSlug={path}
        pathTitle={careerPath.title}
        difficulty={difficulty}
        resumeSessionId={resume}
        requestedVoiceMode={requestedVoiceMode}
        resumeAccessToken={resumeAccessToken}
      />
    </main>
  );
}

export default function MockInterviewSessionPage() {
  return (
    <Suspense fallback={null}>
      <SessionPageInner />
    </Suspense>
  );
}
