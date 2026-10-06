// Minimal line-art emblems for the /careers destination cards — one per
// destination slug, drawn in the same engraved, single-weight style as the
// brand seal rather than a generic flat icon set. A compass rose is the
// fallback for any destination without a dedicated mark yet.

const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS: Record<string, React.ReactNode> = {
  "bi-to-data-architect": (
    <>
      <path d="M12 3 4 6.5v2L12 12l8-3.5v-2L12 3Z" />
      <path d="M4 11.5 12 15l8-3.5" />
      <path d="M4 16 12 19.5 20 16" />
    </>
  ),
  "principal-data-engineer": (
    <>
      <ellipse cx="12" cy="5.5" rx="6" ry="2.2" />
      <path d="M6 5.5v6.5c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2V5.5" />
      <path d="M6 12v6.5c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2V12" />
    </>
  ),
  "principal-staff-ai-engineer": (
    <>
      <rect x="8" y="8" width="8" height="8" rx="1" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    </>
  ),
  "ai-ml-research-and-alignment-engineer": (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15l5.5 5.5" />
      <path d="M10.5 7.5v6M7.5 10.5h6" />
    </>
  ),
  "ai-infrastructure-ml-systems-engineer": (
    <>
      <rect x="4" y="3.5" width="16" height="5" rx="1" />
      <rect x="4" y="9.5" width="16" height="5" rx="1" />
      <rect x="4" y="15.5" width="16" height="5" rx="1" />
      <path d="M7 6h.01M7 12h.01M7 18h.01" strokeWidth="2" />
    </>
  ),
  "salesforce-architect": (
    <>
      <path d="M8.5 15.5a3.5 3.5 0 0 1 .4-6.98 4.5 4.5 0 0 1 8.6-1.3A3.75 3.75 0 0 1 17 15.5h-8.5Z" />
      <path d="M9 19h6M10 22h4" />
    </>
  ),
  "quantitative-developer-researcher": (
    <>
      <path d="M4 19V9M9.5 19V5M15 19v-7M20 19V11" />
      <path d="M3 19h18" />
    </>
  ),
};

const FALLBACK: React.ReactNode = (
  <>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 7l1.8 3.7L17.5 12l-3.7 1.3L12 17l-1.3-3.7L7 12l3.7-1.3L12 7Z" />
  </>
);

export default function DestinationIcon({ slug, className = "h-6 w-6" }: { slug: string; className?: string }) {
  return (
    <svg className={className} {...common} aria-hidden="true">
      {ICONS[slug] ?? FALLBACK}
    </svg>
  );
}
