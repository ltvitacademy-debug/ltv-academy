// The Technical Architect Case Studies course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/technical-architect-case-studies/
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

export const SFTA_TECHNICAL_ARCHITECT_CASE_STUDIES_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Technical Architect Case Studies",
    lessons: [
      L(1, "case-study-global-retail-modernization", "Case Study: Global Retail Modernization"),
      L(2, "case-study-financial-services-onboarding", "Case Study: Financial Services Onboarding"),
      L(3, "case-study-healthcare-patient-engagement", "Case Study: Healthcare Patient Engagement"),
      L(4, "case-study-manufacturing-dealer-network", "Case Study: Manufacturing Dealer Network"),
      L(5, "case-study-public-sector-case-management", "Case Study: Public Sector Case Management"),
      L(6, "case-study-telecom-omnichannel-service", "Case Study: Telecom Omnichannel Service"),
      L(7, "case-study-higher-education-advising", "Case Study: Higher Education Advising"),
      L(8, "full-mock-review-board", "Full Mock Review Board"),
    ],
  },
];
