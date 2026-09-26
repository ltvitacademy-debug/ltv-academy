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
      L(2, "functional-interview-questions", "Functional Interview Questions"),
      L(3, "scenario-based-interview-questions", "Scenario-Based Interview Questions"),
      L(4, "troubleshooting-questions", "Troubleshooting Questions"),
      L(5, "oracle-implementation-interview-questions", "Oracle Implementation Interview Questions"),
    ],
  },
  {
    n: 2,
    title: "Resume, Capstone Story and Certification",
    lessons: [
      L(6, "resume-project-descriptions", "Resume Project Descriptions"),
      L(7, "how-to-explain-the-ltv-manufacturing-capstone-in-an-interview", "How to Explain the LTV Manufacturing Capstone in an Interview"),
      L(8, "oracle-certification-preparation-guidance", "Oracle Certification Preparation Guidance"),
    ],
  },
];
