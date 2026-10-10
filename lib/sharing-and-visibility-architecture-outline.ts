// The Sharing & Visibility Architecture course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/sharing-and-visibility-architecture/
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

export const SFTA_SHARING_AND_VISIBILITY_ARCHITECTURE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Sharing Building Blocks",
    lessons: [
      L(1, "the-sharing-model-revisited", "The Sharing Model Revisited", { contentDir: "ch01/01-the-sharing-model-revisited" }),
      L(2, "organization-wide-defaults", "Organization-Wide Defaults", { contentDir: "ch01/02-organization-wide-defaults" }),
      L(3, "role-hierarchy", "Role Hierarchy", { contentDir: "ch01/03-role-hierarchy" }),
      L(4, "sharing-rules", "Sharing Rules", { contentDir: "ch01/04-sharing-rules" }),
      L(5, "teams", "Teams", { contentDir: "ch01/05-teams" }),
      L(6, "manual-sharing", "Manual Sharing", { contentDir: "ch01/06-manual-sharing" }),
      L(7, "public-groups-and-queues", "Public Groups and Queues", { contentDir: "ch01/07-public-groups-and-queues" }),
    ],
  },
  {
    n: 2,
    title: "Advanced Sharing",
    lessons: [
      L(8, "apex-managed-sharing", "Apex Managed Sharing", { contentDir: "ch02/08-apex-managed-sharing" }),
      L(9, "apex-sharing-reasons-and-share-objects", "Apex Sharing Reasons and Share Objects", { contentDir: "ch02/09-apex-sharing-reasons-and-share-objects" }),
      L(10, "sharing-sets-and-community-sharing", "Sharing Sets and Community Sharing", { contentDir: "ch02/10-sharing-sets-and-community-sharing" }),
      L(11, "territory-management", "Territory Management", { contentDir: "ch02/11-territory-management" }),
      L(12, "implicit-sharing", "Implicit Sharing", { contentDir: "ch02/12-implicit-sharing" }),
      L(13, "restriction-rules-and-scoping-rules", "Restriction Rules and Scoping Rules", { contentDir: "ch02/13-restriction-rules-and-scoping-rules" }),
    ],
  },
  {
    n: 3,
    title: "Sharing Architecture",
    lessons: [
      L(14, "enterprise-sharing-architecture", "Enterprise Sharing Architecture", { contentDir: "ch03/14-enterprise-sharing-architecture" }),
      L(15, "sharing-and-large-data-volumes", "Sharing and Large Data Volumes", { contentDir: "ch03/15-sharing-and-large-data-volumes" }),
      L(16, "sharing-recalculation-and-deferred-sharing", "Sharing Recalculation and Deferred Sharing", { contentDir: "ch03/16-sharing-recalculation-and-deferred-sharing" }),
      L(17, "designing-for-sharing", "Designing for Sharing", { contentDir: "ch03/17-designing-for-sharing" }),
      L(18, "field-level-security-design", "Field-Level Security Design", { contentDir: "ch03/18-field-level-security-design" }),
      L(19, "sharing-architecture-case-study-financial-services", "Sharing Architecture Case Study: Financial Services", { contentDir: "ch03/19-sharing-architecture-case-study-financial-services" }),
      L(20, "sharing-architecture-case-study-global-sales", "Sharing Architecture Case Study: Global Sales", { contentDir: "ch03/20-sharing-architecture-case-study-global-sales" }),
    ],
  },
  {
    n: 4,
    title: "Review and Practice",
    lessons: [
      L(21, "auditing-access", "Auditing Access", { contentDir: "ch04/21-auditing-access" }),
      L(22, "sharing-design-trade-offs", "Sharing Design Trade-Offs", { contentDir: "ch04/22-sharing-design-trade-offs" }),
      L(23, "sharing-architecture-review-board-practice", "Sharing Architecture Review Board Practice", { contentDir: "ch04/23-sharing-architecture-review-board-practice" }),
      L(24, "exam-style-sharing-scenarios", "Exam-Style Sharing Scenarios", { contentDir: "ch04/24-exam-style-sharing-scenarios" }),
    ],
  },
];
