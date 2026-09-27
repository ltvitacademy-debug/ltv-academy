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
      L(1, "organization-wide-defaults", "Organization-Wide Defaults"),
      L(2, "role-hierarchy", "Role Hierarchy"),
      L(3, "sharing-rules", "Sharing Rules"),
      L(4, "teams", "Teams"),
      L(5, "manual-sharing", "Manual Sharing"),
    ],
  },
  {
    n: 2,
    title: "Sharing Architecture",
    lessons: [
      L(6, "apex-sharing", "Apex Sharing"),
      L(7, "enterprise-sharing-architecture", "Enterprise Sharing Architecture"),
      L(8, "sharing-and-large-data-volumes", "Sharing and Large Data Volumes"),
      L(9, "designing-for-sharing", "Designing for Sharing"),
      L(10, "sharing-architecture-case-study", "Sharing Architecture Case Study"),
    ],
  },
];
