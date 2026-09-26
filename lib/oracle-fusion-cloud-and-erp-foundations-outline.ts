// The Oracle Fusion Cloud & ERP Foundations course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 01 of the Oracle Fusion Financials Consultant path. Includes the lesson that tells students when to activate their separately purchased practice environment.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-fusion-cloud-and-erp-foundations/
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

export const ORACLE_FUSION_CLOUD_AND_ERP_FOUNDATIONS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "ERP & Oracle Fusion Basics",
    lessons: [
      L(1, "what-erp-is-and-why-companies-use-it", "What ERP Is and Why Companies Use It"),
      L(2, "oracle-fusion-cloud-applications-and-the-saas-model", "Oracle Fusion Cloud Applications and the SaaS Model"),
      L(3, "oracle-fusion-cloud-architecture-overview", "Oracle Fusion Cloud Architecture Overview"),
    ],
  },
  {
    n: 2,
    title: "Working in Oracle Fusion",
    lessons: [
      L(4, "navigating-oracle-fusion-cloud", "Navigating Oracle Fusion Cloud"),
      L(5, "environments-dev-test-and-prod", "Environments: DEV, TEST and PROD"),
      L(6, "implementation-terminology-you-will-hear", "Implementation Terminology You Will Hear"),
    ],
  },
  {
    n: 3,
    title: "Careers and Your Practice Environment",
    lessons: [
      L(7, "functional-vs-technical-oracle-careers", "Functional vs. Technical Oracle Careers"),
      L(8, "your-practice-environment-what-it-is-and-when-to-activate-it", "Your Practice Environment: What It Is and When to Activate It"),
    ],
  },
];
