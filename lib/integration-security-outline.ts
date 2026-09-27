// The Integration Security course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/integration-security/
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

export const SFTA_INTEGRATION_SECURITY_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Securing Integrations",
    lessons: [
      L(1, "oauth", "OAuth"),
      L(2, "certificates", "Certificates"),
      L(3, "named-credentials", "Named Credentials"),
      L(4, "api-security", "API Security"),
      L(5, "service-accounts", "Service Accounts"),
    ],
  },
];
