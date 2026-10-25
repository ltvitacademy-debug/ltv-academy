// The Salesforce & CRM Foundations course outline. All lessons have real
// guide.md content (the header here previously, incorrectly, called this
// "framework only" — fixed 2026-10-17). Lessons without a contentDir
// render as "in production". Part of the Salesforce Administrator path's
// "Salesforce Foundations" stage (not the Technical Architect path, as a
// prior version of this comment said).

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
      L(1, "what-crm-is-and-why-businesses-use-it", "What CRM Is and Why Businesses Use It", { contentDir: "ch01/01-what-crm-is-and-why-businesses-use-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607181/ltv-salesforce-and-crm-foundations/what-crm-is-and-why-businesses-use-it.mp4", durationLabel: "1 min 7 s" }),
      L(2, "the-customer-lifecycle-marketing-sales-service", "The Customer Lifecycle: Marketing, Sales, Service", { contentDir: "ch01/02-the-customer-lifecycle-marketing-sales-service", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607461/ltv-salesforce-and-crm-foundations/the-customer-lifecycle-marketing-sales-service.mp4", durationLabel: "1 min 6 s" }),
      L(3, "crm-data-accounts-contacts-leads-and-opportunities", "CRM Data: Accounts, Contacts, Leads and Opportunities", { contentDir: "ch01/03-crm-data-accounts-contacts-leads-and-opportunities", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607816/ltv-salesforce-and-crm-foundations/crm-data-accounts-contacts-leads-and-opportunities.mp4", durationLabel: "1 min 11 s" }),
      L(4, "how-businesses-measure-crm-success", "How Businesses Measure CRM Success", { contentDir: "ch01/04-how-businesses-measure-crm-success", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608084/ltv-salesforce-and-crm-foundations/how-businesses-measure-crm-success.mp4", durationLabel: "1 min 3 s" }),
      L(5, "crm-tools-beyond-salesforce", "CRM Tools Beyond Salesforce", { contentDir: "ch01/05-crm-tools-beyond-salesforce", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608371/ltv-salesforce-and-crm-foundations/crm-tools-beyond-salesforce.mp4", durationLabel: "1 min 13 s" }),
    ],
  },
  {
    n: 2,
    title: "The Salesforce Ecosystem",
    lessons: [
      L(6, "a-brief-history-of-salesforce", "A Brief History of Salesforce", { contentDir: "ch02/06-a-brief-history-of-salesforce", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608756/ltv-salesforce-and-crm-foundations/a-brief-history-of-salesforce.mp4", durationLabel: "1 min 17 s" }),
      L(7, "the-salesforce-clouds-sales-service-marketing-commerce-and-platform", "The Salesforce Clouds: Sales, Service, Marketing, Commerce and Platform", { contentDir: "ch02/07-the-salesforce-clouds-sales-service-marketing-commerce-and-platform", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609143/ltv-salesforce-and-crm-foundations/the-salesforce-clouds-sales-service-marketing-commerce-and-platform.mp4", durationLabel: "1 min 29 s" }),
      L(8, "the-salesforce-platform-vs-salesforce-applications", "The Salesforce Platform vs. Salesforce Applications", { contentDir: "ch02/08-the-salesforce-platform-vs-salesforce-applications", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609503/ltv-salesforce-and-crm-foundations/the-salesforce-platform-vs-salesforce-applications.mp4", durationLabel: "1 min 10 s" }),
      L(9, "appexchange-and-the-partner-ecosystem", "AppExchange and the Partner Ecosystem", { contentDir: "ch02/09-appexchange-and-the-partner-ecosystem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609866/ltv-salesforce-and-crm-foundations/appexchange-and-the-partner-ecosystem.mp4", durationLabel: "1 min 21 s" }),
      L(10, "salesforce-roles-admin-developer-consultant-architect", "Salesforce Roles: Admin, Developer, Consultant, Architect", { contentDir: "ch02/10-salesforce-roles-admin-developer-consultant-architect", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610199/ltv-salesforce-and-crm-foundations/salesforce-roles-admin-developer-consultant-architect.mp4", durationLabel: "1 min 13 s" }),
    ],
  },
  {
    n: 3,
    title: "How Salesforce Works",
    lessons: [
      L(11, "multitenancy-and-how-salesforce-runs", "Multitenancy and How Salesforce Runs", { contentDir: "ch03/11-multitenancy-and-how-salesforce-runs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610858/ltv-salesforce-and-crm-foundations/multitenancy-and-how-salesforce-runs.mp4", durationLabel: "1 min 30 s" }),
      L(12, "organizations-editions-and-licenses", "Organizations, Editions and Licenses", { contentDir: "ch03/12-organizations-editions-and-licenses", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792611545/ltv-salesforce-and-crm-foundations/organizations-editions-and-licenses.mp4", durationLabel: "1 min 49 s" }),
      L(13, "metadata-driven-architecture", "Metadata-Driven Architecture", { contentDir: "ch03/13-metadata-driven-architecture", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612005/ltv-salesforce-and-crm-foundations/metadata-driven-architecture.mp4", durationLabel: "1 min 31 s" }),
      L(14, "release-cycles-three-releases-a-year", "Release Cycles: Three Releases a Year", { contentDir: "ch03/14-release-cycles-three-releases-a-year", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612573/ltv-salesforce-and-crm-foundations/release-cycles-three-releases-a-year.mp4", durationLabel: "1 min 29 s" }),
      L(15, "trust-availability-and-salesforce-security-basics", "Trust, Availability and Salesforce Security Basics", { contentDir: "ch03/15-trust-availability-and-salesforce-security-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613078/ltv-salesforce-and-crm-foundations/trust-availability-and-salesforce-security-basics.mp4", durationLabel: "1 min 37 s" }),
    ],
  },
  {
    n: 4,
    title: "Using Salesforce",
    lessons: [
      L(16, "objects-records-and-fields", "Objects, Records and Fields", { contentDir: "ch04/16-objects-records-and-fields", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613515/ltv-salesforce-and-crm-foundations/objects-records-and-fields.mp4", durationLabel: "1 min 28 s" }),
      L(17, "applications-and-lightning-experience", "Applications and Lightning Experience", { contentDir: "ch04/17-applications-and-lightning-experience", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613872/ltv-salesforce-and-crm-foundations/applications-and-lightning-experience.mp4", durationLabel: "1 min 30 s" }),
      L(18, "navigating-the-home-page-tabs-and-list-views", "Navigating the Home Page, Tabs and List Views", { contentDir: "ch04/18-navigating-the-home-page-tabs-and-list-views", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614159/ltv-salesforce-and-crm-foundations/navigating-the-home-page-tabs-and-list-views.mp4", durationLabel: "1 min 32 s" }),
      L(19, "salesforce-terminology-every-beginner-needs", "Salesforce Terminology Every Beginner Needs", { contentDir: "ch04/19-salesforce-terminology-every-beginner-needs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614491/ltv-salesforce-and-crm-foundations/salesforce-terminology-every-beginner-needs.mp4", durationLabel: "1 min 36 s" }),
      L(20, "how-businesses-actually-use-salesforce", "How Businesses Actually Use Salesforce", { contentDir: "ch04/20-how-businesses-actually-use-salesforce", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614810/ltv-salesforce-and-crm-foundations/how-businesses-actually-use-salesforce.mp4", durationLabel: "1 min 42 s" }),
    ],
  },
];
