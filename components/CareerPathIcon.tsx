// A small per-card emblem for the /careers path and destination cards — a real
// vendor logo (public/brand/logos/) where the card names a specific platform,
// otherwise a minimal line-art mark drawn in the same engraved, single-weight
// style as the brand seal. A compass rose is the fallback for any slug without
// a dedicated mark yet.

const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Cards tied to one specific platform render that platform's real brand mark
// instead of a custom icon.
const VENDOR_LOGOS: Record<string, string> = {
  "microsoft-data-bi-developer": "microsoft",
  "azure-fabric-data-engineer": "azure",
  "databricks-lakehouse-engineer": "databricks",
  "aws-data-engineer": "aws",
  "snowflake-data-engineer": "snowflake",
  "azure-database-engineer": "azure",
  "sql-server-database-administrator": "sqlserver",
  "oracle-fusion-financials-consultant": "oracle",
  "salesforce-administrator": "salesforce",
  "salesforce-architect": "salesforce",
};

const ICONS: Record<string, React.ReactNode> = {
  // First-choice paths without a single defining platform
  "data-analyst-bi-engineer": (
    <>
      <path d="M4 20V11M10 20V6M16 20v-8M20 20V9" />
      <path d="M3 20h18" />
    </>
  ),
  "analytics-engineer": (
    <>
      <circle cx="5" cy="7" r="1.6" />
      <circle cx="12" cy="7" r="1.6" />
      <circle cx="19" cy="7" r="1.6" />
      <path d="M5 8.6V13a3 3 0 0 0 3 3h0a3 3 0 0 1 3 3M12 8.6v3.9M19 8.6V13a3 3 0 0 1-3 3h0a3 3 0 0 0-3 3" />
    </>
  ),
  "data-scientist": (
    <>
      <path d="M10 3h4" />
      <path d="M10.5 3v5.2L6 17a2 2 0 0 0 1.8 2.9h8.4A2 2 0 0 0 18 17l-4.5-8.8V3" />
      <path d="M8.2 14.5h7.6" />
    </>
  ),
  "ai-engineer": (
    <>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="13" r="2.2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="19" r="2" />
      <path d="M7.6 7.2 10.3 11.6M16.4 7.2 13.7 11.6M10.2 14.8 7.7 17.5M13.8 14.8 16.3 17.5" />
    </>
  ),
  "devops-engineer": (
    <>
      <path d="M8.5 12c0-2 1.6-3.6 3.5-3.6S15.5 10 15.5 12 13.9 15.6 12 15.6" />
      <path d="M12 8.4C10.1 8.4 8.5 10 8.5 12S10.1 15.6 12 15.6 15.5 14 15.5 12" transform="rotate(180 12 12)" />
      <circle cx="8.5" cy="12" r="1.3" />
      <circle cx="15.5" cy="12" r="1.3" />
    </>
  ),
  "blockchain-engineer": (
    <>
      <rect x="3.5" y="9.5" width="5" height="5" rx="0.6" />
      <rect x="15.5" y="9.5" width="5" height="5" rx="0.6" />
      <rect x="9.5" y="3.5" width="5" height="5" rx="0.6" />
      <rect x="9.5" y="15.5" width="5" height="5" rx="0.6" />
      <path d="M8.5 11h1M14.5 11h1M12 8.5v1M12 14.5v1" />
    </>
  ),
  "data-governance": (
    <>
      <path d="M12 3.5 5 6v5.5c0 4.3 2.9 7.5 7 9 4.1-1.5 7-4.7 7-9V6l-7-2.5Z" />
      <path d="m9 12 2.2 2.2L15.5 9.5" />
    </>
  ),

  // Destinations without a single defining platform
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

export default function CareerPathIcon({ slug, className = "h-6 w-6" }: { slug: string; className?: string }) {
  const logo = VENDOR_LOGOS[slug];
  if (logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={`/brand/logos/${logo}.svg`} alt="" className={`${className} object-contain`} aria-hidden="true" />;
  }
  return (
    <svg className={className} {...common} aria-hidden="true">
      {ICONS[slug] ?? FALLBACK}
    </svg>
  );
}
