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
      L(1, "the-salesforce-security-model-overview", "The Salesforce Security Model Overview", { contentDir: "ch01/01-the-salesforce-security-model-overview" }),
      L(2, "object-permissions-and-crud", "Object Permissions and CRUD", { contentDir: "ch01/02-object-permissions-and-crud" }),
      L(3, "profiles-revisited", "Profiles Revisited", { contentDir: "ch01/03-profiles-revisited" }),
      L(4, "permission-sets-revisited", "Permission Sets Revisited", { contentDir: "ch01/04-permission-sets-revisited" }),
      L(5, "field-level-security", "Field-Level Security", { contentDir: "ch01/05-field-level-security" }),
      L(6, "how-profiles-and-permission-sets-combine", "How Profiles and Permission Sets Combine", { contentDir: "ch01/06-how-profiles-and-permission-sets-combine" }),
    ],
  },
  {
    n: 2,
    title: "Record Access",
    lessons: [
      L(7, "organization-wide-defaults", "Organization-Wide Defaults", { contentDir: "ch02/07-organization-wide-defaults" }),
      L(8, "roles-and-the-role-hierarchy", "Roles and the Role Hierarchy", { contentDir: "ch02/08-roles-and-the-role-hierarchy" }),
      L(9, "sharing-rules", "Sharing Rules", { contentDir: "ch02/09-sharing-rules" }),
      L(10, "manual-sharing-and-teams", "Manual Sharing and Teams", { contentDir: "ch02/10-manual-sharing-and-teams" }),
      L(11, "account-opportunity-and-case-teams", "Account, Opportunity and Case Teams", { contentDir: "ch02/11-account-opportunity-and-case-teams" }),
      L(12, "public-groups-and-queues", "Public Groups and Queues", { contentDir: "ch02/12-public-groups-and-queues" }),
      L(13, "controlled-by-parent-and-grant-access-using-hierarchies", "Controlled by Parent and Grant Access Using Hierarchies", { contentDir: "ch02/13-controlled-by-parent-and-grant-access-using-hierarchies" }),
    ],
  },
  {
    n: 3,
    title: "Applying Security",
    lessons: [
      L(14, "designing-security-for-a-sales-organization", "Designing Security for a Sales Organization", { contentDir: "ch03/14-designing-security-for-a-sales-organization" }),
      L(15, "designing-security-for-a-service-organization", "Designing Security for a Service Organization", { contentDir: "ch03/15-designing-security-for-a-service-organization" }),
      L(16, "restriction-rules-and-scoping-rules-overview", "Restriction Rules and Scoping Rules Overview", { contentDir: "ch03/16-restriction-rules-and-scoping-rules-overview" }),
      L(17, "testing-security-with-login-as-and-run-as", "Testing Security with Login As and Run As", { contentDir: "ch03/17-testing-security-with-login-as-and-run-as" }),
      L(18, "security-troubleshooting-and-access-reviews", "Security Troubleshooting and Access Reviews", { contentDir: "ch03/18-security-troubleshooting-and-access-reviews" }),
      L(19, "common-security-mistakes", "Common Security Mistakes", { contentDir: "ch03/19-common-security-mistakes" }),
      L(20, "security-audit-case-study", "Security Audit Case Study", { contentDir: "ch03/20-security-audit-case-study" }),
    ],
  },
  {
    n: 4,
    title: "Beyond the Basics",
    lessons: [
      L(21, "sharing-settings-and-recalculation", "Sharing Settings and Recalculation", { contentDir: "ch04/21-sharing-settings-and-recalculation" }),
      L(22, "guest-user-and-community-security-overview", "Guest User and Community Security Overview", { contentDir: "ch04/22-guest-user-and-community-security-overview" }),
      L(23, "session-and-login-security", "Session and Login Security", { contentDir: "ch04/23-session-and-login-security" }),
      L(24, "preparing-for-the-sharing-and-visibility-architect-path", "Preparing for the Sharing and Visibility Architect Path", { contentDir: "ch04/24-preparing-for-the-sharing-and-visibility-architect-path" }),
    ],
  },
];
