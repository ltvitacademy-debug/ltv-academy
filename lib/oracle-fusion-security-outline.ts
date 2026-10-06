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
      L(1, "oracle-fusion-security-model-overview", "Oracle Fusion Security Model Overview", { contentDir: "ch01/01-oracle-fusion-security-model-overview" }),
      L(2, "users-and-user-accounts", "Users and User Accounts", { contentDir: "ch01/02-users-and-user-accounts" }),
      L(3, "job-roles-abstract-roles-and-data-roles", "Job Roles, Abstract Roles and Data Roles", { contentDir: "ch01/03-job-roles-abstract-roles-and-data-roles" }),
      L(4, "duty-roles-and-privileges", "Duty Roles and Privileges", { contentDir: "ch01/04-duty-roles-and-privileges" }),
      L(5, "function-security-vs-data-security", "Function Security vs. Data Security", { contentDir: "ch01/05-function-security-vs-data-security" }),
    ],
  },
  {
    n: 2,
    title: "Data Access",
    lessons: [
      L(6, "data-security-and-data-access-sets", "Data Security and Data Access Sets", { contentDir: "ch02/06-data-security-and-data-access-sets" }),
      L(7, "business-unit-and-ledger-access", "Business Unit and Ledger Access", { contentDir: "ch02/07-business-unit-and-ledger-access" }),
      L(8, "security-contexts-and-role-assignments", "Security Contexts and Role Assignments", { contentDir: "ch02/08-security-contexts-and-role-assignments" }),
      L(9, "provisioning-users-and-roles", "Provisioning Users and Roles", { contentDir: "ch02/09-provisioning-users-and-roles" }),
      L(10, "testing-access-as-another-user", "Testing Access as Another User", { contentDir: "ch02/10-testing-access-as-another-user" }),
    ],
  },
  {
    n: 3,
    title: "Financials Security",
    lessons: [
      L(11, "financials-job-roles", "Financials Job Roles", { contentDir: "ch03/11-financials-job-roles" }),
      L(12, "general-ledger-payables-and-receivables-security", "General Ledger, Payables and Receivables Security", { contentDir: "ch03/12-general-ledger-payables-and-receivables-security" }),
      L(13, "segregation-of-duties", "Segregation of Duties", { contentDir: "ch03/13-segregation-of-duties" }),
      L(14, "security-reports-and-audits", "Security Reports and Audits", { contentDir: "ch03/14-security-reports-and-audits" }),
      L(15, "role-design-for-a-real-company", "Role Design for a Real Company", { contentDir: "ch03/15-role-design-for-a-real-company" }),
    ],
  },
  {
    n: 4,
    title: "Security Operations",
    lessons: [
      L(16, "requesting-and-approving-access", "Requesting and Approving Access", { contentDir: "ch04/16-requesting-and-approving-access" }),
      L(17, "security-troubleshooting-basics", "Security Troubleshooting Basics", { contentDir: "ch04/17-security-troubleshooting-basics" }),
      L(18, "access-issue-practice-scenarios", "Access Issue Practice Scenarios", { contentDir: "ch04/18-access-issue-practice-scenarios" }),
      L(19, "security-in-implementation-and-testing", "Security in Implementation and Testing", { contentDir: "ch04/19-security-in-implementation-and-testing" }),
    ],
  },
];
