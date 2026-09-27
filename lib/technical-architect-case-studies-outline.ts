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
  {
    n: 2,
    title: "Working Ambiguous Requirements",
    lessons: [
      L(9, "extracting-requirements-from-ambiguity", "Extracting Requirements From Ambiguity"),
      L(10, "stating-assumptions-explicitly", "Stating Assumptions Explicitly"),
      L(11, "prioritizing-risks", "Prioritizing Risks"),
      L(12, "building-the-solution-blueprint", "Building the Solution Blueprint"),
      L(13, "justifying-rejected-alternatives", "Justifying Rejected Alternatives"),
    ],
  },
  {
    n: 3,
    title: "Presenting and Defending",
    lessons: [
      L(14, "presenting-a-full-solution", "Presenting a Full Solution"),
      L(15, "handling-objections-on-data-and-security", "Handling Objections on Data and Security"),
      L(16, "handling-objections-on-integration-and-scale", "Handling Objections on Integration and Scale"),
      L(17, "handling-objections-on-delivery-and-governance", "Handling Objections on Delivery and Governance"),
      L(18, "second-full-mock-review-board", "Second Full Mock Review Board"),
      L(19, "portfolio-of-solutions", "Portfolio of Solutions"),
      L(20, "peer-and-instructor-feedback", "Peer and Instructor Feedback"),
      L(21, "case-studies-wrap-up", "Case Studies Wrap-Up"),
    ],
  },
];
