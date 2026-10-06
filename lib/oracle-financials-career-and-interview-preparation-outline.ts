// The Oracle Financials Career & Interview Preparation course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Final section of the Oracle Fusion Financials Consultant path. Certification guidance is preparation advice only; completing LTV courses does not automatically earn an Oracle certification.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-financials-career-and-interview-preparation/
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

export const ORACLE_FINANCIALS_CAREER_AND_INTERVIEW_PREPARATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Interview Preparation",
    lessons: [
      L(1, "oracle-financials-terminology", "Oracle Financials Terminology", { contentDir: "ch01/01-oracle-financials-terminology" }),
      L(2, "functional-interview-questions-general-ledger", "Functional Interview Questions: General Ledger", { contentDir: "ch01/02-functional-interview-questions-general-ledger" }),
      L(3, "functional-interview-questions-payables-and-receivables", "Functional Interview Questions: Payables and Receivables", { contentDir: "ch01/03-functional-interview-questions-payables-and-receivables" }),
      L(4, "scenario-based-interview-questions", "Scenario-Based Interview Questions", { contentDir: "ch01/04-scenario-based-interview-questions" }),
      L(5, "troubleshooting-questions", "Troubleshooting Questions", { contentDir: "ch01/05-troubleshooting-questions" }),
      L(6, "oracle-implementation-interview-questions", "Oracle Implementation Interview Questions", { contentDir: "ch01/06-oracle-implementation-interview-questions" }),
      L(7, "technical-and-data-questions-for-functional-consultants", "Technical and Data Questions for Functional Consultants", { contentDir: "ch01/07-technical-and-data-questions-for-functional-consultants" }),
    ],
  },
  {
    n: 2,
    title: "Resume, Capstone Story and Certification",
    lessons: [
      L(8, "resume-project-descriptions", "Resume Project Descriptions", { contentDir: "ch02/08-resume-project-descriptions" }),
      L(9, "how-to-explain-the-ltv-manufacturing-capstone-in-an-interview", "How to Explain the LTV Manufacturing Capstone in an Interview", { contentDir: "ch02/09-how-to-explain-the-ltv-manufacturing-capstone-in-an-interview" }),
      L(10, "building-a-portfolio-of-your-practice-work", "Building a Portfolio of Your Practice Work", { contentDir: "ch02/10-building-a-portfolio-of-your-practice-work" }),
      L(11, "behavioral-interview-preparation", "Behavioral Interview Preparation", { contentDir: "ch02/11-behavioral-interview-preparation" }),
      L(12, "oracle-certification-preparation-guidance", "Oracle Certification Preparation Guidance", { contentDir: "ch02/12-oracle-certification-preparation-guidance" }),
      L(13, "certification-study-plan-and-practice-habits", "Certification Study Plan and Practice Habits", { contentDir: "ch02/13-certification-study-plan-and-practice-habits" }),
      L(14, "your-first-90-days-as-an-oracle-financials-consultant", "Your First 90 Days as an Oracle Financials Consultant", { contentDir: "ch02/14-your-first-90-days-as-an-oracle-financials-consultant" }),
      L(15, "consulting-career-paths-and-next-steps", "Consulting Career Paths and Next Steps", { contentDir: "ch02/15-consulting-career-paths-and-next-steps" }),
    ],
  },
];
