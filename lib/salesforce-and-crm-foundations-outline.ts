// The Salesforce & CRM Foundations course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-and-crm-foundations/
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

export const SFTA_SALESFORCE_AND_CRM_FOUNDATIONS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "CRM and the Salesforce Ecosystem",
    lessons: [
      L(1, "what-crm-is-and-why-businesses-use-it", "What CRM Is and Why Businesses Use It"),
      L(2, "the-salesforce-ecosystem-and-clouds", "The Salesforce Ecosystem and Clouds"),
      L(3, "multitenancy-and-how-salesforce-runs", "Multitenancy and How Salesforce Runs"),
      L(4, "organizations-editions-and-environments", "Organizations, Editions and Environments"),
    ],
  },
  {
    n: 2,
    title: "Working in Salesforce",
    lessons: [
      L(5, "objects-records-and-fields", "Objects, Records and Fields"),
      L(6, "applications-and-lightning-experience", "Applications and Lightning Experience"),
      L(7, "salesforce-terminology-every-beginner-needs", "Salesforce Terminology Every Beginner Needs"),
      L(8, "how-businesses-actually-use-salesforce", "How Businesses Actually Use Salesforce"),
    ],
  },
];
