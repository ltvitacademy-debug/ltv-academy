import Link from "next/link";

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "text-gold",
  "aria-hidden": true,
};

function VideoIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="6" width="13" height="12" rx="1.5" />
      <path d="M16 10.5 21 7v10l-5-3.5Z" />
    </svg>
  );
}
function LabIcon() {
  return (
    <svg {...iconProps}>
      <path d="M9 3h6M10 3v6.5L5 18a2 2 0 0 0 1.8 2.9h10.4A2 2 0 0 0 20 18l-5-8.5V3" />
      <path d="M7.5 15h9" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg {...iconProps}>
      <rect x="4" y="3.5" width="16" height="17" rx="1.5" />
      <path d="M8 9h8M8 12.5h8M8 16h5" />
      <path d="m15.5 18.5 1.5 1.5 3-3" strokeWidth="1.8" />
    </svg>
  );
}
function BotIcon() {
  return (
    <svg {...iconProps}>
      <rect x="4" y="8" width="16" height="11" rx="2" />
      <path d="M12 8V4M9 4h6" />
      <circle cx="9" cy="13.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 5h16v10H9l-4 3.5V15H4Z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 20V11M10 20V6M16 20v-8M20 20V9" />
      <path d="M3 20h18" />
    </svg>
  );
}

const CARDS = [
  {
    n: 1,
    icon: VideoIcon,
    title: "Video Lessons & Written Guides",
    body: "Each lesson pairs an instructional video with a full written guide — objectives, key terms, a hands-on lab, and a knowledge check. Video is live today across several complete career paths; newer paths are rolling it out on an ongoing basis, with a full written guide from day one either way.",
  },
  {
    n: 2,
    icon: LabIcon,
    title: "Hands-On Practice & Real Projects",
    body: "Every lesson feeds a drill bank for its course — try to answer, then reveal the correct answer and why. Select courses go further with a Resource Vault and Worked Example Library, and we're adding more.",
  },
  {
    n: 3,
    icon: CheckIcon,
    title: "Knowledge Checks & Assessments",
    body: "Every lesson across the catalog — all 5,959 of them — ends with a graded knowledge check. Every one of our 188 courses also closes with a real final exam bank, 90% to pass.",
  },
  {
    n: 4,
    icon: BotIcon,
    title: "AI Lesson Assistant",
    body: "A real AI assistant built into the lesson page, with that lesson's own content as context. Ask it to explain something another way, walk through a step, or quiz you — without leaving the lesson.",
  },
  {
    n: 5,
    icon: ChatIcon,
    title: "Interview & Communication Prep",
    body: "4,926 real interview questions across 20 dedicated banks, organized by skill, level, and interview type — write your own answer, then reveal a model answer. A separate Communication Lab (451 exercises, 18 of 24 paths) is self-assessed, rubric-based practice at explaining your work.",
  },
  {
    n: 6,
    icon: ChartIcon,
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

        <div className="mt-20 rounded-[2px] bg-crimson-deep px-6 py-14 sm:px-10 sm:py-16">
          <p className="eyebrow mb-3 text-gold">Everything, in one place</p>
          <h3 className="display max-w-xl text-3xl text-parchment sm:text-4xl">
            Six tools working together, on every lesson.
          </h3>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[2px] bg-gold/15 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((card) => (
              <div
                key={card.n}
                className="group relative bg-ink/40 p-7 transition-colors hover:bg-ink/60"
              >
                <span className="display absolute right-6 top-6 text-5xl font-light text-parchment/10">
                  {String(card.n).padStart(2, "0")}
                </span>
                <card.icon />
                <h4 className="display relative mt-4 text-lg text-gold-pale">
                  {card.title}
                </h4>
                <p className="relative mt-2 text-sm leading-relaxed text-parchment/70">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
