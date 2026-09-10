// The full Salesforce Fundamentals for Data Analysts course outline. Only
// lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production". Not a Salesforce Administrator mega-course —
// this teaches exactly what a data analyst needs: what Salesforce data
// means, before analyzing it.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-fundamentals/
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

export const SALESFORCE_FUNDAMENTALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "The Salesforce Ecosystem",
    lessons: [
      L(1, "what-is-salesforce-and-crm", "What Is Salesforce & CRM?"),
      L(2, "sales-cloud-vs-service-cloud", "Sales Cloud vs. Service Cloud"),
      L(3, "editions-and-the-appexchange", "Editions & the AppExchange"),
      L(4, "navigating-salesforce", "Navigating Salesforce"),
      L(5, "salesforce-terminology-for-analysts", "Salesforce Terminology for Analysts"),
      L(6, "why-analysts-need-the-data-model", "Why Analysts Need to Understand the Data, Not Just Query It"),
    ],
  },
  {
    n: 2,
    title: "Core Sales Cloud Objects",
    lessons: [
      L(7, "leads", "Leads"),
      L(8, "accounts", "Accounts"),
      L(9, "contacts", "Contacts"),
      L(10, "opportunities", "Opportunities"),
      L(11, "campaigns", "Campaigns"),
      L(12, "activities", "Activities"),
    ],
  },
  {
    n: 3,
    title: "Core Service Cloud Objects",
    lessons: [
      L(13, "cases", "Cases"),
      L(14, "the-case-lifecycle", "The Case Lifecycle"),
      L(15, "service-cloud-reporting-context", "Service Cloud Reporting Context"),
    ],
  },
  {
    n: 4,
    title: "Standard vs. Custom Objects & Fields",
    lessons: [
      L(16, "standard-vs-custom-objects", "Standard vs. Custom Objects"),
      L(17, "field-types", "Field Types"),
      L(18, "record-types", "Record Types"),
      L(19, "page-layouts", "Page Layouts"),
      L(20, "custom-fields-for-analysts", "Custom Fields, From an Analyst's Perspective"),
    ],
  },
  {
    n: 5,
    title: "The Salesforce Data Model",
    lessons: [
      L(21, "object-relationships", "Object Relationships"),
      L(22, "lookup-vs-master-detail", "Lookup vs. Master-Detail Relationships"),
      L(23, "junction-objects", "Junction Objects"),
      L(24, "schema-builder", "Schema Builder"),
      L(25, "reading-a-real-orgs-data-model", "Reading a Real Org's Data Model"),
    ],
  },
  {
    n: 6,
    title: "Users, Roles, Profiles & Data Security Basics",
    lessons: [
      L(26, "users-and-licenses", "Users & Licenses"),
      L(27, "roles-and-role-hierarchy", "Roles & the Role Hierarchy"),
      L(28, "profiles-and-permission-sets", "Profiles & Permission Sets"),
      L(29, "sharing-rules-basics", "Sharing Rules, Basics"),
      L(30, "field-level-security-basics", "Field-Level Security, Basics"),
      L(31, "putting-it-together-for-an-analyst", "Putting It Together: What an Analyst Actually Needs"),
    ],
  },
];
