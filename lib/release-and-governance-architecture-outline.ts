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
      L(2, "release-cadence-and-salesforce-seasonal-releases", "Release Cadence and Salesforce Seasonal Releases"),
      L(3, "governance", "Governance"),
      L(4, "change-control", "Change Control"),
      L(5, "change-advisory-boards", "Change Advisory Boards"),
      L(6, "rollback", "Rollback"),
    ],
  },
  {
    n: 2,
    title: "Enterprise Deployment",
    lessons: [
      L(7, "enterprise-deployment-planning", "Enterprise Deployment Planning"),
      L(8, "multi-team-and-multi-org-development", "Multi-Team and Multi-Org Development"),
      L(9, "release-management-roles", "Release Management Roles"),
      L(10, "release-communication-and-training", "Release Communication and Training"),
      L(11, "release-architecture-case-study", "Release Architecture Case Study"),
      L(12, "exam-style-lifecycle-scenarios", "Exam-Style Lifecycle Scenarios"),
    ],
  },
  {
    n: 3,
    title: "Architecture Practice",
    lessons: [
      L(13, "technical-debt-management", "Technical Debt Management"),
      L(14, "governance-documentation", "Governance Documentation"),
      L(15, "lifecycle-architecture-review-board-practice", "Lifecycle Architecture Review Board Practice"),
      L(16, "deployment-risk-assessment", "Deployment Risk Assessment"),
    ],
  },
];
