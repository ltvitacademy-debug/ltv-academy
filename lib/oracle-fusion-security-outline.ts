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
      L(1, "oracle-fusion-security-model-overview", "Oracle Fusion Security Model Overview"),
      L(2, "users-and-user-accounts", "Users and User Accounts"),
      L(3, "job-roles-abstract-roles-and-data-roles", "Job Roles, Abstract Roles and Data Roles"),
      L(4, "duty-roles-and-privileges", "Duty Roles and Privileges"),
      L(5, "function-security-vs-data-security", "Function Security vs. Data Security"),
    ],
  },
  {
    n: 2,
    title: "Data Access",
    lessons: [
      L(6, "data-security-and-data-access-sets", "Data Security and Data Access Sets"),
      L(7, "business-unit-and-ledger-access", "Business Unit and Ledger Access"),
      L(8, "security-contexts-and-role-assignments", "Security Contexts and Role Assignments"),
      L(9, "provisioning-users-and-roles", "Provisioning Users and Roles"),
      L(10, "testing-access-as-another-user", "Testing Access as Another User"),
    ],
  },
  {
    n: 3,
    title: "Financials Security",
    lessons: [
      L(11, "financials-job-roles", "Financials Job Roles"),
      L(12, "general-ledger-payables-and-receivables-security", "General Ledger, Payables and Receivables Security"),
      L(13, "segregation-of-duties", "Segregation of Duties"),
      L(14, "security-reports-and-audits", "Security Reports and Audits"),
      L(15, "role-design-for-a-real-company", "Role Design for a Real Company"),
    ],
  },
  {
    n: 4,
    title: "Security Operations",
    lessons: [
      L(16, "requesting-and-approving-access", "Requesting and Approving Access"),
      L(17, "security-troubleshooting-basics", "Security Troubleshooting Basics"),
      L(18, "access-issue-practice-scenarios", "Access Issue Practice Scenarios"),
      L(19, "security-in-implementation-and-testing", "Security in Implementation and Testing"),
    ],
  },
];
