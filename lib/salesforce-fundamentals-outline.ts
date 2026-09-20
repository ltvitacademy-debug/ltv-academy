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
      L(1, "what-is-salesforce-and-crm", "What Is Salesforce & CRM?", {
        contentDir: "ch01/01-what-is-salesforce-and-crm",
        // videoUrl/durationLabel pending
      }),
      L(2, "sales-cloud-vs-service-cloud", "Sales Cloud vs. Service Cloud", {
        contentDir: "ch01/02-sales-cloud-vs-service-cloud",
      }),
      L(3, "editions-and-the-appexchange", "Editions & the AppExchange", {
        contentDir: "ch01/03-editions-and-the-appexchange",
      }),
      L(4, "navigating-salesforce", "Navigating Salesforce", {
        contentDir: "ch01/04-navigating-salesforce",
      }),
      L(5, "salesforce-terminology-for-analysts", "Salesforce Terminology for Analysts", {
        contentDir: "ch01/05-salesforce-terminology-for-analysts",
      }),
      L(6, "why-analysts-need-the-data-model", "Why Analysts Need to Understand the Data, Not Just Query It", {
        contentDir: "ch01/06-why-analysts-need-the-data-model",
      }),
    ],
  },
  {
    n: 2,
    title: "Core Sales Cloud Objects",
    lessons: [
      L(7, "leads", "Leads", { contentDir: "ch02/07-leads" }),
      L(8, "accounts", "Accounts", { contentDir: "ch02/08-accounts" }),
      L(9, "contacts", "Contacts", { contentDir: "ch02/09-contacts" }),
      L(10, "opportunities", "Opportunities", { contentDir: "ch02/10-opportunities" }),
      L(11, "campaigns", "Campaigns", { contentDir: "ch02/11-campaigns" }),
      L(12, "activities", "Activities", { contentDir: "ch02/12-activities" }),
    ],
  },
  {
    n: 3,
    title: "Core Service Cloud Objects",
    lessons: [
      L(13, "cases", "Cases", { contentDir: "ch03/13-cases" }),
      L(14, "the-case-lifecycle", "The Case Lifecycle", { contentDir: "ch03/14-the-case-lifecycle" }),
      L(15, "service-cloud-reporting-context", "Service Cloud Reporting Context", {
        contentDir: "ch03/15-service-cloud-reporting-context",
      }),
    ],
  },
  {
    n: 4,
    title: "Standard vs. Custom Objects & Fields",
    lessons: [
      L(16, "standard-vs-custom-objects", "Standard vs. Custom Objects", {
        contentDir: "ch04/16-standard-vs-custom-objects",
      }),
      L(17, "field-types", "Field Types", { contentDir: "ch04/17-field-types" }),
      L(18, "record-types", "Record Types", { contentDir: "ch04/18-record-types" }),
      L(19, "page-layouts", "Page Layouts", { contentDir: "ch04/19-page-layouts" }),
      L(20, "custom-fields-for-analysts", "Custom Fields, From an Analyst's Perspective", {
        contentDir: "ch04/20-custom-fields-for-analysts",
      }),
    ],
  },
  {
    n: 5,
    title: "The Salesforce Data Model",
    lessons: [
      L(21, "object-relationships", "Object Relationships", {
        contentDir: "ch05/21-object-relationships",
      }),
      L(22, "lookup-vs-master-detail", "Lookup vs. Master-Detail Relationships", {
        contentDir: "ch05/22-lookup-vs-master-detail",
      }),
      L(23, "junction-objects", "Junction Objects", {
        contentDir: "ch05/23-junction-objects",
      }),
      L(24, "schema-builder", "Schema Builder", {
        contentDir: "ch05/24-schema-builder",
      }),
      L(25, "reading-a-real-orgs-data-model", "Reading a Real Org's Data Model", {
        contentDir: "ch05/25-reading-a-real-orgs-data-model",
      }),
    ],
  },
  {
    n: 6,
    title: "Users, Roles, Profiles & Data Security Basics",
    lessons: [
      L(26, "users-and-licenses", "Users & Licenses", {
        contentDir: "ch06/26-users-and-licenses",
      }),
      L(27, "roles-and-role-hierarchy", "Roles & the Role Hierarchy", {
        contentDir: "ch06/27-roles-and-role-hierarchy",
      }),
      L(28, "profiles-and-permission-sets", "Profiles & Permission Sets", {
        contentDir: "ch06/28-profiles-and-permission-sets",
      }),
      L(29, "sharing-rules-basics", "Sharing Rules, Basics", {
        contentDir: "ch06/29-sharing-rules-basics",
      }),
      L(30, "field-level-security-basics", "Field-Level Security, Basics", {
        contentDir: "ch06/30-field-level-security-basics",
      }),
      L(31, "putting-it-together-for-an-analyst", "Putting It Together: What an Analyst Actually Needs", {
        contentDir: "ch06/31-putting-it-together-for-an-analyst",
      }),
    ],
  },
];
