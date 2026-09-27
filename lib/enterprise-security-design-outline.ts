// The Enterprise Security Design course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/enterprise-security-design/
  videoUrl?: string;
  durationLabel?: string;
};

export type ChapterMeta = { n: number; title: string; lessons: LessonMeta[] };

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const SFTA_ENTERPRISE_SECURITY_DESIGN_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Designing Security",
    lessons: [
      L(1, "security-boundaries", "Security Boundaries"),
      L(2, "least-privilege", "Least Privilege"),
      L(3, "auditing", "Auditing"),
      L(4, "threat-considerations", "Threat Considerations"),
      L(5, "encryption-and-monitoring-concepts", "Encryption and Monitoring Concepts"),
      L(6, "security-architecture-review", "Security Architecture Review"),
    ],
  },
];
