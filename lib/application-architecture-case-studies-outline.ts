// The Application Architecture Case Studies course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/application-architecture-case-studies/
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

export const SFTA_APPLICATION_ARCHITECTURE_CASE_STUDIES_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Application Case Studies",
    lessons: [
      L(1, "case-study-redesigning-a-sales-organization", "Case Study: Redesigning a Sales Organization"),
      L(2, "case-study-customer-service-case-management", "Case Study: Customer Service Case Management"),
      L(3, "case-study-partner-and-customer-portal", "Case Study: Partner and Customer Portal"),
      L(4, "case-study-multi-business-unit-crm", "Case Study: Multi-Business-Unit CRM"),
      L(5, "case-study-field-service-scheduling", "Case Study: Field Service Scheduling"),
      L(6, "case-study-subscription-billing", "Case Study: Subscription Billing"),
      L(7, "case-study-nonprofit-program-management", "Case Study: Nonprofit Program Management"),
      L(8, "case-study-financial-services-onboarding", "Case Study: Financial Services Onboarding"),
    ],
  },
];
