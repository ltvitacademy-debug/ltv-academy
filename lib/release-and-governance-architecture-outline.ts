// The Release & Governance Architecture course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/release-and-governance-architecture/
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

export const SFTA_RELEASE_AND_GOVERNANCE_ARCHITECTURE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Release and Governance",
    lessons: [
      L(1, "release-strategy", "Release Strategy"),
      L(2, "governance", "Governance"),
      L(3, "change-control", "Change Control"),
      L(4, "rollback", "Rollback"),
      L(5, "enterprise-deployment-planning", "Enterprise Deployment Planning"),
      L(6, "release-architecture-case-study", "Release Architecture Case Study"),
    ],
  },
];
