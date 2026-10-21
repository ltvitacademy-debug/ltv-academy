// The Oracle Fusion Security course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 07. Security in Oracle Fusion Cloud Financials.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-fusion-security/
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

export const ORACLE_FUSION_SECURITY_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Security Fundamentals",
    lessons: [
      L(1, "oracle-fusion-security-model-overview", "Oracle Fusion Security Model Overview", { contentDir: "ch01/01-oracle-fusion-security-model-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506801/ltv-oracle-fusion-security/oracle-fusion-security-model-overview.mp4", durationLabel: "1 min 59 s" }),
      L(2, "users-and-user-accounts", "Users and User Accounts", { contentDir: "ch01/02-users-and-user-accounts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507571/ltv-oracle-fusion-security/users-and-user-accounts.mp4", durationLabel: "1 min 52 s" }),
      L(3, "job-roles-abstract-roles-and-data-roles", "Job Roles, Abstract Roles and Data Roles", { contentDir: "ch01/03-job-roles-abstract-roles-and-data-roles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508201/ltv-oracle-fusion-security/job-roles-abstract-roles-and-data-roles.mp4", durationLabel: "1 min 50 s" }),
      L(4, "duty-roles-and-privileges", "Duty Roles and Privileges", { contentDir: "ch01/04-duty-roles-and-privileges", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508969/ltv-oracle-fusion-security/duty-roles-and-privileges.mp4", durationLabel: "2 min 2 s" }),
      L(5, "function-security-vs-data-security", "Function Security vs. Data Security", { contentDir: "ch01/05-function-security-vs-data-security", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509669/ltv-oracle-fusion-security/function-security-vs-data-security.mp4", durationLabel: "1 min 56 s" }),
    ],
  },
  {
    n: 2,
    title: "Data Access",
    lessons: [
      L(6, "data-security-and-data-access-sets", "Data Security and Data Access Sets", { contentDir: "ch02/06-data-security-and-data-access-sets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510431/ltv-oracle-fusion-security/data-security-and-data-access-sets.mp4", durationLabel: "2 min 3 s" }),
      L(7, "business-unit-and-ledger-access", "Business Unit and Ledger Access", { contentDir: "ch02/07-business-unit-and-ledger-access", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511221/ltv-oracle-fusion-security/business-unit-and-ledger-access.mp4", durationLabel: "2 min 5 s" }),
      L(8, "security-contexts-and-role-assignments", "Security Contexts and Role Assignments", { contentDir: "ch02/08-security-contexts-and-role-assignments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511931/ltv-oracle-fusion-security/security-contexts-and-role-assignments.mp4", durationLabel: "1 min 54 s" }),
      L(9, "provisioning-users-and-roles", "Provisioning Users and Roles", { contentDir: "ch02/09-provisioning-users-and-roles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521184/ltv-oracle-fusion-security/provisioning-users-and-roles.mp4", durationLabel: "1 min 29 s" }),
      L(10, "testing-access-as-another-user", "Testing Access as Another User", { contentDir: "ch02/10-testing-access-as-another-user", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513360/ltv-oracle-fusion-security/testing-access-as-another-user.mp4", durationLabel: "2 min 1 s" }),
    ],
  },
  {
    n: 3,
    title: "Financials Security",
    lessons: [
      L(11, "financials-job-roles", "Financials Job Roles", { contentDir: "ch03/11-financials-job-roles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514036/ltv-oracle-fusion-security/financials-job-roles.mp4", durationLabel: "1 min 47 s" }),
      L(12, "general-ledger-payables-and-receivables-security", "General Ledger, Payables and Receivables Security", { contentDir: "ch03/12-general-ledger-payables-and-receivables-security", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514888/ltv-oracle-fusion-security/general-ledger-payables-and-receivables-security.mp4", durationLabel: "2 min 17 s" }),
      L(13, "segregation-of-duties", "Segregation of Duties", { contentDir: "ch03/13-segregation-of-duties", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515764/ltv-oracle-fusion-security/segregation-of-duties.mp4", durationLabel: "2 min 15 s" }),
      L(14, "security-reports-and-audits", "Security Reports and Audits", { contentDir: "ch03/14-security-reports-and-audits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516620/ltv-oracle-fusion-security/security-reports-and-audits.mp4", durationLabel: "2 min 12 s" }),
      L(15, "role-design-for-a-real-company", "Role Design for a Real Company", { contentDir: "ch03/15-role-design-for-a-real-company", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517442/ltv-oracle-fusion-security/role-design-for-a-real-company.mp4", durationLabel: "2 min 6 s" }),
    ],
  },
  {
    n: 4,
    title: "Security Operations",
    lessons: [
      L(16, "requesting-and-approving-access", "Requesting and Approving Access", { contentDir: "ch04/16-requesting-and-approving-access", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518164/ltv-oracle-fusion-security/requesting-and-approving-access.mp4", durationLabel: "2 min 1 s" }),
      L(17, "security-troubleshooting-basics", "Security Troubleshooting Basics", { contentDir: "ch04/17-security-troubleshooting-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518870/ltv-oracle-fusion-security/security-troubleshooting-basics.mp4", durationLabel: "1 min 44 s" }),
      L(18, "access-issue-practice-scenarios", "Access Issue Practice Scenarios", { contentDir: "ch04/18-access-issue-practice-scenarios", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519584/ltv-oracle-fusion-security/access-issue-practice-scenarios.mp4", durationLabel: "1 min 59 s" }),
      L(19, "security-in-implementation-and-testing", "Security in Implementation and Testing", { contentDir: "ch04/19-security-in-implementation-and-testing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520448/ltv-oracle-fusion-security/security-in-implementation-and-testing.mp4", durationLabel: "2 min 21 s" }),
    ],
  },
];
