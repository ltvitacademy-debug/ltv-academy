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
      L(1, "the-salesforce-security-model-overview", "The Salesforce Security Model Overview", { contentDir: "ch01/01-the-salesforce-security-model-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600249/ltv-salesforce-security-and-access-fundamentals/the-salesforce-security-model-overview.mp4", durationLabel: "2 min 9 s" }),
      L(2, "object-permissions-and-crud", "Object Permissions and CRUD", { contentDir: "ch01/02-object-permissions-and-crud", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600730/ltv-salesforce-security-and-access-fundamentals/object-permissions-and-crud.mp4", durationLabel: "1 min 33 s" }),
      L(3, "profiles-revisited", "Profiles Revisited", { contentDir: "ch01/03-profiles-revisited", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601165/ltv-salesforce-security-and-access-fundamentals/profiles-revisited.mp4", durationLabel: "1 min 43 s" }),
      L(4, "permission-sets-revisited", "Permission Sets Revisited", { contentDir: "ch01/04-permission-sets-revisited", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601609/ltv-salesforce-security-and-access-fundamentals/permission-sets-revisited.mp4", durationLabel: "1 min 39 s" }),
      L(5, "field-level-security", "Field-Level Security", { contentDir: "ch01/05-field-level-security", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601979/ltv-salesforce-security-and-access-fundamentals/field-level-security.mp4", durationLabel: "1 min 36 s" }),
      L(6, "how-profiles-and-permission-sets-combine", "How Profiles and Permission Sets Combine", { contentDir: "ch01/06-how-profiles-and-permission-sets-combine", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602461/ltv-salesforce-security-and-access-fundamentals/how-profiles-and-permission-sets-combine.mp4", durationLabel: "1 min 47 s" }),
    ],
  },
  {
    n: 2,
    title: "Record Access",
    lessons: [
      L(7, "organization-wide-defaults", "Organization-Wide Defaults", { contentDir: "ch02/07-organization-wide-defaults", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602929/ltv-salesforce-security-and-access-fundamentals/organization-wide-defaults.mp4", durationLabel: "1 min 50 s" }),
      L(8, "roles-and-the-role-hierarchy", "Roles and the Role Hierarchy", { contentDir: "ch02/08-roles-and-the-role-hierarchy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603374/ltv-salesforce-security-and-access-fundamentals/roles-and-the-role-hierarchy.mp4", durationLabel: "1 min 36 s" }),
      L(9, "sharing-rules", "Sharing Rules", { contentDir: "ch02/09-sharing-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603796/ltv-salesforce-security-and-access-fundamentals/sharing-rules.mp4", durationLabel: "1 min 37 s" }),
      L(10, "manual-sharing-and-teams", "Manual Sharing and Teams", { contentDir: "ch02/10-manual-sharing-and-teams", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604192/ltv-salesforce-security-and-access-fundamentals/manual-sharing-and-teams.mp4", durationLabel: "1 min 31 s" }),
      L(11, "account-opportunity-and-case-teams", "Account, Opportunity and Case Teams", { contentDir: "ch02/11-account-opportunity-and-case-teams", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604633/ltv-salesforce-security-and-access-fundamentals/account-opportunity-and-case-teams.mp4", durationLabel: "1 min 38 s" }),
      L(12, "public-groups-and-queues", "Public Groups and Queues", { contentDir: "ch02/12-public-groups-and-queues", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605098/ltv-salesforce-security-and-access-fundamentals/public-groups-and-queues.mp4", durationLabel: "1 min 37 s" }),
      L(13, "controlled-by-parent-and-grant-access-using-hierarchies", "Controlled by Parent and Grant Access Using Hierarchies", { contentDir: "ch02/13-controlled-by-parent-and-grant-access-using-hierarchies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605576/ltv-salesforce-security-and-access-fundamentals/controlled-by-parent-and-grant-access-using-hierarchies.mp4", durationLabel: "1 min 51 s" }),
    ],
  },
  {
    n: 3,
    title: "Applying Security",
    lessons: [
      L(14, "designing-security-for-a-sales-organization", "Designing Security for a Sales Organization", { contentDir: "ch03/14-designing-security-for-a-sales-organization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606123/ltv-salesforce-security-and-access-fundamentals/designing-security-for-a-sales-organization.mp4", durationLabel: "2 min 2 s" }),
      L(15, "designing-security-for-a-service-organization", "Designing Security for a Service Organization", { contentDir: "ch03/15-designing-security-for-a-service-organization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606665/ltv-salesforce-security-and-access-fundamentals/designing-security-for-a-service-organization.mp4", durationLabel: "2 min 0 s" }),
      L(16, "restriction-rules-and-scoping-rules-overview", "Restriction Rules and Scoping Rules Overview", { contentDir: "ch03/16-restriction-rules-and-scoping-rules-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607243/ltv-salesforce-security-and-access-fundamentals/restriction-rules-and-scoping-rules-overview.mp4", durationLabel: "2 min 11 s" }),
      L(17, "testing-security-with-login-as-and-run-as", "Testing Security with Login As and Run As", { contentDir: "ch03/17-testing-security-with-login-as-and-run-as", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607810/ltv-salesforce-security-and-access-fundamentals/testing-security-with-login-as-and-run-as.mp4", durationLabel: "2 min 10 s" }),
      L(18, "security-troubleshooting-and-access-reviews", "Security Troubleshooting and Access Reviews", { contentDir: "ch03/18-security-troubleshooting-and-access-reviews", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608296/ltv-salesforce-security-and-access-fundamentals/security-troubleshooting-and-access-reviews.mp4", durationLabel: "2 min 11 s" }),
      L(19, "common-security-mistakes", "Common Security Mistakes", { contentDir: "ch03/19-common-security-mistakes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608814/ltv-salesforce-security-and-access-fundamentals/common-security-mistakes.mp4", durationLabel: "1 min 52 s" }),
      L(20, "security-audit-case-study", "Security Audit Case Study", { contentDir: "ch03/20-security-audit-case-study", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609361/ltv-salesforce-security-and-access-fundamentals/security-audit-case-study.mp4", durationLabel: "1 min 58 s" }),
    ],
  },
  {
    n: 4,
    title: "Beyond the Basics",
    lessons: [
      L(21, "sharing-settings-and-recalculation", "Sharing Settings and Recalculation", { contentDir: "ch04/21-sharing-settings-and-recalculation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609881/ltv-salesforce-security-and-access-fundamentals/sharing-settings-and-recalculation.mp4", durationLabel: "1 min 57 s" }),
      L(22, "guest-user-and-community-security-overview", "Guest User and Community Security Overview", { contentDir: "ch04/22-guest-user-and-community-security-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610417/ltv-salesforce-security-and-access-fundamentals/guest-user-and-community-security-overview.mp4", durationLabel: "2 min 13 s" }),
      L(23, "session-and-login-security", "Session and Login Security", { contentDir: "ch04/23-session-and-login-security", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610931/ltv-salesforce-security-and-access-fundamentals/session-and-login-security.mp4", durationLabel: "2 min 4 s" }),
      L(24, "preparing-for-the-sharing-and-visibility-architect-path", "Preparing for the Sharing and Visibility Architect Path", { contentDir: "ch04/24-preparing-for-the-sharing-and-visibility-architect-path", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792611678/ltv-salesforce-security-and-access-fundamentals/preparing-for-the-sharing-and-visibility-architect-path.mp4", durationLabel: "1 min 53 s" }),
    ],
  },
];
