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
      L(6, "how-profiles-and-permission-sets-combine", "How Profiles and Permission Sets Combine"),
    ],
  },
  {
    n: 2,
    title: "Record Access",
    lessons: [
      L(7, "organization-wide-defaults", "Organization-Wide Defaults"),
      L(8, "roles-and-the-role-hierarchy", "Roles and the Role Hierarchy"),
      L(9, "sharing-rules", "Sharing Rules"),
      L(10, "manual-sharing-and-teams", "Manual Sharing and Teams"),
      L(11, "account-opportunity-and-case-teams", "Account, Opportunity and Case Teams"),
      L(12, "public-groups-and-queues", "Public Groups and Queues"),
      L(13, "controlled-by-parent-and-grant-access-using-hierarchies", "Controlled by Parent and Grant Access Using Hierarchies"),
    ],
  },
  {
    n: 3,
    title: "Applying Security",
    lessons: [
      L(14, "designing-security-for-a-sales-organization", "Designing Security for a Sales Organization"),
      L(15, "designing-security-for-a-service-organization", "Designing Security for a Service Organization"),
      L(16, "restriction-rules-and-scoping-rules-overview", "Restriction Rules and Scoping Rules Overview"),
      L(17, "testing-security-with-login-as-and-run-as", "Testing Security with Login As and Run As"),
      L(18, "security-troubleshooting-and-access-reviews", "Security Troubleshooting and Access Reviews"),
      L(19, "common-security-mistakes", "Common Security Mistakes"),
      L(20, "security-audit-case-study", "Security Audit Case Study"),
    ],
  },
  {
    n: 4,
    title: "Beyond the Basics",
    lessons: [
      L(21, "sharing-settings-and-recalculation", "Sharing Settings and Recalculation"),
      L(22, "guest-user-and-community-security-overview", "Guest User and Community Security Overview"),
      L(23, "session-and-login-security", "Session and Login Security"),
      L(24, "preparing-for-the-sharing-and-visibility-architect-path", "Preparing for the Sharing and Visibility Architect Path"),
    ],
  },
];
