// A small topic icon for each chapter card on the course curriculum page.
// No per-course curation — 186 courses' chapters only ever give us a title
// string, so this matches on keywords in that title and falls back to a
// generic chapter mark. Same engraved, single-weight line-art style as
// CareerPathIcon so the new curriculum layout still reads as this brand,
// not a generic icon pack.

const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type Rule = { test: RegExp; icon: React.ReactNode };

const RULES: Rule[] = [
  {
    test: /capstone|final project|portfolio/i,
    icon: (
      <>
        <circle cx="12" cy="12" r="7.5" />
        <circle cx="12" cy="12" r="3.8" />
        <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    test: /security|secur|auth|access|governance|compliance/i,
    icon: <path d="M12 3.5 5 6.2v5.1c0 4.4 3 7.6 7 9.2 4-1.6 7-4.8 7-9.2V6.2L12 3.5Z" />,
  },
  {
    test: /python|javascript|typescript|code|scripting|programming|syntax|apex|dax|soql|t-sql|sql\b/i,
    icon: <path d="M8.5 8 4.5 12l4 4M15.5 8l4 4-4 4M13.5 6.5l-3 11" />,
  },
  {
    test: /data model|data structure|database|warehous|storage|lake|table/i,
    icon: (
      <>
        <ellipse cx="12" cy="6" rx="7" ry="2.6" />
        <path d="M5 6v12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" />
        <path d="M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6" />
      </>
    ),
  },
  {
    test: /object[- ]oriented|class(es)?\b|automat|workflow|pipeline|orchestrat|devops|ci\/cd/i,
    icon: (
      <>
        <circle cx="12" cy="12" r="2.6" />
        <path d="M12 3.5v2.3M12 18.2v2.3M20.5 12h-2.3M5.8 12H3.5M18 6l-1.6 1.6M7.6 16.4 6 18M18 18l-1.6-1.6M7.6 7.6 6 6" />
      </>
    ),
  },
  {
    test: /environment|package|dependen|docker|container|deploy|infrastructure/i,
    icon: (
      <>
        <path d="M12 3.5 4.5 7.7v8.6L12 20.5l7.5-4.2V7.7L12 3.5Z" />
        <path d="M4.5 7.7 12 11.9l7.5-4.2M12 11.9v8.6" />
      </>
    ),
  },
  {
    test: /api|integrat|webhook|connect/i,
    icon: (
      <>
        <path d="M9 15 15 9" />
        <path d="M7.5 16.5 5.8 18.2a2.6 2.6 0 0 1-3.7-3.7L3.8 12.8" />
        <path d="M16.5 7.5l1.7-1.7a2.6 2.6 0 0 1 3.7 3.7L20.2 11.2" />
      </>
    ),
  },
  {
    test: /async|ai\b|machine learning|model|llm|agent|neural|intelligence/i,
    icon: (
      <>
        <circle cx="6" cy="7" r="1.8" />
        <circle cx="18" cy="7" r="1.8" />
        <circle cx="12" cy="13" r="2" />
        <circle cx="6" cy="19" r="1.8" />
        <circle cx="18" cy="19" r="1.8" />
        <path d="M7.4 8.2 10.4 11.6M16.6 8.2 13.6 11.6M10.2 14.6 7.7 17.3M13.8 14.6 16.3 17.3" />
      </>
    ),
  },
  {
    test: /test(ing)?|quality|debug|qa\b/i,
    icon: (
      <>
        <path d="M9.5 3.5h5" />
        <path d="M10 3.5v5.3L5.6 17a2 2 0 0 0 1.8 2.9h9.2a2 2 0 0 0 1.8-2.9L14 8.8V3.5" />
        <path d="M7.8 14.5h8.4" />
      </>
    ),
  },
  {
    test: /report|dashboard|visuali[sz]|chart|analytic/i,
    icon: (
      <>
        <path d="M4 20V11M10 20V6M16 20v-8M20 20V9" />
        <path d="M3 20h18" />
      </>
    ),
  },
  {
    test: /cloud|azure|aws|gcp/i,
    icon: <path d="M7 17.5a4 4 0 0 1-.7-7.9A5 5 0 0 1 16 8.4a3.8 3.8 0 0 1 1 7.4" />,
  },
];

const DEFAULT: React.ReactNode = (
  <>
    <path d="M6 4.5h9.5L19 8v11.5H6z" />
    <path d="M15.5 4.5V8H19" />
  </>
);

function pickIcon(title: string): React.ReactNode {
  const rule = RULES.find((r) => r.test.test(title));
  return rule ? rule.icon : DEFAULT;
}

export default function ChapterIcon({ title, className }: { title: string; className?: string }) {
  return (
    <svg {...common} className={className} aria-hidden="true">
      {pickIcon(title)}
    </svg>
  );
}
