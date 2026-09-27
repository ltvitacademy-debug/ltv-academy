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
      L(1, "oracle-financials-terminology", "Oracle Financials Terminology"),
      L(2, "functional-interview-questions-general-ledger", "Functional Interview Questions: General Ledger"),
      L(3, "functional-interview-questions-payables-and-receivables", "Functional Interview Questions: Payables and Receivables"),
      L(4, "scenario-based-interview-questions", "Scenario-Based Interview Questions"),
      L(5, "troubleshooting-questions", "Troubleshooting Questions"),
      L(6, "oracle-implementation-interview-questions", "Oracle Implementation Interview Questions"),
      L(7, "technical-and-data-questions-for-functional-consultants", "Technical and Data Questions for Functional Consultants"),
    ],
  },
  {
    n: 2,
    title: "Resume, Capstone Story and Certification",
    lessons: [
      L(8, "resume-project-descriptions", "Resume Project Descriptions"),
      L(9, "how-to-explain-the-ltv-manufacturing-capstone-in-an-interview", "How to Explain the LTV Manufacturing Capstone in an Interview"),
      L(10, "building-a-portfolio-of-your-practice-work", "Building a Portfolio of Your Practice Work"),
      L(11, "behavioral-interview-preparation", "Behavioral Interview Preparation"),
      L(12, "oracle-certification-preparation-guidance", "Oracle Certification Preparation Guidance"),
      L(13, "certification-study-plan-and-practice-habits", "Certification Study Plan and Practice Habits"),
      L(14, "your-first-90-days-as-an-oracle-financials-consultant", "Your First 90 Days as an Oracle Financials Consultant"),
      L(15, "consulting-career-paths-and-next-steps", "Consulting Career Paths and Next Steps"),
    ],
  },
];
