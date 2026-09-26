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
    title: "Roles and Access",
    lessons: [
      L(1, "users-and-job-roles", "Users and Job Roles"),
      L(2, "duty-roles-and-privileges", "Duty Roles and Privileges"),
      L(3, "data-access-and-data-security", "Data Access and Data Security"),
    ],
  },
  {
    n: 2,
    title: "Financials Security",
    lessons: [
      L(4, "segregation-of-duties", "Segregation of Duties"),
      L(5, "financials-security-setup", "Financials Security Setup"),
      L(6, "security-troubleshooting-basics", "Security Troubleshooting Basics"),
    ],
  },
];
