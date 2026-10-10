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
      L(1, "release-strategy", "Release Strategy", { contentDir: "ch01/01-release-strategy" }),
      L(2, "release-cadence-and-salesforce-seasonal-releases", "Release Cadence and Salesforce Seasonal Releases", { contentDir: "ch01/02-release-cadence-and-salesforce-seasonal-releases" }),
      L(3, "governance", "Governance", { contentDir: "ch01/03-governance" }),
      L(4, "change-control", "Change Control", { contentDir: "ch01/04-change-control" }),
      L(5, "change-advisory-boards", "Change Advisory Boards", { contentDir: "ch01/05-change-advisory-boards" }),
      L(6, "rollback", "Rollback", { contentDir: "ch01/06-rollback" }),
    ],
  },
  {
    n: 2,
    title: "Enterprise Deployment",
    lessons: [
      L(7, "enterprise-deployment-planning", "Enterprise Deployment Planning", { contentDir: "ch02/07-enterprise-deployment-planning" }),
      L(8, "multi-team-and-multi-org-development", "Multi-Team and Multi-Org Development", { contentDir: "ch02/08-multi-team-and-multi-org-development" }),
      L(9, "release-management-roles", "Release Management Roles", { contentDir: "ch02/09-release-management-roles" }),
      L(10, "release-communication-and-training", "Release Communication and Training", { contentDir: "ch02/10-release-communication-and-training" }),
      L(11, "release-architecture-case-study", "Release Architecture Case Study", { contentDir: "ch02/11-release-architecture-case-study" }),
      L(12, "exam-style-lifecycle-scenarios", "Exam-Style Lifecycle Scenarios", { contentDir: "ch02/12-exam-style-lifecycle-scenarios" }),
    ],
  },
  {
    n: 3,
    title: "Architecture Practice",
    lessons: [
      L(13, "technical-debt-management", "Technical Debt Management", { contentDir: "ch03/13-technical-debt-management" }),
      L(14, "governance-documentation", "Governance Documentation", { contentDir: "ch03/14-governance-documentation" }),
      L(15, "lifecycle-architecture-review-board-practice", "Lifecycle Architecture Review Board Practice", { contentDir: "ch03/15-lifecycle-architecture-review-board-practice" }),
      L(16, "deployment-risk-assessment", "Deployment Risk Assessment", { contentDir: "ch03/16-deployment-risk-assessment" }),
    ],
  },
];
