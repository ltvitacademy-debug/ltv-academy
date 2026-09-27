// The Security & Access Fundamentals course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-security-and-access-fundamentals/
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

export const SFTA_SALESFORCE_SECURITY_AND_ACCESS_FUNDAMENTALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "The Security Model",
    lessons: [
      L(1, "the-salesforce-security-model-overview", "The Salesforce Security Model Overview"),
      L(2, "object-permissions-and-crud", "Object Permissions and CRUD"),
      L(3, "profiles-revisited", "Profiles Revisited"),
      L(4, "permission-sets-revisited", "Permission Sets Revisited"),
      L(5, "field-level-security", "Field-Level Security"),
    ],
  },
  {
    n: 2,
    title: "Record Access",
    lessons: [
      L(6, "organization-wide-defaults", "Organization-Wide Defaults"),
      L(7, "roles-and-the-role-hierarchy", "Roles and the Role Hierarchy"),
      L(8, "sharing-rules", "Sharing Rules"),
      L(9, "manual-sharing-and-teams", "Manual Sharing and Teams"),
      L(10, "security-troubleshooting-and-access-reviews", "Security Troubleshooting and Access Reviews"),
    ],
  },
];
