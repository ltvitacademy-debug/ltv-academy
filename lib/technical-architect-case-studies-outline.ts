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
      L(1, "case-study-global-retail-modernization", "Case Study: Global Retail Modernization", { contentDir: "ch01/01-case-study-global-retail-modernization" }),
      L(2, "case-study-financial-services-onboarding", "Case Study: Financial Services Onboarding", { contentDir: "ch01/02-case-study-financial-services-onboarding" }),
      L(3, "case-study-healthcare-patient-engagement", "Case Study: Healthcare Patient Engagement", { contentDir: "ch01/03-case-study-healthcare-patient-engagement" }),
      L(4, "case-study-manufacturing-dealer-network", "Case Study: Manufacturing Dealer Network", { contentDir: "ch01/04-case-study-manufacturing-dealer-network" }),
      L(5, "case-study-public-sector-case-management", "Case Study: Public Sector Case Management", { contentDir: "ch01/05-case-study-public-sector-case-management" }),
      L(6, "case-study-telecom-omnichannel-service", "Case Study: Telecom Omnichannel Service", { contentDir: "ch01/06-case-study-telecom-omnichannel-service" }),
      L(7, "case-study-higher-education-advising", "Case Study: Higher Education Advising", { contentDir: "ch01/07-case-study-higher-education-advising" }),
      L(8, "full-mock-review-board", "Full Mock Review Board", { contentDir: "ch01/08-full-mock-review-board" }),
    ],
  },
  {
    n: 2,
    title: "Working Ambiguous Requirements",
    lessons: [
      L(9, "extracting-requirements-from-ambiguity", "Extracting Requirements From Ambiguity", { contentDir: "ch02/09-extracting-requirements-from-ambiguity" }),
      L(10, "stating-assumptions-explicitly", "Stating Assumptions Explicitly", { contentDir: "ch02/10-stating-assumptions-explicitly" }),
      L(11, "prioritizing-risks", "Prioritizing Risks", { contentDir: "ch02/11-prioritizing-risks" }),
      L(12, "building-the-solution-blueprint", "Building the Solution Blueprint", { contentDir: "ch02/12-building-the-solution-blueprint" }),
      L(13, "justifying-rejected-alternatives", "Justifying Rejected Alternatives", { contentDir: "ch02/13-justifying-rejected-alternatives" }),
    ],
  },
  {
    n: 3,
    title: "Presenting and Defending",
    lessons: [
      L(14, "presenting-a-full-solution", "Presenting a Full Solution", { contentDir: "ch03/14-presenting-a-full-solution" }),
      L(15, "handling-objections-on-data-and-security", "Handling Objections on Data and Security", { contentDir: "ch03/15-handling-objections-on-data-and-security" }),
      L(16, "handling-objections-on-integration-and-scale", "Handling Objections on Integration and Scale", { contentDir: "ch03/16-handling-objections-on-integration-and-scale" }),
      L(17, "handling-objections-on-delivery-and-governance", "Handling Objections on Delivery and Governance", { contentDir: "ch03/17-handling-objections-on-delivery-and-governance" }),
      L(18, "second-full-mock-review-board", "Second Full Mock Review Board", { contentDir: "ch03/18-second-full-mock-review-board" }),
      L(19, "portfolio-of-solutions", "Portfolio of Solutions", { contentDir: "ch03/19-portfolio-of-solutions" }),
      L(20, "peer-and-instructor-feedback", "Peer and Instructor Feedback", { contentDir: "ch03/20-peer-and-instructor-feedback" }),
      L(21, "case-studies-wrap-up", "Case Studies Wrap-Up", { contentDir: "ch03/21-case-studies-wrap-up" }),
    ],
  },
];
