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
    title: "CRM Fundamentals",
    lessons: [
      L(1, "what-crm-is-and-why-businesses-use-it", "What CRM Is and Why Businesses Use It"),
      L(2, "the-customer-lifecycle-marketing-sales-service", "The Customer Lifecycle: Marketing, Sales, Service"),
      L(3, "crm-data-accounts-contacts-leads-and-opportunities", "CRM Data: Accounts, Contacts, Leads and Opportunities"),
      L(4, "how-businesses-measure-crm-success", "How Businesses Measure CRM Success"),
      L(5, "crm-tools-beyond-salesforce", "CRM Tools Beyond Salesforce"),
    ],
  },
  {
    n: 2,
    title: "The Salesforce Ecosystem",
    lessons: [
      L(6, "a-brief-history-of-salesforce", "A Brief History of Salesforce"),
      L(7, "the-salesforce-clouds-sales-service-marketing-commerce-and-platform", "The Salesforce Clouds: Sales, Service, Marketing, Commerce and Platform"),
      L(8, "the-salesforce-platform-vs-salesforce-applications", "The Salesforce Platform vs. Salesforce Applications"),
      L(9, "appexchange-and-the-partner-ecosystem", "AppExchange and the Partner Ecosystem"),
      L(10, "salesforce-roles-admin-developer-consultant-architect", "Salesforce Roles: Admin, Developer, Consultant, Architect"),
    ],
  },
  {
    n: 3,
    title: "How Salesforce Works",
    lessons: [
      L(11, "multitenancy-and-how-salesforce-runs", "Multitenancy and How Salesforce Runs"),
      L(12, "organizations-editions-and-licenses", "Organizations, Editions and Licenses"),
      L(13, "metadata-driven-architecture", "Metadata-Driven Architecture"),
      L(14, "release-cycles-three-releases-a-year", "Release Cycles: Three Releases a Year"),
      L(15, "trust-availability-and-salesforce-security-basics", "Trust, Availability and Salesforce Security Basics"),
    ],
  },
  {
    n: 4,
    title: "Using Salesforce",
    lessons: [
      L(16, "objects-records-and-fields", "Objects, Records and Fields"),
      L(17, "applications-and-lightning-experience", "Applications and Lightning Experience"),
      L(18, "navigating-the-home-page-tabs-and-list-views", "Navigating the Home Page, Tabs and List Views"),
      L(19, "salesforce-terminology-every-beginner-needs", "Salesforce Terminology Every Beginner Needs"),
      L(20, "how-businesses-actually-use-salesforce", "How Businesses Actually Use Salesforce"),
    ],
  },
];
