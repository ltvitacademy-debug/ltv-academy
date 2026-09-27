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
      L(1, "the-sharing-model-revisited", "The Sharing Model Revisited"),
      L(2, "organization-wide-defaults", "Organization-Wide Defaults"),
      L(3, "role-hierarchy", "Role Hierarchy"),
      L(4, "sharing-rules", "Sharing Rules"),
      L(5, "teams", "Teams"),
      L(6, "manual-sharing", "Manual Sharing"),
      L(7, "public-groups-and-queues", "Public Groups and Queues"),
    ],
  },
  {
    n: 2,
    title: "Advanced Sharing",
    lessons: [
      L(8, "apex-managed-sharing", "Apex Managed Sharing"),
      L(9, "apex-sharing-reasons-and-share-objects", "Apex Sharing Reasons and Share Objects"),
      L(10, "sharing-sets-and-community-sharing", "Sharing Sets and Community Sharing"),
      L(11, "territory-management", "Territory Management"),
      L(12, "implicit-sharing", "Implicit Sharing"),
      L(13, "restriction-rules-and-scoping-rules", "Restriction Rules and Scoping Rules"),
    ],
  },
  {
    n: 3,
    title: "Sharing Architecture",
    lessons: [
      L(14, "enterprise-sharing-architecture", "Enterprise Sharing Architecture"),
      L(15, "sharing-and-large-data-volumes", "Sharing and Large Data Volumes"),
      L(16, "sharing-recalculation-and-deferred-sharing", "Sharing Recalculation and Deferred Sharing"),
      L(17, "designing-for-sharing", "Designing for Sharing"),
      L(18, "field-level-security-design", "Field-Level Security Design"),
      L(19, "sharing-architecture-case-study-financial-services", "Sharing Architecture Case Study: Financial Services"),
      L(20, "sharing-architecture-case-study-global-sales", "Sharing Architecture Case Study: Global Sales"),
    ],
  },
  {
    n: 4,
    title: "Review and Practice",
    lessons: [
      L(21, "auditing-access", "Auditing Access"),
      L(22, "sharing-design-trade-offs", "Sharing Design Trade-Offs"),
      L(23, "sharing-architecture-review-board-practice", "Sharing Architecture Review Board Practice"),
      L(24, "exam-style-sharing-scenarios", "Exam-Style Sharing Scenarios"),
    ],
  },
];
