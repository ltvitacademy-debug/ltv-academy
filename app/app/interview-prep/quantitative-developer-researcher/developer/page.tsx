import Link from "next/link";
import { loadInterviewBank } from "@/lib/interviewPrep";
import InterviewPrep from "@/components/app/InterviewPrep";

export default async function QuantDeveloperInterviewPrepPage() {
  const questions = loadInterviewBank("quant-developer");

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app" className="hover:text-crimson">
          Learning center
        </Link>
        {" · "}
        <Link href="/careers/quantitative-developer-researcher" className="hover:text-crimson">
          Quantitative Developer / Researcher
        </Link>
        {" · "}
        <Link href="/app/interview-prep/quantitative-developer-researcher" className="hover:text-crimson">
          Interview prep
        </Link>
        {" · "}
        <span>Developer</span>
      </nav>

      <p className="eyebrow mb-3">Career Interview Prep Center</p>
      <h1 className="display text-3xl sm:text-4xl">
        Quantitative Developer <span className="text-crimson">interview practice</span>
      </h1>
      <p className="mt-4 max-w-2xl text-stone">
        Production engineering where a wrong number is a bug and a slow number can be a loss.
        Type your own answer first — the model answer only reveals after you submit, so you find
        out what you actually know.
      </p>

      <div className="mt-8">
        <InterviewPrep pathSlug="quant-developer" pathTitle="Quantitative Developer" questions={questions} />
      </div>
    </main>
  );
}
