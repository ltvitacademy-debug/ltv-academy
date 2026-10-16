import Link from "next/link";

const CARDS = [
  {
    n: 1,
    title: "Video Lessons & Written Guides",
    body: "Each lesson pairs an instructional video with a full written guide — objectives, key terms, a hands-on lab, and a knowledge check. Video is live today across several complete career paths; newer paths are rolling it out on an ongoing basis, with a full written guide from day one either way.",
  },
  {
    n: 2,
    title: "Hands-On Practice & Real Projects",
    body: "Every lesson feeds a drill bank for its course — try to answer, then reveal the correct answer and why. Select courses go further with a Resource Vault and Worked Example Library, and we're adding more.",
  },
  {
    n: 3,
    title: "Knowledge Checks & Assessments",
    body: "Every lesson across the catalog — all 5,959 of them — ends with a graded knowledge check. Every one of our 188 courses also closes with a real final exam bank, 90% to pass.",
  },
  {
    n: 4,
    title: "AI Lesson Assistant",
    body: "A real AI assistant built into the lesson page, with that lesson's own content as context. Ask it to explain something another way, walk through a step, or quiz you — without leaving the lesson.",
  },
  {
    n: 5,
    title: "Interview & Communication Prep",
    body: "4,926 real interview questions across 20 dedicated banks, organized by skill, level, and interview type — write your own answer, then reveal a model answer. A separate Communication Lab (451 exercises, 18 of 24 paths) is self-assessed, rubric-based practice at explaining your work.",
  },
  {
    n: 6,
    title: "Track Your Progress",
    body: "16 core career paths come with a personalized, week-by-week learning planner built from real lesson hours — typically 20 to 36 weeks. Every lesson is tracked: completed, in progress, or next up.",
  },
];

export default function LearningSystem() {
  return (
    <section className="bg-parchment">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="eyebrow mb-4">Inside a career path</p>
            <h2 className="display text-4xl sm:text-5xl">
              A complete learning experience built for your success.
            </h2>
            <p className="mt-4 max-w-md text-stone">
              Every career path is more than a list of videos. It&rsquo;s a
              step-by-step system designed to help you learn, practice, and
              prepare for real opportunities — here&rsquo;s the actual T-SQL
              Development course page a student sees today.
            </p>
            <Link
              href="/careers/microsoft-data-bi-developer"
              className="mt-6 inline-block rounded-[2px] bg-crimson px-6 py-3.5 text-sm font-semibold text-parchment transition-colors hover:bg-crimson-deep"
            >
              See a Career Path in Action →
            </Link>
          </div>

          <div className="overflow-hidden rounded-[2px] border border-ink/15 bg-white/60 shadow-sm">
            <div className="border-b border-ink/10 p-6">
              <p className="eyebrow mb-2">Course curriculum</p>
              <h3 className="display text-2xl">T-SQL Development.</h3>
              <p className="mt-2 text-sm text-stone">
                118 lessons across 12 chapters, working against real
                Microsoft sample databases — AdventureWorks2012 and
                AdventureWorksDW2014.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/vsl/lesson-video-real.jpg"
              alt="A real lesson video from the T-SQL Development course, screenshotted from the live platform"
              className="w-full"
            />
            <div className="flex items-center justify-between px-6 py-4 text-sm">
              <span className="text-stone">0 of 118 lessons completed</span>
              <span className="font-semibold text-crimson">
                Lesson 1 · What Is T-SQL?
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <div
              key={card.n}
              className="rounded-[2px] border border-ink/12 bg-white/50 p-6"
            >
              <span className="display mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-crimson text-sm text-parchment">
                {card.n}
              </span>
              <h3 className="display text-lg text-crimson-deep">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
