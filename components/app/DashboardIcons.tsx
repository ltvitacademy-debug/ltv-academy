// Small line-art icons for the course curriculum dashboard — same
// single-weight, engraved style as ChapterIcon/CareerPathIcon, used in the
// hero stat chips and the Course Mastery cards.

const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Icon({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg {...common} className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

export function PlayIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10.3 8.7v6.6l5.4-3.3z" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function LayersIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M12 3.5 4 7.7 12 11.9l8-4.2Z" />
      <path d="M4 12.3 12 16.5l8-4.2" />
      <path d="M4 16.8 12 21l8-4.2" />
    </Icon>
  );
}

export function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M12 3.5 5 6.2v5.1c0 4.4 3 7.6 7 9.2 4-1.6 7-4.8 7-9.2V6.2L12 3.5Z" />
      <path d="M9 12.2l2.1 2.1 4-4.2" />
    </Icon>
  );
}

export function StackIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <rect x="3.5" y="7" width="13" height="9.5" rx="1" />
      <path d="M7.5 4.5h13v9.5" />
    </Icon>
  );
}

export function PencilCheckIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M14.5 4.5 19.5 9.5 9 20H4v-5Z" />
      <path d="M13 6 18 11" />
    </Icon>
  );
}

export function TargetIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </Icon>
  );
}
