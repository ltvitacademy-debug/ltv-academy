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
      L(1, "oracle-financials-terminology", "Oracle Financials Terminology", { contentDir: "ch01/01-oracle-financials-terminology", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506797/ltv-oracle-financials-career-and-interview-preparation/oracle-financials-terminology.mp4", durationLabel: "1 min 42 s" }),
      L(2, "functional-interview-questions-general-ledger", "Functional Interview Questions: General Ledger", { contentDir: "ch01/02-functional-interview-questions-general-ledger", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507431/ltv-oracle-financials-career-and-interview-preparation/functional-interview-questions-general-ledger.mp4", durationLabel: "1 min 32 s" }),
      L(3, "functional-interview-questions-payables-and-receivables", "Functional Interview Questions: Payables and Receivables", { contentDir: "ch01/03-functional-interview-questions-payables-and-receivables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507905/ltv-oracle-financials-career-and-interview-preparation/functional-interview-questions-payables-and-receivables.mp4", durationLabel: "1 min 24 s" }),
      L(4, "scenario-based-interview-questions", "Scenario-Based Interview Questions", { contentDir: "ch01/04-scenario-based-interview-questions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508447/ltv-oracle-financials-career-and-interview-preparation/scenario-based-interview-questions.mp4", durationLabel: "1 min 21 s" }),
      L(5, "troubleshooting-questions", "Troubleshooting Questions", { contentDir: "ch01/05-troubleshooting-questions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508971/ltv-oracle-financials-career-and-interview-preparation/troubleshooting-questions.mp4", durationLabel: "1 min 21 s" }),
      L(6, "oracle-implementation-interview-questions", "Oracle Implementation Interview Questions", { contentDir: "ch01/06-oracle-implementation-interview-questions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509509/ltv-oracle-financials-career-and-interview-preparation/oracle-implementation-interview-questions.mp4", durationLabel: "1 min 24 s" }),
      L(7, "technical-and-data-questions-for-functional-consultants", "Technical and Data Questions for Functional Consultants", { contentDir: "ch01/07-technical-and-data-questions-for-functional-consultants", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509985/ltv-oracle-financials-career-and-interview-preparation/technical-and-data-questions-for-functional-consultants.mp4", durationLabel: "1 min 19 s" }),
    ],
  },
  {
    n: 2,
    title: "Resume, Capstone Story and Certification",
    lessons: [
      L(8, "resume-project-descriptions", "Resume Project Descriptions", { contentDir: "ch02/08-resume-project-descriptions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510510/ltv-oracle-financials-career-and-interview-preparation/resume-project-descriptions.mp4", durationLabel: "1 min 20 s" }),
      L(9, "how-to-explain-the-ltv-manufacturing-capstone-in-an-interview", "How to Explain the LTV Manufacturing Capstone in an Interview", { contentDir: "ch02/09-how-to-explain-the-ltv-manufacturing-capstone-in-an-interview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511295/ltv-oracle-financials-career-and-interview-preparation/how-to-explain-the-ltv-manufacturing-capstone-in-an-interview.mp4", durationLabel: "2 min 0 s" }),
      L(10, "building-a-portfolio-of-your-practice-work", "Building a Portfolio of Your Practice Work", { contentDir: "ch02/10-building-a-portfolio-of-your-practice-work", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511677/ltv-oracle-financials-career-and-interview-preparation/building-a-portfolio-of-your-practice-work.mp4", durationLabel: "1 min 12 s" }),
      L(11, "behavioral-interview-preparation", "Behavioral Interview Preparation", { contentDir: "ch02/11-behavioral-interview-preparation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512186/ltv-oracle-financials-career-and-interview-preparation/behavioral-interview-preparation.mp4", durationLabel: "1 min 18 s" }),
      L(12, "oracle-certification-preparation-guidance", "Oracle Certification Preparation Guidance", { contentDir: "ch02/12-oracle-certification-preparation-guidance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512673/ltv-oracle-financials-career-and-interview-preparation/oracle-certification-preparation-guidance.mp4", durationLabel: "1 min 21 s" }),
      L(13, "certification-study-plan-and-practice-habits", "Certification Study Plan and Practice Habits", { contentDir: "ch02/13-certification-study-plan-and-practice-habits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513195/ltv-oracle-financials-career-and-interview-preparation/certification-study-plan-and-practice-habits.mp4", durationLabel: "1 min 21 s" }),
      L(14, "your-first-90-days-as-an-oracle-financials-consultant", "Your First 90 Days as an Oracle Financials Consultant", { contentDir: "ch02/14-your-first-90-days-as-an-oracle-financials-consultant", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513729/ltv-oracle-financials-career-and-interview-preparation/your-first-90-days-as-an-oracle-financials-consultant.mp4", durationLabel: "1 min 24 s" }),
      L(15, "consulting-career-paths-and-next-steps", "Consulting Career Paths and Next Steps", { contentDir: "ch02/15-consulting-career-paths-and-next-steps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514413/ltv-oracle-financials-career-and-interview-preparation/consulting-career-paths-and-next-steps.mp4", durationLabel: "1 min 50 s" }),
    ],
  },
];
