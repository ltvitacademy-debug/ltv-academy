const CHECKOUT_URL = "https://www.ltvacademy.com/landing";

const FEATURES = [
  { label: "24 Career Options", icon: PathIcon },
  { label: "Video Lessons & Guides", icon: PlayIcon },
  { label: "Hands-On Practice", icon: CodeIcon },
  { label: "AI Lesson Assistant", icon: BotIcon },
  { label: "AI-Assisted Interview Prep", icon: ChatIcon },
  { label: "Track Your Progress", icon: ChartIcon },
];

export default function VslHero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-0 ledger-texture opacity-30" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
        <div>
          <h1 className="display max-w-xl text-4xl text-parchment sm:text-5xl">
            Build a Real Technology Career With{" "}
            <em className="text-gold-pale">In-Demand Skills</em>
          </h1>
          <p className="mt-5 max-w-lg text-parchment/80">
            LTV Academy gives you a complete learning system to master data,
            cloud, AI, databases and more — with structured training,
            hands-on practice, AI-assisted learning support, and real
            interview preparation.
          </p>

          <a
            href={CHECKOUT_URL}
            className="mt-7 inline-block rounded-[2px] bg-gold px-7 py-4 text-base font-semibold text-crimson-deep transition-colors hover:bg-gold-pale"
          >
            Start Your First 30 Days for $9.97 →
          </a>
          <p className="mt-3 text-sm text-parchment/60">
            Then $97 per month until canceled. Full access to all career
            paths.
          </p>

          <ul className="mt-9 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {FEATURES.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-2.5">
                <Icon />
                <span className="text-xs font-medium leading-tight text-parchment/85">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2px] border border-gold/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/careers/hero.jpg"
              alt="Walking toward a career in technology"
              className="h-72 w-full object-cover sm:h-96"
            />
          </div>
          <blockquote className="absolute -right-2 -top-6 hidden max-w-[11rem] rotate-3 rounded-sm bg-gold-pale px-4 py-3 shadow-lg sm:block">
            <p className="display text-sm italic leading-snug text-ink">
              Learn. Practice. Build. Advance.
            </p>
          </blockquote>
          <blockquote className="absolute -bottom-6 -left-2 hidden max-w-[12rem] -rotate-2 rounded-sm bg-gold-pale px-4 py-3 shadow-lg sm:block">
            <p className="display text-sm italic leading-snug text-ink">
              Same people. New skills. Real opportunities.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "flex-shrink-0 text-gold",
  "aria-hidden": true,
};

function PathIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 3 4 6.5v2L12 12l8-3.5v-2L12 3Z" />
      <path d="M4 11.5 12 15l8-3.5" />
      <path d="M4 16 12 19.5 20 16" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5v7l6-3.5-6-3.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function CodeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8 8 4 12l4 4M16 8l4 4-4 4M14 5l-4 14" />
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

export { CHECKOUT_URL };
